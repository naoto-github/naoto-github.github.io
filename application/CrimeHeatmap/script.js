let map;
let mesh_list;

let crime_files = {
  "all-scott":     crime_density_trick_all_band_scott,
  "all-silverman": crime_density_trick_all_band_silverman,
  "all-050":       crime_density_trick_all_band_050,
  "all-010":       crime_density_trick_all_band_010,
  "all-005":       crime_density_trick_all_band_005,
  "hittakuri-scott":     crime_density_trick_hittakuri_band_scott,
  "hittakuri-silverman": crime_density_trick_hittakuri_band_silverman,
  "hittakuri-050":       crime_density_trick_hittakuri_band_050,
  "hittakuri-010":       crime_density_trick_hittakuri_band_010,
  "hittakuri-005":       crime_density_trick_hittakuri_band_005,
  "syajyou-scott":     crime_density_trick_syajyou_band_scott,
  "syajyou-silverman": crime_density_trick_syajyou_band_silverman,
  "syajyou-050":       crime_density_trick_syajyou_band_050,
  "syajyou-010":       crime_density_trick_syajyou_band_010,
  "syajyou-005":       crime_density_trick_syajyou_band_005, 
  "buhin-scott":     crime_density_trick_buhin_band_scott,
  "buhin-silverman": crime_density_trick_buhin_band_silverman,
  "buhin-050":       crime_density_trick_buhin_band_050,
  "buhin-010":       crime_density_trick_buhin_band_010,
  "buhin-005":       crime_density_trick_buhin_band_005, 
  "jidou-scott":     crime_density_trick_jidou_band_scott,
  "jidou-silverman": crime_density_trick_jidou_band_silverman,
  "jidou-050":       crime_density_trick_jidou_band_050,
  "jidou-010":       crime_density_trick_jidou_band_010,
  "jidou-005":       crime_density_trick_jidou_band_005, 
  "jidousya-scott":     crime_density_trick_jidousya_band_scott,
  "jidousya-silverman": crime_density_trick_jidousya_band_silverman,
  "jidousya-050":       crime_density_trick_jidousya_band_050,
  "jidousya-010":       crime_density_trick_jidousya_band_010,
  "jidousya-005":       crime_density_trick_jidousya_band_005,   
  "bike-scott":     crime_density_trick_bike_band_scott,
  "bike-silverman": crime_density_trick_bike_band_silverman,
  "bike-050":       crime_density_trick_bike_band_050,
  "bike-010":       crime_density_trick_bike_band_010,
  "bike-005":       crime_density_trick_bike_band_005,   
  "jitensya-scott":     crime_density_trick_jitensya_band_scott,
  "jitensya-silverman": crime_density_trick_jitensya_band_silverman,
  "jitensya-050":       crime_density_trick_jitensya_band_050,
  "jitensya-010":       crime_density_trick_jitensya_band_010,
  "jitensya-005":       crime_density_trick_jitensya_band_005,  
};

let crime_density = crime_files["all-005"]

function addCrimeDensity(){
  let length = crime_density["features"].length;
  let threshold = 0.5;
    
  mesh_list = L.geoJSON(crime_density, {
    style: function(feature){
        
      let density = feature["propertiescottnsity"];
      let rank = feature["properties"]["rank"];
      let alpha = 1 - (rank / length) - threshold; 
        
      if(rank <= 10){
        fillColor = "red";
      }
      else if(rank <= 100){
        fillColor = "yellow";
      }
      else{
        fillColor = "blue";
      }
        
      let mesh_style = {
        stroke: false,
        fillColor: fillColor,
        fillOpacity: alpha
      }
        
      return mesh_style;
    }
  });
  mesh_list.addTo(map);

}

new Vue({
  el: "#main",
  data:{
    lat: 35.1706431,
    lon: 136.8816945,
    zoom: 11,
    checked_trick: "all",
    checked_band: "005",
  },
  mounted: function(){
    
    map = L.map("map", {
      zoomControl: false
    });
    
    map.setView([this.lat, this.lon], this.zoom);

    // OpenStreetMap
    let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    );
    layer.addTo(map);
    
    addCrimeDensity();
  },
  methods:{ 
  },
  watch: {
    checked_trick: function(){
      key = this.checked_trick + "-" + this.checked_band;
      crime_density = crime_files[key];
      map.removeLayer(mesh_list);
      addCrimeDensity();  
    },
    checked_band: function(){
      key = this.checked_trick + "-" + this.checked_band;
      crime_density = crime_files[key];
      map.removeLayer(mesh_list);
      addCrimeDensity();
    }
  }
})