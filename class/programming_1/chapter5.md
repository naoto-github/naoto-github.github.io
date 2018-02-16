---
layout: page
title: "アニメーションの表示"
permalink: /class/programming_1/chapter5.html
top_link: false
image: "https://i.gyazo.com/01cd25d187d03257cc85be5a3150916f.png"
---

[![https://gyazo.com/01cd25d187d03257cc85be5a3150916f](https://i.gyazo.com/01cd25d187d03257cc85be5a3150916f.png)](https://gyazo.com/01cd25d187d03257cc85be5a3150916f)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project5」を入力し、[保存]をクリックしましょう。
保存先に「Project5」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/0164542679637926cc8339ce165b4a5e](https://i.gyazo.com/0164542679637926cc8339ce165b4a5e.png)](https://gyazo.com/0164542679637926cc8339ce165b4a5e)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">setupとdraw

アニメーションを制御するには`setu()`関数と`draw関数()`が必要になります。
`setup()`関数には、変数の初期化など、プログラムを実行したときに**1回だけ**実行する処理を記述します。
一方、`draw()`関数は、プログラムの実行中に**繰り返し**実行され、アニメーションなど何かを変化させるための処理を記述します。
また、`setup()`関数と`draw()`関数の外部で宣言された変数は両方の関数内で利用できます（**グローバル変数**と呼びます）。
`setu()`関数と`draw関数()`は下記のように記述します（**void**は「この関数は返値をもたない」という意味です）。

    void setup(){
    	1回だけ実行する処理;
    }

	void draw(){
    	繰り返し実行する処理;
    }

ここでは、ウィンドウの中央に半径10の円を描いてみましょう。
変数の初期化は`setup()`関数、円の描画は`draw()`関数に記述していることに注意してください。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
ウィンドウの中央に円が描かれていることを確認してください。

{% gist naoto-github/a3ec0fa860b68798b0fb749a79bb9292 %}

[![https://gyazo.com/acc31709869b190e55ef6c6a4179b396](https://i.gyazo.com/acc31709869b190e55ef6c6a4179b396.png)](https://gyazo.com/acc31709869b190e55ef6c6a4179b396)

### 直線運動

円が右方向に直線的に動くアニメーションを設定してみましょう。
右方向へのアニメーションは、`draw()`関数において、変数*x*の値を増加させることで表現できます。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
複数の円が右方向に描画されることを確認してください。

{% gist naoto-github/46ecff4e866f144c0ece31f30d0f75a9 %}

[![https://gyazo.com/5a2299a60de12f4a0a18a1734532dae1](https://i.gyazo.com/5a2299a60de12f4a0a18a1734532dae1.gif)](https://gyazo.com/5a2299a60de12f4a0a18a1734532dae1)

しかし、上記のコードでは円が複数描画されてしまい、アニメーションしているように見えません。
そこで、`draw()`関数の最初で、背景を灰色（#cccccc）で塗りつぶすことで、常に円が1つだけ描画されるように変更します。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
1つの円が右方向に移動することを確認してください。

{% gist naoto-github/f169257e50d580b1830bf11896368831 %}

[![https://gyazo.com/dad4f4fb1d0feb6da75b4e754a7c3d69](https://i.gyazo.com/dad4f4fb1d0feb6da75b4e754a7c3d69.gif)](https://gyazo.com/dad4f4fb1d0feb6da75b4e754a7c3d69)

円がウィンドウの端に到達したら、跳ね返って逆方向に進むように修正しましょう。
まずは、右端に到達したら、左方向に進むようにします。
円の速度を表す変数*speed*を宣言し、if文を利用して*x*の値が右端に到達したら*speed*の正負を反転します。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
円が右端に到達すると跳ね返ることを確認してください。

{% gist naoto-github/c23338eee2221d35a9d02a0ca930b997 %}

[![https://gyazo.com/611d2d56fd57a1cc8d3ac506275f5cf3](https://i.gyazo.com/611d2d56fd57a1cc8d3ac506275f5cf3.gif)](https://gyazo.com/611d2d56fd57a1cc8d3ac506275f5cf3)

同様に、左端に到達したら、右方向に進むようにします。
if文を利用して*x*の値が左端に到達したら*speed*の正負を反転します。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
円が左端に到達すると跳ね返ることを確認してください。

{% gist naoto-github/9e70813f9a4678de3c355cc35d38ac41 %}

[![https://gyazo.com/cd23307cf8fa36b1d03d2c6f48e4c1d0](https://i.gyazo.com/cd23307cf8fa36b1d03d2c6f48e4c1d0.gif)](https://gyazo.com/cd23307cf8fa36b1d03d2c6f48e4c1d0)

### 円運動

次は、円運動するアニメーションを設定してみましょう。
円運動を表現するには`sin()`関数と`cos()`関数を利用します。
`sin()`関数と`cos()`関数の引数には**角度**を指定しますが、
**ラジアン角**を用いることに注意が必要です（ラジアン角は**0**から**2&pi;**）。

円運動の半径を表す変数*l*とラジアン角を表す変数*angle*を宣言します。
また、座標を表す*x*と*y*はfloat型に変更します。
`sin()`関数と`cos()`関数を利用して、座標（x,y）を更新することで円運動を表現します。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
円が円運動していることを確認してください。

{% gist naoto-github/79ec23d093b9a432abaf8735633c18fe %}

[![https://gyazo.com/4682360aab6f62b78117d9f185f3f7e2](https://i.gyazo.com/4682360aab6f62b78117d9f185f3f7e2.gif)](https://gyazo.com/4682360aab6f62b78117d9f185f3f7e2)

上記のコードを少し修正して、螺旋運動のアニメーションを設定してみましょう。
円運動の半径を表す変数*l*の値を徐々に大きくします。
下記を参考にコードを入力したら、Runボタンをクリックしてください。
円が螺旋運動していることを確認してください。

{% gist naoto-github/ee03c8909bea1c66e315fd2db9c395b3 %}

<!-- [![https://gyazo.com/7a7ffd91ca5301f77ef8c279cd28f6c1](https://i.gyazo.com/7a7ffd91ca5301f77ef8c279cd28f6c1.gif)](https://gyazo.com/7a7ffd91ca5301f77ef8c279cd28f6c1) -->
[![https://gyazo.com/8626a6845b9d691ef73e8badacd6fc1b](https://i.gyazo.com/8626a6845b9d691ef73e8badacd6fc1b.gif)](https://gyazo.com/8626a6845b9d691ef73e8badacd6fc1b)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

螺旋運動と共に描画される円の大きさが徐々に大きくなるアニメーションを設定してください。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project5-日付a.zip」というファイルが作成されていることを確認してください。

<!-- [![https://gyazo.com/93c3471ed12ea69506fddf180f5b95b7](https://i.gyazo.com/93c3471ed12ea69506fddf180f5b95b7.gif)](https://gyazo.com/93c3471ed12ea69506fddf180f5b95b7) -->
[![https://gyazo.com/420dead37e17d266c1398716055d9c9e](https://i.gyazo.com/420dead37e17d266c1398716055d9c9e.gif)](https://gyazo.com/420dead37e17d266c1398716055d9c9e)

{% include programming_1/reference.html %}