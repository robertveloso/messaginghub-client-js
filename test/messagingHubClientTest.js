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

    it('should connect with plain authentication converting to a base64 password', (done) => {
        this.client = new MessagingHubClient('127.0.0.1:8124', new TcpTransport());
        this.client.connectWithPassword('test', '123456').then(() => done());
    });

    it('should connect with key authentication converting to a base64 key', (done) => {
        this.client = new MessagingHubClient('127.0.0.1:8124', new TcpTransport());
        this.client.connectWithKey('testKey', 'abcdef').then(() => done());
    });

    it('should automatically send a set presence command when connecting', (done) => {
        this.server._onPresenceCommand = (command) => {
            command.should.eql({
                id: command.id,
                method: 'set',
                uri: '/presence',
                type: 'application/vnd.lime.presence+json',
                resource: {
                    status: 'available',
                    routingRule: 'identity'
                }
            });
            this.guest.close().then(() => done());
        };

        this.guest = new MessagingHubClient('127.0.0.1:8124', new TcpTransport());
        this.guest.connectWithPassword('test2', '123456');
    });

    it('should add and remove message listeners', () => {
        let f = () => undefined;
        let g = (x) => x;

        let remove_f = this.client.addMessageReceiver('application/json', f);
        let remove_g = this.client.addMessageReceiver('application/json', g);

        this.client._messageReceivers[0].callback.should.eql(f);
        this.client._messageReceivers[1].callback.should.eql(g);
        remove_f();
        this.client._messageReceivers[0].callback.should.eql(g);
        remove_g();
        this.client._messageReceivers.should.eql([]);
    });

    it('should add and remove notification listeners', () => {
        let f = () => undefined;
        let g = (x) => x;
        let remove_f = this.client.addNotificationReceiver('received', f);
        let remove_g = this.client.addNotificationReceiver('received', g);

        this.client._notificationReceivers[0].callback.should.eql(f);
        this.client._notificationReceivers[1].callback.should.eql(g);
        remove_f();
        this.client._notificationReceivers[0].callback.should.eql(g);
        remove_g();
        this.client._notificationReceivers.should.eql([]);
    });

    it('should call receivers predicates with the received envelope', (done) => {
        this.client.addMessageReceiver((message) => {
            message.type.should.equal('text/plain');
            message.content.should.equal('test');
            return true;
        }, () => {
            this.client.addNotificationReceiver((message) => {
                message.event.should.equal('received');
                return true;
            }, () => {
                this.client.clearMessageReceivers();
                this.client.clearNotificationReceivers();
                done();
            });
            this.server.broadcast({ event: 'received' });
        });

        this.server.broadcast({ type: 'text/plain', content: 'test' });
    });

    it('should create predicate functions from non-function values', (done) => {
        this.client.addMessageReceiver(null, () => {
            this.client.clearMessageReceivers();
            this.client.addNotificationReceiver(null, () => {
                this.client.clearNotificationReceivers();
                this.client.addMessageReceiver('text/plain', () => {
                    this.client.clearMessageReceivers();
                    this.client.addNotificationReceiver('received', () => {
                        this.client.clearNotificationReceivers();
                        done();
                    });
                    this.server.broadcast({ event: 'received' });
                });
                this.server.broadcast({ type: 'text/plain', content: 'test' });
            });
            this.server.broadcast({ event: 'received' });
        });
        this.server.broadcast({ type: 'text/plain', content: 'test' });
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
