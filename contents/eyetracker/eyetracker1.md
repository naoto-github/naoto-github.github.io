---
layout: page
title: "Tobii Eye Trackerを利用した視線の認識"
top_link: false
image: https://i.gyazo.com/7278ccfa8d68bdb1ff12fc50372c2373.png
---

[![https://gyazo.com/7278ccfa8d68bdb1ff12fc50372c2373](https://i.gyazo.com/7278ccfa8d68bdb1ff12fc50372c2373.png)](https://gyazo.com/7278ccfa8d68bdb1ff12fc50372c2373)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">Tobii Eye Trackerとは

近年、ユーザの視線を検出する**アイトラッキング**という技術が注目されています。
アイトラッキングはマウスやキーボードの代替となりうるヒューマンインターフェイスの一つであり、
手足が不自由な障がい者のコミュニケーション装置としても活用されています。
光学センサーと画像処理技術を用いて、**眼球の動き** を解析することで、
ユーザの注視点（見つめている場所）を推定する方法が一般的です。
今回は、[トビー・テクノロジー株式会社](https://www.tobiipro.com/ja/)が
ゲーム用に提供している[Eye Tracker 4C](https://tobiigaming.com/eye-tracker-4c/)という
視線入力装置を利用して、ユーザの視線を検出するプログラムを実装してみます。
トビー・テクノロジーは自社の製品を利用したソフトウェアを開発するための
[Tobii Pro SDK](http://developer.tobii.com/)を独自に提供していますが、
[Eye Tracker 4C](https://tobiigaming.com/eye-tracker-4c/)でTobii Pro SDKを利用するためには、
[プロアップグレードキー](https://www.tobiipro.com/product-listing/tobii-pro-sdk/tobii-pro-sdk-beta/)が必要となることに注意が必要です
（**Tobii Core SDK** や **Tobii Gaming SDK** という選択肢もありますが、研究やデータ分析を用途とする場合は **Tobii Pro SDK** を利用する必要があります）。
また、開発用の言語には **Python**、**Matlab**、**C**、**Unity** などに対応していますが、
ここでは、機械学習に適した[Python](https://www.python.org/)を採用します。
**Tobii Pro SDK** の[ドキュメント](http://developer.tobiipro.com/index.html)が公開されおり、この情報を参考にしながら開発を進めることになります。

[![https://gyazo.com/3d9120766d6fada3edbed98010181f83](https://i.gyazo.com/3d9120766d6fada3edbed98010181f83.jpg)](https://gyazo.com/3d9120766d6fada3edbed98010181f83)

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">開発環境の準備

まずは、[Python](https://www.python.org/)をインストールします。
Pythonのバージョンには**3.x**と**2.x**の２通り存在しますが、
**Tobii Pro SDK** に対応している **2.x** を選択する必要があることに注意してください。
ここでは、現時点での最新バージョンである**2.7.14**を利用します(2017年10月17日)。

Pythonの本体に加えて、画像処理ライブラリの[OpenCV](http://labs.eecs.tottori-u.ac.jp/sd/Member/oyamada/OpenCV/html/index.html)と、
数値計算ライブラリの[NumPy](http://www.numpy.org/)を追加でインストールします。
インストール方法はPythonのパッケージ管理システムである**pip**を利用すれば簡単です。
コマンドプロンプトで下記のように入力します。
ここでは、**3.3.0.10** のOpenCVと **1.13.3** のNumPyがインストールされました。

    $ python -m pip install opencv-python
    Collecting opencv-python
      Downloading opencv_python-3.3.0.10-cp27-cp27m-win32.whl (29.8MB)
    Requirement already satisfied: numpy>=1.11.1 in c:\python27\lib\site-packages (from opencv-python)
    Installing collected packages: opencv-python
    Successfully installed opencv-python-3.3.0.10
    
    $ python -m pip install numpy
    Collecting numpy
      Downloading numpy-1.13.3-2-cp27-none-win32.whl (6.7MB)
    Installing collected packages: numpy
    Successfully installed numpy-1.13.3

さらに、**Tobii Pro SDK**　のライブラリを導入します。
ここでは、[Tobii Pro SDK Python for Windows](https://www.tobiipro.com/ja/product-listing/tobii-pro-sdk/#ダウンロード)の
最新バージョンである **1.2** を利用します。
ダウンロードしたZIPファイルは解凍し、**tobiiresearch.py** と **tobiiresearch**フォルダを
Pythonの開発用のフォルダにコピーしておきます。

また、上述したように、**Tobii Eye Tracker 4C** で **Tobii Pro SDK** を用いるには、
**プロアップグレードキー** が必要であり、このキーはファイルとして提供されます。
このファイルもSDKと同様にPythonの開発用のフォルダにコピーしておきます。

# <img style="margin-right:5px;margin-bottom:7px" src="/favicon/favicon-25x25.png">アイトラッキングの実装

それではPythonでアイトラッキングを実装していきましょう。
ファイル名は **MyEyeTrack.py** とします。
まずは、必要なモジュール（ライブラリ）のインポートです。
ここでは、**tobii_research**、**sys**、**time** の3つのモジュールをインポートします。
**sys** はシステム関連のモジュールであり、プログラムを終了させるときに用います。
また、**time** は時間関連のモジュールであり、スレッドを待機させるときに用います。
**tobii_research** のモジュールに関しては、**tr** という別名を付けていることに注意してください。
（OpenCVのモジュールは次回利用します）

{% gist naoto-github/9ee4cb865d0135badb3dd7a5a70fab0b %}

次に接続されている **Tobii Eye Tracker 4C** を認識します。
認識には、**find_all_eyetrackers** メソッドを利用して、**EyeTracker** オブジェクトのリストとして取得します。
接続されている **Tobii Eye Tracker 4C** は１つであるため、リストの最初の要素を取得しています。

{% gist naoto-github/409d12fe1f6b65d17c2bfe0cb330ac89 %}

認識した**EyeTracker**オブジェクトにプロダクトキーを登録します。
登録には**apply_licenses**メソッドを利用し、引数としてプロダクトキーのファイルデータを渡します。

{% gist naoto-github/ca893fa8c80f5f1ab537098dce465408 %}

次にコールバックメソッドを実装します。
これは、**Eye Tracker 4C** がユーザの視線情報を取得した際に、
自動的に呼び出されるメソッドであり、視線情報を保持している**GazeData**オブジェクトを引数として受け取ります。
**GazeData** オブジェクトは、タイムスタンプ **device_time_stamp** 、
左目の視線情報 **left_eye**、
右目の視線情報**right_eye** をフィールドとして持ちます。
ここでは、タイムスタンプに加え、ディスプレイに対する両目の視線位置をコンソールに出力しています。

{% gist naoto-github/d83000f3711e8c6fe14d3bf90d1737c3 %}

最後にコールバックメソッドを**EyeTracker**オブジェクトに登録します。
登録後に2秒間待機して、登録したコールバックメソッドを解除します。

{% gist naoto-github/6cfa7beaf1fcd5c220c3277d9cffb894 %}

では、プログラムを実行してみましょう。
実行すると下記のように両目の視線位置がコンソールに出力されます。
この視線位置はディスプレイに対する視線位置を標準化した値です。
    
    $ python MyEyeTrack.py
    Time:1085371717
    Left Eye:0.220283389091 0.668268859386
    Right Eye:0.234770789742 0.648708641529
    Time:1085382820
    Left Eye:0.218198925257 0.671267986298
    Right Eye:0.233092829585 0.647686421871
    Time:1085393924
    Left Eye:0.219358816743 0.66589474678
    Right Eye:0.230099588633 0.645437598228

次回はOpenCVを利用して、ウィンドウを作成し、視線位置に図形を描画することに挑戦してみます。

{% include eyetracker/reference.html %}
