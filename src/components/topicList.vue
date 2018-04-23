<template>
	<div class="container-fluid" v-if="topicList.length">
		<div class="media" v-for="(topic,idx) in topicList" :key="idx">
		  <div class="media-left">
		    <router-link :to="'user-info/' + topic.user_id">
		    	<img class="media-object" :src="topic.user_head_img" alt="">
		    </router-link>
		  </div>
		  <div class="media-body">
		    <h4 class="media-heading">{{topic.user_nick_name}}</h4>
		    <p>{{topic.texts}}</p>
		    <div class="video-list"  v-if="topic.type == 3" @click="playVideo(idx)">
		    	<audio  :src="topic.urls" :id="'video' + idx" :poster="topic.thumbnailsArr[0]" controls="controls"></audio>
		    </div>
		    <div class="video-list"  v-if="topic.type == 2" @click="playVideo(idx)">
		    	<video  :src="topic.urls" :id="'video' + idx" controls="controls" poster="//10.18.200.188:8889/uploads/default.jpg"></video>
		    </div>
			<ul class="img-list" v-if="topic.type == 1">
				<li 
					v-for="(thumbnail,idx) in topic.thumbnailsArr" 
					:key="idx"
					:style="'background-image: url('+thumbnail+');'" 
					></li>
			</ul>
			<div class="row extend-info">
				<span class="col-xs-8">{{topic.create_time|dateFormat}}</span>
				<span class="col-xs-4" > <span class="zan-topic" @click="zhanTopic(topic,idx)"><i class="glyphicon glyphicon-thumbs-up" ></i> {{topic.zan||0}}</span></span>
			</div>
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				topicList: []
			}
		},
		created () {
			this.getTopicList()
		},
		methods: {
			getTopicList(page) {
				loading.show = true
				var apis = this.apis
				var req = this.req
				let apiKey = this.$route.query.type=='my'?'getMyTopics':'getTopicList'
				apis[apiKey]({
					page,
//					row: this.row
					row: 100
				}).then(res => {
					let topicList = res.data
					topicList.forEach(item => {
						item.thumbnailsArr = item.thumbnails.split(',')
						item.urlsArr = item.urls.split(',')
					})
					this.topicList = topicList
				}).fail(function() {
					alert('error')
				}).always(function() {
					loading.show = false
				})
			},
			zhanTopic (topic,idx) {
				var apis = this.apis
				apis.zanTopic(topic.id).then(()=>{
					topic.zan++
					console.log(topic)
					console.log(idx)
					this.topicList[idx] = topic
				}).fail(()=>{
					alert('点赞失败，稍后再试！！！')
				})
			},
			playVideo (id) {
				document.getElementById('video' + id).play()
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.container-fluid{
	background-color: #f8f8f8;
	padding:5px;
	.media{
		background-color: #fff;
		margin-top: 5px;
		padding: 5px;
	}
}
.media-left{
	img{
		display: block;
		width: 40px;
		border-radius: 5px;
	}
}
.img-list{
	list-style: none;
	margin: 0;
	padding: 0;
	li{
		float: left;
		width: calc(33.333333333333% - 6px);
		padding-bottom: calc(33.333333333333% - 6px);
		height: 0;
		margin: 2px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	&:after{
		display: block;
		content: '';
		clear: both;
	}
}
.extend-info{
	font-size: 10px;
	line-height: 3;
	white-space: nowrap;
	.col-xs-3{
		    padding-right: 5px;
    padding-left: 5px;
	}
	.zan-topic{
		font-size: 10px;
		display: inline-block;	
		cursor: pointer;
		line-height: 3;
	}
}
.video-list{
	video,audio{
		display: block;
		width: 100%;
	}
}
</style>