---
layout: page
title: "Javaの開発環境の確認"
permalink: /class/applied_programming/chapter1.html
top_link: false
image: "https://i.gyazo.com/08d13db0b4afc43d33278c69d3607eef.png"
---

[![https://gyazo.com/08d13db0b4afc43d33278c69d3607eef](https://i.gyazo.com/08d13db0b4afc43d33278c69d3607eef.png)](https://gyazo.com/08d13db0b4afc43d33278c69d3607eef)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Javaとは

**Java**はサン・マイクロシステムズが1990年に開発した**オブジェクト指向**のプログラミング言語です。
サン・マイクロシステムズは2010年にオラクルに吸収合併されたため、
現在、Javaは[オラクル](http://www.oracle.com/jp/index.html)によって開発・提供されており、
無料で[java.com](http://java.com/ja/)からダウンロードすることが可能です。
Javaは下記の特徴を備えており、さまざまな分野で広く利用されています。

- オブジェクト指向であり、大規模なチームでの開発にも向いている
- ウィンドウズやマッキントッシュなどのプラットフォームに依存しない
- C、C++の文法を引き継いでおり、標準的で学びやすい

第1の特徴の「オブジェクト指向」という考え方は、Javaの重要なキーワードですが、
プログラミング初心者にはちょっと難しい概念かもしれまん。
取り敢えず「**もの（オブジェクト）**」という考え方を中心にした開発手法と覚えておいてください。
オブジェクト指向に関しては第8回で詳しく説明します。

第2の特徴は**JVM（Java Virtual Machine）**という方法で実現しています。
一般にJavaで開発されたプログラムは**バイトコード**と呼ばれる独自の形式で配布されています。
このバイトコードを実行するためには事前にJVMをウィンドウズやマッキントッシュなどのPCにインストールする必要があります。
つまり、どんなプラットフォームでも、JVMさえインストールしておけば、Javaのプログラムは実行可能というわけです。

第3の特徴は、Javaがオブジェクト指向を実現しつつ、C++よりもシンプルであることを目指して設計されたことが理由です。
このため、JavaはCプログラマーには馴染みやすく、新人研修など教育向けのプログラミング言語としても広く利用されています。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Javaの開発環境

Javaのポピュラーな開発環境として[Eclipse](https://eclipse.org/)があります。
EclipseはIBMによって開発され、現在はオープンソースとして開発が継続されています。
プログラミング初心者が開発環境を整えるには、日本語化プラグインを導入したパッケージ[Pleiades](https://mergedoc.osdn.jp/)を利用するのがお薦めです。
Eclipseにはバージョン管理システムの[CVS](http://savannah.nongnu.org/project/memberlist.php?detailed=1&group=cvs)、[Git](http://git-scm.com/)なども組み込まれているため、
チームで効率的にソースコードを管理することも可能です。

Eclipseを起動すると下記のメイン画面が表示されます。
Eclipseのメイン画面はビューという区画で区切られています。
様々な機能を備えたビューがありますが、この授業で主に利用するのは「**パッケージ・エクスプローラー**」「**エディタ**」「**問題・コンソール**」の3つです。
パッケージ・エクスプローラーは、プロジェクトに含まれるファイルやフォルダを階層的な構造で管理するためのビューです。
エディタは、Javaのソースコードを編集・保存するためのビューです。
問題・コンソールは、コンパイル時に発生したエラーを確認したり、プログラムの実行結果を確認するためのビューです。

[![https://gyazo.com/491226bc463c33414526f57e64d8872f](https://i.gyazo.com/491226bc463c33414526f57e64d8872f.png)](https://gyazo.com/491226bc463c33414526f57e64d8872f)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの作成

Eclipseでは「**プロジェクト**」という単位でプログラムを管理します。
プロジェクトを作成するには、メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクト」を開きます。
ここでは、プロジェクト名に"Project1"を入力して、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したプロジェクトが表示されていることを確認してください。
プロジェクト内に生成された"src"フォルダに、Javaのソースファイルは保存されます。

[![https://gyazo.com/183809e44b1791fb64d70586e200ccbe](https://i.gyazo.com/183809e44b1791fb64d70586e200ccbe.png)](https://gyazo.com/183809e44b1791fb64d70586e200ccbe)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ソースファイルの作成

作成したプロジェクトにJavaソースファイルを作成します。
Javaのプログラムは**クラス**という単位で構成され、ファイル名は"クラス名.java"となります。
Javaソースファイルを作成するには、メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。
ここでは、名前に"MyClass"を入力し、public static void main(String[] args)(V)にチェックを入れ、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したソースファイルが表示されていることを確認してください。

[![https://gyazo.com/085bcc439cc2a74768e3338f738b88c3](https://i.gyazo.com/085bcc439cc2a74768e3338f738b88c3.png)](https://gyazo.com/085bcc439cc2a74768e3338f738b88c3)

エディタには作成した下記のソースコードが表示されています。
ソースコードの詳しい説明はここでは省略します。

{% gist naoto-github/03479ecc231329c85b07 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">文字列の出力

文字列を出力するには`System.out.println()`という命令文を用います。
ここでは、「Hello World!」という文字列をコンソールに出力してみます。
下記を参考にコードを入力したら、メニューから[実行]-[実行]をクリックしてください（ショートカットは「Ctr+F11」）。
コンソールに「Hello World!」が出力されていることを確認してください。

{% gist naoto-github/72f025cd67d7c2ffc3d8 %}

[![https://gyazo.com/50d36ffbe1c5f6c8a633e1d5c11e5ac6](https://i.gyazo.com/50d36ffbe1c5f6c8a633e1d5c11e5ac6.png)](https://gyazo.com/50d36ffbe1c5f6c8a633e1d5c11e5ac6)

もし入力したコードにエラーがある場合は、エラーの詳細を確認することができます。
例えば、下記のコードの場合は「文字列リテラルがダブル・クォートによって正しく閉じられていません」と表示されます。

{% gist naoto-github/64ef8235b48cf444b69f %}

[![https://gyazo.com/a660428c485fa7634b6f1c8c7144cab5](https://i.gyazo.com/a660428c485fa7634b6f1c8c7144cab5.png)](https://gyazo.com/a660428c485fa7634b6f1c8c7144cab5)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

`System.out.println()`を使用して、「本日の授業の感想」をコンソールに出力させてください。
課題が完成したら、作成したプロジェクトを**実行可能JARファイル**という形式でファイルに保存（エクスポート）します。
実行可能JARファイルを作成するには、メニューから[ファイル]-[エクスポート]-[実行可能JARファイル]をクリックして、「実行可能JARファイル・エクスポート」を開きます。
起動構成が"Project1"となっていることを確認した上で、エクスポート先の参照ボタンから保存ファイル名として"Project1.jar"を入力し、[完了]をクリックします。
エクスポート先のフォルダに「Project1.jar」というファイルが作成されていることを確認してください。
この実行可能JARファイルは、コマンド・プロンプトから実行して出力を確認することができます。
コマンド・プロンプトを起動して、`>java -jar C:\Users\Naoto\Desktop\Project1.jar`と入力し、
画面に「Hello World!」が出力されることを確認してください（実行可能JARファイルまでのパスは適宜変更する必要があります）。

[![https://gyazo.com/b24b5b928cca904c0376747efc5ca6d2](https://i.gyazo.com/b24b5b928cca904c0376747efc5ca6d2.png)](https://gyazo.com/b24b5b928cca904c0376747efc5ca6d2)

[![https://gyazo.com/a108dd71b26f00a9e525283b56b291db](https://i.gyazo.com/a108dd71b26f00a9e525283b56b291db.png)](https://gyazo.com/a108dd71b26f00a9e525283b56b291db)

{% include applied_programming/reference.html %}