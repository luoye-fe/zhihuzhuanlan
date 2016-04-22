/* 
 * 全局加载中提示组件
 * 所需props:
 	{
 		show: true,
 		msg: '初始化中，请稍后'
 	}
 */


var React = require('react-native');

var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');

var {
	View,
	Text,
	Image,
	StyleSheet
} = React;

var Loading = React.createClass({
	getInitialState: function(){
		return {
			container: {
				width: this.props.loadingConfig.show ? Dimensions.get('window').width : 0,
				height: this.props.loadingConfig.show ? Dimensions.get('window').height : 0,
				opacity: this.props.loadingConfig.show ? 1 : 0
			}
		}
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){

	},
	shouldComponentUpdate: function(nextProps, nextState){
		console.log(this.props.loadingConfig.show);
		return true;
	},
	render: function(){
		return (
			<View style={[styles.container, this.state.container]}>
				<View style={styles.main}>
					<Text style={styles.msg}>{this.props.loadingConfig.msg}</Text>
				</View>
			</View>
		)
	}
})


var styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	main: {
		width: 140,
		height: 140,
		backgroundColor: '#4a4a4a',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8
	},
	msg: {
		color: '#fff',
		fontSize: 12,

	}
})

module.exports = Loading;