module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},

      'src/**/*.ts',
    ],
    tests: [
      'test/**/*Test.ts'
    ],
    debug: true
    testFramework: 'mocha',

    // TypeScript compiler is on by default with default options,
    // you can configure built-in compiler by passing options to it
    // See interface CompilerOptions in
    // https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts
    
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 5,  // ES6
        target: 2  // ES6
      })
    },
    preprocessors: {
      '**/*.js': file => require('babel-core').transform(
                               file.content,
                               {sourceMap: true, presets: ['es2015']})
    }

    bootstrap: function () {
      window.expect = chai.expect;
      var should = chai.should();
    }
  };
};
