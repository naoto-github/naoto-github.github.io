---
layout: page
title: "オブジェクト指向"
permalink: /class/programming_1/chapter8.html
top_link: false
image: "https://i.gyazo.com/f428bc557d361b917a8483c7ecdf94c1.png"
---

[![https://gyazo.com/f428bc557d361b917a8483c7ecdf94c1](https://i.gyazo.com/f428bc557d361b917a8483c7ecdf94c1.png)](https://gyazo.com/f428bc557d361b917a8483c7ecdf94c1)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingを起動して、新規にスケッチを保存しましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project8」を入力し、[保存]をクリックしましょう。
保存先に「Project8」という名前のフォルダが作成されていることを確認してください。

[![https://gyazo.com/7955c22e8904b20f5963df69dc6fd2a2](https://i.gyazo.com/7955c22e8904b20f5963df69dc6fd2a2.png)](https://gyazo.com/7955c22e8904b20f5963df69dc6fd2a2)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">オブジェクト指向

**オブジェクト指向**は大規模なプログラムを作成する際の開発者の負担を減らすための**コンセプト**です。
しかし、オブジェクト指向を正しく理解には、多くの知識を経験を要します。
そこで、この授業では、オブジェクト指向における実用的なテクニックに絞って解説します。
オブジェクト指向の詳細を学びたい場合は、河合昭男氏の「[ここから始めるオブジェクト指向（ITmediaエンタープライズ）](http://www.itmedia.co.jp/im/articles/0209/21/news001.html)」を参考にすると良いです。

オブジェクト指向の中心となるのは**クラス**と呼ばれる概念です。
これまでに使用した**String**や**PImage**もクラスに該当します。
クラスは、int型やdouble型などのプリミティブなデータ型の変数（**フィールド**）と、
幾つかの処理をまとめて実行する関数（**メソッド**）を、一つにまとめて扱うことができるという特徴があります。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">クラスの定義

ここでは、クラスを利用してウィンドウに雪を降らせるアニメーションを設定しましょう。
雪を表現するにはどんな**フィールド**や**メソッド**が必要でしょうか。

### フィールドの宣言

まずは、雪を表す**Snowクラス**を定義して、その位置を表す*x*と*y*をフィールドとして宣言します。
クラスを定義するには、「class」の文字列の後にスペースを空けて、**クラス名**を指定します（ここでは**Snow**）。
また、「{}」で括られた内部に、フィールドの宣言やメソッドの定義を記述します。
ここでは、float型の*x*と*y*を宣言しています。

	class Snow{
        float x;
        float y;
	}

下記のコードを参考に**Snow**クラスを定義してみましょう。
**setup()**関数では、Snowクラスの実体（**インスタンス**）を生成しています。
**インスタンス**の生成は、`クラス名 変数名 = new クラス名();`と記述します。
また、フィールドに値を代入したり、保存されている値を取り出すには、
`変数名.フィールド名`と記述します。
ここでは、*x*には0～640のランダムな値、*y*には0を設定します。

<!--
	Snow snow = new Snow();
	snow.x = random(0, 640);
	snow.y = 0;
-->

{% gist naoto-github/4e3467d71e51ba116ebe8bb1362d28e0 %}

### メソッドの定義

次に、雪を表示するための**disp()**メソッドを定義します。
メソッドは下記のように記述します。
**返値**とは、メソッド実行後に、呼び出し元に返す値のことを指します。
返値が不要な場合は、返値の型を**void**と表記し、**return 返値;**を省略することができます。

	返値の型 メソッド名(){
        実行する命令
        return 返値;
    }

下記のコードを参考に**disp()**メソッドを定義してみましょう。
disp()メソッドでは、白く塗りつぶした半径5の円を描いています。
また、**draw()**関数で、定義したdisp()メソッドを呼び出しています。
メソッドを呼び出すには`変数名.メソッド名()`と記述します。
プログラムの実行後に、ウィンドウ上部に白い円が描画されていることを確認してください。

{% gist naoto-github/bf58b926d64df224319c49667fad219c %}

[![https://gyazo.com/f37c615ab79fac4681a91ef173e0e4d6](https://i.gyazo.com/f37c615ab79fac4681a91ef173e0e4d6.png)](https://gyazo.com/f37c615ab79fac4681a91ef173e0e4d6)

さらに、雪が降るアニメーションを**fall()**メソッドで定義します。
fall()メソッドでは、フィールド*y*の値を1だけ増加させます。
また、**draw()**関数では、定義したfall()メソッドを呼び出すとともに、
背景を黒で塗りつぶしていることに注意してください。
下記を参考にコードを入力したら、Runボタンをクリックしてくだい。
上から下に白い円がアニメーションしていることを確認しださい。

{% gist naoto-github/6c52b30149f56c0db2a8c937c28c79d9 %}

[![https://gyazo.com/756a2cdfdf639d4bb3ee8a8eb47e1af5](https://i.gyazo.com/756a2cdfdf639d4bb3ee8a8eb47e1af5.gif)](https://gyazo.com/756a2cdfdf639d4bb3ee8a8eb47e1af5)

雪が一つでは寂しいので、**配列**を利用してたくさんの雪を降らしてみましょう。
配列を宣言するには、`データ型[] 配列名 = new データ型[要素数];`と記述します（データ型をクラスに置き換えてもOKです）。
下記のコードを参考にSnowクラスの配列**snows**を宣言してみましょう。
for文を利用して、Snowクラスのインスタンスの生成を1000回繰り返し、配列snowsに代入しています。
また、**draw()**関数では、条件式`i < (frameCount / 10)`を用いて、
10フレームに1回のペースで雪のインスタンスを新たに表示しています（**frameCount**はプログラムを実行してからウィンドウを書き換えた回数を表す特別な変数です）。

{% gist naoto-github/0b42b706c8cdb163c159fb063c1b77a7 %}

[![https://gyazo.com/1e01fa63316b69d069b22ca1a4428c9b](https://i.gyazo.com/1e01fa63316b69d069b22ca1a4428c9b.gif)](https://gyazo.com/1e01fa63316b69d069b22ca1a4428c9b)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

雪だるまを表す**SnowMan**クラスを作成し、ウィンドウ内に２体表示しなさい。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project8-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/d0e19e8d2528ca75cfd1985b47334819](https://i.gyazo.com/d0e19e8d2528ca75cfd1985b47334819.gif)](https://gyazo.com/d0e19e8d2528ca75cfd1985b47334819)

{% include programming_1/reference.html %}
