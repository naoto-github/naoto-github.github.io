---
layout: page
title: "Onsen UI(1) コンポーネント"
permalink: /class/graduation_preperation_1/chapter1.html
top_link: false
image: "https://i.gyazo.com/553748d85a555835c9c18ddddc97e789.png"
---

[![https://gyazo.com/553748d85a555835c9c18ddddc97e789](https://i.gyazo.com/553748d85a555835c9c18ddddc97e789.png)](https://gyazo.com/553748d85a555835c9c18ddddc97e789)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">HTML5とは

**HTML5**とは、HTML(Hyper Text Markup Language)のバージョン5のことを指し、
**W3C(World Wide Web Consortium)**と呼ばれる非営利団体が2014年10月28日に勧告した技術のことです。
HTML5では、文書構造を表すタグが追加されており、例えば、ヘッダを表す**header**タグ、フッタを表す**footer**などが利用できます。
また、動画や音声などのマルチメディアファイルも、Flashなどのプラグインを必要とせず、
**video**タグや、**audio**タグを利用してページに埋め込むことが可能になりました。
その他、ブラウザにデータの保存が可能な**Web Storage**、
サーバー・クライアント間の双方向通信が可能な**Web Socket**などもHTML5の一部として認識されています。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">HTML5ハイブリッドアプリとは

スマートフォンに搭載されている**iOS**や**Android**は、
ウェブブラウザのようにウェブページを取得・表示するための、**Web View**という機能が利用できます。
この、**Web View**を利用して、HTML、CSS、JavaScriptなどの技術で、
ネイティブ・アプリと同等の機能を提供する方法が**HTML5ハイブリッドアプリ**です。
一般に、ネイティブ・アプリを開発するには、iOSであれば**Objective-C**や**Swift**、
Androidであれば**Java**で実装する必要があり、学生が気軽に開発を初めることは困難です。
一方、HTML5ハイブリッドアプリであれば、ウェブページを制作するための技術が中心であり、
HTMLの基本を学んでいれば取り組むことが可能です。
本授業では、HTML5ハイブリッドアプリのプラットフォームである[Monaca](https://ja.monaca.io/)を利用して、
様々なアプリを開発するためのプログラミング技術を身に着けます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Monaca

**Monaca**は[アシアル株式会社](http://www.asial.co.jp/)が提供する
HTML5ハイブリッドアプリ専用の開発プラットフォームです。
Chromeで動作するクラウドサービスとして提供されているため、
ウェブに接続出来る環境であれば、どこでも開発が可能という特徴があります
（**Monaca Localkit**を利用すればローカルの環境でも開発可能）。
**Apache**が提供しているハイブリッドアプリのフレームワークである
**[Cordova](https://cordova.apache.org/)**を採用しているため、ネイティブ・アプリと同様に、
スマートフォンのカメラやセンサーの機能を利用することも可能です。

また、開発中のアプリをスマートフォンで動作テストすることが可能な
[Monacaデバッガー](https://ja.monaca.io/debugger.html)というアプリを利用することが可能です。
iOS版、Android版がともにリリースされており、アプリ・マーケットから取得が可能です。
ブラウザのプレビューでは動作するけど、スマートフォンでは動作しないという現象が、
まれに発生するので、こまめにMonacaデバッガーで動作確認すると良いでしょう。
加えて、Monacaデバッガーにはチャットやスクリーンショットなどのコミュニケーション機能が搭載されており、
チームでのアプリ開発もサポートしてくれます（有料のようですが）。
ブラウザでMonacaを開く前に、Monacaデバッガーを自身のスマートフォンにインストールしておきましょう。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの作成

[Monaca](https://ja.monaca.io/)を開き、ログインしてみましょう。
このとき、ブラウザは**Chrome**を利用することに注意してください
（**IE**など他のブラウザでの動作は保証されていないようです）。
ログインすると下図のようにプロジェクトを管理するための**ダッシュボード**が表示されます。
プロジェクトは**プロジェクト名**、**プロジェクトの説明**に加え、**タグ**を付けて管理することができます。

[![https://gyazo.com/6ce031f08295c9ab60bbb687727719b9](https://i.gyazo.com/6ce031f08295c9ab60bbb687727719b9.png)](https://gyazo.com/6ce031f08295c9ab60bbb687727719b9)

今回は、[Onsen UI ver.2](https://ja.onsen.io/)というSPA（Single Page App）の
フレームワークを利用して簡単な自己紹介アプリを作成してみましょう。
**Onsen UI ver.2**に関しては次回に詳しく説明します。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Navigation】を選択します。
プロジェクト名を**自己紹介アプリ**、説明を**Onsen UIを利用した自己紹介アプリ**とします。

[![https://gyazo.com/16fe46126d2ab4ffd1507d9f21ef1f12](https://i.gyazo.com/16fe46126d2ab4ffd1507d9f21ef1f12.png)](https://gyazo.com/16fe46126d2ab4ffd1507d9f21ef1f12)

[![https://gyazo.com/71b5f16289ac6db58741c33d7cdabbfa](https://i.gyazo.com/71b5f16289ac6db58741c33d7cdabbfa.png)](https://gyazo.com/71b5f16289ac6db58741c33d7cdabbfa)

プロジェクトを作成すると、ダッシュボードに戻り、作成した「自己紹介アプリ」のプロジェクトがリストに表示されます。
新規のプロジェクトには**NEW**という帯が付いています。
では、プロジェクトを開いてみましょう。

[![https://gyazo.com/19c967ac9f4015bb4ed966647279c0e1](https://i.gyazo.com/19c967ac9f4015bb4ed966647279c0e1.png)](https://gyazo.com/19c967ac9f4015bb4ed966647279c0e1)

プロジェクトを開くと下図の**MonacaクラウドIDE**と呼ばれる画面になります。
左にはプロジェクトパネルがあり、プロジェクトに含まれるファイルの一覧が表示されます。
中央にはエディタがあり、**index.html**などのソースファイルを編集することができます（**README.md**は不要なので閉じておきましょう）。
ソースコードの可読性を高めるために、ファイルの種類に応じて自動でハイライトされるようになっています。
下にはデバッグパネルがあり、ソースコードのエラーなどの情報が表示されます。
**console.log()**関数を利用した文字列の出力なども、デバッグパネルで確認可能です。
右にはプレビューがあり、開発中のアプリの簡易的な動作確認が可能です。
しかし、ネイティブAPIは利用できないことに加え、プレビューで動作しても、
実機では動作しないということが稀にあるため、過信は禁物です。

[![https://gyazo.com/5904acd4f515266ebdb8c804a0175ca4](https://i.gyazo.com/5904acd4f515266ebdb8c804a0175ca4.png)](https://gyazo.com/5904acd4f515266ebdb8c804a0175ca4)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">アプリの基本構造

それでは、自己紹介アプリを作成していきましょう。
まずは、アプリの基本構造を定義している**index.html**の**body**タグを確認しましょう。

{% gist naoto-github/d2fa5564f58cd7f50646155c43a14c8a %}

アプリ内のページの遷移は2行目の**ons-navigator**タグが管理しています。
**page**属性は、アプリが初期化されたときに表示するページを指定しています。
ここでは、**page1.html**が最初に表示されることになります。

	<ons-navigator id="navigator" page="page1.html"></ons-navigator>

アプリ内のページは3行目と15行目の**ons-template**タグで定義されています。
このタグで囲まれた要素は、id属性で指定した名前の、独立したページとみなされます。
ここでは、**page1.html**と**page2.html**が存在することになります。

	 <ons-template id="page1.html">

ページを定義するためのコンポーネントが**ons-page**タグです。
**page1.html**と、**page2.html**のそれぞれに定義されていることが分かります。
**page1.html**に注目すると、**ons-page**要素内には、**ons-toolbar**タグと**ons-button**タグがあります。
**ons-toolbar**タグはツールバー用のコンポーネントであり、ここでは"Page 1"という文字列がツールバーに表示されます。
また、**ons-button**はボタン用のコンポーネントであり、ここでは"Push Page"という文字列がボタンに表示されます。


    <ons-page>
        <ons-toolbar>
        	<div class="center">Page 1</div>
        </ons-toolbar>

        <p>This is the first page.</p>

        <ons-button id="push-button">Push page</ons-button>
    </ons-page>

アプリの実行結果をプレビューで確認してみまましょう。

<img class="shadow" src="https://i.gyazo.com/966c92063c71d93d17cbcb728cd4d827.png">
<!-- [![https://gyazo.com/966c92063c71d93d17cbcb728cd4d827](https://i.gyazo.com/966c92063c71d93d17cbcb728cd4d827.png)](https://gyazo.com/966c92063c71d93d17cbcb728cd4d827) -->

下記のソースコードを参考に、自身の名前、生年月日、プロフィール画像を表示してみましょう。
画像ファイルをプロジェクトパネルにドラッグ＆ドロップすることで、画像ファイルをアップロードすることができます。

{% gist naoto-github/8ef48f019dc4c2cd3f7b0eb990904c7f %}

<img class="shadow" src="https://i.gyazo.com/37e4018429bb5a5c228d8d54e3173728.png">
<!-- [![https://gyazo.com/37e4018429bb5a5c228d8d54e3173728](https://i.gyazo.com/37e4018429bb5a5c228d8d54e3173728.png)](https://gyazo.com/37e4018429bb5a5c228d8d54e3173728) -->

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ページの遷移

次に、JavaScriptが記述されている**script**タグを確認しましょう。

{% gist naoto-github/d4d067ecf73479577ad73713833605a8 %}

2行目にある**ons.ready()**関数は、Onsen UI コンポーネントの読み込みが終了し、Cordovaの準備が整ったときに呼ばれます。
このため、Onsen UI コンポーネントに関する処理は、この**ons.ready()**関数内に記述します。

3行目、4行目はいずれも、**id**を参照してOnsen UI コンポーネントをJavascriptのオブジェクトとして取得しています。
変数*button*には**ons-button**、変数*navigator*には**ons-navigator**がそれぞれ代入されます。

	var button = document.getElementById('push-button');
	var navigator = document.getElementById('navigator');

6行目～8行目は**ons-button**に対するイベント処理です。
ここでは、ボタンがクリックされたときに、**page2.html**へ遷移するように設定しています。

    button.onclick = function() {
    	navigator.pushPage('page2.html');
    };

このように、**ons-navigator**は、ページ遷移のための関数が定義されています。
例えば、**pushPage(page)**は引数で指定したページを表示し、
**popPage()**は一つ前のページに戻ります。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

"page2.html"に自身の趣味に関して記述しましょう。
ページには文章と画像を必ず含むようにしてください。
アプリが完成したらプロジェクトを**エクスポート**して提出してください。
エクスポートは【ファイル】-【プロジェクトをエクスポート】から可能です。

<img class="shadow" src="https://i.gyazo.com/d81326bd08d449577a7c5a86248fcd95.png">
<!-- [![https://gyazo.com/d81326bd08d449577a7c5a86248fcd95](https://i.gyazo.com/d81326bd08d449577a7c5a86248fcd95.png)](https://gyazo.com/d81326bd08d449577a7c5a86248fcd95) -->

{% include graduation_preperation_1/reference.html %}
