/*
 * @desc modified by fis-spriter-csssprites/cssParser.js
 */

'use strict';

var Rules = require('./rules.js');
var fs = require('fs');

module.exports = function (content, images) {
    var _arr_css = [],
        _content,
        reg = /(?:\/\*[\s\S]*?(?:\*\/|$))|([^\{\}\/]*)\{([^\{\}]*)\}/gi;

    _content = content.replace(reg, function(m, selector, css) {
        if (css) {
            var rules = Rules.wrap(selector.trim(), css.trim());
            //if (rules.isSprites() && images.hasOwnProperty(rules.getImageUrl())) {
            if (rules.isSprites()) {
                _arr_css.push(rules);
                css = rules.getCss();
            }
            return selector + '{' + css + '}';
        }
        return m;
    });

    return {
        content: _content,
        map: _arr_css
    };
};
