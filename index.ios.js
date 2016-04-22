// 知乎专栏app ios 主入口

// 全局注册 storage
import './script/src/store/storage.js';

// 爬虫模拟知乎登陆
import './script/src/server/initZhihu.js';

import React from 'react-native';


import App from './script/src/app.js';

var {
    AppRegistry,
    View,
    StatusBar,
    StyleSheet
} = React;

StatusBar.setBarStyle('default');

var zhihuzhuanlan = React.createClass({
    render() {
        return (
           <View style={styles.container}>
               <App></App>
           </View>
        )
    }
})

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

AppRegistry.registerComponent('zhihuzhuanlan', () => zhihuzhuanlan);
