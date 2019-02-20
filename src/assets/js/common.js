export default {
	dateFormat: function(time, fmt) { // 日期格式化
		if(!time) {
			return "";
		}
		var d = new Date(time);
		var o = {
			"M+": d.getMonth() + 1, //月份
			"d+": d.getDate(), //日
			"z+": d.getDate() - 1, //昨日
			"h+": d.getHours(), //小时
			"m+": d.getMinutes(), //分
			"s+": d.getSeconds(), //秒
			"q+": Math.floor((d.getMonth() + 3) / 3), //季度
			"S": d.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	dateFormatSecond(time) { // 精确到秒
		return this.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
	},
	dateFormatDay(time) { // 精确到天
		return this.dateFormat(time, 'yyyy-MM-dd');
	},
	changeValueByKeyInObj(key, obj, value) { // 改变对象中某个值
		for(var i in obj) {
			if(i == key) {
				obj[i] = value;
				break;
			}
		}
	},
	getCheckItemVal(item, arr, val, key) { // 值、数组、已知key值、需要的key值
		var str = '';
		for(var i in arr) {
			if(arr[i][val] == item) {
                str = arr[i][key];
                break;
			}
		}
		return str;
	},
	clone(obj) { // 深度clone
		return JSON.parse(JSON.stringify(obj));
	},
	getRandomID(length){  // 生成可控长度的随机数
		let len = length ? parseInt(length) : 16;
	    return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
	}
}