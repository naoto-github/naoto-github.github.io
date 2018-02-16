---
layout: page
title: "乱数生成とキーボート入力"
permalink: /class/applied_programming/chapter5.html
top_link: false
image: "https://i.gyazo.com/1563cf6f8a35150975b9a1e09f19ade7.png"
---
[![https://gyazo.com/1563cf6f8a35150975b9a1e09f19ade7](https://i.gyazo.com/1563cf6f8a35150975b9a1e09f19ade7.png)](https://gyazo.com/1563cf6f8a35150975b9a1e09f19ade7)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの準備

Eclipseで新規にプロジェクトを作成しましょう。
メニューから[ファイル]-[新規]-[Javaプロジェクト]をクリックして、「新規Javaプロジェクトの作成」を開きます。
ここでは、プロジェクト名に”Project5”を入力して、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したプロジェクトが表示されていることを確認してください。

[![https://gyazo.com/0c72995508d93100e419ab4beec92c5d](https://i.gyazo.com/0c72995508d93100e419ab4beec92c5d.png)](https://gyazo.com/0c72995508d93100e419ab4beec92c5d)

続いてソースファイルを作成しましょう。
メニューから[ファイル]-[新規]-[クラス]をクリックして、「新規Javaクラス」を開きます。
ここでは、名前に”MyClass”を入力し、public static void main(String[] args)(V)にチェックを入れ、[完了]をクリックしましょう。
パッケージ・エクスプローラに作成したソースファイルが表示されていることを確認してください。

[![https://gyazo.com/cf7ce1eb13d63d2e7a054d0464450fd0](https://i.gyazo.com/cf7ce1eb13d63d2e7a054d0464450fd0.png)](https://gyazo.com/cf7ce1eb13d63d2e7a054d0464450fd0)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">乱数生成

サイコロの出た目のように規則性がなく予測不能な数値のことを**乱数**と呼びます。
コンピュータではその性質から完全な乱数を生成することは出来ないため、
**擬似乱数**と呼ばれる乱数とほぼ同じ特徴を持った値を生成します。
0以上、かつ、n未満を条件とした整数の乱数を生成するには下記のように記述します。
**Random**はJavaのライブラリに含まれる**クラス**の1つですが詳細は省略します。

    Random r = new Random();
    int x = r.nextInt(n);

下記のコードを参考に、int型の変数*x*を宣言し、0～2までの乱数を代入してみましょう。
プログラムの実行後に、コンソールの出力結果を確認してください。
実行毎に出力される値が変化することが分かります。

{% gist naoto-github/2744c6f4f4e7f598ae90 %}

乱数を利用して**おみくじ**を作成してみましょう。
下記のコードを参考に、変数*x*の値に応じて、ランダムに”大吉”、”吉”、”凶”をコンソールに出力させてみましょう。
プログラムの実行後に、コンソールの出力結果を確認してください。

{% gist naoto-github/8b742f7aced0faae71cf %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">キーボード入力

ユーザから入力を受け取る方法の1つが**キーボード**です。
キーボードから**文字列**を受け取るには下記のように記述します。
**Scanner**はJavaのライブラリに含まれる**クラス**の1つですが詳細は省略します。

    Scanner s = new Scanner(System.in);
    String text = s.nextLine();
    s.close();

下記のコードを参考に、変数*name*にキーボードから入力した文字列を代入してみましょう。
ここで、`System.out.print()`は、`System.out.println()`と同様に文字列をコンソールに出力する命令ですが、改行しないという点が異なります。
また、コンソールへの出力の際には、文字列を連結するための演算子「**+**」を利用していることに注意が必要です。

{% gist naoto-github/162e12ae242ec52de078 %}

キーボードから**整数**を受け取るには下記のように記述します。

    Scanner s = new Scanner(System.in);
    int number = s.nextInt();
    s.close();

下記のコードを参考に、変数*age*にキーボードから入力した整数を代入してみましょう。
**Scannerの宣言**や、**s.close();**は一度しか記述しないことに注意してください。

{% gist naoto-github/e16c069abbfa0ab0beda %}

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

下記のコードを参考に**ハイ＆ロー**を実装してみましょう。
ハイ＆ローはトランプゲームの1つで、ディーラーとプレイヤーに1枚ずつカードを配り、
プレイヤーのカードの数字が大きいか（**H**）小さいか（**L**）を当てるゲームです。
ここで「**//**」で始まる行は**コメント**です。
コメントは、ソースコードを読みやすくするための解説文として用いられ、プログラムとして実行されることはありません。
課題が完成したら、作成したプロジェクトを**実行可能JARファイル**の形式でファイルに保存（エクスポート）してください。

{% gist naoto-github/0b320d338872bdb85949 %}

{% include applied_programming/reference.html %}