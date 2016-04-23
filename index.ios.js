// 知乎专栏app ios 主入口
import React from 'react-native';

import App from './app/app.js';

import { Provider } from 'react-redux';

import initialState from './app/store/store.js';
import createInitStore from './app/store/createStore.js'

var store = createInitStore(initialState);

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
