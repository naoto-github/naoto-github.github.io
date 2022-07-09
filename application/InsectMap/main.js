// マップ・オブジェクト
let map;

// 昆虫の採集データ
let collections = [];

// マーカー・オブジェクト
let markers = [];

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
        <img src="${image}" width="500px">
      </div>
    </div>
    `;
      
  let popup = L.popup({
    maxWidth: 550,
    maxHeight: 550,
    autoPan: false,
    offset: L.point(320, 200),
  });
      
  popup.setContent(popupContent);
  marker.bindPopup(popup);
  
  return marker;   
}

// Vueオブジェクト
vue = new Vue({
  el: "#app",
  data: {
    title: "デジタル昆虫探検マップ",
    start_latlng: L.latLng(35.555239, 136.91756),
    lat: 0,
    lng: 0,
    zoom: 17,
    circle_radius: 50,
    visibility: "visibility: hidden",
    isEnter: false,
    image_team: "チームA",
    image_icon: "icon_humei.png",
    image_files: [],
    image_name: "",
    image_lat: 0,
    image_lng: 0,
    image_base64: "",
    download_url: "",
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
      minZoom: this.zoom,
      maxZoom: this.zoom+1,
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
        this.image_team = "チームA";
        this.image_icon = "icon_humei.png";
        this.image_name = "";
        this.image_lat = 0;
        this.image_lng = 0;
        this.image_base64 = "";
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
    async dropFile(){
      // console.log("dropFile");
      this.files = [...event.dataTransfer.files]
      this.isEnter = false;
      
      if(this.files.length > 0){
        let file = this.files[0]
        let latlng = await exifr.gps(file);
        
        this.image_name = file.name;
        this.image_lat = latlng["latitude"];
        this.image_lng = latlng["longitude"];
        
        // 画像をbase64に変換
        let reader = new FileReader();
        reader.onload = (event) =>{
          this.image_base64 = event.currentTarget.result;
          // console.log(this.image_base64);
        }
        await reader.readAsDataURL(file);
        
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
      
      map.panTo(marker.getLatLng());
      
      // ダウンロード用のURL
      let blob = new Blob([JSON.stringify(collections, null, '  ')], {type: 'application\/json'});
      this.download_url = URL.createObjectURL(blob);
    },
    load(){
      this.$refs.input.click();
    },
    async selectedFile() {
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
        }
        await reader.readAsText(file);          
      }
      
    }
  },
});