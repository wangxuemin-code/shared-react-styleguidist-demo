module.exports = {
  components: 'src/controls/button/*.tsx',
  propsParser: require('react-docgen-typescript').parse,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  webpackConfig: require('./webpack/webpack.dev.js'),
  styleguideDir: './',
};
