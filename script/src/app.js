// app main
import React from 'react-native';

// api
import Server from './server/index.js';

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


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

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
	    var _this = this;
	    Storage.load({
	        key: 'userInfo'
	    }).then((userInfo) => {
	        _this.setState({
	            showBindUser: false
	        })
	        return;
	    }).catch((err) => {})
	    _this.setState({
	        showBindUser: true
	    })
	},
	componentDidMount() {

	},
	_addNavigator(component, title) {
		return (
			<NavigatorIOS style={{flex:1}} initialRoute={{
				component: component,
				title: title,
				passProps: {
					data: title
				}
			}}/>
		)
	},
	_selectTab(tab) {
		this.setState({
			selectedTab: tab
		})
	},
	render() {
	    // if(this.state.showBindUser){
	    //     return (
	    //         <BindUser></BindUser>
	    //     )
	    // }
	    return (
	    	<View style={styles.container}>
		        <TabBarIOS>
		        	<TabBarIOS.Item title='文章' selected={this.state.selectedTab === 'Post'} onPress={this._selectTab('Post')}>
		        		{this._addNavigator(Post, '文章')}
		        	</TabBarIOS.Item>
		        	<TabBarIOS.Item title='专栏' selected={this.state.selectedTab === 'Column'} onPress={this._selectTab('Column')}>
		        		{this._addNavigator(Column, '专栏')}
		        	</TabBarIOS.Item>
		        	<TabBarIOS.Item title='我的' selected={this.state.selectedTab === 'Mine'} onPress={this._selectTab('Mine')}>
		        		{this._addNavigator(Mine, '我的')}
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

module.exports = App;




