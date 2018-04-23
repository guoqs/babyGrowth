var http = require('http')
var querystring = require('querystring');
console.log(querystring)
var contents = querystring.stringify({
	//信阳
//	p: '609904',
//	c: '8411500'
//深圳
	p: '600101',
	c: '8440300'
});
//console.log(http)
module.exports = function() {
	var promise = new Promise(function(resolve, reject) {
//		连尚万能卡申领
		//http://cservice.client.189.cn:88/sh/order/phones/0000000066186243D91C6EEEE053AA1410ACFC0B
		var options = {
			host: 'cservice.client.189.cn',
			path: '/sh/order/phones/0000000066186243D91C6EEEE053AA1410ACFC0B',
			method: 'POST',
			port: 88,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': contents.length
			}
		}

		var req = http.request(options, function(res) {
			res.setEncoding('utf8');
			var resData  = ''
			var times = 1
		    res.on('data',function(data){
//		        console.log("data:",data); 
//				resolve(data)
				resData += data
		    });
		    res.on('end',function(data){
//		        console.log("data:",data); 
//				resolve(data)
//				resData += data
//		    	console.log(resData)
				resolve(resData)
		    });
		});
		req.write(contents);
		req.end();
		req.on('error', function(e) {
			console.error("error:" + e);
			return "系统异常：" + e.message;
			reject(e)
		})
	})
	return promise
}