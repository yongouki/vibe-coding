# 作業指示書 03 ─ AI・サーバー枝

**前提:** 先に `00_共通仕様.md` を読むこと。**§2の事前作業（`kind-server` 追加）が済むまで着手しない。**
**この枝のkind:** `http`/`api`/`ai-eval`/`ai-cost` = `kind-ai`（ピンク）、`backend`/`database`/`auth` = `kind-server`（ブルー）
**書く順:** `http` → `backend` → `database` → `api` → （`auth` / `ai-eval`） → `ai-cost`
（`auth` は database後、`api` は http+backend後、`ai-eval` は api後、`ai-cost` は ai-eval後）
**前提ノード `jsdom`（http用）はWeb枝。jsdomが書けていれば http から着手可。**

---

## http — 外のデータを呼びたい
- ファイル: `lessons/http.html` ／ body: `lesson kind-ai`
- 前提: jsdom ／ 次: backend / api
- kicker: `HTTP / JSON`
- lead素材(desc): 画面やプログラムが外部サービスとやり取りする共通語。リクエストとレスポンス、JSONの読み方。
- できるようになること(points): リクエストとレスポンスを区別する／JSONのキーと値を読み取る
- AIへの言い方(SAY): 『この公開APIをfetchで呼んで、返ってきたJSONのこのキーを画面に出して。読み込み中と失敗時の表示も入れて』
- やってみよう(MISSION):
  - do: 無料の公開API（猫の画像など）を呼んで、結果を画面に表示しよう。
  - prompt: 「1ファイルのHTMLで、ボタンを押すと無料で使える公開APIを fetch で呼び、返ってきたJSONの中身を画面に表示してください。読み込み中と失敗時の表示も入れて、変更点を説明してください。」
- チェックポイント(quizヒント): 通信できていないのか、通信後に入力を拒否されたのか（例: 422）を区別する。

## backend — ブラウザの外で動かしたい
- ファイル: `lessons/backend.html` ／ body: `lesson kind-server`
- 前提: localstorage または http（どちらか到達でOK） ／ 次: database / api
- kicker: `Server / Runtime`
- lead素材(desc): ブラウザの外でコードを動かす場所。データを皆で共有したり、秘密情報を隠したくなった瞬間に必要になる。
- できるようになること(points): 『どこでコードが動くか』を意識する／ブラウザに置けない処理をここへ移す
- AIへの言い方(SAY): 『APIキーを隠したい／データを共有したいので、ブラウザの外（サーバー側）で動かす最小構成にして』
- やってみよう(MISSION):
  - do: 実習例としてNode.jsを使い、「Hello」とだけ返す最小のサーバーを立てよう。
  - prompt: 「Server / Runtimeの学習例としてNode.jsを使い、/hello にアクセスすると {"message":"Hello"} を返す最小のサーバーを作ってください。Node.jsが唯一の選択肢ではなく、PythonやBaaS、Serverlessも要求次第で候補になると明記してください。ローカルでの起動方法と、ブラウザや fetch から呼ぶ方法も説明してください。」
- チェックポイント(quizヒント): 「自分の端末だけ」を超えた瞬間に何が足りなくなるか。Node.jsは一例で唯一解ではないと明記。

## database — 端末を越えて残したい
- ファイル: `lessons/database.html` ／ body: `lesson kind-server`
- 前提: backend ／ 次: auth
- kicker: `Database`
- lead素材(desc): 多くのデータを、端末をまたいで保存・検索する場所。共有や履歴が欲しくなったら使う。
- できるようになること(points): 保存したい項目と関係を決める／localStorageとの違い（共有・検索）を知る
- AIへの言い方(SAY): 『端末をまたいで残したいので、localStorageではなくデータベースに保存する形にして。保存する項目はこれ』
- やってみよう(MISSION): （専用なし）SAYを土台に「localStorage→DBに移す」小課題化。
- チェックポイント(quizヒント): localStorage が“どこに”保存されるか。端末をまたぐ共有には共有DBが要る。

