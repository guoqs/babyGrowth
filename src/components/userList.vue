<template>
	<div class="container-fluid" v-if="userList.length">
		<button class="btn btn-primary" id="get-list" @click="getUserList()">获取信息</button>
		<!--<button class="btn btn-primary" id="get-phones" @click="getPhoneNos()">获取手机号</button>
		<div >{{phonesNos.length}}</div>
		<hr />-->
		<div v-for="(no,idx) in phonesNos" :key="idx">{{no}}</div>
		<hr />
		<div class="table-responsive user-list">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>序号</th>
						<th>图像</th>
						<th>名称</th>
						<th>手机号</th>
						<th>昵称</th>
						<th>生日</th>
						<th>创建时间</th>
						<th>最近更新</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody v-if="userList.length">
					<tr v-for="(item,idx) in userList" :key="idx">
						<td>{{idx+1}}</td>
						<td><img :src="item.user_head_img || '//10.18.200.188:8889/uploads/default.jpg'" :alt="item.user_name" :title="item.user_name" /></td>
						<td>{{item.user_name}}</td>
						<td>{{item.user_mobile}}</td>
						<td>{{item.user_nick_name}}</td>
						<td>{{item.user_birthday}}</td>
						<td>{{item.create_datetime | dateFormat}}</td>
						<td>{{item.update_datatime | dateFormat}}</td>
						<td>{{item.status}}</td>
						<td>
							<router-link :to="'/user-info/'+item.user_id">查看详情</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userList: [],
				phonesNos:[]
			}
		},
		created () {
			this.getUserList()
		},
		methods: {
			getUserList(page) {
				loading.show = true
				var apis = this.apis
				var req = this.req
				$('#get-list').prop('disabled','disabled').html('数据加载中...')
				apis.getUserList({
					page,
					row: this.row
				}).then(res => {
					this.userList = res.data
				}).fail(function() {
					alert('error')
				}).always(function() {
					$('#get-list').removeProp('disabled','disabled').html('获取信息')
					loading.show = false
				})
			},
			getPhoneNos () {
				var apis = this.apis
				$('#get-phones').prop('disabled','disabled').html('数据加载中...')
				apis.getPhoneNos().then(res => {
					console.log(res)
					this.phonesNos = JSON.parse(res).data.sort((f,s) => {
						return f > s ? 1:-1
					})
				}).fail(function() {
					alert('error')
				}).always(function() {
					$('#get-phones').removeProp('disabled','disabled').html('获取手机号')
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
	.user-list {
		margin: 5px;
	}
	
	table {
		img {
			display: block;
			width: 80px;
			margin: 0 auto;
		}
		td,
		th {
			vertical-align: middle !important;
			text-align: center !important;
		}
	}
</style>