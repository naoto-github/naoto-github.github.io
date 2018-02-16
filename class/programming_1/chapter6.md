---
layout: page
title: "イベント処理"
permalink: /class/programming_1/chapter6.html
top_link: false
image: "https://i.gyazo.com/73fb9ab1092cec0c9901e51b0d0abb61.png"
---

[![https://gyazo.com/73fb9ab1092cec0c9901e51b0d0abb61](https://i.gyazo.com/73fb9ab1092cec0c9901e51b0d0abb61.png)](https://gyazo.com/73fb9ab1092cec0c9901e51b0d0abb61)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project6」を入力し、[保存]をクリックしましょう。
保存先に「Project6」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/7b8735dd49cea9d6b2ba349d28cb6c1a](https://i.gyazo.com/7b8735dd49cea9d6b2ba349d28cb6c1a.png)](https://gyazo.com/7b8735dd49cea9d6b2ba349d28cb6c1a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">マウスイベント

Processingではマウスイベントを検出するために下記表の関数が用意されています。
これらの関数内に、実行したい内容を記述することで、マウスイベントに対応した処理が可能になります。
また、これらのイベントの結果を反映させるには、`draw()`関数の記述が必要なことに注意してください。

|関数名|イベント|
|-|-|
|mouseMoved()|マウスボタンを押さずに動かしたとき|
|mouseDragged()|マウスボタンを押しながら動かしたとき|
|mousePressed()|マウスボタンを押したとき|
|mouseReleased()|マウスボタンを離したとき|

ここでは、`mouseMoved()`関数を利用して、マウスの軌跡を描画してみましょう。
ウィンドウ内のマウスの位置は変数**mouseX**と**mouseY**で取得可能です。
マウスの動きを検知したら、半径3の塗りつぶし円を描きます。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
マウスの動きに合わせて、軌跡が描かれることを確認してください。

{% gist naoto-github/2c36d458b1538e61eef3e42fd97c2445 %}

[![https://gyazo.com/230c11c58e0952c30ab00f49eab98b96](https://i.gyazo.com/230c11c58e0952c30ab00f49eab98b96.gif)](https://gyazo.com/230c11c58e0952c30ab00f49eab98b96)

次に、`MousePressed()`関数を利用して、マウスボタンを押したとき（クリックしたとき）に、
赤色の正方形を描画してみましょう。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
マウスの位置に合わせて、正方形が描かれることを確認してください。

{% gist naoto-github/bc634cd362cdb0184a1542fa3583c724 %}

[![https://gyazo.com/aefda2437db3db9d642172639e0345b9](https://i.gyazo.com/aefda2437db3db9d642172639e0345b9.gif)](https://gyazo.com/aefda2437db3db9d642172639e0345b9)

今度は、`mousePressed()`関数と`mouseDragged()`関数を組み合わせてみましょう。
マウスボタンを押した位置を中心座標として、マウスをドラッグして移動した距離を半径とした円を描きます。
まず、変数*x*と*y*を宣言し、`mousePressed()`関数でマウスボタンを押した位置を記録します。
次に、`ouseDragged()`関数で、座標(x,y)からの距離を`dist()`関数で求め円を描きます
（`dist(x1, y1, x2, y2)`関数は、座標(x1,y1)と座標（x2,y2）の距離を求めます）。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
マウスのドラッグ操作に合わせて、円が描かれることを確認してください。

{% gist naoto-github/82932f08287adafcacee228ccefad2ec %}

[![https://gyazo.com/818cca00127b5de7b1a4c6325ffd727c](https://i.gyazo.com/818cca00127b5de7b1a4c6325ffd727c.gif)](https://gyazo.com/818cca00127b5de7b1a4c6325ffd727c)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">キーボードイベント

キーボードイベントを検出するために下記表の関数が用意されています。
これらの関数内に、実行したい内容を記述することで、キーボードイベントに対応した処理が可能になります。
また、これらのイベントの結果を反映させるには、`draw()`関数の記述が必要なことに注意してください。

|関数名|イベント|
|-|-|
|keyPressed()|キーを押したとき|
|keyReleased()|キーを離したとき|

ここでは、`keyPressed()`関数を利用して、キー「c」を押したら、
画面をクリア（背景色で塗りつぶす）してみましょう。
押されたキーは変数**key**を参照することで調べることができます。
if文を利用して、*key*が「c」と一致するかどうかを判定しています（cは「'（シングルクォーテーションで括ることに注意）」）。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
「c」を押すと、画面がクリアされることを確認してください。

{% gist naoto-github/e3134eb25893d98f1a37f0b6f9fd79ca %}

[![https://gyazo.com/bbabfcc8f991ec1123c6d5ce3974cf46](https://i.gyazo.com/bbabfcc8f991ec1123c6d5ce3974cf46.gif)](https://gyazo.com/bbabfcc8f991ec1123c6d5ce3974cf46)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

「r」を押すと赤色、「g」を押すと緑色、「b」を押すと青色で、円が塗りつぶされるように修正してください。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project6-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/d6514a020887e8d611ad6a7e8195ea7a](https://i.gyazo.com/d6514a020887e8d611ad6a7e8195ea7a.gif)](https://gyazo.com/d6514a020887e8d611ad6a7e8195ea7a)

{% include programming_1/reference.html %}