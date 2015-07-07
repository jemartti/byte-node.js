/* jshint -W078 */

var assert = require('assert');

var extract = function (target) {
    var obj = {};
    if (arguments.length > 1) {
        Array.prototype.slice.call(arguments, 1).forEach(function (arg) {
            obj[arg] = target[arg];
        });
    }
    return obj;
};

class ComputerConfig {
    constructor(name, placeholder) {
        assert(name, placeholder);
        this.data = {
            'args': [{
                'name': name,
                'type': 'String',
                'placeholder': placeholder
            }]
        };
    }

    toJSON() {
        return extract(this,
            'data'
        );
    }
}

class ComputerResponse {
    constructor() {
        this.data = {
            'objects': []
        };
    }

    addObject(object) {
        assert(object);
        this.data.objects.push(object);
    }

    toJSON() {
        return extract(this,
            'data'
        );
    }
}

class TextObject {
    constructor(data) {
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

    toJSON() {
        return extract(this,
            'type',
            'text',
            'frame',
            'style',
            'color',
            'effects',
            'singleLine',
            'noPadding',
            'textAlignment'
        );
    }
}

class LinkObject {
    constructor(data) {
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

    toJSON() {
        return extract(this,
            'type',
            'url',
            'title',
            'description',
            'frame',
            'style',
            'color',
            'effects',
            'noPadding',
            'singleLine'
        );
    }
}

class GifObject {
    constructor(data) {
        assert(data && data.src);
        this.type = 'Gif';
        this.src = data.src;
        if (data.frame) this.frame = data.frame;
        this.effects = data.effects || [];
        this.scaleMode = data.scaleMode || 'fit';
    }

    toJSON() {
        return extract(this,
            'type',
            'src',
            'frame',
            'effects',
            'scaleMode'
        );
    }
}

class ImageObject {
    constructor(data) {
        assert(data && data.src);
        this.type = 'Image';
        this.src = data.src;
        if (data.frame) this.frame = data.frame;
        this.effects = data.effects || [];
        this.scaleMode = data.scaleMode || 'fill';
    }

    toJSON() {
        return extract(this,
            'type',
            'src',
            'frame',
            'effects',
            'scaleMode'
        );
    }
}

class DrawingObject {
    constructor(data) {
        assert(data && data.src);
        this.type = 'Drawing';
        this.src = data.src;
        if (data.frame) this.frame = data.frame;
        if (data.color) this.color = data.color;
        this.effects = data.effects || [];
        this.scaleMode = data.scaleMode || 'fill';
    }

    toJSON() {
        return extract(this,
            'type',
            'src',
            'frame',
            'color',
            'effects',
            'scaleMode'
        );
    }
}

module.exports = {
    ComputerConfig: ComputerConfig,
    ComputerResponse: ComputerResponse,
    TextObject: TextObject,
    LinkObject: LinkObject,
    GifObject: GifObject,
    ImageObject: ImageObject,
    DrawingObject: DrawingObject
};
