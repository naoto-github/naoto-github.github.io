---
layout: page
title: "NyARToolkit for Unityで3Dモデルのアニメーション"
top_link: false
image: "https://i.gyazo.com/1a1f0c692c93350bcbf3157ff85ff93a.png"
---

[![https://gyazo.com/1a1f0c692c93350bcbf3157ff85ff93a](https://i.gyazo.com/1a1f0c692c93350bcbf3157ff85ff93a.png)](https://gyazo.com/1a1f0c692c93350bcbf3157ff85ff93a)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">3Dモデルのアニメーション

前回に引き続き、Unityのオリジナルキャラクターである「[ユニティちゃん](http://unity-chan.com/)」を利用して、
3Dモデルにアニメーションを設定してみましょう（詳細は[NyARToolkit for 3Dモデルの表示](artoolkit3.html)を参照）。

Unityで3Dモデルにアニメーションを設定するときは、**Animator Controller**というAssetを利用します。
「ユニティちゃん」のパッケージには、**UnityChanLocomotions**、**UnityChanActionCheck**、**UnityChanARPose**の
３種類の**Animator Controller** **が含まれています。

今回は、**UnityChanLocomotions**を「ユニティちゃん」に設定して、キーボードの入力に対応してアニメーションするように改良します。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Animation Controller

[UnityChan]-[Animators]に**Animation Controller**の**UnityChanLocomotions**があります。
これをドラッグし、**unitychan**のInspectorにある**Controller**に設定します。
これで、「ユニティちゃん」は**UnityChanLocomotions**で定義されたアニメーションを行うことが可能となります。

[![https://gyazo.com/579941d2517ea73413bf6d16569cbc4c](https://i.gyazo.com/579941d2517ea73413bf6d16569cbc4c.png)](https://gyazo.com/579941d2517ea73413bf6d16569cbc4c)

ここで、**UnityChanLocomotions**の内容を確認してみましょう。
**Animation Controller**は下図のようにグラフで定義されます。
まずは、**Entry**から始まり、**Idle状態**に遷移することが分かります。

[![https://gyazo.com/b70b92520da89c88aee8315c081b9e27](https://i.gyazo.com/b70b92520da89c88aee8315c081b9e27.png)](https://gyazo.com/b70b92520da89c88aee8315c081b9e27)

**Idle状態**のInspectorを確認すると、
**Motion**に**WAIT00**が設定されていることが分かります。
この**WAIT00**が3Dモデルの動きに対応します。
また、**Idle状態**から、**Locomotion状態**、**WalkBack状態**、**Rest状態**の
３つの状態に遷移可能なことが分かります。

[![https://gyazo.com/13294a9337af0868d2ff1e993d7a9489](https://i.gyazo.com/13294a9337af0868d2ff1e993d7a9489.png)](https://gyazo.com/13294a9337af0868d2ff1e993d7a9489)

では、**Idle状態**から他の状態に遷移するための条件は何でしょうか。
Transitionsの**Idle -> Rest**をクリックすると、状態遷移のための条件（Conditions）が表示されます。
ここでは、**Rest**という変数（パラメータ）が**true**であるときに**Rest状態**に遷移することが分かります。
同様に、**Locomotions状態**に遷移する条件は、**Speed**が0.1より大きいとき、
また、**WalkBack状態**に遷移する条件は、**Speed**が-0.1より小さいときということが分かります。
このように変数（パラメータ）に基づき、3Dモデルの状態が確定します。

[![https://gyazo.com/21726acde178155403a0571609c2e418](https://i.gyazo.com/21726acde178155403a0571609c2e418.png)](https://gyazo.com/21726acde178155403a0571609c2e418)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">スクリプトによる状態遷移の制御

次に、C#スクリプトを作成し、キーボードからの入力に応じて状態遷移を制御してみます。
まずは、[Create]-[C# Script]をクリックして、新規にC#のスクリプトを作成します。
ファイル名は**ARAnimations**としておきます。

まずは、キーボードの**1**を押すと**Rest状態**に遷移するようにしてみます。
キーの入力判定は**Input.GetKey()**メソッドを利用します。
引数にはstring型で対象となるキーを指定します。
また、状態遷移のトリガーとなる変数**Rest**の値を設定するには、
**SetBool()**メソッドを利用します。
引数には、String型で対象となる変数と、その値を指定します。
再生ボタンをクリックして、「ユニティちゃん」を表示した状態で、キーボードの**1**を押してみましょう。
ユニティちゃんが背伸びをするアニメーションが表示されるはずです。

{% gist naoto-github/3c2da899bba1affe00759edeec367145 %}

次に、キーボードの**2**を押すと**Locomotions状態**、**3**を押すと**WalkBack状態**、
**4**を押すと**Idle状態**に遷移するようにしてみます。
トリガーとなる変数**Speed**はfloat型のため、**SetFloat()**メソッドを利用して値を変更しています。
再生ボタンをクリックして、「ユニティちゃん」を表示した状態で、キーボードの**2**、**3**、**4**を押してみましょう。
ユニティちゃんが走ったり、後ずさりするアニメーションが表示されるはずです。
{% gist naoto-github/85f3805447eaeb6bc32fff8e60481656 %}

[![https://gyazo.com/19de693257ca6e584186bdcab63eba19](https://i.gyazo.com/19de693257ca6e584186bdcab63eba19.gif)](https://gyazo.com/19de693257ca6e584186bdcab63eba19)

[![https://gyazo.com/ba1673e91a97d623e711ddc106edf82f](https://i.gyazo.com/ba1673e91a97d623e711ddc106edf82f.gif)](https://gyazo.com/ba1673e91a97d623e711ddc106edf82f)

これまでに紹介した機能を利用して、拡張現実を利用した作品を制作してみてください。

{% include unity/reference.html %}