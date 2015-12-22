import MessagingHubClient from '../src/MessagingHubClient';

describe("MessagingHubClient tests", () => {
    it("should execute callback without error after connect", (done) => {
        var client = new MessagingHubClient("ws://msging.net:8081", new TcpTransport());
        client.connect("", "", done);
    });
});
