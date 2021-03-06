// ///////////////////////////////////////////////////////
//  WebPack dev settings
// ///////////////////////////////////////////////////////
//  author: Jose Quinto - https://blog.josequinto.com
// ///////////////////////////////////////////////////////
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPaths = require('./common-paths');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    'istox-shared': './src/index-prod.ts'
  },
  output: {
    filename: 'useless.js',
    path: commonPaths.outputPath,
    publicPath: './',
    library: 'ISTOX',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: `${commonPaths.contentBasePath}/index.html`
    }),

    new webpack.IgnorePlugin(/test\.ts$/),

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
            loader: 'ignore-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      {
        test: /\.(css|scss)$/i,
        use: [
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
