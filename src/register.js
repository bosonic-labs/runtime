if (!window.Bosonic) {
    window.Bosonic = {};
}

function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelize(str) {
    var camelized = str.replace(/(\-|_|\.|\s)+(.)?/g, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
    }).replace(/^([A-Z])/, function(match, separator, chr) {
        return match.toLowerCase();
    });
    return ucfirst(camelized);
}

Bosonic.register = function(options) {
    var script = document._currentScript;
    var element = script && script.parentNode ? script.parentNode : null;
    if (!element || element.tagName.toUpperCase() !== 'ELEMENT') {
        throw 'Surrounding <element> tag could not be found.'
    }
    var name = element.getAttribute('name');
    if (!name) {
        throw 'Element name could not be inferred.';
    }

    var template = script && script.parentNode ? script.parentNode.querySelector('template') : null;

    var prototype = {};

    if (template) {
        var created = options.createdCallback;
        if (created) delete options.createdCallback;
        prototype.createdCallback = {
            enumerable: true,
            writable: true,
            value: function() {
                this.createShadowRoot();
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                return created ? created.apply(this, arguments) : null;
            }
        };
    }

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            prototype[key] = Object.getOwnPropertyDescriptor(options, key);
        }
    }

    window[camelize(name)] = document.registerElement(name, {
        prototype: Object.create(HTMLElement.prototype, prototype)
    });
}