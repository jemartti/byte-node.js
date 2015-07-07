var app = require('koa')();
var json = require('koa-json');
var router = require('koa-router');

var ByteSDK = require('../../../index');

var btcaverage = require('btcaverage');


// Set up middleware
app.use(json({
    'pretty': false,
    'param': 'pretty'
}));

// Error logging
app.on('error', function (err) {
    console.error(err);
    console.trace(err.stack);
    this.status = 500;
});

// Response time logging
app.use(function* (next) {
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    this.set('X-Response-Time', ms + 'ms');
    console.log('%s %s %sms', this.method, this.url, ms);
});

// Routers
var routes = new router();
app.use(routes.routes());
app.use(routes.allowedMethods());


routes.get('/bitcoin', function* () {
    var response = new ByteSDK.ComputerResponse();

    var priceDetails = yield btcaverage();
    response.addObject(new ByteSDK.TextObject({
        'text': '$' + parseFloat(priceDetails.average).toFixed(2)
    }));

    this.body = response;
});

app.listen(3000);
