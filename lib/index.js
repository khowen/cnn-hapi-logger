'use strict';
const Hoek = require('hoek');
const Joi = require('joi');
const Path = require('path');
const Querystring = require('querystring');
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

module.exports.register = function (server, options, next) {
    let settings = Hoek.applyToDefaults(defaults, options);
    const publicDirPath = Path.resolve(__dirname, '..', 'public');
    const loggerDirPath = Path.join(publicDirPath, 'loggerui');
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

    server.route({
            method: ['GET'], path: '/log',
            config: {
                handler: function (request, reply) {
                    //reply('Here is what I was');
                    reply.view('logger', {appName:'Hello'});
                }
            }
        }
    );
    next();
    });
}

module.exports.register.attributes = {
    name: 'cnn-hapi-logger'
};


// exports.register = function (plugin, options, next) {
//

//
//
//     // add routing swagger json
//     // plugin.route([{
//     //     method: 'GET',
//     //     path: settings.jsonPath,
//     //     config: {
//     //         auth: settings.auth,
//     //         handler: (request, reply) => {
//     //             Joi.assert(settings, schema);
//     //
//     //             if (settings.cache) {
//     //                 plugin.methods.getSwaggerJSON(settings, request, (err, json, cached, report) => {
//     //
//     //                     /* $lab:coverage:off$ */
//     //                     if (err) {
//     //                         reply(err);
//     //                         /* $lab:coverage:on$ */
//     //                     } else {
//     //                         //console.log(JSON.stringify(report));
//     //                         const lastModified = cached ? new Date(cached.stored) : new Date();
//     //                         reply(json).header('last-modified', lastModified.toUTCString());
//     //                     }
//     //                 });
//     //             } else {
//     //                 Joi.assert(settings, schema);
//     //                 Builder.getSwaggerJSON(settings, request, (err, json) => {
//     //
//     //                     reply(json);
//     //                 });
//     //             }
//     //         },
//     //         plugins: {
//     //             'hapi-swagger': false
//     //         }
//     //     }
//     // }]);
//
//     // make sure we have other plug-in dependencies
//     // plugin.dependency(['inert', 'vision'], (pluginWithDependencies, nextWithDependencies) => {
//     //     // add routing for logger static assets /loggerui/
//     //     console.log(pluginWithDependencies)
//     //     // pluginWithDependencies.views({
//     //     //     engines: {
//     //     //         html: {
//     //     //             module: require('ejs')
//     //     //         }
//     //     //     },
//     //     //     path: loggerDirPath
//     //     // });
//     //     pluginWithDependencies.route([{
//     //         method: 'GET',
//     //         path: settings.documentationPath,
//     //         config: {
//     //             auth: settings.auth
//     //         },
//     //         handler: (request, reply) => {
//     //
//     //             reply.view('index.html', {});
//     //         }
//     //     }]);
//     //     nextWithDependencies();
//     // });
// };
//
// /**
//  * attributes for plug-in uses 'name' and 'version' from package.json files
//  */
// exports.register.attributes = {
//     pkg: require('../package.json')
// };
