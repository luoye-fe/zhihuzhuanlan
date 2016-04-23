// 包装请求html

import request from 'superagent';
import cheerio from 'cheerio';

var Storage = global.storage;

var utils = {};

utils.getZhihuCookie = async() => {
    Storage.load({
        key: 'loginCookies',
    }).then((cookies) => {
        return cookies;
    }).catch((err) => {
        request
            .get('http://7xtb4q.com2.z0.glb.clouddn.com/zhihuCookie.json') // 手动上传的自己的cookie。。
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                Storage.save({
                    key: 'loginCookies',
                    rawData: JSON.parse(res.text).cookie,
                    expires: 3 * 22 * 60 * 60 * 1000 // 知乎cookies有效期3天
                })
                return JSON.parse(res.text).cookie;
            })
    })

}

utils.fetch = async (params, cb) => {
    var cookie = await utils.getZhihuCookie();
    request(params.type, params.url)
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('Referer', 'http://www.zhihu.com/')
        .set('upgrade-insecure-requests', '1')
        .set('cookie', cookie)
        .send(params.data ? params.data : null)
        .end((err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            if (params.getHTML) {
                var $ = cheerio.load(res.text);
                cb && cb(false, $);
                return;
            }
            cb && cb(false, res);
            return res;
        })
}


utils.getAllFollowedColumns = async(userID, cb) => {
    var cookie = await utils.getZhihuCookie();
    utils.fetch({
        type: 'POST',
        url: 'https://www.zhihu.com/people/' + userID + '/columns/followed',
        getHTML: false,
        data: {
            method: 'next',
            _xsrf: '99080c5161e4cc4feffc2ecc28382408',
            params: { 
            	"offset": 0, 
            	"hash_id": "58b1697e3baa51acc449a7fa66f961d7", 
            	"limit": 9999 
            }
        }
    }, (err, res) => {

    })
}

export default utils;
