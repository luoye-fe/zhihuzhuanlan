// 持久化存储 key value

import Storage from 'react-native-storage';

var storage = new Storage({
    size: 1000,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
})

global.storage = storage;
