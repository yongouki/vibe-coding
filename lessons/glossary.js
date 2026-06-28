/* =========================================================
   VIBE CODING ─ 用語集データ＋ホバー用語カード エンジン
   - window.VIBE_GLOSSARY : 用語データ（glossary.html もこれを使う）
   - レッスンページ(<body class="lesson">)では、本文中の用語の初出に
     点線下線を付け、ホバー/フォーカス/タップで説明カードを出す。
   - 用語集ページ(<body class="... glossary-page">)では走査しない。
   各レッスンHTMLの </body> 直前に↓を1行入れるだけで有効になる：
     <script src="glossary.js" defer></script>
   ========================================================= */
(function () {
  "use strict";

  /* ---- 用語データ。aliases＝本文で検出する表記（長い順に優先マッチ） ---- */
  const GLOSSARY = [
    // ── Web画面の基本 ──
    { id:"html", term:"HTML", kana:"エイチティーエムエル", cat:"web",
      aliases:["HTML"], lesson:["htmlcss.html","画面を組み立てたい"],
      def:"画面の「中身と構造」を書くための言葉。見出し・段落・ボタンなどの“意味”を決める骨組み。",
      say:"クリックで移動するなら div ではなく意味の合う a 要素にして、と要素の意味を指定する。" },
    { id:"css", term:"CSS", kana:"シーエスエス", cat:"web",
      aliases:["CSS"], lesson:["htmlcss.html","画面を組み立てたい"],
      def:"HTMLの「見た目」を整える言葉。色・余白・配置などのデザインを担当する。" },
    { id:"javascript", term:"JavaScript（JS）", kana:"ジャバスクリプト", cat:"web",
      aliases:["JavaScript","JS"], lesson:["web-basics.html","Webページの中身を知りたい"],
      def:"画面に「動き」を与える言葉。HTML・CSSと並ぶWebの3本柱で、ボタンの反応や表示の書き換えを担当する。" },
    { id:"browser", term:"ブラウザ", kana:"", cat:"web",
      aliases:["ブラウザ"], lesson:["web-basics.html","Webページの中身を知りたい"],
      def:"ChromeやSafariなど、Webページを開いて表示するソフト。HTML・CSS・JavaScriptはこの中で動く。" },
    { id:"frontend", term:"フロントエンド", kana:"", cat:"web",
      aliases:["フロントエンド","Frontend"], lesson:["web-basics.html","Webページの中身を知りたい"],
      def:"利用者の目に見える「画面側」。ブラウザの中で動く部分で、見た目や操作を担当する。対になるのがバックエンド。" },
    { id:"dom", term:"DOM", kana:"ドム", cat:"web",
      aliases:["DOM"], lesson:["jsdom.html","動きをつけたい"],
      def:"ブラウザが読み込んだHTMLを、プログラムから触れる形にしたもの。JavaScriptはこれを書き換えて画面を更新する。",
      say:"クリックを受けて状態を更新し、その値で画面の表示を書き換えて（DOM操作で）、と頼む。" },
    { id:"component", term:"Component（部品）", kana:"コンポーネント", cat:"web",
      aliases:["Component","コンポーネント"], lesson:["ui-structure.html","画面を部品に分けたい"],
      def:"画面を役割ごとに分けた「部品」。結果表示・履歴・設定…のように責任を切り分けると、大きくなっても整理しやすい。" },
    { id:"state", term:"State（状態）", kana:"ステート", cat:"web",
      aliases:["State"], lesson:["ui-structure.html","画面を部品に分けたい"],
      def:"アプリが今もっている「状態」のデータ（入力中の値・選択中のタブなど）。どこに置くかで設計が決まる。" },
    { id:"routing", term:"Routing（ページ遷移）", kana:"ルーティング", cat:"web",
      aliases:["Routing","ルーティング"], lesson:["ui-structure.html","画面を部品に分けたい"],
      def:"URLと表示する画面の対応づけ。「このアドレスならこの画面」を決めて、ページの行き来を整理する。" },

    // ── データと通信 ──
    { id:"http", term:"HTTP", kana:"エイチティーティーピー", cat:"data",
      aliases:["HTTP"], lesson:["http.html","外のデータを読み込みたい"],
      def:"Webでデータをやり取りするときの共通ルール（手順）。このルールに沿って、リクエストとレスポンスが往復する。" },
    { id:"request-response", term:"リクエスト / レスポンス", kana:"", cat:"data",
      aliases:["リクエスト","レスポンス","Request","Response"], lesson:["http.html","外のデータを読み込みたい"],
      def:"通信の往復。こちらからの「お願い」がリクエスト、相手からの「返事」がレスポンス。HTTPはこの繰り返しで動く。" },
    { id:"url", term:"URL", kana:"ユーアールエル", cat:"data",
      aliases:["URL"], lesson:["static-deploy.html","URLで見せたい"],
      def:"インターネット上の「住所」。どのページやデータを指すかを表す文字列で、公開・通信・画面の行き来の共通基礎になる。" },
    { id:"domain", term:"ドメイン", kana:"", cat:"data",
      aliases:["ドメイン"], lesson:["static-deploy.html","URLで見せたい"],
      def:"URLの中の「覚えやすい名前の部分」（例：example.com）。最初は無料サービスのURLで十分で、独自ドメインは後から買って差し替えられる。" },
    { id:"status", term:"Status（ステータスコード）", kana:"", cat:"data",
      aliases:["HTTPステータス","ステータスコード","Status","ステータス"], lesson:["devtools.html","不具合をAIに伝えたい"],
      def:"通信の結果を表す番号。200は成功、404は見つからない、500はサーバー側の失敗、など。原因の手がかりになる。" },
    { id:"cors", term:"CORS", kana:"コルス", cat:"data",
      aliases:["CORS"], lesson:["http.html","外のデータを読み込みたい"],
      def:"ブラウザの安全のための制限。相手のサーバーがブラウザからの利用を許可していないと、応答が返ってもJavaScriptから中身を読めない。" },
    { id:"json", term:"JSON", kana:"ジェイソン", cat:"data",
      aliases:["JSON"], lesson:["http.html","外のデータを読み込みたい"],
      def:"データをやり取りする定番の文字形式。{ } と「キー：値」でできていて、APIの返事の多くはこの形。" },
    { id:"csv", term:"CSV", kana:"シーエスブイ", cat:"data",
      aliases:["CSV"], lesson:["dataflow.html","まとめて変換・集計したい"],
      def:"カンマ区切りでデータを並べた、表計算ソフトでも開ける汎用のテキスト形式。一覧データの読み書きによく使う。" },
    { id:"fetch", term:"fetch", kana:"フェッチ", cat:"data",
      aliases:["fetch"], lesson:["http.html","外のデータを読み込みたい"],
      def:"ブラウザのJavaScriptから外のデータを呼びにいく命令。返ってきたJSONを画面に出す、といった使い方をする。",
      say:"この公開APIを fetch で呼んで、返ってきたJSONのこのキーを画面に出して、と頼む。" },
    { id:"localstorage", term:"localStorage", kana:"ローカルストレージ", cat:"data",
      aliases:["localStorage"], lesson:["localstorage.html","閉じても残したい"],
      def:"ブラウザの中に小さくデータを残せる保管場所。同じ端末・同じブラウザなら、ページを閉じても内容が残る。",
      say:"この内容を localStorage に保存して、次に開いたとき復元して。サーバーはまだ使わない、と頼む。" },
    { id:"database", term:"データベース", kana:"", cat:"data",
      aliases:["データベース","DB"], lesson:["database.html","端末をまたいで残したい"],
      def:"たくさんのデータをきちんと保存・検索できる仕組み。端末をまたいで共有したいときは localStorage ではなくこちら。" },

    // ── AI・サーバー連携 ──
    { id:"prompt", term:"プロンプト", kana:"", cat:"ai",
      aliases:["プロンプト"], lesson:["ai-eval.html","AIのハズレを減らしたい"],
      def:"AIへ出す指示文のこと。何をしてほしいか・前提・今回はやらないことを具体的に書くほど、ズレた答えが減る。",
      say:"いい感じに、ではなく『誰の何を・どこまで作るか・やらないこと』を具体的に書いて渡す。" },
    { id:"api", term:"API", kana:"エーピーアイ", cat:"ai",
      aliases:["API"], lesson:["api.html","AIを安全につなぎたい"],
      def:"外部サービスを呼ぶための「約束ごと」。入力・出力・エラーの決まりに従って頼むと、相手が処理して返してくれる。" },
    { id:"api-key", term:"APIキー", kana:"", cat:"ai",
      aliases:["APIキー","API キー"], lesson:["api.html","AIを安全につなぎたい"],
      def:"外部APIを使うための「鍵」。秘密のものはブラウザに置くと丸見えになるので、サーバー側・環境変数に隠す。",
      say:"APIキーはブラウザに置かず、自分のバックエンド経由で外部APIを呼ぶ形にして。鍵は環境変数に、と頼む。" },
    { id:"env", term:"環境変数", kana:"かんきょうへんすう", cat:"ai",
      aliases:["環境変数"], lesson:["api.html","AIを安全につなぎたい"],
      def:"コードの外に置く設定値。APIキーのような秘密を、コードに直接書かずに渡すための場所。" },
    { id:"backend", term:"バックエンド（サーバー側）", kana:"", cat:"ai",
      aliases:["バックエンド","サーバー側","Backend"], lesson:["backend.html","ブラウザの外で動かしたい"],
      def:"利用者のブラウザではなく、見えないサーバー側で動く部分。鍵を隠したり、みんなで使うデータを扱うときに必要。" },
    { id:"server", term:"サーバー", kana:"", cat:"ai",
      aliases:["サーバー","Server"], lesson:["backend.html","ブラウザの外で動かしたい"],
      def:"リクエストを受けて処理し、応答（レスポンス）を返す側のコンピュータ／プログラム。利用者のブラウザの向こう側で動く。" },
    { id:"runtime", term:"Runtime（実行環境）", kana:"ランタイム", cat:"ai",
      aliases:["Runtime","ランタイム"], lesson:["backend.html","ブラウザの外で動かしたい"],
      def:"プログラムを実際に動かすための土台・環境（Node.js など）。サーバー側のコードはこの上で動く。" },
    { id:"nodejs", term:"Node.js", kana:"ノードジェイエス", cat:"ai",
      aliases:["Node.js"], lesson:["backend.html","ブラウザの外で動かしたい"],
      def:"JavaScriptをブラウザの外（サーバー側）で動かすための実行環境。学習用の最小サーバーによく使われる。" },
    { id:"auth-n", term:"認証", kana:"にんしょう", cat:"ai",
      aliases:["認証","Authentication"], lesson:["auth.html","みんなで使えるようにしたい"],
      def:"本人確認のこと。ログインのように「あなたが誰か」を確かめる仕組み。" },
    { id:"authz", term:"認可（権限）", kana:"にんか", cat:"ai",
      aliases:["認可","権限","Authorization"], lesson:["auth.html","みんなで使えるようにしたい"],
      def:"「誰が何をしてよいか」の制御。自分のデータだけ読み書きできる、他人のは触れない、といった許可の管理。",
      say:"ログイン（本人確認＝認証）と、各データの持ち主だけが読み書きできる制御（権限＝認可）の両方を入れて、と頼む。" },
    { id:"rate-limit", term:"Rate Limit（回数制限）", kana:"", cat:"ai",
      aliases:["Rate Limit","回数制限","レート制限"], lesson:["ai-cost.html","使いすぎを防ぎたい"],
      def:"一定時間に呼べる回数の上限。使いすぎや想定外のAPI料金を防ぐために、サーバー側でかける。" },
    { id:"hallucination", term:"ハルシネーション", kana:"", cat:"ai",
      aliases:["ハルシネーション"], lesson:["ai-mistakes.html","AIの答えを鵜呑みにしたくない"],
      def:"AIが、事実でないことや動かないコードを、さも正しそうに出すこと。見た目の自信と中身の正しさは別もの。信じる前に自分で動かして確かめる。",
      say:"この回答、本当に合ってる？根拠と、自分で動かして確かめる手順も教えて。不確かな部分は正直に指摘して、と頼む。" },

    // ── 公開・自動化・Python ──
    { id:"static-hosting", term:"静的ホスティング", kana:"せいてきホスティング", cat:"auto",
      aliases:["静的ホスティング","ホスティング"], lesson:["static-deploy.html","URLで公開したい"],
      def:"出来上がったHTML/CSS/JSをそのまま置いてURLで配る公開方法。サーバー処理が要らない画面に向く。" },
    { id:"gh-pages", term:"GitHub Pages", kana:"", cat:"auto",
      aliases:["GitHub Pages"], lesson:["static-deploy.html","URLで公開したい"],
      def:"GitHubが提供する静的ホスティングの一つ。手元のHTMLを無料でURL公開できる（唯一の選択肢ではない）。" },
    { id:"deploy", term:"デプロイ", kana:"", cat:"auto",
      aliases:["デプロイ"], lesson:["static-deploy.html","URLで見せたい"],
      def:"作ったものを公開先に配置して、URLで使える状態にすること。日常では「公開する」とほぼ同じ意味で使う。" },
    { id:"terminal", term:"ターミナル", kana:"", cat:"auto",
      aliases:["ターミナル"], lesson:["terminal.html","ターミナルに慣れたい"],
      def:"コマンド（文字の命令）でPCを操作する黒い画面。GitやPythonの実行、ライブラリの追加などの入口になる。" },
    { id:"command", term:"コマンド（CLI）", kana:"", cat:"auto",
      aliases:["コマンドライン","コマンド","CLI"], lesson:["terminal.html","ターミナルに慣れたい"],
      def:"ターミナルに打ち込む、文字の命令文。1行打ってEnterで実行し、結果（成功またはエラー）が文字で返る。まずは「今どこ・何がある・どう移る」の3つから。" },
    { id:"path", term:"カレントディレクトリ / パス", kana:"", cat:"auto",
      aliases:["カレントディレクトリ","パス"], lesson:["terminal.html","ターミナルに慣れたい"],
      def:"パスはファイルやフォルダの「場所を示す住所」。カレントディレクトリは、ターミナルが今いる場所のこと。まずここを確認するのが基本。" },
    { id:"venv", term:"仮想環境", kana:"かそうかんきょう", cat:"auto",
      aliases:["仮想環境"], lesson:["py-setup.html","Pythonを動かしたい"],
      def:"プロジェクトごとに分けたPythonの作業部屋。ライブラリを混ぜずに済み、別のPCでも再現しやすくなる。" },
    { id:"pip", term:"pip", kana:"ピップ", cat:"auto",
      aliases:["pip"], lesson:["py-setup.html","Pythonを動かしたい"],
      def:"いま使っているPython環境に、必要な部品（ライブラリ）を足す道具。" },
    { id:"npm", term:"npm", kana:"エヌピーエム", cat:"auto",
      aliases:["npm"], lesson:["library.html","既製の部品を借りたい"],
      def:"JavaScript／Webの部品（ライブラリ）を入れる道具。Pythonでいう pip のJavaScript版にあたる。" },
    { id:"library", term:"ライブラリ / パッケージ", kana:"", cat:"auto",
      aliases:["ライブラリ","パッケージ"], lesson:["library.html","既製の部品を借りたい"],
      def:"誰かが作って公開した、再利用できるコードのかたまり（パッケージとも呼ぶ）。よくある機能は自分で書かず、借りて足せる。導入はnpm／pipで。" },
    { id:"idempotent", term:"冪等（べきとう）", kana:"べきとう", cat:"auto",
      aliases:["冪等","べき等"], lesson:["scheduler.html","自動で動かしたい"],
      def:"同じ処理を二度実行しても結果が壊れない性質。自動実行は重複しても安全なように、これを意識して作る。",
      say:"二度実行されても結果が壊れないように（冪等に）して、失敗時は通知して、と頼む。" },
    { id:"cron", term:"Cron / Scheduler", kana:"クロン／スケジューラ", cat:"auto",
      aliases:["Scheduler","スケジューラ","Cron"], lesson:["scheduler.html","自動で動かしたい"],
      def:"決まった時間に処理を自動で動かす仕組み。毎朝の集計のような繰り返し作業を、開かなくても実行できる。" },

    // ── バージョン管理・品質・運用 ──
    { id:"git", term:"Git", kana:"ギット", cat:"quality",
      aliases:["Git"], lesson:["git.html","変更を記録したい"],
      def:"変更の履歴を「保存点」として残し、いつでも前の状態に戻れるようにする道具。手元で完結する。" },
    { id:"github", term:"GitHub", kana:"ギットハブ", cat:"quality",
      aliases:["GitHub"], lesson:["git-setup.html","Gitを始めたい"],
      def:"Gitの保存点をネット上に置いて共有・公開できるサービス。Git本体とは別物で、後から足せる。" },
    { id:"repo", term:"リポジトリ", kana:"", cat:"quality",
      aliases:["リポジトリ"], lesson:["git-setup.html","Gitを始めたい"],
      def:"Gitで変更履歴を管理する単位（プロジェクトの入れ物）。手元のフォルダをリポジトリにして、保存点（コミット）を貯めていく。" },
    { id:"commit", term:"コミット", kana:"", cat:"quality",
      aliases:["コミット"], lesson:["git.html","変更を記録したい"],
      def:"その時点の変更をまとめて残す「保存点」。目的ごとに分けておくと、あとで戻したり読み返したりしやすい。" },
    { id:"diff", term:"差分（diff）", kana:"さぶん", cat:"quality",
      aliases:["差分","diff"], lesson:["read.html","変更点を読みたい"],
      def:"前との「違い」だけを表示したもの。どのファイルの何が変わったかを、差分で要点だけ確認できる。",
      say:"どのファイルの何を変えたか、差分(diff)で要点を説明して。想定外の変更がないか一緒に確認したい、と頼む。" },
    { id:"error", term:"エラー / エラーメッセージ", kana:"", cat:"quality",
      aliases:["エラーメッセージ","エラー"], lesson:["errors.html","エラーが出ても怖くなくなりたい"],
      def:"うまく動かないとき、何がダメだったかをPCが教えてくれる文。異常ではなく次の一手のヒント。省略せず全文をそのままAIに渡すのが近道。",
      say:"このエラーの全文を貼ります。推測で直さず、原因の候補を一つずつ挙げて、一度に一つだけ直す形で進めて、と頼む。" },
    { id:"devtools", term:"DevTools（開発者ツール）", kana:"", cat:"quality",
      aliases:["DevTools","開発者ツール"], lesson:["devtools.html","不具合をAIに伝えたい"],
      def:"ブラウザに内蔵された調査用の道具一式。中にConsoleやNetworkがあり、不具合の「証拠」を集める入口になる。" },
    { id:"console", term:"Console（コンソール）", kana:"", cat:"quality",
      aliases:["Console","コンソール"], lesson:["devtools.html","不具合をAIに伝えたい"],
      def:"開発者ツール(DevTools)の一つで、エラーメッセージやログが出る場所。ここの文言がそのまま相談材料になる。" },
    { id:"network", term:"Network（ネットワーク）", kana:"", cat:"quality",
      aliases:["Networkタブ","Network"], lesson:["devtools.html","不具合をAIに伝えたい"],
      def:"開発者ツール(DevTools)で通信を見るタブ。送ったもの(Request)・返ってきたもの(Response)・成否(Status)を確認できる。" },
    { id:"log", term:"ログ", kana:"", cat:"quality",
      aliases:["ログ"], lesson:["devtools.html","不具合をAIに伝えたい"],
      def:"プログラムが「いつ何が起きたか」を残す記録。エラーの原因調べ、データ処理や自動実行の確認、公開後の監視に横断して役立つ。" },
    { id:"rollback", term:"ロールバック", kana:"", cat:"quality",
      aliases:["ロールバック"], lesson:["release.html","安全に公開したい"],
      def:"問題が起きたとき、公開前の状態へ戻すこと。これとバックアップを用意してから公開すると安全。" },
    { id:"happy-path", term:"正常系 / 境界値", kana:"", cat:"quality",
      aliases:["正常系","境界値"], lesson:["test.html","壊れていないか確かめたい"],
      def:"正常系はうまくいく普通の流れ、境界値は0件・最大・空入力のような「端っこ」。両方を試すと壊れにくい。",
      say:"正常系だけでなく、空入力・境界値・失敗時もテストして。前の機能が壊れてないかも確認して、と頼む。" }
  ];

  // どこからでも参照できるよう公開（glossary.html もこれを使う）
  if (typeof window !== "undefined") window.VIBE_GLOSSARY = GLOSSARY;

  // 用語集ページ自身では本文走査をしない。レッスン以外でも走査しない。
  function shouldRun() {
    const b = document.body;
    if (!b) return false;
    if (b.classList.contains("glossary-page")) return false;
    if (!b.classList.contains("lesson")) return false;
    return !!document.querySelector(".wrap");
  }

  /* ---- マッチ用：別名を長い順に展開（長い表記を先に当てる） ---- */
  const ALIASES = [];
  GLOSSARY.forEach(function (t) {
    (t.aliases || []).forEach(function (a) {
      ALIASES.push({
        alias: a, term: t, len: a.length,
        latin: /^[A-Za-z0-9]/.test(a),
        kata: /^[゠-ヿ]+$/.test(a) // 純カタカナ語（ー含む）
      });
    });
  });
  ALIASES.sort(function (a, b) { return b.len - a.len; });

  const isAlnum = function (ch) { return ch != null && /[A-Za-z0-9]/.test(ch); };
  // カタカナ（ー含む）。ログ→「ログイン」、パス→「パスワード」等への誤マッチを防ぐ境界判定に使う。
  const isKata = function (ch) { return ch != null && /[゠-ヿ]/.test(ch); };

  // 走査対象から除外する祖先（見出し・コード・リンク・ナビなど）
  const SKIP_SEL = "a,code,pre,h1,h2,h3,.kicker,.tagline,.mono,.back,.lnav,.lfoot,.tolink,[data-no-gloss]";

  function inSkip(node) {
    let el = node.parentElement;
    while (el && !el.classList.contains("wrap")) {
      if (el.matches && el.matches(SKIP_SEL)) return true;
      el = el.parentElement;
    }
    return false;
  }

  const used = new Set(); // 用語ごとに初出の1回だけ

  function findMatch(text, from) {
    let best = null;
    for (let i = 0; i < ALIASES.length; i++) {
      const a = ALIASES[i];
      if (used.has(a.term.id)) continue;
      let idx = text.indexOf(a.alias, from);
      while (idx !== -1) {
        const before = text[idx - 1];
        const after = text[idx + a.alias.length];
        if (a.latin && (isAlnum(before) || isAlnum(after))) { idx = text.indexOf(a.alias, idx + 1); continue; }
        if (a.kata && (isKata(before) || isKata(after))) { idx = text.indexOf(a.alias, idx + 1); continue; }
        break;
      }
      if (idx === -1) continue;
      if (!best || idx < best.index || (idx === best.index && a.len > best.length)) {
        best = { index: idx, length: a.alias.length, term: a.term };
      }
    }
    return best;
  }

  function makeSpan(text, term) {
    const s = document.createElement("span");
    s.className = "gloss-term";
    s.textContent = text;
    s.setAttribute("data-term", term.id);
    s.setAttribute("tabindex", "0");
    s.setAttribute("role", "button");
    s.setAttribute("aria-label", term.term + "（用語の説明）");
    return s;
  }

  function processTextNode(node) {
    const text = node.nodeValue;
    if (!text || !text.trim()) return;
    const out = [];
    let cursor = 0;
    let m;
    while ((m = findMatch(text, cursor))) {
      if (m.index > cursor) out.push(document.createTextNode(text.slice(cursor, m.index)));
      out.push(makeSpan(text.substr(m.index, m.length), m.term));
      used.add(m.term.id);
      cursor = m.index + m.length;
    }
    if (!out.length) return;
    if (cursor < text.length) out.push(document.createTextNode(text.slice(cursor)));
    const frag = document.createDocumentFragment();
    out.forEach(function (n) { frag.appendChild(n); });
    node.parentNode.replaceChild(frag, node);
  }

  function scan() {
    const root = document.querySelector(".wrap");
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (inSkip(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let cur;
    while ((cur = walker.nextNode())) nodes.push(cur);
    nodes.forEach(processTextNode);
  }

  /* ---- 説明カード（ポップオーバー）。1個を使い回す ---- */
  let pop = null, hideTimer = null, current = null;

  function buildPop() {
    pop = document.createElement("div");
    pop.className = "gloss-pop";
    pop.setAttribute("role", "dialog");
    document.body.appendChild(pop);
    pop.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    pop.addEventListener("mouseleave", scheduleHide);
  }

  function termById(id) {
    for (let i = 0; i < GLOSSARY.length; i++) if (GLOSSARY[i].id === id) return GLOSSARY[i];
    return null;
  }

  function fillPop(t) {
    let html = '<div class="gp-head"><span class="gp-term">' + escapeHtml(t.term) + "</span>";
    if (t.kana) html += '<span class="gp-kana">' + escapeHtml(t.kana) + "</span>";
    html += "</div>";
    html += '<p class="gp-def">' + escapeHtml(t.def) + "</p>";
    if (t.say) html += '<p class="gp-say"><span class="gp-say-tag">AIへの頼み方</span>' + escapeHtml(t.say) + "</p>";
    html += '<div class="gp-foot">';
    if (t.lesson) html += '<a class="gp-lesson" href="' + t.lesson[0] + '">レッスン: ' + escapeHtml(t.lesson[1]) + " →</a>";
    html += '<a class="gp-more" href="glossary.html#term-' + t.id + '">用語集で開く →</a>';
    html += "</div>";
    pop.innerHTML = html;
  }

  function positionPop(anchor) {
    const r = anchor.getBoundingClientRect();
    pop.style.visibility = "hidden";
    pop.style.display = "block";
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    const margin = 8;
    let left = r.left + r.width / 2 - pw / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - pw - margin));
    let top = r.bottom + 8;
    if (top + ph > window.innerHeight - margin && r.top - ph - 8 > margin) top = r.top - ph - 8;
    pop.style.left = Math.round(left) + "px";
    pop.style.top = Math.round(top) + "px";
    pop.style.visibility = "visible";
  }

  function showFor(anchor) {
    clearTimeout(hideTimer);
    const t = termById(anchor.getAttribute("data-term"));
    if (!t) return;
    if (!pop) buildPop();
    current = anchor;
    fillPop(t);
    positionPop(anchor);
    pop.classList.add("show");
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (pop) pop.classList.remove("show");
      current = null;
    }, 180);
  }

  function bindEvents() {
    document.addEventListener("mouseover", function (e) {
      const term = e.target.closest && e.target.closest(".gloss-term");
      if (term) showFor(term);
    });
    document.addEventListener("mouseout", function (e) {
      const term = e.target.closest && e.target.closest(".gloss-term");
      if (term) scheduleHide();
    });
    document.addEventListener("focusin", function (e) {
      const term = e.target.closest && e.target.closest(".gloss-term");
      if (term) showFor(term);
    });
    document.addEventListener("focusout", function (e) {
      const term = e.target.closest && e.target.closest(".gloss-term");
      if (term) scheduleHide();
    });
    // タップ／クリックでトグル（スマホ向け）
    document.addEventListener("click", function (e) {
      const term = e.target.closest && e.target.closest(".gloss-term");
      if (term) {
        e.preventDefault();
        if (current === term && pop && pop.classList.contains("show")) { scheduleHide(); }
        else { showFor(term); }
      } else if (pop && !e.target.closest(".gloss-pop")) {
        scheduleHide();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && pop) pop.classList.remove("show");
      const term = document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("gloss-term");
      if (term && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); showFor(document.activeElement); }
    });
    window.addEventListener("scroll", function () { if (current) positionPop(current); }, { passive: true });
    window.addEventListener("resize", function () { if (current) positionPop(current); });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- ホバー用CSS（lesson.css を汚さないようJSから注入） ---- */
  function injectCss() {
    if (document.getElementById("gloss-css")) return;
    const css = `
.gloss-term{
  border-bottom:1px dashed color-mix(in srgb,var(--accent,#b397ff) 60%,#5a6c81);
  cursor:help;color:inherit;text-decoration:none;
  outline-offset:2px;border-radius:2px;
}
.gloss-term:hover,.gloss-term:focus-visible{
  background:color-mix(in srgb,var(--accent,#b397ff) 14%,transparent);
  border-bottom-color:var(--accent,#b397ff);
}
.gloss-pop{
  position:fixed;z-index:9999;display:none;opacity:0;transform:translateY(-4px);
  width:min(320px,calc(100vw - 24px));
  padding:13px 15px;border-radius:13px;
  border:1px solid color-mix(in srgb,var(--accent,#b397ff) 42%,#26364a);
  background:linear-gradient(160deg,#10192699,#0b121bf2),#0b121b;
  backdrop-filter:blur(8px);
  box-shadow:0 14px 40px rgba(0,0,0,.5);
  color:#cbd6e3;font-size:13px;line-height:1.7;
  font-family:"Hiragino Sans","Yu Gothic UI","Noto Sans JP",system-ui,sans-serif;
  transition:opacity .14s ease,transform .14s ease;pointer-events:auto;
}
.gloss-pop.show{display:block;opacity:1;transform:translateY(0)}
.gp-head{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:7px}
.gp-term{font-size:15px;font-weight:750;color:color-mix(in srgb,var(--accent,#b397ff) 36%,#fff)}
.gp-kana{font-size:11px;color:#8294aa;letter-spacing:.04em}
.gp-def{margin:0;color:#d4dded}
.gp-say{margin:9px 0 0;padding:8px 10px;border-radius:9px;
  background:color-mix(in srgb,var(--accent,#b397ff) 10%,#0c1420);
  border:1px solid color-mix(in srgb,var(--accent,#b397ff) 24%,#26364a);
  font-size:12px;color:#bccadb}
.gp-say-tag{display:block;margin-bottom:3px;font-size:10px;letter-spacing:.1em;
  color:color-mix(in srgb,var(--accent,#b397ff) 55%,#fff);font-weight:700}
.gp-foot{display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:11px;
  padding-top:9px;border-top:1px solid #1d2a3a}
.gp-foot a{font-size:12px;text-decoration:none;color:color-mix(in srgb,var(--accent,#b397ff) 62%,#fff)}
.gp-foot a:hover{text-decoration:underline}
.gp-lesson{color:#9fb0c3 !important}
@media(prefers-reduced-motion:reduce){.gloss-pop{transition:none}}
`;
    const tag = document.createElement("style");
    tag.id = "gloss-css";
    tag.textContent = css;
    document.head.appendChild(tag);
  }

  function init() {
    if (!shouldRun()) return;
    injectCss();
    scan();
    bindEvents();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
