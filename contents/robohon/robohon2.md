---
layout: page
title: "アプリトリガとユーザトリガによる発話"
top_link: false
image: "https://i.gyazo.com/eda3a28b300bedb562b9e858dc667ad1.png"
---

[![https://gyazo.com/eda3a28b300bedb562b9e858dc667ad1](https://i.gyazo.com/eda3a28b300bedb562b9e858dc667ad1.png)](https://gyazo.com/eda3a28b300bedb562b9e858dc667ad1)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">サンプルアプリ

ロボホンの開発キット[RoBoHoN Software Development Kit](https://robohon.com/)には、
下記のサンプルアプリが同梱されています。
今回は基本的な音声UIの使い方を理解するため**SampleSimple**のソースコードを解析し、
改良してみましょう。

- **SampleSimple** 音声UIを使った基本的な機能のアプリ
- **SampleScenario** シナリオで使える変数やタグなどのアプリ
- **SampleProjector** プロジェクターを利用したアプリ
- **SampleAddressBook** 電話帳を利用したアプリ
- **SampleCamera** カメラを利用したアプリ
- **SampleDance** ダンスを利用したアプリ
- **SampleMultilingual** 多言語対応を実装したアプリ

まずは、**Android Studio** で上記のサンプルを読み込み、プロジェクトとして展開します。
Android Studioを起動したら、[File]-[Open]-[Open File or Project]を選択し、
開発キットに含まれる **SampleSimple** のフォルダをクリックします。
ビルドが終了したら、**Run App**をクリックして実行してみましょう。

実行するとロボホンの背面には「ACCOST」「RESOLVE VARIABLE」「SET_MEMORY_P」「GET_MEMORY_P」「FINISH APP」の５つのボタンが表示されています。
ここで、「ACCOST」ボタンをタップすると、「アプリから発話開始するサンプルだよ」とロボホンが発話します。
ちなみに、**ACCOST**とは、アプリから強制的にトピック（発話やモーション）を実行することを意味します。

[![https://gyazo.com/e914248a043f86318c7f7ed6af9309c3](https://i.gyazo.com/e914248a043f86318c7f7ed6af9309c3.png)](https://gyazo.com/e914248a043f86318c7f7ed6af9309c3)

<iframe width="560" height="315" src="https://www.youtube.com/embed/IQADSdnoojk?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">アプリトリガによる発話

最初に、ボタンなどアプリからのアクションをトリガとして、トピックを実行する**アプリトリガによる発話**について学びます。
まずは「ACCOST」ボタンに該当するソースコードを確認していきましょう。
一般にアンドロイドのアプリは**Activity**クラスを継承して開発します。
**Activity**クラスにはライフサイクルがあり、アプリを起動すると下図のようにメソッドを実行します。

[![https://gyazo.com/33d6fd978fcc75cf7704c083a8a2e4c6](https://i.gyazo.com/33d6fd978fcc75cf7704c083a8a2e4c6.png)](https://gyazo.com/33d6fd978fcc75cf7704c083a8a2e4c6)

ここで、「ACCOST」ボタンに関する振る舞いは、**onCreate()**メソッドの内部にあり、下記のように記述されています。
最初に、リソースIDを利用して、変数*voiceAccostButton*に、Buttonクラスのオブジェクトを代入し、ボタンをタップしたときのイベントリスナーを登録しています。
ボタンがタップされると、**VoiceUIVariableListHelper** クラスのインスタンスに実行したい**ACCOST**を登録し、**VoiceUIManagerUtil** クラスのupdateAppInfoメソッドで発話を実行しています。
ここで、*ScenarioDefinitions.ACC_ACCOST* には、実行するACCOSTの名称である **jp.co.sharp.sample.simple.accost.t1** が代入されています。

{% gist naoto-github/733dd8ba0cf6303d0caeeae6025b6b61 %}

ここでのポイントは、実行する**ACCOST**の定義です。
具体的な定義は、シャープ株式会社が独自に定義している **HVML(Hyper Voice Markup Language)** というXMLファイルに記述します。
ここでは、assetsフォルダに含まれる**jp_co_sharp_sample_simple_accost.hvml**が該当します。

{% gist /naoto-github/78203cd72fa06c2dc29d6797988bccf2 %}

HVMLは**head**タグと**body**タグで構成されており、
**ACCOST**は、**head** タグ内において、**accost** タグを用いて定義されます。
**word**属性は、ACCOSTの名称であり、一意に設定する必要があります。
上記の *ScenarioDefinitions.ACC_ACCOST* の値と一致することを確認してください。
**topic_id**属性は、実行するトピック（発話やモーション）のidを指定します。

トピックは、**body**タグ内において、**topic** タグを用いて定義されます。
**id**属性は、トピックのIDであり、HVMLファイル内で一意に設定する必要があります。
**listen**属性は、ユーザからの発話を受け付けるかどうかを指定します。

具体的なロボホンの動作は、**topic** タグ内において、**action** タグで定義します。
**id**属性は、実行順序を示しており、値が小さい順に実行されます。
ここで、**speech** タグで発話、**behavior** タグでモーションを指定します。

では、HVMLファイルを下記のように修正してみましょう。
**speach**タグには「君の名は」、**behavior** タグには「右手をあげてふる」を示す「0x060009」を指定します。
修正したら**Run App**をクリックして実行してみましょう。

{% gist naoto-github/c155d1511aae65aa309ba861b3da9803 %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/ER5s9VlL87k?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ユーザトリガによる発話

次に、ユーザの発話をトリガとして、トピックを実行する**ユーザトリガによる発話**について学びます。
今回はアプリからのアクションをトリガとしないため、**Activity** クラスにACCOSTのような記述はありません。

ACCOSTと同様、具体的な定義は**HVML**に記述します。
ここでは、assetsフォルダに含まれる**jp_co_sharp_sample_simple_talk.hvml**を確認しましょう。

{% gist naoto-github/ce84453a3f09ce6deec7fe947ac48ca9 %}

トリガの条件は、**head**タグ内において、**situation** タグを用いて定義されます。
**trigger**属性には、*user-word*、または、*env-event* のいずれかを指定します。
ユーザの発話をトリガにする場合は前者の *user-word* を指定します。
**topic_id**属性は実行するトピック（発話やモーション）のidを指定します。
タグ内には**イマカラシャベルヨ near ${LVcsr:Kana}**と入力されています。
これは、「認識したユーザの発話が**イマカラシャベルヨ**に似ている」ことを意味しています。
ここで、**near** は、左辺と右辺が似ているかどうかを判定する条件式であり、
右辺の${Lvcsr:Kana}は、ユーザの発話をカタカナで返した文字列を表します（かな漢字の場合は${Lvcsr:Basic}を用いる）。

    <situation priority="75" topic_id="t1" trigger="user-word">イマカラシャベルヨ near ${Lvcsr:Kana}</situation>

上記の条件を満たしたとき、**topic** タグで定義された動作に遷移します。
ここでは、ロボホンに「目が黄色になったら喋ってね」と発話させています。

では、HVMLファイルを下記のように修正してみましょう。
条件には「キミノナワ」を指定し、
**speach**タグには「僕の名前はロボホンです」、**behavior** タグには「腰に手」を示す「0x060006」を指定します。
修正したら**Run App**をクリックして実行してみましょう。

{% gist naoto-github/7635a60cae9d353395ddab580cc16c65 %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/-JKn5xN4ovQ?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

今回は**アプリトリガによる発話**と**ユーザトリガによる発話**の基本について解説しました。
HVMLは仕様がかなり複雑であり、上記で示した**accost**や**situation**以外にもたくさんのタグが規定されています。
必要に応じてドキュメントを参考にしながら実装することが必要になります。

{% include robohon/reference.html %}

