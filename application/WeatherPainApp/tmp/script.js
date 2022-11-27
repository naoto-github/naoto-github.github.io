const uuid_uart_service = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const uuid_tx_characteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const uuid_rx_characteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let server;
let service;
let tx_characteristic;
let rx_characteristic;

new Vue({
    el: "#main",
    data: {
	title: "Weather Pain App",
	id_list: [],
	item_list: [],
    },
    mounted: function(){
	//localStorage.clear();

	// IDリストの取得
	this.id_list = JSON.parse(localStorage.getItem("id_list"))
	if(this.id_list == null){
	    this.id_list = []; // IDリストを初期化
	}

	// レコードの追加
	for(id of this.id_list){
	    let item = JSON.parse(localStorage.getItem(id))
	    this.item_list.push(item)
	}

	console.log(this.id_list);
	console.log(this.item_list);

    },    
    methods: {
	async connect(){
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
		
	    }catch(error){
		console.log("[Error]: " + error);
	    }
	},
	setReceiveData(temperature, humidity, pressure){

	    // UUIDの生成
	    let id = uuid.v4();

	    // 時刻の生成
	    let date = new Date();
	    
	    item = {
		"id": id,
		"date": date.toLocaleString(),
		"temperature": temperature,
		"humidity": humidity,
		"pressure": pressure,
	    }

	    // IDの追加
	    this.id_list.push(id)

	    // レコードの追加
	    this.item_list.push(item)
	    
	    // IDリストをローカルストレージに保存
	    localStorage.setItem("id_list", JSON.stringify(this.id_list))

	    // データをローカルストレージに保存
	    localStorage.setItem(id, JSON.stringify(item));
	    
	},
	disconnect(){
	    // デバイスの切断
	    device.gatt.disconnect();
	},
	getWeatherData(){
	    if(rx_characteristic){
		let text = "GET\n";
		let encodedText = new TextEncoder().encode(text); // UTF-8でエンコード
		rx_characteristic.writeValue(encodedText);
	    }

	    //this.setReceiveData(1, 2, 3);
	},
	clearWeatherData(){
	    localStorage.clear();
	    this.id_list = [];
	    this.item_list = [];
	    console.log(this.id_list);
	    console.log(this.item_list);	    
	},
	playSound(){
	    if(rx_characteristic){
		let text = "PLAY\n";
		let encodedText = new TextEncoder().encode(text); // UTF-8でエンコード
		rx_characteristic.writeValue(encodedText);
	    }
	},
    }
})
