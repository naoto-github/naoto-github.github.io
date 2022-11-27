let base_url = "https://www.jma.go.jp/bosai/forecast/data/forecast/"
let image_base_url = "https://www.jma.go.jp/bosai/forecast/img/"

let area_dict = {
    "愛知県西部": {
	"json": "230000.json",
	"index": 0
    },
    "愛知県東部": {
	"json": "230000.json",
	"index": 1
    },
    "岐阜県美濃地方":{
	"json": "210000.json",
	"index": 0
    },
    "岐阜県飛騨地方":{
	"json": "210000.json",
	"index": 1
    },
    "三重県北中部":{
	"json": "240000.json",
	"index": 0
    },
    "三重県南部":{
	    "json": "240000.json",
	"index": 1
    }	    			
}

// 気象庁の天気APIから情報取得
async function getCurrentWeather(){
    
    let target_area = $("#select_area").val();
    let url = base_url + area_dict[target_area]["json"];    
    let data = await fetch(url).then((response) => {
	return response.json();
    });

    let index = area_dict[target_area]["index"]
    let weather = data[0]["timeSeries"][0]["areas"][index]["weathers"][0];
    let weather_code = data[0]["timeSeries"][0]["areas"][index]["weatherCodes"][0]
    let weather_image = image_base_url + weather_code_dict[weather_code][0]
    
    let max_temp = data[1]["tempAverage"]["areas"][0]["max"];
    let min_temp = data[1]["tempAverage"]["areas"][0]["min"];

    $("#weather").text(weather);
    $("#weather_image").attr("src", weather_image);
    $("#max_temp").text("最高気温:" + max_temp + "°");
    $("#min_temp").text("最低気温:" + min_temp + "°");

    app_item.setWeatherData(target_area, weather, weather_image, max_temp, min_temp);
    
}
