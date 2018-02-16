---
layout: page
title: "レイアウトとグラフィックス"
permalink: /class/applied_programming/chapter10.html
top_link: false
image: "https://i.gyazo.com/1394439f1b202d1f8d35dc6ef040568f.png"
---
[![https://gyazo.com/1394439f1b202d1f8d35dc6ef040568f](https://i.gyazo.com/1394439f1b202d1f8d35dc6ef040568f.png)](https://gyazo.com/1394439f1b202d1f8d35dc6ef040568f)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの準備

Eclipseで新規にプロジェクトを作成しましょう。
メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクトの作成」を開きます。
ここでは、プロジェクト名に”Project10”を入力します。
また、JREは"**プロジェクト固有のJREを使用**"を選択します。
最後に、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したプロジェクトが表示されていることを確認してください。

<!--[![https://gyazo.com/63b8bfc3268927ef9043175c37fa2895](https://i.gyazo.com/63b8bfc3268927ef9043175c37fa2895.png)](https://gyazo.com/63b8bfc3268927ef9043175c37fa2895)-->

[![https://gyazo.com/50175cfa5a587078e01b6f4a8a83f015](https://i.gyazo.com/50175cfa5a587078e01b6f4a8a83f015.png)](https://gyazo.com/50175cfa5a587078e01b6f4a8a83f015)

**Application**クラスを継承した**MyApplication**クラスを作成しましょう。
メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。 まず、名前に”MyApplication”を入力します。
次に**スーパークラス**を設定するために、[参照]ボタンから「スーパークラスの選択」を開き、
一致する項目から**javafx.application.Application**を選択して、[OK]をクリックします。
最後に[完了]をクリックしましょう。

[![https://gyazo.com/c8eff2d897521ad5480fe1e2c117b4f2](https://i.gyazo.com/c8eff2d897521ad5480fe1e2c117b4f2.png)](https://gyazo.com/c8eff2d897521ad5480fe1e2c117b4f2)

Applicationクラスの抽象メソッドである**startメソッド**をオーバーライドしておきます。
下記コードを参考に、タイトルを**Project 10**、幅を**500px**、高さを**500px**に設定しましょう。
プログラムの実行後にウィンドウが表示されることを確認してください。

{% gist c1685a5b5e61b27e7964 %}

[![https://gyazo.com/cdbc9cda4feeeec1b8cae34147aa84f8](https://i.gyazo.com/cdbc9cda4feeeec1b8cae34147aa84f8.png)](https://gyazo.com/cdbc9cda4feeeec1b8cae34147aa84f8)

{% include applied_programming/export.html %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">レイアウト

テキストフィールドやボタンなどのコントロールをレイアウトするには**レイアウトペイン**を利用します。
前回は垂直に並べる**VBoxクラス**を利用しましたが、
今回はアプリケーションのレイアウトに向いている**BorderPaneクラス**を利用してみましょう。
BorderPaneクラスはウィンドウを中央、上、下、左、右に5分割してコントロールを配置します。

ここでは、ウィンドウの左右にボタン、
そして、ウィンドウの中央にキャンバスを配置します。
キャンバスを作成するには、下記のようにCanvasクラスをインスタンス化します（Canvasクラスの詳細は後述）。
キャンバスの幅と高さを**400px**に設定しています。

    Canvas canvas = new Canvas(400, 400);

次に、下記のように**BorderPane**クラスをインスタンス化し、中央にコントロールを配置します。
中央、上、下、左、右に配置するにには、それぞれ、`setCenter()`メソッド、`setTop()`メソッド、
`setBottom()`メソッド、`SetLeft()`メソッド、`setRight()`メソッドを利用します。

     BorderPane pane = new BorderPane();
     pane.setCenter(canvas);

下記のコードを参考に、ウィンドウの左右のボタン、ウィンドウの中央にキャンバスを配置してください。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/4225c0b07cd827041132 %}

[![https://gyazo.com/cb31bd927bce2b4a8471e604b99e73af](https://i.gyazo.com/cb31bd927bce2b4a8471e604b99e73af.png)](https://gyazo.com/cb31bd927bce2b4a8471e604b99e73af)

これまでに紹介した**VBox**、**BorderPane**以外にも、水平に配置する**HBox**、
左から右に配置する**FlowPane**、行列に分割して配置する**GridPane**などのレイアウトペインがあります。
詳細はオラクルが提供する[ドキュメント](http://www.oracle.com/technetwork/jp/java/javafx/documentation/index.html)を参考にしてください。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">グラフィックス

ウィンドウに文字や図形などのグラフィックスを表示するには**Canvasクラス**を利用します。
キャンバスに何かを描くときは、`getGraphicsContext2D()`メソッドを利用して**GraphicsContext**クラスのインスタンスを取得します。
**GraphicsContext**クラスには下記のようなメソッドが用意されています。

|メソッド|概要|
|-|-|
|setStroke()|線の色を設定する|
|strokeLine()|線を描く|
|strokeRect()|矩形を描く|
|strokeOval()|楕円を描く|
|strokePolygon()|多角形を描く|
|strokeText()|文字列を描く|
|setFill()|塗りつぶしの色を設定する|
|fillRect()|塗りつぶしの矩形を描く|
|fillOval()|塗りつぶしの楕円を描く|
|fillPolygon()|塗りつぶしの多角形を描く|
|fillText()|塗りつぶしの文字列を描く｜
|drawImage()|指定した位置にイメージを描く|

キャンバスを白く塗りつぶしてみましょう。
まずは、下記のように**GraphicsContext**クラスのインスタンスを取得します。

    gc = canvas.getGraphicsContext2D();

次に、下記のように`setFill()`メソッドで塗りつぶしの色を白に設定し、
`fillRect`メソッドで座標(0,0)に幅400、高さ400の矩形を描きます。
色は**Colorクラス**を利用して表現することが可能で、
白色ならば`Color.WHITE`と表記します。

    gc.setFill(Color.WHITE);
    gc.fillRect(0, 0, 400, 400);

下記のコードを参考に、キャンバスを白く塗りつぶして下さい。
GUIに関するコードと、グラフィックスに関するコードを区別するため、
ここでは新しく`paint()`メソッドを定義していることに注意してください。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/9ae451a7c5ddef46c7b5 %}

[![https://gyazo.com/8e91279047abb9fb182ebc00a38d0e4a](https://i.gyazo.com/8e91279047abb9fb182ebc00a38d0e4a.png)](https://gyazo.com/8e91279047abb9fb182ebc00a38d0e4a)

今度はキャンバスの中央に緑色の塗りつぶし円を描いてみましょう。
円の特徴を表す**X座標（x）**、**Y座標（y）**、**半径（r）**はフィールドで定義します。
下記のように`setFill()`メソッドで塗りつぶしの色を緑に設定し、`fillOval()`メソッドで座標、幅、高さを指定して円を描きます。

	gc.setFill(Color.GREEN);
    gc.fillOval(x, y, 2*r, 2*r);

下記のコードを参考に、緑の塗りつぶし円を描いてください。
一端、白色で塗りつぶした後で、緑色の円を描いています。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/37a001be4cbcba7f7576 %}

[![https://gyazo.com/a0b7533b4ccd2ff9d4e873edabb7db54](https://i.gyazo.com/a0b7533b4ccd2ff9d4e873edabb7db54.png)](https://gyazo.com/a0b7533b4ccd2ff9d4e873edabb7db54)

下記のコードを参考に左右のボタンに応じて描いた円を左右に10pxずつ移動させてみましょう。
左に移動する`moveLeft()`メソッドと右に移動する`moveRight()`メソッドを定義していることに注意してください。
プログラムの実行後にボタンをクリックすると円が移動することを確認してください。

{% gist naoto-github/d3fea87cec2435418c3e %}

[![https://gyazo.com/70093c2e89755383e7d639f9aefd4baf](https://i.gyazo.com/70093c2e89755383e7d639f9aefd4baf.gif)](https://gyazo.com/70093c2e89755383e7d639f9aefd4baf)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

上下のボタンを追加して、ボタンをクリックすると上下に移動するようにしてください。
上に移動するメソッドを`moveTop()`、下に移動するメソッドを`moveBottom()`としてください。
課題が完成したら、作成したプロジェクトを実行可能JARファイルの形式でファイルに保存（エクスポート）してください。

[![https://gyazo.com/0fcde8e61541f67224a991d52e775fa7](https://i.gyazo.com/0fcde8e61541f67224a991d52e775fa7.gif)](https://gyazo.com/0fcde8e61541f67224a991d52e775fa7)

{% include applied_programming/reference.html %}