// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import api from './assets/js/common.js' // 公共js
import './assets/css/common.less' // 公共css

Vue.use(ElementUI);

const axiosBaseUrl = "http://www.baidu.com"; // 请求地址
/** axios 全局配置 */
axios.defaults.baseURL = axiosBaseUrl; // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/json'; // 设置请求头
axios.defaults.timeout = 30 * 1000; // 设置请求超时时间

let loadingInstance = null; // 请求动画
// 统一设置请求前修改参数
axios.interceptors.request.use((config) => {
	loadingInstance = ElementUI.Loading.service({}); // 加载动画
	return config;
});

// 统一设置请求不成功的方法
axios.interceptors.response.use(response => {
	setTimeout(() => {
		loadingInstance.close();
		if(response.data.status && response.data.status != 'success') {
			ElementUI.Message.error({
				message: response.data.resultMsg || '请求数据异常，请稍后再试！！',
				duration: 3000,
				showClose: true
			});
		}
	}, 500)
	return response.data;
}, error => {
	loadingInstance.close();;
	ElementUI.Message.error({
		message: '服务器异常，请稍后再试！！',
		duration: 3000,
		showClose: true
	});
});

// 路由渲染前动作
router.beforeEach((to, from, next) => {
	const pathName = window.location.origin + window.location.pathname; // 项目路径地址
	//判断版本是否更新(打包时执行)
	if(process.env.NODE_ENV !== 'development') { // 发布环境
		$.ajax({
			url: pathName + 'static/version.json?_=' + Math.random(), //json文件位置
			type: "GET",
			dataType: "json",
			success: function(data) {
				if(process.env.VERSION !== data.version) {
					Vue.prototype.$alert('系统版本有更新，点击确定加载最新，或按【CTRL + F5】！', '系统提示', {
						type: 'warning',
						showClose: false,
						callback(action, instance) {
							window.location.reload(true); // 强制刷新
						}
					});
					return;
				}
				next();
			},
			error: function(err) {
				next();
			}
		});
	}
	next();
});

// 全局使用
Vue.prototype.api = api;
Vue.prototype.$axios = axios;

// Date对象的toJSON方法
Date.prototype.toJSON = function() {    
	return this.toString();
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})