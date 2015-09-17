/* jshint -W078 */

'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var assert = require('assert');
var typeCheck = require('type-check').typeCheck;
var _s = require('underscore.string');

var ComputerConfig = function ComputerConfig(name, placeholder) {
    _classCallCheck(this, ComputerConfig);

    assert(name, placeholder);
    this.data = {
        'args': [{
            'name': name,
            'type': 'String',
            'placeholder': placeholder
        }]
    };
};

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
    }]);

    return ComputerResponse;
})();

var ComputerObject = function ComputerObject(type, data) {
    _classCallCheck(this, ComputerObject);

    assert(typeCheck('String', type));
    assert(['paragraph', 'text', 'link', 'image', 'graphic', 'gif', 'video', 'music'].indexOf(type) >= 0);
    this.type = type;

    assert(typeCheck('Object', data));

    if (data.frame) {
        assert(typeCheck('(Number, Number, Number, Number)', data.frame));
        this.frame = data.frame;
    }

    if (data.name) {
        assert(typeCheck('String', data.name));
        this.name = data.name;
    }

    if (data.transform) {
        assert(typeCheck('((Number, Number), (Number, Number), (Number, Number))', data.transform));
        this.transform = data.transform;
    }

    if (data.opacity) {
        assert(typeCheck('Number', data.opacity));
        assert(data.opacity >= 0 && data.opacity <= 1);
        this.opacity = data.opacity;
    }

    if (data.effects) {
        assert(typeCheck('[String]', data.effects));
        for (var i = 0; i < data.effects.length; ++i) {
            assert(['sin', 'cos', 'wave', 'rotate', 'soon', 'fireworks'].indexOf(data.effects[i]) >= 0);
        }
        this.effects = data.effects;
    } else {
        this.effects = [];
    }

    if (data.originalSrc) {
        assert(typeCheck('String', data.originalSrc));
        this.originalSrc = data.originalSrc;
    }
};

var ParagraphObject = (function (_ComputerObject) {
    _inherits(ParagraphObject, _ComputerObject);

    function ParagraphObject(data) {
        _classCallCheck(this, ParagraphObject);

        assert(typeCheck('{text: String, ...}', data));

        _get(Object.getPrototypeOf(ParagraphObject.prototype), 'constructor', this).call(this, 'paragraph', data);

        assert(_s.trim(data.text).length > 0);
        this.text = data.text;

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }

        if (data.style) {
            assert(typeCheck('String', data.style));
            assert(['sans', 'serif'].indexOf(data.style) >= 0);
            this.style = data.style;
        }

        if (data.size) {
            assert(typeCheck('Number', data.size));
            assert(data.size > 0);
            this.size = data.size;
        }

        if (data.alignment) {
            assert(typeCheck('String', data.alignment));
            assert(['left', 'center', 'right'].indexOf(data.alignment) >= 0);
            this.alignment = data.alignment;
        }

        if (data.attributes) {
            assert(typeCheck('[Object]', data.attributes));
            for (var j = 0; j < data.attributes.length; ++j) {
                assert(typeCheck('{type: String, range: (Number, Number)}', data.attributes[j]));
                assert(['bold', 'italic', 'bold-italic'].indexOf(data.attributes[j].type) >= 0);
            }
            this.attributes = data.attributes;
        }
    }

    return ParagraphObject;
})(ComputerObject);

var TextObject = (function (_ComputerObject2) {
    _inherits(TextObject, _ComputerObject2);

    function TextObject(data) {
        _classCallCheck(this, TextObject);

        assert(typeCheck('{text: String, ...}', data));

        _get(Object.getPrototypeOf(TextObject.prototype), 'constructor', this).call(this, 'text', data);

        assert(_s.trim(data.text).length > 0);
        this.text = data.text;

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }

        if (data.style) {
            assert(typeCheck('String', data.style));
            assert(['sans', 'mono', 'punchout', 'eightbit', 'cursive', 'poster', 'tape', 'book', 'serif'].indexOf(data.style) >= 0);
            this.style = data.style;
        }

        if (data['word-wrap']) {
            assert(typeCheck('String', data['word-wrap']));
            assert(['auto', 'manual'].indexOf(data['word-wrap']) >= 0);
            this['word-wrap'] = data['word-wrap'];
        }

        if (data.padding) {
            assert(typeCheck('Number', data.padding));
            assert(data.padding >= 0);
            this.padding = data.padding;
        }
    }

    return TextObject;
})(ComputerObject);

var LinkObject = (function (_ComputerObject3) {
    _inherits(LinkObject, _ComputerObject3);

    function LinkObject(data) {
        _classCallCheck(this, LinkObject);

        assert(typeCheck('{url: String, ...}', data));

        _get(Object.getPrototypeOf(LinkObject.prototype), 'constructor', this).call(this, 'link', data);

        this.url = data.url;

        if (data.title) {
            assert(typeCheck('String', data.title));
            this.title = data.title;
        }

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }

        if (data.style) {
            assert(typeCheck('String', data.style));
            assert(['sans', 'serif'].indexOf(data.style) >= 0);
            this.style = data.style;
        }

        if (data.description) {
            assert(typeCheck('String', data.description));
            this.description = data.description;
        }
    }

    return LinkObject;
})(ComputerObject);

