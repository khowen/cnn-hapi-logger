'use strict';


let events = require('events'),
    utils = require('util'),
    sinks = require('../sinks'),
    SystemActions = function () {
        events.EventEmitter.call(this);
        this.messageEmitted = function (message) {
            this.emit('messageEmitted', message);
        };
        
    };

utils.inherits(SystemActions, events.EventEmitter);

var sysActions = new SystemActions();

module.exports = sysActions;
