---
layout: page
title: "地図の表示"
top_link: false
image: "https://i.gyazo.com/30d003de37724af570744a3c2de8df0d.png"
---

[![https://gyazo.com/30d003de37724af570744a3c2de8df0d](https://i.gyazo.com/30d003de37724af570744a3c2de8df0d.png)](https://gyazo.com/30d003de37724af570744a3c2de8df0d)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png">地図の表示

今回は地図サービスとして有名な[Google Maps](https://www.google.co.jp/maps)のウェブAPIである[Google Maps Javascript API](https://developers.google.com/maps/?hl=ja)を利用して地図アプリを制作してみましょう。
現在のAPIのバージョンは3.27であり、APIを利用するには、Googleアカウントにログインした状態で、[Google API Console](https://console.developers.google.com)で認証情報を登録する必要があります（2017年1月7日時点）。
まずは、[Google API Console](https://console.developers.google.com)にアクセスし、ライブラリのリンクをクリックし、 **Google Maps JavaScript API** を有効にします

[![https://gyazo.com/9eb437c5aab8c2c44df9ee21f619a741](https://i.gyazo.com/9eb437c5aab8c2c44df9ee21f619a741.png)](https://gyazo.com/9eb437c5aab8c2c44df9ee21f619a741)

次にAPIを利用するための認証情報である **APIキー** を作成します。
認証情報のリンクをクリックし、**APIキー** を選択します。

[![https://gyazo.com/5a20b64ebef18d6fda782c2a63437e81](https://i.gyazo.com/5a20b64ebef18d6fda782c2a63437e81.png)](https://gyazo.com/5a20b64ebef18d6fda782c2a63437e81)

生成された **APIキー** をコピーしておきましょう。
後でウェブページに埋め込みます。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> プロジェクトの作成

今回も日進市の[オープンデータミュージアム](http://www.city.nisshin.lg.jp/seisaku/toukei/18979/index.html)を利用して世帯数のデータを地図上に表示するアプリを作成しましょう。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Minimum】を選択します。
プロジェクト名を **地図アプリ** 、説明を **Google Maps APIを利用した日進市の世帯数の地図** とします。
プロジェクトを作成したら **MonacaクラウドIDE** の画面を開きましょう。

[![https://gyazo.com/5c0f84ef607f54cb51b6728c07bc4808](https://i.gyazo.com/5c0f84ef607f54cb51b6728c07bc4808.png)](https://gyazo.com/5c0f84ef607f54cb51b6728c07bc4808)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> Google Maps APIを利用した地図の表示

それでは、[Google Maps Javascript API](https://developers.google.com/maps/?hl=ja)を利用して地図を表示させましょう。
まずは地図を表示するための **div要素** を作成します。

    <div id="map"></div>

上記のdiv要素に加え、html要素、body要素のサイズを明確に指定しておく必要があります。
そこで、 **style.css** に下記のように記述しておきます。

{% gist naoto-github/dea2d3ffc52585f2e8557a13756471df %}

日進市役所を中心に地図を表示してみます。
日進市役所の緯度・経度は **35.132015, 137.039412** です。
地図を表示するには下記のようにコードを記述します。
**initMap** というメソッドは、Google Maps APIが読み込まれた後に自動で呼び出される **コールバック・メソッド** です。
緯度・軽度は **LatLng** というクラスに保持させています。
また、 地図の中心を表す **center** に星丘キャンパスの緯度・軽度、 地図の倍率を表す **zoom** に **14** を設定しています。

    var map;
    function initMap(){

        var latlng = new google.maps.LatLng(35.132015, 137.039412);
        map = new google.maps.Map(document.getElementById("map"),{
            center: latlng,
            zoom: 14
        });
    }

最後に、ウェブAPIを読み込み、APIのクラスやメソッドを利用できる状態にします。
ウェブAPIを読み込むには下記のコードを記述します。
このとき、先ほど作成したAPIキーは **key=** の後に挿入することに注意してください。

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>

上記をまとめるとコードは下記のようになります。
日進市役所の地図が表示されることを確認してください。

{% gist naoto-github/7a92e2ef226b70c72d89cac0be04a945 %}

[![https://gyazo.com/c1e1e5b57118ba6e45c51cbf2de50cba](https://i.gyazo.com/c1e1e5b57118ba6e45c51cbf2de50cba.png)](https://gyazo.com/c1e1e5b57118ba6e45c51cbf2de50cba)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 日進市のマーカーの表示

前回と同様に日進市の世帯数のJSONデータを生成します。
今回は町名、人口に加え、緯度・経度も加えていることに注意してください。
下記のようにコードを記述します。

    var json = `[
        { "city": "赤池町",  "population": "1195", "lat": "35.111109", "lng": "137.020564"},
        { "city": "浅田町",  "population": "1899", "lat": "35.122047", "lng": "137.032907"},
        { "city": "梅森町",  "population": "804", "lat": "35.135565", "lng": "137.0192"},
        { "city": "野方町",  "population": "133", "lat": "35.129474", "lng": "137.033243"},
        { "city": "蟹甲町", "population": "158", "lat": "35.132043", "lng": "137.040695"}
    ]`;

    var cities = JSON.parse(json);

次に **marker** クラスを利用して地図上にマーカーを表示します。
マーカーのオプションには、地図オブジェクトを表す **map** にmap、緯度・経度を表す **position** に各町の緯度・経度、マウスをホバーしたときに表示される文字列 **title** に町名と人口を設定します。

コードは下記のようになります。
上記の５つの町にマーカーが表示されることを確認してください。

{% gist naoto-github/43aaea546b04469e9a4e81544df43bb2 %}

[![https://gyazo.com/6d19f956c1892fe2977bea16bb781f8d](https://i.gyazo.com/6d19f956c1892fe2977bea16bb781f8d.png)](https://gyazo.com/6d19f956c1892fe2977bea16bb781f8d)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 課題

日進市の[オープンデータミュージアム](http://www.city.nisshin.lg.jp/seisaku/toukei/18979/index.html)から自由にデータを選択し、異なる種類の地図を作成しなさい。

{% include graduation_preperation_1/reference.html %}
