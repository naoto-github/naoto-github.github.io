---
layout: page
title: "NyARToolkit for Unityで画像を表示"
top_link: false
image: "https://i.gyazo.com/f6c58bee65721d185c566a05eaa41920.png"
---

[![https://gyazo.com/eb9f233ddaeb4f26ee648f21e330e755](https://i.gyazo.com/eb9f233ddaeb4f26ee648f21e330e755.png)](https://gyazo.com/eb9f233ddaeb4f26ee648f21e330e755)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">画像の準備

**[NyARToolkit](http://nyatla.jp/nyartoolkit/wp/)**のパッケージに含まれる
サンプル**SimpleLite**はマーカーを検出すると赤色の立方体（Cube）を表示するプログラムです。
この**SimpleLite**を修正し、一般的なJPGやPNGなどの画像を立体的に表示できるよう改良します。

**SimpleLite**フォルダをコピーし、フォルダに含まれるC#スクリプトを**ARPictureCamera**、
シーンを**ARPictureScene**にファイル名を変更した状態を前提とします
（詳細は[NyARToolkit for Unityの導入](artoolkit.html)を参照）。

立方体の代わりに表示する犬の画像（[001.png](https://i.gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8.png)）は下記です。
この画像は、[テンプレートBANK](http://www.templatebank.com/index.htm)を参考に、本学の学生が作成しました。
画像サイズは**300x300**ピクセル、画像フォーマットは透過背景のPNGです。

[![https://gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8](https://i.gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8.png)](https://gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8)

まずは、新規にanimalsフォルダを作成し、上記の画像をコピーしておきます。
対象のフォルダには、C#スクリプトの**ARPictureCamera**、シーンの**ARPictureScene**、
画像フォルダの**animals**が含まれる状態になっていることを確認してください。

[![https://gyazo.com/9a1f482995720f6a71cbf20c9df892af](https://i.gyazo.com/9a1f482995720f6a71cbf20c9df892af.png)](https://gyazo.com/9a1f482995720f6a71cbf20c9df892af)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">テクスチャの利用

立方体（Cube）に犬の画像（[001.png](https://i.gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8.png)）をテクスチャとして貼り付けることで、
マーカーを検出すると**犬の画像**を立体的（マーカーから少し浮いた状態）に表示してみます。

まずは、Assetsフォルダで[Create]-[Materials]を選択し、新規にマテリアルを作成します。
マテリアルの名前は**Dog**に変更しておきます。
画像フォーマットが透過背景であることから、Inspectorで**Shader**を**Unit/Transparent**に設定します。
**Unit/Transparent**はテクスチャ画像のアルファ値を反映して透過にすることが可能なシェーダーです。
次に、Textureを**犬の画像**に変更します
これで、オブジェクトに設定するマテリアルが準備できました。

[![https://gyazo.com/955b8afe1acafd49199da3e6419b2454](https://i.gyazo.com/955b8afe1acafd49199da3e6419b2454.png)](https://gyazo.com/955b8afe1acafd49199da3e6419b2454)

[![https://gyazo.com/8803d04b407a6981c3581f6186332bc6](https://i.gyazo.com/8803d04b407a6981c3581f6186332bc6.png)](https://gyazo.com/8803d04b407a6981c3581f6186332bc6)

次に、シーンの**ARPictureScene**をダブルクリックします。
ここで、Hierarchyから[Create]-[3D Object]-[Cube]を選択し、新規に立方体（Cube）のオブジェクトを作成します。
オブジェクトの名前は**DogObject**に変更しておきます。
このDogObjectをドラッグして、MarkerObjectの直下に配置します。
このとき、デフォルトで設定されている、Cubeオブジェクトは削除しておきます。

DogObjectのInspectorから、オブジェクトの**位置（Position）**や**サイズ（Scale）**を修正します。
位置はX=0、Y=0、Z=20とし、サイズはX=80、Y=80、Z=0とします（Z=0とすることで幅がなくなり平面となります）。

[![https://gyazo.com/fd5d0e973bb745a680b5a478e4a67ebc](https://i.gyazo.com/fd5d0e973bb745a680b5a478e4a67ebc.png)](https://gyazo.com/fd5d0e973bb745a680b5a478e4a67ebc)

最後に、DogObjectのMaterialsをクリックして、作成した**Dog**を選択しておきます。
**再生ボタン**をクリックすると、犬の画像（[001.png](https://i.gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8.png)）が表示されることを確認してください。
テクスチャ画像が上下反対に張り付けられる場合は、
**Tiling**のYの値を**-1**に変更します（Direct3DかOpenGLで振る舞いが異なるようです）。

[![https://gyazo.com/18bd19ecb1af79004b6e0a631bf3abf4](https://i.gyazo.com/18bd19ecb1af79004b6e0a631bf3abf4.png)](https://gyazo.com/18bd19ecb1af79004b6e0a631bf3abf4)

[![https://gyazo.com/4279257efa34be9c112afbb3b7d26549](https://i.gyazo.com/4279257efa34be9c112afbb3b7d26549.png)](https://gyazo.com/4279257efa34be9c112afbb3b7d26549)

次回は画像の代わりに**3Dオブジェクト**を表示することにに挑戦してみます。

{% include unity/reference.html %}