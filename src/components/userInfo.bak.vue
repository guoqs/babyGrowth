<template>
	<div class="container-fluid" v-if="userInfo">
		<div class="form-horizontal">
			<div class="form-group ">
				<label class="col-sm-2 col-lg-1 col-xs-12 control-label">昵称</label>
				<div class="col-sm-10 col-lg-11 col-xs-12">
					<input type="text" class="form-control" placeholder="请输入昵称" v-model="userInfo.user_nick_name" :disabled="!isEdit">
				</div>
			</div>
			<div class="form-group ">
				<label class="col-sm-2 col-lg-1 col-xs-12  control-label">图像</label>
				<div class="col-sm-10 col-lg-11 col-xs-12">
					<img :src="(imgInput&&imgInput.src)||userInfo.user_head_img" class="thumbnail" @click="changeImg()"/>
					<input type="file" name="" id="select-img" accept="image/*"/>
					<div class="row text-center" v-if="imgInput" style="margin-top: 10px;">
						<div class="col-xs-6">
							<button class="btn btn-default" @click="cancelImg()">取消选择</button>
						</div>
						<div class="col-xs-6">
							<button class="btn btn-primary" @click="modifyHeadImg()">修改图像</button>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1 col-xs-12 control-label">真实姓名</label>
				<div class="col-sm-10 col-lg-11 col-xs-12">
					<input type="email" class="form-control" placeholder="请输入真实姓名" v-model="userInfo.user_name" :disabled="!isEdit">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1 col-xs-12 control-label">手机号码</label>
				<div class="col-sm-10 col-lg-11 col-xs-12">
					<input type="text" class="form-control" placeholder="输入手机号码" v-model="userInfo.user_mobile" :disabled="!isEdit">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1 col-xs-12  control-label">生日</label>
				<div class="col-sm-10 col-lg-11 col-xs-12">
					<input type="text" class="form-control" placeholder="baby 的生日" :value="userInfo.user_birthday|dateFormat('YYYY MM DD')" :disabled="!isEdit">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1 col-xs-12  control-label">性别</label>
				<div class="col-sm-10 col-lg-11 col-xs-12 ">
					<select class="form-control" v-model="userInfo.user_sex"  :disabled="!isEdit">
						<option value="0">保密一下</option>
						<option value="1">男宝</option>
						<option value="2">女宝</option>
					</select>
				</div>
			</div>
			<div  class="form-group">
				<div class="col-xs-12 " >
					<pre>{{JSON.stringify(userInfo,null,' ')}}</pre>
				</div>
			</div>
			
			<div  class="form-group">
				<div class="col-xs-12 " v-if="!isEdit">
					<button class="btn btn-primary btn-block" @click="editInfo()">开启编辑</button>
				</div>

				<div class="row text-center" v-if="isEdit" style="margin-top: 10px;">
					<div class="col-xs-6">
						<button class="btn btn-default" @click="editInfo()">取消编辑</button>
					</div>
					<div class="col-xs-6">
						<button class="btn btn-primary" @click="modifyHeadImg()">保存内容</button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
				isEdit:false,
				isListenFile:false,
				imgInput:null
			}
		},
		created() {
			this.getUserList()
			loading.show = true
		},
		mounted() {
			console.log(123)
		},
		methods: {
			getUserList() {
				var apis = this.apis
				var userId = this.$route.params.userId
				apis.getUserInfo(userId).then(res => {
					this.userInfo = res.data
				}).always(()=>{
					loading.show = false
				})
			},
			getPhoneNos() {

			},
			changeImg () {
				let selectImg = $('#select-img')
				if(!this.isListenFile){
					let selectImgNative = selectImg[0]
					selectImgNative.addEventListener('change', () => {
						console.log(selectImgNative.files)
						var imgFile = selectImgNative.files[0]
						this.imgInput = {
							src: URL.createObjectURL(imgFile),
							blob:imgFile
						}
						selectImgNative.value = ''
					}, false)
				}
				this.isListenFile = true
				selectImg.click()
			},
			cancelImg () {
				this.imgInput = null
			},
			editInfo () {
				this.isEdit = !this.isEdit
			},
			modifyHeadImg () {
				var apis = this.apis
				apis.uploadImg(this.imgInput.blob,'headImgs').then(res => {
//					console.log(res)
					apis.updataHeadImg({
						userId:this.$route.params.userId,
						src:res.data
					}).then(res => {
						this.userInfo.user_head_img = this.imgInput.src
						this.imgInput = null
					}).fail(err=>{
						alert('图像更新失败')
					})
				}).fail(err=>{
					alert('图像更新失败')
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
img{
	display: block;
	max-width: 100%;
	margin: 0 auto;
}
[type="file"]{
	display: none;
}
</style>