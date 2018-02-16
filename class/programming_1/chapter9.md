---
layout: page
title: "3Dグラフィックス"
permalink: /class/programming_1/chapter9.html
top_link: false
image: "https://i.gyazo.com/d0b1414b74f9d3f51ab8ac0e3eec4768.png"
---

[![https://gyazo.com/d0b1414b74f9d3f51ab8ac0e3eec4768](https://i.gyazo.com/d0b1414b74f9d3f51ab8ac0e3eec4768.png)](https://gyazo.com/d0b1414b74f9d3f51ab8ac0e3eec4768)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project9」を入力し、[保存]をクリックしましょう。
保存先に「Project9」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/7810b7309c73d90d82f24ed94c334a84](https://i.gyazo.com/7810b7309c73d90d82f24ed94c334a84.png)](https://gyazo.com/7810b7309c73d90d82f24ed94c334a84)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">3次元グラフィックス

Processingは、これまで学んできた**2Dグラフィックス**だけでなく、**3Dグラフィックス**の描画も可能です。
3Dグラフィックスを描画するには、「**P3D(Processing 3D)**」または「**OpenGL**」の
いずれかの**レンダラ**を指定しますが、ここでは標準の**P3D**を採用することにします。
**P3D**を指定すると、2次元の座標系（x,y）が、３次元の座標系（x,y,z）に変更されます（z軸は**奥行き**を表します）。

まずは、下記のコードを参考に、`size()`関数で**P3D**を指定しましょう。
また、`rect()`関数で、1辺の長さが200の正方形を描きまます。
ここで、`translate()`関数を利用して、**原点**をウィンドウ中央に変更していることに注意してください。
Runボタンをクリックしたら、正方形が画面中央に描かれることを確認してください。

{% gist naoto-github/2ec5bd452bf580e2797ba1aeaeb3270d %}

[![https://gyazo.com/83a70fd123b2f0ebc923bc59ecae8929](https://i.gyazo.com/83a70fd123b2f0ebc923bc59ecae8929.png)](https://gyazo.com/83a70fd123b2f0ebc923bc59ecae8929)

このままでは、座標系が３次元に変更されているか確認出来ません。
そこで、マウスの動きに合わせて正方形を、X軸とY軸を中心に回転させてみましょう。
X軸まわりに回転させるには`rotateX()`関数、Y軸まわりに回転させるには`rotateY()`関数を利用します。
いずれも引数には回転する角度を**ラジアン角**で指定します。

下記を参考にコードを入力したら、Runボタンをクリックしてください。
ドラッグしたままマウスを動かすと、正方形が回転することを確認してください。

{% gist naoto-github/b9fd820e819563f9bd3e966fba7186eb %}

[![https://gyazo.com/1123ca80c8fc17b47d3461510bd4699a](https://i.gyazo.com/1123ca80c8fc17b47d3461510bd4699a.png)](https://gyazo.com/1123ca80c8fc17b47d3461510bd4699a)

[![https://gyazo.com/c9ba324e73068c5d8f0a770ddde57df9](https://i.gyazo.com/c9ba324e73068c5d8f0a770ddde57df9.png)](https://gyazo.com/c9ba324e73068c5d8f0a770ddde57df9)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">立体的な図形の描画

立体的な図形を描画してみましょう。
直方体を描画するには`box()`関数を利用します。
`box()`関数の引数には、直方体の幅（width）、高さ（height）、奥行き（depth）を指定します。
`box()`関数で描かれた直方体は原点を中心に描かれることに注意してください。

    box(width, height, depth);

下記を参考にコードを入力したら、Runボタンをクリックしてください。
ドラッグしたままマウスを動かすと、直方体が回転することを確認してください。

{% gist naoto-github/820b57dc8e40d41d90c03063b5b6f06c %}

[![https://gyazo.com/b38f29c403eb34cf3216ce6c69b55359](https://i.gyazo.com/b38f29c403eb34cf3216ce6c69b55359.png)](https://gyazo.com/b38f29c403eb34cf3216ce6c69b55359)

球を描画するには`sphere()`関数を利用します。
`sphere()`関数の引数には、半径（radius）を指定します。
`sphere()`関数で描かれた球は原点を中心に描かれることに注意してください。

    sphere(radius);

下記を参考にコードを入力したら、Runボタンをクリックしてください。
ドラッグしたままマウスを動かすと、球が回転することを確認してください。

{% gist naoto-github/f2b22b8fd642e76e435a474cc90ba8dc %}

[![https://gyazo.com/835c7d239acb17b8b8deb3af96369fe3](https://i.gyazo.com/835c7d239acb17b8b8deb3af96369fe3.png)](https://gyazo.com/835c7d239acb17b8b8deb3af96369fe3)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">光源の設置

立体的な図形に陰影をつけるには空間に光源を設置します。
光源には**環境光**、**拡散光**、**点光源**などの種類があります。

環境光は、全方向から図形に対して均一の光を照らします。
全方向から照らすため影は出来ないことから、他の光源と組み合わせて用いるのが一般的です。
環境光を設置するには、`ambientLight()`関数を用います。
引数には三原色（R、G、B）の光の強度を0～255の範囲で設定します。

    ambientLight(R, G, B);

下記を参考にコードを入力したら、Runボタンをクリックしてください。
直方体全体の色が変化していることを確認してください。

{% gist naoto-github/e809c61b6fbef121f851d59f084be281 %}

[![https://gyazo.com/092c6fb953d18c591f5f2c7fe63a810e](https://i.gyazo.com/092c6fb953d18c591f5f2c7fe63a810e.png)](https://gyazo.com/092c6fb953d18c591f5f2c7fe63a810e)

拡散光は、特定の方向に向かって進む光です。
光が垂直な面に当たったときに、もっとも明るくなります。
拡散光を設置するには、`directionalLight()`関数を用います。
引数には三原色（R、G、B）の光の強度に加え、光の進む方向をX軸、Y軸、Z軸それぞれに0～1の範囲で設定します。

    directionalLight(R, G, B, NX, NY, NZ);

下記を参考にコードを入力したら、Runボタンをクリックしてください。
ここでは、X軸の正方向に光を照らしています。
光が当たる面の色が変化していることを確認してください。

{% gist naoto-github/32c970f7815787c9c6e9feddffe5d183 %}

[![https://gyazo.com/b5bc5bdf46a0591bea665b629a167051](https://i.gyazo.com/b5bc5bdf46a0591bea665b629a167051.png)](https://gyazo.com/b5bc5bdf46a0591bea665b629a167051)

点光源は、指定した位置から全方向に放射される光です。
拡散光と同様に、光が垂直な面に当たったときに、もっとも明るくなります。
点光源を設置するには、`pointLight()`関数を用います。
引数には三原色（R、G、B）の光の強度に加え、光源の位置（x、y、z）を設定します。

    pointLight(R, G, B, X, Y, Z);

下記を参考にコードを入力したら、Runボタンをクリックしてください。
ここでは、座標（-320, 0, 0）から光を照らしています。
光が当たる面の色が変化していることを確認してください。

{% gist naoto-github/8074878d0dabbfed29a35ad215b9e229 %}

[![https://gyazo.com/ef8efe22af4fbf1af78112324b850554](https://i.gyazo.com/ef8efe22af4fbf1af78112324b850554.png)](https://gyazo.com/ef8efe22af4fbf1af78112324b850554)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

拡散光を３方向に配置し、立方体の面を３色に塗り分けてください。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project9-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/6535851018db9c980ab931b5b14afd70](https://i.gyazo.com/6535851018db9c980ab931b5b14afd70.png)](https://gyazo.com/6535851018db9c980ab931b5b14afd70)

{% include programming_1/reference.html %}