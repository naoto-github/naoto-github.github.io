---
layout: page
title: "OpenCVを利用した視線位置の描画"
top_link: false
image: https://i.gyazo.com/10494725ec7c3a2ea055060c3bc2e51a.png
---

[![https://gyazo.com/10494725ec7c3a2ea055060c3bc2e51a](https://i.gyazo.com/10494725ec7c3a2ea055060c3bc2e51a.png)](https://gyazo.com/10494725ec7c3a2ea055060c3bc2e51a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">OpenCVとは

[前回](contents/eyetracker/eyetracker1.html)は**Tobii Eye Tracker 4C**を利用して、
ディスプレイに対する視線の位置を検出しました。
今回は画像処理ライブラリの[OpenCV](https://opencv.org/)を利用して、
視線位置に合わせてウィンドウに図形を描画することに挑戦します。
[OpenCV](https://opencv.org)は、**インテル** が開発したオープンソースのライブラリであり、
画像処理に関する様々なアルゴリズムを容易に実装することができます（2016年にインテルが**Itseez**を買収）。
また、**C/C++**、**Java**、**Python**、**MATLAB** のライブラリとして配布されており、
プログラミング言語を問わず利用できることも魅力です。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">図形描画の実装

前回までにライブラリの導入は完了しているので、今回はウィンドウを表示するところからスタートしましょう。
ファイル名は **MyEyeTrack2.py** とします。
まずは、**OpenCV(cv2)** と **NumPy** のモジュールをインポートします。
ここで、**NumPy** には、**np** という別名を付けていることに注意してください。

{% gist naoto-github/fda6c8009f56fef95bb9e4f292496f24 %}

最初に、**np.zeros** メソッドを用いて、幅1980px、高さ1080pxの黒色の画像を生成します。
このメソッドは値が0の配列を返値とし、引数には配列の長さを表す **タプル** と **データタイプ**を渡します。
ここでは、8ビットの符号なし整数（0~255）である**np.unit8**をデータタイプとしています。
この画像を **imshow** メソッドで表示します。
第1引数の **"MyEyeTrack"** はウィンドウのタイトルバーに表示される文字列です。

{% gist naoto-github/2c1f5beacfa14873ee049b92c9709f9a %}

前回実装したコールバックメソッドを修正し、視線位置に白色の円を描画するように改良します。
左右の視線位置の平均値を円の中心座標とします。
コールバックメソッドで取得される視線位置は、
標準化された値のためウィンドウのサイズを掛けて、ピクセル座標に変換しています。
このとき、y座標はウィンドウのタイトルバーの幅を考慮して、**50** だけ減らしています
（本当はキャリブレーションをやらなきゃいけないけど）。
円を描くには、**cv2.circle** メソッドを利用します。
引数には、**画像**、**中心座標**、**半径**、**色**、**枠線の太さ** を指定します。
ここで、枠線の太さに負の値を指定すると、塗りつぶしの円になります。
また、**global** はグローバル変数の **img** を用いることの宣言です。

{% gist naoto-github/757bfdf787b108e99efc9f366f63f950 %}

上記で実装したコールバックメソッドを**EyeTracker**オブジェクトに登録します。

{% gist naoto-github/f73b6e62af69e24864b5d6afb0b063c4 %}

最後にwhile文で**imshow**メソッドを呼び出し、画像の再描画を繰り返します。
ここでは、100ms毎に画像を描画しています。
このとき、**ESCキー**が押されると、ループを終了し、
コールバックメソッドの解除、ウィンドウの破棄、システムの終了を行います。

{% gist naoto-github/cfd926077a9b05bdcf49cd3584f68a0c %}

では、プログラムを実行してみましょう。
ここでは、四角形を描くように視線を動かしてみました。
視線に合わせて白い円が描画されていることが分かります。
しかし、思っていたより視線を安定させるのは難しいです。

    $ python MyEyeTrack2.py

<iframe width="560" height="315" src="https://www.youtube.com/embed/qB8llQMwQIU?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

{% include eyetracker/reference.html %}
