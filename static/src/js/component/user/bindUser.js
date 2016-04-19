// 绑定用户页面

var React = require('react-native');
var request = require('superagent');


var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');

var {
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	StyleSheet,
	Image
} = React;

var logo = require('../../../img/logo.png');

var BindUser = React.createClass({
	getInitialState: function() {
	    return {
	    	width: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width),
	    	height: PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height),
	    	bgImage: null,
	    	copyright: null
	    }
	},
	componentWillMount: function(){
		var _this = this;
		request
			.get('http://news-at.zhihu.com/api/4/start-image/'+ _this.state.width +'*'+ _this.state.height)
			.end(function(err, data){
				_this.setState({'bgImage': data.body.img});
				_this.setState({'copyright': data.body.text});
			})
	},
	render: function(){
		return (
			<View style={styles.container}>
				<Image source={{uri: this.state.bgImage}} style={styles.bgIMg}>
					<Image source={logo} style={styles.logo}></Image>
					<Text style={styles.h2}>随心写作，自由表达</Text>
					<TextInput style={styles.input} placeholder="请输入您的ID" autoCapitalize="none" autoCorrect={false} clearButtonMode="while-editing"></TextInput>
					<Text style={styles.button}>绑定用户</Text>
					<View>
						<Text>说明：</Text>
						<Text>1、用户ID为您的主页地址最后几位。比如我的主页地址为：<Text>https://www.zhihu.com/people/luo-ye-42-22</Text>，那么我的ID就是<Text>luo-ye-42-22</Text></Text>
						<Text>2、绑定ID只是为了获取您的一些基本信息，比如昵称，关注人，专栏信息等，这些信息都是公开的，并且本应用一定会安全的使用这些信息。</Text>
					</View>
				</Image>
			</View>
		)
	}
})

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	bgIMg: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		resizeMode: Image.resizeMode.cover
	},
	copyright: {

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
		color: '#fff',
		letterSpacing: 12,
		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,0.3)',
		padding: 8,
		borderRadius: 3,
		fontWeight: 'bold',
		textAlign: 'center'
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
		height: 38,
		padding: 10
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