---
layout: page
title: "相関係数"
permalink: /class/advanced_studies_seminar_2/chapter5.html
top_link: false
image: "https://i.gyazo.com/ed1e1e1171cb317826ed9b4ed01e75e3.png"
---

[![https://gyazo.com/ed1e1e1171cb317826ed9b4ed01e75e3](https://i.gyazo.com/ed1e1e1171cb317826ed9b4ed01e75e3.png)](https://gyazo.com/ed1e1e1171cb317826ed9b4ed01e75e3)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">相関分析

**相関分析**とは、2種類のデータの関係性を測るための方法を指します。
例えば、夏の熱い日には、アイスクリームがよく売れるとします。
このとき、**温度**と、**アイスクリームの売上**には相関があると言えます。
今回は、このようなデータの相関を調べるに**共分散**と**相関係数**を学びましょう。
対象のデータは、前回と同じ[成績のデータ（CSV形式）](score.csv)を使用します。
このデータは15人の生徒の国語、算数、理科、英語、社会の得点で構成されています。

{% gist naoto-github/74c0bb69025aaa3afb44b8ef53df0c6b %}

ファイルをダウンロードしたら、**read.csv**関数を利用して、
変数scoreにデータフレームとして読み込んでおきましょう（作業ディレクトリはデスクトップに変更）。


    score <- read.csv("score.csv")

変数scoreの出力は下記のようになります。

    > score
            氏名 国語 算数 理科 英語 社会
    1  青木 達也   60   68   72   39   71
    2  石井 健二   65   78   82   37   75
    3  北村 真子   84   59   85   87   84
    4  河野 尚子   50   65   65   39   78
    5    高木 健   72   74   83   30   83
    6  西川 知里   50   29   67   62   72
    7  福島 萌子   84   40   65   86   66
    8  古川 翔太   78   71   82   34   88
    9  山内 香菜   77   33   65   73   88
    10 渡辺 太郎   76   53   75   60   71
    11   浅野 渉   68   46   77   66   86
    12   星野 弘   61   27   74   70   67
    13   中谷 章   86   57   72   73   65
    14 小泉 美沙   68   48   73   51   68
    15 木下 萌子   78   90  100   53   79

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スクリプトの作成

コードを入力し保存するための**スクリプト**を作成しましょう。
[ファイル]-[新しいスクリプト]をクリックし、**Rエディタ**を表示します。
次に、[ファイル]-[保存]をクリックして、スクリプトを保存します。
このとき、ファイル名は**chapter5**としてください。
また、ファイルの保存場所と作業ディレクトリを**デスクトップ**に変更しておきます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">散布図

データの相関を視覚的に確認するには**散布図**を利用するのが最も簡単です。
X軸に算数、Y軸に理科として、散布図を描いてみましょう。
まずは、グラフ描画のためのライブラリである**ggplot2**を読み込みます。

    library(ggplot2)

次に、プロンプトで**qplot**関数を利用して散布図を描きます。

    > qplot(算数,理科,data=score)

すると下記のような散布図がプロットされます。
算数と理科にはどのような関係があるでしょうか。
どちらかといえば、数学が高得点であるほど、理科も高得点となっており、
**右上がりの傾向**がありそうではないでしょうか。 
このような関係を**正の相関**といいます。

[![https://gyazo.com/6cc59026d1a948744cc6f2f7eaea76ec](https://i.gyazo.com/6cc59026d1a948744cc6f2f7eaea76ec.png)](https://gyazo.com/6cc59026d1a948744cc6f2f7eaea76ec)

次に、X軸に算数、Y軸に英語として、散布図を描いてみましょう。   
プロンプトで**qplot**関数を利用して散布図を描きます。

    > qplot(算数,英語,data=score)

こんどは、数学が高得点であるほど、英語は低い得点となっており、
**右下がりの傾向**がありそうではないでしょうか。
このような関係を**負の相関**といいます。

[![https://gyazo.com/2d8f49a2bb3bc1e96a457e4b5caf76fb](https://i.gyazo.com/2d8f49a2bb3bc1e96a457e4b5caf76fb.png)](https://gyazo.com/2d8f49a2bb3bc1e96a457e4b5caf76fb)

最後に、X軸に算数、Y軸に国語として、散布図を描いてみましょう。   
プロンプトで**qplot**関数を利用して散布図を描きます。

    > qplot(算数,国語,data=score)

先程と比べると、特に傾向が見当たりませんね。
このような関係を**無相関**といいます。

[![https://gyazo.com/01d505423580138a7e3ea04d5cf6e111](https://i.gyazo.com/01d505423580138a7e3ea04d5cf6e111.png)](https://gyazo.com/01d505423580138a7e3ea04d5cf6e111)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">共分散

次に、データの相関を定量的に計算して求めてみましょう。
まずは**共分散**という指標を用います。
共分散は「偏差の積の平均」を表します。
例えば、算数と理科の共分散は下記の式で求めます。

<p style="text-align:center">
    <script type="math/tex">
    S_{xy} = \frac{(x_1 - \mu_x)(y_1 - \mu_y) + (x_2 - \mu_x)(y_2 - \mu_y) + \cdots + (x_n - \mu_x)(y_n - \mu_y)}{n} 
    </script>
</p>

<p style="text-align:center">
    <script type="math/tex">
    S_{算数,理科}= \frac{(68 - 55.9)(72 - 76.8) + (78 - 55.9)(82 - 76.8) + \cdots + (90 - 55.9)(100 - 76.8)}{15} 
    </script>
</p>

まずは、この式に忠実に、下記のようにスクリプトを記述して計算してみましょう。

    #算数の偏差
    hensa_sansu = score[,3] - mean(score[,3])

    #理科の偏差
    hensa_rika = score[,4] - mean(score[,4]) 

    #共分散
    kyo_bunsan <-  sum(hensa_sansu * hensa_rika) / length(score[,3])

プロンプトで共分散の値を確認してみましょう。

    > source("chapter5.R")
    > kyo_bunsan
    [1] 119.1067

共分散の値は約119.1になりました。
R言語では、**cov**という関数で共分散を求めることができます。
今度は、**cov**関数で共分散を計算してみましょう。

    > cov(score[,3],score[,4])
    [1] 127.6143
    
先程とは異なる結果になりました。
これは、前回と同じように、**標本分散**と**不偏分散**の違いが原因です
今回も下記のように分母を**n-1**に変更します。

<p style="text-align:center">
    <script type="math/tex">
    S_{xy} = \frac{(x_1 - \mu_x)(y_1 - \mu_y) + (x_2 - \mu_x)(y_2 - \mu_y) + \cdots + (x_n - \mu_x)(y_n - \mu_y)}{n-1} 
    </script>
</p>

    #共分散
    kyo_bunsan <-  sum(hensa_sansu * hensa_rika) / (length(score[,3]) - 1)

プロンプトで共分散の値を確認してみましょう。

    > kyo_bunsan
    [1] 127.6143

今度は共分散が約127.6となり、**cov**関数で求めた値と一致しました。
同様に、算数と英語、算数と国語の共分散を計算してみましょう。

    > cov(score[,3],score[,5])
    [1] -219.5238
    > cov(score[,3],score[,2])
    [1] 36.49524

まとめると、共分散は下記のようになります。

|科目1|科目2|共分散|
|:-|:-|:-|
|算数|理科|127.6143|
|算数|英語|-219.5238|
|算数|国語|36.49524|

散布図で確認したように、算数と理科は**大きな正の値**、算数と英語は**大きな負の値**
、算数と国語は**小さな正の値**になっていることが確認できます。
このように、共分散を求めることで、2種類のデータの相関を定量的に表すことができます。
しかし、共分散は、対象となるデータの**スケール（縮尺）**に依存するという問題があります。
例えば、100点満点と200点満点の試験では、相関を比較することができません。
そこで、次節で説明する**相関係数**が登場します。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">相関係数

スケールに依存しない相関を計算するには、まずは**相関係数**を用います。
相関係数は、先に求めた共分散を、2変数の**標準偏差の積**で割って求めます。
例えば、算数と理科の標準偏差は下記の式で求めます。

<p style="text-align:center">
    <script type="math/tex">
    r_{xy} = \frac{S_{xy}}{\sigma_x \sigma_y} 
    </script>
</p>

<p style="text-align:center">
    <script type="math/tex">
    r_{算数,理科} = \frac{S_{算数,理科}}{\sigma_算数 \sigma_理科} 
    </script>
</p>

下記のようにスクリプトを記述して計算してみましょう。

    #相関係数
    soukan <- kyo_bunsan / (sd(score[,3]) * sd(score[,4]))

プロンプトで相関係数の値を確認してみましょう。

    > soukan
    [1] 0.7128868

相関係数は約0.71になります。
R言語では、**cor**という関数で相関係数を求めることができます。
今度は、**cor**関数で共分散を計算してみましょう。

    > cor(score[,3],score[,4])
    [1] 0.7128868

先程の値と一致しました。
同様に、算数と英語、算数と国語の共分散を計算してみましょう。

    > cor(score[,3],score[,5])
    [1] -0.6243508
    > cor(score[,3],score[,2])
    [1] 0.1676487

まとめると、相関係数は下記のようになります。
    
|科目1|科目2|相関係数|
|:-|:-|:-|
|算数|理科|0.7128868|
|算数|英語|-0.6243508|
|算数|国語|0.1676487|

このように、相関係数の値は0から1の範囲をとります。
算数と理科は1に近く**強い正の相関**、算数と英語は-1に近く**負の相関**、
算数と国語は0に近く**無相関**ということが読み取れます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

2016年度の[中日ドラゴンズの打撃成績のデータ（CSV形式）](doragons.csv)から、
**盗塁**と強い相関（相関係数が0.7以上）を示す項目を探してください
（出展：[プロ野球ヌルデータ置き場](http://lcom.sakura.ne.jp/NulData/2016/index.html)）。
ソースは**chapter5.R**に記述し、**chapter5.R** を提出すること。

{% gist naoto-github/b7609794ee63f7788bcde2b58496fa99 %}

{% include advanced_studies_seminar_2/reference.html %}