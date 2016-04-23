// 全局加载中提示组件

import React from 'react-native';

import utils from '../../util/index.js';

import store from '../../store/createStore.js';

import { connect } from 'react-redux';

var {
	View,
	Text,
	Image,
	StyleSheet
} = React;

var Loading = React.createClass({
	getInitialState(){
		return {

		}
	},
	componentWillMount(){

	},
	componentDidMount(){

	},
	_render(){

	},
	render(){
		return (
			<View style={[styles.container, {
				width: store.getState().loading.show ? utils.screen.width : 0,
				height: store.getState().loading.show ? utils.screen.height : 0,
				opacity: store.getState().loading.show ? 1 : 0,
			}]}>
				<View style={styles.main}>
					<Text style={styles.msg}>{this.props.loading.msg}</Text>
				</View>
			</View>
		)
	}
})

var mapStateToProps = function(state) {
  	return { 
  		loading: state.loading
  	};
}

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

export default connect(mapStateToProps)(Loading);

