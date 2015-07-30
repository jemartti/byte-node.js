var app = require('koa')();
var bodyParser = require('koa-body')();
var json = require('koa-json');
var router = require('koa-router');

var ByteSDK = require('../../../index');

var BPromise = require('bluebird').Promise;
var _s = require('underscore.string');
var YodaSpeak = require('yoda-speak');
var yoda = new YodaSpeak('<config.mashapeKey>');
BPromise.promisifyAll(yoda);


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


routes.get('/yoda', function* () {
    this.body = new ByteSDK.ComputerConfig('text', 'hmm...');
});

routes.post('/yoda', bodyParser, function* () {
    var args = this.request.body.data;
    var response = new ByteSDK.ComputerResponse();

    var speak = yield yoda.convertAsync(args.text);
    response.addObject(new ByteSDK.TextObject({
        'text': _s.clean(speak.toString())
    }));

    this.body = response;
});

app.listen(3000);
