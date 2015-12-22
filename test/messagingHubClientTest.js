import MessagingHubClient from '../src/MessagingHubClient';
import TcpTransport from './helpers/TcpTransport';
import TcpLimeServer from './helpers/TcpLimeServer';

describe("MessagingHubClient tests", () => {

    before((done) => {
        TcpLimeServer.listen(8124, done);
    });

    it("should execute callback without error after connect", (done) => {
        var client = new MessagingHubClient("127.0.0.1:8124", new TcpTransport());
        client.connect("", "", done);
    });
});
