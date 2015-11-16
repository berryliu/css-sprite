/**
 * @author berryliu
 * @time 15/11/16
 * @desc css sprite generator for honey
 */

var parser = require('./lib/parser.js');
var image = require('./lib/image.js');
var fs = require('fs');

//声明这是一个silky插件，必需存在
exports.silkyPlugin = true;

//注册silky插件
exports.registerPlugin = function (silky, options) {

    //编译完成后的的hook
    silky.registerHook('build:willCompress', {
        async: true
    }, function (data, done) {
        if (/\.css$/i.test(data.relativePath)) {
            //parser(data);
            var content = fs.readFileSync(data.path, 'utf-8');
            var res = parser(content);
            console.log(res);

        }

        return done(null);
    });

};