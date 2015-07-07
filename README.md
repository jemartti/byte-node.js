# byte-sdk
Simple model for writing Byte computers.

Computers appear in the Byte client and can provide an extended feature set for the user. Writing a new computer can be quite easy:
```
var app = require(‘koa’)();
var router = require(‘koa-router’);
var ByteSDK = require(‘byte-sdk’);
var btcaverage = require(‘btcaverage’);

var routes = new router();
app.use(routes.routes());
app.use(routes.allowedMethods());

routes.get(‘/bitcoin’, function* () {
    var response = new ByteSDK.ComputerResponse();

    var priceDetails = yield btcaverage();
    response.addObject(new ByteSDK.TextObject({
        ‘text’: ‘$’ + parseFloat(priceDetails.average).toFixed(2)
    }));

    this.body = response;
});

app.listen(3000);
```

Look in `examples/computers` for some more complete examples.

## Contents
* [What is a Computer?](#what-is-a-computer)
* [Types of Computers](#types-of-computers)
* [ComputerResponse Object Specs](#computerresponse-object-specs)
* [Error Handling](#error-handling)
* [Testing](#testing)
* [Shipping a Computer](#shipping-a-computer)
* [Registering a Computer](#registering-a-computer)


## What is a Computer?
Simply put, a Byte Computer is a minimal web–app that returns a `ComputerResponse()` object containing at least one `Object` (currently: Text, Link, Image, Gif, or Drawing).

## Types of Computers
There are two types of computers: those that require config and those that do not.

### No Config
If the computer returns a response without any config (e.g., Bitcoin), you only need to define a `GET` route (to return the results):
```
routes.get(‘/bitcoin’, function* () {
    var response = new ByteSDK.ComputerResponse();
    …
    this.body = response;
});
```

### Config
If the computer requires input/config to return a result (e.g., Image Search), you must define both a `GET` route (to return the config params) and a `POST` route (to return the results):
```
routes.get(‘/images’, function* () {
    this.body = new ByteSDK.ComputerConfig(‘query’, ‘kittens’);
});

routes.post(‘/images’, bodyParser, function* () {
    var query = this.request.body.data.query;
    var response = new ByteSDK.ComputerResponse();
    …
    this.body = response;
});
```

#### ComputerConfig Object Specs
To create a computer config object, return `new ByteSDK.ComputerConfig(name, placeholder)` where:
* `name` is the label for the object (you’ll use this to access the config response in your `POST` handler)
* `placeholder` is a string that is displayed to the user as an example input (e.g., ‘Dora the Explorer’)

## ComputerResponse Object Specs
To create a computer config object, call `new ByteSDK.ComputerResponse()`. To add an object to the computer response, call `response.addObject(object)` where `object` is a response object.

There are currently five types of response objects: `TextObject`, `LinkObject`, `GifObject`, `ImageObject`, and `DrawingObject`.

### Text
The `TextObject` constructor takes a `data` object of the following format:
```
{
    ‘text’: string, (required)
    ‘frame’: array, // (optional, an array [x, y, width, height] placing the object on the grid, default: [54, 57, 216, 216])
    ‘style’: string, // (optional)
    ‘color’: array, // (optional, an array [r, g, b, alpha], default [0, 0, 0, 1])
    ‘effects’: array, // (required, default [], with options being ‘’)
    ‘noPadding’: boolean, // (optional, default false)
    ‘singleLine’: boolean, // (optional, default false)
    ‘textAlignment’: string // (optional, options are ‘’, default ‘’)
}
```
where `style` is one of:
* ‘sans’ (GraphikApp-Semibold, default)
* ‘sans-regular’ (GraphikApp-Regular)
* ‘sans-italic’ (GraphikApp-RegularItalic)
* ‘punchout’ (ImpactLabel, monospaced)
* ‘eightbit’ (8bitOperatorPlus-Regular, monospaced)
* ‘cursive’ (Pecita),
* ‘poster’ (PlakCom-BlackExtraCondensed)
* ‘poster-staggered’ (PlakCom-BlackExtraCondensed, varied line spacing)
* ‘tape’ (Tapeworm-Regular)
* ‘serif’ (TiemposSemibold)

Create by using the constructor `new ByteSDK.TextObject({‘text’: ‘’, …})`.

### Link
Links are quite similar to Text objects; however, they have an added Link URL and optional Description.

The `LinkObject` constructor takes a `data` object of the following format:
```
{
    ‘url’: string, (required)
    ‘title’: string, (required)
    ‘description’: string, (optional)
    ‘frame’: array, // (optional, an array [x, y, width, height] placing the object on the grid, default: [54, 57, 216, 114])
    ‘style’: string, // (optional)
    ‘color’: array, // (optional, an array [r, g, b, alpha], default [0, 0, 0, 1])
    ‘effects’: array, // (required, default [], with options being ‘’)
    ‘noPadding’: boolean, // (optional, default false)
    ‘singleLine’: boolean // (optional, default false)
}
```
where `style` is one of:
* ‘sans’ (GraphikApp-Semibold, default)
* ‘sans-regular’ (GraphikApp-Regular)
* ‘sans-italic’ (GraphikApp-RegularItalic)
* ‘punchout’ (ImpactLabel, monospaced)
* ‘eightbit’ (8bitOperatorPlus-Regular, monospaced)
* ‘poster’ (PlakCom-BlackExtraCondensed)
* ‘poster-staggered’ (PlakCom-BlackExtraCondensed, varied line spacing)
* ‘tape’ (Tapeworm-Regular)
* ‘serif’ (TiemposSemibold)

Create by using the constructor `new ByteSDK.LinkObject({‘url’: ‘’, ‘title’: ‘’, …})`.

### Gif
The `GifObject` constructor takes a `data` object of the following format:
```
{
    ‘src’: string, (required)
    ‘frame’: array, // (optional, an array [x, y, width, height] placing the object on the grid)
    ‘effects’: array, // (required, default [], with options being ‘’)
    ‘scaleMode’: ‘string’ // (optional, default ‘fit’)
}
```

Create by using the constructor `new ByteSDK.GifObject({‘src’: ‘’, …})`.

### Image
The `ImageObject` constructor takes a `data` object of the following format:
```
{
    ‘src’: string, (required)
    ‘frame’: array, // (optional, an array [x, y, width, height] placing the object on the grid)
    ‘effects’: array, // (required, default [], with options being ‘’),
    ‘scaleMode’: ‘string’ // (optional, default ‘fill’)
}
```

Create by using the constructor `new ByteSDK.ImageObject({‘src’: ‘’, …})`.

### Drawing
Drawings are single–color pngs with a transparent background. Users can modify the color of the drawing to fulfill their desired design.

The `DrawingObject` constructor takes a `data` object of the following format:
```
{
    ‘src’: string, (required)
    ‘frame’: array, // (optional, an array [x, y, width, height] placing the object on the grid), default: [54, 57, 216, 228]
    ‘color’: array, // // (optional, an array [r, g, b, alpha], default [1, 1, 1, 1])
    ‘effects’: array, // (required, default [], with options being ‘’),
    ‘scaleMode’: ‘string’ // (optional, default ‘fill’)
}
```

Create by using the constructor `new ByteSDK.DrawingObject({‘src’: ‘’, …})`.

### Scale Mode: Fill vs. Fit
Fill and Fit both resize an image proportionally, maintaining the original aspect ratio. However, there are some subtle differences between the two.

#### Fit
Fit sizes your image until the whole image fits within the specified frame. If the aspect ratio of the image does not match the aspect ratio of the frame, there will be empty space left around the image on two of the sides.

#### Fill
Fill sizes your image (maintaining aspect ratio) to completely fill the specified frame. If the aspect ratio of the image does not match the aspect ratio of the frame, the image will be clipped to fit the frame.

## Error Handling
If you encounter an error at any point, simply return a `400` or a `500` to the client. The client will then inform the user that an error occurred and will prompt them to try again.

## Testing
At the very least, you should use `curl` to test your computer locally before shipping. For example:
* `curl -X GET -H “Accept:application/json” http://localhost:3000/kanye`
* `curl -X POST -H “Accept:application/json” -H “Content-Type:application/json” http://localhost:3000/gifs -d ‘{“data”: {“query”: “cat”}}’`

Broken computers will be removed from the app automatically on a regular basis.

## Shipping a Computer
We currently only support self–hosting for custom computers. Since computers are simple web–apps (and since you’re using this library, it’s probably a node.js app), there are countless options for hosting your computer. These include:
* [Azure](http://azure.microsoft.com/en-us/develop/nodejs/)
* [Heroku](https://devcenter.heroku.com/articles/nodejs-support)
* [Digital Ocean](https://www.digitalocean.com)
* [node.js cloud](http://nodejs-cloud.com/en)
* [GigaPros](https://www.gigapros.com/portal/nodejs-hosting/)

However, we do have a mechanism for hosting basic computers (those that return a simple set of images without any logic). Head over to [developers.byte.co](https://developers.byte.co) to get started.

## Registering a Computer
Once you have finished developing your computer, you need to register it for it to show up in the Byte app. To get started, head to [developers.byte.co](https://developers.byte.co) and sign in with your Byte account.

Once registered, your computer will immediately be searchable within the app. You should check and see if it works as intended.

### Approval Process
There is no formal approval process. However, we automatically run a check to make sure your endpoint is live and functional when you register the computer.

Byte reserves the right to disable any computers that do not work properly, as well as any computers that serve illegal/infringing content.