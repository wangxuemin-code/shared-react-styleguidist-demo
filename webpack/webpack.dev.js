// ///////////////////////////////////////////////////////
//  WebPack dev settings
// ///////////////////////////////////////////////////////
//  author: Jose Quinto - https://blog.josequinto.com
// ///////////////////////////////////////////////////////
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPaths = require('./common-paths');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8200;
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

// Convert js strings to dimenssions
const convertStringToSassDimension = function(result) {
  // Only attempt to convert strings
  if (typeof result !== 'string') {
    return result;
  }

  const cssUnits = [
    'rem',
    'em',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'ex',
    '%',
    'px',
    'cm',
    'mm',
    'in',
    'pt',
    'pc',
    'ch'
  ];
  const parts = result.match(/[a-zA-Z]+|[0-9]+/g);
  const value = parts[0];
  const unit = parts[parts.length - 1];
  if (cssUnits.indexOf(unit) !== -1) {
    result = new sassUtils.SassDimension(parseInt(value, 10), unit);
  }

  return result;
};

module.exports = {
  entry: {
    'istox-shared': './src/index-dev.tsx'
  },
  // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  devServer: {
    // All options here: https://webpack.js.org/configuration/dev-server/

    hot: true, // enable HMR on the server
    contentBase: commonPaths.contentBasePath, // match the output path
    publicPath: '/', // match the output `publicPath`
    host,
    https: protocol === 'https',
    port: DEFAULT_PORT,
    disableHostCheck: true,
    historyApiFallback: true,
    // All the stats options here: https://webpack.js.org/configuration/stats/
    stats: {
      colors: true, // color is life
      chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
      'errors-only': true
    }
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: `${commonPaths.contentBasePath}/index.html`
    }),

    // ignore *.css.d.ts which cause problems integrated with HMR
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),

    // // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'istox.css'
    })
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
            loader: 'awesome-typescript-loader',
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
            loader: MiniCssExtractPlugin.loader,
            options: {}
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
            loader: 'sass-loader',
            options: {
              functions: {
                'get($keys)': function(keys) {
                  keys = keys.getValue().split('.');
                  var result = require(commonPaths.srcPath + '/css/theme/theme.js').stylings;
                  var i;
                  for (i = 0; i < keys.length; i++) {
                    result = result[keys[i]];
                    // Convert to SassDimension if dimenssion
                    if (typeof result === 'string') {
                      result = convertStringToSassDimension(result);
                    } else if (typeof result === 'object') {
                      Object.keys(result).forEach(function(key) {
                        var value = result[key];
                        result[key] = convertStringToSassDimension(value);
                      });
                    }
                  }
                  result = sassUtils.castToSass(result);
                  return result;
                }
              }
            }
          }
        ]
      }
    ]
  }
};
