(function(global){
  const Mikke = global.Mikke = global.Mikke || {};

  // 共有リソース置き場
  Mikke.AR = {
    source: null,
    context: null,
    markerRoot: new THREE.Group(),
    attachVideoToBackground,
    initAR,
    onResize
  };

  // マーカー用デバッグ可視化（app.js から参照）
  Mikke.Debug = {
    axes:  new THREE.AxesHelper(1.0),
    ring:  new THREE.Mesh(new THREE.RingGeometry(0.55, 0.65, 64), new THREE.MeshBasicMaterial({ color: 0xff3333, side: THREE.DoubleSide })),
    plane: new THREE.Mesh(new THREE.PlaneGeometry(1,1), new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.15 }))
  };
  Mikke.Debug.ring.rotation.x  = -Math.PI/2;
  Mikke.Debug.plane.rotation.x = -Math.PI/2;

  function $(id){ return document.getElementById(id); }
  function attachVideoToBackground(){
    const arVideo = Mikke.AR.source?.domElement;
    const bgVideo = $('videoLayer');
    if (arVideo && bgVideo && arVideo.srcObject) bgVideo.srcObject = arVideo.srcObject;
  }

  function onResize(){
    if (!Mikke.AR.source) return;
    Mikke.AR.source.onResizeElement();
    Mikke.AR.source.copyElementSizeTo(Mikke.renderer.domElement);
    if (Mikke.AR.context?.arController){
      Mikke.AR.source.copyElementSizeTo(Mikke.AR.context.arController.canvas);
    }
  }

  async function initAR({facingMode='environment'} = {}){
    Mikke.AR.source = new THREEx.ArToolkitSource({ sourceType:'webcam', facingMode });
    return new Promise((resolve)=>{
      Mikke.AR.source.init(async ()=>{
        try{ await Mikke.AR.source.domElement.play?.(); }catch(_e){}
        window.addEventListener('resize', onResize);
        setTimeout(onResize, 100);
        attachVideoToBackground();

        Mikke.AR.context = new THREEx.ArToolkitContext({
          cameraParametersUrl:'./assets/camera_para.dat',
          detectionMode:'mono',
          maxDetectionRate:60,
          canvasWidth:640, canvasHeight:480
        });
        Mikke.AR.context.init(()=>{
          Mikke.camera.projectionMatrix.copy(Mikke.AR.context.getProjectionMatrix());
          new THREEx.ArMarkerControls(Mikke.AR.context, Mikke.AR.markerRoot, {
            type:'pattern', patternUrl:'./assets/pattern-hiro.patt'
          });
          Mikke.AR.markerRoot.visible = false; // 初期不可視
          resolve();
        });
      }, (err)=>{ Mikke.log('カメラ初期化エラー：' + (err?.message || '不明')); resolve('error'); });
    });
  }
})(window);
