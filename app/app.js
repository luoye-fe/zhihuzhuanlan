// app main

// 全局注册 storage
import './store/storage.js';

// 爬虫模拟知乎登陆
import './server/initZhihu.js';

import React from 'react-native';

// util
import Util from './util/index.js';

// 主组件
import Post from './component/main/post.js';
import Column from './component/main/column.js';
import Mine from './component/main/mine.js';

// 绑定用户组件
import BindUser from './component/user/bindUser.js';

// 全局storge
var Storage = global.storage;

var {
	Component,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TabBarIOS,
	NavigatorIOS,
	StatusBar,
	ScrollView,
	TouchableHighlight,
	ActivityIndicatorIOS,
	AlertIOS,
} = React;


var App = React.createClass({
	statics: {
	    title: '文章',
	    description: '123'
	},
	getInitialState() {
	    return {
	        selectedTab: 'Post',
	        showBindUser: false
	    }
	},
	componentWillMount() {
	    Storage.load({
	        key: 'userInfo'
	    }).then((userInfo) => {
	        this.setState({
	            showBindUser: false
	        })
	        return;
	    }).catch((err) => {})
	    this.setState({
	        showBindUser: true
	    })
	},
	componentDidMount() {

	},
	_addNavigator(component, title) {
		return (
			<NavigatorIOS style={{flex:1}} initialRoute={{
				component: component,
				title: title
			}}/>
		)
	},
	_selectTab(tab) {
		this.setState({
			selectedTab: tab
		})
	},
	render() {
	    if(this.state.showBindUser){
	        return (
	            <BindUser loading={this.props.loading}></BindUser>
	        )
	    }
	    return (
	    	<View style={{flex: 1}}>
		        <TabBarIOS>
		        	<TabBarIOS.Item title='文章' selected={this.state.selectedTab === 'Post'} onPress={this._selectTab.bind(this, 'Post')}>
		        		{this._addNavigator(Post, '文章')}
		        	</TabBarIOS.Item>
		        	<TabBarIOS.Item title='专栏' selected={this.state.selectedTab === 'Column'} onPress={this._selectTab.bind(this, 'Column')}>
		        		{this._addNavigator(Column, '专栏')}
		        	</TabBarIOS.Item>
		        	<TabBarIOS.Item title='我' selected={this.state.selectedTab === 'Mine'} onPress={this._selectTab.bind(this, 'Mine')}>
		        		{this._addNavigator(Mine, '我')}
		        	</TabBarIOS.Item>
		        </TabBarIOS>
		    </View>
	    )
	}
})

var styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default App;




