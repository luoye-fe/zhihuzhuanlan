// 文章列表

import React from 'react-native';

var {
	View,
    Text,
    Component,
    StyleSheet
} = React;

var Post = React.createClass({
    render() {
        return (
        	<View style={styles.container}>
            	<Text style={styles.text}>Post</Text>
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

export default Post;