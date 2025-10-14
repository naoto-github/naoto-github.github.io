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
          if (btn){ btn.disabled = false; btn.textContent = Mikke.userHide ? 'アバター表示' : 'アバター非表示'; }

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
  // setPose で適用（rotation/position を薄く整形）
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

      const out = {};
      const axes  = Mikke.VRM.flipAxes;   // {pitch:boolean, yaw:boolean, roll:boolean}
      const scope = Mikke.VRM.flipScope;  // 'head'|'upper'|'all'

      Object.keys(src).forEach((bone)=>{
        const spec = src[bone];
        if (!spec || typeof spec !== 'object') return;
        if (bone === 'expression' || bone === 'proxy' || bone === 'morph') return;

        const dst = {};

        // rotation（配列 or オブジェクト）
        if (Array.isArray(spec.rotation) && spec.rotation.length === 4){
          let q = new THREE.Quaternion(
            +spec.rotation[0]||0, +spec.rotation[1]||0, +spec.rotation[2]||0,
            (spec.rotation[3]!=null?+spec.rotation[3]:1)
          ).normalize();
          if (shouldFlip(bone, scope)) q = flipSelectedAxes(q, axes);
          dst.rotation = [q.x, q.y, q.z, q.w];

        } else if (spec.rotation && typeof spec.rotation === 'object'){
          let q = new THREE.Quaternion(
            +spec.rotation.x||0, +spec.rotation.y||0, +spec.rotation.z||0,
            (spec.rotation.w!=null?+spec.rotation.w:1)
          ).normalize();
          if (shouldFlip(bone, scope)) q = flipSelectedAxes(q, axes);
          dst.rotation = [q.x, q.y, q.z, q.w];
        }

        // position（必要ならここでスケールや反転を追加）
        if (Array.isArray(spec.position) && spec.position.length === 3){
          dst.position = [ +spec.position[0]||0, +spec.position[1]||0, +spec.position[2]||0 ];
        } else if (spec.position && typeof spec.position === 'object'){
          dst.position = [ +spec.position.x||0, +spec.position.y||0, +spec.position.z||0 ];
        }

        if (dst.rotation || dst.position) out[bone] = dst;
      });

      Mikke.VRM.currentVRM.humanoid?.setPose?.(out);
      Mikke.VRM.currentVRM.scene.updateMatrixWorld(true);
      Mikke.VRM.currentPoseUrl = url;
      Mikke.log?.('ポーズ適用（setPose＋複数軸反転）：' + url);
    }catch(e){
      console.error('[POSE] setPose error', e);
      //Mikke.log?.('ポーズの読み込みに失敗しました．JSONの形式とパスを確認してください．');
    }
  }
})(window);
