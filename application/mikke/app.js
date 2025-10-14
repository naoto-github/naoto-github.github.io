/* ===== ユーティリティ ===== */
const $ = (id)=>document.getElementById(id);
const log = (m)=>{$('log').textContent = m;};

/* ===== three.js 基本設定 ===== */
const renderer = new THREE.WebGLRenderer({ canvas: $('threeLayer'), antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const scene  = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.85));
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(1, 1, 1);
scene.add(dir);

/* ===== 画面中央表示用アンカー ===== */
const avatarAnchor = new THREE.Group();
avatarAnchor.position.set(0, -0.2, -1.0);
camera.add(avatarAnchor);

/* ===== マーカーのルートとデバッグ可視化 ===== */
const markerRoot = new THREE.Group();
markerRoot.visible = false; // 初期の誤検出防止
scene.add(markerRoot);

const dbg = {};
dbg.axes  = new THREE.AxesHelper(1.0); markerRoot.add(dbg.axes);
dbg.ring  = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.65, 64), new THREE.MeshBasicMaterial({ color: 0xff3333, side: THREE.DoubleSide })); dbg.ring.rotation.x = -Math.PI/2; markerRoot.add(dbg.ring);
dbg.plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1), new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.15 })); dbg.plane.rotation.x = -Math.PI/2; markerRoot.add(dbg.plane);

// 起動時はデバッグ非表示
dbg.axes.visible = false; dbg.ring.visible = false; dbg.plane.visible = false;

/* ===== AR.js：カメラとマーカー ===== */
let source = null;
let context = null;

function attachVideoToBackground(){
  const arVideo = source.domElement;
  const bgVideo = $('videoLayer');
  if (arVideo && bgVideo && arVideo.srcObject) bgVideo.srcObject = arVideo.srcObject;
}
function onResize(){
  if (!source) return;
  source.onResizeElement();
  source.copyElementSizeTo(renderer.domElement);
  if (context?.arController) source.copyElementSizeTo(context.arController.canvas);
}
async function initAR({facingMode='environment'} = {}){
  source = new THREEx.ArToolkitSource({ sourceType:'webcam', facingMode });
  return new Promise((resolve)=>{
    source.init(async ()=>{
      try{ await source.domElement.play?.(); }catch(_e){}
      window.addEventListener('resize', onResize);
      setTimeout(onResize, 100);
      attachVideoToBackground();
      context = new THREEx.ArToolkitContext({
        cameraParametersUrl:'./assets/camera_para.dat',
        detectionMode:'mono',
        maxDetectionRate:60,
        canvasWidth:640, canvasHeight:480
      });
      context.init(()=>{
        camera.projectionMatrix.copy(context.getProjectionMatrix());
        new THREEx.ArMarkerControls(context, markerRoot, {
          type:'pattern', patternUrl:'./assets/pattern-hiro.patt'
        });
        markerRoot.visible = false; // 念のため初期不可視
        resolve();
      });
    }, (err)=>{ log('カメラ初期化エラー：' + (err?.message || '不明')); resolve('error'); });
  });
}

/* ===== VRM ロード ===== */
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.setCrossOrigin('anonymous');
let currentVRM = null;

/* ===== 表示制御フラグ ===== */
let hasDetectedOnce = false; // 一度でも確定検出したら true
let userHide        = false; // ユーザーの非表示指示
let visibleStreak   = 0;     // 連続検出カウント
const DETECT_FRAMES = 8;     // 確定検出のしきい値

/* ===== ポーズ関連（相対適用＆手動適用） ===== */
const poseSelect = $('poseSelect');
let poses = [];                // [{label, pose}]
let currentPoseUrl = null;     // 再適用用

// 初期バインド姿勢のスナップショット（回転・位置）．アバターごとに作り直す．
const bindPose = {
  rotation: new Map(), // boneName -> THREE.Quaternion
  position: new Map(), // boneName -> THREE.Vector3
};

