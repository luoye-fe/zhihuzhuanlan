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

import screen from './screen.js';

utils.mixin(utils, screen);


export default utils;
