// capture.js（潰れ補正版：非等方スケールを忠実反映）
(function(){
  const $ = (id)=>document.getElementById(id);

  // video の object-fit: cover を再現して描画（出力キャンバスの見た目サイズに合わせる）
  function drawVideoCover(ctx, video, dstW, dstH){
    const vw = video.videoWidth  || dstW;
    const vh = video.videoHeight || dstH;
    if (!vw || !vh){
      ctx.drawImage(video, 0, 0, dstW, dstH);
      return;
    }
    const vr = vw / vh;       // ソース比
    const dr = dstW / dstH;   // 出力比
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

  // 撮影直前に 1フレームだけ描画（最新状態で保存）
  function forceRenderIfPossible(){
    try {
      if (window.Mikke?.renderer && window.Mikke?.scene && window.Mikke?.camera){
        window.Mikke.renderer.render(window.Mikke.scene, window.Mikke.camera);
      }
    } catch(_) {}
  }

  async function captureComposite(){
    const video = $('videoLayer');
    const webgl = $('threeLayer'); // three.js の <canvas>
    if (!video || !webgl) return;

    // 1) 直前に強制レンダリング（姿勢やポーズを最新に）
    forceRenderIfPossible();

    // 2) 画面上の「見た目サイズ」（CSSピクセル）を正として合成
    const rect = webgl.getBoundingClientRect(); // 実際にユーザが見ているサイズ
    const outW = Math.max(1, Math.round(rect.width));
    const outH = Math.max(1, Math.round(rect.height));

    const cvs = document.createElement('canvas');
    cvs.width = outW; cvs.height = outH;
    const ctx = cvs.getContext('2d');

    // 背面：カメラ映像を cover で敷く（画面の見た目と同じ構図）
    drawVideoCover(ctx, video, outW, outH);

    // 3) 前面：WebGLキャンバスを「内部解像度→見た目サイズ」へ非等方スケールで合成
    //    これにより画面上の伸縮（XとYで倍率が異なる場合）を忠実に再現できる
    try{
      const srcW = webgl.width;   // 内部ピクセル（DPR考慮済み）
      const srcH = webgl.height;
      const scaleX = outW / Math.max(1, srcW);
      const scaleY = outH / Math.max(1, srcH);

      ctx.save();
      // threeLayer が画面全体でない場合に備え，左上オフセットを反映したいときは translate を有効化
      // const offsetX = Math.round(rect.left);
      // const offsetY = Math.round(rect.top);
      // ctx.translate(offsetX, offsetY);

      // 非等方スケールを適用してから，内部解像度のまま描画
      ctx.scale(scaleX, scaleY);
      ctx.drawImage(webgl, 0, 0); // ソースは (0,0)-(srcW,srcH)
      ctx.restore();
    }catch(e){
      console.warn('WebGLキャンバス合成でエラー（CORSの可能性あり）．', e);
      alert('保存に失敗しました．VRMやテクスチャの配信元に CORS 設定（Access-Control-Allow-Origin）を有効にしてください．');
      throw e;
    }

    // 4) PNG保存
    const blob = await new Promise(res => cvs.toBlob(res, 'image/png', 0.92));
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const t = new Date(); const z=(n)=>String(n).padStart(2,'0');
    a.href = url;
    a.download = `mikke_${t.getFullYear()}${z(t.getMonth()+1)}${z(t.getDate())}_${z(t.getHours())}${z(t.getMinutes())}${z(t.getSeconds())}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
  }

  // ボタンにバインド（既存HTML/CSSはそのまま）
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
