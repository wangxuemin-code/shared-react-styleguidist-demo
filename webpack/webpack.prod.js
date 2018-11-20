// ///////////////////////////////////////////////////////
//  WebPack dev settings
// ///////////////////////////////////////////////////////
//  author: Jose Quinto - https://blog.josequinto.com
// ///////////////////////////////////////////////////////
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPaths = require('./common-paths');
const webpack = require('webpack');

module.exports = {
  entry: {
    'istox-shared': './src/index-prod.ts'
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: `${commonPaths.contentBasePath}/index.html`
    }),

    new webpack.IgnorePlugin(/test\.ts$/),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    // loaders -> rules in webpack 2
    rules: [
      // Once TypeScript is configured to output source maps we need to tell webpack
      // to extract these source maps and pass them to the browser,
      // this way we will get the source file exactly as we see it in our code editor.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: '/node_modules/'
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'source-map-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: commonPaths.srcPath,
        use: [
          {
            loader: ['babel-loader', 'awesome-typescript-loader'],
            options: {
              happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/i,
        exclude: [/node_modules/],
        include: commonPaths.srcPath,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: '[local]',
              minimize: false,
              namedExport: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')(),
                // Following CSS Nesting Module Level 3: http://tabatkins.github.io/specs/css-nesting/
                require('postcss-nesting')(),
                require('postcss-custom-properties')(),
                // https://github.com/ai/browserslist
                require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie >= 9']
                })
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
