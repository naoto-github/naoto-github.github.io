// マップ・オブジェクト
let map;

// 昆虫の採集データ
// let collections = [];

// マーカー・オブジェクト
let markers = [];

// マーカーのインデックス
let marker_index = 0;

// デフォルトのチーム名
let default_team_name = "チームA";

// マーカーの追加
function makeMarker(collection){
  let team = collection.team;
  let lat = collection.lat;
  let lng = collection.lng;
  let image = collection.image;
  let icon_path = "./icons/" + collection.icon;
      
  let icon = L.icon({
    iconUrl: icon_path,
    iconSize: [48, 48],
  });
      
  let marker = L.marker([lat, lng], {
    icon: icon,
  });
      
  let popupContent = 
    `
    <div class="insect">
      <h3>${team}</h3>
      <div>
        <img class="popup-image" src="${image}">
      </div>
    </div>
    `;
      
  let popup = L.popup({
    maxWidth: 550,
    maxHeight: 550,
    autoPan: false,
    offset: L.point(325, 275),
  });
      
  popup.setContent(popupContent);
  marker.bindPopup(popup);
  
  return marker;   
}

// サイズを縮小したbase64画像への変換
function convert(base64, target_width, target_height){
  let width;
  let height;
  
  let image = Image();
  image.src = base64;
  
  image.onload = function(){
    if(image.width > image.height){
      let ratio = image.height / image.width;
      width = target_width;
      height = target_height * ratio;
    }
    else{
      let ratio = image.width / image.height;
      width = target_width * ratio;
      height = target_height;
    }

    let canvas =  $("<canvas id='canvas' width='0' height='0' ></canvas>").attr('width', width).attr('height', height);
    let ctx = canvas[0].getContext("2d");

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

    let base64 = canvas.get(0).toDataURL("image/jpeg");
    return base64;
  }
}

