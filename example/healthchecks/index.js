const debug = require('debug')('check');
module.exports = {
    name: 'json check fixture',
    description: 'json check fixture description',
    checks: [
        {
            type: 'json',
            name: 'CNN Homepage',
            url: 'http://www.cnn.com/_healthcheck',
            severity: 2,
            businessImpact: 'Its a HUGE deal',
            technicalSummary: 'God knows',
            panicGuide: 'Don\'t Panic',
            checkResult: {
                PASSED: 'Cool',
                FAILED: 'Sad',
                PENDING: 'This check has not yet run'
            },
            interval: '10s',
            callback: function (json) {
                debug(json.version)
                return json.version;
            }
        }
    ]
}
