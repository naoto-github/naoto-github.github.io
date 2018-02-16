---
layout: page
title: "母集団と標本"
permalink: /class/advanced_studies_seminar_2/chapter8.html
top_link: false
image: "https://i.gyazo.com/249d9842c81ea9a95111ffd0308df0c8.png"
---

[![https://gyazo.com/249d9842c81ea9a95111ffd0308df0c8](https://i.gyazo.com/249d9842c81ea9a95111ffd0308df0c8.png)](https://gyazo.com/249d9842c81ea9a95111ffd0308df0c8)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">母集団と標本

統計の醍醐味の一つが「**推測統計**」です。
推測統計では、対象となるデータが大規模であるために、その一部を取り出したデータから推測するということを行います。
このとき、対象となるデータ全体のことを**母集団**、取り出した一部のデータのことを**標本**といいます。
例えば、日本国民全体の平均身長を調べるためには、莫大な費用と時間がかかってしまいます。
そこで、多少の正確さは犠牲にして、一部の国民を対象として調査し、全体を予測するということが現実的な方法です。
ここでは、母集団が正規分布であると仮定して、母集団と標本の関係を明らかにしていきます。
これからは、ある母集団（または標本）<script type="math/tex">X</script>が、
平均<script type="math/tex">\mu</script>、分散<script type="math/tex">\sigma^2</script>に従うとき、
下記のように表記しますので注意してください。
ここで、<script type="math/tex">N</script>は、Normal Distribution（正規分布）の頭文字です。

<p style="text-align:center">
    <script type="math/tex">
    X \sim N(\mu,\sigma^2)
    </script>
</p>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スクリプトの作成

コードを入力し保存するための**スクリプト**を作成しましょう。
[ファイル]-[新しいスクリプト]をクリックし、**Rエディタ**を表示します。
次に、[ファイル]-[保存]をクリックして、スクリプトを保存します。
このとき、ファイル名は**chapter8**としてください。
また、ファイルの保存場所と作業ディレクトリを**デスクトップ**に変更しておきます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">母数の推定

母集団の特徴を表す基本統計量は**母数**と呼ばれます。
平均、分散などがその代表であり、母集団の平均を**母平均**<script type="math/tex">\hat{\mu}</script>、
母集団の分散を**母分散** <script type="math/tex">\hat{\sigma}^2</script>と呼びます。
また、母集団から抽出された標本の平均を**標本平均** <script type="math/tex">\mu</script>、
標本の分散（不偏分散）を**標本分散** <script type="math/tex">\sigma^2</script>と呼びます。
テキストによっては、これらの定義が異なることもあるので注意してください。

それでは、母集団から抽出した標本を用いて、母数の値を推定してみましょう。
このとき、推定する母数が「1つの値」となっている場合は、**点推定** と呼びます。
ここでは、平均<script type="math/tex">\hat{\mu}=100</script>、
分散<script type="math/tex">\hat{\sigma}^2=100</script>に従う母集団を考えます
（標準偏差は<script type="math/tex">\hat{\sigma}=10</script>）。

<p style="text-align:center">
    <script type="math/tex">
    X \sim N(100,100)
    </script>
</p>

上記の正規分布に従った下記の10000の乱数を生成し、母集団<script type="math/tex">X</script>とします。
[ファイル](N-100-100.csv) をダウンロードしたら、**read.csv**関数を利用して、
変数Xにデータフレームとして読み込んでおきましょう（作業ディレクトリはデスクトップに変更）。

    89.74776
    96.49404
    98.46421
    98.99935
    93.35153
    105.0311
    123.9603
    98.72574
    105.1024
    83.61765
    ...

ファイルを読み込んだら、母集団<script type="math/tex">X</script>の平均と分散を求めてみましょう。

    X <- read.csv("N-100-10.csv")
    > mean(X[,1])
    [1] 100.1837
    > var(X[,1])
    [1] 99.70016
    
この結果から、母平均<script type="math/tex">\hat{\mu}=100.18 \simeq 100</script>、
母分散<script type="math/tex">\hat{\sigma}^2=99.7 \simeq 100</script>に従うことが確認できます
（標準偏差は<script type="math/tex">\hat{\sigma}=\sqrt{100} \simeq 10</script>）。
次に、母集団<script type="math/tex">X</script>の確率密度のヒストグラムを描き、分布の形状を確認します。
    
    > hist(X[,1],freq=FALSE)

ヒストグラムは釣鐘状になっており、母集団<script type="math/tex">X</script>が正規分布に従っていることも確認できました。

[![https://gyazo.com/4082b0b964112b18b3cbd385a5db6355](https://i.gyazo.com/4082b0b964112b18b3cbd385a5db6355.png)](https://gyazo.com/4082b0b964112b18b3cbd385a5db6355)


それでは、母集団から標本<script type="math/tex">ｘ</script>を抽出します。
ここで重要なことは、標本は母集団から **ランダムサンプリング（無作為抽出）** しなくてはならないということです。
無作為に抽出しなければ、標本に偏りが生じる可能性があり、正確な推定ができないことに注意してください。
標本を抽出するには**sample**関数を利用します。
引数には抽出するサンプル数<script type="math/tex">n</script>として**100**を指定します。

    x <- sample(X[,1],100)

続けて、標本<script type="math/tex">ｘ</script>の平均と分散を調べてみましょう。

    > mean(x)
    [1] 100.4211
    > var(x)
    [1] 99.90735

この結果から、標本平均<script type="math/tex">\mu=100.42 \simeq = 100</script>、
標本分散<script type="math/tex">\sigma^2=99.91 \simeq = 100</script>ということが分かりました
（標準偏差<script type="math/tex">\sigma=\sqrt{99.91}=9.99 \simeq 10</script>）。
この値は母平均、母分散とほぼ一致していますね。
ただし、抽出する標本が変われば結果も変わることに注意してください。

次に標本<script type="math/tex">ｘ</script>の確率密度のヒストグラムを描き、分布の形状を確認します。

    > hist(x,freq=FALSE)

[![https://gyazo.com/22f61090f0f5565ad40c12267c063139](https://i.gyazo.com/22f61090f0f5565ad40c12267c063139.png)](https://gyazo.com/22f61090f0f5565ad40c12267c063139)

あまり綺麗とはいえませんが、おおまかには釣鐘状の分布をしていることがわかります。
どうやら標本<script type="math/tex">ｘ</script>も、
平均<script type="math/tex">\hat{\mu}=100</script>、
分散<script type="math/tex">\hat{\sigma}^2=100</script>に従う正規分布のようです。

<p style="text-align:center">
    <script type="math/tex">
    x \sim N(\hat{\mu},\hat{\sigma}^2) = N(100,100)
    </script>
</p>

上記の結果から分かることを下記にまとめます。

- 母集団<script type="math/tex">X</script>が正規分布であれば、ランダムサンプリングした標本<script type="math/tex">ｘ</script>も正規分布
- 母平均<script type="math/tex">\hat{\mu}</script>は標本平均<script type="math/tex">\mu</script>で推定できる
- 母分散<script type="math/tex">\hat{\sigma}^2</script>は標本分散（不偏分散）<script type="math/tex">\sigma^2</script>で推定できる

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">標本平均の分布

これまでは母集団<script type="math/tex">X</script>と標本<script type="math/tex">x</script>の関係を考えました。
次に、母集団<script type="math/tex">X</script>と標本平均の分布<script type="math/tex">m</script>の関係を考えましょう。
この**標本平均の分布**は、次回のテーマである**検定**に密接に関係する重要な概念です。
少し回りくどいですが、混乱を避けるためにも、敢えて**標本平均の分布**という表現を採用します。

それでは、母集団から標本<script type="math/tex">x</script>を**1000**回繰り返して抽出し、その平均を求めます。
**sample**関数を利用し、抽出するサンプル数<script type="math/tex">n</script>は**10**を指定します。
繰り返しには**for文**を利用しますが詳細は割愛します。

    m <- double(length=1000)
    for(i in 1:1000){
    	m[i] <- mean(sample(X[,1],10))
    }

続けて、標本平均の分布<script type="math/tex">m</script>の平均と分散を調べてみましょう。

    > mean(m)
    [1] 100.2321
    > var(m)
    [1] 9.451763

この結果から、**標本平均の分布** の平均<script type="math/tex">\mu=100.23 \simeq 100</script>、
**標本平均の分布** の分散<script type="math/tex">\sigma^2=9.45 \simeq 10</script>ということが分かりました
（標準偏差<script type="math/tex">\sigma=\sqrt{9.45}=3.07 \simeq 3.16</script>）。
どうやら平均は母平均とほぼ一致しますが、分散は母分散よりも小さくなるようです。

次に、標本平均の分布<script type="math/tex">m</script>の確率密度のヒストグラムを描き、分布の形状を確認します。

    > hist(m,freq=FALSE)

[![https://gyazo.com/0efe0a30f6f236ccdf08fef6e79601dc](https://i.gyazo.com/0efe0a30f6f236ccdf08fef6e79601dc.png)](https://gyazo.com/0efe0a30f6f236ccdf08fef6e79601dc)

釣鐘上の分布をしており、標本平均の分布<script type="math/tex">m</script>も正規分布のようです。
実は、標本平均の分布<script type="math/tex">m</script>は、
平均<script type="math/tex">\mu=\hat{\mu}=100</script>、
分散<script type="math/tex">\sigma^2=\frac{\hat{\sigma}^2}{n}=10</script>に従う正規分布になります。
ここで、<script type="math/tex">n</script>はサンプル数を意味していることに注意してください。

<p style="text-align:center">
    <script type="math/tex">
    m \sim N(\hat{\mu},\frac{\hat{\sigma}^2}{n}) = N(100,10)
    </script>
</p>

上記の結果から分かることを下記にまとめます。

- 母集団<script type="math/tex">X</script>が正規分布であれば、標本平均の分布<script type="math/tex">m</script>も正規分布
- 母平均<script type="math/tex">\hat{\mu}</script>は**標本平均の分布**の平均<script type="math/tex">\mu</script>で推定できる
- 母分散<script type="math/tex">\hat{\sigma}^2</script>は**標本平均の分布**の分散（不偏分散）<script type="math/tex">\sigma^2 \times n</script>で推定できる

最後に母集団<script type="math/tex">X</script>と標本平均の分布<script type="math/tex">m</script>の正規分布を描いてみましょう。
平均は一致しますが、分散は **標本平均の分布** の方が小さいため、尖った分布になっていることが分かります。

    > curve(dnorm(x,100,sqrt(100/10)),from=70,to=130)
    > curve(dnorm(x,100,sqrt(100)),from=70,to=130,add=TRUE)

[![https://gyazo.com/7624b18116ff22d7ecbc4b5468aab70a](https://i.gyazo.com/7624b18116ff22d7ecbc4b5468aab70a.png)](https://gyazo.com/7624b18116ff22d7ecbc4b5468aab70a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

上記の母集団<script type="math/tex">X</script>から、
サンプル数<script type="math/tex">n=20</script>の標本を抽出したときの、
標本平均の分布を描きなさい。
ソースは**chapter8.R**に記述し、グラフの画像ファイル、**chapter8.R** を提出すること。

[![https://gyazo.com/12b582def0e3694b788fb3d90881059e](https://i.gyazo.com/12b582def0e3694b788fb3d90881059e.png)](https://gyazo.com/12b582def0e3694b788fb3d90881059e)

{% include advanced_studies_seminar_2/reference.html %}