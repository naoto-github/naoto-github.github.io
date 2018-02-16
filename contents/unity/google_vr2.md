---
layout: page
title: "Google VR SDKで視線の検知"
top_link: false
image: "https://i.gyazo.com/94f1fd7ba2ea456b3500e3e87b9e8947.png"
---

[![https://gyazo.com/94f1fd7ba2ea456b3500e3e87b9e8947](https://i.gyazo.com/94f1fd7ba2ea456b3500e3e87b9e8947.png)](https://gyazo.com/94f1fd7ba2ea456b3500e3e87b9e8947)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">視線の検知

VR環境では、**タップ**などスマートフォンで一般に用いられる操作が出来ません。
そこで、[Google VR](https://vr.google.com/intl/ja_jp/)では、
ユーザの視線による操作を可能とした**Google VR Pointer System** が用意されています。 
今回は、視線を利用したオブジェクトの選択を実現してみましょう。
事前に準備が必要なプロジェクトの作成やパッケージの導入などは、
[Google VR SDKを利用した360°画像ビューアー](google_vr.html)を参考にしてください。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">シーンの作成

シーンを新規に作成します。
ここでは、シーンの名前は[MenuScene]とします。
まずは、[Google VR SDKを利用した360°画像ビューアー](google_vr.html)を参考に、
**空のオブジェクト**である**VR Camera**を作成し、直下に**Main Camera**と**GvrEditorEmulator**を設定します。

次に対象となる**Quadオブジェクト**をシーンに配置します。
**Quadオブジェクト**を配置するには、[GameObject]-[3D]-[Quad]を選択します。
Quadオブジェクトのインスペクターを開き、**Position** の **Z座標** を**5**に設定しましょう。
また、新規にマテリアルを作成し、Quadオブジェクトに追加しておきます（マテリアルに関しては割愛します）。
シーンを再生すると下記のように表示されます。

[![https://gyazo.com/c3f40bd4fbddf7a69081f656f82b0195](https://i.gyazo.com/c3f40bd4fbddf7a69081f656f82b0195.png)](https://gyazo.com/c3f40bd4fbddf7a69081f656f82b0195)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">視線の検知

上記で作成した**Quadオブジェクト**を視線に捉えていることを検出してみましょう。
まずは、ヒエラルキーに**GvrEventSystem**をドラッグ＆ドロップで配置します。
GvrEventSystemは視線に関するイベントの包括的な処理を行います。
また、ヒエラルキーの**Main Camera**の直下に、**GvrReticlePointer** を配置します。
GvrReticlePointerは、ユーザが見つめている一点を**ポインタ**で表します。
対象となるオブジェクトを見続けていると**ポインタ**が拡大します。
シーンを再生すると下記のように表示されます。
中央に視点を表す**ポインタ**が表示されていることが分かります。
現時点ではQuadオブジェクトを見続けても**ポインタ**に変化はありません。

[![https://gyazo.com/d859cc5fff9a2bd88d78b65a23b7bc30](https://i.gyazo.com/d859cc5fff9a2bd88d78b65a23b7bc30.gif)](https://gyazo.com/d859cc5fff9a2bd88d78b65a23b7bc30)

次に、視線を検出するためのスクリプトを**Main Camera**に設定します。
Main Cameraのインスペクターで**Add Component**を選び、**Physics Raycaster** を選択します（Physics Raycasterはスクリプトであることに注意）。

[![https://gyazo.com/faff19a2b6e19350e92d9925e8439f60](https://i.gyazo.com/faff19a2b6e19350e92d9925e8439f60.png)](https://gyazo.com/faff19a2b6e19350e92d9925e8439f60)

また、対象となるQuadオブジェクトに**Event Trigger**を設定します。
Quadオブジェクトのインスペクターで**Add Component**を選び、**Event Trigger** を選択します（Event Triggerもスクリプト）。

シーンを再生すると下記のように表示されます。
中央にある**ポインタ**がQuadオブジェクトを捉えると、
**ポインタ**が大きな円に変形することが分かります。

[![https://gyazo.com/7e1fe35aa02b1a31347f117b95615cda](https://i.gyazo.com/7e1fe35aa02b1a31347f117b95615cda.gif)](https://gyazo.com/7e1fe35aa02b1a31347f117b95615cda)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">シーンの切替

Quadオブジェクトを2秒間見続けるとシーンを切り替えるようにします。
Quadオブジェクトのインスペクターで**Add Component**を選び、**Net Script** を選択します（C#で記述する）。
ここでは、スクリプト名は**Cntrol Scene**とします。

スクリプトには下記のコードを記述します。
**enterPointer**メソッドはポインタがオブジェクトを捉えたときの処理、
**exitPointer**メソッドはポインタがオブジェクトから外れたときの処理です。
シーンの遷移は**Update**メソッドに記述します。
ポインタが2秒以上オブジェクトを捉えたことを条件に、
**Panorama Viewer**という名前のシーンに切り替えています。

{% gist naoto-github/3a2c7f921d5bbaff67b4743156f1c564 %}

上記で定義したメソッドをQuadオブジェクトの**Event Trigger**に設定します。
**Pointer Enter**には、enterPointerメソッド、
**Pointer Exit**には、exitPointerメソッドをそれぞれ設定します。

[![https://gyazo.com/54824c1feb448adbfe54657bd5e11f3b](https://i.gyazo.com/54824c1feb448adbfe54657bd5e11f3b.png)](https://gyazo.com/54824c1feb448adbfe54657bd5e11f3b)

シーンを再生すると下記のように表示されます。
**ポインタ**をQuadオブジェクトで捉えると、2秒後にシーンを遷移しています。

[![https://gyazo.com/7da50bba9cad73a36f565be409f7c2bb](https://i.gyazo.com/7da50bba9cad73a36f565be409f7c2bb.gif)](https://gyazo.com/7da50bba9cad73a36f565be409f7c2bb)



{% include unity/reference.html %}