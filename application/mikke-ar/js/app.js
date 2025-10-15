(function(global){
  const Mikke = global.Mikke = global.Mikke || {};

  /* ===== ユーティリティ ===== */
  Mikke.$ = (id)=>document.getElementById(id);
  Mikke.log = (m)=>{ Mikke.$('log').textContent = m; };

  /* ===== three.js 基本設定 ===== */
  Mikke.renderer = new THREE.WebGLRenderer({ canvas: Mikke.$('threeLayer'), antialias:true, alpha:true });
  Mikke.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  Mikke.renderer.setSize(window.innerWidth, window.innerHeight);
  Mikke.renderer.setClearColor(0x000000, 0);

  Mikke.scene  = new THREE.Scene();
  Mikke.camera = new THREE.Camera();
  Mikke.scene.add(Mikke.camera);

  Mikke.scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const dir = new THREE.DirectionalLight(0xffffff, 0.8); dir.position.set(1,1,1); Mikke.scene.add(dir);

  // 画面中央アンカー
  Mikke.avatarAnchor = new THREE.Group();
  Mikke.avatarAnchor.position.set(0, -0.2, -1.0);
  Mikke.camera.add(Mikke.avatarAnchor);

  // マーカーRootとデバッグ表示
  Mikke.AR.markerRoot.visible = false;
  Mikke.scene.add(Mikke.AR.markerRoot);
  Mikke.AR.markerRoot.add(Mikke.Debug.axes);
  Mikke.AR.markerRoot.add(Mikke.Debug.ring);
  Mikke.AR.markerRoot.add(Mikke.Debug.plane);
  Mikke.Debug.axes.visible = false; Mikke.Debug.ring.visible = false; Mikke.Debug.plane.visible = false;

  /* ===== 表示制御フラグ ===== */
  Mikke.hasDetectedOnce = false;
  Mikke.userHide = true;
  Mikke.visibleStreak = 0;
  Mikke.DETECT_FRAMES = 8;

  // 初期状態のボタン表記と可視状態を強制
  const initBtn = Mikke.$('toggleAvatarBtn');
  if (initBtn) initBtn.textContent = 'アバター表示';
  if (Mikke.VRM.currentVRM?.scene) Mikke.VRM.currentVRM.scene.visible = false;


  /* ===== UIロード／イベント ===== */
  const avatarSelect = Mikke.$('avatarSelect');
  const poseSelect   = Mikke.$('poseSelect');

  let avatars = [];
  let poses   = [];

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
      if (avatars[0]?.url) await Mikke.VRM.loadVRM(avatars[0].url);
      
    }catch(e){
      Mikke.log('vrm.json 読み込み失敗');
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
      Mikke.log('pose.json 読み込み失敗');
    }
  }


  avatarSelect.addEventListener('change', async (e)=>{
    const idx = parseInt(e.target.value, 10);
    if (avatars[idx]?.url) {
      await Mikke.VRM.loadVRM(avatars[idx].url);

      // ★ 選択直後は「未表示」へ戻す
      //Mikke.hasDetectedOnce = true;
      //Mikke.userHide = false;

      if(Mikke.userHide == false){
        const btn = Mikke.$('toggleAvatarBtn');
        if (btn) btn.textContent = 'アバター非表示';
      }

      if (Mikke.VRM.currentVRM?.scene) Mikke.VRM.currentVRM.scene.visible = false;
    }
  });


  poseSelect.addEventListener('change', async (e)=>{
    const url = e.target.value;
    if (!url){ Mikke.VRM.currentPoseUrl = null; return; }
    await Mikke.VRM.applyPoseFromUrl(url);
  });

  Mikke.$('debugCheck').addEventListener('change',(e)=>{
    const on = e.target.checked;
    Mikke.Debug.axes.visible  = on;
    Mikke.Debug.ring.visible  = on;
    Mikke.Debug.plane.visible = on;
  });

  // アバター表示／非表示トグル（「表示」時は検出済みと同じ扱いに）
  Mikke.$('toggleAvatarBtn').addEventListener('click', ()=>{
    const btn = Mikke.$('toggleAvatarBtn');
    const vrmScene = Mikke.VRM.currentVRM?.scene;
    if (!vrmScene) {
      Mikke.log('アバター未読込のため操作できません．');
      return;
    }

    if (Mikke.userHide || !Mikke.hasDetectedOnce || !vrmScene.visible) {
      // いま非表示側 → 表示にする（検出済み扱いにして持続表示）
      Mikke.userHide = false;
      Mikke.hasDetectedOnce = true;        // ★ 検出済みフラグを立てて持続表示を許可
      vrmScene.visible = true;
      btn.textContent = 'アバター非表示';
      Mikke.log('アバターを表示しました．');
    } else {
      // いま表示側 → 非表示にする
      Mikke.userHide = true;
      vrmScene.visible = false;
      btn.textContent = 'アバター表示';
      Mikke.log('アバターを非表示にしました．');
    }
  });


  // ===== 追加：モバイル向け UI 開閉 =====
  const moreBtn    = Mikke.$('moreBtn');
  const uiDetails  = document.getElementById('uiDetails');

  function toggleDetails(force) {
    const willOpen = (typeof force === 'boolean') ? force : !uiDetails.classList.contains('open');
    uiDetails.classList.toggle('open', willOpen);
    if (moreBtn) moreBtn.setAttribute('aria-expanded', String(willOpen));
  }

  if (moreBtn) {
    moreBtn.addEventListener('click', () => toggleDetails());
  }

  // セレクト操作後は自動で閉じる（モバイル親指操作を想定）
  ['avatarSelect','poseSelect'].forEach(id => {
    const el = Mikke.$(id);
    el?.addEventListener('change', () => {
      // 小画面時のみ閉じる
      if (window.matchMedia('(max-width: 599px)').matches) toggleDetails(false);
    });
  });

  // 端末回転やアドレスバー変動に追随（安全領域と描画リサイズ）
  window.addEventListener('resize', ()=>{
    try { Mikke.AR.onResize?.(); } catch(_) {}
    Mikke.renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive:true });

  /* ===== 起動・ループ ===== */
  let started = false;
  Mikke.$('startBtn').addEventListener('click', async ()=>{
    if (started) return; started = true;
    Mikke.log('カメラ起動中…');
    await Mikke.AR.initAR({facingMode:'environment'});
    setTimeout(async ()=>{
      const v = Mikke.$('videoLayer');
      if (!v.videoWidth){ await Mikke.AR.initAR({facingMode:'user'}); }
      Mikke.log('マーカーを映してください');
    }, 800);
    await loadAvatarList();
    await loadPoseList();
  });

  let lastMarkerVisible = false;
  function animate(){
    requestAnimationFrame(animate);
    if (Mikke.AR.source?.ready) Mikke.AR.context.update(Mikke.AR.source.domElement);

    const markerVisible = Mikke.AR.markerRoot.visible;

    if (markerVisible){
      Mikke.visibleStreak++;
      if (!Mikke.hasDetectedOnce && Mikke.visibleStreak >= Mikke.DETECT_FRAMES){
        Mikke.hasDetectedOnce = true;
        Mikke.userHide = false;
        Mikke.$('toggleAvatarBtn').textContent = 'アバター非表示';
        if (Mikke.VRM.currentVRM?.scene) Mikke.VRM.currentVRM.scene.visible = true;
      }
      if (Mikke.hasDetectedOnce && Mikke.userHide){
        Mikke.userHide = false;
        Mikke.$('toggleAvatarBtn').textContent = 'アバター非表示';
        if (Mikke.VRM.currentVRM?.scene) Mikke.VRM.currentVRM.scene.visible = true;
      }
    }else{
      Mikke.visibleStreak = 0;
    }

    if (Mikke.VRM.currentVRM?.scene){
      Mikke.VRM.currentVRM.scene.visible = Mikke.hasDetectedOnce && !Mikke.userHide;
    }

    if (markerVisible !== lastMarkerVisible){
      lastMarkerVisible = markerVisible;
      Mikke.$('detectBanner').style.display = markerVisible ? 'block' : 'none';
      Mikke.Debug.ring.material.color.setHex(markerVisible ? 0x33ff66 : 0xff3333);
      Mikke.log(markerVisible ? 'マーカー検出中' : (Mikke.hasDetectedOnce ? 'マーカー未検出' : 'マーカー未検出'));
    }

    Mikke.renderer.render(Mikke.scene, Mikke.camera);
  }
  animate();
})(window);