var ImageObject = (function (_ComputerObject4) {
    _inherits(ImageObject, _ComputerObject4);

    function ImageObject(data) {
        _classCallCheck(this, ImageObject);

        assert(typeCheck('{src: String, ...}', data));

        _get(Object.getPrototypeOf(ImageObject.prototype), 'constructor', this).call(this, 'image', data);

        this.src = data.src;

        if (data.scaleMode) {
            assert(typeCheck('String', data.scaleMode));
            assert(['fit', 'fill'].indexOf(data.scaleMode) >= 0);
            this.scaleMode = data.scaleMode;
        } else {
            this.scaleMode = 'fill';
        }
    }

    return ImageObject;
})(ComputerObject);

var GraphicObject = (function (_ComputerObject5) {
    _inherits(GraphicObject, _ComputerObject5);

    function GraphicObject(data) {
        _classCallCheck(this, GraphicObject);

        assert(typeCheck('{src: String, ...}', data));

        _get(Object.getPrototypeOf(GraphicObject.prototype), 'constructor', this).call(this, 'graphic', data);

        this.src = data.src;

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }
    }

    return GraphicObject;
})(ComputerObject);

var GifObject = (function (_ComputerObject6) {
    _inherits(GifObject, _ComputerObject6);

    function GifObject(data) {
        _classCallCheck(this, GifObject);

        assert(typeCheck('{src: String, ...}', data));

        _get(Object.getPrototypeOf(GifObject.prototype), 'constructor', this).call(this, 'gif', data);

        this.src = data.src;

        if (data.scaleMode) {
            assert(typeCheck('String', data.scaleMode));
            assert(['fit', 'fill'].indexOf(data.scaleMode) >= 0);
            this.scaleMode = data.scaleMode;
        } else {
            this.scaleMode = 'fit';
        }
    }

    return GifObject;
})(ComputerObject);

var VideoObject = (function (_ComputerObject7) {
    _inherits(VideoObject, _ComputerObject7);

    function VideoObject(data) {
        _classCallCheck(this, VideoObject);

        assert(typeCheck('{src: String, ...}', data));

        _get(Object.getPrototypeOf(VideoObject.prototype), 'constructor', this).call(this, 'video', data);

        this.src = data.src;

        if (data.muted) {
            assert(typeCheck('Boolean', data.muted));
            this.muted = data.muted;
        }
    }

    return VideoObject;
})(ComputerObject);

var MusicObject = (function (_ComputerObject8) {
    _inherits(MusicObject, _ComputerObject8);

    function MusicObject(data) {
        _classCallCheck(this, MusicObject);

        assert(typeCheck('{bpm: Number, length: Number, instructions: Array}', data));

        _get(Object.getPrototypeOf(MusicObject.prototype), 'constructor', this).call(this, 'music', data);

        assert(data.bpm > 0);
        this.bpm = data.bpm;

        assert(data.length >= 2 && data.length <= 16 && data.length % 2 === 0);
        this.length = data.length;

        // Beats
        assert(data.instructions.length === data.length * 4);
        for (var i = 0; i < data.instructions.length; ++i) {
            var beat = data.instructions[i];
            assert(typeCheck('Array', beat));

            // Hits
            var re = new RegExp('^[A-G]{1}#?/{1}(-1|[0-8]){1}$');
            for (var j = 0; j < data.instructions[i].length; ++j) {
                var hit = beat[j];
                assert(typeCheck('{time: Number, type: Number, bank: String, note: String, velo: Number, duration: Number}', hit));

                assert(hit.time >= 0);

                assert(hit.type === 0 || hit.type === 1);

                if (hit.type === 0) {
                    assert(['bleep', 'meow', 'bass', 'ping', 'string', 'reso', 'arp', 'bark', 'mono1', 'mono2', 'mono3', 'funk', 'sax', 'bell', 'roboto', 'do'].indexOf(hit.bank) >= 0);

                    assert(re.test(hit.note));
                } else if (hit.type === 1) {
                    assert(hit.bank === 'drums');

                    assert(['Kick', 'Snare', 'Clap', 'Hat', 'Thump', 'Glitch', 'Tambourine', 'Whistle', 'Block', 'Stick', 'Shaker', 'Crash', 'Tom', 'Conga', 'Cowbell', 'Yeah'].indexOf(hit.note) >= 0);
                }

                assert(hit.velo >= 0 && hit.velo <= 127);

                assert(hit.duration > 0);
            }
        }
        this.instructions = data.instructions;
    }

    return MusicObject;
})(ComputerObject);

module.exports = {
    ComputerConfig: ComputerConfig,
    ComputerResponse: ComputerResponse,
    ParagraphObject: ParagraphObject,
    TextObject: TextObject,
    LinkObject: LinkObject,
    ImageObject: ImageObject,
    GraphicObject: GraphicObject,
    GifObject: GifObject,
    VideoObject: VideoObject,
    MusicObject: MusicObject
};
