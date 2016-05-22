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
    'loggerUIPath': '/logger/',
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
exports.register = function (plugin, options, next) {

    let settings = Hoek.applyToDefaults(defaults, options);

    const publicDirPath = Path.resolve(__dirname, '..', 'public');
    const loggerDirPath = Path.join(publicDirPath, 'loggerui');


    // add server method for caching
    // if (settings.cache) {
    //     // set defaults
    //     settings.cache.segment = 'cnn-hapi-logger';
    //     if (!settings.cache.generateTimeout) {
    //         settings.cache.generateTimeout = 30 * 1000;
    //     }
    //
    //     // plugin.method('getSwaggerJSON', Builder.getSwaggerJSON, {
    //     //     cache: settings.cache,
    //     //     generateKey: () => {
    //     //
    //     //         return 'hapi-swagger';
    //     //     }
    //     // });
    // }


    // add routing swagger json
    // plugin.route([{
    //     method: 'GET',
    //     path: settings.jsonPath,
    //     config: {
    //         auth: settings.auth,
    //         handler: (request, reply) => {
    //             Joi.assert(settings, schema);
    //
    //             if (settings.cache) {
    //                 plugin.methods.getSwaggerJSON(settings, request, (err, json, cached, report) => {
    //
    //                     /* $lab:coverage:off$ */
    //                     if (err) {
    //                         reply(err);
    //                         /* $lab:coverage:on$ */
    //                     } else {
    //                         //console.log(JSON.stringify(report));
    //                         const lastModified = cached ? new Date(cached.stored) : new Date();
    //                         reply(json).header('last-modified', lastModified.toUTCString());
    //                     }
    //                 });
    //             } else {
    //                 Joi.assert(settings, schema);
    //                 Builder.getSwaggerJSON(settings, request, (err, json) => {
    //
    //                     reply(json);
    //                 });
    //             }
    //         },
    //         plugins: {
    //             'hapi-swagger': false
    //         }
    //     }
    // }]);

    // make sure we have other plug-in dependencies
    // plugin.dependency(['inert', 'vision'], (pluginWithDependencies, nextWithDependencies) => {
    //     // add routing for logger static assets /loggerui/
    //     console.log(pluginWithDependencies)
    //     // pluginWithDependencies.views({
    //     //     engines: {
    //     //         html: {
    //     //             module: require('ejs')
    //     //         }
    //     //     },
    //     //     path: loggerDirPath
    //     // });
    //     pluginWithDependencies.route([{
    //         method: 'GET',
    //         path: settings.documentationPath,
    //         config: {
    //             auth: settings.auth
    //         },
    //         handler: (request, reply) => {
    //
    //             reply.view('index.html', {});
    //         }
    //     }]);
    //     nextWithDependencies();
    // });
};

/**
 * attributes for plug-in uses 'name' and 'version' from package.json files
 */
exports.register.attributes = {
    pkg: require('../package.json')
};
