---
layout: page
title: "Excelを利用した統計処理・2項分布"
permalink: /class/seminar_core_areas_learning/chapter2.html
top_link: false
image: "https://i.gyazo.com/4e374f77eaa29dd31ef5c85dd431b006.png"
---

[![https://gyazo.com/4e374f77eaa29dd31ef5c85dd431b006](https://i.gyazo.com/4e374f77eaa29dd31ef5c85dd431b006.png)](https://gyazo.com/4e374f77eaa29dd31ef5c85dd431b006)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">授業の準備

今回、分析対象とするデータは、「コインを10回投げる」という試行の結果です。
コイン投げの試行の結果は2通り（表・裏）であり、表を **1** 、裏を **0** と表現します。
また、表が出る確率は **50%** 、同様に裏が出る確率は **50%** と仮定します。
下記のデータは「コインを10回投げる」という試行を100回繰り返したときの結果です（21回目以降の試行は省略）。

{% gist naoto-github/d7b65eb8ecb8e3c8c697b8134ceefbfb %}

上記のデータを含むファイル[coin.csv](coin.csv)をダウンロードしましょう。
ファイルをダウンロードしたら、前回と同様にExcelで**coin.csv**を読み込んでください。

[![https://gyazo.com/edceb152e804e35923208276d7be39e3](https://i.gyazo.com/edceb152e804e35923208276d7be39e3.png)](https://gyazo.com/edceb152e804e35923208276d7be39e3)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">2項分布

まずは、各試行でコインが表になった回数を数えてみましょう。
表は**1**で与えられるので、各試行の値の総和が表になった回数を表します。
また、表が出る回数は0から10の範囲に収まります。

- セル*L2:L101*に、**sum関数**で表が出た回数を求める

[![https://gyazo.com/ec87c1c273a503534f2b4436bf6b4688](https://i.gyazo.com/ec87c1c273a503534f2b4436bf6b4688.png)](https://gyazo.com/ec87c1c273a503534f2b4436bf6b4688)

1回目の試行は5回、2回目の試行は7回となりました。
では「コインが表になった回数」はどのような分布になっているか確認するために
**分析ツール** を利用して **ヒストグラム（頻度分布）** を求めましょう。
最初に、下図のようにN列に0から10までのデータ区間を入力します。

[![https://gyazo.com/2de1e0d974b439059d58cc854772678f](https://i.gyazo.com/2de1e0d974b439059d58cc854772678f.png)](https://gyazo.com/2de1e0d974b439059d58cc854772678f)

次に、**データ**タブに切り替え、**データ分析**をクリックします。
一覧から**ヒストグラム**を選択し、OKをクリックすると、ダイアログが表示されます。
ダイアログに下記の設定をしてから、**ヒストグラム**を求めて下さい。

- 入力範囲に*L2:L101*を設定する
- データ区間に*N2:N12*を設定する
- 出力オプションで**新規ワークシート**にチェックを入れる

[![https://gyazo.com/227db0b96f5b0df1f4c69b60595ef116](https://i.gyazo.com/227db0b96f5b0df1f4c69b60595ef116.png)](https://gyazo.com/227db0b96f5b0df1f4c69b60595ef116)

新規に作成されたシートには、0から10の範囲で表が出た回数のヒストグラムがまとめられます。
中央の5回が最頻値となっており、中央から離れるほど頻度が小さくなることが分かります（0回と10回は一度も出現していません）。
ここで、頻度を基に各データ区間の発生確率を求めましょう。
C列に頻度を100で割った値を入力します。

[![https://gyazo.com/f21af4d4d0614e81ce3eef58650287bd](https://i.gyazo.com/f21af4d4d0614e81ce3eef58650287bd.png)](https://gyazo.com/f21af4d4d0614e81ce3eef58650287bd)

さらに、求めた確率で棒グラフを描きます。
C列をマウスで選択し、**挿入**タブの棒グラフをクリックします。
すると、下図のように、横軸が「表が出た回数」、縦軸が「確率」である棒グラフが描けます（タイトル、軸ラベル、軸の書式設定を図に合わせて修正してください）。

[![https://gyazo.com/c125f7befcd521751260ab96e0df54d3](https://i.gyazo.com/c125f7befcd521751260ab96e0df54d3.png)](https://gyazo.com/c125f7befcd521751260ab96e0df54d3)

このグラフは**2項分布**と呼ばれる確率分布に近似することが可能です。
このデータは100回の繰り返しの結果ですが、試行回数が増えるほどに2項分布の理想の形状に近付きます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">2項分布の公式

では2項分布の理想的な形状を考えましょう。
2項分布は上記のコインのように結果が2通りの試行を対象とします（**ベルヌーイ試行** と呼びます）。
また、試行の結果が生じる確率を**生起確率**と呼びます。
よって、2項分布は「1回の生起確率が*p*のベルヌーイ試行を、*n* 回行って、*k* 回起こる確率」を表すことになります。

例えば、「コインを5回投げて表が3回出る確率（*p=0.5*、*n=5*、*k=3*）」を考えます。
このとき、「コインを5回投げて表が3回出る組み合わせ」は<script type="math/tex">_{n} C_{k} = _{5} C_{3}=10</script>通りです。

| 1回目 | 2回目 | 3回目 | 4回目 | 5回目 |
|-------|-------|-------|-------|-------|
| 1     | 1     | 1     | 0     | 0     |
| 1     | 1     | 0     | 1     | 0     |
| 1     | 1     | 0     | 0     | 1     |
| 1     | 0     | 1     | 1     | 0     |
| 1     | 0     | 1     | 0     | 1     |
| 1     | 0     | 0     | 1     | 1     |
| 0     | 1     | 1     | 1     | 0     |
| 0     | 1     | 1     | 0     | 1     |
| 0     | 1     | 0     | 1     | 1     |
| 0     | 0     | 1     | 1     | 1     |

また、表が3回出る確率は<script type="math/tex">p^k=0.5^3=0.125</script>、
裏が2回出る確率は<script type="math/tex">(1-p)^{n-k}=0.5^2=0.25</script>となります。
よって、「コインを5回投げて表が3回出る確率」は下記の式で求めることができます。

<p style="text-align:center">
    <script type="math/tex">
    _{n} C_{k} p^{k}(1-p)^{n-k} = 10 \times 0.5^{3} \times (1-0.5)^{5 - 3} = \approx 0.313
    </script>
</p>

上記の計算はExcelでは**binom.dist関数**を用いて求めることができます。
それでは、Excelで「コインを10回投げて表がk回出る確率（*p=0.5*、*n=10*、*k=0～10*）」を求めましょう。
まずは、下記データを含む[binom.csv](binom.csv)をダウンロードしてください。
ファイルをダウンロードしたらExcelで**binom.csv**を読み込んで下さい。

{% gist naoto-github/2f08a551f4d65e486fc8a55bf6a755e9 %}

[![https://gyazo.com/908960ee6b50bbc71818f6d3fb07c968](https://i.gyazo.com/908960ee6b50bbc71818f6d3fb07c968.png)](https://gyazo.com/908960ee6b50bbc71818f6d3fb07c968)

セル*B2:B12*に**binom.dist関数**を用いて確率を求めます。
セルB2を選択した状態で、**関数の挿入**ボタンをクリックし、ダイアログを表示します。
ダイアログで**binom.dist関数**を検索し、OKをクリックします。
**binom.dist関数**の引数には、下図のように4つの引数を指定します（関数形式に*true*を指定すると累積分布になる）。

[![https://gyazo.com/6868ba7fbc1435c5495fecd43eb12c10](https://i.gyazo.com/6868ba7fbc1435c5495fecd43eb12c10.png)](https://gyazo.com/6868ba7fbc1435c5495fecd43eb12c10)

この結果、下記のように*k=0～10*の範囲で確率が求められます。
上記と同じ手順で棒グラフも描きましょう。
このグラフが理想的な2項分布の形状です。
中央の5回の確率が最も高く、中央から離れるほど確率は下がります。
また、5回を中心に左右対称となっていることも読み取れます。

[![https://gyazo.com/b778510cb60d33ca371cc23a5730ef63](https://i.gyazo.com/b778510cb60d33ca371cc23a5730ef63.png)](https://gyazo.com/b778510cb60d33ca371cc23a5730ef63)

[![https://gyazo.com/97987ffe44b64a2392239ad92fb50024](https://i.gyazo.com/97987ffe44b64a2392239ad92fb50024.png)](https://gyazo.com/97987ffe44b64a2392239ad92fb50024)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

「サイコロを10回投げる」という試行を繰り返したとき、**出た目が2以下**となる回数の確率分布を求めなさい（サイコロの目は全て均等な確率で出現すると仮定する）。
また、求めた確率分布を利用して下記の設問に答えなさい。

- **2以下の目**が6回出る確率
- **2以下の目**が3回以下となる確率

[![https://gyazo.com/94262359cb48470d1b2a1e950dcab19a](https://i.gyazo.com/94262359cb48470d1b2a1e950dcab19a.png)](https://gyazo.com/94262359cb48470d1b2a1e950dcab19a)

{% include seminar_core_areas_learning/reference.html %}