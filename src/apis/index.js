let baseUrl = 'http://10.18.200.188:8889/'
let ajax = $.ajax
let intercept = function (ajaxOpts) {
	//	return  new Promise (function (resolve,reject) {
	//		 ajax(ajaxOpts).then(function (res) {
	//		 	resolve(res)
	//		 }).fail(function (err) {
	//		 	reject(err)
	//		 })
	//	})
	if (ajaxOpts.headers) {
		$.extend(ajaxOpts.headers,{
			token:localStorage.getItem('_bb_growth_')
		})
	}else{
		ajaxOpts.headers = {}
		ajaxOpts.headers.token = localStorage.getItem('_bb_growth_')
	}
	let promise = $.Deferred()
	ajax(ajaxOpts).then(function (res) {
		if(res.status === 200){
			promise.resolve(res)
		}else{
			promise.reject(res)
		}
	}).fail(function (err) {
		promise.reject(err)
	})
	return promise.promise()
}

let apis = {
	rejectHander (err) {
		if(err.status === 403){
			let queryStr = this.utils.setPathQuery(this.$route.redirectedFrom || this.$route.fullPath)
			this.$router.replace('/login' + (queryStr ? ('?' + queryStr) : ''))
		}
	},
	getPhoneNos (data) {
		return intercept({
			type: 'get',
			url: baseUrl + 'phones'
		})
	},
	registe (data) {
		return intercept({
			type: 'post',
			data,
			url: baseUrl + 'register'
		})
	},
	login (data) {
		return intercept({
			type: 'post',
			data,
			url: baseUrl + 'login'
		})
	},
	getUserList (data) {
		return intercept({
			type: 'get',
			data,
			url: baseUrl + 'user/getUserList'
		})
	},
	getUserInfo (user_id) {
		return intercept({
			type: 'get',
			// data: { user_id },
			url: baseUrl + 'user/getInfo'
		})
	},
	publishTopic (data) {
		return intercept({
			type: 'post',
			data,
			url: baseUrl + 'publishTopic'
		})
	},
	getTopicList (data) {
		return intercept({
			type: 'get',
			data,
			url: baseUrl + 'getTopics'
		})
	},
	getMyTopics (data) {
		return intercept({
			type: 'get',
			data,
			url: baseUrl + 'getMyTopics'
		})
	},
	zanTopic (id) {
		return intercept({
			type: 'get',
			data: { id },
			url: baseUrl + 'zanTopic'
		})
	},
	updateHeadImg (data) {
		return intercept({
			type: 'post',
			data,
			url: baseUrl + 'user/updateHeadimg'
		})
	},
	updeteInfo (data) {
		return intercept({
			type: 'post',
			data,
			url: baseUrl + 'user/updeteInfo'
		})
	},
	uploadImg (blob, path) {
		var formData = new FormData()
		formData.append('img_key', blob, (function (type) {
			let exName = type.split('/')[1].toLocaleLowerCase()
			exName == 'jpeg'?exName='jpg':undefined
			return 'img_key.'+exName
		})(blob.type))
		return $.ajax({
			type: 'post',
			data: formData,
			//			processData: false,
			//          contentType:undefined,
			//          mimeType:"multipart/form-data",
			processData: false,
			contentType: false,
			url: baseUrl + 'uploadMedia/' + path
		})
	}
}

export default apis

