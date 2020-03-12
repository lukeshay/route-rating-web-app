const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  DefinePlugin,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  ProvidePlugin,
} = require('webpack');
const { resolve } = require('path');

const NODE_DIR = resolve(__dirname, '', 'node_modules/');
const SRC_DIR = resolve(__dirname, '', 'src/');

const RR_ENV = process.env.RR_ENV || 'dev';

const BASE_URL =
  RR_ENV === 'local-dev'
    ? 'http://localhost:5000/'
    : 'https://restapi.lukeshay.com/';
const ENVIRONMENT = RR_ENV === 'prod' ? 'production' : 'development';

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html.ejs',
    favicon: 'favicon.ico',
  }),
  new ProvidePlugin({
    React: 'react',
  }),
  new EnvironmentPlugin(['recaptchaKey']),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENVIRONMENT),
      BASE_URL: JSON.stringify(BASE_URL),
    },
  }),
];

const DEV_PLUGINS = [
  new HotModuleReplacementPlugin(),
  new NamedModulesPlugin(),
];

const PROD_PLUGINS = [
  new BrotliPlugin({
    asset: '[path].br[query]',
    test: /\.(ts|tsx|js|jsx|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
];

if (ENVIRONMENT === 'production') {
  PROD_PLUGINS.forEach((plugin) => plugins.push(plugin));
} else {
  DEV_PLUGINS.forEach((plugin) => plugins.push(plugin));
}

const COMMON = {
  mode: ENVIRONMENT,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: SRC_DIR,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: NODE_DIR,
        sideEffects: false,
      },
      {
        test: /\.tsx?$/,
        exclude: NODE_DIR,
        use: {
          loader: 'ts-loader?configFile=tsconfig.webpack.json',
        },
        sideEffects: false,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        sideEffects: false,
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: plugins,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

const PRODUCTION = {
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

const DEVELOPMENT = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './index.tsx',
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    host: '0.0.0.0',
    hot: true,
    port: 3000,
  },
  devtool: 'cheap-module-eval-source-map',
};

const merged = COMMON;

if (ENVIRONMENT === 'production') {
  Object.keys(PRODUCTION).forEach((k) => (merged[k] = PRODUCTION[k]));
} else {
  Object.keys(DEVELOPMENT).forEach((k) => (merged[k] = DEVELOPMENT[k]));
}

module.exports = merged;
