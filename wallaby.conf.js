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
            {pattern: 'src/*.js', load: false}
        ],

        tests: [
            {pattern: 'test/*Test.js'}
        ],

        debug: true,

        testFramework: 'mocha',

        compilers: {
            '**/*.js': wallaby.compilers.babel(babelConfig)
        },

        postprocessor: wallabyPostprocessor,

        bootstrap: function (wallaby) {
            var mocha = wallaby.testFramework;
            mocha.ui('bdd');
        }
    };
};
