// 绑定用户页面
import React from 'react-native';
import request from 'superagent';

// import { Login } from  '../../server/initZhihu.js'; // 废弃，登陆要验证码了，不能登陆之后查询全部信息了
var Storage = global.storage;

var {
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	StyleSheet,
	Image,
	TouchableHighlight,
	ScrollView
} = React;

import Loading from '../common/loading.js';

import store from '../../store/createStore.js';
import actions from '../../store/action/index.js';
import { connect } from 'react-redux';

import utils from '../../util/index.js';

var logo = require('image!logo');

var BindUser = React.createClass({
	getInitialState()  {
	    return {
	    	userID: null
	    }
	},
	componentWillMount() {

	},
	_bindUser() {
		if(this.state.userID !== '' && this.state.userID !== null){
			store.dispatch(actions.showLoading('初始化，请稍后'))
			utils.fetch({
				type: 'GET',
				url: 'https://www.zhihu.com/people/'+ this.state.userID,
				getHTML: true
			}, (err, $) => {
			    if(err){
			        console.log('没有这个用户哟');
			        store.dispatch(actions.hideLoading('初始化，请稍后'))
			        return;
			    }else{
			    	// 写入用户信息，包括 userID,hashID,userAvatorHash,userName,_xsrf
			    	var currentPeople = JSON.parse($('[data-name="current_people"]').text());
			    	var userInfo = {};
			    	userInfo.userName = currentPeople[0];
			    	userInfo.userID = currentPeople[1];
			    	userInfo.userAvatorHash = currentPeople[2].match(/^http[\s\S]+\/([\s\S]+?)\_s/)[1];
			    	userInfo.hashID = currentPeople[3];
			    	userInfo._xsrf = $('[name="_xsrf"]').eq(0).val();
			    	console.log(userInfo);
			    	utils.getAllFollowedColumns(userInfo.hashID, userInfo._xsrf, (res) => {
			    		console.log(res);
			    	});
			    	// Storage.
			    	// 获取用户关注的所有专栏
			    	// utils.getAllFollowedColumns(() => {
			    	// 	console.log(1);
			    	// })

			    	// console.log($);
			    }
			})
		}else{
			console.log('youcuo');
		}
	},
	render() {
		return (
			<View style={[styles.container], {
				width: store.getState().bindUser.show ? utils.screen.width : 0,
				height: store.getState().bindUser.show ? utils.screen.height : 0,
				opacity: store.getState().bindUser.show ? 1 : 0
			}}>
				<Image source={logo} style={styles.logo}></Image>
				<Text style={styles.h2}>随心写作，自由表达</Text>
				<TextInput style={styles.input} placeholder='请输入您的ID' autoCapitalize='none' autoCorrect={false} clearButtonMode='while-editing' onChangeText={(value) => this.setState({userID: value})}></TextInput>
				<TouchableHighlight underlayColor='#77d9ef' style={styles.button} onPress={this._bindUser}>
					<Text style={styles.btnText}>绑定用户</Text>
				</TouchableHighlight>
				<View style={styles.desc}>
					<Text style={styles.descText}>说明：</Text>
					<Text style={styles.descText}>1、用户ID为您的主页地址最后几位。比如我的主页地址为：<Text style={styles.link}> https://www.zhihu.com/people/luo-ye-42-22 </Text>，那么我的ID就是<Text style={styles.link}> luo-ye-42-22 </Text></Text>
					<Text style={styles.descText}>2、绑定ID只是为了获取您的一些基本信息，比如昵称，关注人，专栏信息等，这些信息都是公开的，并且本应用一定会安全的使用这些信息。</Text>
				</View>
				<Loading></Loading>
			</View>
		)
	}
})


var mapStateToProps = function(state) {
  	return { 
  		bindUser: state.bindUser
  	};
}

var styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
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
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: '#7fe8ff',
		borderRadius: 4,
		marginTop: 15,
		height: 34
	},
	btnText: {
		fontSize: 12,
		alignSelf: 'center',
		color: '#fff'
	},
	desc: {
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 10,
	},
	descText: {
		fontSize: 12,
		color: '#aaa',
		lineHeight: 18,
		marginTop: 5
	},
	link: {
		color: '#ff5151'
	}
})

export default connect(mapStateToProps)(BindUser);
