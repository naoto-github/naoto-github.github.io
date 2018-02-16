---
layout: page
title: "条件分岐"
permalink: /class/programming_1/chapter4.html
top_link: false
image: "https://i.gyazo.com/48e88fbfa14b13656dcdd4d580dfbc14.png"
---

[![https://gyazo.com/48e88fbfa14b13656dcdd4d580dfbc14](https://i.gyazo.com/48e88fbfa14b13656dcdd4d580dfbc14.png)](https://gyazo.com/48e88fbfa14b13656dcdd4d580dfbc14)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project4」を入力し、[保存]をクリックしましょう。
保存先に「Project4」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/84d3ef687db2743b82ede8560db353dd](https://i.gyazo.com/84d3ef687db2743b82ede8560db353dd.png)](https://gyazo.com/84d3ef687db2743b82ede8560db353dd)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">乱数の生成

規則性がないランダムな値のことを**乱数**と呼びます。
コンピュータは完全な乱数を生成することは出来ないため、
アルゴリズムに従って疑似的な乱数を生成します（**疑似乱数**と呼ばれます）。
コンピュータゲームにおける「トランプを配る」「サイコロを振る」などはこの疑似乱数を利用しています。
Processingで疑似乱数を先生するには`random()`関数を利用します。
`random()`関数の引数には、生成する乱数の**下限（low）**と**上限（high）**を指定します。
また、生成された乱数はfloat型のデータとなることに注意が必要です。

    random(low, high);

ここでは、for文を利用して、半径10の円を10箇所に描きましょう。
各円は、`random()`関数を利用して、ランダムな位置に配置します。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
実行毎に配置が変わる円が描かれていることを確認してください。

{% gist naoto-github/0f6133b891e7b98dc9c0b2e2cace3dd8 %}

[![https://gyazo.com/0ab205a62aab1382cee40b2b9d5c5a02](https://i.gyazo.com/0ab205a62aab1382cee40b2b9d5c5a02.png)](https://gyazo.com/0ab205a62aab1382cee40b2b9d5c5a02)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">比較演算子

for文の**繰り返し条件**に記述される`i<10`などは**条件式**と呼ばれます。
また、「**<**」は**比較演算子**と呼ばれ、左辺と右辺を比較した結果、
**真（true）**または**偽（false）**のどちらかを返す論理演算の一つです。
この真（true）や偽（false）は**boolean型**であることに注意してください。
例えば、変数*a*の値が5であるとき「a < 3」の結果は**false**となります。
比較演算子を下記表にまとめます。

|比較演算子|意味|例|
|-|-|-|
|A\=\=B|AとBは等しい|x\=\=3|
|A!=B|AとBは等しくない|x!=3|
|A>B|AはBより大きい|x>3|
|A>=B|AはBと等しいか大きい|x>=3|
|A<B|AはBより小さい|x<3|
|A<=B|AはBと等しいか小さい|A<=3|

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">if文

条件式の結果に応じて実行する処理を分けることを**条件分岐**と呼びます。
条件分岐を表現するには**if文**を利用します。
if文は下記のように記述し、「()」内で指定されている条件式が真（true）となるときに、「{}」内の命令文を実行します。

    if(条件式){
    	実行する命令
    }

ここでは、ランダムに生成された*x*が150より小さいときにだけ円を描きましょう。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
ウィンドウの左側にだけ円が描画されていることを確認してください。

{% gist naoto-github/42b6112c93a70b1c293e6018f91a4629 %}

[![https://gyazo.com/2cde9fe9d71b75f2280114e5ea727237](https://i.gyazo.com/2cde9fe9d71b75f2280114e5ea727237.png)](https://gyazo.com/2cde9fe9d71b75f2280114e5ea727237)

下記のように**else**を用いることで、条件式が偽（false）となるときの命令も記述することができます。

    if(条件式){
    	真のときに実行する命令
    }
    else{
    	偽のときに実行する命令
    }

ランダムに生成された*x*が150以上のときには正方形を描きましょう。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
ウィンドウの左側は円、右側には正方形が描画されていることを確認してください。

{% gist naoto-github/c4ce0a2df2cc2c25ba343cd454f59233 %}

[![https://gyazo.com/6953593ef35c30aeb10baa50be72f533](https://i.gyazo.com/6953593ef35c30aeb10baa50be72f533.png)](https://gyazo.com/6953593ef35c30aeb10baa50be72f533)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

ランダムに生成された*y*が150より小さいときには**赤色**、
150以上のときは**青色**で、
円と正方形を塗りつぶして下さい。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project4-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/3f92f95b186d25911a4c1aa6890e7097](https://i.gyazo.com/3f92f95b186d25911a4c1aa6890e7097.png)](https://gyazo.com/3f92f95b186d25911a4c1aa6890e7097)

{% include programming_1/reference.html %}