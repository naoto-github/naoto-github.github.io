---
layout: page
title: "Onsen UI(3) テーマローラー"
top_link: false
image: "https://i.gyazo.com/9fae237ccc8420f8e905c635f189eb4a.png"
---

[![https://gyazo.com/9fae237ccc8420f8e905c635f189eb4a](https://i.gyazo.com/9fae237ccc8420f8e905c635f189eb4a.png)](https://gyazo.com/9fae237ccc8420f8e905c635f189eb4a)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> Onsenテーマローラーとは

Onsen UIでは **[Onsenテーマローラー](http://components.onsen.io/)** というテーマ機能を利用できます。
CSSファイルを直接編集しなくても、Onsenテーマーローラーで、各コンポーネントのデザインを変更することが可能です。
また、Onsen UIを利用したデザインパターン（プロフィールやコンタクトリストなど）も用意されており、
デザインパターンのソースコードを参考にしながら、オリジナルのデザインが可能です。
アプリのデザインは個人のセンスが問われる要素です。
一からデザインを組み立てるよりも既存のデザインを流用する方が簡単かつ美しくなることが多いです。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> プロジェクトの作成

今回は、Onsenテーマローラを利用しながら、お店紹介アプリを作成してみましょう。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Minimum】を選択します。
プロジェクト名を **お店紹介アプリ** 、説明を **Onsenテーマローラーを利用したお店紹介アプリ** とします。
プロジェクトを作成したら **MonacaクラウドIDE** の画面を開きましょう。

[![https://gyazo.com/649c6e31ec0ea6fc9a651b10bdc577d7](https://i.gyazo.com/649c6e31ec0ea6fc9a651b10bdc577d7.png)](https://gyazo.com/649c6e31ec0ea6fc9a651b10bdc577d7)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> デザインパターンの利用

今回は、 **[Onsenテーマローラー](http://components.onsen.io/)** にリストアップされているパターンの中から、
「Shop Details」を利用します。
まずは、 **Show Source** をクリックして、ソースコードを表示します。
表示されたダイアログの左には **HTML** ファイルのソースコード、
右には **CSS** ファイルのソースコードが表示されます。
そこで、この **HTML** ファイルのソースコードの **body** 要素をコピーして、
**お店紹介アプリ** の **index.html** の **body** 要素を上書きします。

[![https://gyazo.com/1367011d1d7fabe8b72ba747f462b5ad](https://i.gyazo.com/1367011d1d7fabe8b72ba747f462b5ad.png)](https://gyazo.com/1367011d1d7fabe8b72ba747f462b5ad)

すると、プレビュー表示は下記のようになります。
次に、 **CSS** ファイルのソースコードを全てコピーして、
**お店紹介アプリ** の **css/style.css** に貼り付けます
（貼り付ける前は **css/style.css** は空っぽです）。

[![https://gyazo.com/dd6989d302d572759e42cf80f1c3800e](https://i.gyazo.com/dd6989d302d572759e42cf80f1c3800e.png)](https://gyazo.com/dd6989d302d572759e42cf80f1c3800e)

すると、プレビュー表示は下記のようになります。
「Shop Detail」のテーマが再現されていることが分かります。

[![https://gyazo.com/8797eef5b8320c543f0b3581c982f712](https://i.gyazo.com/8797eef5b8320c543f0b3581c982f712.png)](https://gyazo.com/8797eef5b8320c543f0b3581c982f712)

それでは、お店のデータを皆さんがお薦めするお店のデータに置き換えてみましょう。
まずは、お店の画像を用意して、プロジェクトにコピーします。
ここでは、 **8ban.jpg** を利用します（この画像は向が帰省した際に撮影したものです）。
**css/style.css** の **.card** を下記のように修正します。

{% gist naoto-github/f09b46784ba4502511a4f3ff12cab915 %}

次に、 **index.html** の該当する箇所を修正します。
ここでは、お店の名前、お店の紹介文、住所、電話番号を修正しました。
下記のソースコードを参考にしてください。

{% gist naoto-github/c638a8d87e24b0defed6ff7abafef3db %}

[![https://gyazo.com/7ffbd02379f18c0823139bd7f0b37679](https://i.gyazo.com/7ffbd02379f18c0823139bd7f0b37679.png)](https://gyazo.com/7ffbd02379f18c0823139bd7f0b37679)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> テーマの変更

Onsen UIのCSSコンポーネントでは、自由にコンポーネントの色を変更することができます。
例えば、Switchのデザインを変更したければ、Switchにチェックを入れます。
すると、 **Border Color** と **Hilight Color** がハイライトされ、
Switchの色を決めている箇所だと分かります。
自由にデザインを変更してみましょう。

[![https://gyazo.com/0bb1bc80e7e71f771c68372e874e45fd](https://i.gyazo.com/0bb1bc80e7e71f771c68372e874e45fd.png)](https://gyazo.com/0bb1bc80e7e71f771c68372e874e45fd)

デザインを決めたら **Download Theme** をクリックして、テーマファイルをダウンロードします。
ダウンロードしたファイルを解凍し、 **onsen-css-components.css** をプロジェクトにコピーします。
最後に、**index.html** の **head** 要素に下記の一行を加えます。
すると、テーマが適用され、アプリのデザインが変更されます。

    <link rel="stylesheet" href="onsen-css-components.css">

{% gist naoto-github/a8f40f4f4fa2b27d2d02ae996dc911a7 %}

[![https://gyazo.com/69b59d258b23387724931dff7000d13f](https://i.gyazo.com/69b59d258b23387724931dff7000d13f.png)](https://gyazo.com/69b59d258b23387724931dff7000d13f)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 課題

デザインパターンやテーマを自由に変更して、オリジナルのお店紹介アプリを完成させてください。
アプリが完成したらプロジェクトを**エクスポート**して提出してください。
エクスポートは【ファイル】-【プロジェクトをエクスポート】から可能です。


{% include graduation_preperation_1/reference.html %}
