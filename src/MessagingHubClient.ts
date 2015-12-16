interface IMessageReceiver {
  (message: Message): void
}
interface INotificationReceiver {
  (message: Notification): void
}

interface ISessionCallback {
  (error: Error, session: Session): void
}

interface IErrorCallback {
  (error: Error): void
}


class MessagingHubClient {

  private uri: string;
  private messageReceivers:  { [type: string]: IMessageReceiver };
  private notificationReceivers: { [event: string]: INotificationReceiver };

  private clientChannel: ClientChannel;

  constructor(uri: string) {
    this.uri = uri;
  }

  connect(user: string, password: string, callback: ISessionCallback): void {
    // TODO: implement MessagingHubClient.connect
  }

  sendMessage(message: Message, callback: IErrorCallback) {
    // TODO: implement MessagingHubClient.sendMessage
  }
  sendNotification(notification: Notification, callback: IErrorCallback) {
    // TODO: implement MessagingHubClient.sendNotification
  }
  sendCommand(command: Command, callback: IErrorCallback) {
    // TODO: implement MessagingHubClient.sendCommand
  }

  onMessageReceived(type: string, receiver: IMessageReceiver) {
    this.messageReceivers[type] = receiver;
  }
  onNotificationReceived(event: string, receiver: INotificationReceiver) {
    this.notificationReceivers[event] = receiver;
  }
}
