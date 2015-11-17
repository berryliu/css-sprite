/**
 * @author berryliu
 * @time 15/11/16
 * @desc css sprite generator for honey
 */

var parser = require('./lib/parser.js');
var image = require('./lib/image.js');
var fs = require('fs');
var path = require('path');

//声明这是一个silky插件，必需存在
exports.silkyPlugin = true;

//注册silky插件
exports.registerPlugin = function (silky, options) {

    // 线上图片前缀
    var projectName = silky.config.name || path.basename(silky.options.workbench),
        imagePre = 'http://img.hunantv.com/' + projectName;

    var settings = {
        workbench: silky.options.workbench,
        imagePre: imagePre
    };

    //编译完成后的的hook
    silky.registerHook('build:willCompress', {
        async: true
    }, function (data, done) {

        // 处理 css
        if (/\.css$/i.test(data.relativePath)) {
            var res = parser(data, settings);
            if (res.map && res.map.length > 0) {
                var content = res.content,
                    css = image(data, res.map, settings);

                // 拼接内容，写文件
                content = content + css;
                fs.writeFileSync(data.path, content, 'utf-8');
            }
        }

        return done(null);
    });
};