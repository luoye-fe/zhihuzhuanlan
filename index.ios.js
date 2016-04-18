// 知乎专栏app ios 主入口

var React = require('react-native');

// api
var Server = require('./script/server/index.js');

// util
var Util = require('./script/util/index.js');

// 主组件
var Post = require('./script/component/main/post.js');
var Column = require('./script/component/main/column.js');
var Mine = require('./script/component/main/mine.js');
var Set = require('./script/component/main/set.js');

// 绑定用户
var BindUser = require('./script/component/user/bindUser.js');

var {
    AppRegistry,
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
    AsyncStorage
} = React;

StatusBar.setBarStyle('light-content');


var zhihuzhuanlan = React.createClass({
    statics: {
        title: '文章列表',
        description: '选项'
    },
    getInitialState: function() {
        return {
            selectedTab: 'Post',
            showBindUser: true
        }
    },
    componentDidMount: function() {
        var _this = this;
        AsyncStorage.getItem('user_name', function(err, user_name){
            if(!err && user_name){
                _this.state.showBindUser = false;
            }else{
                _this.state.showBindUser = true;
            }
        })
    },
    render: function() {
        if(this.state.showBindUser){
            return (
                <BindUser></BindUser>
            )
        }
        return (
            <View>
                <Text style={styles.container}>骆也</Text>
                <Post></Post>
            </View>
        );
    }
})

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#1fb9ff',
        width: 100,
        height: 300
    }
});

AppRegistry.registerComponent('zhihuzhuanlan', () => zhihuzhuanlan);
