// @ts-nocheck
const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PORT = 2333;

const commonConfig = {
  cache: {
    type: 'filesystem',
  },
  entry: {
    index: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  stats: {
    all: false,
    colors: true,
    warnings: false,
    errors: true,
    errorDetails: true,
    chunks: false,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['cache-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/[name].[contenthash].[ext]',
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff2?)/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: false,
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

module.exports = (env, { mode }) => {
  const devConfig = {
    devtool: 'source-map',
    devServer: {
      // contentBase: '.',
      hot: true,
      host: '0.0.0.0',
      port: PORT,
      clientLogLevel: 'none',
      noInfo: true,
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 2 },
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 2 },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackBar({
        reporter: [
          {
            afterAllDone() {
              console.log(
                chalk.bgBlue(` ${chalk.black('INFO')} `) +
                  chalk.white(' Your App is running at: \n\n') +
                  chalk.green(`     IPv4:  http://127.0.0.1:${PORT}\n`),
              );
            },
          },
        ],
      }),
    ],
  };

  const prodConfig = {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            {
              loader: 'css-loader',
              options: { sourceMap: false, importLoaders: 2 },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: false, importLoaders: 2 },
            },
          ],
        },
      ],
    },
    stats: {
      chunks: true,
    },
    optimization: {
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: false,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 6,
        maxInitialRequests: 6,
        name: false,
        cacheGroups: {
          polyfill: {
            test: /[\\/]node_modules[\\/](core-js|@babel|regenerator-runtime)/,
            name: 'polyfill',
            priority: 70,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)/,
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
      }),
      new WebpackBar({}),
    ],
  };

  const config = merge(commonConfig, mode === 'development' ? devConfig : prodConfig);
  return config;
};
