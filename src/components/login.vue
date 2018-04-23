<template>
	<div class="register container-fluid">
		<div class="form-horizontal">
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">手机号码</label>
				<div class="col-sm-10 col-lg-11">
					<input type="email" class="form-control" placeholder="输入手机号码" v-model="req.mobile">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">密码</label>
				<div class="col-sm-10 col-lg-11">
					<input type="password" class="form-control" placeholder="请输入真实姓名" v-model="req.password">
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 text-center">
					<router-link :to="'/register'" class="btn btn-default" replace>没有账户？去注册</router-link>
				</div>
				<div class="col-xs-6 text-center">
					<button type="button" id="register" :disabled="isLogin" class="btn btn-primary" @click="login()">{{isLogin?'登录中...':'登录'}}</button>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			isLogin: false,
			req: {
				mobile: '18617140482',
				password: ''
			}
		}
	},
	methods: {
		login () {
			var apis = this.apis
			var req = this.req
			this.isLogin = true
			apis.login({
				mobile: req.mobile,
				password: md5(req.password)
			}).then(res => {
				console.log(res)
				localStorage.setItem('_bb_growth_', res.data.token)
				this.loginBack()
			}).fail(err => {
			}).always(() => {
				this.isLogin = false
			})
		},
		loginBack () {
			let query = this.$route.query
			console.log(query)
			let route = []
			// 获取vue 路由的路径
			for (let key in query) {
				if (key.indexOf('route') > -1) {
					route.push({ [key]: query[key] })
				}
			}
			if (route.length) {
				// 排序 路由
				route.sort(function (v1, v2) {
					return Object.keys(v1)[0].substring() > Object.keys(v2)[0].substring()
				})
				// 转化成vue 路径
				let path = route.reduce(function (res, cur, idx) {
					return res + '/' + cur['route' + (idx)]
				}, '')
				// 假设有vue query
				let rsearch = []
				for (let key in query) {
					if (key.indexOf('rsearch') > -1) {
						rsearch.push({ [key]: query[key] })
					}
				}
				console.log(rsearch)
				if (rsearch.length) {
					path = rsearch.reduce(function (res, cur, idx) {
						let s = cur['rsearch' + (idx)].split('_')
						return res + (!idx ? '' : '&') + s[0] + '=' + s[1]
					}, path + '?')
				}
				console.log(path)
				this.$router.replace(path)
			} else {
				this.$router.replace('/')
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>