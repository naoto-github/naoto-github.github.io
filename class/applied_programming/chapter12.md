---
layout: page
title: "アニメーション"
permalink: /class/applied_programming/chapter12.html
top_link: false
image: https://i.gyazo.com/70fa4078af19d2acf8f5a62eddac321a.png
---

[![https://gyazo.com/70fa4078af19d2acf8f5a62eddac321a](https://i.gyazo.com/70fa4078af19d2acf8f5a62eddac321a.png)](https://gyazo.com/70fa4078af19d2acf8f5a62eddac321a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの準備

Eclipseで新規にプロジェクトを作成しましょう。
メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクトの作成」を開きます。
ここでは、プロジェクト名に”Project12”を入力ます。
また、JREは"**プロジェクト固有のJREを使用**"を選択します。
最後に、[完了]をクリックしましょう。

<!--[![https://gyazo.com/93f2cadc9148cb6b30d45c22302345cf](https://i.gyazo.com/93f2cadc9148cb6b30d45c22302345cf.png)](https://gyazo.com/93f2cadc9148cb6b30d45c22302345cf)-->

[![https://gyazo.com/3a9a83ab3c9adbf4a8d9b93116b6e25a](https://i.gyazo.com/3a9a83ab3c9adbf4a8d9b93116b6e25a.png)](https://gyazo.com/3a9a83ab3c9adbf4a8d9b93116b6e25a)

**Application**クラスを継承した**MyApplication**クラスを作成しましょう。
メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。 まず、名前に”MyApplication”を入力します。
次に**スーパークラス**を設定するために、[参照]ボタンから「スーパークラスの選択」を開き、
一致する項目から**javafx.application.Application**を選択して、[OK]をクリックします。
最後に[完了]をクリックしましょう。

[![https://gyazo.com/9bae89257cfbf390807eb9ee034e965f](https://i.gyazo.com/9bae89257cfbf390807eb9ee034e965f.png)](https://gyazo.com/9bae89257cfbf390807eb9ee034e965f)

Applicationクラスの抽象メソッドである**startメソッド**をオーバーライドしておきます。
下記コードを参考に、タイトルを**Project 12**、幅を**800px**、高さを**500px**に設定しましょう。
プログラムの実行後にウィンドウが表示されることを確認してください。

{% gist naoto-github/30675ef88d165d47bd2b %}

[![https://gyazo.com/7347594439ac7f995ccac0434fd06666](https://i.gyazo.com/7347594439ac7f995ccac0434fd06666.png)](https://gyazo.com/7347594439ac7f995ccac0434fd06666)

{% include applied_programming/export.html %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">イメージの描画

今回はイメージをキャンバスに描画し、パラパラ漫画の要領でアニメーションさせることに挑戦していきましょう。
前準備として、下記のコードを参考に**Canvasクラス**をウィンドウに配置してください。 
レイアウトペインとして**VBoxクラス**を利用しています。 プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/773637d0466296b26c62 %}

[![https://gyazo.com/42657f7d3817d0230814105a05b36408](https://i.gyazo.com/42657f7d3817d0230814105a05b36408.png)](https://gyazo.com/42657f7d3817d0230814105a05b36408)

まずは、下記の「歩いている女性のイメージ（png画像）」をキャンバスに表示してみます。
この２つのイメージを交互に表示することで歩いている様子の表現が可能です。
[walking1.png](walking1.png)と[walking2.png](walking2.png)をダウンロードしたら、
プロジェクトの**srcフォルダ**にコピーしてください。

[![https://gyazo.com/7ffff99915b604b6ec050953c76c20a9](https://i.gyazo.com/7ffff99915b604b6ec050953c76c20a9.png)](https://gyazo.com/7ffff99915b604b6ec050953c76c20a9)
[![https://gyazo.com/1f35ae1f421c9c84f6e8dcf22af42756](https://i.gyazo.com/1f35ae1f421c9c84f6e8dcf22af42756.png)](https://gyazo.com/1f35ae1f421c9c84f6e8dcf22af42756)

保存したイメージを読み込むには、下記のように**Imageクラス**を利用します
（**Imageクラス**のコンストラクタの引数には、画像ファイルの位置を表す**URL**を指定します）。
ここでは、２つのイメージを利用するため、Imageクラスの配列*walking*を宣言して、
*walking[0]*に**walking1.png**、*walking[1]*に**walking2.png**をそれぞれ読み込みます。

    Image walking[] = new Image[2];
	walking[0] = new Image(this.getClass().getResource("walking1.png").toString());
	walking[1] = new Image(this.getClass().getResource("walking2.png").toString());

キャンバスにイメージを表示するには、**GraphicsContext**クラスの`drawImage()`メソッドを利用します。
`drawImage()`メソッドの３つの引数は、**表示するイメージ**、**X座標**、**Y座標**を表しています。

    gc.drawImage(walking[0], 0, 0);

下記のコードを参考に、新たに`paint()`メソッドを定義して、**walking1.png**の画像を表示してください。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/8792d000d30b2c9fe303 %}

[![https://gyazo.com/a372744616de3780b82ddad8794a8ece](https://i.gyazo.com/a372744616de3780b82ddad8794a8ece.png)](https://gyazo.com/a372744616de3780b82ddad8794a8ece)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">アニメーションの描画

時間軸に沿ってイメージをアニメーションするには**Timeline**クラスを利用します。
まずは、**Timeline**クラスのコンストラクタの引数に**KeyFrame**クラスを渡します。
この**KeyFrame**クラスには、アニメーションの1サイクルの時間(ミリ秒)と、
**ラムダ式**を利用してサイクル毎に実行するメソッド（**handle()**メソッド）を指定します。
次に、**setCycleCount()**メソッドで「実行するサイクル数」を指定します。
引数に**Timeline.INDEFINITE**を指定すると無限に繰り返すことを意味します。
最後に、**play()**メソッドでアニメーションが開始されます。

    Timline timer = new Timeline(new KeyFrame(Duration.millis(500), event -> handle()));
    timer.setCycleCount(Timeline.INDEFINITE);
    timer.play();

下記のコードを参考に、**walking1.png**と**walking2.png**を交互に表示するアニメーションを作成してください。
アニメーションのサイクル数を把握するために、int型の変数*time*を宣言しています。
この*time*を２で割った余りを配列番号に指定することで、0、1、0、1という繰り返しを実現していることに注意してください。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/9ff43f87d61ae46fe5eb %}

下記のコードを参考に、イメージが右に移動するアニメーションを作成してください。
イメージのX座標を表すint型の変数*x*を宣言し、サイクル毎に50ずつ値を増加させています。
プログラムの実行後に表示されるウィンドウを確認してください。

[![https://gyazo.com/6931a5d5e06b914e114417e980d31980](https://i.gyazo.com/6931a5d5e06b914e114417e980d31980.gif)](https://gyazo.com/6931a5d5e06b914e114417e980d31980)

{% gist naoto-github/b093c7f4b22ba0ce4684 %}

[![https://gyazo.com/97a14bcaa5211b200c47a0fd28ed0a3b](https://i.gyazo.com/97a14bcaa5211b200c47a0fd28ed0a3b.gif)](https://gyazo.com/97a14bcaa5211b200c47a0fd28ed0a3b)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

下記の「走っている男性のイメージ（png画像）」をキャンバスに表示させてください。
イメージは右から表示し、歩いている女性よりも速く移動させましょう。
[running1.png](running1.png)と[running2.png](running2.png)をダウンロードしたら、
Eclipseのプロジェクト**srcフォルダ**にコピーしてください。
課題が完成したら、作成したプロジェクトを実行可能JARファイルの形式でファイルに保存（エクスポート）してください。

[![https://gyazo.com/ec41bbd7f3ab1f428d60e6c8bfcaf3dd](https://i.gyazo.com/ec41bbd7f3ab1f428d60e6c8bfcaf3dd.png)](https://gyazo.com/ec41bbd7f3ab1f428d60e6c8bfcaf3dd)
[![https://gyazo.com/144f28d86601e53ca9e833082c02f865](https://i.gyazo.com/144f28d86601e53ca9e833082c02f865.png)](https://gyazo.com/144f28d86601e53ca9e833082c02f865)

[![https://gyazo.com/ded0672060682642fbc4b1769441e34f](https://i.gyazo.com/ded0672060682642fbc4b1769441e34f.gif)](https://gyazo.com/ded0672060682642fbc4b1769441e34f)

{% include applied_programming/reference.html %}