const fs = require('fs');
const path = require('path');
const constConfig = require('../const')
const express = require('express')
const multer = require('multer')
const utils = require('../utils')
const mysqlQuery = require('../mysql')
const upload = multer({
	dest: 'uploads/'
})
var uploadRouter = express.Router()
uploadRouter.post('/uploadMedia/:singlePath', upload.single('img_key'), function(req, res, next) {
	// req.file is the `avatar` file 
	// req.body will hold the text fields, if there were any
//	console.log(req.params)
//	console.log(req.file)
	let singlePath = req.params.singlePath
	if(['topicImgs','topicVideos','topicMusic','headImgs'].indexOf(singlePath) === -1){
		res.json({
			status: 401,
			message: '路径失败，必须是topicImgs,topicVideos,topicMusic,headImgs其中的一个',
			data: null
		});
	}
	if(!req.file) {
		res.json({
			status: 500,
			message: '上传失败！！！估计是姿势不对，换个姿势再试一次',
			data: null
		});
		return;
	}
	var file = req.file
	var data = +new Date()
	var name = 'baby-growth-'+ (utils.dateFormat(data).substring(0,10)) + '-' + (data % (24*60*60*1000))
	var nFilename = name + file.originalname.substring(file.originalname.lastIndexOf('.'))
	var newPath = path.join(__dirname + '/../../', 'uploads/' + req.params.singlePath);
	function reNameFile (oPath,nPath) {
		fs.rename(oPath, nPath, function(err) {
			if(err) {
				res.json({
					status:500,
					message:'上传失败',
					data:null
				});
			} else {
				res.json({
					status:200,
					message:'上传成功',
					data:'//'+constConfig.localIds[0] +':'+ constConfig. port + '/uploads/' + req.params.singlePath +'/'+ nFilename
				});
			}
		})
	}
	fs.exists(newPath, function (exists) {
//		if(exists){
//			newPath = path.join(newPath,nFilename)
//			reNameFile(file.path,newPath)
//		} else {
//			fs.mkdir(newPath, function (msg){
//				console.log(msg)
//				newPath = path.join(newPath,nFilename)
//				reNameFile(file.path,newPath)
//			});
//		}
		if(!exists){
			fs.mkdirSync(newPath)
		}
		newPath = path.join(newPath,nFilename)
		reNameFile(file.path,newPath)
	});
	
})
module.exports = uploadRouter