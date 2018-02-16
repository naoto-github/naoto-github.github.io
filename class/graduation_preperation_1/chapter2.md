---
layout: page
title: "Onsen UI(2) テキスト入力"
top_link: false
image: "https://i.gyazo.com/52c78ebc2db3079b8a561368f8a500f4.png"
---

[![https://gyazo.com/52c78ebc2db3079b8a561368f8a500f4](https://i.gyazo.com/52c78ebc2db3079b8a561368f8a500f4.png)](https://gyazo.com/52c78ebc2db3079b8a561368f8a500f4)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Onsen UIとは

**Onsen UI**はアシアル株式会社が提供するSPA(Single Page App)のためのフレームワークです。
この**Onsen**という名称は、英単語**Spa**の日本語訳が**温泉**であることから名付けられたようです。
旧バージョンの1.0は、Googleのフレームワークである[AngularJS](https://angularjs.org/)に依存していましたが、
最新バージョンの2.0では依存を切り離すことで、[AngularJS](https://angularjs.org/)だけでなく、
[React](https://facebook.github.io/react/)や[Vue.js](https://jp.vuejs.org/)などのフレームワークでも開発が可能になりました。
本授業では、最新のバージョン2.0を採用しますが、
特定のフレームワークは用いず、標準的なJavaScriptで実装することを基本とします。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの作成

今回は、テキスト入力の機能を利用して、クイズアプリを作成してみましょう。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Navigation】を選択します。
プロジェクト名を**クイズアプリ**、説明を**テキスト入力を利用したクイズアプリ**とします。
プロジェクトを作成したら**MonacaクラウドIDE**の画面を開きましょう。

[![https://gyazo.com/942e52190d7fbd67b2bb701c09c6c207](https://i.gyazo.com/942e52190d7fbd67b2bb701c09c6c207.png)](https://gyazo.com/942e52190d7fbd67b2bb701c09c6c207)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">テキスト入力

最初に**index.html**の**page1.html**を下記のように修正していきましょう
（基本構造は「[Onsen UI(1) コンポーネント](chapter1.html)」を参照）。

{% gist naoto-github/adadc7ce7a393dda813e5a0465a001e9 %}

テキスト入力には**ons-input**タグを利用します。
ここでは、**id**属性に**answer**、**modifier**属性に**underbar**を設定しています。
**modifier**属性は、コンポーネントの外見を設定するために用いられます。
**ons-input**タグであれば、マテリアルデザインの**material**と、
下線が表示される**underbar**の２種類が設定可能です。

このテキスト入力にクイズの答えを入力し、回答ボタンをクリックすると、
入力された答えが正しいかを判定し、それぞれ正解、または、不正解ページに遷移することにします。
ここで、正解のページは**page2.html**、不正解のページは**page3.html**とします。

<img class="shadow" src="https://i.gyazo.com/6f8f5f91a795971e0e794097f4bc3938.png">
<!-- [![https://gyazo.com/6f8f5f91a795971e0e794097f4bc3938](https://i.gyazo.com/6f8f5f91a795971e0e794097f4bc3938.png)](https://gyazo.com/6f8f5f91a795971e0e794097f4bc3938) -->

次に、**ons-template**タグと、**ons-page**タグを利用して、
正解と不正解のページを下記のように作成します。
**page2.html**は入力された回答が正解のときに表示されるページです。
ツールバーに**正解**、中央に**p**タグで「向先生は射手座です！」と表示します。
また、**page3.html**は入力された回答が不正解のときに表示されるページです。
ツールバーに**不正解**、中央に**p**タグで「向先生は違う星座だよ！」と表示します。

{% gist naoto-github/ee895dccaca2eb89d0efc3c48d2a75fc %}

<img class="shadow" src="https://i.gyazo.com/c333961c49be456156154a57636bd665.png">
<!-- [![https://gyazo.com/c333961c49be456156154a57636bd665](https://i.gyazo.com/c333961c49be456156154a57636bd665.png)](https://gyazo.com/c333961c49be456156154a57636bd665) -->

<img class="shadow" src="https://i.gyazo.com/936242bf8afac358a28a0ccb49e0ff8d.png">
<!-- [![https://gyazo.com/936242bf8afac358a28a0ccb49e0ff8d](https://i.gyazo.com/936242bf8afac358a28a0ccb49e0ff8d.png)](https://gyazo.com/936242bf8afac358a28a0ccb49e0ff8d) -->

最後に**script**要素のJavaScriptのコードを下記のように修正します。
フォームに入力されたテキストは**getElementById()**関数でID属性を参照して取得します。

	var answer = document.getElementById("answer");

次に、if文を利用して、入力されたテキストが**射手座**と一致するときに、
**page2.html**に遷移し、一致しないときは、**page3.html**に遷移するようにします。
ここで、ページの遷移は**pushPage()**関数を利用していることに注意してください。

{% gist naoto-github/7f32c18d4978e865dbb8f6033e9ced2e %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

**index.html**を修正し、オリジナルのクイズ問題を作成してください。
アプリが完成したらプロジェクトを**エクスポート**して提出してください。
エクスポートは【ファイル】-【プロジェクトをエクスポート】から可能です。

{% include graduation_preperation_1/reference.html %}
