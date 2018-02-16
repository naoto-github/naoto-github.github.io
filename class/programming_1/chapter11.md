---
layout: page
title: "OpenCVを利用した顔検出"
permalink: /class/programming_1/chapter11.html
top_link: false
image: "https://i.gyazo.com/d3973e5c6b33e5bc08bf95c7b6bf90d1.png"
---

[![https://gyazo.com/d3973e5c6b33e5bc08bf95c7b6bf90d1](https://i.gyazo.com/d3973e5c6b33e5bc08bf95c7b6bf90d1.png)](https://gyazo.com/d3973e5c6b33e5bc08bf95c7b6bf90d1)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project11」を入力し、[保存]をクリックしましょう。
保存先に「Project11」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/f3f48f8fe0d13e78f308daff5a773ee4](https://i.gyazo.com/f3f48f8fe0d13e78f308daff5a773ee4.png)](https://gyazo.com/f3f48f8fe0d13e78f308daff5a773ee4)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">OpenCVの導入

[インテル](http://www.intel.co.jp/)が開発したオープンソースのライブラリである**OpenCV**を導入することで、
画像処理・画像解析など様々な機能を利用することが可能となります。
ここでは、Processing用の**OpenCV**を導入して、顔検出を試みてみましょう。
まずは、メニューから[スケッチ]-[ライブラリをインポート]-[ライブラリを追加]をクリックして、
「Contribution Manager」を開きます。
ここで、**opencv**をキーワードに検索すると、
「**OpenCV for Processing | Computer vision with OpenCV.**」が表示されるので、
このライブラリを選択してインストールしましょう。

[![https://gyazo.com/538852267edc0956cf1d754107f52b7b](https://i.gyazo.com/538852267edc0956cf1d754107f52b7b.png)](https://gyazo.com/538852267edc0956cf1d754107f52b7b)

次に、[スケッチ]-[ライブラリをインポート]-[OpenCV for Processing]をクリックして、OpenCVライブラリをインポートします。
また、同様にVideoライブラリをインポートしてください。
ソースコードの先頭に「**import gab.opencv.&lowast;;**」と「**import processing.video.&lowast;;**」が
表示されていることを確認してください。

{% gist naoto-github/45c867d128419c1629bd38c4a16694d8 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">カメラ映像の表示

**Capture**クラスを利用して、カメラから入力した画像を表示しましょう。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
ここでは、**サイズ（size）**が**320x240**、**フレームレート（fps）**が**30**となっている、
**3**番のカメラを使用していることに注意してください。
ウィンドウにカメラ映像が表示されることを確認してください。

{% gist naoto-github/ca77b146e63a24b107634fd363fb94e0 %}

[![https://gyazo.com/f0bda3ee7c555e685b5092ada1b994ce](https://i.gyazo.com/f0bda3ee7c555e685b5092ada1b994ce.gif)](https://gyazo.com/f0bda3ee7c555e685b5092ada1b994ce)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">顔位置の検出

顔位置の検出には**OpenCV**クラスを利用して下記のように記述します。
ここで、**OpenCV.CASCADE_FRONTALFACE**は顔を検出することを意味しており、
この他に**OpenCV.CASCADE_PEDESTRIANS**は歩行者、**OpenCV.CASCADE_EYE**は目を検出することが可能です
（詳細は[OpenCVのドキュメント](http://atduskgreg.github.io/opencv-processing/reference/)を参照してください）。
検出された顔位置は**Rectangle**クラスとして返されます。
**Rectangle**クラスは矩形を表しており、*x*、*y*で左上の座標、*width*、*heigth*で幅と高さを取得できます。

	opencv = new OpenCV(this, cam);
    opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);
    faces = opencv.detect();

それでは、検出された顔位置に`rect()`関数で矩形を描いてみましょう。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
ここでは、矩形の輪郭線を**赤色**、また、**塗りつぶしを描画しない**ように設定しています。
検出された顔位置に赤い矩形が表示されることを確認してください。

{% gist naoto-github/68d3f559002123c8b675b883768739c1 %}

[![https://gyazo.com/f2407a0560c1643e5042b428f4986c8d](https://i.gyazo.com/f2407a0560c1643e5042b428f4986c8d.gif)](https://gyazo.com/f2407a0560c1643e5042b428f4986c8d)

次は、検出された顔位置に画像を表示してみましょう。
下記の２種類の画像（[red.png](red.png)、[blue.png](blue.png)）の内から一つを選び、
画像をダウンロードしてください（画像提供：[GAHAG|著作権フリー写真・イラスト素材集](http://gahag.net/)）。
いずれの画像もサイズは250x220ピクセルです。
また、ダウンロードした画像は「スケッチフォルダ（Project11）」の中に配置しましょう。
これ以降、本資料では[red.png](red.png)を例に取り説明していきます。

![red.png](red.png)

![blue.png](blue.png)

まずは、**PImage**クラスのインスタンスを作成し、ダウンロードした画像を読み込みます。
後は、`draw()`関数の中で、これまでの`rect()`関数に代えて、`image()`関数を呼び出すだけです。
`image()`関数の引数は、**PImage**型の変数に加えて、表示する位置(x,y)、幅（width）、高さ（height）を指定します。

    image(img, x, y, width, height);

下記を参考にコードを入力したら、Runボタンをクリックしてください。
検出された顔位置に画像が表示されていることを確認してください。

{% gist naoto-github/4d67b361fe490fcb6b7e70001489ce60 %}

[![https://gyazo.com/4a568d286717b4d8a0465410fe0dfffc](https://i.gyazo.com/4a568d286717b4d8a0465410fe0dfffc.gif)](https://gyazo.com/4a568d286717b4d8a0465410fe0dfffc)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

**OpenCV.CASCADE_EYE**を指定して目の位置を検出し、目の位置に円を描きましょう。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project11-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/6a2e1f542cf1d3568e55fbb63e0ccb0b](https://i.gyazo.com/6a2e1f542cf1d3568e55fbb63e0ccb0b.gif)](https://gyazo.com/6a2e1f542cf1d3568e55fbb63e0ccb0b)

{% include programming_1/reference.html %}