const VALID_BONES = new Set([
  'hips','spine','chest','upperChest','neck','head',
  'leftShoulder','leftUpperArm','leftLowerArm','leftHand',
  'rightShoulder','rightUpperArm','rightLowerArm','rightHand',
  'leftUpperLeg','leftLowerLeg','leftFoot','leftToes',
  'rightUpperLeg','rightLowerLeg','rightFoot','rightToes',
  'leftEye','rightEye','jaw'
]);

function normalizeBoneName(k){
  if (!k) return null;
  if (VALID_BONES.has(k)) return k;
  const low = String(k).trim().toLowerCase().replace(/[^a-z]/g,' ');
  if (!low) return null;
  const parts = low.split(/\s+/).filter(Boolean);
  let name = parts[0] || '';
  for (let i=1;i<parts.length;i++){
    name += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }
  return VALID_BONES.has(name) ? name : null;
}

// 任意のポーズJSONを「ボーン毎に Quaternion 配列＋position 配列」に正規化する
// 出力：{ boneName: { rotation:[x,y,z,w], position?:[x,y,z] }, ... }
function normalizePoseToQuatArray(src){
  const out = {};
  const eulerDegToQuatArray = (deg3)=>{
    const e = new THREE.Euler(
      THREE.Math.degToRad(+deg3[0]||0),
      THREE.Math.degToRad(+deg3[1]||0),
      THREE.Math.degToRad(+deg3[2]||0),
      'XYZ'
    );
    const q = new THREE.Quaternion().setFromEuler(e).normalize();
    return [q.x,q.y,q.z,q.w];
  };
  const quatObjToArray = (o)=>{
    const x = +o.x||0, y=+o.y||0, z=+o.z||0, w = (o.w!=null?+o.w:1);
    const q = new THREE.Quaternion(x,y,z,w).normalize();
    return [q.x,q.y,q.z,q.w];
  };

  // 入力マップ（{"pose":{...}}／{"humanoid":{...}}／トップ直下／配列）を吸収
  let map = null;
  if (src && typeof src==='object'){
    if (src.pose && typeof src.pose==='object') map = src.pose;
    else if (src.humanoid && typeof src.humanoid==='object') map = src.humanoid;
    else if (!Array.isArray(src)) map = src;
  }

  const add = (boneKey, spec)=>{
    const name = normalizeBoneName(boneKey);
    if (!name || !spec) return;

    const entry = {};
    // rotation
    if (Array.isArray(spec.rotation)){
      entry.rotation = (spec.rotation.length===4)
        ? new THREE.Quaternion(spec.rotation[0],spec.rotation[1],spec.rotation[2],spec.rotation[3]).normalize().toArray()
        : eulerDegToQuatArray(spec.rotation);
    } else if (spec.rotation && typeof spec.rotation==='object'){
      entry.rotation = quatObjToArray(spec.rotation);
    }
    // position（任意．相対加算に使う）
    if (Array.isArray(spec.position) && spec.position.length===3){
      entry.position = spec.position.map(Number);
    } else if (spec.position && typeof spec.position==='object'){
      entry.position = [ +spec.position.x||0, +spec.position.y||0, +spec.position.z||0 ];
    }

    if (entry.rotation || entry.position) out[name] = entry;
  };

  if (Array.isArray(src)){
    src.forEach(item=>{
      const key = item?.bone || item?.name || item?.joint || item?.node;
      add(key, item);
    });
  } else if (Array.isArray(map)){
    map.forEach(item=>{
      const key = item?.bone || item?.name || item?.joint || item?.node;
      add(key, item);
    });
  } else if (map && typeof map==='object'){
    Object.keys(map).forEach(k=>add(k, map[k]));
  }

  return out;
}

// ボーンの初期回転・位置を記録（VRM読み込み時に実行）
function snapshotBindPose(){
  bindPose.rotation.clear();
  bindPose.position.clear();
  VALID_BONES.forEach(name=>{
    const node = currentVRM?.humanoid?.getBoneNode?.(name);
    if (!node) return;
    bindPose.rotation.set(name, node.quaternion.clone());
    bindPose.position.set(name, node.position.clone());
  });
}

