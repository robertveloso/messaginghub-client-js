import MessagingHubClient from '../src/MessagingHubClient';
import TcpTransport from './helpers/TcpTransport';
import TcpLimeServer from './helpers/TcpLimeServer';

require('chai').should();

describe("MessagingHubClient tests", function() {

    before((done) => {
        TcpLimeServer.listen(8124, done);
    });

    it("should execute callback without error after connect", (done) => {
        this.client = new MessagingHubClient("127.0.0.1:8124", new TcpTransport());
        this.client.connect("", "", done);
    });

    it("should add and remove message and notification listeners", () => {
        let f = () => undefined;
        let g = (x) => x;
        let remove_f = this.client.addMessageReceiver('application/json', f);
        let remove_g = this.client.addMessageReceiver('application/json', g);
        this.client.messageReceivers['application/json'].should.eql([f, g]);
        remove_f();
        this.client.messageReceivers['application/json'].should.eql([g]);
        remove_g();
        this.client.messageReceivers['application/json'].should.eql([]);
    });

    it("should broadcast messages and notifications to receivers", (done) => {
        let msg = { type: 'application/json', test: 'test' };
        this.client.addMessageReceiver('application/json', (m) => {
            m.test.should.equal('test');
            done();
        });
        this.client._clientChannel.onMessage(msg);
    });
});
