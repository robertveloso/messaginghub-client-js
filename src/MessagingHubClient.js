import Lime from 'lime-js';

export default class MessagingHubClient {

    get uri() { return this._url; }

    constructor(uri) {
        this._uri = uri;
        this._transport = new Lime.WebSocketTransport(true);
        this._clientChannel = new Lime.ClientChannel(this.transport);
        this.messageReceivers = {};
        this.notificationReceivers = {};
        this._clientChannel.onMessage = (m) => (this.messageReceivers[m.type] || []).map((f) => f(m));
        this._clientChannel.onNotification = (n) => (this.notificationReceivers[n.event] || []).map((f) => f(n));
    }

    connect(user, password, callback) {
        this.transport.onOpen = () => {
            let authentication = new Lime.GuestAuthentication();
            Lime.ClientChannelExtensions.establishSession(this._clientChannel, "none", "none", user, authentication, "", callback);
        };
        this.transport.open(this.uri);
    }

    sendMessage(message, callback) {
        this._clientChannel.sendMessage(message);
    }

    sendNotification(notification, callback) {
        this._clientChannel.sendNotification(notification);
    }

    sendCommand(command, callback) {
        this._clientChannel.sendCommand(command);
    }

    addMessageReceiver(type, receiverCallback) {
        this.messageReceivers[type].push(receiverCallback);
        return receiver;
    }

    addNotificationReceiver(event, receiverCallback) {
        this.notificationReceivers[event].push(receiverCallback);
        return receiver;
    }

    removeMessageReceiver(type, receiver) {
        return this.messageReceivers[type] = this.messageReceivers[type].filter((r) => r != receiver);
    }

    removeNotificationReceiver(event, receiver) {
        return this.notificationReceivers[event] = this.notificationReceivers[event].filter((r) => r != receiver);
    }
}
