var queryString = require('querystring')
var mysqlQuery = require('../mysql')
var utils = require('../utils')
const constConfig = require('../const')
//console.log(utils)
//console.log(queryString)
/**
 * 检查手机号是否重复注册
 */
function isPhoneCanuse(phoneNo) {
	return new Promise(function(resolve, reject) {
		var queryStr = `SELECT
						*
					FROM
						\`user\`
					WHERE user_mobile = '${phoneNo}'
					`
		mysqlQuery(queryStr).then(function(data) {
			if(!JSON.parse(data).data.length) {
				resolve(true)
			} else {
				reject(false)
			}
		}).catch(function(err) {
			reject('数据库查询错误')
		})
	})
}

function userRegister(req, res) {
	var regInfo = req[constConfig.body]
	isPhoneCanuse(regInfo.mobile).then(function() {
		if(!regInfo.passwordSubmit) {
			res.json({
				data: null,
				status: 401,
				messages: '密码必填'
			})
			return
		}
		if(regInfo.passwordSubmit !== regInfo.passwordConfirmSubmit) {
			res.json({
				data: null,
				status: 401,
				messages: '密码和确认密码不一致，请确认'
			})
			return
		}
		var now = new Date()
		var userId = utils.md5(regInfo.mobile + '' + (now - +now % 1000))
		var queryStr = `INSERT INTO \`user\` (
						\`user_id\`,
						\`user_name\`,
						\`user_mobile\`,
						\`user_birthday\`,
						\`user_sex\`,
						\`user_nick_name\`,
						\`user_head_img\`,
						\`create_datetime\`,
						\`update_datatime\`,
						\`status\`
					)
					VALUES
					(
						'${userId}',
						'${regInfo.name}',
						'${regInfo.mobile}',
						'${regInfo.birthday}',
						'${regInfo.sex}',
						'${regInfo.nickName||NULL}',
						'${regInfo.headImg}',
						'${utils.dateFormat(now)}',
						'${utils.dateFormat(now)}',
						1
					)`
		mysqlQuery(queryStr).then(function() {
			console.log('插入用户信息成功')
			var setPasswordSQL = `INSERT INTO \`user_authorization\` (
						\`user_id\`,
						\`password\`,
						\`update\`
					)
					VALUES
					(
						'${userId}',
						'${utils.md5(regInfo.passwordSubmit +''+ (now - +now % 1000))}',
						'${utils.dateFormat(now)}'
					)`
			mysqlQuery(setPasswordSQL).then(function() {
				console.log('设置密码成功')
				res.json({
					data: null,
					status: 200,
					messages: '注册成功'
				})
			}).catch(function(err) {
				res.json({
					data: null,
					status: 403,
					messages: err
				})
			})
		}).catch(function(err) {
			res.json({
				data: null,
				status: 403,
				messages: err
			})
		})
	}).catch(function() {
		res.json({
			data: null,
			status: 401,
			messages: '手机号已经注册'
		})
	})
}
module.exports = userRegister