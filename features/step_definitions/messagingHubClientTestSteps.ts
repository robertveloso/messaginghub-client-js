/// <reference path="../../typings/chai/chai.d.ts"/>
/// <reference path="../../typings/sinon/sinon.d.ts"/>
/// <reference path="../../typings/cucumber/cucumber.d.ts"/>
/// <reference path="../../src/MessagingHubClient.ts"/>

import chai = require("chai");
import sinon = require("sinon");
import { MessagingHubClient, ClientChannel, Message, Notification, Command, Session } from "../../src/MessagingHubClient";

type Callback = cucumber.CallbackStepDefinition;

export = function() {

  let uri : string;
  let client : MessagingHubClient;
  let connectCallback : any;

  let expect = chai.expect;
  let should = chai.should();

  let step = <cucumber.StepDefinitions>this;

  step.Given(/^Exist a available connection with (.+)$/, ((uri : string, callback : Callback) => {
      this.uri = uri;
      callback();
  }));

  step.Given(/^I have a MessaginHubClient instance$/, ((callback : Callback) => {
      this.client = new MessagingHubClient(this.uri);
      callback();
  }));

  step.When(/^(\w+) connect with password '(.+)'$/, ((user : string, password : string, callback : Callback) => {
     this.connectCallback = sinon.spy();
     this.client.connect(user, password, this.connectCallback);
     callback();
  }));

  step.Then(/^Should be execute a callback function with undefined error$/, ((callback : Callback) => {
    this.connectCallback.calledWith(undefined, sinon.match.any).should.to.be.ok;
    callback();
  }));
}
