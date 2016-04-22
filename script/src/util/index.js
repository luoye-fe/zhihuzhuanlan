// 工具库
var utils = {};

utils.mixin = (source, target) => {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
}


import * as screen from './screen.js';

utils.mixin(screen, utils);


module.exports = utils;
