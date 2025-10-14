// capture.js
(function(){
  const $ = (id)=>document.getElementById(id);

  // video の object-fit: cover を再現して描画（見た目サイズにフィット）
  function drawVideoCover(ctx, video, dstW, dstH){
    const vw = video.videoWidth  || dstW;
    const vh = video.videoHeight || dstH;
    if (!vw || !vh){
      ctx.drawImage(video, 0, 0, dstW, dstH);
      return;
    }
    const vr = vw / vh;       // ソース比
    const dr = dstW / dstH;   // 表示比
    let sx, sy, sw, sh;
    if (vr > dr){
      // 横長 → 左右をトリミング
      sh = vh;
      sw = Math.floor(vh * dr);
      sx = Math.floor((vw - sw) / 2);
      sy = 0;
    } else {
      // 縦長 → 上下をトリミング
      sw = vw;
      sh = Math.floor(vw / dr);
      sx = 0;
      sy = Math.floor((vh - sh) / 2);
    }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, dstW, dstH);
  }

  // 撮影直前に three.js の表示系を「見た目サイズ」に厳密同期
  function syncThreeToClientSize(){
    try{
      const r = window.Mikke?.renderer;
      const c = window.Mikke?.camera;
      const webgl = $('threeLayer');
      if (!r || !c || !webgl) return;

      // 画面の「見た目サイズ」（CSSピクセル）
      const clientW = webgl.clientWidth  || window.innerWidth;
      const clientH = webgl.clientHeight || window.innerHeight;

      // カメラのアスペクトを更新
      const aspect = clientW / Math.max(1, clientH);
      if (Math.abs(c.aspect - aspect) > 1e-6){
        c.aspect = aspect;
        c.updateProjectionMatrix();
      }

      // ピクセル比＆レンダラサイズ（内部バッファは高解像度で確保）
      const dpr = window.devicePixelRatio || 1;
      r.setPixelRatio(dpr);
      r.setSize(clientW, clientH, false);

      // 1フレーム強制描画（最新姿勢で）
      r.render(window.Mikke.scene, c);
    }catch(_){}
  }

  async function captureComposite(){
    const video = $('videoLayer');
    const webgl = $('threeLayer');
    if (!video || !webgl) return;

    // three を見た目サイズに同期してから描画
    syncThreeToClientSize();

    // 見た目サイズで合成（＝ユーザが見ている比率のまま）
    const clientW = webgl.clientWidth  || window.innerWidth;
    const clientH = webgl.clientHeight || window.innerHeight;

    const off = document.createElement('canvas');
    off.width = clientW;
    off.height = clientH;
    const ctx = off.getContext('2d');

    // 背面：カメラ映像（coverでクロップ）
    drawVideoCover(ctx, video, clientW, clientH);

    // 前面：WebGLキャンバスを見た目サイズにリサンプルして重ねる
    // ソースは内部解像度（webgl.width / height），ターゲットは clientW / clientH
    try{
      ctx.drawImage(webgl, 0, 0, webgl.width, webgl.height, 0, 0, clientW, clientH);
    }catch(e){
      console.warn('WebGLキャンバス合成時にエラー．CORS設定を確認してください．', e);
      alert('保存に失敗しました．VRMやテクスチャの配信元に Access-Control-Allow-Origin を設定してください．');
      throw e;
    }

    // PNG保存
    const blob = await new Promise(res => off.toBlob(res, 'image/png', 0.92));
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date();
    const pad = (n)=>String(n).padStart(2,'0');
    const fname = `mikke_${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}.png`;
    a.href = url; a.download = fname;
    document.body.appendChild(a);
    a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
  }

  const capBtn = $('captureBtn');
  if (capBtn){
    capBtn.addEventListener('click', async ()=>{
      try{
        capBtn.classList.add('shot');   // フラッシュ演出
        await captureComposite();
      } finally {
        setTimeout(()=>capBtn.classList.remove('shot'), 180);
      }
    });
  }
})();
