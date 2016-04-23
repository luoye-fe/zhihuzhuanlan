

## 获取关注人接口：
地址：`https://www.zhihu.com/node/ProfileFollowedColumnsListV2`
方法：`post`
参数：
```
method:next
params:{"offset":20,"limit":9999,"hash_id":"67776f35550de7a68a472e8de03e157b"}
_xsrf:99080c5161e4cc4feffc2ecc28382408
```
数据格式：
```
{
	r: 0,
	msg: [
		"<div class="zm-profile-card zm-profile-section-item zg-clear no-hovercard"> <div class="zg-right"> <button data-follow="m:button" data-id="46a588b2d664291f7fb5fec44bc60f71" class="zg-btn zg-btn-unfollow zm-rich-follow-btn small nth-0">取消关注</button> </div> <a title="娄萌萌" data-tip="p$t$mm.lou" class="zm-item-link-avatar" href="/people/mm.lou"> <img src="https://pic4.zhimg.com/9c586eb92cc879df61d8b8328165204f_m.jpg" class="zm-item-img-avatar"> </a> <div class="zm-list-content-medium"> <h2 class="zm-list-content-title"><a data-tip="p$t$mm.lou" href="https://www.zhihu.com/people/mm.lou" class="zg-link" title="娄萌萌">娄萌萌</a></h2> <div class="zg-big-gray">做自己喜欢的事，让喜欢的事有价值~</div> <div class="details zg-gray"> <a target="_blank" href="/people/mm.lou/followers" class="zg-link-gray-normal">4425 关注者</a> / <a target="_blank" href="/people/mm.lou/asks" class="zg-link-gray-normal">20 提问</a> / <a target="_blank" href="/people/mm.lou/answers" class="zg-link-gray-normal">123 回答</a> / <a target="_blank" href="/people/mm.lou" class="zg-link-gray-normal">1692 赞同</a> </div> </div> </div>",
	]
}
```


## 知乎日报启动界面图片
地址：`http://news-at.zhihu.com/api/4/start-image/720*1184`
参数：
```
320*432
480*728
720*1184
1080*1776
```
数据格式：
```
{
    text: "© Fido Dido",
    img: "http://p2.zhimg.com/10/7b/107bb4894b46d75a892da6fa80ef504a.jpg"
}  
```


