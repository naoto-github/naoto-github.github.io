-------------------------------------------------------------------------------
layout: page
title: "オープンストリートマップを利用したオープンデータの可視化①・uMap"
permalink: /class/seminar_fundamental_areas/chapter3.html
top_link: false
image: "https://i.gyazo.com/0cc18d7ba4f7db56959e985acc851378.png"
---

[![https://gyazo.com/0cc18d7ba4f7db56959e985acc851378](https://i.gyazo.com/0cc18d7ba4f7db56959e985acc851378.png)](https://gyazo.com/0cc18d7ba4f7db56959e985acc851378)

# ![Logo](/favicon/favicon-25x25.png){: .section} オープンストリートマップとは

行政が公開しているオープンデータには，
施設の位置を表す**緯度**，**経度**の情報が含まれることが多くあります．
前回利用した日進市の子育て支援施設のオープンデータにも，施設の名称や住所に加えて，緯度・経度の情報が含まれていました．
オンライン地図を利用して，これらの位置情報を可視化することで，新たな気付きを得ることが可能です．

オンライン地図として最も有名なサービスはGoogleが提供している[Google Maps](https://www.google.co.jp/maps/)でしょう．
Google Mapsは，滑らかな地図の表示はもちろん，ストリートビュー，ジオコーディング，ルート検索などの機能も充実しています．
ここで，ジオコーディングとは住所や地名などを緯度・経度に変換する技術を指しています．
例えば，椙山女学園大学の地図をGoogle Mapで表示してみます．
ウェブページにGoogle Mapsを埋め込むには，**共有**をクリックし，
**地図を埋め込む**のタブに表示されているソースコードをコピペするだけで完成です．

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8931131937625!2d136.98512531556443!3d35.159286366026095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600364495cbb50c3%3A0x10d8b5b9f62e6a31!2z5qSZ5bGx5aWz5a2m5ZyS5aSn5a2mIOaYn-OBjOS4mOOCreODo-ODs-ODkeOCuQ!5e0!3m2!1sja!2sjp!4v1519897606539" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

Google Mapsはとても便利なのですが，[利用規約](https://www.google.co.jp/permissions/geoguidelines.html)が厳しいことが知られています．
クレジット表示が必要なことは当然ですが，非営利であっても**印刷物**での使用には大きな制限があります．
新聞，雑誌，レポートなどの目的では問題ありませんが，ガイドブックや印刷広告には使用することができません．
これは，行政にとっては致命的であり，自治体を紹介する印刷広告を作成しようとしても，Google Mapsを掲載することができません．
そこで，代わりに用いられるのが[オープンストリートマップ(OpenStreetMap: OSM)](https://openstreetmap.jp/)です．
オープストリートマップは[クリエイティブ・コモンズ CC-BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/deed.ja)と呼ばれる
ライセンスで提供されており，適切にクレジットを表示すれば，営利目的の使用も含め，複製・再配布・改変が認められています．
例えば，椙山女学園大学の地図をオープンストリートマップで表示してみます．
上記のGoogle Mapsと比較しても，遜色ないことが分かるでしょう．

<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=136.976455450058%2C35.15610008340124%2C136.9943726062775%2C35.1639416495691&amp;layer=mapnik" style="border: 1px solid black"></iframe>

加えて，オープンストリートマップの最も大きな特徴は，オープンストリートマップのアカウント登録さえすれば，
誰しもが自由に地図を編集することができるという点です．
つまり，オープンストリートマップは，オンライン地図のサービスであることに加え，無料地図の共同作成プロジェクトでもあるわけです．
オープンストリートマップを編集する人のことを**マッパー**と呼び，
複数のマッパーで街歩きをしながらオープンストリートマップを編集するイベントを**マッピングパーティ**と呼びます．
全国各地でマッピングパーティは開催されていますので，興味があれば参加してみることをお勧めします．
日進市においては，平成29年12月9日に「[ブラニッシン〜いまのにっしん，世界に発信！〜](https://machimiru-haku.com/events/34)」という
マッピングパーティが開催され，向も参加しました．

今回は日進市のオープンデータとオープンストリートマップを組み合わせ，
独自のオンライン地図を作成する方法について学習していきましょう．



# ![Logo](/favicon/favicon-25x25.png){: .section} GeoJSON

ここで，オープンデータの条件である「機械判読に適したデータ形式」について考えてみます．
オンライン地図にオープンデータを表示するには，当然，コンピュータが読み取ることが出来る形式を用いる必要があります．
これまでに，xlsx形式，csv形式を紹介しましたが，よりウェブに相性が良いデータ形式があります．
それが，**JSON形式（.json）**です．
[JSON](http://www.json.org/)は，「じぇいそん」と読み，ブラウザで動作するプログラミング言語のJavaScriptで用いられるデータ形式です
（JavaScript以外のプログラミング言語でも対応していることが多い）．

下記のCSV形式のデータを例に考えてみましょう．

	町名,男,女,総数,世帯数
	赤池町,1693,1647,3340,1315
	浅田町,2593,2431,5024,2086


上記のデータをJSON形式に変換すると下記になります．
JSON形式では，データは**string（文字列）**と**value（値）**の組で表現されます．
例えば，"町名"という文字列と，"赤池町"という値が組になっていることがわかります．
また，**[ ]**は配列を表しており，0番目の要素に赤池町のデータ，1番目の要素に浅田町のデータが格納されます．
要素は「,（カンマ）」で区切られますが，最後の要素には必要ありません（間違えやすいので要注意）．

	[
		{
			"町名": "赤池町",
			"男": 1693,
			"女": 1647,
			"総数": 3340,
			"世帯数": 1315
		},
		{
			"町名": "浅田町",
			"男": 2593,
			"女": 2431,
			"総数": 5042,
			"世帯数": 2086
		}		
	]

このJSON形式を基本として，点，線，多角形などの空間データを表現するために用いられるのが，
**GeoJSON**形式です．
[GeoJSON](http://geojson.org/geojson-spec.html)は，「じおじぇいそん」と読み，
[uMap](http://umap.openstreetmap.fr/ja/)，[Leeflet](http://leafletjs.com/)，
[OpenLayers](http://openlayers.org/)などの様々な地図サービスで利用可能です．

下記のCSV形式のデータを例に考えてみましょう．
緯度・経度の情報が含まれており，オンライン地図では**点**として扱われます．

	名称,緯度,経度,説明
	休日急病診療所,35.132795,137.042009,日進市中央福祉センター内にある休日急病診療所です．
	西部福祉会館,35.12599221,137.0147748,乳幼児室，学習室があります．
	
上記のデータをGeoJSON形式に変換すると下記になります．
少し複雑に見えますが，JSON形式に従っていることを確認してください．
ここでは，空間データの種類を表す**type**に**Point（点）**を設定しています．
Pointの他にも，**LineString（線）**，**Polygon（多角形）**などを指定することもできます．
また，座標は**coordinates**で指定していますが，経度・緯度の順番であることに注意してください．
その他，名称，説明などの情報は，**properties**に記載します．
	
	{
		"type": "FeatureCollection",
		"features": [
			{
				"type": "Feature",
				"geometry": 
					{
						"type": "Point",
						"coordinates": [137.042009,35.132795]
					},
				"properties":
					{
						"名称": "休日急病診療所",
						"説明": "日進市中央福祉センター内にある休日急病診療所です．"
					}
			},
			{
				"type": "Feature",
				"geometry": 
					{
						"type": "Point",
						"coordinates": [137.0147748,35.12599221]
					},
				"properties":
					{
						"名称": "西部福祉会館",
						"説明": "日進市中央福祉センター内にある休日急病診療所です．"
					}
			}
		]
	}

# ![Logo](/favicon/favicon-25x25.png){: .section} uMap

GeoJSON形式のデータをオープンストリートマップに重ねて表示することに挑戦してみましょう．
今回は[uMap](http://umap.openstreetmap.fr/ja/)という地図サービスを利用します．
uMapはオープンストリートマップを加工して，ウェブページに埋め込むためのオリジナル地図を作成することができます．
[uMap](http://umap.openstreetmap.fr/ja/)のウェブサイトを開き，**マップを作成**をクリックしましょう．

[![https://gyazo.com/2379f6b09819cc69e17c37ec071b70db](https://i.gyazo.com/2379f6b09819cc69e17c37ec071b70db.png)](https://gyazo.com/2379f6b09819cc69e17c37ec071b70db)

オープンストリートマップを利用した地図が表示されます．
次に，画面右に並んでいるアイコンから**データインポート**をクリックします．
ここで，上記のGeoJSON形式のデータを貼り付けください．
また，インポートデータ形式には**geojson**を選択してください．
最後に**インポート**をクリックします．

[![https://gyazo.com/b21099d764b26e3c24944f9c192a9292](https://i.gyazo.com/b21099d764b26e3c24944f9c192a9292.png)](https://gyazo.com/b21099d764b26e3c24944f9c192a9292)

するとGeoJSONで読み込んだエリアの地図に遷移し，
休日急病診療所と西部福祉会館のマーカーが表示されます．
また，キーボードのシフトキーを押しながらマーカーをクリックすると，
マーカーの編集モードを表示することができます．
ここでは，マーカーの色，形状，シンボルに加え，
ポップアップ表示したときの名称や概要を設定することができます．
作成した地図を公開する場合には，**サイトへのマップ埋め込みと共有**をクリックし，
表示されたソースコードを貼り付けるだけでウェブページに埋め込みが可能です．

このとき，**iframeエクスポートオプション**で，
「横幅」と「縦幅」を**100%**，
「フルスクリーンのリンクを含める？」を**OFF**，また，
「デフォルトのマップ表示から現在の表示に切り替えますか？」と
「現在表示しているレイヤを保持」を**ON**に設定しておきましょう．

[![https://gyazo.com/3eb5d016c500c4919165b87fd68850ee](https://i.gyazo.com/3eb5d016c500c4919165b87fd68850ee.png)](https://gyazo.com/3eb5d016c500c4919165b87fd68850ee)

<iframe width="100%" height="500px" frameBorder="0" src="http://umap.openstreetmap.fr/ja/map/map_202304?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false&datalayers=505797#15/35.1301/137.0302"></iframe>

# ![Logo](/favicon/favicon-25x25.png){: .section} 課題

日進市のオープンデータから任意のデータを選び，2箇所以上の施設を表すGeoJSON形式のデータを作成しなさい．
また，uMAPで作成したGeoJSON形式のデータをインポートし，マップ埋め込み用のソースコードを貼り付けた
HTMLファイルを作成し，Glexaから提出しなさい．

{% include seminar_fundamental_areas/reference.html %}
