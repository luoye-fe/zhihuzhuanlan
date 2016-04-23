
import React from 'react-native';

import utils from '../../util/index.js';

import { connect } from 'react-redux';

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
				width: utils.screen.width,
				height: utils.screen.height,
				opacity: 1
			}
		}
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
		console.log(this.props.loading);
	},
	render: function(){
		return (
			<View style={[styles.container, this.state.container]}>
				<View style={styles.main}>
					<Text style={styles.msg}>{'asd'}</Text>
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