## api — AIを安全につなぎたい
- ファイル: `lessons/api.html` ／ body: `lesson kind-ai`
- 前提: http ＋ backend（両方必要） ／ 次: ai-eval
- kicker: `API / Secrets`
- lead素材(desc): 外部サービスへリクエストし、APIキーなどの秘密をコードから分離する。鍵はブラウザに置けない。
- できるようになること(points): 入力・出力・エラーの約束を読む／秘密はサーバー側・環境変数へ置く
- AIへの言い方(SAY): 『APIキーはブラウザに置かず、自分のバックエンド経由で外部APIを呼ぶ形にして。鍵は環境変数に』
- やってみよう(MISSION): （専用なし）SAYを土台に「鍵をバックエンド経由で中継する」構成を小課題化。
- チェックポイント(quizヒント): ブラウザに届くものは変数名を変えても誰でも見られる。鍵はサーバー側で中継。

## auth — 人ごとに分けて守りたい
- ファイル: `lessons/auth.html` ／ body: `lesson kind-server`
- 前提: database ／ 次: product（準備中）
- kicker: `Authentication / Authorization`
- lead素材(desc): 『誰なのか』を確かめ、本人が見たり変更したりしてよい範囲だけを許可する。複数人で使うときに必要。
- できるようになること(points): Authenticationで利用者を識別する／Authorizationで操作できる範囲を制御する
- AIへの言い方(SAY): 『ログイン（本人確認＝認証）と、各データの持ち主だけが読み書きできる制御（権限＝認可）の両方を入れて』
- やってみよう(MISSION): （専用なし）「全員の記録が同じ一覧に出てしまった」を題材に認証＋認可を小課題化。
- チェックポイント(quizヒント): 『誰か分かること（認証）』と『何をしてよいか（認可）』は別の判断。

## ai-cost — 使いすぎと料金を抑えたい
- ファイル: `lessons/ai-cost.html` ／ body: `lesson kind-ai`
- 前提: ai-eval ／ 次: 準備中
- kicker: `Rate Limit / Usage / Cost`
- lead素材(desc): AI機能を公開すると、品質だけでなく回数・料金・悪用への備えが必要になる。
- できるようになること(points): 利用者ごとに回数と使用量を記録する／上限・予算・失敗時の扱いを決める
- AIへの言い方(SAY): 『利用者ごとの回数制限・使用量の記録・予算上限と、上限到達時の表示をサーバー側に入れて』
- やってみよう(MISSION):
  - do: AI機能の1日あたり利用回数と予算上限を決め、超えた場合の表示を設計しよう。
  - prompt: 「公開予定のAI機能について、利用者ごとのRate Limit、Usage Tracking、月額Budget、上限到達時の表示を含む最小設計を提案してください。想定利用者数と1回あたりのAPIコストが不明なら、先に質問してください。」
- チェックポイント(quizヒント): UIの見た目ではなく、サーバー側で利用量を測って止められるか。

## ai-eval — AIのハズレを減らしたい
- ファイル: `lessons/ai-eval.html` ／ body: `lesson kind-ai`
- 前提: api ／ 次: ai-cost / product
- kicker: `Evaluation`
- lead素材(desc): AIの出力は揺れる。もっともらしさではなく、具体例と合格条件で確かめ、断言させすぎない。
- できるようになること(points): 良い例と失敗例で検証する／失敗・遅延・出力の揺れを想定する
- AIへの言い方(SAY): 『プロンプトを強める前に、良い例と失敗例で出力を検証する仕組みを作って。変更前後で比べたい』
- やってみよう(MISSION): （専用なし）「要約が予定を勝手に追加する」を題材に、代表例＋合格条件で比較する仕組みを小課題化。
- チェックポイント(quizヒント): お願いの言葉を強めることと、出力を検証できることは別。
