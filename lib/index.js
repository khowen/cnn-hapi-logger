'use strict';
const Hoek = require('hoek');
const Joi = require('joi');
const Path = require('path');
const debug = require('debug')('cnn-hapi-logger.lib');
const ioSink = require('../lib/sinks').socketio;
const Querystring = require('querystring');
const systemEvent = require('./systemevents');
const Url = require('url');



// defaults settings for plug-in
const defaults = {
    'debug': false,
    'jsonPath': '/logger.json',
    'documentationPath': '/documentation',
    'loggerUIPath': '/logger',
    'pathPrefixSize': 1,
    'payloadType': 'json',
    'enableDocumentation': true,
    'expanded': 'list',   //none, list or full
    'lang': 'en',
    'sortTags': 'default',
    'sortEndpoints': 'path',
    'sortPaths': 'unsorted',
    'connectionLabel': null
};
function test(){
    systemEvent.messageEmitted('Hello World');
}
module.exports.register = function (server, options, next) {
    let settings = Hoek.applyToDefaults(defaults, options);
    const publicDirPath = Path.resolve(__dirname, '..', 'public');
    const loggerDirPath = Path.join(publicDirPath, 'loggerui');
    debug('HERE I AM -----');
    server.register(require('vision'), (err) => {
        Hoek.assert(!err, err);
        server.views({
            engines: {
                html: require('ejs')
            },
            relativeTo: __dirname ,
            path: 'public' + '/loggerui',
            partialsPath: 'public' + 'partials'
        });
        server.register({
                register: require('hapio')
        });
        server.route({
                method: ['GET'], path: '/log',
                config: {
                    handler: function (request, reply) {
                        reply.view('logger', {appName:'Hello'});
                    }
                }
            }
        );
        var io = server.plugins.hapio.io;
        ioSink.init(io);
        setInterval(test, 2000);
        next();
    });
}

module.exports.register.attributes = {
    name: 'cnn-hapi-logger'
};
