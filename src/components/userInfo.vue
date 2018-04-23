<template>
	<div class="container-fluid" v-if="userInfo">
		<ul class="info-list">
			<li>
				<router-link :to="'/user-info/modify-head-img?headImg=' + userInfo.user_head_img">
					<span>图像</span>
					<span :style="'border-radius: 5px;background-image: url('+userInfo.user_head_img+')'" class="headimg bg-img-center"></span>
				</router-link>
			</li>
			<li>
				<a href="javascript:void(0)">
					<span>真是姓名</span>
					<span>{{userInfo.user_name}}</span>
				</a>
			</li>
			<li>
				<router-link :to="'/user-info/modify-mobile?mobile=' + userInfo.user_mobile">
					<span>手机号</span>
					<span>{{userInfo.user_mobile}}</span>
				</router-link>
			</li>
			<li>
				<router-link :to="'/user-info/modify-nick-name?nickName=' + userInfo.user_nick_name">
					<span>昵称</span>
					<span>{{userInfo.user_nick_name}}</span>
				</router-link>
			</li>
			<li>
				<router-link :to="'/user-info/modify-sex?sex=' + userInfo.user_sex">
					<span>性别</span>
					<span>{{userInfo.user_sex==1?'男':userInfo.user_sex==2?'女':'未知'}}</span>
				</router-link>
			</li>
			<li>
				<router-link :to="'/user-info/modify-birthday?birthday=' + userInfo.user_birthday.substring(0,10)">
					<span>生日</span>
					<span>{{userInfo.user_birthday.substring(0,10)}}</span>
					<!-- <span>{{userInfo.user_birthday|dateFormat('YYYY-MM-DD')}}</span> -->
				</router-link>
			</li>
			<li>
				<a href="javascript:void(0)">
					<span>最近修改</span>
					<span>{{userInfo.update_datatime|dateFormat}}</span>
				</a>
			</li>
			<li>
				<a href="javascript:void(0)">
					<span>创建账户时间</span>
					<span>{{userInfo.create_datetime|dateFormat}}</span>
				</a>
			</li>
			<li>
				<router-link to="/topic-list?type=my">
					<span>我发布的话题</span>
					<span></span>
				</router-link>
			</li>
			<li>
				<a href="javascript:void(0)" @click="logout()" style="justify-content: center;">
					<span>退出登录</span>
				</a>
			</li>
		</ul>
		<hr>
		<div class="form-group">
			<div class="col-xs-12 ">
				<pre>{{JSON.stringify(userInfo,null,' ')}}</pre>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			userInfo: null,
			isEdit: false,
			isListenFile: false,
			imgInput: null
		}
	},
	created () {
		this.getUserList()
		loading.show = true
	},
	mounted () {
		console.log(123)
	},
	methods: {
		getUserList () {
			var apis = this.apis
			var userId = this.$route.params.userId
			apis.getUserInfo(userId).then(res => {
				this.userInfo = res.data
			}).fail(apis.rejectHander.bind(this)).always(() => {
				loading.show = false
			})
		},
		logout () {
			localStorage.removeItem('_bb_growth_')
			this.$router.replace('/')
		},
		getPhoneNos () {

		},
		changeImg () {
			let selectImg = $('#select-img')
			if (!this.isListenFile) {
				let selectImgNative = selectImg[0]
				selectImgNative.addEventListener('change', () => {
					var imgFile = selectImgNative.files[0]
					this.imgInput = {
						src: URL.createObjectURL(imgFile),
						blob: imgFile
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
			apis.uploadImg(this.imgInput.blob, 'headImgs').then(res => {
				//					console.log(res)
				apis.updataHeadImg({
					userId: this.$route.params.userId,
					src: res.data
				}).then(res => {
					this.userInfo.user_head_img = this.imgInput.src
					this.imgInput = null
				}).fail(err => {
					alert('图像更新失败')
				})
			}).fail(err => {
				alert('图像更新失败')
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
}
[type="file"] {
  display: none;
}
.headimg {
  height: 80px;
  width: 80px;
  display: block;
  margin: 5px 0;
}
.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
  // li{
  // 	position: relative;
  // }
  li {
    &:not(:last-child) {
      border-bottom: 1px solid #f6f6f6;
    }
  }
  a {
    position: relative;
    display: flex;
    min-height: 40px;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    transition-duration: 0.3s;

    &:not([href="javascript:void(0)"]) {
      padding-right: 15px;
      // background-color: red;
      &::after {
        position: absolute;
        display: block;
        border-style: solid;
        border-width: 2px;
        height: 8px;
        width: 8px;
        border-color: transparent #666 #666 transparent;
        content: "";
        top: 50%;
        right: 3px;
        transform: translateY(-50%) rotate(-45deg);
        border-radius: 0 3px 0 3px;
      }
    }
    &:active {
      background-color: #eee;
    }
    span {
      &:first-child {
        color: #999;
      }
      &:last-child {
        color: #333;
      }
    }
  }
}
</style>