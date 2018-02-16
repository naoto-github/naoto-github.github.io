---
layout: page
title: "変数と繰り返し"
permalink: /class/programming_1/chapter3.html
top_link: false
image: "https://i.gyazo.com/c54feacc65f87c01365cc7f22a5260e4.png"
---
[![https://gyazo.com/c54feacc65f87c01365cc7f22a5260e4](https://i.gyazo.com/c54feacc65f87c01365cc7f22a5260e4.png)](https://gyazo.com/c54feacc65f87c01365cc7f22a5260e4)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project3」を入力し、[保存]をクリックしましょう。
保存先に「Project3」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/1454a1bbd3db15eb5ea977017a6202a2](https://i.gyazo.com/1454a1bbd3db15eb5ea977017a6202a2.png)](https://gyazo.com/1454a1bbd3db15eb5ea977017a6202a2)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">データ型

Processingでは、「1」や「2」などの**整数**、「0.1」や「1.1」などの**小数**をデータとして扱うことができます。
これらデータの種類は**データ型**で明確に区別されます。
例えば、整数は**int**というデータ型、小数は**float**というデータ型に該当します。
下記表に利用頻度の高いデータ型をまとめます。
取り敢えず表中の**int**、**float**、**boolean**、**String**だけはしっかりと覚えておきましょう（正確にはStringはクラスでありデータ型ではない）。

|データの種類|データ型|例|
|-|-|-|
|整数|int|1, 2, 3|
|小数|float|0.1, 1.1, 10.1|
|真理値|boolean|true, false|
|文字列|String|"ABC", "あいう"|

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">変数

データを記憶しておくための箱が**変数**です。
変数を使用するには事前に**変数宣言**が必要です。
変数宣言は`データ型 変数名;`と記述します。
データ型とは**int**や**float**のことを指しています。
変数名は「変数に付ける名前」のことで、自由に設定が可能ですが、
「小文字で始まるわかりやすい名前」を設定することが望ましいとされています。

変数にデータを記憶させるには、`変数=代入するデータ;`と記述します。
変数にデータを記憶させることを**代入**と呼ぶことに注意してください。
ここでは、**int型**の変数*x*と*y*を宣言し、ともに**150**を代入します。
この変数*x*と*y*を利用して、座標(x,y)の位置に半径*50*の円を描いてみましょう。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
指定した半径の円が描かれていることを確認してください。

{% gist naoto-github/8580669edddb6189cece384ecdc19fa1 %}

[![https://gyazo.com/a7542e84de7362762c5d59b3e5e77604](https://i.gyazo.com/a7542e84de7362762c5d59b3e5e77604.png)](https://gyazo.com/a7542e84de7362762c5d59b3e5e77604)

変数宣言と同時にデータを代入することも可能です。
この場合は`データ型 変数名=代入するデータ;`と記述します。
下記を参考にコードを修正し、Runボタンをクリックしてください。
先程と同じ円が描かれていることを確認してください。

{% gist naoto-github/1b4cb5890c1320b012d4b6644db405c4 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">演算子

加算を表す「+」や減算を表す「-」などの記号を**演算子**と呼びます。
四則計算を行うための演算子を確認しておきましょう。
整数同士を対象とした「/」の演算結果は商となることに注意してください。
演算の優先順位を上げるための「()（丸括弧）」も記述可能です。

|演算子|意味|例|
|-|-|-|
|+|加算|5+2 -> 7|
|-|減算|5-2 -> 3|
|*|乗算|5*2 -> 10|
|/|除算|5/2 -> 2|
|%|剰余|5%2 -> 1|

ここでは、円の半径を表す**int型**の変数*r*に**50**を代入し、半径50の円を描きます（直径は変数*r*の2倍）。
加えて、変数*x*から100を引いて位置を左方向にずらした円、100を足して位置を右方向にずらした円も描きましょう。
下記を参考にコードを修正し、Runボタンをクリックしてください。
指定した3つの円が描かれていることを確認してください。

{% gist naoto-github/75680b4ecaf8ef21248174776e95da49 %}

[![https://gyazo.com/83939472f6b3f1b50e416836fcd99903](https://i.gyazo.com/83939472f6b3f1b50e416836fcd99903.png)](https://gyazo.com/83939472f6b3f1b50e416836fcd99903)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">for文

同じ処理を繰り返して実行するには**for文**を利用します。
for文は下記のように記述します。
「()」内には、**変数の初期化**、**繰り返し条件**、**変数の更新**を記述します。
例えば、int型の変数*i*を宣言し、*i*の値を1ずつ増やしながら、10回同じ命令を繰り返すには、
`for(int i=0; i<10; i++)`と記述します。
`i<10`は「変数*i*が10より小さいかどうか」を判定する条件文であり、
「**<**」のような演算子は**比較演算子**と呼ばれます（詳しくは次回に解説します）。
また、`i++`は値を1だけ増やすという演算子であり、`i=i+1`と同じ処理です。

    for(変数の初期化;繰り返し条件;変数の更新){
        繰り返す命令
    }

下記のコードを参考に、複数の半径10の円を横に並べて描きましょう。
for文を利用して、*x*を30ずつ増やすことで、位置を右方向にずらしながら10箇所に円を配置しています。
*i*は0から9まで変化するため、*x*は15、45、75、…、255、285と変化します。
コードを修正したら、Runボタンをクリックしてください。
指定した10箇所の円が描かれていることを確認してください。

{% gist naoto-github/04fa087a4010c9b75b77935f4807b024 %}

[![https://gyazo.com/18ddbad0efcbf995e845b6f010fc3a4e](https://i.gyazo.com/18ddbad0efcbf995e845b6f010fc3a4e.png)](https://gyazo.com/18ddbad0efcbf995e845b6f010fc3a4e)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

前節で描いた円の半径を、左から順に5ずつ増やしてください（右の円ほど大きくなる）。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project3-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/f8e6a9096358face10dbc8a628a5d768](https://i.gyazo.com/f8e6a9096358face10dbc8a628a5d768.png)](https://gyazo.com/f8e6a9096358face10dbc8a628a5d768)

{% include programming_1/reference.html %}