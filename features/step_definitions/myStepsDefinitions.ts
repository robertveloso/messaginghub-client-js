/// <reference path="../../typings/chai/chai.d.ts"/>
/// <reference path="../../typings/sinon/sinon.d.ts"/>
/// <reference path="../../typings/cucumber/cucumber.d.ts"/>
/// <reference path="../../src/MessagingHubClient.ts"/>

import chai = require("chai");
import sinon = require("sinon");

type Callback = cucumber.CallbackStepDefinition;

export = () => {

  var step = <cucumber.StepDefinitions>this;
  let expect = chai.expect;
  let should = chai.should();
  let uri : string, client : MessagingHubClient, connectCallback : any;

  step.Given(/^Exist a available connection with (.+)$/, ((uri, callback : Callback) => {
      this.uri = uri;
  }));

  step.Given(/^I have a MessaginHubClient instance)$/, ((callback : Callback) => {
      this.client = new MessagingHubClient(this.uri);
  }));

  step.When(/^I connect$/, ((callback : Callback) => {
     this.connectCallback = sinon.spy();
     this.client.connect(this.connectCallback);
  }));

  step.Then(/^Should be execute a callback function with undefined error$/, ((callback : Callback) => {
    connectCallback.calledWith("foo").should.to.be.ok;;
  }));
};
