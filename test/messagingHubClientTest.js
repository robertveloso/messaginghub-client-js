import MessagingHubClient from '../src/MessagingHubClient';
import chai from 'chai'

describe("MessagingHubClient tests", () => {
    it("should execute callback without error after connect", (done) => {
        var client = new MessagingHubClient.default("ws://msging.net:8081");
        client.connect("", "", done);
    });
});
