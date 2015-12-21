"use strict";
var sinon = require("sinon");
var MessagingHubClient_1 = require('../src/MessagingHubClient');
describe("MessagingHubClient tests", function () {
    it("should execute callback without error after connct", function () {
        var client = new MessagingHubClient_1.default("ws://msging.net:8081");
        var connectCallback = sinon.spy();
        client.connect("", "", connectCallback);
        connectCallback.calledWith(undefined, sinon.match.any).should.to.be.ok;
    });
});
