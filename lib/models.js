/* jshint -W078 */

'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var assert = require('assert');

var extract = function extract(target) {
    var obj = {};
    if (arguments.length > 1) {
        Array.prototype.slice.call(arguments, 1).forEach(function (arg) {
            obj[arg] = target[arg];
        });
    }
    return obj;
};

var ComputerConfig = (function () {
    function ComputerConfig(name, placeholder) {
        _classCallCheck(this, ComputerConfig);

        assert(name, placeholder);
        this.data = {
            'args': [{
                'name': name,
                'type': 'String',
                'placeholder': placeholder
            }]
        };
    }

    _createClass(ComputerConfig, [{
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'data');
        }
    }]);

    return ComputerConfig;
})();

var ComputerResponse = (function () {
    function ComputerResponse() {
        _classCallCheck(this, ComputerResponse);

        this.data = {
            'objects': []
        };
    }

    _createClass(ComputerResponse, [{
        key: 'addObject',
        value: function addObject(object) {
            assert(object);
            this.data.objects.push(object);
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'data');
        }
    }]);

    return ComputerResponse;
})();

var TextObject = (function () {
    function TextObject(data) {
        _classCallCheck(this, TextObject);

        assert(data && data.text);
        this.type = 'Text';
        this.text = data.text;
        if (data.frame) this.frame = data.frame;
        if (data.style) this.style = data.style;
        if (data.color) this.color = data.color;
        this.effects = data.effects || [];
        if (data.noPadding) this.noPadding = data.noPadding;
        if (data.singleLine) this.singleLine = data.singleLine;
        if (data.textAlignment) this.textAlignment = data.textAlignment;
    }

    _createClass(TextObject, [{
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'type', 'text', 'frame', 'style', 'color', 'effects', 'singleLine', 'noPadding', 'textAlignment');
        }
    }]);

    return TextObject;
})();

var LinkObject = (function () {
    function LinkObject(data) {
        _classCallCheck(this, LinkObject);

        assert(data && data.url && data.title);
        this.type = 'Link';
        this.url = data.url;
        this.title = data.title;
        if (data.description) this.description = data.description;
        if (data.frame) this.frame = data.frame;
        if (data.style) this.style = data.style;
        if (data.color) this.color = data.color;
        this.effects = data.effects || [];
        if (data.noPadding) this.noPadding = data.noPadding;
        if (data.singleLine) this.singleLine = data.singleLine;
    }

    _createClass(LinkObject, [{
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'type', 'url', 'title', 'description', 'frame', 'style', 'color', 'effects', 'noPadding', 'singleLine');
        }
    }]);

    return LinkObject;
})();

var GifObject = (function () {
    function GifObject(data) {
        _classCallCheck(this, GifObject);

        assert(data && data.src);
        this.type = 'Gif';
        this.src = data.src;
        if (data.frame) this.frame = data.frame;
        this.effects = data.effects || [];
        this.scaleMode = data.scaleMode || 'fit';
    }

    _createClass(GifObject, [{
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'type', 'src', 'frame', 'effects', 'scaleMode');
        }
    }]);

    return GifObject;
})();

var ImageObject = (function () {
    function ImageObject(data) {
        _classCallCheck(this, ImageObject);

        assert(data && data.src);
        this.type = 'Image';
        this.src = data.src;
        if (data.frame) this.frame = data.frame;
        this.effects = data.effects || [];
        this.scaleMode = data.scaleMode || 'fill';
    }

    _createClass(ImageObject, [{
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'type', 'src', 'frame', 'effects', 'scaleMode');
        }
    }]);

    return ImageObject;
})();

var DrawingObject = (function () {
    function DrawingObject(data) {
        _classCallCheck(this, DrawingObject);

        assert(data && data.src);
        this.type = 'Drawing';
        this.src = data.src;
        if (data.frame) this.frame = data.frame;
        if (data.color) this.color = data.color;
        this.effects = data.effects || [];
        this.scaleMode = data.scaleMode || 'fill';
    }

    _createClass(DrawingObject, [{
        key: 'toJSON',
        value: function toJSON() {
            return extract(this, 'type', 'src', 'frame', 'color', 'effects', 'scaleMode');
        }
    }]);

    return DrawingObject;
})();

module.exports = {
    ComputerConfig: ComputerConfig,
    ComputerResponse: ComputerResponse,
    TextObject: TextObject,
    LinkObject: LinkObject,
    GifObject: GifObject,
    ImageObject: ImageObject,
    DrawingObject: DrawingObject
};
