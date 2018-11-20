//////////////////////////////////////////////////////////
//  WebPack Common (webpack.academy)
//////////////////////////////////////////////////////////
//  author: Jose Quinto - https://blog.josequinto.com
//////////////////////////////////////////////////////////

const commonPaths = require('./common-paths');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const envKeys = Object.keys(process.env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
  return prev;
}, {});

const config = {
  target: 'web',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'index.js',
    path: commonPaths.outputPath,

    // There are also additional JS chunk files if you use code splitting.
    // chunkFilename: '[name].chunk.js',

    // This is the URL that app is served from. We use "/" in development.
    publicPath: './',
    library: 'ISTOX',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
  ]
};

module.exports = config;
