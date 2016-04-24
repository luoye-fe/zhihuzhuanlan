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
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('cookie', cookie)
        .send(params.data ? params.data : null)
        .end((err, res) => {
        	console.log(res.text);
        	console.log(params.data);
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


utils.getAllFollowedColumns = async(userHashID, _xsrf, cb) => {
    utils.fetch({
        type: 'POST',
        url: 'https://www.zhihu.com/node/ProfileFollowedColumnsListV2',
        getHTML: false,
        data: {
            method: 'next',
            _xsrf: _xsrf,
            params: { 
            	offset: 0, 
            	hash_id: userHashID, 
            	limit: 9999 
            }
        }
    }, (err, res) => {
    	cb && cb (res);
    	return res;
    })
    // request
    // 	.post('https://www.zhihu.com/node/ProfileFollowedColumnsListV2')
    // 	.set('cookie','d_c0="ACDA3ZbSwwmPTk3dSPkFFDoZgC4weRwbL4g=|1460540255"; _za=ad05d787-06d5-426f-9592-a7dfcbbfd8f4; _xsrf=99080c5161e4cc4feffc2ecc28382408; _zap=a159240a-06a9-4456-b0e0-22d37f739f67; l_n_c=1; q_c1=7cd29ef2cab24f0e94e11472ec1402f7|1461422510000|1461422510000; cap_id="MDExZmM0MTI4ZjhmNGQ1MWFhZjZhZDYxOWU0NTc4YTU=|1461422510|5526117a40b504aef3424c2041a6ae8155a942c3"; l_cap_id="ZTQxZTBhMzAwMDY3NGI5N2IwOGE1YWI5MWNhY2MzMGM=|1461422510|b9eb4f782b30cd30f79bc7ce611e9f7ac3e76d1c"; login="YTA0YzI1MDk3YTdiNGZlOThiMjhkZjJjYzgwMDQzYzg=|1461422544|f8dc727cc6ce8bb43c8ac9d52794bc28e1fa033a"; z_c0=Mi4wQUFEQWU2MG9BQUFBSU1EZGx0TERDUmNBQUFCaEFsVk4wQlpEVndBaUs3OFNhbjdRMi16RFpOVGViMkI4NXJDY3JB|1461422544|d88bb6fd9c0a84f56cce36850c591ddf4a5d2609; __utma=51854390.694983888.1461426113.1461426113.1461426113.1; __utmc=51854390; __utmz=51854390.1461426113.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/people/luo-ye-42-22; __utmv=51854390.100-1|2=registration_date=20140318=1^3=entry_date=20140318=1')
    // 	.send({
	   //      method: 'next',
	   //      _xsrf: _xsrf,
	   //      params: { 
	   //      	"offset": 0, 
	   //      	"hash_id": userHashID, 
	   //      	"limit": 9999 
	   //      }
    // 	})
    // 	.end((err, res) => {
    // 		console.log(res);
    // 	})
}

export default utils;
