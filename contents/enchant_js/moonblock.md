---
layout: page
title: "MOONBlockでゲームプログラミング"
top_link: false
image: "https://i.gyazo.com/b8f987aeb531e03dd9cd3a076d09a0b3.png"
---

[![https://gyazo.com/b8f987aeb531e03dd9cd3a076d09a0b3](https://i.gyazo.com/b8f987aeb531e03dd9cd3a076d09a0b3.png)](https://gyazo.com/b8f987aeb531e03dd9cd3a076d09a0b3)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">MOONBlockとは

[MOOBlock](http://www.moonblock.jp/)は[株式会社ユビキタスエンターテインメント](http://www.uei.co.jp/)が
開発する教育用のプログラミング言語です。
普通のプログラミング言語（C言語など）は複雑な命令や制御を理解する必要がありますが、
MOONBlockではブロックを並べるだけで簡単にプログラミングできるという特徴があります
（同様の方法でプログラミングが可能なMITメディアラボ開発の[SCRATCH](https://scratch.mit.edu/)も有名です）。
事前にソフトウェアをインストールする必要もなく、
ウェブブラウザ（IE、Chromeなど）がインストールされていれば動作させることが可能です。
今回はこのMOONBlockを利用して簡単なゲームを制作することを目指しましょう。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">MOONBlockの基本

MOONBlockはゲームエンジンの一つである[enchant.js](http://enchantjs.com/ja/)がベースとなっています。
このため、MOONBlockで作成したプログラムを基にPC、Mac、iOS、Androidなど様々なプラットフォームで動作するアプリケーションを開発することが可能です。
[enchant.js](http://enchantjs.com/ja/)は**MITライセンス**であり、ソースコードの著作権の表示を条件に、
「ソースコードの改変」「再配布」が認められています
（詳細は[enchant.jsのライセンス](http://enchantjs.com/ja/resource-ja/license/)を参照）。

また、制作したゲームをゲーム投稿サイトの[9leap](http://9leap.net/)に投稿することで、
ゲームを体験したユーザから様々なフィードバックを得ることができます（コンテストに応募して賞金を狙うことも）。
下記は研究室の学生が制作し9leapに応募した作品です。
時間があるときに遊んでみてください。

**星を集めよう**はスライムを避けながら星（スター）を３つ集めるゲームです。
<script type="text/javascript" src="http://9leap.net/games/4474/embed.js"></script>

**イライラ棒アプリ**は木、森などの障害物に当たることなく、ゴールを目指すゲームです。
<script type="text/javascript" src="http://9leap.net/games/4473/embed.js"></script>

**ひよこマン**は、３種類に変身するひよこを操りながら、鍵を集めてゴールに向かうゲームです。
<script type="text/javascript" src="http://9leap.net/games/4280/embed.js"></script>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">MOONBlockのゲーム素材画像

ゲームを制作する際に必要なアイコン、キャラクター、背景などの素材画像は、
MOONBlockであらかじめ用意されています（非営利目的であれば自由に利用可能）。
アイコンは**16&times;16**ピクセル、キャラクターは**32&times32;**ピクセル、
背景は**320&times;320**ピクセルで構成されています。
これらの素材画像を重ねて表示することでゲーム画面は構成されます。

ここでキャラクターの素材画像（**chara1.png**）に注目してみましょう。
少しずつ異なるクマの画像が横に並んでいることが分かります。
これらの画像を、パラパラ漫画の要領で、素早く切り替えることでクマが動いているように見せることができます。

[![https://gyazo.com/6b31a419545689f0acaa151bde1e85db](https://i.gyazo.com/6b31a419545689f0acaa151bde1e85db.png)](https://gyazo.com/6b31a419545689f0acaa151bde1e85db)

**Chara1.png**

[![https://gyazo.com/83b64c3d776504a0aff0119b91e1af4f](https://i.gyazo.com/83b64c3d776504a0aff0119b91e1af4f.png)](https://gyazo.com/83b64c3d776504a0aff0119b91e1af4f)

**icon0.png**

[![https://gyazo.com/acbaf3007c88edced06d1cbec2d26072](https://i.gyazo.com/acbaf3007c88edced06d1cbec2d26072.png)](https://gyazo.com/acbaf3007c88edced06d1cbec2d26072)

**rpg.png**

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">MOONBlockの開発画面

下記のリンクをクリックして、MOONBlockのサイトを開きましょう！

[http://www.moonblock.jp/](http://www.moonblock.jp/)

画面上に並んでいる「パペット」「ビヘイビア」などの箱を「キット」と呼びます。
キットにはプログラミングに必要なブロックが使用目的に合わせて別れて入っています。
キットは左右にドラッグすることで全ての種類を確認できます。

画面右上にある青い正方形は実行画面です。
プログラムの実行結果はここで確認できます。
大きさは背景画像と同じ**320&times;320**ピクセルです。

画面左下にあるボタンをクリックすると、プログラムの保存や、プログラムの実行ができます。
一端保存して自宅でプログラミングの続きをしたり、**9leap**に作品を投稿するときに利用しましょう。

画面右下にあるゴミ箱には、不要になったブロックを入れます。
一度捨てたブロックは復元できないので注意してください。

[![https://gyazo.com/546848fda0c1ed68380e070dc402bb3a](https://i.gyazo.com/546848fda0c1ed68380e070dc402bb3a.png)](https://gyazo.com/546848fda0c1ed68380e070dc402bb3a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">くまのバナナ拾いゲームの制作

くまが画面内にあるバナナを拾うゲームを作ってみましょう。

まずは、クマのキャラクターを画面に出現させましょう。
「パペット」キットから「**パペット**」ブロックをドラッグしてワークスペースに配置します。
パペットとは”操り人形”の意味であり、MOONBlockではクマなどのキャラクターやバナナなどのアイテムを指します。
次に、「ビヘイビア」キットから「**出現**」ブロックを引き出し、「パペット」ブロックに下図のように接続します。
ビヘイビアとは”振る舞い”の意味であり、パペットの動きなどを設定するときに用います。
**Runボタン**をクリックして実行してみましょう。
このときのブロックの状態は[ここ](http://moonblock.jp/#s/577dee54824c61467870804)から確認できます。

[![https://gyazo.com/cb6f6fb4350156c7eef9c6a0bad21140](https://i.gyazo.com/cb6f6fb4350156c7eef9c6a0bad21140.png)](https://gyazo.com/cb6f6fb4350156c7eef9c6a0bad21140)

[![https://gyazo.com/d54344ee53c4cebf7fe6634586e5fad1](https://i.gyazo.com/d54344ee53c4cebf7fe6634586e5fad1.png)](https://gyazo.com/d54344ee53c4cebf7fe6634586e5fad1)


クマをマウスでクリックした位置に移動させましょう。
「ビヘイビア」キットから「**動き**」ブロックを引き出し、「パペット」ブロックに下図のように接続します。
このとき、「動き」ブロックのパラメータを「**タップしたところに向かって移動**」「**全方向**」にしましょう。
**Run**ボタンをクリックして実行してみましょう。
このときのブロックの状態は[ここ](http://moonblock.jp/#s/577defd9172151467871193)から確認できます。

[![https://gyazo.com/dc2978cd2174d97b969d812ed4785080](https://i.gyazo.com/dc2978cd2174d97b969d812ed4785080.png)](https://gyazo.com/dc2978cd2174d97b969d812ed4785080)

[![https://gyazo.com/2bf09ba3d1e2df81746367e558a5552e](https://i.gyazo.com/2bf09ba3d1e2df81746367e558a5552e.gif)](https://gyazo.com/2bf09ba3d1e2df81746367e558a5552e)

画面上にバナナをたくさん出現させましょう。
「パペット」キットから「**パペット**」ブロックをドラッグしてワークスペースに配置します。
ここで、デフォルトで設定されている**くまの画像（chara1.png）**をクリックして**アイコン画像（icon0.png）**に変更します。
次に、「ビヘイビア」キットから「**設定**」ブロックを引き出し、「パペット」ブロックに下図のように接続します。
このとき、「設定」ブロックのパラメータを「フレーム」「16」にしましょう。
**16**はicon0.pngに含まれている16番目の画像（つまりバナナの画像）という意味です。
最後に「ビヘイビア」キットから「**出現**」ブロックを引き出し、「パペット」ブロックに下図のように接続します。
このとき、「出現」ブロックのパラメータを「たくさんでる」「10」にしましょう。
**Runボタン**をクリックして実行してみましょう。
このときのブロックの状態は[ここ](http://moonblock.jp/#s/577e0b0f8ec0e1467878159)から確認できます。

[![https://gyazo.com/c4c0eb4dc903c3cd6bfcc40c60d5d8f5](https://i.gyazo.com/c4c0eb4dc903c3cd6bfcc40c60d5d8f5.png)](https://gyazo.com/c4c0eb4dc903c3cd6bfcc40c60d5d8f5)

[![https://gyazo.com/4e7dc838c6ecfcaeea674c3fafcfffd3](https://i.gyazo.com/4e7dc838c6ecfcaeea674c3fafcfffd3.gif)](https://gyazo.com/4e7dc838c6ecfcaeea674c3fafcfffd3)

クマとバナナが接触するとバナナが消えてスコアに10点加算しましょう。
「ビヘイビア」キットから「**当たり判定**」ブロックを引き出し、「パペット」ブロックに下図のように接続します。
このとき、「当たり判定」ブロックのパラメータを「くま」「消える」「10」にしましょう。
「ゲーム」キットから「**スコアボード**」ブロックをドラッグしてワークスペースに配置します。
この「スコアボード」ブロックは画面上にスコアを表示させるために用います。
「Run」ボタンをクリックして実行してみましょう。
このときのブロックの状態は[ここ](http://moonblock.jp/#s/577e0bd0590ba1467878352)から確認できます。

[![https://gyazo.com/2de0fbfeeee6f2f35819599a04067b6f](https://i.gyazo.com/2de0fbfeeee6f2f35819599a04067b6f.png)](https://gyazo.com/2de0fbfeeee6f2f35819599a04067b6f)

[![https://gyazo.com/9f15611272d86eebce7e96e923dbb9d9](https://i.gyazo.com/9f15611272d86eebce7e96e923dbb9d9.gif)](https://gyazo.com/9f15611272d86eebce7e96e923dbb9d9)

バナナが全て消えるとゲームクリアを表示してゲームを終了しましょう。
「リアクション」キットから「**リアクション**」ブロックを引き出し、「パペット」ブロックに下図のように接続します。
このとき、「リアクション」ブロックのパラメータを「全滅した」にしましょう。
次に、「制御」キットから「**数秒後に実行**」ブロックと、
「ゲーム」キットから「**ゲームクリア**」を引き出し、「リアクション」ブロックに下図のように接続します。
この「ゲームクリア」ブロックはゲームを終了し「CLEAR」を画面に表示させます。
「Run」ボタンをクリックして実行してみましょう。
このときのブロックの状態は[ここ](http://moonblock.jp/#s/577e0ca834aaa1467878568)から確認できます。

[![https://gyazo.com/78fbdc964c177896b059f33de9cd3bde](https://i.gyazo.com/78fbdc964c177896b059f33de9cd3bde.png)](https://gyazo.com/78fbdc964c177896b059f33de9cd3bde)

[![https://gyazo.com/70de3eb4c5b8212fc20927ea65298287](https://i.gyazo.com/70de3eb4c5b8212fc20927ea65298287.gif)](https://gyazo.com/70de3eb4c5b8212fc20927ea65298287)

背景を設定しましょう。
「ゲーム」キットから「背景」ブロックをドラッグしてワークスペースに配置します。
このとき、「背景」ブロックのパラメータを「テーブル」にしましょう。
「Run」ボタンをクリックして実行してみましょう。
このときのブロックの状態は[ここ](http://moonblock.jp/#s/577e0d94e52d71467878804)から確認できます。

[![https://gyazo.com/8c41b939b7b74de739a1e4b2cc55b75c](https://i.gyazo.com/8c41b939b7b74de739a1e4b2cc55b75c.png)](https://gyazo.com/8c41b939b7b74de739a1e4b2cc55b75c)

[![https://gyazo.com/86d7635c4d57b22833e222ae4bf79763](https://i.gyazo.com/86d7635c4d57b22833e222ae4bf79763.gif)](https://gyazo.com/86d7635c4d57b22833e222ae4bf79763)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">くまのバナナ拾いゲームの改良

### クマにアニメーションを設定しよう

「ビヘイビア」キットの「**フレームシーケンス**」ブロックを利用して、クマにアニメーションを設定しよう（正解は[ここ](http://moonblock.jp/#s/577e12488d0ab1467880008)）。

[![https://gyazo.com/5d8cc7b4fa7cf867d829be5835e54099](https://i.gyazo.com/5d8cc7b4fa7cf867d829be5835e54099.gif)](https://gyazo.com/5d8cc7b4fa7cf867d829be5835e54099)

### 爆弾を追加しよう

爆弾を画面に出現させ、爆弾に触れるとゲームオーバーになるように変えてみましょう（正解は[ここ](http://moonblock.jp/#s/577e11f15f6471467879921)）。

[![https://gyazo.com/ca904124ef3799d9d57be1aec05fab93](https://i.gyazo.com/ca904124ef3799d9d57be1aec05fab93.gif)](https://gyazo.com/ca904124ef3799d9d57be1aec05fab93)

### モンスターを出現させよう

ランダムに動くモンスターを出現させ、モンスターに触れるとゲームオーバーになるように変えてみましょう（正解は[ここ](http://moonblock.jp/#s/577e12ceb9f5a1467880142)）。

[![https://gyazo.com/c4bbcfad7bba5727c6c6d9213ccedc82](https://i.gyazo.com/c4bbcfad7bba5727c6c6d9213ccedc82.gif)](https://gyazo.com/c4bbcfad7bba5727c6c6d9213ccedc82)

### 自由にゲームを改良しよう

様々なブロックを利用して、自由にゲームを改良してください。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">最後に

教育用のプログラミング言語MOONBlockを利用して、ゲーム・プログラミングを体験してもらいました。
これを機会にプログラミングに興味を持ち、より高度なプログラミングにチャレンジすることを期待しています。
MOONBlockで面白いオリジナルのゲームが作成できたら、開発画面の左下にある「セーブ」ボタンをクリックして表示される
「**QRコード**」または「**URL**」を記録しておきましょう。
皆さんの中から優秀なゲームデザイナーやエンジニアが生まれることを楽しみにしています。

{% include enchant_js/reference.html %}