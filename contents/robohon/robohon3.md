---
layout: page
title: "QRコードの読み取り"
top_link: false
image: "https://i.gyazo.com/52ce7ebbce4cb3079c55c9dce75ece7f.png"
---

[![https://gyazo.com/52ce7ebbce4cb3079c55c9dce75ece7f](https://i.gyazo.com/52ce7ebbce4cb3079c55c9dce75ece7f.png)](https://gyazo.com/52ce7ebbce4cb3079c55c9dce75ece7f)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ロボホンのカメラ

ロボホンの開発キット[RoBoHoN Software Development Kit](https://robohon.com/)に
同梱されているカメラ用のアプリ **SampleCamera** を基に**QRコード**の読み取り機能を実装します。
QRコードの読み取りには、オープンソースとして提供されている[ZXing](https://github.com/zxing/zxing)を採用します。
ちなみに、 **ZXing** の名称は **Zebra Crossing** が基になっているようです。
**ZXing** の実装方法は**NAVERまとめ**の記事「[Java QRコード読み取り](https://matome.naver.jp/odai/2145682262481163101)」を参考にし、
ライブラリは[Maven Repository](http://mvnrepository.com/)からダウンロードしたJARファイルを利用します。
現時点での最新バージョンは **3.3.0** です（2017年9月20日現在）。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">カメラの利用

まずは、**SampleCamera** のプロジェクトを **Android Studio** で開き確認しましょう。
**MainActivity.java**がこのサンプルの中心となるソースファイルです。

ロボホンのカメラを利用した撮影には、静止画、動画、また、顔認識の有無などの設定が可能です。
ここでは、**写真撮影 顔認識無ボタン** の挙動にQRコードの読み取り機能を加えます。
下記が該当部分のソースコードです。
背面のモニタにある*cameraButton*をタップすると、**getIntentForPhoto** メソッドの
返り値（**Intent** クラスのインスタンス）が、**sendBroadcast** メソッドで通知される処理となっていることが分かります。

{% gist naoto-github/201f378a6a88f23fccb77ea794118344 %}

次に、**getIntentForPhoto** メソッドを確認します。
ここで、登場する **ShootMediaUtil** クラスが重要な役割を担います。
**Intent** クラスのコンストラクタの引数には静止画撮影用のアクション名である**ShotMediaUtil.ACTION_SHOOT_IMAGE**を指定します。
また、アクション（撮影）終了後の結果通知を得るために、**putExtra**メソッドで **ShotMediaUtil.EXTRA_REPLYTO_ACTION**を指定し、
**ACTION_RESULT_TAKE_PICTURE** をその返り値としています。
このインテントを **sendBroadcast** で通知することで、カメラの撮影機能が実行されます。

{% gist naoto-github/10164807bbfd6bb5992831955ddd19ba %}

カメラの撮影後には、結果通知として **ACTION_RESULT_TAKE_PICTURE** を **CameraResultReceiver** クラスの
**onReceive** メソッドで受け取ります。
ここでは、**ACTION_RESULT_TAKE_PICTURE** に該当するコードのみを抜き出してみます。
撮影が成功していれば、インテントから **ShootMediaUtil.RESULT_OK** を受け取り、
保存した画像ファイルのパスを取得します。
取得されたパスは、リソースIDを利用して、ロボホンの背面の **TextView** に表示されます。

{% gist naoto-github/a6870d60db525b87b27ea7c88ccd62dd %}

このプログラムを実行した様子は下記です。

<iframe width="560" height="315" src="https://www.youtube.com/embed/H7ZqVu46Tnk?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">QRコード読み取りの実装

最初にダウンロードしたZXingのライブラリ（**core** と **javase**）をプロジェクトにインポートします。
[File]-[Project Structure]-[app]-[Dependencies]を選択し、
該当するJARファイル（ここでは **zxing-core-3.3.0.jar** と **zxing-javase-3.3.0.jar**）を追加します。

[![https://gyazo.com/5822a111adc0ce68b9505fcb4b866e0e](https://i.gyazo.com/5822a111adc0ce68b9505fcb4b866e0e.png)](https://gyazo.com/5822a111adc0ce68b9505fcb4b866e0e)

加えてマニフェストファイルにも修正が必要です。
**AndroidManifest.xml**にファイルの読み取り権限の許可を与える下記のタグを追加してください。

    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

一般にQRコードを読み取るときは、カメラの映像を確認しながら、画面に写っているQRコードを認識させます。
しかし、現在のロボホンのSDKでは、撮影時の挙動に介在できないため、保存された画像ファイルに写っているQRコードを読み取ることにします。
それでは、撮影後のコードを下記のように書き換えます。

最初に撮影した画像ファイル（JPG形式）を **Bitmap** クラスで読み込みます。
これをピクセルのARGB成分の配列に変換し、配列*pixels*に代入します。

次に、配列*pixels*を基に、2値画像の **BinaryBitmap**クラスに変換し、
これを **QRCodeReader** クラスの **decode**メソッドに引数として渡します。
読み取った結果は **Result** クラスに代入され、
QRコードを変換した文字列は **getText**メソッドで取得することが可能となります。

この文字列を *mSpeachText* に代入することで、
ACCOSTを利用してロボホンに発話をさせることが出来ます。

{% gist naoto-github/de0ae4282f7944e2ceb5222cf514fe03 %}

それでは、プログラムを実行してみます。
今回は「むかいせんせい」という文字列から生成した下記のQRコードを読み取ることにします。
読み取りに成功するとロボホンは「認識した結果は むかいせんせい だよ」と発話します。

[![https://gyazo.com/bc395c563d0375b86b3bc3812dc8990e](https://i.gyazo.com/bc395c563d0375b86b3bc3812dc8990e.png)](https://gyazo.com/bc395c563d0375b86b3bc3812dc8990e)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cw5MsB41zjM?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

何度か試してみましたが、静止画を対象としているためか、認識精度が非常に低いです（５回に１回が良いところ）。
また、認識にかかる時間も決して短くはなく、残念ながら現状では使い物にならないという印象です。
改善出来る方法があれば誰か教えて頂きたいです。

{% include robohon/reference.html %}

