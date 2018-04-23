<template>
	<div class="container-fluid">
		<div class="form-horizontal">
			<div class="form-group ">
				<label class="col-sm-2 col-lg-1 control-label">内容</label>
				<div class="col-sm-10 col-lg-11 ">
					<textarea type="email" class="form-control" placeholder="话题内容" v-model="req.texts"></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">类型</label>
				<div class="col-sm-10 col-lg-11 text-center">
					<div class=" btn-group topic-type">
						<!--<label for="topic-type-1" class="btn btn-primary" :class="req.type==1?'cur':''">图片</label>
						<input type="radio" id="topic-type-1" :value="1" v-model="req.type" />
						<input type="radio" id="topic-type-2" :value="2" v-model="req.type" />
						<input type="radio" id="topic-type-3" :value="3" v-model="req.type" disabled/>
						<label for="topic-type-2" class="btn btn-primary" :class="req.type==2?'cur':''">视频</label>
						<label for="topic-type-3" class="btn btn-primary" :class="req.type==3?'cur':''">音乐</label>-->
						<label for="topic-type-1" class="btn" :class="req.type==1?'btn-primary':'btn-default'">图片</label>
						<input type="radio" id="topic-type-1" :value="1" v-model="req.type" />
						<input type="radio" id="topic-type-2" :value="2" v-model="req.type" />
						<input type="radio" id="topic-type-3" :value="3" v-model="req.type" />
						<label for="topic-type-2" class="btn" :class="req.type==2?'btn-primary':'btn-default'">视频</label>
						<label for="topic-type-3" class="btn" :class="req.type==3?'btn-primary':'btn-default'">音乐</label>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 col-lg-1  control-label">媒体(选择{{req.type==1?'图片':req.type==2?'视频':'音乐'}})</label>
				<div class="col-sm-10 col-lg-11 media-privew">
					<!--<input type="file"/>-->
					<ul>
						<li v-for="(item ,idx) in mediaFiles['type'+req.type]" 
						:key="idx" 
						:style="req.type==1?'background-image:url('+item.src+')':''" 
						:class="req.type!=1?'not-image':''">
							<video v-if="req.type==2" :src="item.src" controls></video>
							<audio v-if="req.type==3" :src="item.src" controls></audio>
						</li>
						<li v-show="(req.type==1 && mediaFiles.type1.length < 9) || (req.type!=1 && mediaFiles['type'+req.type].length == 0)">
							<label>
								<i class="glyphicon glyphicon-plus"></i>
								<input type="file" id="file-input" multiple :accept="req.type==1?'image/*':req.type==2?'video/mp4':req.type==3?'audio/mp3':''"/>
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-6 text-center">
					<button type="button" class="btn btn-lg btn-danger" @click="$router.push('/topic-list')">取消</button>
				</div>
				<!-- <div class="col-xs-4 text-center">
					<button type="button" id="register" class="btn btn-lg btn-info">暂存</button>
				</div> -->
				<div class="col-xs-6 text-center">
					<!--<button type="submit" class="btn btn-primary" onclick="register()">注册</button>-->
					<button type="button" id="register" class="btn btn-lg btn-primary" @click="publishTopic()">发布</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				req: {
					texts:'',
					type: 1,
					thumbnails:'',
					urls:''
				},
				mediaFiles:{
					type1:[],
					type2:[],
					type3:[]
				}
			}
		},
		created() {},
		mounted() {
			let $this = this
			let Url = window.URL || window.webkitURL
			let fileInput = document.getElementById('file-input')
			fileInput.addEventListener('change',function () {
				let files = this.files
				console.log(files)
				let temp = []
				if (files.length) {
					[].slice.call(files).forEach(file => {
						temp.push({
							src:Url.createObjectURL(file),
							blob:file
						})
					})
					let type =  $this.req.type
					if(type !== 1){
						$this.mediaFiles['type' + type] = temp
					} else {
						let orgin = $this.mediaFiles.type1
						let orginLen = orgin.length
						if(temp.length > 9-orginLen){
							$this.mediaFiles.type1 = orgin.concat(temp.slice(0,9-orginLen))
						}else{
							$this.mediaFiles.type1 = orgin.concat(temp)
						}
					}
				}
				//清空是为了可以继续传（图片）
				this.value = ''
			})
		},
		methods: {
			publishTopic () {
				let apis = this.apis
				if(!this.mediaFiles['type' + this.req.type].length){
					alert('媒体文件必须上传')
					return
				}
				this.uploadMedia((srcs)=>{
					console.log(srcs)
					this.req.thumbnails = this.req.urls = srcs
//					console.log(JSON.stringify(this.req,null,' '))
					apis.publishTopic(this.req).then(res=>{
						this.$router.push('/topic-list?type=my')
					}).fail(apis.rejectHander.bind(this))
				})
			},
			uploadMedia (cd) {
				let apis = this.apis
				let _meida = this.mediaFiles['type' + this.req.type]
				let type = this.req.type
				let path = type === 1?'topicImgs':type === 2?'topicVideos':type === 3?'topicMusic':'test'
				let srcs=''
				console.log(_meida)
				;(function uploadFile (meida,idx) {
					var file = meida[idx-1]
					if(file){
						apis.uploadImg(file.blob,path).then(res => {
							console.log(res)
							!srcs?srcs=res.data:srcs+=','+res.data
						}).fail(err=>{
							alert('图像更新失败')
						}).always(function () {
							uploadFile (meida,++idx)
						})
					}else{
						typeof cd === 'function'?cd(srcs):undefined
					}
				})(_meida,1)
			}
		},
		watch:{
			'req.type' (n) {
				console.log(n)
				let fileInput = document.getElementById('file-input')
				if(fileInput){
					if(n===1){
						fileInput.setAttribute('multiple','multiple')
					}else{
						fileInput.removeAttribute('multiple')
					}
				}
	
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
/*	/*
	[type="file"] {
		display: none;
	}*/
	
	.topic-type {
		input {
			display: none;
		}
		.btn.cur {
			background-color: #204d74;
			border-color: #122b40;
		}
	}
	.media-privew{
		ul{
			list-style: none;
			padding: 0;
		}
		ul:after{
			display: block;
			content: '';
			clear: both;
		}
		li{
			float: left;
			width: calc(33.333333333333% - 6px);
			padding-bottom: calc(33.333333333333% - 6px);
			height: 0;
			margin: 2px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			position: relative;
			box-shadow: 0 0 1px #333;
			border-radius: 3px;
			overflow: hidden;
			&.not-image{
				width: calc(100% - 6px);
				padding-bottom: 0;
				height: auto;
				video,audio{
					max-width: 100%;
					display: block;
					margin: 0 auto;
					max-height: 200px;
				}
			}
		}
		label{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			font-size: 2em;
			color: rgba(0,0,0,.1);
			input{
				display: none;
			}
		}
	}
</style>