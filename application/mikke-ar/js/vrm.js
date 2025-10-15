(function(global){
  const Mikke = global.Mikke = global.Mikke || {};

  // =========================================
  // VRM（最小）＋ 複数軸の符号反転＆適用範囲
  // =========================================
  Mikke.VRM = {
    loader: new THREE.GLTFLoader(),
    currentVRM: null,
    currentPoseUrl: null,

    // ★反転したい軸を任意組み合わせ（true で符号反転）．
    //   pitch=X（前後），yaw=Y（左右），roll=Z（傾き）
    flipAxes: { pitch:true, yaw:false, roll:true },

    // ★どの範囲のボーンに適用するか：'head' | 'upper' | 'all'
    //   head＝neck／head のみ，upper＝腰より上（spine 以降），all＝全身
    flipScope: 'all',

    loadVRM,
    applyPoseFromUrl,
  };
  Mikke.VRM.loader.setCrossOrigin('anonymous');

  function $(id){ return document.getElementById(id); }

  // =========================================
  // VRM 読み込み（three-vrm 0.6，UMD）
  // =========================================
  async function loadVRM(url){
    if (!url) return;
    const absUrl = new URL(url, location.href).toString();

    if (Mikke.VRM.currentVRM){
      try{ Mikke.avatarAnchor.remove(Mikke.VRM.currentVRM.scene); }catch(_e){}
      Mikke.VRM.currentVRM = null;
    }

    return new Promise((resolve, reject)=>{
      Mikke.VRM.loader.load(absUrl, (gltf)=>{
        const ex = gltf.parser.json.extensions || {};
        if (ex.VRMC_vrm){ alert('VRM 1.0 は未対応です．VRM 0.x を使用してください．'); resolve(null); return; }
        if (!THREE.VRM){ console.error('[VRM] UMD not found'); reject(new Error('VRM UMD not found')); return; }

        THREE.VRM.from(gltf).then((vrm)=>{
          Mikke.VRM.currentVRM = vrm;

          vrm.scene.rotation.set(0, Math.PI, 0);
          vrm.scene.position.set(0, 0, 0);
          vrm.scene.scale.set(0.2, 0.2, 0.2);
          Mikke.avatarAnchor.add(vrm.scene);
          vrm.scene.visible = false;

          const btn = $('toggleAvatarBtn');
          if (btn){ btn.disabled = false; btn.textContent='アバター表示'; }

          if (Mikke.VRM.currentPoseUrl) applyPoseFromUrl(Mikke.VRM.currentPoseUrl);

          Mikke.log?.('アバター読込完了');
          resolve(vrm);
        }).catch(reject);
      }, undefined, reject);
    });
  }

  // -------------------------------
  // 反転をどのボーンに適用するか
  // -------------------------------
  function shouldFlip(bone, scope){
    if (scope === 'all') return true;
    if (scope === 'head') return (bone === 'neck' || bone === 'head');
    if (scope === 'upper'){
      const upper = new Set([
        'spine','chest','upperChest','neck','head',
        'leftShoulder','leftUpperArm','leftLowerArm','leftHand',
        'rightShoulder','rightUpperArm','rightLowerArm','rightHand'
      ]);
      return upper.has(bone);
    }
    return false;
  }

  // -------------------------------
  // 指定された軸（複数可）の角度符号だけ反転
  // -------------------------------
  function flipSelectedAxes(q, axes){
    // Euler(XYZ)→指定軸の符号反転→Quaternion
    const e = new THREE.Euler().setFromQuaternion(q, 'XYZ');
    if (axes.pitch) e.x = -e.x; // 前後
    if (axes.yaw)   e.y = -e.y; // 左右
    if (axes.roll)  e.z = -e.z; // 傾き
    return new THREE.Quaternion().setFromEuler(e).normalize();
  }

  // =========================================
  // setPose で適用（rotation/position を薄く整形）＋安全ガード（getBoneNodeを使わない）
  // =========================================
  async function applyPoseFromUrl(url){
    if (!Mikke.VRM.currentVRM || !url) return;
    try{
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const raw = await res.json();

      // {pose:{...}}／{humanoid:{...}}／トップ直下のいずれでも受ける
      const src = (raw && typeof raw==='object')
        ? (raw.pose && typeof raw.pose==='object' ? raw.pose
          : raw.humanoid && typeof raw.humanoid==='object' ? raw.humanoid
          : raw)
        : {};

      const humanoid = Mikke.VRM.currentVRM.humanoid;

      // ★ このVRMが実際に持つボーン名だけを集合にする（getBoneNodeは呼ばない）
      const validBones = new Set(Object.keys(humanoid?.humanBones || {}));

      const out = {};
      const axes  = Mikke.VRM.flipAxes;   // {pitch:boolean, yaw:boolean, roll:boolean}
      const scope = Mikke.VRM.flipScope;  // 'head'|'upper'|'all'

      const isFiniteQuatArray = (arr)=>{
        return Array.isArray(arr) && arr.length === 4 && arr.every(v => Number.isFinite(+v));
      };

      Object.keys(src).forEach((bone)=>{
        const spec = src[bone];
        if (!spec || typeof spec !== 'object') return;
        if (bone === 'expression' || bone === 'proxy' || bone === 'morph') return;

        // ★ VRMに存在しないボーンはここで除外（以後 getBoneNode を使わない）
        if (!validBones.has(bone)) return;

        const dst = {};

        // rotation（配列 or オブジェクト）
        if (Array.isArray(spec.rotation) && spec.rotation.length === 4){
          const r = [
            +spec.rotation[0],
            +spec.rotation[1],
            +spec.rotation[2],
            (spec.rotation[3]!=null ? +spec.rotation[3] : 1),
          ];
          if (!isFiniteQuatArray(r)) return;
          let q = new THREE.Quaternion(r[0], r[1], r[2], r[3]).normalize();
          if (shouldFlip(bone, scope)) q = flipSelectedAxes(q, axes);
          dst.rotation = [q.x, q.y, q.z, q.w];

        } else if (spec.rotation && typeof spec.rotation === 'object'){
          const rx = +spec.rotation.x || 0, ry = +spec.rotation.y || 0, rz = +spec.rotation.z || 0;
          const rw = (spec.rotation.w!=null ? +spec.rotation.w : 1);
          if (!Number.isFinite(rx) || !Number.isFinite(ry) || !Number.isFinite(rz) || !Number.isFinite(rw)) return;
          let q = new THREE.Quaternion(rx, ry, rz, rw).normalize();
          if (shouldFlip(bone, scope)) q = flipSelectedAxes(q, axes);
          dst.rotation = [q.x, q.y, q.z, q.w];
        }

        // position（そのまま通す／数値でない場合は無視）
        if (Array.isArray(spec.position) && spec.position.length === 3){
          const p = [ +spec.position[0]||0, +spec.position[1]||0, +spec.position[2]||0 ];
          if (p.every(v => Number.isFinite(v))) dst.position = p;
        } else if (spec.position && typeof spec.position === 'object'){
          const p = [ +spec.position.x||0, +spec.position.y||0, +spec.position.z||0 ];
          if (p.every(v => Number.isFinite(v))) dst.position = p;
        }

        if (dst.rotation || dst.position) out[bone] = dst;
      });

      // ★ 何も残らなければ setPose を呼ばない（安全スキップ）
      if (!Object.keys(out).length){
        Mikke.log?.('このVRMに適用可能なボーンがありませんでした．');
        return;
      }

      humanoid?.setPose?.(out);  // ← ここで内部が getBoneNode を呼ぶが，既に valid のみ
      Mikke.VRM.currentVRM.scene.updateMatrixWorld(true);
      Mikke.VRM.currentPoseUrl = url;
      Mikke.log?.('ポーズ適用（setPose＋ガード付き）：' + url);
    }catch(e){
      console.error('[POSE] setPose error', e);
      // 挙動は変えないためログのみに留める
    }
  }



})(window);
