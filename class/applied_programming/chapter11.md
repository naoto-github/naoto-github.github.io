---
layout: page
title: "マウスとキーボード"
permalink: /class/applied_programming/chapter11.html
top_link: false
image: "https://i.gyazo.com/ff9782f1af234f83699046c458ec5eac.png"
---

[![https://gyazo.com/ff9782f1af234f83699046c458ec5eac](https://i.gyazo.com/ff9782f1af234f83699046c458ec5eac.png)](https://gyazo.com/ff9782f1af234f83699046c458ec5eac)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの準備

Eclipseで新規にプロジェクトを作成しましょう。
メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクトの作成」を開きます。
ここでは、プロジェクト名に”Project11”を入力ます。
また、JREは"**プロジェクト固有のJREを使用**"を選択します。
最後に、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したプロジェクトが表示されていることを確認してください。

<!--[![https://gyazo.com/92c204aaa4d46746026edba88b722ed7](https://i.gyazo.com/92c204aaa4d46746026edba88b722ed7.png)](https://gyazo.com/92c204aaa4d46746026edba88b722ed7)-->

[![https://gyazo.com/0405cfbb87a5bae71a3e33c563f79363](https://i.gyazo.com/0405cfbb87a5bae71a3e33c563f79363.png)](https://gyazo.com/0405cfbb87a5bae71a3e33c563f79363)

**Application**クラスを継承した**MyApplication**クラスを作成しましょう。
メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。 まず、名前に”MyApplication”を入力します。
次に**スーパークラス**を設定するために、[参照]ボタンから「スーパークラスの選択」を開き、
一致する項目から**javafx.application.Application**を選択して、[OK]をクリックします。
最後に[完了]をクリックしましょう。

[![https://gyazo.com/d9c737e5ac5dd58d9618be3117c73d0c](https://i.gyazo.com/d9c737e5ac5dd58d9618be3117c73d0c.png)](https://gyazo.com/d9c737e5ac5dd58d9618be3117c73d0c)

Applicationクラスの抽象メソッドである**startメソッド**をオーバーライドしておきます。
下記コードを参考に、タイトルを**Project 11**、幅を**500px**、高さを**500px**に設定しましょう。
プログラムの実行後にウィンドウが表示されることを確認してください。

{% gist naoto-github/b2b00a3eff45be2965c7 %}

[![https://gyazo.com/809f4689b12d3edb99481f2f9e12e575](https://i.gyazo.com/809f4689b12d3edb99481f2f9e12e575.png)](https://gyazo.com/809f4689b12d3edb99481f2f9e12e575)

{% include applied_programming/export.html %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">マウス・イベント

今回はマウス操作に応じてキャンバスに絵を描くことに挑戦していきましょう。
前準備として、下記のコードを参考に**Canvasクラス**をウィンドウに配置してください。
レイアウトペインとして**VBoxクラス**を利用しています。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/fed3810da487411a4246 %}

[![https://gyazo.com/c2df521649531c9264d5454d0a12f90c](https://i.gyazo.com/c2df521649531c9264d5454d0a12f90c.png)](https://gyazo.com/c2df521649531c9264d5454d0a12f90c)

キャンバス上でのマウスのクリックを検知するには、
`setOnMouseClicked()`メソッドを利用します。
このメソッドの引数には**ラムダ式**を利用して下記のように記述します。
ラムダ式の左側の*event*は**MouseEvent**クラスのインスタンスで、
マウスの状態や位置などの情報を保持しています。
一方、ラムダ式の右側の`paint(event);`はマウスがクリックされたときに呼び出されるメソッドです。

    canvas.setOnMouseClicked(event -> paint(event));

下記のコードを参考に、マウスがクリックされると、クリックされた位置に塗りつぶしの円を描いてみましょう（色はデフォルトの黒）。
円を描くコードは`paint(event)`メソッドとして定義していることに注意してください。
マウスの位置はMouseEventクラスの`getX()`メソッドと`getY()`メソッドで取得しています。
プログラムの実行後に、キャンバスをクリックすると、円が描かれることに確認してください。

{% gist naoto-github/ee392067c12d24493433 %}

<!--[![https://gyazo.com/1d3a628d1aa9264f0abcdee6d631d204](https://i.gyazo.com/1d3a628d1aa9264f0abcdee6d631d204.gif)](https://gyazo.com/1d3a628d1aa9264f0abcdee6d631d204)-->

[![https://gyazo.com/61dc300fd33ee30213c075a48c552d3d](https://i.gyazo.com/61dc300fd33ee30213c075a48c552d3d.gif)](https://gyazo.com/61dc300fd33ee30213c075a48c552d3d)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">キーボード・イベント

ウィンドウ上でのマウスのクリックを検知するには、`setOnKeyPressed()`メソッドを利用します。
このメソッドの引数には**ラムダ式**を利用して下記のように記述します。
ラムダ式の左側の*event*は**KeyEvent**クラスのインスタンスで、
押されたキーの状態や種類などの情報を保持しています。
一方、ラムダ式の右側の`change(event)`はキーが押されたときに呼び出されるメソッドです。

    scene.setOnKeyPressed(event -> change(event));

下記のコードを参考に、塗りつぶしの色を、F1を押すと**赤**、F2を押すと**青**、F3を押すと**黒**に切り替えられるようにしましょう。
押されたキーの種類は列挙型**KeyCode**で表され、`getCode()`メソッドで取得することができます（例、F1キーは**F1**という表記になる）。
`setFill()`メソッドを利用して、キーがF1のとき**Color.RED**、F2のとき**Color.BLUE**、F3のとき**Color.BLACK**を設定します。
プログラムの実行後に、塗りつぶしの色を切り替えられることを確認してください。

{% gist naoto-github/fe377f53f5b397e20d14 %}

<!--[![https://gyazo.com/0528631ecff5c67e071ef51c18a87e08](https://i.gyazo.com/0528631ecff5c67e071ef51c18a87e08.gif)](https://gyazo.com/0528631ecff5c67e071ef51c18a87e08)-->

[![https://gyazo.com/0f82fc6d0f1c1f9d7bf09c98beac236b](https://i.gyazo.com/0f82fc6d0f1c1f9d7bf09c98beac236b.gif)](https://gyazo.com/0f82fc6d0f1c1f9d7bf09c98beac236b)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

描く図形の形を、F4を押すと**正方形**、F5を押すと**円**に、切り替えられるようにしましょう（F1、F2、F3の色の切り替えも有効のまま）。
課題が完成したら、作成したプロジェクトを実行可能JARファイルの形式でファイルに保存（エクスポート）してください。

<!--[![https://gyazo.com/45e2e3b936116e60abb65889e0c6129c](https://i.gyazo.com/45e2e3b936116e60abb65889e0c6129c.gif)](https://gyazo.com/45e2e3b936116e60abb65889e0c6129c)-->

[![https://gyazo.com/c20401ccdf46eb69dde74d8ca37f12f8](https://i.gyazo.com/c20401ccdf46eb69dde74d8ca37f12f8.gif)](https://gyazo.com/c20401ccdf46eb69dde74d8ca37f12f8)

{% include applied_programming/reference.html %}