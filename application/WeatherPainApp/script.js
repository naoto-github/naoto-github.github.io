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
    temperature: "",
    humidity: "",
    pressure: "",
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
        tx_characteristic.addEventListener("characteristicvaluechanged", (event) => {
          try{
            let value = event.target.value;
            let receiveData = new TextDecoder().decode(value);
            let tokens = receiveData.split(",");
            this.temperature = tokens[0];
            this.humidity = tokens[1];
            this.pressure = tokens[2];
            console.log(receiveData);
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
