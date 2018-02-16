---
layout: page
title: "カメラ映像の表示"
permalink: /class/programming_1/chapter10.html
top_link: false
image: "https://i.gyazo.com/edffebcb2d7e3c361509dab7b6f2b8bb.png"
---
[![https://gyazo.com/edffebcb2d7e3c361509dab7b6f2b8bb](https://i.gyazo.com/edffebcb2d7e3c361509dab7b6f2b8bb.png)](https://gyazo.com/edffebcb2d7e3c361509dab7b6f2b8bb)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project10」を入力し、[保存]をクリックしましょう。
保存先に「Project10」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/a998688ddfc325db6e1d20982c4c1b36](https://i.gyazo.com/a998688ddfc325db6e1d20982c4c1b36.png)](https://gyazo.com/a998688ddfc325db6e1d20982c4c1b36)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Videoライブラリの導入

Processingでは**Videoライブラリ**を導入することで、
カメラからの映像をウィンドウに表示することができるようになります。
まずは、メニューから[スケッチ]-[ライブラリをインポート]-[ライブラリを追加]をクリックして、
「Contribution Manager」を開きます。
ここで、**video**をキーワードに検索すると、
「**Video|GStreamer-based video library for Processing**」が表示されるので、
このライブラリを選択してインストールしましょう。

[![https://gyazo.com/5ea11e24d42f92a343a2d51499018eeb](https://i.gyazo.com/5ea11e24d42f92a343a2d51499018eeb.png)](https://gyazo.com/5ea11e24d42f92a343a2d51499018eeb)

次に、[スケッチ]-[ライブラリをインポート]-[Video]をクリックして、
Videoライブラリをインポート（プログラムで利用可能な状態にすること）します。
ソースコードの１行目に「**import processing.video.*;**」と表示されていることを確認してください。

{% gist naoto-github/461200e7f5f3d08be8b0a4a30ba6daeb %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">カメラ映像の表示

カメラから入力した映像は**Capture**クラスを利用します。
まずは、**setup()**関数において、**Capture**クラスの**list()**関数を呼び出し、
利用可能なカメラの一覧を**String**型の配列で取得します。
これをコンソールに出力し、利用可能なカメラの種類を確認してください。

{% gist naoto-github/92ba7be251dc415f8268bfae16a1538b %}

例えば、コンソールには下記のような一覧が表示されます。
この中から、**サイズ（size）**が**320x240**となっているカメラ番号を覚えておいてください。
この例では、**3**番が該当します。
ウィンドウのサイズも**320x240**に合わせます。
ちなみに、**フレームレート（fps）**は、1秒間に更新される画像（フレーム）数を意味しています。
つまり、フレームレートが高いほど、滑らかな動画となります。

    [0] name=FULL HD 1080P Webcam,size=640x480,fps=30
    [1] name=FULL HD 1080P Webcam,size=160x120,fps=30
    [2] name=FULL HD 1080P Webcam,size=176x144,fps=30
    [3] name=FULL HD 1080P Webcam,size=320x240,fps=30
    [4] name=FULL HD 1080P Webcam,size=352x288,fps=30
    [5] name=FULL HD 1080P Webcam,size=640x360,fps=30
    [6] name=FULL HD 1080P Webcam,size=800x600,fps=30
    [7] name=FULL HD 1080P Webcam,size=960x720,fps=30
    [8] name=FULL HD 1080P Webcam,size=1024x576,fps=30
    [9] name=FULL HD 1080P Webcam,size=1280x720,fps=30

次に、**Capture**クラスのインスタンス*cam*を下記のように初期化します。
引数には先程確認したカメラ番号を指定することに注意してください。
`start()`関数を呼び出すことで、カメラ映像の取得を開始します。

	cam = new Capture(this, cameras[3]);
	cam.start();

下記のコードを参考に、カメラ映像をウィンドウに表示してみましょう。
`draw()`関数では、カメラが利用可能な状態であることを確認してから、
`read()`関数で現在のフレーム（画像）を取得しています。
Runボタンをクリックすると、ウィンドウにカメラ映像が表示されることを確認してください。

{% gist naoto-github/098a6e59500c3836ffbc083680f2ef0b %}

[![https://gyazo.com/ced8da66a6be46e25b6120a8d3067902](https://i.gyazo.com/ced8da66a6be46e25b6120a8d3067902.gif)](https://gyazo.com/ced8da66a6be46e25b6120a8d3067902)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">リアルタイム画像処理

`draw())`関数で`filter()`関数を呼び出して、
表示されている映像に様々な効果を与えてみましょう。
ここでは、**２値化（THRESHOLD）**、**グレースケール（GRAY）**、
**ネガポジ反転（INVERT）**を試してみます。

**２値化（THRESHOLD）**を適用してみましょう。
２値化とは黒または白の２色で画像を表示する方法です。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
映像が２値化されていることを確認してください。

{% gist naoto-github/5ce77161999c7c730cc08c4642c47eef %}

[![https://gyazo.com/55a440c86f305b76dedd266a1fac1067](https://i.gyazo.com/55a440c86f305b76dedd266a1fac1067.gif)](https://gyazo.com/55a440c86f305b76dedd266a1fac1067)

**グレースケール（GRAY）**を適用してみましょう。
グレースケールとはモノクロで画像を表示する方法です。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
映像がグレースケールになっていることを確認してください。

{% gist naoto-github/9d511d3874b0047652f069a9a0f4c10d %}

[![https://gyazo.com/71cc062732ba08a84e51f4851231d1d6](https://i.gyazo.com/71cc062732ba08a84e51f4851231d1d6.gif)](https://gyazo.com/71cc062732ba08a84e51f4851231d1d6)

**ネガポジ反転（INVERT）**を適用してみましょう。
ネガポジ反転とは色相が正反対の補色で画像を表示する方法です。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
映像がネガポジ反転になっていることを確認してください。

{% gist naoto-github/ca56f6fc969d3e511adadd238191fa15 %}

[![https://gyazo.com/c7e70a238362f8bb11518f7ddc3d91c1](https://i.gyazo.com/c7e70a238362f8bb11518f7ddc3d91c1.gif)](https://gyazo.com/c7e70a238362f8bb11518f7ddc3d91c1)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

下記コードを参考に**背景差分**に挑戦しましょう。
背景差分とは、「事前に取得しておいた画像」と「現在の画像」を比較することで、
「事前に取得した画像」とは異なる画素を抽出する処理のことです。
まず、ウィンドウ内でマウスをクリックしたときに背景用の画像を取得し、変数*bg*に代入します。
変数*bg*が空（null）でなければ、カメラ映像と背景画像の**モノクロ成分（輝度）の差**を計算し、
その差が**閾値30**を超える場合は、画素を赤色に設定します。

課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project10-日付a.zip」というファイルが作成されていることを確認してください。

{% gist naoto-github/c42a1c7a563b8a70f9706bf6f01626fc %}

[![https://gyazo.com/2f4b6156a8f70a7c41c114c003999b9c](https://i.gyazo.com/2f4b6156a8f70a7c41c114c003999b9c.gif)](https://gyazo.com/2f4b6156a8f70a7c41c114c003999b9c)

{% include programming_1/reference.html %}