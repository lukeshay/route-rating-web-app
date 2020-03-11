const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, EnvironmentPlugin } = require('webpack');

const SRC_DIR = resolve(__dirname, '../', 'src/');
const NODE_DIR = resolve(__dirname, '../', 'node_modules/');

module.exports = {
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      favicon: 'favicon.ico',
    }),
    new ProvidePlugin({
      React: 'react',
    }),
    new EnvironmentPlugin(['recaptchaKey']),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
