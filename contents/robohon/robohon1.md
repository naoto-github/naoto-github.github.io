---
layout: page
title: "ロボホンの開発環境の構築"
top_link: false
image: "https://i.gyazo.com/f28e97ef3b604599c791a2dc40e76551.png"
---

[![https://gyazo.com/f28e97ef3b604599c791a2dc40e76551](https://i.gyazo.com/f28e97ef3b604599c791a2dc40e76551.png)](https://gyazo.com/f28e97ef3b604599c791a2dc40e76551)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">ロボホンとは

**ロボホン（RoBoHoN）**はシャープ株式会社が開発する人型のロボットであり、音声UIを利用して自然言語で会話が出来ることを特徴としています。
ロボホンのOSはグーグル社が開発する**Android**であり、Android用のアプリ開発と同様にロボホンのアプリを制作することができます。
ロボホンの開発に必要な[RoBoHoN Software Development Kit](https://robohon.com/)が公開されており、
ガイドラインに従って音声UIを利用したアプリを開発することが可能です。
ここで、ガイドラインとは、ロボホンの世界観を維持するための、ロボホンの **キャラクター** 、 **話し方** 、 **ユーザとの関係性** のことを指しています。
今回は、**ロボホン**のアプリ開発に必要な環境の構築方法に関して解説します。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">開発環境

ロボホンアプリの開発には下記の環境が必要です。
[ココロプラン](https://robohon.com/corporation/developer.php)には、「ビジネス基本プラン」「ビジネスプラン2000」など数種類が設定されており、
プランに応じて月毎の会話上限が定められています。
アプリ開発で頻繁に音声UIを利用する場合は高額なプランも検討する必要があります。

- ロボホン本体（現状ではエミュレータは存在しない）
- ネットワーク環境（音声UIを利用するため）
- ココロプランの契約（本体購入時に同時契約）

開発プラットフォームとしては、[Android Studio](https://developer.android.com/studio/)を利用します（ロボホンのOSは**Android 5.0**です）。
また、**Android Studio** のバージョンは **1.5** 以降が必要とされており、今回は現時点での最新版である **2.3.3.0**を採用します(2017年9月18日)。
ファイルサイズは約1.9GBと、かなり大きいので注意してください。

[![https://gyazo.com/749d76c6d2de671db0afd7885e3fab70](https://i.gyazo.com/749d76c6d2de671db0afd7885e3fab70.png)](https://gyazo.com/749d76c6d2de671db0afd7885e3fab70)

**Android Studio**のインストール・パッケージをダウンロードしたら、インストールを始めましょう。
インストールが完了したらロボホンのアプリ開発に必要なパッケージを追加でインストールします。
まずは、バージョン **1.5** の **Android SDK**です。
**Settings**のメニューから[Appearance&Behavior]-[System Settings]-[Android SDK]を選択し、
**Android 5.0 (Lollipop)** にチェックを入れて **Apply** をクリックします。

[![https://gyazo.com/7d5a5c7d6dad402ff422be74b7917290](https://i.gyazo.com/7d5a5c7d6dad402ff422be74b7917290.png)](https://gyazo.com/7d5a5c7d6dad402ff422be74b7917290)

同様に**Android SDK Build-Tools**を追加します。
バージョンは**21.0.0以降**にチェックを入れて **Apply** をクリックします（**Show Package Details**をクリックするとバージョンの選択が可能です）。

[![https://gyazo.com/0a24f89bff194af6f3566ee2b5a3bf2b](https://i.gyazo.com/0a24f89bff194af6f3566ee2b5a3bf2b.png)](https://gyazo.com/0a24f89bff194af6f3566ee2b5a3bf2b)

開発したアプリをデバッグする際に、音声対話に失敗することを回避するために、
**Instant Run** の設定を無効化します。
**Settings**のメニューから[Build, Execution, Developemnt]を選択し、全てのチェックをはずします。
これで、**Android Studio** の準備は完了です。

[![https://gyazo.com/abac755143d02210d2045c2f0501b234](https://i.gyazo.com/abac755143d02210d2045c2f0501b234.png)](https://gyazo.com/abac755143d02210d2045c2f0501b234)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">テンプレートの導入

ロボホンアプリの開発には提供されているテンプレートを利用することが出来ます。
そこで、**Android Studio**に、このテンプレートを導入しましょう。
ここからは、[RoBoHoN Software Development Kit](https://robohon.com/)が必要となります。
ファイルをダウンロードしたら、**0803_SR01MW_RoBoHoN_Template_Vxxd_xx_xx.zip**を展開します。
展開後に含まれるpluginsフォルダを、Android Studioのインストールフォルダに上書きコピーします。
この後で説明するプロジェクトの新規作成の際に、テンプレート一覧に**Robohon Activity**が表示されていれば完了です。

[![https://gyazo.com/b6f2498b2bda988aeb0bbd418ed41cb3](https://i.gyazo.com/b6f2498b2bda988aeb0bbd418ed41cb3.png)](https://gyazo.com/b6f2498b2bda988aeb0bbd418ed41cb3)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">プロジェクトの作成

**Android Studio**を起動して、テンプレートを利用した新規プロジェクトを作成しましょう。
まずは、**アプリの名前**、**企業ドメイン**、**プロジェクトのフォルダ**などを入力します。

[![https://gyazo.com/9f983b95ae43e77f76a02b45f5d5201a](https://i.gyazo.com/9f983b95ae43e77f76a02b45f5d5201a.png)](https://gyazo.com/9f983b95ae43e77f76a02b45f5d5201a)

次に開発するデバイスを選択します。
ここでは、**Phone and Tablet** にチェックを入れ、
Minimum SDKにはロボホンのOSバージョンである **API 21: Android 5.0 (Lollipop)** を選択します。

[![https://gyazo.com/0ee5a42a0d68147e6573827a4e4133eb](https://i.gyazo.com/0ee5a42a0d68147e6573827a4e4133eb.png)](https://gyazo.com/0ee5a42a0d68147e6573827a4e4133eb)

さらに先程導入したテンプレート **Robohon Activity** を選択します。
ここで **Robohon Activity** が表示されていなければ、テンプレートの導入に失敗している可能性があります。

[![https://gyazo.com/0ae4418c72d77d0be10bc03da31f61bd](https://i.gyazo.com/0ae4418c72d77d0be10bc03da31f61bd.png)](https://gyazo.com/0ae4418c72d77d0be10bc03da31f61bd)

最後に **Activity Name** と **Layout Name** を入力します（デフォルトの設定で特に問題ありません）。
このとき、**Generate Layout File** のチェックは外さないように注意して、**Finish** をクリックしましょう。

[![https://gyazo.com/6f2db09494e07bebc1101e7ebee0edd2](https://i.gyazo.com/6f2db09494e07bebc1101e7ebee0edd2.png)](https://gyazo.com/6f2db09494e07bebc1101e7ebee0edd2)

プロジェクトを作成したら、テンプレートのアプリを実行してみます。
**Run App** をクリックして、**SHARP SR01MW (Android 5.0.2, API21)** を選択しましょう。
このとき、上記デバイスが表示されていない場合は、**ADBドライバ** がインストールされていない、
または、**USBデバッグ設定** がオンになっていないなどの理由が考えられます。
下記のように動作すれば開発環境の準備は完了です。

[![https://gyazo.com/7b7ee49223a8c61ae3fe14cb622638f7](https://i.gyazo.com/7b7ee49223a8c61ae3fe14cb622638f7.png)](https://gyazo.com/7b7ee49223a8c61ae3fe14cb622638f7)

<iframe width="560" height="315" src="https://www.youtube.com/embed/jWBBKrrUD48?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

次回は開発キットに同梱されているサンプルプロジェクトを基に
アプリの開発方法について解説します。

{% include robohon/reference.html %}

