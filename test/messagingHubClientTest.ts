/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/sinon/sinon.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../src/MessagingHubClient.ts"/>

import chai = require("chai");
import sinon = require("sinon");
import MessagingHubClient from '../src/MessagingHubClient';

describe("MessagingHubClient tests", () => {

  it("should execute callback without error after connct", () => {
    // Arrange
    let client = new MessagingHubClient("ws://msging.net:8081");
    let connectCallback = sinon.spy();

    // Act
    client.connect("", "", connectCallback);

    // Assert
    connectCallback.calledWith(undefined, sinon.match.any).should.to.be.ok;
  });

});
