let map = L.map("map")

// テレビ塔
let lat = 35.172253
let lon = 136.9083
let zoom_start = 16;
let marker_visible_radius = 800;

// マップの座標・倍率
map.setView([lat, lon], zoom_start);

// タイル（OpenStreetMap）
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// マーカーのリスト
let marker_list = [];

// バウンディングボックスのリスト
let box_list = []

// ツールチップ
function makeTooltip(properties){

    crime_dict = {}
    crime_dict["ひったくり"] = BigNumber(properties["ひったくり"]).dp(0);
    crime_dict["車上ねらい"] = BigNumber(properties["車上ねらい"]).dp(0);
    crime_dict["部品ねらい"] = BigNumber(properties["部品ねらい"]).dp(0);
    crime_dict["自動販売機ねらい"] = BigNumber(properties["自動販売機ねらい"]).dp(0);
    crime_dict["自動車盗"] = BigNumber(properties["自動車盗"]).dp(0);
    crime_dict["オートバイ盗"] = BigNumber(properties["オートバイ盗"]).dp(0);
    crime_dict["自転車盗"] = BigNumber(properties["自転車盗"]).dp(0);

    height_dict = {}
    height_dict["高さ（最大）"] = BigNumber(properties["高さ(最大)"]).dp(1);
    height_dict["高さ（最小）"] = BigNumber(properties["高さ(最小)"]).dp(1);
    height_dict["高さ（平均）"] = BigNumber(properties["高さ(平均)"]).dp(1);

    count_dict = {}
    count_dict["住宅（件数）"] = BigNumber(properties["住宅(件数)"]).dp(0);
    count_dict["共同住宅（件数）"] = BigNumber(properties["共同住宅(件数)"]).dp(0);
    count_dict["商業施設（件数）"] = BigNumber(properties["商業施設(件数)"]).dp(0);
    count_dict["宿泊施設（件数）"] = BigNumber(properties["宿泊施設(件数)"]).dp(0);
    count_dict["工場（件数）"] = BigNumber(properties["工場(件数)"]).dp(0);
    count_dict["店舗等併用住宅（件数）"] = BigNumber(properties["店舗等併用住宅(件数)"]).dp(0);
    count_dict["店舗等併用共同住宅（件数）"] = BigNumber(properties["店舗等併用共同住宅(件数)"]).dp(0);
    count_dict["文教厚生施設（件数）"] = BigNumber(properties["文教厚生施設(件数)"]).dp(0);
    count_dict["業務施設（件数）"] = BigNumber(properties["業務施設(件数)"]).dp(0);
    count_dict["運輸倉庫施設（件数）"] = BigNumber(properties["運輸倉庫施設(件数)"]).dp(0);
    
    area_dict = {}
    area_dict["住宅（面積）"] = BigNumber(properties["住宅(面積)"]).dp(0);
    area_dict["共同住宅（面積）"] = BigNumber(properties["共同住宅(面積)"]).dp(0);
    area_dict["商業施設（面積）"] = BigNumber(properties["商業施設(面積)"]).dp(0);
    area_dict["宿泊施設（面積）"] = BigNumber(properties["宿泊施設(面積)"]).dp(0);
    area_dict["工場（面積）"] = BigNumber(properties["工場(面積)"]).dp(0);
    area_dict["店舗等併用住宅（面積）"] = BigNumber(properties["店舗等併用住宅(面積)"]).dp(0);
    area_dict["店舗等併用共同住宅（面積）"] = BigNumber(properties["店舗等併用共同住宅(面積)"]).dp(0);
    area_dict["文教厚生施設（面積）"] = BigNumber(properties["文教厚生施設(面積)"]).dp(0);
    area_dict["業務施設（面積）"] = BigNumber(properties["業務施設(面積)"]).dp(0);
    area_dict["運輸倉庫施設（面積）"] = BigNumber(properties["運輸倉庫施設(面積)"]).dp(0);

    crime_table = "<table border='1'>"
    for(let key in crime_dict){
        crime_table += `<tr><th>${key}</th><td>${crime_dict[key]}</td></tr>`
    }
    crime_table += "</table>"

    height_table = "<table border='1'>"
    for(let key in height_dict){
        height_table += `<tr><th>${key}</th><td>${height_dict[key]}</td></tr>`
    }
    height_table += "</table>"

    count_table = "<table border='1'>"
    for(let key in count_dict){
        count_table += `<tr><th>${key}</th><td>${count_dict[key]}</td></tr>`
    }
    count_table += "</table>"

    area_table = "<table border='1'>"
    for(let key in area_dict){
        area_table += `<tr><th>${key}</th><td>${area_dict[key]}</td></tr>`
    }
    area_table += "</table>"

    let tooltip_html = `<h3>${properties["address"]}</h3><div class="tooltip">`
    tooltip_html += crime_table
    tooltip_html += count_table
    tooltip_html += area_table
    tooltip_html += height_table
    tooltip_html += `</div>`

    return tooltip_html;
}

// マーカーを追加
L.geoJSON(dataset, {
    pointToLayer: function (feature, latlng) {

	// マーカー
        let marker = L.marker(latlng);

        // 距離に応じて表示・非表示
        let center = map.getCenter();
        let distance = center.distanceTo(marker.getLatLng());      
        if(distance <= marker_visible_radius){
            marker.addTo(map);
            //marker.setOpacity(1);
        }
        else{
            marker.removeFrom(map);
            //marker.setOpacity(0)
        }

        // ツールチップ
        let tooltip_html = makeTooltip(feature["properties"]);
        marker.bindTooltip(tooltip_html, {
            offset: [150, 0]
        });

        // ポップアップ
        path = `../html/${feature["properties"]["id"]}.html`
        let popup_html = `<div width="500" height="530">
                          <h3>${feature["properties"]["address"]}</h3>
                          <iframe width="500" height="500" src="${path}">
                          </iframe>
                          </div>
                         `;

        marker.bindPopup(popup_html, {
            maxWidth: 600,
            offset: [0, -30]
        });

        // マーカーを中心に移動
        marker.on("click", function(){
            map.panTo(marker.getLatLng(), {
                animate: false
            });
            map.panBy([0, -300]);
        });

        // マーカーを中心に移動
        marker.on("mouseover", function(){
            marker.box.addTo(map);
        });

       // マーカーを中心に移動
       marker.on("mouseout", function(){
            marker.box.removeFrom(map);
       });        

        marker_list.push(marker);

        let lat1 = Number(feature["properties"]["bbox_lat1"])
        let lon1 = Number(feature["properties"]["bbox_lon1"])
        let lat2 = Number(feature["properties"]["bbox_lat2"])
        let lon2 = Number(feature["properties"]["bbox_lon2"])
        bounds = [[lat1, lon1], [lat2, lon2]]

        let box = L.rectangle(bounds, {
            opacity: 0.2,
        });
        box_list.push(box);

        marker.box = box;
    }
});

// 距離に応じて表示・非表示
map.on("move", function(){

    for(let i=0; i<marker_list.length; i++){
        let marker = marker_list[i];
        let box = box_list[i];

        let center = map.getCenter();
        let distance = center.distanceTo(marker.getLatLng());      

        if(distance <= marker_visible_radius){
            //marker.setOpacity(1);
            marker.addTo(map)
        }
        else{
            //marker.setOpacity(0)
            marker.removeFrom(map);
        }
    }
});
