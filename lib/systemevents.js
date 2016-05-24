'use strict';


let events = require('events'),
    utils = require('util'),
    sinks = require('./sinks'),
    SystemEvents = function () {
        events.EventEmitter.call(this);
        this.messageEmitted = function (message) {
            this.emit('messageEmitted', message);
        };

    };

utils.inherits(SystemEvents, events.EventEmitter);

var systemEvents = new SystemEvents();

module.exports = systemEvents;
