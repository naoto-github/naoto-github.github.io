// js/gesture.js
// 既存コードは変更せず，Mikke.avatarAnchor をドラッグ／ホイールで操作するだけ
(function () {
  const $ = (id) => document.getElementById(id);
  const canvas = $('threeLayer');

  // 念のため：ブラウザのスクロールやダブルタップズームを抑制
  if (canvas) {
    canvas.style.touchAction = 'none';
    canvas.style.userSelect = 'none';
  }

  // 操作対象（VRMは既に Mikke.avatarAnchor 配下．ロード後でも参照は同じ）
  const getAnchor = () => (window.Mikke && Mikke.avatarAnchor) ? Mikke.avatarAnchor : null;

  // 状態
  let isDown = false;
  let lastX = 0, lastY = 0;

  // 感度（必要に応じて微調整）
  const ROT_SENS = 0.005;  // 水平ドラッグ → Yaw 回転
  const ZOOM_SENS = 0.004; // 垂直ドラッグ → スケール（expベース）
  const WHEEL_SENS = 0.0016;

  // スケールの上下限（VRM本体は0.2．アンカーで相対的に拡大縮小する）
  const MIN_S = 0.3;
  const MAX_S = 3.0;

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function onPointerDown(e){
    if (!getAnchor()) return;
    isDown = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e){
    if (!isDown || !getAnchor()) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    const anchor = getAnchor();

    // 1) 水平ドラッグで Y 回転（左右に回す）
    anchor.rotation.y += dx * ROT_SENS;

    // 2) 垂直ドラッグで 拡大縮小（上へドラッグ＝拡大／下へドラッグ＝縮小）
    const k = Math.exp(-dy * ZOOM_SENS);
    const cur = anchor.scale.x; // 等方拡大前提
    const next = clamp(cur * k, MIN_S, MAX_S);
    anchor.scale.set(next, next, next);
  }

  function onPointerUp(e){
    isDown = false;
    try { canvas.releasePointerCapture?.(e.pointerId); } catch(_) {}
  }

  // ホイールでも拡大縮小（PC向け）
  function onWheel(e){
    if (!getAnchor()) return;
    // 通常は e.deltaY>0 で縮小．感度と一緒に反転制御
    const dir = -e.deltaY; 
    const k = Math.exp(dir * WHEEL_SENS);
    const anchor = getAnchor();
    const cur = anchor.scale.x;
    const next = clamp(cur * k, MIN_S, MAX_S);
    anchor.scale.set(next, next, next);
  }

  // ダブルタップ／ダブルクリックでリセット（任意・便利機能）
  let lastTap = 0;
  function maybeReset(e){
    const now = performance.now();
    if (now - lastTap < 280 && getAnchor()){
      const a = getAnchor();
      a.rotation.set(0, 0, 0);      // 既定は Y=0．（VRM自体は 0,PI,0 で読み込み済）
      a.scale.set(1, 1, 1);         // アンカーのスケールを既定へ
      e.preventDefault();
    }
    lastTap = now;
  }

  // イベント登録
  if (canvas){
    canvas.addEventListener('pointerdown', onPointerDown, {passive:false});
    canvas.addEventListener('pointermove', onPointerMove, {passive:false});
    canvas.addEventListener('pointerup', onPointerUp, {passive:true});
    canvas.addEventListener('pointercancel', onPointerUp, {passive:true});
    canvas.addEventListener('wheel', onWheel, {passive:true});
    canvas.addEventListener('pointerdown', maybeReset, {passive:false}); // ダブルタップ判定
  }

  // 画面サイズ更新時も違和感が出ないよう，何もしなくてOK（既存のリサイズ処理に追随）
  // ARや描画ループは既存 app.js / ar.js に任せる．
})();
