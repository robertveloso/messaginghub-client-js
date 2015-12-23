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

    it("should add and remove message listeners", () => {
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

    it("should add and remove notification listeners", () => {
        let f = () => undefined;
        let g = (x) => x;
        let remove_f = this.client.addNotificationReceiver('message_received', f);
        let remove_g = this.client.addNotificationReceiver('message_received', g);
        this.client.notificationReceivers['message_received'].should.eql([f, g]);
        remove_f();
        this.client.notificationReceivers['message_received'].should.eql([g]);
        remove_g();
        this.client.notificationReceivers['message_received'].should.eql([]);
    });

    it("should broadcast messages to message receivers", (done) => {
        let message = { type: 'application/json', test: 'test' };
        this.client.addMessageReceiver('application/json', (m) => {
            m.test.should.equal('test');
            done();
        });
        this.client._clientChannel.onMessage(message);
    });

    it("should broadcast notifications to notification receivers", (done) => {
        let notification = { event: 'message_received', test: 'test' };
        this.client.addNotificationReceiver('message_received', (n) => {
            n.test.should.equal('test');
            done();
        });
        this.client._clientChannel.onNotification(notification);
    });

    it("should do nothing when receiving unknown messages or notifications", () => {
        let message = { content: 'this looks odd' };
        let notification = { content: 'this looks odd' };
        this.client._clientChannel.onMessage(message);
        this.client._clientChannel.onNotification(notification);
    });

    it("should send messages", (done) => {
        let remove = this.client.addMessageReceiver('text/plain', (m) => {
            m.content.should.equal('pong');
            remove();
            done();
        });
        this.client.sendMessage({ type: 'text/plain', content: 'ping' });
    });

    it("should send notifications", (done) => {
        let remove = this.client.addNotificationReceiver('pong', (n) => {
            remove();
            done();
        });
        this.client.sendNotification({ event: 'ping' });
    });

    it("should send commands and receive a response", (done) => {
        this.client.sendCommand({ id: 'test', method: 'get', uri: '/ping' }, (c) => {
            c.id.should.equal('test');
            c.method.should.equal('get');
            c.status.should.equal('success');
            done();
        });
    });
});
