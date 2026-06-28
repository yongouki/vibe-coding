# 作業指示書 01 ─ Web 前面枝

**前提:** 先に `00_共通仕様.md` を読むこと。見本は `lessons/htmlcss.html`。
**この枝のkind:** すべて `kind-web`（アクセント色＝シアン）
**書く順:** `jsdom` → そのあと `localstorage` / `static-deploy` / `ui-structure` は並行可。
**前提ノード `htmlcss` は完成済み。即着手OK。**

---

## jsdom — 押したら動いてほしい
- ファイル: `lessons/jsdom.html` ／ body: `lesson kind-web`
- 前提: htmlcss（✅完成・lnav前に置く） ／ 次: localstorage
- kicker: `JavaScript / DOM`
- lead素材(desc): ボタンや入力に反応して、画面の表示を書き換える。ブラウザの中だけで動く部分。
- できるようになること(points): イベントを受けて処理する／状態から画面を更新する
- AIへの言い方(SAY): 『サーバーは使わず、クリックを受けて状態を更新し、その値で画面の表示を書き換えて（JavaScriptとDOM操作で）』
- やってみよう(MISSION):
  - do: ボタンを押すと「今日の運勢」がランダムで表示される画面を作ろう。
  - prompt: 「1ファイルのHTMLで、ボタンを押すと用意した5つの運勢からランダムに1つを画面に表示してください。表示はJavaScriptでテキストを書き換える方法にし、既存の構造は大きく変えず、変更点も説明してください。」
- チェックポイント(quizヒント): 画面の変化は、サーバーへ行かなくても起こせる ─「イベント→状態→表示更新」はブラウザ内で完結する点を確かめる一言。

## localstorage — 次に開いても残したい
- ファイル: `lessons/localstorage.html` ／ body: `lesson kind-web`
- 前提: jsdom ／ 次: （分岐：database 等。未作成なら準備中）
- kicker: `localStorage`
- lead素材(desc): 入力や進捗を、同じ端末・同じブラウザの中に残す。サーバーなしで『次も残る』を実現する。
- できるようになること(points): JSONに変換して保存・読み出す／“その端末だけ”に残ると理解する
- AIへの言い方(SAY): 『この内容をlocalStorageに保存して、次に開いたとき復元して。サーバーはまだ使わない』
- やってみよう(MISSION):
  - do: 入力欄と保存ボタンを作り、ページを閉じても文字が残るようにしよう。
  - prompt: 「1ファイルのHTMLで、入力欄、保存ボタン、削除ボタンを作ってください。入力内容はlocalStorageへ保存し、ページを再度開いたときに復元してください。既存のHTML構造は大きく変更せず、変更点も説明してください。」
- チェックポイント(quizヒント): 『他の端末でも』という要求が無いうちはブラウザ内保存で足りる、という線引きを確かめる。

## static-deploy — URLで見せたい
- ファイル: `lessons/static-deploy.html` ／ body: `lesson kind-web`
- 前提: jsdom ／ 次: product（未作成なら準備中）
- kicker: `Static Hosting`
- lead素材(desc): ブラウザだけで動くものを、無料で誰でも見られる場所に置く。サーバーは要らない。
- できるようになること(points): HTML/CSS/JSをそのまま公開できる／URLを共有すれば誰でも開ける
- AIへの言い方(SAY): 『これはブラウザだけで動くので、GitHub Pagesなどの静的ホスティングで公開する手順を教えて』
- やってみよう(MISSION):
  - do: 実習例としてGitHub Pagesを使い、作ったHTMLをURLで開けるようにしよう。
  - prompt: 「静的ホスティングの学習例として、手元の index.html を GitHub Pages で公開する手順を初めての人向けに教えてください。GitHub Pagesだけが唯一の選択肢ではないことを明記し、他の静的ホスティング候補との違いを短く説明してから、リポジトリ作成からURLで開けるまでを案内してください。」
- チェックポイント(quizヒント): バックエンドの処理が無いアプリにサーバー契約は要らない、を確かめる。
- 補足: GitHub Pages は「唯一解ではなく一例」と本文でも明記する（過剰構成を避ける思想）。

## ui-structure — 画面が増えても整理したい
- ファイル: `lessons/ui-structure.html` ／ body: `lesson kind-web`
- 前提: jsdom ／ 次: 準備中
- kicker: `Components / State / Routing`
- lead素材(desc): 画面や状態が増えて一枚のコードでは追いにくくなったら、部品・状態・ページ遷移に分けて整理する。
- できるようになること(points): UIを役割ごとのComponentに分ける／状態の置き場所とRoutingを決める
- AIへの言い方(SAY): 『1ファイルが大きくなった。役割ごとの部品(Component)に分けて、状態の置き場所とページ遷移(Routing)を整理して』
- やってみよう(MISSION):
  - do: 運勢アプリを、結果表示・履歴・設定の3つの部品に分ける設計図を作ろう。
  - prompt: 「現在は1ファイルのHTMLとJavaScriptで運勢アプリを作っています。結果表示、履歴、設定の責任を分けるComponent構成と、どこにStateを置くかを提案してください。まだフレームワークへ移行すべきかも、Vanilla JSを続ける案と比較してください。」
- チェックポイント(quizヒント): 保存場所ではなく「画面の責任と状態の所有者」を整理する問題、という観点。
