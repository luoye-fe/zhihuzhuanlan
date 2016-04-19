// 知乎专栏app ios 主入口

// 全局注册 storage
require('./static/src/js/store/storage.js');
var Storage = global.storage;

var React = require('react-native');

// api
var Server = require('./static/src/js/server/index.js');

// util
var Util = require('./static/src/js/util/index.js');

// 主组件
var Post = require('./static/src/js/component/main/post.js');
var Column = require('./static/src/js/component/main/column.js');
var Mine = require('./static/src/js/component/main/mine.js');
var Set = require('./static/src/js/component/main/set.js');

// 绑定用户组件
var BindUser = require('./static/src/js/component/user/bindUser.js');

// 爬虫模拟知乎登陆
var ZHIHU = require('./static/src/js/server/initZhihu.js');


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
    AlertIOS
} = React;

StatusBar.setBarStyle('default');


var zhihuzhuanlan = React.createClass({
    statics: {
        title: '文章列表',
        description: '选项'
    },
    getInitialState: function() {
        return {
            selectedTab: 'Post',
            showBindUser: false
        }
    },
    componentWillMount: function() {
        var _this = this;
        Storage.load({
            key: 'userInfo'
        }).then(function(userInfo) {
            _this.setState({
                showBindUser: false
            })
            return;
        }).catch(function(err) {

        })
        _this.setState({
            showBindUser: true
        })
    },
    componentDidMount: function(){

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
        )
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
