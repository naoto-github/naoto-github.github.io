---
layout: page
title: "JavaFX①入力フィールドとボタン"
permalink: /class/applied_programming/chapter9.html
top_link: false
image: "https://i.gyazo.com/f8e326a614ff2469eabf4a0ce1761d3d.png"
---

[![https://gyazo.com/f8e326a614ff2469eabf4a0ce1761d3d](https://i.gyazo.com/f8e326a614ff2469eabf4a0ce1761d3d.png)](https://gyazo.com/f8e326a614ff2469eabf4a0ce1761d3d)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの準備

Eclipseで新規にプロジェクトを作成しましょう。
メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクトの作成」を開きます。
ここでは、プロジェクト名に”Project9”を入力します。
また、JREは"**プロジェクト固有のJREを使用**"を選択します。
最後に、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したプロジェクトが表示されていることを確認してください。

<!--[![https://gyazo.com/755c69e202b26b04368d53b8ae935ae9](https://i.gyazo.com/755c69e202b26b04368d53b8ae935ae9.png)](https://gyazo.com/755c69e202b26b04368d53b8ae935ae9)-->

[![https://gyazo.com/d33e69582bbb382b7ce8bd738842e80a](https://i.gyazo.com/d33e69582bbb382b7ce8bd738842e80a.png)](https://gyazo.com/d33e69582bbb382b7ce8bd738842e80a)

本日取り上げるの**JavaFX**は、Eclipseの現バージョン（Mars）では、
「**使用すべきではない制限されたAPI**」に指定されているため、
事前に、**JavaFX**の利用を許可する必要があります（将来的には指定から取り除かれると思います）。
メニューから[ウィンドウ]-[設定]をクリックして、「設定」のダイアログを開きます。
さらに、ダイアログから[Java]-[コンパイラー]-[エラー/警告]を選択します。
ここで、「使用すべきではないAPI」、「禁止された参照」、「阻止された参照」の３カ所を**無視**に設定してください。

[![https://gyazo.com/545efc79168eb636288567424290a32a](https://i.gyazo.com/545efc79168eb636288567424290a32a.png)](https://gyazo.com/545efc79168eb636288567424290a32a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">JavaFXとは

従来、Javaにおける**GUI（Graphical User Interface）**は、
**AWT（Abstract Window Toolkit）**や**Swing**と呼ばれるGUIツールキットを利用するのが標準でした。
一方、[JavaFX](http://www.oracle.com/technetwork/jp/java/javafx/overview/index.html)は2014年にリリースされたJava 8に統合された新しいGUIツールキットです。
AWTやSwingに比べ、より洗練されたGUIアプリケーションの制作が可能です。
それでは、このJavaFXを利用したGUIプログラミングを学習していきましょう。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ウィンドウの表示

JavaFXを利用したGUIアプリケーションを作成するには、
**javafx.applicationパッケージ**に含まれる**Applicationクラス**を継承することから始めます。
**パッケージ**とはクラスをグループ分けして管理するためのフォルダのようなものです。
パッケージ名も含めたクラス名は**javafx.application.Application**と表記します。

まずは、**Application**クラスを継承した**MyApplication**クラスを作成しましょう。
メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。 まず、名前に”MyApplication”を入力します。
次に**スーパークラス**を設定するために、[参照]ボタンから「スーパークラスの選択」を開き、
一致する項目から**javafx.application.Application**を選択して、[OK]をクリックします。
最後に[完了]をクリックしましょう。

[![https://gyazo.com/4c10ac55931f4dca7915c595c682c4a5](https://i.gyazo.com/4c10ac55931f4dca7915c595c682c4a5.png)](https://gyazo.com/4c10ac55931f4dca7915c595c682c4a5)

[![https://gyazo.com/2a63060685a24d743bb5b36de88083d3](https://i.gyazo.com/2a63060685a24d743bb5b36de88083d3.png)](https://gyazo.com/2a63060685a24d743bb5b36de88083d3)

MyApplicationクラスでは、Applicationクラスの抽象メソッドである
**startメソッド**をオーバーライドする必要があります。
また、他のパッケージのクラスを利用する場合は、ソースコードの先頭に**import**という表記を用いて、`import javafx.application.Application;`のように記述します（Eclipseが自動的に補完してくれるはず）。

{% gist naoto-github/9f9ec4e730fc1d2c1821 %}

startメソッドの引数である**Stageクラス**がウィンドウを表しています。
下記コードを参考にStageクラスの**setTitleメソッド**、**setWidthメソッド**、**setHeightメソッド**を利用して、タイトルを**Project 9**、幅を**320px**、高さを**240px**に設定しましょう。
また、作成したウィンドウを表示するには**showメソッド**を利用します。
プログラムの実行後にウィンドウが表示されることを確認してください。

{% gist naoto-github/38daf4808cc3d042e97c %}

<!--JavaFXはmainメソッドが不要という特徴があるため、
このプログラムを実行するには**実行の構成**の設定が必要です。
プロジェクトで右クリックして[実行]-[実行の構成]をクリックして、「実行の構成」を開きます。
ここで、**メイン・クラス**にMyApplicationを入力します。
プログラムの実行後にウィンドウが表示されることを確認してください。-->

<!--[![https://gyazo.com/cdb59291518f232c459d75114220c8fe](https://i.gyazo.com/cdb59291518f232c459d75114220c8fe.png)](https://gyazo.com/cdb59291518f232c459d75114220c8fe)-->

[![https://gyazo.com/2f7607d6c08c3bf8615117eac4051ffc](https://i.gyazo.com/2f7607d6c08c3bf8615117eac4051ffc.png)](https://gyazo.com/2f7607d6c08c3bf8615117eac4051ffc)

{% include applied_programming/export.html %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">テキストフィールド

**テキストフィールド**をウィンドウに設置してみましょう。
テキストフィールドとは、ユーザが数値や文字列を入力できる1行のフィールドのことです。
テキストフィールドや後述するボタンなど、ウィンドウに配置可能な部品を**コントロール**と呼びます。

入力が空のテキストフィールドを作成するには、
下記のように**TextField**クラスをインスタンス化します。

    TextField tf = new TextField();

作成したテキストフィールド*tf*のウィンドウ内での設置位置を決めるためには、
**レイアウトペイン**を利用します。
レイアウトペインにはVBox、HBoxなど様々な種類があり、
それぞれレイアウト方法が異なります。
ここでは、コントロールを垂直方向に並べて配置する**VBox**を利用します。
下記のように**VBoxクラス**をインスタンス化し、
**getChildren().add()**メソッドでコントロールを追加します。

    VBox vbox = new VBox();
    vbox.getChildren().add(tf);

作成したレイアウトペイン*vbox*をウィンドウに追加するには、
*vbox*を引数に**Sceneクラス**のインスタンスを作成します。
さらに、Stageクラスの**setScene()**メソッドに、
**Sceneクラス**のインスタンスを引数として渡します。

    Scene scene = new Scene(vbox);
    primaryStage.setScene(scene);

下記のコードを参考にウィンドウにテキストフィールドを追加してみましょう。
*tf*、*vbox*、*scene*はフィールドとして宣言していることに注意してください。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/d6280c4b00733aa86c73 %}

[![https://gyazo.com/7b130c7c5ed47fd4913cfba740fcfaa3](https://i.gyazo.com/7b130c7c5ed47fd4913cfba740fcfaa3.png)](https://gyazo.com/7b130c7c5ed47fd4913cfba740fcfaa3)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ボタン

**ボタン**をウィンドウに設置してみましょう。
ユーザがボタンをクリックしたタイミングで、何らかの処理を行うことが可能です。
ここではボタンを押すとテキストフィールドに入力されている数値を2倍にしてみます。

ボタンを作成するには、
下記のように**Button**クラスをインスタンス化します。
ボタンに表示する文字列を”2倍する”に設定しています。

    Button button = new Button("2倍する");

作成したボタン*button*をレイアウトペイン*vbox*に追加します。

    vbox.getChildren().add(button);

下記のコードを参考にウィンドウにボタンを追加してみましょう。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/52b99c188c19e279f792 %}

[![https://gyazo.com/641a97939249db02cbb704a1cd6f3013](https://i.gyazo.com/641a97939249db02cbb704a1cd6f3013.png)](https://gyazo.com/641a97939249db02cbb704a1cd6f3013)

次に、ボタンがクリックされたときの動作を定義します。
Buttonクラスの**setOnMouseClicked()メソッド**に対して、**ラムダ式**という記法を用いて、
下記のように引数を記述します（ラムダ式の詳細に関しては割愛します。）。
これで、ボタンがクリックされたタイミングで**x2メソッド**が呼びだされます。

    button.setOnMouseClicked(event -> x2());

最後に、テキストフィールドに入力されている数値を2倍にする**x2メソッド**を定義します。
テキストフィールドに入力されている文字列を取得するには**getText()メソッド**、
一方、テキストフィールドに文字列を設定するには**setText()メソッド**を利用します。

    public void x2(){
        int value = Integer.parseInt(tf.getText());
        tf.setText(Integer.toString(value * 2));
    }

下記のコードを参考にボタンがクリックされたときの処理を記述してください。
プログラムの実行後に表示されるウィンドウを確認してください。

{% gist naoto-github/e48f9fcfd44df9de6310 %}

[![https://gyazo.com/50da434d6d52f7b704d91fa2f5f695fd](https://i.gyazo.com/50da434d6d52f7b704d91fa2f5f695fd.gif)](https://gyazo.com/50da434d6d52f7b704d91fa2f5f695fd)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

テキストフィールドに入力されている数値を3倍にするボタンを作成してください。
数値を3倍にするメソッドは**x3()**としてください。
課題が完成したら、作成したプロジェクトを実行可能JARファイルの形式でファイルに保存（エクスポート）してください。

[![https://gyazo.com/dc5d80c38023e5d28ab7f3125dd3b963](https://i.gyazo.com/dc5d80c38023e5d28ab7f3125dd3b963.gif)](https://gyazo.com/dc5d80c38023e5d28ab7f3125dd3b963)

{% include applied_programming/reference.html %}