// setPose は使わず，初期バインドに対して「相対適用」することで破綻を防ぐ
async function applyPoseFromUrl(url){
  if (!currentVRM || !url) return;
  try{
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const raw = await res.json();

    const poseMap = normalizePoseToQuatArray(raw);

    // 相対適用：node.quaternion = bind * poseQuat
    Object.entries(poseMap).forEach(([bone, spec])=>{
      const node = currentVRM.humanoid?.getBoneNode?.(bone);
      if (!node) return;

      const baseQ = bindPose.rotation.get(bone) || node.quaternion; // バックアップが無ければ現在値
      if (spec.rotation && spec.rotation.length===4){
        const poseQ = new THREE.Quaternion(spec.rotation[0],spec.rotation[1],spec.rotation[2],spec.rotation[3]).normalize();
        node.quaternion.copy(baseQ).multiply(poseQ).normalize();
      }else{
        node.quaternion.copy(baseQ);
      }

      // 位置は相対加算（必要な場合のみ）
      if (spec.position && spec.position.length===3){
        const baseP = bindPose.position.get(bone) || node.position;
        node.position.copy(baseP).add(new THREE.Vector3(spec.position[0],spec.position[1],spec.position[2]));
      }
    });

    currentVRM.scene.updateMatrixWorld(true);
    currentPoseUrl = url;
    log('ポーズ適用：' + url);
  }catch(e){
    console.error('[POSE] load/apply error', e);
    log('ポーズの読み込みに失敗しました．JSONの形式とパスを確認してください．');
  }
}

/* ===== VRM 読み込み本体 ===== */
async function loadVRM(url){
  if (!url) return;
  const absUrl = new URL(url, location.href).toString();

  if (currentVRM) { try{ avatarAnchor.remove(currentVRM.scene); }catch(_e){} currentVRM = null; }

  return new Promise((resolve, reject)=>{
    gltfLoader.load(absUrl, (gltf)=>{
      const ex = gltf.parser.json.extensions || {};
      if (ex.VRMC_vrm){ alert('VRM 1.0 は未対応です．VRM 0.x を使用してください．'); resolve(null); return; }
      if (!THREE.VRM){ console.error('[VRM] UMD not found'); reject(new Error('VRM UMD not found')); return; }

      THREE.VRM.from(gltf).then((vrm)=>{
        currentVRM = vrm;

        // 見た目
        vrm.scene.rotation.set(0, Math.PI, 0); // カメラ向き
        vrm.scene.position.set(0, 0, 0);
        vrm.scene.scale.set(0.2, 0.2, 0.2);
        avatarAnchor.add(vrm.scene);
        vrm.scene.visible = false; // 初期は非表示（確定検出で表示）

        // ボタン状態
        const btn = $('toggleAvatarBtn');
        btn.disabled = false;
        btn.textContent = userHide ? 'アバター表示' : 'アバター非表示';

        // ★ 初期バインドを保存
        snapshotBindPose();

        // 直前のポーズがあれば再適用
        if (currentPoseUrl) applyPoseFromUrl(currentPoseUrl);

        log('アバター読込完了');
        resolve(vrm);
      }).catch(reject);
    }, undefined, reject);
  });
}

/* ===== 設定（vrm.json／pose.json）とUI配線 ===== */
const avatarSelect = $('avatarSelect');
let avatars = [];

async function loadAvatarList(){
  try{
    const vrmList = await fetch('./json/vrm.json').then(r=>r.json());
    avatars = (Array.isArray(vrmList) ? vrmList : []).map((a,i)=>({
      label: a?.label || a?.name || `Avatar ${i+1}`,
      url: a?.url
    }));
    avatarSelect.innerHTML = '';
    avatars.forEach((a,i)=>{
      const opt = document.createElement('option');
      opt.value=i; opt.textContent=a.label;
      avatarSelect.appendChild(opt);
    });
    if (avatars[0]?.url) await loadVRM(avatars[0].url);
  }catch(e){
    log('vrm.json 読み込み失敗');
  }
}

