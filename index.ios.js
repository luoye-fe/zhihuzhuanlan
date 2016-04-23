// 知乎专栏app ios 主入口
import React from 'react-native';

import App from './app/app.js';

var {
    AppRegistry,
    View,
    StatusBar
} = React;

StatusBar.setBarStyle('default');

var zhihuzhuanlan = React.createClass({
    render() {
        return (
           <View style={{flex: 1}}>
               <App></App>
           </View>
        )
    }
})

AppRegistry.registerComponent('zhihuzhuanlan', () => zhihuzhuanlan);
