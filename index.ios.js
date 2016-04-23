// 知乎专栏app ios 主入口
import React from 'react-native';

import App from './app/app.js';

import { Provider } from 'react-redux';

import store from './app/store/createStore.js';

var {
    AppRegistry,
    StatusBar
} = React;

StatusBar.setBarStyle('default');

var zhihuzhuanlan = React.createClass({
    render() {
        return ( 
            <Provider style = {{flex: 1}} store={store}>
                <App/>
            </Provider>
        )
    }
})

AppRegistry.registerComponent('zhihuzhuanlan', () => zhihuzhuanlan);
