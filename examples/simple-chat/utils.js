/* eslint-env browser */
(function(window) {

    var utils = window.utils || {};

    utils.checkMandatoryInput = function(input) {
        if(!input.value) {
            throw new Error('The input element ' + input.id + ' is mandatory.');
        }
        return true;
    };

    var logTextarea = document.getElementById('log-textarea');
    utils.logMessage = function(message) {
        var log = logTextarea.value;
        if(log) {
            log += '\r\n';
        }
        log += message;
        logTextarea.value = log;
    };

    utils.logLimeMessage = function(message, event) {
        utils.logMessage(event + '\nId: ' + message.id + '\nFrom: ' + message.from + '\nTo: ' + message.to + '\nContent: ' + JSON.stringify(message.content) + '\n\n');
    };

    utils.logLimeNotification = function(notification, event) {
        utils.logMessage(event + '\nId: ' + notification.id + '\nFrom: ' + notification.from + ' \nTo: ' + notification.to + ' \nEvent: ' + notification.event + ' \nReason: ' + notification.reason + '\n\n');
    };

    utils.logLimeCommand = function(command, event) {
        utils.logMessage(event + '\nId: ' + command.id + '\nFrom: ' + command.from + ' \nTo: ' + command.to + ' \nMethod: ' + command.method + ' \nUri: ' + command.uri + ' \nStatus: ' + command.status + '\n\n');
    };

    window.utils = utils;
})(this);
