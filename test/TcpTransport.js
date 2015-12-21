"use strict";
var net = require('net');
var Lime = require('lime-js');
var TcpTransport = (function () {
    function TcpTransport(traceEnabled) {
        var _this = this;
        this.traceEnabled = traceEnabled;
        this.socket = new net.Socket();
        this.socket.on('close', this.onClose);
        this.socket.on('data', function (e) {
            if (_this.traceEnabled) {
                console.debug("TcpTransport RECEIVE: " + e.data);
            }
            _this.onEnvelope(JSON.parse(e.data));
        });
    }
    TcpTransport.prototype.send = function (envelope) {
        var envelopeString = JSON.stringify(envelope);
        this.socket.write(envelopeString);
        if (this.traceEnabled) {
            console.debug("TcpTransport SEND: " + envelopeString);
        }
    };
    TcpTransport.prototype.onEnvelope = function (envelope) { };
    TcpTransport.prototype.open = function (uri) {
        this.encryption = Lime.SessionEncryption.none;
        this.compression = Lime.SessionCompression.none;
        this.socket.connect(uri, this.onOpen);
    };
    TcpTransport.prototype.close = function () {
        this.socket.end();
    };
    TcpTransport.prototype.getSupportedCompression = function () {
        throw new Error("Compression change is not supported");
    };
    TcpTransport.prototype.setCompression = function (compression) { };
    TcpTransport.prototype.getSupportedEncryption = function () {
        throw new Error("Encryption change is not supported");
    };
    TcpTransport.prototype.setEncryption = function (encryption) { };
    TcpTransport.prototype.onOpen = function () { };
    TcpTransport.prototype.onClose = function () { };
    TcpTransport.prototype.onError = function (error) { };
    return TcpTransport;
})();
exports.TcpTransport = TcpTransport;
