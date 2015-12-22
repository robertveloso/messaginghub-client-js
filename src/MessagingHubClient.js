import Lime from 'lime-js';

export default class MessagingHubClient {

    get uri() { return this._uri; }

    constructor(uri, transport = new Lime.WebSocketTransport(true)) {
        this._uri = uri;
        this._transport = transport;
        this._clientChannel = new Lime.ClientChannel(this.transport);
        this.messageReceivers = {};
        this.notificationReceivers = {};
        this._clientChannel.onMessage = (m) => (this.messageReceivers[m.type] || []).map((f) => f(m));
        this._clientChannel.onNotification = (n) => (this.notificationReceivers[n.event] || []).map((f) => f(n));
    }

    connect(user, password, callback) {
        this.transport.onOpen = () => {
            let authentication = new Lime.GuestAuthentication();
            Lime.ClientChannelExtensions.establishSession(this._clientChannel, 'none', 'none', user, authentication, '', callback);
        };
        this.transport.open(this.uri);
    }

    sendMessage(message) {
        this._clientChannel.sendMessage(message);
    }

    sendNotification(notification) {
        this._clientChannel.sendNotification(notification);
    }

    sendCommand(command) {
        this._clientChannel.sendCommand(command);
    }

    addMessageReceiver(type, receiverCallback) {
        this.messageReceivers[type] = this.messageReceivers[type] || [];
        this.messageReceivers[type].push(receiverCallback);
        return receiverCallback;
    }

    addNotificationReceiver(event, receiverCallback) {
        this.notificationReceivers[event] = this.notificationReceivers[event] || [];
        this.notificationReceivers[event].push(receiverCallback);
        return receiverCallback;
    }

    removeMessageReceiver(type, receiver) {
        try {
            return this.messageReceivers[type] = this.messageReceivers[type].filter((r) => r != receiver);
        } catch(err) {
            throw new Error(`No message receiver for type '${type}'`);
        }
    }

    removeNotificationReceiver(event, receiver) {
        try {
            return this.notificationReceivers[event] = this.notificationReceivers[event].filter((r) => r != receiver);
        } catch(err) {
            throw new Error(`No notification receiver for event '${event}'`);
        }
    }
}
