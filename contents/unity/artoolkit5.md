---
layout: page
title: "NyARToolkit for UnityでNFTを利用したマーカーの認識"
top_link: false
image: "https://i.gyazo.com/399be0179fc2bc72d21c82d597d18d35.png"
---

[![https://gyazo.com/399be0179fc2bc72d21c82d597d18d35](https://i.gyazo.com/399be0179fc2bc72d21c82d597d18d35.png)](https://gyazo.com/399be0179fc2bc72d21c82d597d18d35)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">画像の準備

[NyARToolkit](http://nyatla.jp/nyartoolkit/wp/)のパッケージに含まれるサンプル**SimpleNft**は
**NFT(Natural Feature Tracking)**を利用したマーカー認識のサンプルです。
NFTとは自然特徴点を利用した物体認識のことで、この技術を利用することで、一般的な画像をマーカーとして扱うことができます
（詳しくは[The Sixwish Project](http://sixwish.jp/ARToolKitNFT/)を参照）。
ここでは、下記の下記の「犬の画像（[001.png](https://i.gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8.png)）」と
「うさぎの画像（[002.png](https://i.gyazo.com/5ad97af3ed708c91251ef897ca34d73a.png)）」を
マーカーとして利用することに挑戦します。
画像サイズは**300x300**ピクセル、画像フォーマットは透過背景の**PNG**です。
また、犬の画像を認識すると**赤色の立方体**、うさぎの画像を認識すると**青色の立方体**を表示させることにします。

[![https://gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8](https://i.gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8.png)](https://gyazo.com/ea8d174fc70bc754fa32fb9b5391b6d8)

[![https://gyazo.com/5ad97af3ed708c91251ef897ca34d73a](https://i.gyazo.com/5ad97af3ed708c91251ef897ca34d73a.png)](https://gyazo.com/5ad97af3ed708c91251ef897ca34d73a)

**SimpleNft**フォルダをコピーし、フォルダに含まれるC#スクリプトを**ARPictureCamera**、
シーンを**ARPictureScene**にファイル名を変更した状態を前提とします（詳細は[**NYARToolkit for Unityの導入**](artoolkit.html)を参照）。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">パターンファイルの作成

上記の２種類の画像から、マーカーのパターンファイルを作成します。
パターンファイルの作成には、[NyARToolkit](http://nyatla.jp/nyartoolkit/wp/)のパッケージに含まれる**NftFileGenerator**を利用します
（詳しくは[NyARToolkit Project](http://nyatla.jp/nyartoolkit/wp/?cat=17)を参照）。
[Data]-[Tools]にある**NftFileGenerator**をダブルクリックするとプログラムが起動します。
**import**をクリックし、特徴点を抽出したいJPGやPNGなどの画像を指定します（透過より背景白の方が認識精度が高いようです）。
次に、**Make Feature Set**をクリックし、特徴点を抽出します。
このとき、**Source DPI**や**Iset DPIs**などのパラメータは特に変更する必要はないようですが、
特徴点数が多すぎたり、少なすぎる場合には**FSET parameter**を調節すると良いようです。

[![https://gyazo.com/5888670b05712f1852cabbce0a0576a9](https://i.gyazo.com/5888670b05712f1852cabbce0a0576a9.png)](https://gyazo.com/5888670b05712f1852cabbce0a0576a9)

抽出されたパターンは**赤い四角**や**青い円**で表示されます。
パターンを保存するには**Export**をクリックし、適当なファイル名で保存します。
ここでは、「犬の画像」のパターンファイルを**patt_001.bytes**、
「うさぎの画像」のパターンファイルを**patt_002.bytes**というファイル名で保存します。
これらのパターンファイルは、**Assets**の**Resources**フォルダにコピーしておきます。

[![https://gyazo.com/5c7da4b00d6c7139796c4c21b2f84c53](https://i.gyazo.com/5c7da4b00d6c7139796c4c21b2f84c53.png)](https://gyazo.com/5c7da4b00d6c7139796c4c21b2f84c53)

[![https://gyazo.com/c306e5bf17af2bceb25bc0967b23cfa5](https://i.gyazo.com/c306e5bf17af2bceb25bc0967b23cfa5.png)](https://gyazo.com/c306e5bf17af2bceb25bc0967b23cfa5)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">マーカーオブジェクトの作成

**SimpleNft**はマーカーを認識すると**赤色の立方体**を表示します。
ここでは、２種類のマーカーに応じて、**赤色の立方体**に加え、**青色の立方体**を作成しておきます。

まずは、シーンの**ARPictureScene**をダブルクリックし、Hierarchyにある**MarkerObject**を複製します。
スクリプトからこれのオブジェクトを操作するため、２つのマーカーオブジェクトには共通のタグ（**Tag**）を設定します
（**Gameobject.FindGameObjectsWithTag(String tag)**メソッドでタグからオブジェクトを取得することが可能）。
タグ名は自由に設定することができますが、ここでは**MarkerObject**としておきます。

[![https://gyazo.com/2e6532cca4d4e4d1d30c3a6355246732](https://i.gyazo.com/2e6532cca4d4e4d1d30c3a6355246732.png)](https://gyazo.com/2e6532cca4d4e4d1d30c3a6355246732)

次に、Assetsで赤色と青色のマテリアルを作成します。
[Create]-[Materials]をクリックしてマテリアルを作成し、**Albedo**に赤色と青色を設定します。
ここでは、マテリアルの名前を**Red**と**Blue**にしておきます。
これらのマテリアルは**MarkerObject**の直下にある**Cube**の**Materials**に設定しておきます。

[![https://gyazo.com/5c51275d39fcb86e09f1d073fb320011](https://i.gyazo.com/5c51275d39fcb86e09f1d073fb320011.png)](https://gyazo.com/5c51275d39fcb86e09f1d073fb320011)

マーカーが認識されたときに表示されるのは、上記の**Cube**オブジェクトです。
**Cube**の**サイズ（Scale）**や**位置（Position）**はマーカーの大きさに合わせて調整する必要がありますが、
ここでは、サイズの値をX=80、Y=80、Z=80、位置をX=-80、Y=80、Z=40に修正しておきます。

[![https://gyazo.com/5d1a3c61b18ceb85e4cf06bd3b504851](https://i.gyazo.com/5d1a3c61b18ceb85e4cf06bd3b504851.png)](https://gyazo.com/5d1a3c61b18ceb85e4cf06bd3b504851)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スクリプトの修正

最後にC#スクリプトの**ARPictureCamera**を修正します。

まずは、2つのマーカーオブジェクトを配列で取得します。
マーカーオブジェクトは**MarkerObject**というタグが設定されていることを利用します。

	private GameObject[] objects = new GameObject[2];
	objects = GameObject.FindGameObjectsWithTag("MarkerObject");

同様に2つのパターンを基にマーカーIDを配列で取得します。
**Resources.Load()**メソッドは、Resourcesフォルダ内にあるファイルを探索し取得するメソッドです。

	private int[] mids = new int[2]; //マーカーID
    mids[0] = this._ns.addNftTarget(new MemoryStream(((TextAsset)Resources.Load("patt_001", typeof(TextAsset))).bytes), 160);
	mids[1] = this._ns.addNftTarget(new MemoryStream(((TextAsset)Resources.Load("patt_002", typeof(TextAsset))).bytes), 160);

最後に、**update()**メソッドで、マーカーが認識された場合に、マーカーオブジェクトをアクティブに変更します。
逆に、マーカーが認識されなかった場合は、マーカーオブジェクトを非アクティブに変更します。
マーカーオブジェクトは、**setTransform()**メソッドで、マーカーが検出された位置に表示されます。

	for (int i=0; i<mids.Length; i++) {
        if (this._ns.isExist(mids[i])) {
            if (objects[i].activeSelf == false){
                objects[i].SetActive(true);
            }
            this._ns.setTransform(mids[i], objects[i].transform);
        } else {
            objects[i].SetActive(false);
        }
    }

全ソースコードを下記に示します。
コードの詳細は、付しているコメントを参考にしてください。

{% gist naoto-github/1a1da417d545e2f921b22fea2e98635e %}

プログラムを実行して、「犬の画像」を認識すると青い立方体、「うさぎの画像」を認識すると赤い立方体が表示されることを確認してください。
これでイラストなど一般的な画像をマーカーとして利用することができるようになりました。

[![https://gyazo.com/1a4c1907e1278c7a03536496f7076574](https://i.gyazo.com/1a4c1907e1278c7a03536496f7076574.png)](https://gyazo.com/1a4c1907e1278c7a03536496f7076574)

[![https://gyazo.com/2d0bef457c6ce380589daeb6a8f5808a](https://i.gyazo.com/2d0bef457c6ce380589daeb6a8f5808a.png)](https://gyazo.com/2d0bef457c6ce380589daeb6a8f5808a)

{% include unity/reference.html %}