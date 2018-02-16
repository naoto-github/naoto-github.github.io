---
layout: page
title: "Google VR SDKを利用した360°画像ビューアー"
top_link: false
image: "https://i.gyazo.com/adf9cd1b07e2aab6bd9365cd25b33a5a.png"
---

[![https://gyazo.com/adf9cd1b07e2aab6bd9365cd25b33a5a](https://i.gyazo.com/adf9cd1b07e2aab6bd9365cd25b33a5a.png)](https://gyazo.com/adf9cd1b07e2aab6bd9365cd25b33a5a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Google VR SDK for Unity

近年、VR(Virtual Reality)に関する技術は目覚ましいスピードで発展しています。
Oculus社が開発する「[Oculus Rift](https://www.oculus.com/rift/)」、
SCE(Sony Computer Entertainment)の「[PlayStation VR](http://www.jp.playstation.com/psvr/)」など、
本格的なVRのためのヘッドマウントディスプレイも手に入れることができます。
しかし、これらの製品はまだまだ高価であり、気軽に導入することは難しいです。
このような状況のなか、Googleは、スマートフォンを組み合わせて利用する、
ダンボール製の安価な「[Cardboard](https://vr.google.com/intl/ja_jp/cardboard/)」というヘッドマウントディスプレイを提供しています。
同時に、Googleは、「[Google VR](https://vr.google.com/intl/ja_jp/)」という、
VRに関するプロジェクトを立ち上げ、開発者向けのツールも提供しています。
そこで、今回は、ゲームエンジンの一つである[Unity](http://japan.unity3d.com/)で、
Cardboard向けVRを開発可能な「[Google VR SDK for Unity](https://developers.google.com/vr/unity/)」を利用したアプリを制作してみます。
また、VR環境には、リコーが開発する「[RICHO THETA S](https://theta360.com/ja/)」で撮影した360°画像（全天球画像）を用い、
ヘッドセットの動きに合わせて、360°画像を閲覧できるようにします。
開発に当たり、SlideShareで公開されているOculus Rift勉強会の資料
[THETAでモバイルVRコンテンツ開発](https://www.slideshare.net/noshipu/thetavr)を参考にさせて頂きました。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">準備

アプリの開発に当たり下記の機器を利用します。
ヘッドマウントディスプレイにはCardboardではなく、
サンワサプライが販売している「[VR SHINECON](https://direct.sanwa.co.jp/ItemPage/400-MEDIVR3)」を利用します。
ヘッドホンが搭載されており、Cardboardに比べると高級感があるモデルです。

また、360°画像（全天球画像）の撮影には[RICHO THETA S](https://theta360.com/ja/)を採用します。
静止画・動画に対応しており、動画のライブストリーミングも可能なモデルです。

- [VR SHINECON](https://direct.sanwa.co.jp/ItemPage/400-MEDIVR3)
- [RICHO THETA S](https://theta360.com/ja/)

下記がRICHO THETA Sで撮影したサンプル画像です。
マウスを使って画像をスクロールすると、教室に一人で寂しそうに立っている向の姿が見えるはずです。
ここでは、ウェブで360°画像を表示するために「[VR view on the web](https://github.com/googlevr/vrview)」を利用しています。
また、RICHO THETA Sで撮影された画像の解像度は**5376x2688**ですが、VR viewに最適な**4096x2048**に変換してあります。

<iframe width="100%" height="400" src="//storage.googleapis.com/vrview/index.html?image=http://mukai-lab.info/contents/unity/img/sample-4096x2048.jpg"></iframe>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの作成

**Unity**でプロジェクトを作成します。
Unityのバージョンは**5.6.0**です。
ここでは、プロジェクト名を「**Panorama Viewer**」としています。
また、ゲーム環境は「**3D**」を選択しておきます。

[![https://gyazo.com/a9246420ada1b88940bb67477bc0b5f4](https://i.gyazo.com/a9246420ada1b88940bb67477bc0b5f4.png)](https://gyazo.com/a9246420ada1b88940bb67477bc0b5f4)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Sphereオブジェクトの設定

360°画像を投影するためのSphereオブジェクトを導入します。
ここでは、UnityのデフォルトのSphereオブジェクトではなく、[@warapuri](http://warapuri.com/post/131599525953/unity%E3%81%A8oculus%E3%81%A7360%E5%BA%A6%E3%83%91%E3%83%8E%E3%83%A9%E3%83%9E%E5%85%A8%E5%A4%A9%E5%91%A8%E5%8B%95%E7%94%BB%E3%82%92%E8%A6%8B%E3%82%8B%E6%96%B9%E6%B3%95%E7%84%A1%E6%96%99%E7%B7%A8)氏が提供している天球モデル「[Sphere100.fbx](Sphere100.fbx)」を利用させてもらいます。
Unityで**Sphere100.fbx**を利用するには、[Assets]-[Import New Asset]をクリックし、該当の3Dモデルファイルを選択します。

導入されたShere100オブジェクトのマテリアルが**phong1**です。
このマテリアルに撮影した360°画像を貼り付けます。
まずは、対象の360°画像をアセットとして読み込みます。
手順は、**Sphere100.fbx**のときと同じで、
【Assets】-【Import Net Asset】をクリックし、
該当の画像ファイル（**sample-4096x2048.jpg**）を選択します。
次に、phong1のインスペクターから、**Shader** を「**Unit/Texture**」に変更します。
このとき、テクスチャー画像を、先ほど読み込んだ**sample-4096x2048.jpg**に設定します。

[![https://gyazo.com/7af89d1e12deb896aadfe2e7d3c1bbbc](https://i.gyazo.com/7af89d1e12deb896aadfe2e7d3c1bbbc.png)](https://gyazo.com/7af89d1e12deb896aadfe2e7d3c1bbbc)

それでは、Sphere100オブジェクトをシーンに加えます。
AssetsにあるSphere100オブジェクトをヒエラルキーにドラッグ＆ドロップします。
ここで、Sphere100オブジェクトのインスペクターから、**Scale** の値を、 **x=-100**、**y=100**、**z=100** に設定しておきます。
すると、360°画像をテクスチャーとした、球状の3Dオブジェクトが表示されます。

[![https://gyazo.com/2e64e90a3480e37749c2e920cfe5bc64](https://i.gyazo.com/2e64e90a3480e37749c2e920cfe5bc64.png)](https://gyazo.com/2e64e90a3480e37749c2e920cfe5bc64)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">カメラの設定

**Google VR SDK for Unity**を利用して、カメラをVRに対応させます。
まずは、[Google VR](https://developers.google.com/vr/)のサイトから、
Unity用のパッケージである**GoogleVRForUnity.unitypackage**をダウンロードします。
Unityで**GoogleVRForUnity.unitypackage**を利用するには、
[Assets]-[Inport New Package]をクリックし、該当のパッケージファイルを選択します。
パッケージに含まれるファイルがAssetsに展開されます。

次に、ヒエラルキーで右クリックして、**Create Empty** を選択し、**空のオブジェクト** を作成します。
ここで、 **空のオブジェクト** の名前を **VR Camera** に変更しておきます。
この**VR Camera**の直下に、**Main Camera** と **GvrEditorEmulator** を配置します。
**GvrEditorEmulator**は、[Assets]-[GoogleVR]-[Prefabs]にあり、これをヒエラルキーにドラッグ＆ドロップします（以前は**GvrViewerMain**でした）。
オブジェクトの配置関係は下記のようになります。

[![https://gyazo.com/abdaf9ec6e61907fac2641181e52d0c6](https://i.gyazo.com/abdaf9ec6e61907fac2641181e52d0c6.png)](https://gyazo.com/abdaf9ec6e61907fac2641181e52d0c6)

それでは、シーンを再生してみましょう。
このとき、キーボードの**Altキー**を押しながら、マウスカーソルを動かすことで、
ヘッドマウントディスプレイの上下左右の動きをシミュレートすることができます。
（傾きをシミュレートするには**Ctrlキー**を押します）

[![https://gyazo.com/17a3b4995be75262e1bea164fcc796a2](https://i.gyazo.com/17a3b4995be75262e1bea164fcc796a2.gif)](https://gyazo.com/17a3b4995be75262e1bea164fcc796a2)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">アプリのビルド

構築したシーンをアプリとしてビルドしましょう。
ここでは、Android端末向けにビルドすることを前提とします。
まずは、[File]-[Build Setting]を選択して、Platformを**Android**に変更します。

[![https://gyazo.com/792c59a4ee9232739043be5b637d2df6](https://i.gyazo.com/792c59a4ee9232739043be5b637d2df6.png)](https://gyazo.com/792c59a4ee9232739043be5b637d2df6)

続けて、**Player Setting**をクリックして、インスペクターを開きます。
ここで、**Virtual Reality Supprted** にチェックを入れ、**Virtual Reality SDKs** に **Cardboard** を指定しておきます。
Cardboardの動作を保証するために、**Minimum API Level**も調整しておきます（ここでは **Android 6.0** としました）。
このほか、**Company Name**、**Product Name**、**Package Name** などを入力しておきます。

[![https://gyazo.com/d1900ce8c0b38ba48301f2ff70cdfddc](https://i.gyazo.com/d1900ce8c0b38ba48301f2ff70cdfddc.png)](https://gyazo.com/d1900ce8c0b38ba48301f2ff70cdfddc)

これで、全ての準備が整いました。
**Build and Run**をクリックして、Android端末でアプリを実行してみましょう。
成功すれば下記のように左右の画面に分かれてシーンが表示されます。
Android端末の向きに追従して、360°画像が表示されるはずです。

[![https://gyazo.com/1c689c2b597e8d9264907f6b9c01d47d](https://i.gyazo.com/1c689c2b597e8d9264907f6b9c01d47d.jpg)](https://gyazo.com/1c689c2b597e8d9264907f6b9c01d47d)

この状態でAndroid端末を**VR SHINECON**に設置すれば、
360°画像のビューアーの完成です。

{% include unity/reference.html %}