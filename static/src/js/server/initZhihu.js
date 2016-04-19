// 知乎 模拟登陆 获取用户的基本信息 获取关注人文章列表 获取用户关注的专栏 获取用户关注的专栏的文章列表 获取用户的文章列表
'use strict';

var request = require('superagent');
var cheerio = require('cheerio');

var Storage = global.storage;

var getCookie = function(params, xsrf, cb) {
    request
        .post('https://www.zhihu.com/login/phone_num')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('Referer', 'http://www.zhihu.com/')
        .send({
            _xsrf: xsrf,
            password: params.password,
            phone_num: params.name,
            remember_me: false
        })
        .end(function(err, res) {
            if (err) {
                return next(err);
            }
            cb && cb(res);
        })
}

var Login = function(params, cb) {
    Storage.load({
      key: 'loginCookies',
    }).then(function(cookies){
        cb && cb(cookies);
    }).catch(function(err) {
        request
            .get('https://www.zhihu.com/')
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
            .set('Referer', 'http://www.zhihu.com/')
            .end(function(err, res) {
                if (err) {
                    return next(err);
                }
                var $ = cheerio.load(res.text);
                var _xsrf = $('[name="_xsrf"]').eq(0).attr('value');
                getCookie(params, _xsrf, function(res) {
                    if (JSON.parse(res.text).msg === '登陆成功') {
                        var cookies = res.header['set-cookie'];
                        Storage.save({
                            key: 'loginCookies',
                            rawData: cookies,
                            expires: 3 * 22 * 60 * 60 * 1000  // 知乎cookies有效期3天
                        })
                        cb && cb(cookies);
                    }
                })
            })
    })
}

var commonUser = {
    name: '15652264170',
    password: 'rqy520821'
}


Login(commonUser,function(cookies){
    // zhihu.User(user_url,function(user){
        // console.log(user);
    // })
    // console.log(cookies);
})

module.exports = {
    login: Login
};
