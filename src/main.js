// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'

import test from '@/components/test'
import App from './App'
import router from './router'
import apis from './apis'
import utils from './utils'
import filter from './filter'

import routerConfig from './router/routerConfig'
import { setTimeout } from 'core-js/library/web/timers';
Vue.config.productionTip = false
Vue.prototype.row = 10
Vue.prototype.apis = apis
Vue.prototype.utils = utils
filter(Vue)
// console.log(JSON.stringify(router,null,' '))
console.log(JSON.stringify)
window.loading = {
	texts:'数据加载中...',
	show:false
}
/* eslint-disable no-new */
let bbgowth =  new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
console.log(test)

setTimeout(()=>{
	console.log(123)
	// routerConfig.unshift({
  //   path: '/test',
  //   component: test
	// })
	// routerConfig.splice(routerConfig.length - 1,0, {
	// 	    path: '/test',
  //   component: test
	// })
	// bbgowth.$router.options.routes.unshift({
	// 	path: '/test',
	// 	component: test
	// })
	bbgowth.$router.addRoutes([{
		path: '/test',
		component: test
	}])
	console.log(bbgowth.$router)
	console.log(bbgowth.$router.options.routes)
	console.log(router.options.routes)
	setTimeout(()=>{
		console.log(321)
		// bbgowth.$router.push('/test')
	},1000 * 5)
}, 1000 * 5)
document.querySelector('body #loading').style.display = 'none'
