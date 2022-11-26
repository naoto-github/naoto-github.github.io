const uuid_uart_service = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const uuid_tx_characteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const uuid_rx_characteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let server;
let service;
let tx_characteristic;
let rx_characteristic;

let id_list = []
let item_list = []


async function getCurrentWeather(){

    let lat = 0;
    let lng = 0;
    let base_url = "https://revgeo-forecastcode.herokuapp.com/"
    
    if(navigator.geolocation){

	navigator.geolocation.getCurrentPosition(async function(position){
	    lat = position.coords.latitude;
	    lng = position.coords.longitude;
	    
	    $("#lat").val(lat);
	    $("#lng").val(lng);

	    let url = base_url + "lat=" + lat + "+lon=" + lng;
	    console.log(url);

            let data = await fetch(url).then((response) => {
		return response.json();
            });

	    $("#forecast").val(data)

	});	
	
    }
}

function initTable(){
    
    // IDリストの取得
    id_list = JSON.parse(localStorage.getItem("id_list"))
    if(id_list == null){
	id_list = []; // IDリストを初期化
    }
    
    // レコードの追加
    for(id of id_list){
	let item = JSON.parse(localStorage.getItem(id))
	item_list.push(item)
    }

    // レコードの表示
    for(item of item_list){
	// テーブルに追加
	$("#item-table").append("<tr> + <td>" + item.date + "</td>" + "<td>" + item.temperature + "</td>" + "<td>" + item.humidity + "</td>" + "<td>" + item.pressure + "</td>" + "</tr>");	
    }
    
}

// Microbitへの接続
async function connect(ons_navi){
    try{
	// デバイスの検索
	device = await navigator.bluetooth.requestDevice({
	    filters:[
		{
		    services: [uuid_uart_service]
		},
		{
		    namePrefix: "BBC micro:bit"
		},
	    ],
	});
	
	// デバイスの接続
	server = await device.gatt.connect();
	
	// サービスの取得
	service = await server.getPrimaryService(uuid_uart_service);
	
	// 受信用
	tx_characteristic = await service.getCharacteristic(uuid_tx_characteristic);
	tx_characteristic.startNotifications();
	
	// イベント処理  
	tx_characteristic.addEventListener("characteristicvaluechanged", (event) => {
	    try{
		let value = event.target.value;
		let receiveData = new TextDecoder().decode(value);
		console.log(receiveData);
		
		let tokens = receiveData.split(",");
		this.setReceiveData(tokens[0], tokens[1], tokens[2]);
		
	    }catch(error){
		console.log("[Error]: " + error);
	    }
	});
	
	// 送信用
	rx_characteristic = await service.getCharacteristic(uuid_rx_characteristic);

	// ページ遷移
	ons_navi.pushPage("connect.html");
	
    }catch(error){
	console.log("[Error]: " + error);

	// ページ遷移
	ons_navi.pushPage("top.html");	
    }
}

// Microbitの切断
function disconnect(){
    // デバイスの切断
    device.gatt.disconnect();
}

// 天候データの受信
function setReceiveData(temperature, humidity, pressure){
    
    // UUIDの生成
    let id = uuid.v4();
    
    // 時刻の生成
    let date = new Date();

    // 連想配列の作成
    item = {
	"id": id,
	"date": date.toLocaleString(),
	"temperature": temperature,
	"humidity": humidity,
	"pressure": pressure,
    }

    // テーブルに追加
    $("#item-table").append("<tr> + <td>" + item.date + "</td>" + "<td>" + item.temperature + "</td>" + "<td>" + item.humidity + "</td>" + "<td>" + item.pressure + "</td>" + "</tr>");
    
    // IDの追加
    id_list.push(id)
    
    // レコードの追加
    item_list.push(item)
    
    // IDリストをローカルストレージに保存
    localStorage.setItem("id_list", JSON.stringify(id_list))
    
    // データをローカルストレージに保存
    localStorage.setItem(id, JSON.stringify(item));	    
}

// 天候データの取得依頼の送信
function getWeatherData(){
    if(rx_characteristic){
	let text = "GET\n";
	let encodedText = new TextEncoder().encode(text); // UTF-8でエンコード
	rx_characteristic.writeValue(encodedText);
    }
}

// 天候データの削除（ローカルストレージとテーブル）
function clearWeatherData(){
    localStorage.clear();
    this.id_list = [];
    this.item_list = [];
    $("#item-table").empty();
    $("#item-table").append("<tr><th>日時</th><th>温度</th><th>湿度</th><th>気圧</th></tr>");
}
