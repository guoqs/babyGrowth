export default function(vue) {
	vue.filter('dateFormat', function(date,params) {
		let tDate = new Date(date)
		let d = tDate.toString() === 'Invalid Date' ? new Date() : tDate
		let yyyy = d.getFullYear()
		let mm = d.getMonth() + 1
		mm = mm > 9 ? mm : '0' + mm
		let dd = d.getDate()
		dd = dd > 9 ? dd : '0' + dd
		let hh = d.getHours()
		hh = hh > 9 ? hh : '0' + hh
		let minute = d.getMinutes()
		minute = minute > 9 ? minute : '0' + minute
		let ss = d.getSeconds()
		ss = ss > 9 ? ss : '0' + ss
		let res = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minute + ':' + ss
		return params?res.substring(0,params.length):res
	})
}