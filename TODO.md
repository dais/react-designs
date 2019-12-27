# MEMO (2019/12/15)
- reactでしょうよ。
  - reactのhook、hocなどは実装しやすい。
    - 関数型プログラミングが好きです。
    - viewのみなので、他をライブラリの組み合わせで対応できる。
    - フロントエンドを牽引しているのはreact!
  - angularは選択の自由がなく部分的な変更が効かないし、更新応が難しい(変わってきているらしいけど)
  - vue.jsはwebpack loader頼りで、使いづらい。簡単だけど。
- core.jsは使用しない。
  - es2015-es2019はtypescriptが対応している。
  - The TC39 process.は魅力的だが必須ではない。
    - 一応、esnextはtypescriptにある。
- babelも一旦、使用しない。
  - 必須でないから、build時間の短縮, buildをシンプルに保ちたいなど
  - 利用しているライブラリがbabelに依存しているケースはある
- sassは使用しない。
  - トランスパイルに時間がかかる、機能を使いこなせない
  - コンポーネント指向ならcss in js, css modulesを選択するから
  - 基本的に必要なのはvar, nested, autoprefix, import, mixinくらいなはず
    - これらはpostcssで対応する
- pretterは不要
  - 一人で開発するからいらんだろう。lint+editorで十分かな。
- lodashも不要
  - functionは自作する、必須な物はそんなにないから。
- dateはdate-fnsで
  - treee thaking効くし必要十分。
# MEMO (2019/12/26)
- global cssを作ろうと思ったが、差し込むところがないぜ。
  - postcss-importを入れるしかないな。
- postcssのparserはどうすればよいのか。。。決めきれない
# MEMO(2019/12/27)
- postcss-importは、デフォルトでは以下の２つしか対応していない
  - node_modules/normarize.css/normarize.css
  - node_modules/normarize.css/index.css
- ressは、node_modules/ress/ress.cssなので無理
- postcssのresolveを実装すれば対応できそう。デフォルトの実装を真似る。


# TODO
- postcssのresolve対応
- postcss-functions

- sample実装続き
- tree shakingに対応させたい
- themeに対応させたい、context apiかな。
  - cssを変更しやすいようにしたいけど。
- env対応
- test code
- npmに公開する。ポートフォリ側の実装で読み込む
