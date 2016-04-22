// 绑定用户页面
import React from 'react-native';
import request from 'superagent';

var {
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	StyleSheet,
	Image
} = React;

import Loading from '../common/loading.js';

var logo = require('image!logo');

var BindUser = React.createClass({
	getInitialState: function() {
	    return {
	    	userID: null,
	    	loadingConfig: {
	    		show: false,
	    		msg: '初始化中，请稍后'
	    	}
	    }
	},
	componentWillMount: function(){

	},
	_bindUser: function(){
		if(this.state.userID !== '' && this.state.userID !== null){
			this.setState({
				loadingConfig: {
					show: true,
					msg: '初始化中，请稍后'
				}
			})
			console.log(this.state.loadingConfig);
		}else{
			console.log('youcuo');
		}
	},
	render: function(){
		return (
			<View style={styles.container}>
				<Image source={logo} style={styles.logo}></Image>
				<Text style={styles.h2}>随心写作，自由表达</Text>
				<TextInput style={styles.input} placeholder="请输入您的ID" autoCapitalize="none" autoCorrect={false} clearButtonMode="while-editing" onChangeText={(value) => this.setState({userID: value})}></TextInput>
				<Text style={styles.button} onPress={this._bindUser}>绑定用户</Text>
				<View>
					<Text>说明：</Text>
					<Text>1、用户ID为您的主页地址最后几位。比如我的主页地址为：<Text>https://www.zhihu.com/people/luo-ye-42-22</Text>，那么我的ID就是<Text>luo-ye-42-22</Text></Text>
					<Text>2、绑定ID只是为了获取您的一些基本信息，比如昵称，关注人，专栏信息等，这些信息都是公开的，并且本应用一定会安全的使用这些信息。</Text>
				</View>
				<Loading loadingConfig={this.state.loadingConfig}></Loading>
			</View>
		)
	}
})

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	logo: {
		width: 100,
		height: 140,
		alignSelf: 'center',
		marginTop: 44,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	h2: {
		fontSize: 18,
		fontWeight: '300',
		lineHeight: 18,
		letterSpacing: 12,
		alignSelf: 'center',
		marginTop: 20
	},
	input: {
		width: 300,
		borderColor: '#000',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 8,
		alignSelf: 'center',
		marginTop: 15,
		lineHeight: 24,
		fontSize: 14,
		padding: 5,
		height: 38
	},
	button: {
		width: 120,
		height: 34,
		alignSelf: 'center',
		fontSize: 12,
		color: '#fff',
		backgroundColor: '#7fe8ff'
	}
})

module.exports = BindUser;