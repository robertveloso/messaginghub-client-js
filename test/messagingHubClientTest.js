'use strict';

/*eslint-env node, mocha */

import MessagingHubClient from '../src/MessagingHubClient';
import TcpTransport from './helpers/TcpTransport';
import TcpLimeServer from './helpers/TcpLimeServer';

require('chai').should();

describe('MessagingHubClient tests', function() {

    before((done) => {
        this.server = new TcpLimeServer();
        this.server.listen(8124).then(done);
    });

    it('should connect with guest authentication returning a promise', (done) => {
        this.guest = new MessagingHubClient('127.0.0.1:8124', new TcpTransport());
        this.guest.connect('guest').then(() => done());
    });

    it('should close connections without errors', (done) => {
        this.guest.close().then(() => done());
    });

    it('should connect with plain authentication converting to a base64 password', (done) => {
        this.client = new MessagingHubClient('127.0.0.1:8124', new TcpTransport());
        this.client.connect('test', 't35t64').then(() => done());
    });

    it('should add and remove message listeners', () => {
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

    it('should add and remove notification listeners', () => {
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

    it('should broadcast messages to message receivers', (done) => {
        let message = { type: 'application/json', content: '{"test": true}' };
        this.client.addMessageReceiver('application/json', (m) => {
            m.content.should.equal('{"test": true}');
            done();
        });
        this.server.broadcast(message);
    });

    it('should broadcast notifications to notification receivers', (done) => {
        let notification = { event: 'received', metadata: 'test' };
        this.client.addNotificationReceiver('received', (n) => {
            n.metadata.should.equal('test');
            done();
        });
        this.server.broadcast(notification);
    });

    it('should do nothing when receiving unknown messages, notifications or commands', () => {
        let message = { type: 'application/unknown', content: 'this looks odd' };
        let notification = { event: 'consumed', content: 'this looks odd' };
        let command = { id: 'no_id_for_this', method: 'get' };
        this.client._clientChannel.onMessage(message);
        this.client._clientChannel.onNotification(notification);
        this.client._clientChannel.onCommand(command);
    });

    it('should send messages', (done) => {
        let remove = this.client.addMessageReceiver('text/plain', (m) => {
            m.content.should.equal('pong');
            remove();
            done();
        });
        this.client.sendMessage({ type: 'text/plain', content: 'ping' });
    });

    it('should send notifications', (done) => {
        let remove = this.client.addNotificationReceiver('pong', () => {
            remove();
            done();
        });
        this.client.sendNotification({ event: 'ping' });
    });

    it('should send commands and receive a response', (done) => {
        this.client
            .sendCommand({ id: 'test', method: 'get', uri: '/ping' })
            .then((c) => {
                c.id.should.equal('test');
                c.method.should.equal('get');
                c.status.should.equal('success');
                done();
            });
    });

    after(() => {
        this.client.close();
        this.server.close();
    });
});
