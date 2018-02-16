---
layout: page
title: "NyARToolkit for Unityで3Dモデルを表示"
top_link: false
image: "https://i.gyazo.com/8cb7bde6f98680bdc444e9022a6c9192.png"
---

[![https://gyazo.com/8cb7bde6f98680bdc444e9022a6c9192](https://i.gyazo.com/8cb7bde6f98680bdc444e9022a6c9192.png)](https://gyazo.com/8cb7bde6f98680bdc444e9022a6c9192)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">3Dモデルの準備

**[NyARToolkit](http://nyatla.jp/nyartoolkit/wp/)**のパッケージに含まれる
サンプル**SimpleLite**はマーカーを検出すると赤色の立方体（Cube）を表示するプログラムです。
この**SimpleLite**を修正し、3Dモデルを立体的に表示できるよう改良します。

**SimpleLite**フォルダをコピーし、フォルダに含まれるC#スクリプトを**ARPictureCamera**、
シーンを**ARPictureScene**にファイル名を変更した状態を前提とします
（詳細は[NyARToolkit for Unityの導入](artoolkit.html)を参照）。


Unityでは**.3ds**、**.obj**などの一般的な3Dモデルのファイル形式を利用できますが、
今回はUnityのオリジナルキャラクターである「[ユニティちゃん](http://unity-chan.com/)」を利用してみます。
「ユニティちゃん」はUnityの**アセット（素材）**として配布されているので導入はとても簡単です。
また、このキャラクターは、ラインセンスロゴもしくはライセンス表記があれば、キャラクターの二次創作物の制作が認められています
（詳細は「[ユニティちゃんライセンス条項](http://unity-chan.com/contents/license_jp/)」を参照）。

[![https://gyazo.com/64469ca169bd9371d96f44969faea7a1](https://i.gyazo.com/64469ca169bd9371d96f44969faea7a1.png)](https://gyazo.com/64469ca169bd9371d96f44969faea7a1)

まずは、「[ユニティちゃん](http://unity-chan.com/)」の公式ページから、ライセンスに同意し、データをダウンロードします。
データをダウンロードしたら、ツールバーから[Assets]-[Import package]-[Custom package]をクリックして、
ダウンロードしたパッケージを選択します。
ファイルの読込み後に、ダイアログが表示されたら、全てのファイルにチェックを入れた状態で**import**をクリックしましょう。
ファイルの取り込みが終わると、プロジェクトのAssetsに新しく**UnityChanフォルダ**が展開されます。

[![https://gyazo.com/23ded6f9cd7faf96a4b5344c23e306c9](https://i.gyazo.com/23ded6f9cd7faf96a4b5344c23e306c9.png)](https://gyazo.com/23ded6f9cd7faf96a4b5344c23e306c9)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">3Dモデルの表示

[UnityChan]-[Models]に「ユニティちゃん」の3Dモデルである**unitychan**があります。
これを、ドラッグし、Hierarchyにある**MarkerObject**の直下に配置します。
すると下記のようにx=0、y=0、ｚ=0の位置に「ユニティちゃん」が配置されます。

[![https://gyazo.com/e4ae08c430d38870625e73ca9e7c2a32](https://i.gyazo.com/e4ae08c430d38870625e73ca9e7c2a32.png)](https://gyazo.com/e4ae08c430d38870625e73ca9e7c2a32)

次に、「ユニティちゃん」の**サイズ（Scale）**や**座標（Position）**を調整します。
ここでは、Inspectorから、サイズの値をX=80、Y=80、Z=80、位置をX=0、Y=-40、Z=-20に修正しましょう。

[![https://gyazo.com/871b7cfc4afca74e410ddb55ab8d8e9c](https://i.gyazo.com/871b7cfc4afca74e410ddb55ab8d8e9c.png)](https://gyazo.com/871b7cfc4afca74e410ddb55ab8d8e9c)

再生ボタンをクリックすると、「ユニティちゃん」が表示されることを確認してください。
説明文なしに下記の画像だけだと完全に変な人かもしれません。

[![https://gyazo.com/54efe16facac35df44c06b79288011ce](https://i.gyazo.com/54efe16facac35df44c06b79288011ce.png)](https://gyazo.com/54efe16facac35df44c06b79288011ce)

次回は**Animator Controller**を利用して「ユニティちゃん」に歩くなどの動きを付けることに挑戦します。

{% include unity/reference.html %}