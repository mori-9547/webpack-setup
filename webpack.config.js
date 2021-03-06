// path モジュールの読み込み
const path = require('path');
// MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// CleanWebpackPlugin の読み込み
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// mode指定 --development --production
const MODE = process.env.NODE_ENV;
// production モード以外の場合、変数 enabledSourceMap は true
const enabledSourceMap =  MODE !== 'production';

module.exports = {
	mode: MODE,
  // エントリポイント（デフォルトと同じなので省略可）
  entry: './src/index.js',  
  // 出力先（デフォルトと同じなので省略可）
  output: { 
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子(scss)
        test: /\.scss$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするためのローダー
					{
            loader: "css-loader",
            options: {
              sourceMap: enabledSourceMap,
              // postcss-loader と sass-loader の場合は2を指定
              importLoaders: 2,
            },
          },
          // PostCSS（autoprefixer）の設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS でもソースマップを有効に
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  // ベンダープレフィックスを自動付与
                  'autoprefixer',
                  // CSS Declaration Sorter （アルファベット順でソート）
                  ['css-declaration-sorter', { order: 'alphabetical' }],
                  // PostCSS Sort Media Queries（mobile-first でソート）
                  ['postcss-sort-media-queries', { sort: 'mobile-firstl' }],
                ],
              },
            },
          },
          // Sass を CSS へ変換するローダー
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require('sass'),
              sassOptions: {
                // fibers を使わない場合は以下で false を指定
                fiber: require('fibers'),
              },
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      // file-loader の設定を追加
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
        use: [
          {
            // 画像を出力フォルダーにコピーするローダー
            loader: 'file-loader',
            options: {
              // 画像ファイルの名前とパスの設定
              name: './images/[name].[ext]'
            }
          }
        ],
      },
    ],
  },
  // プラグインの設定
  plugins: [
    // CleanWebpackPlugin を追加
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
      filename: "common.css",
    }),
  ],
  // source-map タイプのソースマップを出力
  devtool: "source-map",
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/  // 正規表現で指定
  },
  devServer: {
    // ルートディレクトリの指定
    contentBase: path.join(__dirname, ''),
    // サーバー起動時にブラウザを自動的に起動
    open: true,
    // ルートディレクトリのファイルを監視（変更があると自動的にリロードされる）
    watchContentBase: true,
    // バンドルされたファイルを出力する（実際に書き出す）
    writeToDisk: true
  },
};