async function loadPoseList(){
  try{
    const poseList = await fetch('./json/pose.json').then(r=>r.json());
    poses = (Array.isArray(poseList) ? poseList : []).map((p,i)=>({
      label: p?.label || `Pose ${i+1}`,
      pose:  p?.pose
    }));
    poseSelect.innerHTML = '';
    const none = document.createElement('option');
    none.value = ''; none.textContent = '（未選択）';
    poseSelect.appendChild(none);
    poses.forEach((p)=>{
      const opt = document.createElement('option');
      opt.value = p.pose || '';
      opt.textContent = p.label;
      poseSelect.appendChild(opt);
    });
  }catch(e){
    console.error(e);
    log('pose.json 読み込み失敗');
  }
}

avatarSelect.addEventListener('change', async (e)=>{
  const idx = parseInt(e.target.value, 10);
  if (avatars[idx]?.url) await loadVRM(avatars[idx].url);
});

poseSelect.addEventListener('change', async (e)=>{
  const url = e.target.value;
  if (!url){ currentPoseUrl = null; return; }
  await applyPoseFromUrl(url);
});

$('debugCheck').addEventListener('change',(e)=>{
  const on = e.target.checked;
  dbg.axes.visible = on; dbg.ring.visible = on; dbg.plane.visible = on;
});

$('toggleAvatarBtn').addEventListener('click', ()=>{
  userHide = !userHide;
  if (currentVRM?.scene) currentVRM.scene.visible = hasDetectedOnce && !userHide;
  $('toggleAvatarBtn').textContent = userHide ? 'アバター表示' : 'アバター非表示';
});

/* ===== 起動・ループ ===== */
let started = false;
$('startBtn').addEventListener('click', async ()=>{
  if (started) return; started = true;
  log('カメラ起動中…');
  await initAR({facingMode:'environment'});
  setTimeout(async ()=>{
    const v = $('videoLayer');
    if (!v.videoWidth){ await initAR({facingMode:'user'}); }
    log('マーカーを映してください');
  }, 800);
  await loadAvatarList();
  await loadPoseList();
});

let lastMarkerVisible = false;
function animate(){
  requestAnimationFrame(animate);
  if (source?.ready) context.update(source.domElement);

  const markerVisible = markerRoot.visible;

  // 連続検出カウントと確定検出処理
  if (markerVisible){
    visibleStreak++;
    if (!hasDetectedOnce && visibleStreak >= DETECT_FRAMES){
      hasDetectedOnce = true;
      userHide = false;
      $('toggleAvatarBtn').textContent = 'アバター非表示';
      if (currentVRM?.scene){
        currentVRM.scene.visible = true;
      }
    }
    // 確定後でも，ユーザーが非表示中なら再検出で復帰
    if (hasDetectedOnce && userHide){
      userHide = false;
      $('toggleAvatarBtn').textContent = 'アバター非表示';
      if (currentVRM?.scene){
        currentVRM.scene.visible = true;
      }
    }
  }else{
    visibleStreak = 0;
  }

  // 表示維持：検出が切れてもユーザーが非表示にしない限り表示
  if (currentVRM?.scene){
    currentVRM.scene.visible = hasDetectedOnce && !userHide;
  }

  // UI 更新
  if (markerVisible !== lastMarkerVisible){
    lastMarkerVisible = markerVisible;
    $('detectBanner').style.display = markerVisible ? 'block' : 'none';
    dbg.ring.material.color.setHex(markerVisible ? 0x33ff66 : 0xff3333);
    log(markerVisible ? 'マーカー検出中' : (hasDetectedOnce ? 'マーカー未検出' : 'マーカー未検出'));
  }

  renderer.render(scene, camera);
}
animate();
