/*eslint-env node, browser */
var babel = require('babel-core');
var fs = require('fs');
var path = require('path');

var babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc')));
babelConfig.babel = babel;

var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config');
// removing babel-loader, we will use babel compiler instead, it's more performant
webpackConfig.module.loaders = webpackConfig.module.loaders.filter(function(l){
    return l.loader !== 'babel-loader';
});
delete webpackConfig.devtool;
var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
    return {
        files: [
          {pattern: 'node_modules/chai/chai.js', instrument: false},
          {pattern: 'node_modules/sinon/lib/sinon.js', instrument: false},
          {pattern: 'node_modules/sinon/lib/**/*.js', load: false},
          {pattern: 'test/helpers/*.js', instrument: false},
          {pattern: 'src/**/*.js', load: false}
        ],

        tests: [
            {pattern: 'test/**/*Test.js', load: false}
        ],

        debug: true,

        testFramework: 'mocha',

        preprocessors: { '**/*.js': file => babel.transform(file.content, {sourceMap: true}) },

        compilers: {
            '**/*.js': wallaby.compilers.babel(babelConfig)
        },

        postprocessor: wallabyPostprocessor,

        bootstrap: function (wallaby) {
            var mocha = wallaby.testFramework;
            mocha.ui('bdd');
            window.__moduleBundler.loadTests();
        }
    };
};
