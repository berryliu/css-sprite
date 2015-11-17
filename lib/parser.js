/*
 * @desc css 文件处理
 * @modified by fis-spriter-csssprites/cssParser.js
 */

'use strict';

var Rules = require('./rules.js');
var fs = require('fs');
var path = require('path');

module.exports = function (data) {
    var content = fs.readFileSync(data.path, 'utf-8'),
        _arr_css = [],
        _content,
        reg = /(?:\/\*[\s\S]*?(?:\*\/|$))|([^\{\}\/]*)\{([^\{\}]*)\}/gi;

    /**
     * @desc 获取图片的真实地址
     * @param imagePath
     * @returns {string|*}
     */
    function getImageRealPath(imagePath) {
        if (imagePath) {
            imagePath = path.join(data.path, '..', imagePath);
            if(fs.existsSync(imagePath)){
                return imagePath;
            }
        }
    }

    _content = content.replace(reg, function (m, selector, css) {
        if (css) {
            var rules = Rules.wrap(selector.trim(), css.trim()),
                image = rules.getImageUrl(),
                imageRealPath = getImageRealPath(image);

            if (rules.isSprites() && imageRealPath) {
                rules.path = imageRealPath;
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
