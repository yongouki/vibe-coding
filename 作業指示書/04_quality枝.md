# 作業指示書 04 ─ 品質 quality 枝

**前提:** 先に `00_共通仕様.md` を読むこと。
**この枝のkind:** すべて `kind-quality`（アクセント色＝グリーン）
**書く順:** （`read` / `devtools` / `git` は並行可）→ `debug` → `test` → `release` → `iterate`
**注意:** この枝は全ノードが `product`（合流ハブ＝指示書05）を前提にする。文章で「一つ動くものができた後の“安全装置”」という位置づけを共有するため、**product の内容方針が固まってから着手すると齟齬が出にくい**。順序自体は product 完成を待たなくても書けるが、トーンだけ揃える。

---

## read — AIが何を変えたか知りたい
- ファイル: `lessons/read.html` ／ body: `lesson kind-quality`
- 前提: product ／ 次: debug
- kicker: `Diff / Review`
- lead素材(desc): AIが何を変更したかを確認する。入口・データ・副作用・出口を追う。
- できるようになること(points): 変更されたファイルと範囲を見る／想定外の変更を見逃さない
- AIへの言い方(SAY): 『どのファイルの何を変えたか、差分(diff)で要点を説明して。想定外の変更がないか一緒に確認したい』
- チェックポイント(quizヒント): 差分を読む・Gitで戻れる・テストで気づける、の3つが揃って“安全装置”になる。

## devtools — 何が起きたか伝えたい
- ファイル: `lessons/devtools.html` ／ body: `lesson kind-quality`
- 前提: product ／ 次: debug
- kicker: `DevTools / Console / Network`
- lead素材(desc): 画面の症状だけでなく、ブラウザが持つエラーと通信の記録を見て、AIへ渡せる材料にする。
- できるようになること(points): Consoleのエラーと再現手順をそろえる／NetworkでRequest・Response・Statusを確認する
- AIへの言い方(SAY): 『推測で直す前に、再現手順・Consoleのエラー・NetworkのRequest/Response/Statusを見て原因を絞って』
- やってみよう(MISSION):
  - do: ブラウザのConsoleとNetworkを開き、エラー1件をAIへ渡せる形に整理しよう。
  - prompt: 「これからブラウザで起きた不具合を相談します。推測で修正せず、まず必要な再現手順、Consoleエラー、NetworkのRequest・Response・Status、関連コードを順番に質問してください。集めた情報から原因候補を一つずつ絞ってください。」
- チェックポイント(quizヒント): 画面に見える結果だけでなく、ブラウザ内部の記録を渡せるか。

## git — 壊れても戻れるようにしたい
- ファイル: `lessons/git.html` ／ body: `lesson kind-quality`
- 前提: product ／ 次: release
- kicker: `Git`
- lead素材(desc): 変更を小さな保存点として残し、失敗しても比較・復元できるようにする。
- できるようになること(points): 一つの目的ごとに変更を区切る／何を変えたか分かる言葉を残す
- AIへの言い方(SAY): 『この変更をGitで保存点として残したい。目的ごとにコミットを分けて、あとで戻せるようにして』
- チェックポイント(quizヒント): 後で一つだけ取り消したいとき、どの分け方が役立つか（ファイル数でなく変更理由で分ける）。

## debug — なぜ動かないか突き止めたい
- ファイル: `lessons/debug.html` ／ body: `lesson kind-quality`
- 前提: read ＋ devtools（両方） ／ 次: test
- kicker: `Debugging`
- lead素材(desc): 直感で何か所も変えず、症状を再現し、原因の仮説を一つずつ確かめる。
- できるようになること(points): 再現手順を固定する／最小の変更で仮説を検証する
- AIへの言い方(SAY): 『あちこち変えず、まず再現手順を固定して。原因の仮説を一つずつ、最小の変更で確かめて』
- チェックポイント(quizヒント): 再現しにくい問題ほど、推測を増やすより観測可能な手掛かり（時刻・ID・入力・ログ）を結びつける。

## test — 次の変更で壊したくない
- ファイル: `lessons/test.html` ／ body: `lesson kind-quality`
- 前提: debug ／ 次: release
- kicker: `Testing`
- lead素材(desc): 動いた一回ではなく、同じ条件なら同じように動くことを確かめる。
- できるようになること(points): 正常系・空入力・失敗時を確認する／修正で前の機能が壊れていないか見る
- AIへの言い方(SAY): 『正常系だけでなく、空入力・境界値・失敗時もテストして。前の機能が壊れてないかも確認して』
- チェックポイント(quizヒント): 代表値だけでなく、条件式の記号ミスが出る値（境界の直前・一致・直後）を選ぶ。

## release — ちゃんと公開して見守りたい
- ファイル: `lessons/release.html` ／ body: `lesson kind-quality`
- 前提: test ＋ git（両方） ／ 次: iterate
- kicker: `Deploy & Watch`
- lead素材(desc): 動くものを他の人が使える場所へ出し、落ちても気づける状態にする。
- できるようになること(points): 秘密情報を分離して公開する／ログやエラーを確認できるようにする
- AIへの言い方(SAY): 『バックアップとロールバック手順を用意して、旧版と共存できる形で段階的に公開して、監視しながら進めて』
- チェックポイント(quizヒント): 失敗しない前提ではなく、途中で止めたり戻したりできるか。

## iterate — 本当に役立ったか知りたい
- ファイル: `lessons/iterate.html` ／ body: `lesson kind-quality`
- 前提: release ／ 次: vibe（最終・指示書05）
- kicker: `Feedback / Analytics`
- lead素材(desc): 公開は完成ではなく観察の始まり。利用者の反応やエラーから、次に直す一点を決める。
- できるようになること(points): 事実と感想を分けて受け取る／変更前後で結果を比べる
- AIへの言い方(SAY): 『どこで離脱したか・どんなエラーが出たかを基に、次に直す一点だけ提案して。一度に増やさないで』
- チェックポイント(quizヒント): 思いつきで足す前に、まず“どこで離れたか”を見る。
