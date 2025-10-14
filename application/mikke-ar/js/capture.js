// capture.js
(function(){
  const $ = (id)=>document.getElementById(id);

  // video の object-fit: cover を再現して描画
  function drawVideoCover(ctx, video, dstW, dstH){
    const vw = video.videoWidth || dstW;
    const vh = video.videoHeight || dstH;
    if (!vw || !vh) { ctx.drawImage(video, 0, 0, dstW, dstH); return; }
    const vr = vw / vh, dr = dstW / dstH;
    let sx, sy, sw, sh;
    if (vr > dr){ sh = vh; sw = Math.floor(vh * dr); sx = Math.floor((vw - sw)/2); sy = 0; }
    else        { sw = vw; sh = Math.floor(vw / dr);  sx = 0;                         sy = Math.floor((vh - sh)/2); }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, dstW, dstH);
  }

  // three.js を1フレームだけ強制レンダリング（アバターを最新状態で）
  function forceRenderIfPossible(){
    try {
      if (window.Mikke?.renderer && window.Mikke?.scene && window.Mikke?.camera){
        // 端末回転直後のサイズズレに保険
        const w = window.innerWidth, h = window.innerHeight;
        const r = window.devicePixelRatio || 1;
        if (Mikke.renderer.domElement.width !== Math.floor(w*r) ||
            Mikke.renderer.domElement.height !== Math.floor(h*r)){
          Mikke.renderer.setPixelRatio(r);
          Mikke.renderer.setSize(w, h, false);
        }
        Mikke.renderer.render(Mikke.scene, Mikke.camera);
      }
    } catch(_) {}
  }

  async function captureComposite(){
    const video = $('videoLayer');
    const webgl = $('threeLayer'); // Mikke.renderer.domElement を想定
    // three の実表示解像度に合わせる（高精細端末対応）
    const w = webgl?.width  || window.innerWidth;
    const h = webgl?.height || window.innerHeight;

    // 撮影直前に1フレームだけ描画して，アバターを必ず表示させる
    forceRenderIfPossible();

    // 合成用キャンバス
    const cvs = document.createElement('canvas');
    cvs.width = w; cvs.height = h;
    const ctx = cvs.getContext('2d');

    // 背面：カメラ映像 → 前面：WebGL（アバター）
    drawVideoCover(ctx, video, w, h);

    // ここで WebGL キャンバスを合成（CORSに問題があると例外になる可能性）
    try {
      if (webgl) ctx.drawImage(webgl, 0, 0, w, h);
    } catch (e){
      console.warn('WebGLキャンバスの合成でエラーが発生しました．CORS設定を確認してください．', e);
      alert('画像の保存に失敗しました．モデルやテクスチャの配信元にCORS許可（Access-Control-Allow-Origin）を設定してください．');
      throw e;
    }

    // PNG保存
    const blob = await new Promise(res => cvs.toBlob(res, 'image/png', 0.92));
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
        capBtn.classList.add('shot');   // フラッシュ演出（CSS側）
        await captureComposite();
      } finally {
        setTimeout(()=>capBtn.classList.remove('shot'), 180);
      }
    });
  }
})();
