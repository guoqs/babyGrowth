
export default {
  setPathQuery (path) {
    let pathArr = path[0] === '/' ? path.substring(1).split('/') : path.split('/')
    let searchs = ''
    if (pathArr[pathArr.length - 1].indexOf('?') > -1) {
      let searchArr = pathArr[pathArr.length - 1].split('?')
      pathArr[pathArr.length - 1] = searchArr[0]
      searchs = searchArr[1]
    }
    let resQuery = ''
    pathArr.forEach((item, idx) => {
      // 第一个一般为空，避免出现空白路径
      if (item) {
        if (!resQuery) {
          resQuery += 'route' + idx + '=' + item
        } else {
          resQuery += '&route' + idx + '=' + item
        }
      }
    })
    if (searchs) {
      let searchItems = searchs.split('&')
      searchItems.forEach(function (item, idx) {
        let itemArr = item.split('=')
        resQuery += '&rsearch' + idx + '=' + itemArr[0] + '_' + itemArr[1]
      })
    }
    return resQuery
  },
  /**
   * 
   * @param {*} imgSrc 一个图片网址
   * @param {*} flag  裁剪方式，0 不裁剪，1 去上面（左边） 2 取中间  3 取下面（右边）
   * @param {*} size 生成图片的大小 分辨率 w * h
   * Promise resolve {blob:blob,src:src}
   */
  sliceImg(imgSrc,flag,size,type){
    return new Promise(function (resolve,reject) {
      let img = document.createElement('img')
      let canvas = document.createElement('canvas')
      let can2d = canvas.getContext('2d')
      let _size
      img.addEventListener('load',function(){
        let nw = img.naturalWidth
        let nh = img.naturalHeight
        // 如果不裁剪 
        if (!flag) {
          _size = size || nw * nh
          canvas.width = Math.sqrt(_size * nw/nh)
          canvas.height = Math.sqrt(_size * nh/nw)
          can2d.drawImage(this,0,0,nw,nh,0,0,canvas.width, canvas.height)
        } else {
          // 如果裁剪就裁剪一个正方形
          let clipLong = nw>nh?nh:nw
          _size = size || clipLong * clipLong
          canvas.width = canvas.height = Math.sqrt(_size)
          if(flag==1){
            can2d.drawImage(this,0,0,clipLong,clipLong,0,0,canvas.width, canvas.height)
          }else if(flag==2){
            can2d.drawImage(this,(nw-clipLong) / 2,(nh-clipLong) / 2,clipLong,clipLong,0,0,canvas.width, canvas.height)
          } else  if(flag==3){
            can2d.drawImage(this,nw-clipLong,nh-clipLong,clipLong,clipLong,0,0,canvas.width, canvas.height)
          } else {
            let redirectStr = '你输入裁剪标识('+flag+')不对，必须是 0，1，2，3'
            console.error(redirectStr)
            reject(redirectStr)
          }
        }
        canvas.toBlob(function (blob) {
          resolve({
            blob,
            src:URL.createObjectURL(blob)
          })
        },type||'image/png',.8)
      },false)
      img.addEventListener('error',function(){
        reject('sliceImg ('+ imgSrc +') 图片加载出错')
      },false)
      img.src = imgSrc
    })
  }
}