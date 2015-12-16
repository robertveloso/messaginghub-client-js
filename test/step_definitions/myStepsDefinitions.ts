import chai = require("../../node_modules/chai");

export = () => {

   var expect = chai.expect;

  this.Given(/^I am using CucumberJs$/, ((callback) => {
    callback.pending();
  }));

  this.When(/^I execute a test$/, ((callback) => {
    callback.pending();
  }));

  this.Then(/^II should be work$/, ((callback) => {
    callback.pending();
  }));
};
