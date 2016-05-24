'use strict';
let io = require('socket.io'),
    systemEvents = require('../systemevents'),
    debug = require('debug')('socket:lib:socketio'),
    _sio,
    socketIOActions = {
        init: function (sio) {
            _sio = sio;
            console.log('Init socketIOActions');
            systemEvents.on('messageEmitted', function (message) {
                _sio.emit('messageEmitted', message);
                debug('socketIO Action- messageEmitted');
            });
        }
    };

module.exports = socketIOActions;



