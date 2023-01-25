const uuid_uart_service = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const uuid_tx_characteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const uuid_rx_characteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let device;
let server;
let service;
let tx_characteristic;
let rx_characteristic;

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
				
		app_item.setTimeData();		
		$("#app_today_date").val(app_item.today_date)
		$("#app_today_time").val(app_item.today_time)    

		$("#app_area").val(app_item.area)
		$("#app_weather").val(app_item.weather)
		$("#app_max_temp").val(app_item.max_temp)
		$("#app_min_temp").val(app_item.min_temp)		
		
		let tokens = receiveData.split(",");
		let temperature = tokens[0]
		let humidity = tokens[1]
		let pressure = tokens[2]

		app_item.setSensorData(temperature, humidity, pressure);
		$("#app_temperature").val(app_item.temperature);
		$("#app_humidity").val(app_item.humidity);
		$("#app_pressure").val(app_item.pressure);

		$("#prediction-temperature").val(app_item.temperature);
		$("#prediction-humidity").val(app_item.humidity);
		$("#prediction-pressure").val(app_item.pressure);		
		
		//this.setReceiveData(tokens[0], tokens[1], tokens[2]);
		
	    }catch(error){
		console.log("[Error]: " + error);
	    }
	});
	
	// 送信用
	rx_characteristic = await service.getCharacteristic(uuid_rx_characteristic);
	
    }catch(error){
	console.log("[Error]: " + error);

	// データ登録ボタンを無効化
	disabled_bt_get = true;
		
    }

    // ページ遷移
    ons_navi.pushPage("connect.html");	    
}

// Microbitの切断
function disconnect(){
    // デバイスの切断
    if(device != null){
	device.gatt.disconnect();
    }
}

// センサーデータの取得依頼の送信
function getSensorData(){
    if(rx_characteristic){
	let text = "GET\n";
	let encodedText = new TextEncoder().encode(text); // UTF-8でエンコード
	rx_characteristic.writeValue(encodedText);
    }
}

