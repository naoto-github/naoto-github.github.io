# mLAB（向研究室）ウェブサイト

椙山女学園大学 文化情報学部 向研究室のウェブサイト／ブログ（4コマ漫画・技術メモ・授業資料など）の公開用リポジトリです．

- 公開URL: https://mukai-lab.info/
- リポジトリ: `naoto-github/naoto-github.github.io`（GitHub Pages のユーザーサイト）
- 公開ブランチ: `main`（リポジトリのルートがそのままサイトのルートになります）

## 仕組み

このリポジトリには **Hugo（0.72.0）でビルド済みの静的ファイル** と，**手作業で配置した静的コンテンツ** が混在しています．
Hugo のソース（`config.toml`，`content/`，`themes/` など）はこのリポジトリには含まれていません．
`posts/` 以下に残っている `*.md` は下書き（`draft: true`）の残骸で，ビルドには使われていません．

`main` ブランチにプッシュすると，GitHub Pages により数分でサイトに反映されます．独自のビルド用 GitHub Actions はなく，GitHub Pages 標準の処理（`.nojekyll` がないため Jekyll を経由）でほぼそのまま配信されます．そのため `_` で始まるファイル・ディレクトリは公開されない点に注意してください（この README も `/README.html` として公開されます）．

## ディレクトリ構成

### Hugo が生成するもの（手で編集しない）

Hugo のビルドで上書きされるため，直接編集せずソース側を修正して再ビルドします．

| パス | 内容 |
| --- | --- |
| `index.html`, `index.xml`, `sitemap.xml` | トップページ，RSS，サイトマップ |
| `page/` | トップページのページング |
| `2016/` 〜 `2019/` | 4コマ漫画などの過去記事（日付パーマリンク） |
| `posts/` | 2019年以降の記事 |
| `pages/` | 固定ページ（`classes/` 授業資料，`tech/` 技術メモ，`projects/`，`links/`，`contact/`） |
| `categories/`, `tags/` | カテゴリ・タグ一覧 |
| `classes/index.html`, `contact/`, `projects/`, `tech/index.html` | 旧URL用ページ等 |
| `css/`, `fonts/`, `favicon/`, `images/`, `logo/` | テーマ・static 由来のアセット |

### 手作業で配置するもの

Hugo を経由せず，ファイルを直接置いて公開しているコンテンツです．

| パス | 内容 |
| --- | --- |
| `classes/<授業名>/` | 授業で配布するデータ（CSV，SQLite DB，JSON，画像・動画など） |
| `application/` | Webアプリ（CrimeHeatmap，InsectMap，WeatherPainApp など） |
| `event/` | イベント・ハッカソン用ページ（Mobirise 製のページを含む） |
| `game/` | ブラウザゲーム（8パズル，ハノイの塔など） |
| `kiso/`, `vue/`, `tech/leaflet/` | 教材用のサンプル |
| `freetile/` | jQuery プラグイン（サイトで使用） |

### 設定ファイル

| ファイル | 内容 |
| --- | --- |
| `CNAME` | 独自ドメイン `mukai-lab.info` の設定（**削除・変更しない**） |
| `ads.txt` | Google AdSense 用 |

アクセス解析には Google Analytics（`UA-77390013-1`）をテンプレート側で埋め込んでいます．

## 運用手順

### 1. 記事・固定ページを追加／修正する（Hugo）

Hugo のソースリポジトリ側で作業し，ビルド結果をこのリポジトリに出力します．

```sh
# Hugo ソースのディレクトリで
hugo new posts/xxxx.md          # 記事の作成（例）
hugo server -D                  # ローカルでプレビュー http://localhost:1313/
hugo -d ../www                  # このリポジトリへビルド（publishDir を設定していれば hugo のみ）
```

- ビルドすると全ページのヘッダー等が再生成されるため，差分が多数のファイルに及ぶのは正常です．
- ビルド時に `CNAME`，`ads.txt` や手作業で配置したディレクトリが消えないよう注意します（Hugo の `static/` に置いておくか，`--cleanDestinationDir` を使わない）．
- Hugo のバージョンを大きく変えると出力が変わることがあります（現行は 0.72.0）．

### 2. 授業データ・アプリなどを追加する（手作業）

該当ディレクトリにファイルをコピーするだけです．例えば授業データは次のURLで公開されます．

```
classes/database/sqlite1.db  →  https://mukai-lab.info/classes/database/sqlite1.db
```

授業ページ（`pages/classes/...`）からリンクする場合は，Hugo 側の記事も更新して再ビルドします．

### 3. コミットとプッシュ

```sh
cd ~/Github/www
git status                      # 変更内容の確認
git add -A
git commit -m "更新内容"
git push origin main
```

数分後に https://mukai-lab.info/ で反映を確認します．

## 注意事項

- `.DS_Store` は `.gitignore` で管理対象外にしています．
- リポジトリ全体が大きい（作業ツリー約 570MB）ため，動画などの大容量ファイルの追加は控えめにしてください．GitHub は 100MB を超えるファイルをプッシュできません．
- 公開リポジトリのため，個人情報や学生の成績などを含むファイルは置かないでください．
