---
layout: page
title: "ローカルストレージ"
top_link: false
image: "https://i.gyazo.com/e7f2347b002becc4caa2207298fb9823.png"
---

[![https://gyazo.com/e7f2347b002becc4caa2207298fb9823](https://i.gyazo.com/e7f2347b002becc4caa2207298fb9823.png)](https://gyazo.com/e7f2347b002becc4caa2207298fb9823)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> ローカルストレージとは

従来のウェブブラウザでは、データを保存する仕組みとして、 **クッキー(Cookie)** と呼ばれる方法が主に利用されていました。
しかし、 **クッキー** は保存できるデータサイズが4キロバイトしかなく、ウェブページの更新毎に読込む必要がありました。
そこで、HTML5では、クッキーに代わる新たな仕組みとして **ウェブストレージ（Web Strage）** が導入されました。
**ウェブストレージ**では、5メガバイトのデータの保存が可能であり、クッキーのように自動で読込みが行われないため、
より安全なデータの送受信が可能です。
**ウェブストレージ** には下記の２種類があります。

- **セッションストレージ（Session Storage）**
- **ローカルストレージ（Local Storage）**

前者の **セッションストレージ** は、ブラウザのウィンドウ毎に、データが記録されるストレージであり、ウィンドウが閉じられると、そのデータは失われるという特徴があります。
後者の **ローカルストレージ** は、永続的にブラウザにデータが記録されるストレージであり、**オリジン**（ドメインとポートの組み合わせ）で区別されるという特徴があります。
Monacaのアプリでは、このローカルストレージを利用することで、データを永続的に保存しておくことができます。
つまり、ローカルストレージにデータを記録しておけば、アプリを終了してもデータが失われることがありません。
そこで、今回はローカルストレージを利用した辞書アプリを作成してみましょう。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> キー・バリュー・ストア型データベース（KVS）

企業等で利用されているデータベースの大部分は **関係データベース** と呼ばれる仕組みを採用しています。
一方で、**関係データベース** はSNSなど膨大な情報を高速に処理するには不向きです。
そこで、**キー・バリュー・ストア型データベース** に代表される**NoSQL**と呼ばれる仕組みが部分的に利用されるようになってきました。
**ローカルストレージ** も、この **キー・バリュー・ストア型データベース** と同じ構造を持ちます。
その構造は極めてシンプルで、**キー（Key）** と **バリュー（Value）** の一対のペアでデータを記録するという方法です。
例えば、下記のように英単語を **キー** 、そして、その和訳を **バリュー** として記録しておければ、
**英単語（キー）** から、 **和訳（バリュー）** を検索することができます。

|Key|Value|
|:-:|:-:|
|Apple|りんご|
|Banana|バナナ|
|Grapes|ぶどう|

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> プロジェクトの作成

今回は、**英単語** と **和訳** を登録するオリジナルの辞書アプリを作成しましょう。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Navigation】を選択します。
プロジェクト名を **辞書アプリ** 、説明を **ローカルストレージを利用した辞書アプリ** とします。
プロジェクトを作成したら **MonacaクラウドIDE** の画面を開きましょう。

[![https://gyazo.com/68ff4312391f924c77fc376fe9804e31](https://i.gyazo.com/68ff4312391f924c77fc376fe9804e31.png)](https://gyazo.com/68ff4312391f924c77fc376fe9804e31)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> ローカルストレージを利用したデータの記録

まずは、イベントを処理するために[jQuery](https://jquery.com/)を導入します。
ツールバーから **[設定]-[JS/CSSコンポーネントの追加と削除]** をクリックします。
次に、コンポーネントの一覧から **jQuery(Monaca Version)** を選択し **追加** をクリックします。
これで、対象のプロジェクトで **jQuery** が利用可能になります。

次に、index.htmlを編集していきましょう。
【Onsen UI V2 JS Navigation】は、**page1.html** と **page2.html**で構成されています。
そこで、 **page1.html** は英単語と和訳の登録、**page2.html** は登録された英単語リストの表示に用います。

**page1.html** には、英単語と和訳を入力するための **ons-input** 要素を設置します。
ここで、**place-holder** 属性は、フォームの入力前に薄く表示される文字列を表しています。
また、ローカルストレージにデータを登録するための **ons-button** 要素も設置します。

{% gist naoto-github/bf0228cf75a585dbed2989c2a50f9ca2 %}

<a href="https://gyazo.com/c350d990ef93407ba654fd944ec2136b"><img class="shadow"  src="https://i.gyazo.com/c350d990ef93407ba654fd944ec2136b.png" alt="https://gyazo.com/c350d990ef93407ba654fd944ec2136b" width="345"/></a>

**page2.html** には、英単語のリストを表示するための、**ul** 要素を作成しておきます。
最初の状態では **ul要素** は空っぽの状態であることに注意してください。

{% gist naoto-github/cb93f2f0afe0204026303b2662fad472 %}

上記の修正に合わせ、**script** 要素にローカルストレージへのデータ登録に関する処理を記述します。
まずは、**page1.html(#first-page)** を読み込んだときの処理です。
ローカルストレージは **localStrage** という変数でアクセスし、キーとバリューのペアを記録するには、
**setItem(key, value)** を利用します。
フォームから**key** と **value** の値を読取り、**key** の値が空でないときのみ、
ローカルストレージに登録処理をします。
次に、**page2.html(#second-page)** を読み込んだときの処理です。
最初に**ul** 要素を **empty()** で初期化します。
次に、ローカルストレージに登録されているキーとバリューのペアの数だけfor文で繰り返し、
**ul** 要素に、キーとバリューの **li** 要素を追加しています。

{% gist naoto-github/ede3b2acaffa1c90e485ca5789503875 %}

完成したら、自由に英単語と和訳を登録してみましょう。
アプリを終了させても登録されたデータが残っていることを確認してください。

<a href="https://gyazo.com/92f9f57f76fef8c8af3acc2102e06100"><img class="shadow"  src="https://i.gyazo.com/92f9f57f76fef8c8af3acc2102e06100.png" alt="https://gyazo.com/92f9f57f76fef8c8af3acc2102e06100" width="346"/></a>

<a href="https://gyazo.com/08f120e6038a6ec2ac21bf34265e6af0"><img class="shadow"  src="https://i.gyazo.com/08f120e6038a6ec2ac21bf34265e6af0.png" alt="https://gyazo.com/08f120e6038a6ec2ac21bf34265e6af0" width="347"/></a>

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 課題

ローカルストレージに登録されたデータを消去するボタンを追加してください。
ローカルストレージのデータを消去するには **localStorage.clear()** を利用します。
アプリが完成したらプロジェクトを**エクスポート**して提出してください。
エクスポートは【ファイル】-【プロジェクトをエクスポート】から可能です。

<a href="https://gyazo.com/3ef5fa29b4adbb5e47e732c54bdddcb1"><img class="shadow"  src="https://i.gyazo.com/3ef5fa29b4adbb5e47e732c54bdddcb1.png" alt="https://gyazo.com/3ef5fa29b4adbb5e47e732c54bdddcb1" width="346"/></a>

{% include graduation_preperation_1/reference.html %}
