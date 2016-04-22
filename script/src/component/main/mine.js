// 我的

import React from 'react-native';

var {
	View,
    Text,
    Component,
    StyleSheet
} = React;

var Mine = React.createClass({
    render() {
        return (
        	<View style={styles.container}>
            	<Text style={styles.text}>Mine</Text>
            </View>
        );
    }
})

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 66
	},
	text: {
		fontSize: 18,
	}
})

module.exports = Mine;