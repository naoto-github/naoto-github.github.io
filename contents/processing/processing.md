---
layout: page
title: "Processingではじめての画像処理"
top_link: false
image: "https://i.gyazo.com/b8c6235a70fd7b5283e36b41f66a483a.png"
---

[![https://gyazo.com/837a5be65057f76dc9712fa48c42f652](https://i.gyazo.com/837a5be65057f76dc9712fa48c42f652.png)](https://gyazo.com/837a5be65057f76dc9712fa48c42f652)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Processingとは

**Processing**は、2001年から[MIT Media Lab](http://www.media.mit.edu/)でスタートしたオープンソースのプロジェクトです。
当初からプログラミング教育を意識して開発され、初学者でも視覚的なコンテンツ（ビジュアルコンテンツ）を容易に作成できることが大きな特徴です。
デザイナーや建築家などの利用も多く、作品はニューヨーク近代美術館など多くの著名な美術館で公開されています。
オープンソースであることにもこだわりが強く、活発なコミュニティが形成されており、ソフトウェアを拡張するためのライブラリやツールが多く提供されています。
ウィンドウズ、マッキントッシュ、リナックスなどのプラットフォームで動作可能であり、[公式サイト](https://processing.org/)から無料でダウンロードすることができます。
また、Processingは[Java](https://java.com/ja/)をベースに開発されており、Javaによく似た文法でコードを記述できることも人気の高い理由です。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Processingの開発環境

前節で述べたように様々なプラットフォームで動作可能なパッケージが配布されていますが、
今回はオンラインでコーディングが可能な[OpenProcessing](http://www.openprocessing.org/)を利用してみましょう。
このサイトでは、Processingで制作した**作品（スケッチ）**を公開することができます。
また、登録も無料で誰でも利用することが可能です。
では、下記のリンクをクリックして**OpenProcessing**のサイトを開きましょう。

[OpenProcessing](http://www.openprocessing.org/)

残念ながら現在は英語のサイトしか存在せず、ユーザ同士の交流は英語が中心です。
一方で、日本語でコメントを記述することは問題ないようです。
Processingに慣れてきたらオリジナルの作品を投稿することを目指しましょう。

<!-- [![https://gyazo.com/ee201a45ae0771f77636c4ca3fc6af7c](https://i.gyazo.com/ee201a45ae0771f77636c4ca3fc6af7c.png)](https://gyazo.com/ee201a45ae0771f77636c4ca3fc6af7c) -->

[![https://gyazo.com/e10d63e210c056368d3d44b48389abc0](https://i.gyazo.com/e10d63e210c056368d3d44b48389abc0.png)](https://gyazo.com/e10d63e210c056368d3d44b48389abc0)

まずは、公開されているスケッチを閲覧してみましょう。
「Activity」のタブをクリックすると、右下に評価の高い作品の一覧が表示されます。
これらのスケッチはOpenProcessingの登録者が制作した作品です。
自由にスケッチを選んでプログラムを実行してみましょう。
下記のは2017日6月9日現在のスケッチのリストです。

<!-- [![https://gyazo.com/efe9c131a1ee5a07c1547cd02cc66338](https://i.gyazo.com/efe9c131a1ee5a07c1547cd02cc66338.png)](https://gyazo.com/efe9c131a1ee5a07c1547cd02cc66338) -->

[![https://gyazo.com/94f5988a8496a0241eb9b55785314d83](https://i.gyazo.com/94f5988a8496a0241eb9b55785314d83.png)](https://gyazo.com/94f5988a8496a0241eb9b55785314d83)

幾つか人気のある作品を取り上げてみましょう。
まずは、**aadebdeb**氏の**rainbow spin**という作品です。
マウスの動きに合わせて、描かれている虹色の渦巻きの回転方向や倍率が変化します。

<iframe src="https://www.openprocessing.org/sketch/376325/embed/" width="500" height="500"></iframe>

次は、**Victor Galve**氏の**Practica 2**という作品です。
マウスでクリックすると、様々な色や形の花火が打ちあがります。

<iframe src="https://www.openprocessing.org/sketch/376521/embed/" width="720" height="480"></iframe>

最後は、**Raven Kwok**氏の**Noise Turbulence Doodles**という作品です。
マウスをドラッグすると円が重なりながら奇妙な形に成長します。

<iframe src="https://www.openprocessing.org/sketch/143842/embed/" width="720" height="720"></iframe>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

新しいスケッチを作成してみましょう。
サイトのトップから「**+Create a Sketch**」をクリックしてください。
下記のようにソースコードを入力する画面になります（デフォルトで記述されているコードは削除しておきましょう）。
ソースコードを記述した後で、<img src="https://i.gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9.png" alt="https://gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9" width="37"/>をクリックすると、記述されたコードを実行することができます。

[![https://gyazo.com/c1fd51c067125a961d90fcb8636bba36](https://i.gyazo.com/c1fd51c067125a961d90fcb8636bba36.png)](https://gyazo.com/c1fd51c067125a961d90fcb8636bba36)

Processingをウェブ上で実行するには「**P5js**」、または、「**Processing.js**」というライブラリを利用します。
今回は後者の **Processing.js** を利用するため、画面右の **Settings** で、
**Mode** を **Processing.js** に変更してください。

[![https://gyazo.com/ad979e1f24c904587c20588b9f62b390](https://i.gyazo.com/ad979e1f24c904587c20588b9f62b390.png)](https://gyazo.com/ad979e1f24c904587c20588b9f62b390)

図形を描く前に、スケッチの大きさや背景色を設定しましょう。
スケッチの大きさは**300x300**ピクセル、背景色は**白**にします。
大きさを設定するには**size(*幅*,*高さ*)**、背景色を設定するには**background(*色*)**と記述します（255は白色を意味します）。
下記のソースコードを入力したら、<img src="https://i.gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9.png" alt="https://gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9" width="37"/>をクリックしましょう。
背景色が白色のスケッチが表示されます（300x300ピクセルのスケッチが中央に配置されています）。
（「**//**」が先頭にある文章は**コメント**と呼ばれ、プログラムとは認識されません）
もとのソースコードの入力画面に戻るには<img src="https://i.gyazo.com/c0915614b1f71593d8a6f16418b4c45f.png" alt="https://gyazo.com/c0915614b1f71593d8a6f16418b4c45f" width="38"/>をクリックします。

    void setup() {
      size(300, 300); //スケッチの大きさ
      background(255); //背景色
    }

[![https://gyazo.com/8109a6b7f6951de133c7202c97aa17ec](https://i.gyazo.com/8109a6b7f6951de133c7202c97aa17ec.png)](https://gyazo.com/8109a6b7f6951de133c7202c97aa17ec)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">2D図形の描画

まずは、**2D**の図形を描くことに挑戦します。
赤色で塗りつぶした正方形を描いてみましょう。
塗りつぶしの色は**赤**、正方形の一辺の長さは**200**にします。
塗りつぶしの色を設定するには**fill(*赤成分*,*緑成分*,*青成分*)**と記述します。
色は、赤、緑、青の成分の合成で表現され、各成分は0から255までの値を設定します。
また、正方形（長方形）を描くには**rect(*X座標*,*Y座標*,*幅*,*高さ*)**と記述します。
下記のソースコードを入力したら、<img src="https://i.gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9.png" alt="https://gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9" width="37"/>
をクリックして実行しましょう。
スケッチに赤色の正方形が描かれます。

    void setup() {
      size(300, 300); //スケッチの大きさ
      background(255); //背景色

      fill(255, 0, 0); //塗りつぶしの色
      rect(50, 50, 200, 200); //正方形を描画
    }

[![https://gyazo.com/1d5337670d912331d938523eeb06a823](https://i.gyazo.com/1d5337670d912331d938523eeb06a823.png)](https://gyazo.com/1d5337670d912331d938523eeb06a823)

次は、マウスでクリックした位置に、緑色の円を描いてみましょう。
塗りつぶしの色は**緑**、円の直径は**30**にします。
円（楕円）を描くには**ellipse(*X座標*,*Y座標*,*幅*,*高さ*)**と記述します。
下記のソースコードを入力したら、<img src="https://i.gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9.png" alt="https://gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9" width="37"/>
をクリックして実行しましょう。
クリックした位置に緑色の円が描かれます。

    void draw(){
    }

    void mousePressed(){
      fill(0, 255, 0);
      ellipse(mouseX, mouseY, 30, 30);
    }

[![https://gyazo.com/0479a84b1b71f120989172a77d62746b](https://i.gyazo.com/0479a84b1b71f120989172a77d62746b.gif)](https://gyazo.com/0479a84b1b71f120989172a77d62746b)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">3D図形の描画

今度は、**3D**の図形を描くことに挑戦します。
ここでは、**レンダラ（3Dの図形を基に2Dの画像を生成すること）**として「**P3D(Processing 3D)**」を利用します。
まずは、2次元の座標系(x,y)から、３次元の座標系(x,y,z)に変更します（zは奥行きです）。
下記のソースコードを入力してください。

    void setup() {
      size(300, 300, P3D); //スケッチの大きさ
      background(255); //背景色
    }

次に、3次元空間に立方体を描いてみます。
立方体の一辺の長さは**100**にします。
立方体を描くには**box(*長さ*)**と記述します。
このとき、空間の原点座標を**translate()**を利用して、
空間の中心に移動させておきます（立方体は原点を中心に描かれます）。
下記のソースコードを入力したら、<img src="https://i.gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9.png" alt="https://gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9" width="37"/>
をクリックして実行しましょう。
空間に正方形が描かれます（立方体には見えませんね）。

    void draw(){
      background(255);
      translate(150, 150, 0);
      box(100);
    }

[![https://gyazo.com/8fa4cc98522d42199ca62cc07d883c6f](https://i.gyazo.com/8fa4cc98522d42199ca62cc07d883c6f.png)](https://gyazo.com/8fa4cc98522d42199ca62cc07d883c6f)

正方形に見えるのは、立方体を真正面から見ていることが原因です。
それでは、マウスの動きに合わせて、立方体が回転するように修正を加えます。
空間を回転させるには**rotateX(*X方向のラジアン角*)**と、**rotateY(*Y方向のラジアン角*)**を利用します。
また、*angle_x*と*angle_y*という**変数**（値を記録する箱）を用意することに注意してください。
まずは、下記のコードを入力してください。

    float angle_x;
    float angle_y;

    void draw(){
      background(255);
      translate(150, 150, 0);

      rotateX(angle_x);
      rotateY(angle_y);

      box(100);
    }

さらに、マウスの動きを検知して、*angle_x*と*angle_y*に記録されている値を少しだけだけ増減させます。
マウスのボタンを押したときに**mousePressed()**、
ドラッグしたままマウスを動かしたときに**mouseDragged()**が呼ばれます。
下記のソースコードを入力したら、<img src="https://i.gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9.png" alt="https://gyazo.com/51389dd07b0a27672bcec20f3f4e0ef9" width="37"/>
をクリックして実行しましょう。
マウスの動きに合わせて立方体が回転することを確認してください。

    float pressed_x;
    float pressed_y;

    void mousePressed(){
      pressed_x = mouseX;
      pressed_y = mouseY;
    }

    void mouseDragged(){
      angle_y = (mouseX - pressed_x) * 0.01;
      angle_x = (mouseY - pressed_y) * 0.01;
    }

[![https://gyazo.com/caaf242107c1e3d3a581e48f47815ba2](https://i.gyazo.com/caaf242107c1e3d3a581e48f47815ba2.gif)](https://gyazo.com/caaf242107c1e3d3a581e48f47815ba2)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Processingの応用

Processingにカメラを組み合わせると、カメラ映っている顔を検出したり、仮想的な物体を表示（**拡張現実**）させることもできます。
また、マイクロソフトの**キネクト**を組み合わせれば、人体のスケルトンを抽出することも可能です。
皆さんの自由なアイディアで素敵な作品を制作して楽しんでみてください。
作品が出来たら向（[Facebookアカウント](https://www.facebook.com/nmukai1978)、[Twitterアカウント](https://twitter.com/nmukai1978)）までお知らせ頂けると嬉しいです。

[![https://gyazo.com/4a568d286717b4d8a0465410fe0dfffc](https://i.gyazo.com/4a568d286717b4d8a0465410fe0dfffc.gif)](https://gyazo.com/4a568d286717b4d8a0465410fe0dfffc)

[![https://gyazo.com/d1c96efa60230fb28c013a754b29b5b4](https://i.gyazo.com/d1c96efa60230fb28c013a754b29b5b4.gif)](https://gyazo.com/d1c96efa60230fb28c013a754b29b5b4)

[![https://gyazo.com/edf7d2d19da6ea8a5e85a24acb7c3bdc](https://i.gyazo.com/edf7d2d19da6ea8a5e85a24acb7c3bdc.png)](https://gyazo.com/edf7d2d19da6ea8a5e85a24acb7c3bdc)

<iframe width="420" height="315" src="https://www.youtube.com/embed/pzbi8bAViTU" frameborder="0" allowfullscreen></iframe><br />

<iframe width="420" height="315" src="https://www.youtube.com/embed/oSs9FOHGp6w" frameborder="0" allowfullscreen></iframe><br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/rkQKnlTvk6A?rel=0" frameborder="0" allowfullscreen></iframe>

{% include programming_1/reference.html %}