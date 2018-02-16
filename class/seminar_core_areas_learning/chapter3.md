---
layout: page
title: "Excelを利用した統計処理・正規分布"
permalink: /class/seminar_core_areas_learning/chapter3.html
top_link: false
image: "https://i.gyazo.com/6088d23bcc2f780ba3cfa51379206455.png"
---

[![https://gyazo.com/6088d23bcc2f780ba3cfa51379206455](https://i.gyazo.com/6088d23bcc2f780ba3cfa51379206455.png)](https://gyazo.com/6088d23bcc2f780ba3cfa51379206455)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">授業の準備

今回、分析対象とするデータは、[気象庁](http://www.jma.go.jp/jma/index.html)が公開している「名古屋の降水量（1891年～2016年）」です。
下記のデータは各年度の降水量（mm）の合計を表しています（1911年以降は省略）。
気象庁では降水量に加え、気圧、気温、湿度など天候に纏わるデータを公開しているので様々なデータを対象に分析すると面白いです。

{% gist naoto-github/713f6068cb632df8c932be02d72ddc33 %}

上記のデータを含むファイル[precipitation.csv](precipitation.csv)をダウンロードしましょう。
ファイルをダウンロードしたら、前回と同様にExcelで**precipitation.csv**を読み込んでください。

[![https://gyazo.com/65cd4caa1815191e409f4d4295720ac5](https://i.gyazo.com/65cd4caa1815191e409f4d4295720ac5.png)](https://gyazo.com/65cd4caa1815191e409f4d4295720ac5)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">正規分布

**正規分布**は、平均値に近い値の頻度が高く、平均値から離れるほど頻度が低くなる特徴を持った**確率分布**のことです。
前回学んだ**2項分布**も上記と同じような特徴を持ちますが、**２項分布** は離散値（例、コインの表が出る回数）を対象としますが、
**正規分布** は連続値（例、降水量）を対象とする点が大きく異なります（実際、２項分布の試行回数*n*を無限大に近づけると正規分布に一致する）。
一般に、正規分布は様々な自然現象や社会現象に当てはまると考えられており、上記の降水量も例外ではありません。

まずは、降水量の分布を確認するために **分析ツール** を利用して **ヒストグラム（頻度分布）** を求めましょう。
最初に、下図のようにD列に1100から2500までのデータ区間（幅は200）を入力します。

[![https://gyazo.com/646ee5b2f60157400d86db48e22ee837](https://i.gyazo.com/646ee5b2f60157400d86db48e22ee837.png)](https://gyazo.com/646ee5b2f60157400d86db48e22ee837)

次に、**データ** タブに切り替え、**データ分析** をクリックします。
一覧から**ヒストグラム**を選択し、OKをクリックすると、ダイアログが表示されます。
ダイアログに下記の設定をしてから、**ヒストグラム**を求めて下さい。

- 入力範囲は*B2:B128*を設定する
- データ区間は*D2:D9*を設定する
- 出力オプションで**新規ワークシート**にチェックを入れる

[![https://gyazo.com/e3e4ea7fa8f0eee1e7f23a505cce7d30](https://i.gyazo.com/e3e4ea7fa8f0eee1e7f23a505cce7d30.png)](https://gyazo.com/e3e4ea7fa8f0eee1e7f23a505cce7d30)

新規に作成されたシートには、1100から2500の範囲で降水量のヒストグラムがまとめられます。
1700-1900が最頻値となっており、この範囲から離れるほど頻度が小さくなることが分かります。
ここで、頻度を基に各データ区間の**確率密度**を求めましょう（**確率** ではないことに注意）。
実際の降水量は連続値ですが、ヒストグラムは離散値であるため、データ区間の幅を考慮しなくてはいけません。
そこで、C列に頻度を、頻度の合計である**126**と、データ区間の幅**200**を掛けた**25200** で割った値を入力します。
このとき、データ区間も**1700-1900**のように区間を含めた表現に修正しておきましょう。

[![https://gyazo.com/d383a3991ab538d1f3807d3b04477729](https://i.gyazo.com/d383a3991ab538d1f3807d3b04477729.png)](https://gyazo.com/d383a3991ab538d1f3807d3b04477729)

さらに、求めた確率密度で棒グラフを描きます。C列をマウスで選択し、**挿入** タブの棒グラフをクリックします。
すると、下図のように、横軸が「降水量」、縦軸が「確率密度」である棒グラフが描けます（タイトル、軸ラベル、軸の書式設定を図に合わせて修正してください）。
確率密度を表していることから、棒グラフの**面積**の総和が**1**になることが分かります。

[![https://gyazo.com/17b400e242361db35c0180ca324575cc](https://i.gyazo.com/17b400e242361db35c0180ca324575cc.png)](https://gyazo.com/17b400e242361db35c0180ca324575cc)

このグラフは**正規分布**に近似することが可能です。
一般にデータサンプルが多いほど、理想的な正規分布の形状に近付きます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">正規分布の公式

正規分布の確率密度は下記の式で与えられます。
2項分布よりも難しく感じると思いますが、この式の重要なパラメータはたった2つです。
１つは平均<script type="math/tex">\mu</script>、もう１つは標準偏差<script type="math/tex">\sigma</script>です。
この2つのパラメータで正規分布の形状が決まります。

<p style="text-align:center">
    <script type="math/tex">
    \frac{1}{\sqrt{2 \pi} \sigma} \exp \left(- \frac{(x - \mu)^2}{2 \sigma ^2} \right)
    </script>
</p>

また、上記の計算はExcelでは**norm.dist関数**を用いて求めることができます。
それでは、Excelで降水量を近似する正規分布を求めましょう。
まずは、平均<script type="math/tex">\mu</script>、標準偏差<script type="math/tex">\sigma</script>を求めます。
平均は**1588.5**、標準偏差は**269.0**になります。

- B128に、**average関数**で平均を求める
- B129に、**stdev関数**で標準偏差を求める。

[![https://gyazo.com/12385099547aad0a56e9412a7ad7b164](https://i.gyazo.com/12385099547aad0a56e9412a7ad7b164.png)](https://gyazo.com/12385099547aad0a56e9412a7ad7b164)

次に、下記データを含む[norm.csv](norm.csv)をダウンロードしてください。
ファイルをダウンロードしたらExcelでnorm.csvを読み込んで下さい。

{% gist naoto-github/db988a97f352308ccae193ac8e58f2fe %}

[![https://gyazo.com/dc1eb04e831c1a65c83d435a470e45f9](https://i.gyazo.com/dc1eb04e831c1a65c83d435a470e45f9.png)](https://gyazo.com/dc1eb04e831c1a65c83d435a470e45f9)

セル*B2:B42*に**norm.dist関数**を用いて確率密度を求めます。
セルB2を選択した状態で、**関数の挿入**ボタンをクリックし、ダイアログを表示します。
ダイアログで**norm.dist関数**を検索し、OKをクリックします。
**norm.dist関数**の引数には、下図のように3つの引数を指定します（関数形式に*true*を指定すると累積分布になる）。

[![https://gyazo.com/521dbc04e3118aec9b449cabb1d21f33](https://i.gyazo.com/521dbc04e3118aec9b449cabb1d21f33.png)](https://gyazo.com/521dbc04e3118aec9b449cabb1d21f33)

この結果、下記のように連続値を対象とした確率密度が求められます。
上記と同じ手順で**面グラフ**も描きましょう。
このグラフが理想的な正規分布の形状です。
平均の1588が確率密度のピークとなっています。
また、平均を中心に左右対称のグラフとなっていることも分かります。

[![https://gyazo.com/0429adf6464d99e17a6bbfc6a82761f9](https://i.gyazo.com/0429adf6464d99e17a6bbfc6a82761f9.png)](https://gyazo.com/0429adf6464d99e17a6bbfc6a82761f9)

[![https://gyazo.com/9cac7df3bade390a27fd3007a31499d1](https://i.gyazo.com/9cac7df3bade390a27fd3007a31499d1.png)](https://gyazo.com/9cac7df3bade390a27fd3007a31499d1)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

累積分布を利用することで正規分布の確率を求めることが可能です。
Excelでは、**norm.dist関数** の関数形式を *true*にすることで累積分布になります。
降水量の累積分布を利用して下記の設問に答えなさい。

- 降水量が1200[mm]以下になる確率[%]
- 降水量が1800[mm]以上になる確率[%]
- 降水量が1200[mm]～1600[mm]の範囲に含まれる確率[%]

{% include seminar_core_areas_learning/reference.html %}