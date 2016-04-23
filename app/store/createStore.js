// 创建store实例

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer/index.js';

var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function createInitStore(initialState) {
	var store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}