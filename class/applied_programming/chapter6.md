---
layout: page
title: "ファイル入出力"
permalink: /class/applied_programming/chapter6.html
top_link: false
image: "https://i.gyazo.com/e3649524c7926db63267e4b9a60fb113.png"
---

[![https://gyazo.com/e3649524c7926db63267e4b9a60fb113](https://i.gyazo.com/e3649524c7926db63267e4b9a60fb113.png)](https://gyazo.com/e3649524c7926db63267e4b9a60fb113)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの準備

Eclipseで新規にプロジェクトを作成しましょう。
メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクトの作成」を開きます。
ここでは、プロジェクト名に”Project6”を入力して、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したプロジェクトが表示されていることを確認してください。

[![https://gyazo.com/8b3ed6e20885121941e7c8e17cb06a81](https://i.gyazo.com/8b3ed6e20885121941e7c8e17cb06a81.png)](https://gyazo.com/8b3ed6e20885121941e7c8e17cb06a81)

続いてソースファイルを作成しましょう。
メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。
ここでは、名前に”MyClass”を入力し、public static void main(String[] args)(V)にチェックを入れ、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したソースファイルが表示されていることを確認してください。

[![https://gyazo.com/a164f3c6c1da7bc9b5047e2c0b9a431a](https://i.gyazo.com/a164f3c6c1da7bc9b5047e2c0b9a431a.png)](https://gyazo.com/a164f3c6c1da7bc9b5047e2c0b9a431a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ストリーム

プログラムからファイルに保存されているデータを「読み込む」ことや「書き込む」ことができます。
ファイルに何かしらの操作を行う場合は、**ストリーム**という仕組みを利用します。
ストリームとは、「データの流れ」を意味しており、水道管の中を水が流れる様子に似ています。
ファイルに蛇口を取り付けて、その蛇口を捻ると、ファイルに保存されているデータが少しずつ流れてくるイメージです。
ここでは、10人の身長と体重が保存された[ファイル](measure.csv)からデータを読み込んでみましょう。
データは氏名、身長[cm]、体重[kg]で構成され、それぞれ「,（カンマ）」で区切られていることに注意してください。
このようにカンマで区切られたファイルをCSV（Comma-Separated Values）形式と呼びます。
[ファイル](measure.csv)をダウンロードしたら、Eclipseのプロジェクトの中にコピーしておいてください。

{% gist naoto-github/aeebc1a9011f4f07e007 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ファイルの読み込み

**measure.csv**から文字列データを読み込むには下記のように記述します。
ファイルの読み込みには**FileReader**クラスと**BufferedReader**クラスを利用しますが、
ここではファイルに取り付ける蛇口が**FileReader**、
蛇口から流れてくるホースの役割が**BufferedReader**クラスと考えてください。
`line=br.readLine()`でファイルから1行ずつ読み込み、`System.out.println(line)`でコンソール出力しています。
ファイルの終端に到達すると、`readLine()`は**null**という値を返すため、
while文でlineが**null**になるまで、ファイルからの読み込みを繰り返しています。

{% gist naoto-github/b9b8b615cfb89b1564c2 %}

実は上記のコードだけではエラーが残ったままです。
このエラーを取り除くには**例外処理**が必要です。
**例外**とはプログラムの実行中に発生する想定外の事態を意味しており、
例えば「対象のファイルが存在しない」「空っぽ（null）の変数を利用しようとした」などの状態が該当します。
ファイル読込に利用する**FileReader**と**BufferedReader**はこの例外処理が必要なクラスです。
例外処理は下記のように、例外の発生の可能性のある命令を`try{}`で囲み、例外発生時の命令を`catch(例外の種類){}`に記述します。

    try{
    	実行する命令
    }catch(例外の種類){
    	例外発生時に実行する命令
    }

下記のコードを参考に例外処理を施して**measure.csv**から文字列データを読み込んでみましょう。
ここで、`e.printStackTrace();`は例外の原因を突き止めるために、例外に関する情報を遡って表示する命令です。
また、`IOException`は入出力に関する例外を意味しています。
プログラムの実行後に、コンソールの出力結果を確認してください。

{% gist naoto-github/7c696252d8f6a1a8d2c9 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">CSV形式の処理

前述したようにCSV形式のファイルは「,（カンマ）」で区切られています。
カンマで区切られた文字列（トークン）を取り出すには**StringTokenizer**というクラスを利用します。
下記のコードを参考にトークン毎に取り出して、コンソールに出力してみましょう。
ここで、`new StringTokenizer(line, ",")`は、
変数lineに代入されている文字列を「,（カンマ）」で分割して取得することを表しています。
また、身長と体重は整数のため、`Integer.parseInt(st.nextToken())`を用いて、
String型からint型に変換しています。
プログラムの実行後に、コンソールの出力結果を確認してください。

{% gist naoto-github/5d813f7cbb04d34b6989 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ファイルの書き込み

読み込んだ身長と体重を基にBMI指数を計算して、**bmi.csv**に書き込んでみましょう。
BMI指数は$$BMI=体重[kg]/身長[m]^2$$で求めることができます。
下記のコードを参考に、**bmi.csv**に文字列データを書き込んでみましょう。
ファイルの書き込みには**FileWriter**クラスと**BufferedWriter**クラスを利用します。
`br.write(name + "," + bmi + "\n")`で名前と求めたBMI指数をCSV形式で書き込んでいます。
ここで、`(double)height`はint型の変数*height*をdouble型に変換することを意味しています。
プログラムの実行後に、コンソールの出力結果と、
作成された**bmi.csv**にBMI指数が記録されていることを確認してください。

{% gist naoto-github/ecf0559a101ad48753c2 %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

下記の表を参考に、BMI指数から「低体重」「普通体重」「肥満」のいずれかを判定し、、**bmi.csv**に書き込んでください。
ファイルにはカンマ区切りで、**名前**、**BMI指数**、**判定**の順番に出力してください。
課題が完成したら、作成したプロジェクトを**実行可能JARファイル**の形式でファイルに保存（エクスポート）してください。

|BMI指数|判定|
|-|-|
|18.5未満|低体重|
|18.5以上、25未満|普通体重|
|25以上|肥満|

{% include applied_programming/reference.html %}