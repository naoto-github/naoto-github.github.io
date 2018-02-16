---
layout: page
title: "NyARToolkit for Unityの導入"
top_link: false
image: "https://i.gyazo.com/2e5257b7d23188715fea274c2d50aaf9.png"
---

[![https://gyazo.com/2e5257b7d23188715fea274c2d50aaf9](https://i.gyazo.com/2e5257b7d23188715fea274c2d50aaf9.png)](https://gyazo.com/2e5257b7d23188715fea274c2d50aaf9)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">NYARtoolkitとは

**ARToolkit**をベースに開発された拡張現実ライブラリが**[NyARToolkit](http://nyatla.jp/nyartoolkit/wp/)**です。
ゲーム開発環境である**[Unity](http://japan.unity3d.com/)**で利用可能な**[NyARToolkit for Unity](http://nyatla.jp/nyartoolkit/wp/?page_id=556)**の導入方法を紹介します。
ここでは、**Unity**のバージョンは**5.3.5**、**NyARToolkit for Unity** **のバージョンは**5.0.8**を対象とします。
また、NyARToolkitのライセンスは**LGPLv3**となっています（商用ライセンスもあるようです）。
このライセンスは、「著作権の表示」を条件に、商用利用や配布が認められています（詳細は[Wikipedia](https://ja.wikipedia.org/wiki/GNU_Lesser_General_Public_License)を参照）。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの作成

Unityで新しいプロジェクトを作成します。
ここでは、プロジェクト名を「**ARPictureBook**」としています。
また、ゲーム環境は「**3D**」を選択しておきます。

[![https://gyazo.com/9ae7841a8b5e60e29fa188d720233a19](https://i.gyazo.com/9ae7841a8b5e60e29fa188d720233a19.png)](https://gyazo.com/9ae7841a8b5e60e29fa188d720233a19)

次に、「NyARToolkit for Unity」のパッケージをインストールします。
パッケージは下記URLからダウンロードできます。

[https://github.com/nyatla/NyARToolkitUnity/releases](https://github.com/nyatla/NyARToolkitUnity/releases)

ツールバーから[Assets]-[Import package]-[Custom package]をクリックして、
ダウンロードしたパッケージを選択します。
ファイルの読込み後に、ダイアログが表示されたら、
全てのファイルにチェックを入れた状態で**import**をクリックしましょう。

[![https://gyazo.com/41c82ec0e5615956d15ab370e89d9df6](https://i.gyazo.com/41c82ec0e5615956d15ab370e89d9df6.png)](https://gyazo.com/41c82ec0e5615956d15ab370e89d9df6)

ファイルの取り込みが終わると、プロジェクトのAssetsには6つのフォルダが展開されます。
Assetとは、ゲームを構成する最小の構成単位のことです。
例えば、シーン、キャラクター、画像ファイル、音楽ファイルなどもAssetです。
ここでは、sampleフォルダに含まれる**SimpleLite**を試しに実行してみましょう。

[![https://gyazo.com/437a91006f9cd595dfa6858abea68a7f](https://i.gyazo.com/437a91006f9cd595dfa6858abea68a7f.png)](https://gyazo.com/437a91006f9cd595dfa6858abea68a7f)

**SimpleLite**を実行する前に下記の準備が必要です。
ウェブカメラは標準的なモノであれば問題ないと思われます。
また、マーカーはパッケージに付属している**MarkerHiro.png**を利用しますが、
NyARToolkit用のマーカーは、**tarotaroorg**氏が公開している
[オンラインのツール](http://flash.tarotaro.org/blog/2009/07/12/mgo2/)を利用して、自由に作成することも可能です。

- ウェブカメラ（[CMS-V30SETBK](https://www.sanwa.co.jp/product/syohin.asp?code=CMS-V30SETBK&cate=1)を使用）
- マーカーが印刷された紙（resourceフォルダに含まれる**MarkerHiro.png**を印刷します）

[![https://gyazo.com/db1012d7fb080f08837227f061cf9e59](https://i.gyazo.com/db1012d7fb080f08837227f061cf9e59.png)](https://gyazo.com/db1012d7fb080f08837227f061cf9e59)

準備が整ったら、画面上部にある**再生ボタン**をクリックします。
すると、ゲーム画面にカメラ映像が映し出されます。
このカメラにマーカーを印刷した紙を映すと、マーカー上に赤色の立方体（Cube）表示されることを確認してください。
これが、**拡張現実**と呼ばれる技術です。

[![https://gyazo.com/7689ddc54a3e6082d72b735f9615d670](https://i.gyazo.com/7689ddc54a3e6082d72b735f9615d670.png)](https://gyazo.com/7689ddc54a3e6082d72b735f9615d670)

[![https://gyazo.com/bc2e0ab988e7cd96ef7187864f8105e6](https://i.gyazo.com/bc2e0ab988e7cd96ef7187864f8105e6.png)](https://gyazo.com/bc2e0ab988e7cd96ef7187864f8105e6)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">フォルダのコピー

Assetsフォルダに新規フォルダを作成し、SimpleLiteのフォルダに含まれる２つのファイルをコピーします（**ARCameraBehavior**はC#のスクリプト、**simpleLite**はシーンと呼ばれるファイルです）。
ここでは、C#スクリプトを**ARPictureCamera**、シーンを**ARPictureScene**にファイル名を変更しておきます。
次に、**ARPictureScene**をダブルクリックし、Hierarchyの**Camera**をクリックします。
シーンに関連付けられたコンポーネントが表示されているので、
**ARCameraBehavior**を削除（**Remove Component**）します。
さらに、**Add Component**をクリックし、コピーした**ARPictureCamera**を選択しておきます。
これで、**ARPictureCamera**に記述したスクリプトが、**ARPictureScene**に関連付けられます。


[![https://gyazo.com/c76c89590c52f16a808bb631bc4f078f](https://i.gyazo.com/c76c89590c52f16a808bb631bc4f078f.png)](https://gyazo.com/c76c89590c52f16a808bb631bc4f078f)

[![https://gyazo.com/bd71e3bde3b27e733bdc02e20cbad63a](https://i.gyazo.com/bd71e3bde3b27e733bdc02e20cbad63a.png)](https://gyazo.com/bd71e3bde3b27e733bdc02e20cbad63a)

しかし、このままでは**ARPictureCamera**がエラーとなり実行できません。
これは、変更したファイル名とスクリプトのクラス名が一致しないことが原因です。
そこで、**ARPictureCamera**のソースコードを表示し、
クラス宣言部にあるクラス名を、**ARCameraBehavior**から**ARPictureCamera**に修正し、エラーを取り除きましょう。
最後に、**再生ボタン**をクリックして、SimpleLiteと同様の実行結果になることを確認してください。

	public class ARPictureCamera: MonoBehaviour

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">NyIDマーカー

NyARToolkitでは、JPGやPNGなどの一般的な画像以外にも、**[NyIDマーカー](http://sixwish.jp/AR/Marker/idMarker/)**と呼ばれるマーカーを利用することができます。
NyIDマーカーはMODEL2とMODEL3の２種類有りますが、ここではMODEL2の1番のマーカーを利用してみます。

[![https://gyazo.com/9dbf5709c05d9131793f092f19eb085a](https://i.gyazo.com/9dbf5709c05d9131793f092f19eb085a.png)](https://gyazo.com/9dbf5709c05d9131793f092f19eb085a)

**ARPictureCamera**をクリックして、ソースコードを表示します。
デフォルトでは、Resroucesフォルダに含まれる"MarkerHiro.png"を、検出するマーカーとして設定しています。
ソースコードを確認すると、**addARMaker()**メソッドの引数として"MarkerHiro"が設定されていることが分かります。

	mid=this._ms.addARMarker((Texture2D)(Resources.Load("MarkerHiro", typeof(Texture2D))),16,25,80);

そこで、上記のコードをコメントアウトし、下記のコードに置き換えます。
NyIDマーカーを利用するには、**addNyIdMarker()**メソッドを利用して、
引数にマーカーの番号と、マーカーの物理サイズをmm単位で指定します。
ここでは、マーカーの番号は**1**、マーカーの物理サイズは**80[mm]**としています。
**再生ボタン**をクリックして、SimpleLiteと同様の実行結果になることを確認してください。

    mid = this._ms.addNyIdMarker(1, 80);

[![https://gyazo.com/648918e161ae1f0c13cfaf045845fd1f](https://i.gyazo.com/648918e161ae1f0c13cfaf045845fd1f.png)](https://gyazo.com/648918e161ae1f0c13cfaf045845fd1f)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">球体（Sphere）オブジェクトの表示

デフォルトでは、マーカーが検出されると**赤色の立方体（Cube）**が表示されます。
これを、**青色の球体（Sphere）**に変更してみましょう。
Hierarchyで、[Create]-[3D Object]-[Sphere]を選択すると、新しいSphereオブジェクトが作成されます。
このSphereオブジェクトをドラッグして、MarkerObjectの直下に配置します。
このとき、デフォルトで設定されている、Cubeオブジェクトは削除しておきます。
**再生ボタン**をクリックすると、球体がマーカー上に表示されることを確認してください。

[![https://gyazo.com/e51508abab2945d56d01b07570934b6d](https://i.gyazo.com/e51508abab2945d56d01b07570934b6d.png)](https://gyazo.com/e51508abab2945d56d01b07570934b6d)

次に、球体に色や質感を与えてみましょう。
Assetsフォルダで、[Create]-[Material]を選択し、新規にマテリアルを作成します。
このマテリアルの名前を**Blue**に変更しておきます。
また、Inspectorから**Albedo**を選択し、マテリアルの色を青系に変えましょう（**Albedo**は太陽光を反射する割合のことだそうです）。

[![https://gyazo.com/cfbb905b17d5d87c7ffac15ee90bfc62](https://i.gyazo.com/cfbb905b17d5d87c7ffac15ee90bfc62.png)](https://gyazo.com/cfbb905b17d5d87c7ffac15ee90bfc62)

次に、SphereオブジェクトのMaterialsをクリックして、作成した**Blue**を選択しておきます。
**再生ボタン**をクリックすると、青色の球体がマーカー上に表示されることを確認してください。

[![https://gyazo.com/2466ea3a6aa95e741d6b227dd36abde9](https://i.gyazo.com/2466ea3a6aa95e741d6b227dd36abde9.png)](https://gyazo.com/2466ea3a6aa95e741d6b227dd36abde9)

[![https://gyazo.com/fb0e0e8b4ef3e3dbf0a9f2116f6fb5a4](https://i.gyazo.com/fb0e0e8b4ef3e3dbf0a9f2116f6fb5a4.png)](https://gyazo.com/fb0e0e8b4ef3e3dbf0a9f2116f6fb5a4)

UnityにNyARToolkitを導入する方法の説明は以上です。
次回は**テクスチャを利用した画像の表示**や、**3Dオブジェクトの表示**に挑戦してみます。

{% include unity/reference.html %}