// Vueオブジェクト
vue = new Vue({
  el: "#app",
  data: {
    title: "デジタル昆虫探検マップ",
    start_latlng: L.latLng(config.default_lat, config.default_lng),
    lat: 0,
    lng: 0,
    zoom: config.default_zoom,
    min_zoom: config.default_min_zoom,
    max_zoom: config.default_max_zoom,
    circle_radius: config.default_circle_radius,
    visibility: "visibility: hidden",
    isEnter: false,
    image_team: default_team_name,
    image_icon: "icon_humei.png",
    image_files: [],
    image_name: "",
    image_lat: 0,
    image_lng: 0,
    image_base64: "",
    image_file: null,
    download_url: "",
    gps_flg: false,
  },
  mounted: function(){
    
    this.lat = this.start_latlng.lat;
    this.lng = this.start_latlng.lng;
    
    map = L.map("map", {
      keyboard: true,
      dragging: true,
      doubleClickZoom: false,
      trackResize: false,
      boxZoom: false,
      zoomControl: false,
      attributionControl: false,
      zoom: this.zoom,
      minZoom: this.min_zoom,
      maxZoom: this.max_zoom,
      keyboardPanDelta: 40,
    });
    
    map.setView(this.start_latlng);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(map);
    
    // マップの中心に円を表示
    let center_circle = L.circle(map.getCenter(), {
      fillColor: "red",
      stroke: false,
      fillOpacity: 0.2,
      radius: this.circle_radius,
    }).addTo(map);
    
    // マーカーの表示
    for(let collection of collections){
      let marker = makeMarker(collection);
      marker.addTo(map);
      markers.push(marker);
    }

    // ダウンロード用のURL
    let blob = new Blob([JSON.stringify(collections)], {type: 'application\/json'});
    this.download_url = URL.createObjectURL(blob);
    
    // 地図を移動させたときのイベント処理
    let circle_radius = this.circle_radius;
    map.on("moveend", function(e){
      $("#input-lat")[0].dispatchEvent(new Event("move"));
      $("#input-lng")[0].dispatchEvent(new Event("move"));  
      
      let center = map.getCenter();
      center_circle.setLatLng(center);
      
      let min_distance = Number.POSITIVE_INFINITY;
      let min_marker = null;
      for(let marker of markers){
        let distance = center.distanceTo(marker.getLatLng());
        if(distance < min_distance){
          min_distance = distance;
          min_marker = marker;
        }
      }
      
      if(min_distance < circle_radius){
        min_marker.openPopup();
      }
      else{
        for(let marker of markers){
          marker.closePopup();
        }
      }
    });
    
    // キーが押されたときのイベント処理
    let start_latlng = this.start_latlng;
    map.on("keypress", function(e){
      let key = e.originalEvent.key;
      console.log(key);
            
      if(key == "h"){
        map.panTo(start_latlng);
      }
      else if(key == "i"){
        map.zoomIn();
      }
      else if(key == "o"){
        map.zoomOut();
      }
      else if(key == "n"){
        if(markers.length > 0){
          marker_index += 1;
          if(markers.length <= marker_index){
            marker_index = 0;
          }          
          let marker = markers[marker_index];
          map.panTo(marker.getLatLng());
        }
      }
      else if(key == "p"){
        if(markers.length > 0){
          marker_index -= 1;
          if(marker_index < 0){
            marker_index = markers.length - 1;
          }
          let marker = markers[marker_index];
          map.panTo(marker.getLatLng());
        }
      }
    });
  },
  methods: {
    updateLat(){
      let center = map.getCenter()
      this.lat = center.lat.toFixed(5);
    },
    updateLng(){
      let center = map.getCenter()
      this.lng = center.lng.toFixed(5);   
    },
    toggle(){
      if(this.visibility == "visibility: hidden"){
        this.visibility = "visibility: visible";
        this.image_team = default_team_name;
        this.image_icon = "icon_humei.png";
        this.image_name = "";
        this.image_lat = 0;
        this.image_lng = 0;
        this.image_base64 = "";
        this.$refs.image_input.value = "";
        this.gps_flg = false;
      }
      else{
        this.visibility = "visibility: hidden";
      }
    },
    dragEnter(){
      // console.log("dragEnter");
      this.isEnter = true;
    },
    dragLeave(){
      // console.log("dragLeave");
      this.isEnter = false;
    },
    dragOver(){
      // console.log("dragOver");
    },
    async uploadFile(){
      //console.log("select");
      this.files = [...event.target.files];
      if(this.files.length > 0){
        this.image_file = this.files[0]
        
        // 画像ファイル名の取得
        this.image_name = this.image_file.name;
        
        // 緯度経度の取得
        try{
          let latlng = await exifr.gps(this.image_file);
          this.image_lat = latlng["latitude"];
          this.image_lng = latlng["longitude"];
        }
        catch(e){
          this.image_lat = 0;
          this.image_lng = 0;
          this.gps_flg = true;
        }
          
        // 画像をbase64に変換
        let image = new Image();
        let reader = new FileReader();
        reader.onload = (event) =>{
          image.src = event.currentTarget.result;       
        }
        await reader.readAsDataURL(this.image_file);
        
        //**************************************
        // 画像の縮小
        let base64;
        let promise = new Promise(function(resolve){
          
          image.onload = () =>{
            let width;
            let height;
            let target_width = 500;
            let target_height = 500;

            if(image.width > image.height){
              let ratio = image.height / image.width;
              width = target_width;
              height = target_height * ratio;
            }
            else{
              let ratio = image.width / image.height;
              width = target_width * ratio;
              height = target_height;
            }

            let canvas =  $("<canvas id='canvas' width='0' height='0' ></canvas>").attr('width', width).attr('height', height);
            let ctx = canvas[0].getContext("2d");

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

            base64 = canvas.get(0).toDataURL("image/jpeg");
            //console.log(base64);
            
            resolve();
          }
        })
        
        await promise.then((value) => {
          this.image_base64 = base64;
        })
        //**************************************
      }
    },
    async dropFile(){
      // console.log("dropFile");
      this.files = [...event.dataTransfer.files]
      this.isEnter = false;
      
      if(this.files.length > 0){
        this.image_file = this.files[0]
        
        // 画像ファイル名の取得
        this.image_name = this.image_file.name;
        
        // 緯度経度の取得
        try{
          let latlng = await exifr.gps(this.image_file);
          this.image_lat = latlng["latitude"];
          this.image_lng = latlng["longitude"];
        }
        catch(e){
          this.image_lat = 0;
          this.image_lng = 0;
          this.gps_flg = true;
        }
        
        // 画像をbase64に変換
        let image = new Image();
        let reader = new FileReader();
        reader.onload = (event) =>{
          image.src = event.currentTarget.result;       
        }
        await reader.readAsDataURL(this.image_file);
        
        //**************************************
        // 画像の縮小
        let base64;
        let promise = new Promise(function(resolve){
          
          image.onload = () =>{
            let width;
            let height;
            let target_width = 500;
            let target_height = 500;

            if(image.width > image.height){
              let ratio = image.height / image.width;
              width = target_width;
              height = target_height * ratio;
            }
            else{
              let ratio = image.width / image.height;
              width = target_width * ratio;
              height = target_height;
            }

            let canvas =  $("<canvas id='canvas' width='0' height='0' ></canvas>").attr('width', width).attr('height', height);
            let ctx = canvas[0].getContext("2d");

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

            base64 = canvas.get(0).toDataURL("image/jpeg");
            //console.log(base64);
            
            resolve();
          }
        })
        
        await promise.then((value) => {
          this.image_base64 = base64;
        })
        //**************************************
        
      }
    },
    upload(){
      this.toggle();
      
      let json = {
        "team": this.image_team,
        "lat": this.image_lat,
        "lng": this.image_lng,
        "image": this.image_base64,
        "icon": this.image_icon,        
      };
      
      collections.push(json);
      console.log(collections);
      
      let collection = collections[collections.length-1];  
      let marker = makeMarker(collection);
      marker.addTo(map);
      markers.push(marker);
      marker_index = markers.length - 1;
      
      map.panTo(marker.getLatLng());
      
      // ダウンロード用のURL
      let blob = new Blob([JSON.stringify(collections, null, '  ')], {type: 'application\/json'});
      this.download_url = URL.createObjectURL(blob);
    },
    load(){
      this.$refs.input.value = "";
      this.$refs.input.click();
    },
    async selectedFile() {
      console.log("selectedFile")
      this.isUploading = true;

      let file = this.$refs.input.files[0]
      if (!file) {
        return;
      }
      else{
        // JSONデータの読込
        let reader = new FileReader();
        reader.onload = (event) =>{
          collections = JSON.parse(event.currentTarget.result);
          console.log(collections);
          
          // マーカーの表示
          for(let collection of collections){
            let marker = makeMarker(collection);
            marker.addTo(map);
            markers.push(marker);
          }
          
          marker_index = 0;
          let marker = markers[marker_index];
          map.panTo(marker.getLatLng());
          
          // ダウンロード用のURL
          let blob = new Blob([JSON.stringify(collections, null, '  ')], {type: 'application\/json'});
          this.download_url = URL.createObjectURL(blob);
        }
        await reader.readAsText(file);   
        
      }
      
    },
    clear(){
      for(let marker of markers){
        map.removeLayer(marker);
      }
      markers = [];
      collections = [];
    }
  },
});