<template>
	<div class="register container-fluid">
		<div class="form-horizontal">
			<div class="form-group ">
				<label class="col-sm-2 col-lg-1 control-label">昵称</label>
				<div class="col-sm-10 col-lg-11 ">
					<input type="email" class="form-control" placeholder="请输入昵称" v-model="req.nickName">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">真实姓名</label>
				<div class="col-sm-10 col-lg-11">
					<input type="email" class="form-control" placeholder="请输入真实姓名" v-model="req.name">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">手机号码</label>
				<div class="col-sm-10 col-lg-11">
					<input type="email" class="form-control" placeholder="输入手机号码" v-model="req.mobile">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">生日</label>
				<div class="col-sm-10 col-lg-11">
					<input type="date" class="form-control" placeholder="baby 的生日" v-model="req.birthday">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">性别</label>
				<div class="col-sm-10 col-lg-11">
					<select class="form-control" v-model="req.sex">
						<option value="0">保密一下</option>
						<option value="1">男宝</option>
						<option value="2">女宝</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">密码</label>
				<div class="col-sm-10 col-lg-11">
					<input type="password" class="form-control" placeholder="请输入密码" v-model="req.password">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">确认密码</label>
				<div class="col-sm-10 col-lg-11">
					<input type="password" class="form-control" placeholder="请确认密码" v-model="req.passwordConfirm">
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 text-center">
					<router-link :to="'/login'" class="btn btn-default" replace>注册过?去登录</router-link>
				</div>
				<div class="col-xs-6 text-center">
					<!--<button type="submit" class="btn btn-primary" onclick="register()">注册</button>-->
					<button type="button" id="register" class="btn btn-primary" @click="register()">注册</button>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>

//	function register(data) {
//		if(!data.password) {
//			alert('密码必填')
//			return
//		}
//		if(data.password !== data.passwordConfirm) {
//			alert('密码 和确认密码不一致')
//			return
//		}
//		var dataSubmit = JSON.parse(JSON.stringify(data))
//		dataSubmit.passwordSubmit = md5(dataSubmit.password)
//		delete dataSubmit.password
//		dataSubmit.passwordConfirmSubmit = md5(dataSubmit.passwordConfirm)
//		delete dataSubmit.passwordConfirm
//		$('#register').prop('disabled', 'disabled').html('注册中...')
//		$.ajax({
//			type: "post",
//			url: "/register",
//			data: dataSubmit,
//			success: function(res) {
//				console.log(res)
//				$('#register').removeProp('disabled').html('注册')
//			}
//		});
//	}
	export default {
		data() {
			return {
				req: {
					name: 'gqs',
					mobile: '18617140482',
					birthday: '2018-01-04',
					sex: 0,
					nickName: '我是个大爷',
					headImg: 'http://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=d7472c171e950a7b756046c23ae14ee1/d1160924ab18972b4f4877ebe5cd7b899e510aa4.jpg',
					password: '',
					passwordConfirm: ''
				}
			}
		},
		methods: {
			register() {
				let data = this.req
				console.log(this.apis)
				let apis = this.apis
				if(!data.password) {
					alert('密码必填')
					return
				}
				if(data.password !== data.passwordConfirm) {
					alert('密码 和确认密码不一致')
					return
				}
				var dataSubmit = JSON.parse(JSON.stringify(data))
				dataSubmit.passwordSubmit = md5(dataSubmit.password)
				delete dataSubmit.password
				dataSubmit.passwordConfirmSubmit = md5(dataSubmit.passwordConfirm)
				delete dataSubmit.passwordConfirm
				$('#register').prop('disabled', 'disabled').html('注册中...')
				
//				$.ajax({
//					type: "post",
//					url: "/register",
//					data: dataSubmit,
//					success: function(res) {
//						console.log(res)
//						$('#register').removeProp('disabled').html('注册')
//					}
//				});
				let reqs = apis.registe(dataSubmit).then(function () {
					alert('success')
				}).fail(function () {
					alert('error')
				}).always(function () {
					$('#register').removeProp('disabled').html('注册')
				})
				console.log(reqs)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>