'use strict';
let io = require('socket.io'),
    systemActions = require('./system_actions'),
    debug = require('debug')('socket:lib:socketactions'),
    _sio,
    socketIOActions = {
        init: function (sio) {
            _sio = sio;
            console.log('Init socketIOActions');
            systemActions.on('messageEmitted', function (message) {
                _sio.emit('messageEmitted', message);
                debug('socketIO Action- messageEmitted');
            });
        }
    };

module.exports = socketIOActions;



