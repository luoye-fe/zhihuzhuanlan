// 屏幕相关
import Dimensions from 'Dimensions';
import PixelRatio from 'PixelRatio';

var utils = {};


utils.screen = (() => {
	var _result = {};
	_result.width = Dimensions.get('window').width;
	_result.height = Dimensions.get('window').height;
	_result.dpi = PixelRatio.get();
	return _result;
})()

console.log(utils.screen);

export default utils;