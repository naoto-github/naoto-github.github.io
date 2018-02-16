---
layout: page
title: "Processingの開発環境の確認"
permalink: /class/programming_1/chapter1.html
top_link: false
image: "https://i.gyazo.com/f736d5d8adea49a9089d17086126b496.png"
---

[![https://gyazo.com/f736d5d8adea49a9089d17086126b496](https://i.gyazo.com/f736d5d8adea49a9089d17086126b496.png)](https://gyazo.com/f736d5d8adea49a9089d17086126b496)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Processingとは

**Processing**は、大学院生だったBenjamin FryとCasey Reasが2001年に[MIT Media Lab](http://www.media.mit.edu/)でスタートしたオープンソースのプロジェクトです。
当初からプログラミング教育を意識して開発され、初学者でも視覚的なコンテンツ（ビジュアルコンテンツ）を容易に作成できることが大きな特徴です。
一方で、デザイナーや建築家などの利用も多く、作品はニューヨーク近代美術館など多くの著名な美術館で公開されています。
オープンソースであることにもこだわりが強く、活発なコミュニティが形成されており、ソフトウェアを拡張するためのライブラリやツールが多く提供されています。
ウィンドウズ、マッキントッシュ、リナックスなどのプラットフォームで動作可能であり、[公式サイト](https://processing.org/)から無料でダウンロードすることができます。
また、Processingは[Java](https://java.com/ja/)をベースに開発されており、Javaによく似た文法でコードを記述できることも人気の高い理由です（Javaは3年前期に開講する「プログラミング応用」で学習できます）。

- オープンソース
- プログラミング教育に最適
- ビジュアルコンテンツの作成が容易
- Javaによく似た文法

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Processingの開発環境

**Processing**自体が統合開発環境であるため、開発するために他のソフトウェアを必要としません。
Processingを拡張するためのプロジェクトは多く存在し、最新のウェブ環境（HTML5）で視覚的なプログラミングが可能な[Processing.js](http://processingjs.org/)、AR（拡張現実）を実現するための[NyARToolkit](http://nyatla.jp/nyartoolkit/wp/)など応用範囲は幅広いです。

Processingを起動すると下記のメイン画面が表示されます（バージョンは**3.02**）。
メイン画面はシンプルに構成されており、標準的なメニューバーとツールバーに加え、ソースコードを編集するためのエディタ、プログラムのエラーを確認するためのコンソールがあります。
この画面でプログラムを作成し、**Runボタン**をクリックするだけで、実行結果を確認することができます。

[![https://gyazo.com/75a9d62b47d582ea68ef7b1330e19969](https://i.gyazo.com/75a9d62b47d582ea68ef7b1330e19969.png)](https://gyazo.com/75a9d62b47d582ea68ef7b1330e19969)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スケッチの作成

Processingは**スケッチ**という単位でプログラムを作成します（保存する前のファイル名は「sketch_日付a」）。
まずは、スケッチを保存する場所を設定しましょう。
メニューから[ファイル]-[設定]をクリックして、「設定」を開きます。
ここで、スケッチブックの場所を「**H:\MyProcessing**」に変更しましょう（スケッチブックの場所は日本語名のフォルダを含まないようにする必要があります）。

[![https://gyazo.com/efc941455b48171662833030b4b53873](https://i.gyazo.com/efc941455b48171662833030b4b53873.png)](https://gyazo.com/efc941455b48171662833030b4b53873)

次に、スケッチを保存してみましょう。
メニューから[ファイル]-[名前を付けて保存]をクリックして、「スケッチフォルダを名前を付けて保存」を開きます。
ファイル名に「Project1」を入力し、[保存]をクリックしましょう。
保存先に「Project1」という名前のフォルダが作成されていることを確認してください。
また、このフォルダを開くと中に「Project1.pde」というファイルがあります。
このファイルがProcessingのソースコードです。

[![https://gyazo.com/aec89b36f6c9980949c6d19cf1d9c439](https://i.gyazo.com/aec89b36f6c9980949c6d19cf1d9c439.png)](https://gyazo.com/aec89b36f6c9980949c6d19cf1d9c439)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">コンソールへの出力

コンソールに文字列を出力するには`println()`という命令文を用います。
ここでは、「Hello World!」という文字列をコンソールに出力してみます。
下記を参考にコードを入力したら、**Runボタン**をクリックしてください。
命令文の最後にはセミコロン（;）が必要なことに注意してください。
コンソールに「Hello World!」が出力されていることを確認してください。

[![https://gyazo.com/4302b369f2f233b6f51840a2948aa038](https://i.gyazo.com/4302b369f2f233b6f51840a2948aa038.png)](https://gyazo.com/4302b369f2f233b6f51840a2948aa038)

もし入力したコードにエラーがある場合は、エラータブに切り替えることで、エラーの詳細を確認することができます。
例えば、下記のコードの場合は「Missing right parenthesis ")"」と表示されます。

[![https://gyazo.com/3b1c13a42f92057779c5d632e1a3e01a](https://i.gyazo.com/3b1c13a42f92057779c5d632e1a3e01a.png)](https://gyazo.com/3b1c13a42f92057779c5d632e1a3e01a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">課題

`println()`を使用して、「本日の授業の感想」をコンソールに出力させてください。
課題が完成したら、作成したスケッチを**ZIPアーカイブ**形式で保存します。
ZIPアーカイブを作成するには、メニューから[ツール]-[スケッチをアーカイブ]をクリックして、「スケッチを名前を付けてアーカイブする」を開きます。
保存するファイル名を確認した上で、[保存]をクリックします。
保存先に「Project1-日付a.zip」というファイルが作成されていることを確認してください。

[![https://gyazo.com/5746497ec86f662a3a8b6dafe869f263](https://i.gyazo.com/5746497ec86f662a3a8b6dafe869f263.png)](https://gyazo.com/5746497ec86f662a3a8b6dafe869f263)

[![https://gyazo.com/4c73d362db0df20b6a69489a1afb5cd9](https://i.gyazo.com/4c73d362db0df20b6a69489a1afb5cd9.png)](https://gyazo.com/4c73d362db0df20b6a69489a1afb5cd9)

{% include programming_1/reference.html %}