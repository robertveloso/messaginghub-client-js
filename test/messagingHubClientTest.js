import sinon from 'sinon';
import MessagingHubClient from '../src/MessagingHubClient';

describe("MessagingHubClient tests", () => {
    it("should execute callback without error after connect", () => {
        var client = new MessagingHubClient.default("ws://msging.net:8081");
        var connectCallback = sinon.spy();
        client.connect("", "", connectCallback);
        connectCallback.calledWith(undefined, sinon.match.any).should.to.be.ok;
    });
});
