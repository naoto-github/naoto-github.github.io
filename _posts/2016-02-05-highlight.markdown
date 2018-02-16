---
layout: post
title: "Jekyllにおけるシンタックスハイライト"
date: 2016-02-05T02:58:35+00:00
categories: ["Tech"]
---

Jekyllが得意とするシンタックスハイライトですが、設定でつまずいたのでメモしておきます。
シンタックスハイライトには[**rouge**](https://github.com/jneen/rouge)や[**pygments**](http://pygments.org/)が利用されるようですが、ここでは[**rouge**](https://github.com/jneen/rouge)を適用してみたいと思います。
まずは、下記のコマンドで[**rouge**](https://github.com/jneen/rouge)をインストールします。

`gem install rouge`

次に、"_config.yml"でシンタックスハイライトに[**rouge**](https://github.com/jneen/rouge)を指定しておきます。

`highlighter: rouge`

ここまでは、何てことないのですが、ここからつまずきました。
シンタックスハイライトのスタイルは"_syntax-highlighting.scss"で設定されているようです。
色などを変更したい場合は、このファイルを修正すれば良いはずですが、何故か変更が適用されません。

マークダウンでハイライトするときは、ソースコードを\`\`で囲みます。
変換後のhtmlを確認すると、該当箇所は下記のように、クラス属性に*highlighter-rouge*が設定されています。

`<code class="highlighter-rouge"></code>`

再度、"_syntax-highlighting.scss"を確認すると、クラス属性は*highlight*として設定されています。
そこで、ファイル内のクラス属性を*highlighter-rouge*に置換することで、シンタックスハイライトが適用されました。
試行錯誤の末、シンタックスハイライトの適用までこぎつけましたが、この辺り十分に理解できていないかもしれません。