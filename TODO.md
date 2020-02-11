# MEMO: 2019/12/15
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
# MEMO: 2019/12/26
- global cssを作ろうと思ったが、差し込むところがないぜ。
  - postcss-importを入れるしかないな。
- postcssのparserはどうすればよいのか。。。決めきれない
# MEMO: 2019/12/27
- postcss-importは、デフォルトでは以下の２つしか対応していない
  - node_modules/normarize.css/normarize.css
  - node_modules/normarize.css/index.css
- ressは、node_modules/ress/ress.cssなので無理
- postcssのresolveを実装すれば対応できそう。デフォルトの実装を真似る。
# MEMO: 2019/12/28
- reset.cssは、ressではなく、minireset.cssにした。
  - postcss-importのresolveが面倒なので、やっぱやめた
  - miniresetはその名の通り、最小構成でかつ更新も最近で古い実装がないから
  - 最終的には自分でreset cssを作った方が良さそうだけど。
- というか、postcss-importはいらんという結論になった
  - css_modulesを使っていると、tsからcssを読み込むので、postcssでは対応できない？？？
    - 必須ではないので、reset cssはnode_modulesからではなく、ファイルから読み込むようにした
# MEMO: 2019/12/29
- moduleResolution: nodeの設定がなかったので、defaultのclassicになっていた
- souce-map-loaderがインストールされていなかった。。。
- node-nightlyを使ってdebug
  - npx webpack --mode development が通るようにする。
  - node-nightly --inspect-brk ./node_modules/webpack/bin/webpack.js --mode development
  - chrome://inspect でstep実行
# MEMO: 2020/1/19
- postcssのcustom pluginを作成
- 単純に、.storybook/webpackの存在忘れてて嵌っただけ。。。
- 改めて、postcss-functionsを試したい。
# MEMO: 2020/1/20
- postcss-functionsは動作した。けど、これはvalueだけだわ。selector作れない。
- webpack.config.ts対応してみたけど、storybook様のwebpackがjsでないと動作しないからやめ。
- postcss-mixinsではなく、自作する。mixinに寄せるよりかは、postcss-functionsのatmark版を作成する。
  - @mixin args1 args2で対応。
  - responseは、selector or decl list?
# MEMO: 2020/1/24
- mixin pluginを作成
- fileから読み込む案は一旦、停止。それほどmixinの数が多くならないと予想されるため。
# MEMO: 2020/1/26
- postcss-easy-importを入れた。cssの@importは並行して読み込めないようだ。
- atomic design対応する事にした。
# MEMO: 2020/1/28
- web fonts対応、google fontsからRobotoとNoto Sans JPを入れた。
- hwbを使おうとしたが、postcss-preset-envはまだhwb対応していない? featureにあるけど。。。
  - postcss-color-hwbは、古い仕様のカンマ区切りだったりする。現状スペース区切り。
  - とりあえずカンマ区切りを許容して対応する事にしたhwb使いたいから。
# MEMO: 2020/1/29
- classNamesをインストール
# MEMO: 2020/2/1
- storybook v5にmigration、addon.js, config.jsを廃止、main.js, preview.js, manager.jsに。 
- storybookにpreview.htmlをつけてコンポーネントを中央寄せした。
- sampleで作ったbuttonを正式版に修正
- class名は文字列指定ではなく、cssをimportして、css.rootなどで定義する事。
# MEMO: 2020/2/10
- iconは除外。このコンポーネントには追加しない。
- input系のコンポーネントを作成した。validationまだ。
- radioはradiogroup込みでatomとした。radio１つで動作しないため。
- validationはformが食うような設計にしたいよ。
- storybookのhot loaderがtimeoutしているようだ、修正する。
# MEMO: 2020/2/11
- textarea作った。
- composeがextend的に使えそうなので、globalなcompose.cssファイルを作成した。
- composeはclassの詳細度で、後に指定することができなさそう。必ず先になる？仕様かな。

# TODO
- sample実装続き
 - select, formItem(error, validation), form
 - dialog, table, toast
- storybookのhot loaderがtimeoutしているようだ、修正する。
- validator, validateの作成？
- tree shakingに対応させたい
- themeに対応させたい、context apiかな。
- animationの定義部分検討
- input fileのデザイン考える。
- env対応
- test code
- npmに公開する。ポートフォリ側の実装で読み込む
