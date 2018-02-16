---
layout: page
title: "グラフの表示"
top_link: false
image: "https://i.gyazo.com/1fc2080bbc78a5d63b4a3eaefe14b4ba.png"
---

[![https://gyazo.com/1fc2080bbc78a5d63b4a3eaefe14b4ba](https://i.gyazo.com/1fc2080bbc78a5d63b4a3eaefe14b4ba.png)](https://gyazo.com/1fc2080bbc78a5d63b4a3eaefe14b4ba)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png">グラフ表示

今回はオープンソースのグラフ描画ライブラリである[Chart.js](http://www.chartjs.org/)を利用して、グラフを描くことに挑戦してみましょう。
Chart.jsは **HTML5** の **Canvas要素** にグラフを描くことが可能なライブラリで、「折れ線グラフ」「縦棒グラフ」「円グラフ」などの８種類がグラフが利用できます（2016年12月16日現在）。
また、レスポンシブにも対応しているため、PCだけでなくスマーフォンでも美しく描画されるという特徴があります。
まずは、導入用のパッケージを[GitHub](https://github.com/chartjs/Chart.js)からダウンロードしましょう。
ダウンロードしたら **sampleフォルダ** にある様々なグラフを表示してみましょう。
グリグリとアニメーションしながらグラフが表示されると思います。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> JSON形式

グラフの元となるデータは **JSON(Javascript Object Notation)** と呼ばれる形式で記述します。
JSONで表されたデータは、JavaScriptのオブジェクトに対応していて、JSON形式のテキストからオブジェクトを生成することができます。
一般にデータはCSVなどの形式で記述されることが多いですが、
JavaScriptでテキストファイルを読み込むことは仕様上難しいことが多いため、
JSONを利用する方法が採用されます。

ここでは、日進市の[オープンデータミュージアム](http://www.city.nisshin.lg.jp/seisaku/toukei/18979/index.html)に掲載されているオープンデータからJSON形式のデータを作成することにします。
下記はオープンデータミュージアムで公開されていた **町別人口推移** から一部を抜粋したCSV形式のデータです。


    city,population
    赤池町,1195
    浅田町,1899
    梅森町,804
    野方町,133
    蟹甲町,158

一行目の「city」「population」は項目名であり、二行目からが実際のデータです。
例えば、赤池町は1,195人、浅田町は1,899人です。
このCSV形式のデータをJSON形式に変換するには、**iPentec** が提供しているオンラインの[変換ツール](http://utils.ipentec.com/JsonConvert/CsvToJSon.aspx)を利用すると簡単です。

変換ツールのページを開いたら「入力（CSV）」に上記のCSVデータを張り付けて、
「CSV➡JSON変換」のボタンをクリックします。
すると下記のようなJSON形式のデータが出力されます。

    [
    { "city": "赤池町",  "population": "1195"},
    { "city": "浅田町",  "population": "1899"},
    { "city": "梅森町",  "population": "804"},
    { "city": "野方町",  "population": "133"},
    { "city": "蟹甲町",  "population": "158"}
    ]

今回はこのJSON形式のデータを利用してグラフを作成しましょう。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> プロジェクトの作成

上述の日進市の[オープンデータミュージアム](http://www.city.nisshin.lg.jp/seisaku/toukei/18979/index.html)に掲載されている世帯数のデータを円グラフで表示するアプリを作成しましょう。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Minimum】を選択します。
プロジェクト名を **グラフアプリ** 、説明を **Chart.jsを利用した日進市の世帯数のグラフ** とします。
プロジェクトを作成したら **MonacaクラウドIDE** の画面を開きましょう。

[![https://gyazo.com/4b12bd26ce235b00439ac32932f78098](https://i.gyazo.com/4b12bd26ce235b00439ac32932f78098.png)](https://gyazo.com/4b12bd26ce235b00439ac32932f78098)

**MonacaクラウドIDE** を開いたら、先程ダウンロードした **Chart.js** のパッケージに含まれている、 **Chart.bundle.js** と **utils.js** をwwwフォルダにアップロードしておきます。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 人口推移のグラフ作成

まずは先程アップロードした **Chart.bundle.js** と **utils.js** をindex.htmlで読み込んでおきましょう。
**head** 要素内に下記のコードを追加します。

    <script src="Chart.bundle.js"></script>
    <script src="utils.js"></script>

次に先程生成したJSON形式のテキストから **JSON.parse()** を利用してテキストからオブジェクトに変換します。
オブジェクトの変数名は **cities** とします。
このオブジェクトは長さ5の配列であり、
**赤池町** や **1195** などのデータにアクセスするには、
**cities[0].city** や **cities[0].population** と記述します。
下記コードを参考にオブジェクトを作成してください。

{% gist naoto-github/2ce801d6c0588350036b1055b0e08058 %}

それでは、円グラフに利用するデータを生成します。
円グラフでは、世帯数（population）が **データ** 、町名（city）が **ラベル** となります。
これらは独立した配列にする必要があるため、下記のコードで **cities** から変換します。

    var data = new Array(cities.length);
    var labels = new Array(cities.length);
    for(var i=0; i<cities.length; i++){
      data[i] = cities[i].population;
      labels[i] = cities[i].city;
    }

次に、 **Chart.js** に上記で生成したデータとラベルを設定します。
下記のように **config** という変数に円グラフに必要な情報を記録します。
ここで、 **data** と **labels** に上記で生成した配列を設定していることに注意してください。
また、 **window.chartColors.red** の定義は **utils.js** で記述されています。

    var config = {
      type: 'pie',
      data: {
          datasets: [{
              data: data,
              backgroundColor: [
                  window.chartColors.red,
                  window.chartColors.orange,
                  window.chartColors.yellow,
                  window.chartColors.green,
                  window.chartColors.blue,
              ]
          }],
          labels: labels
      },
      options: {
          responsive: true
      }
    };

それでは、 **body** 要素に円グラフを表示するための **canvas** 要素を作成します。
id属性に **chart-area** と設定していることに注意してください。

    <body>
        <div style="width:100%">
            <canvas id="chart-area" />
        </div>
    </body>

最後に上記の **canvas** 要素に円グラフを描画するためのコードを記述します。

    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx, config);

以上で下記のようなグラフが表示されれば成功です。

[![https://gyazo.com/ebf7f1eaa65fd637e2b3c65f24edd70f](https://i.gyazo.com/ebf7f1eaa65fd637e2b3c65f24edd70f.png)](https://gyazo.com/ebf7f1eaa65fd637e2b3c65f24edd70f)

{% gist naoto-github/baf7f844db79ed8b7ee2992454ad966a %}

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 課題

日進市の[オープンデータミュージアム](http://www.city.nisshin.lg.jp/seisaku/toukei/18979/index.html)から自由にデータを選択し、異なる種類のグラフを作成しなさい。

{% include graduation_preperation_1/reference.html %}
