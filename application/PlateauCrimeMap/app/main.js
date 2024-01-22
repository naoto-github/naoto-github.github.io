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
            marker.setOpacity(1);
        }
        else{
            marker.removeFrom(map);
            marker.setOpacity(0)
        }

        // ツールチップ
        let tooltip_html = `
                            <div>
                            <h3>${feature["properties"]["address"]}</h3>
                            <table>
                            <tr><th>ひったくり</th><td>${feature["properties"]["ひったくり"]}</td></tr>
                            <tr><th>車上ねらい</th><td>${feature["properties"]["車上ねらい"]}</td></tr>
                            <tr><th>部品ねらい</th><td>${feature["properties"]["部品ねらい"]}</td></tr>
                            <tr><th>自動販売機ねらい</th><td>${feature["properties"]["自動販売機ねらい"]}</td></tr>
                            <tr><th>自動車盗</th><td>${feature["properties"]["自動車盗"]}</td></tr>
                            <tr><th>オートバイ盗</th><td>${feature["properties"]["オートバイ盗"]}</td></tr>
                            <tr><th>自転車盗</th><td>${feature["properties"]["自転車盗"]}</td></tr>
                            </table>
                            </div>
                           `;
        marker.bindTooltip(tooltip_html);

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

        marker_list.push(marker);
    }
});

// 距離の応じて表示・非表示
map.on("move", function(){
    for(let marker of marker_list){
        let center = map.getCenter();
        let distance = center.distanceTo(marker.getLatLng());      

        if(distance <= marker_visible_radius){
            marker.setOpacity(1);
            marker.addTo(map)
        }
        else{
            marker.setOpacity(0)
            marker.removeFrom(map);
        }
    }
});
