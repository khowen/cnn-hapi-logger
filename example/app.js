'use strict';
const hapi = require('cnn-hapi'),
    path = require('path'),
    debug=require('debug')('app'),
    cnnhealth = require('cnn-health');

let healthChecks = cnnhealth(path.resolve(__dirname, './healthchecks')).asArray();

let app = module.exports = hapi({
    directory: __dirname,
    name: 'Test Hoist',
    description: 'Testing',
    port: 8080,
    metrics: {provider: require('cnn-metrics'), options: {flushEvery: 1000 * 20}},
    layoutsDir: `${__dirname}/views/`,
    healthChecks: healthChecks
});

app.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello router');
    }
});
app.register({
    register: require('../index'),
    options: {}
}, function (err) {
    if (err) {
        console.error('[' + 'error'.red + ']' + 'hapi-swagger load error: ' + err)
    }else{
        debug('hapi-swagger interface loaded');
    }
});
app.start(function () {
    console.log('App Starting');
});
