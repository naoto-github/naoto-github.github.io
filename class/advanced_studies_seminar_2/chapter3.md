---
layout: page
title: "R言語によるデータの視覚化"
permalink: /class/advanced_studies_seminar_2/chapter3.html
top_link: false
image: "https://i.gyazo.com/a6d9db34eac9b4ef35ad5982432c68c2.png"
---

[![https://gyazo.com/a6d9db34eac9b4ef35ad5982432c68c2](https://i.gyazo.com/a6d9db34eac9b4ef35ad5982432c68c2.png)](https://gyazo.com/a6d9db34eac9b4ef35ad5982432c68c2)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">データの可視化

データの特徴を理解するには、グラフなどを利用してデータを可視化することが重要です。
R言語には散布図やヒストグラムなどで可視化するための機能がありますが、
ここでは、よりリッチな可視化を実現するために、拡張パッケージの**ggplot2**を採用します。
**ggplot2**には、簡単に素早く描画する**qplot**関数と、複雑な描画が可能な**ggplot関数**があります。
今回は、**qplot**関数に注目します。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スクリプトの作成

コードを入力し保存するための**スクリプト**を作成しましょう。
[ファイル]-[新しいスクリプト]をクリックし、**Rエディタ**を表示します。
次に、[ファイル]-[保存]をクリックして、スクリプトを保存します。
このとき、ファイル名は**chapter3**としてください。
また、ファイルの保存場所と作業ディレクトリを**デスクトップ**に変更しておきます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ggplot2のインストール

まずは、**ggplot2**パッケージをインストールしましょう。
ツールバーから[パッケージ]-[パッケージの読み込み]をクリックし、
パッケージの一覧から**ggplot2**を選択します。
これで対応するパッケージがダウンロードされます。

[![https://gyazo.com/1d97ed56538efccceb042688c397d31c](https://i.gyazo.com/1d97ed56538efccceb042688c397d31c.png)](https://gyazo.com/1d97ed56538efccceb042688c397d31c)

このパッケージを利用可能な状態にするには、
**library**関数を利用します。
ここでは、スクリプトに下記のように記述しておきます。

    library(ggplot2)

これで、**ggplot2**を利用する準備が整いました。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ヒストグラム

まず、**ヒストグラム**を描いてみましょう。
対象となるデータフレームは下記のように生成しましょう。
ここで、**data.frame**は、引数のベクトルを列とするデータフレームを生成する関数です。
また、**value** は列名を表しています。

    y <- c(1,1,2,3,5,6,6,6,7,9)
    d1 <- data.frame(value=y)

プロンプトでデータフレーム**d1**の要素を確認します。
要素はvalueの列だけで構成された１次元のデータとなります。

    > d1
       value
    1      1
    2      1
    3      2
    4      3
    5      5
    6      6
    7      6
    8      6
    9      7
    10     9

**qplot()**関数を利用して、このデータフレームのヒストグラムを描きます。
引数には、**Y軸の列名**、**data=データフレーム名** を与えます。
ここでは、下記のように**value**、**data=d1** が引数となります。

    > qplot(value,data=d1)

実行すると下記のようなヒストグラムが表示されます。

[![https://gyazo.com/fd3d7958421f4e417cbd5b0813ad8856](https://i.gyazo.com/fd3d7958421f4e417cbd5b0813ad8856.png)](https://gyazo.com/fd3d7958421f4e417cbd5b0813ad8856)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">散布図

次に、**散布図**を描いてみましょう。
対象となるデータフレームは下記のように生成しましょう（**y**は前節のベクトルを利用する）。
ここで、**data.frame**は、引数のベクトルを列とするデータフレームを生成する関数です。
また、**id**、**value** は列名を表しています。

    x <- c(1,2,3,4,5,6,7,8,9,10)
    d2 <- data.frame(id=x,value=y)

プロンプトでデータフレーム**d2**の要素を確認します。
要素はidとvalueのペアで構成された2次元のデータとなります。

    > d2
       id value
    1   1     1
    2   2     1
    3   3     2
    4   4     3
    5   5     5
    6   6     6
    7   7     6
    8   8     6
    9   9     7
    10 10     9

**qplot()**関数を利用して、このデータフレームの散布図を描きます。
引数には、**X軸の列名**、**Y軸の列名**、**data=データフレーム名** を与えます。
ここでは、下記のように**id**、**value**、**data=d** が引数となります。

    > qplot(id,value,data=d2)

実行すると下記のような散布図が表示されます。

[![https://gyazo.com/f037433ece0d39e0713ed76fb8aa1e1a](https://i.gyazo.com/f037433ece0d39e0713ed76fb8aa1e1a.png)](https://gyazo.com/f037433ece0d39e0713ed76fb8aa1e1a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">折れ線グラフ

**折れ線グラフ**を描いてみましょう。
対象となるデータは散布図と同じ**d2**を用います。
**qplot()** 関数には、散布図の引数に加えて **geom="line"** を記述します。

    > qplot(id,value,data=d2,geom="line")

実行すると下記のような折れ線グラフが表示されます。

[![https://gyazo.com/e8f5ee4b1df5b94e55e61bd2baece210](https://i.gyazo.com/e8f5ee4b1df5b94e55e61bd2baece210.png)](https://gyazo.com/e8f5ee4b1df5b94e55e61bd2baece210)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

組み込みのデータフレームである**iris**の
**Sepal.Length** と **Sepal.Width** の2次元のデータで散布図を描いてください。
このとき、引数に**color=Species**を加え、種類ごとに色分けすること。
この **アイリス（iris）**は、セトナ(setosa)、バーシクル(versicolor)、 
バージニカ(virginica)という3種類の**あやめ**のデータです。
ちなみに、**Sepal.Length** は **がく片長** 、**Sepal.Width** は **がく片幅**を意味しています。
ソースは**chapter3.R**に記述し、コンソールの出力結果、グラフ（散布図）の画像ファイル、**chapter3.R** を提出すること。

[![https://gyazo.com/ed186be8efaf274c8d29755b28f2f7f2](https://i.gyazo.com/ed186be8efaf274c8d29755b28f2f7f2.png)](https://gyazo.com/ed186be8efaf274c8d29755b28f2f7f2)

{% include advanced_studies_seminar_2/reference.html %}