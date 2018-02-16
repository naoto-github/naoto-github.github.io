---
layout: page
title: "Onsen UI(4) ジェスチャー操作"
top_link: false
image: "https://i.gyazo.com/b725755d920dea7874d9cd9194f24572.png"
---

[![https://gyazo.com/b725755d920dea7874d9cd9194f24572](https://i.gyazo.com/b725755d920dea7874d9cd9194f24572.png)](https://gyazo.com/b725755d920dea7874d9cd9194f24572)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> ジェスチャー操作とは

スマートフォンなどの画面に対して、指やタッチペンなどで行う動作が **ジェスチャー操作** です。
例えば、画面を１回叩く操作を **タップ（Tap）** 、画面を平行に動かす操作を **スワイプ（Swipe）** と呼びます。
Onsen UIでは **ons-gesture-detector** 要素を利用することで、ジェスチャー操作を検出することができます。
また、Onsen UIにおけるジェスチャー操作の検出は、[HAMMER.JS](https://hammerjs.github.io/)のカスタマイズ版をベースにしているとのことです。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> プロジェクトの作成

今回は、ジェスチャー操作を利用した簡単なゲームを作成してみましょう。
特定のジェスチャー操作をすることで、ブロック要素（div要素）を消去するゲームです。
ダッシュボードから【新規プロジェクトの作成】-【Onsen UI】-【Onsen UI V2 JS Minimum】を選択します。
プロジェクト名を **ジェスチャー・ゲーム** 、説明を **ジェスチャー操作を利用したゲームアプリ** とします。
プロジェクトを作成したら **MonacaクラウドIDE** の画面を開きましょう。

[![https://gyazo.com/e745575205bc0ab78d7f6ffe5e4c525b](https://i.gyazo.com/e745575205bc0ab78d7f6ffe5e4c525b.png)](https://gyazo.com/e745575205bc0ab78d7f6ffe5e4c525b)

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> ブロック要素とイベントの検出

ここでは、下記表の３つのジェスチャー操作を検出することとします。

| ジェスチャー | イベント名 | 説明 |
|:-|:-|:-|
| タップ | tap | 画面を１回叩く |
| ホールド | hold | 画面を長く押す |
| スワイプ | swipe | 画面に平行に動かす |

まずは、イベントを処理するために[jQuery](https://jquery.com/)を導入します。
ツールバーから **[設定]-[JS/CSSコンポーネントの追加と削除]** をクリックします。
次に、コンポーネントの一覧から **jQuery(Monaca Version)** を選択し **追加** をクリックします。
これで、対象のプロジェクトで **jQuery** が利用可能になります。

<img class="shadow" src="https://i.gyazo.com/e0bc9ce6013b8e9a4eb0309eab17db8b.png">

次に、ジェスチャー操作で消去するブロック要素（div要素）をCSSで定義します。
**css/style.css** を開き下記のコードを入力します。
ここでは、ブロック要素のクラス名を **box** に設定し、幅、高さ、マージン、色などの設定をしています。

{% gist naoto-github/c9bd7c1b31e682ce57d9b1f977a134d2 %}

最後に、 **index.html** を修正していきましょう。
まずは、CSSで定義した **boxクラス** のdiv要素を **body要素** 内に作成します。
このとき、div要素には **id属性** として **tap-box** を設定しておきます。
このdiv要素は、ジェスチャー操作の検出対象となるので、
**ons-gesture-detector** という要素で括っておきます。
プレビューには青色の正方形が表示されることを確認してください。

{% gist naoto-github/6d2f3a113e15815ca7e3c5cd2f28c3e7 %}

<img class="shadow" src="https://i.gyazo.com/651383480b6fb6a09498c3fdc9db086e.png">

次に、この **div要素** に対するイベント処理を **script要素** に記述します。
ここでは、**tap** イベントを検出するため、第一引数に"tap"を設定します。
この **tap** イベントが検出されると、jQueryを利用して、
div要素の **visibility** 属性を **hidden** に設定します。
jQueryの文法の説明はここでは割愛します。

{% gist naoto-github/4ec590bdece602249ddfc65df48b2821 %}

コードを入力したら、プレビュー画面の青色の正方形をタップしてみましょう。
タップするとブロックが消えるはずです。

# <img src="https://i.gyazo.com/261ba098b5b016e01a3dfb36abec79bb.png"> 課題

タップで消えるブロック要素を参考に、ホールドとスワイプで消えるブロック要素を作成してください。
アプリが完成したらプロジェクトを**エクスポート**して提出してください。
エクスポートは【ファイル】-【プロジェクトをエクスポート】から可能です。

<img class="shadow" src="https://i.gyazo.com/8883321a8c6ed9b14c7efc473e2d4dea.png">

{% include graduation_preperation_1/reference.html %}
