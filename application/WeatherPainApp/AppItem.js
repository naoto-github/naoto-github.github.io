class AppItem{

    // コンストラクタ
    constructor(){

	this.id = "";
	
	this.today = "";
	this.today_date = "";
	this.today_time = "";
	
	this.area = "";
	this.weather= "";
	this.weather_image = "";
	this.max_temp = 0;
	this.min_temp = 0;
	
	this.temperature = 0;
	this.humidity = 0;
	this.pressure = 0;

	this.pain = "";
	this.pain_level = 0;
    }

    // 時刻データの設定
    setTimeData(){
	let today = new Date();
	let today_date = today.getFullYear() + "年" + (today.getMonth()+1) + "月" + today.getDate() + "日"
	let today_time = today.getHours() + "時" + today.getMinutes() + "分" + today.getSeconds() + "秒"

	this.today = today;
	this.today_date = today_date;
	this.today_time = today_time;	
    }
    
    // 天候データの設定
    setWeatherData(area, weather, weather_image, max_temp, min_temp){
	this.area = area;
	this.weather = weather;
	this.weather_image = weather_image;
	this.max_temp = max_temp;
	this.min_temp = min_temp;
    }
    
    // センサーデータの設定
    setSensorData(temperature, humidity, pressure){
	this.temperature = temperature;
	this.humidity = humidity;
	this.pressure = pressure;
    }

    // 痛みの設定
    setPainData(pain, pain_level){
	this.pain = pain;
	this.pain_level = pain_level;
    }
    
    // 連想配列に変換
    toItem(){

	this.id = uuid.v4();
	
	let item = {
	    "id": this.id,
	    "today": this.today.toString(),
	    "today_date": this.today_date,
	    "today_time": this.today_time,
	    "area": this.area,
	    "weather": this.weather,
	    "weather_image": this.weather_image,
	    "max_temp": this.max_temp,
	    "min_temp": this.min_temp,
	    "temperature": this.temperature,
	    "humidity": this.humidity,
	    "pressure": this.pressure,
	    "pain": this.pain,
	    "pain_level": this.pain_level
	}

	return item;
    }

    // 連想配列からロード
    loadItem(item){
	this.id = item.id;
	this.today = Date.parse(item.today);
	this.today_date = item.today_date;
	this.today_time = item.today_time;
	this.area = item.area;
	this.weather = item.weather;
	this.weather_image = item.weather_image;
	this.max_temp = item.max_temp;
	this.min_temp = item.min_temp;
	this.temperature = item.temperature;
	this.humidity = item.humidity;
	this.pressure = item.pressure;
	this.pain = item.pain;
	this.pain_level = item.pain_level
    }

    // ダイアログに設定
    setDialog(dialog){
	$("#d_today_date").text("日時:" + app_item.today_date);
	$("#d_today_time").text("時間:" + app_item.today_time);
	$("#d_area").text("地域:" + app_item.area);
	$("#d_weather").text("天気:" + app_item.weather);
	$("#d_max_temp").text("最高気温:" + app_item.max_temp + "°");
	$("#d_min_temp").text("最低気温:" + app_item.min_temp + "°");
	$("#d_temperature").text("温度:" + app_item.temperature + "°");
	$("#d_humidity").text("湿度:" + app_item.humidity + "%");
	$("#d_pressure").text("気圧:" + app_item.pressure + "hPa");
	$("#d_pain").text("痛み:" + app_item.pain);	
	$("#close_dialog").click(function(){
	    dialog.hide();
	});
    }
}
