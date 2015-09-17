var ByteSDK = require('../index');

describe('Testing Computer Model: ', function () {
    it('Does a basic ComputerResponse creation', function* (done) {
        var computerResponse = new ByteSDK.ComputerResponse();
        computerResponse.data.should.have.property('objects');

        done();
    });

    it('Does a basic ComputerConfig creation', function* (done) {
        var testName = 'Name';
        var testPlaceholder = 'Placeholder';
        var computerConfig = new ByteSDK.ComputerConfig(testName, testPlaceholder);

        computerConfig.data.should.have.property('args').with.lengthOf(1);
        computerConfig.data.args[0].should.have.property('name').equal(testName);
        computerConfig.data.args[0].should.have.property('type').equal('String');
        computerConfig.data.args[0].should.have.property('placeholder').equal(testPlaceholder);

        done();
    });

    it('Does a basic ParagraphObject creation', function* (done) {
        new ByteSDK.ParagraphObject({
            'text': '   2 ',
            'color': [1, 1, 1, 1],
            'style': 'sans',
            'size': 17,
            'alignment': 'left',
            'attributes': [{
                'type': 'bold',
                'range': [0, 5]
            }],
            'frame': [1, 2, 3, 4],
            'name': 'cat',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });

    it('Does a basic TextObject creation', function* (done) {
        new ByteSDK.TextObject({
            'text': '   2 ',
            'color': [1, 1, 1, 1],
            'style': 'serif',
            'word-wrap': 'auto',
            'padding': 14,
            'frame': [1, 2, 3, 4],
            'name': 'cat',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });

    it('Does a basic LinkObject creation', function* (done) {
        new ByteSDK.LinkObject({
            'url': 'http://byte.co',
            'title': 'Byte',
            'color': [1, 1, 1, 1],
            'style': 'serif',
            'description': 'Byte',
            'frame': [1, 2, 3, 4],
            'name': 'cat',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });

    it('Does a basic ImageObject creation', function* (done) {
        new ByteSDK.ImageObject({
            'src': 'http://i.imgur.com/dv1QgwX.jpg',
            'originalSrc': 'http://i.imgur.com/dv1QgwX.jpg',
            'scaleMode': 'fill',
            'frame': [1, 2, 3, 4],
            'name': 'dog1',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });

    it('Does a basic GraphicObject creation', function* (done) {
        new ByteSDK.GraphicObject({
            'src': 'http://i.imgur.com/dv1QgwX.jpg',
            'frame': [1, 2, 3, 4],
            'name': 'dog1',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });

    it('Does a basic GifObject creation', function* (done) {
        new ByteSDK.GifObject({
            'src': 'http://i.giphy.com/12Q72hQ4BT7mp2.gif',
            'scaleMode': 'fit',
            'frame': [1, 2, 3, 4],
            'name': 'eyeroll',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });

    it('Does a basic VideoObject creation', function* (done) {
        new ByteSDK.VideoObject({
            'src': 'http://i.imgur.com/aFD2d7b.mp4',
            'mute': false,
            'frame': [1, 2, 3, 4],
            'name': 'dog2',
            'transform': [
                [1, 2],
                [1, 2],
                [1, 1]
            ],
            'opacity': 0.5,
            'effects': ['sin']
        });
        done();
    });
});
