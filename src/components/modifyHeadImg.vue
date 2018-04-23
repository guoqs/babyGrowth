<template>
  <div class="modify-head-img container-fluid">
    <span>tips:点击图像进行修改</span>
    <div class="headimg-container bg-img-center" @click="selectImg()" :style="'background-image: url('+(nHeadImg?nHeadImg.src:oHeadImg)+');'">
    </div>
    <input type="file" id="input-file" accept="image/jpg,image/jpeg,image/png">
    <div class="row btns">
      <div class="col-xs-6 text-center">
        <button class="btn btn-default" @click="goback()">放弃修改</button>
      </div>
      <div class="col-xs-6">
        <button class="btn btn-primary to-modify" :disabled="!nHeadImg" @click="modifyHeadImg()">保存修改</button>
      </div>
    </div>
    <div>
    <div class="modal fade" id="clip-head-img" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">选择图片裁剪方式(用户图像需为正方形)</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-3" v-for="(val,idx) in 4" :key="idx" @click="clipType=idx">
                <div class="cilp-type" :class="'cilp-type-'+ idx+' '+(clipType==idx?'selected':'')" :style="'background-image: url('+tempUrl+');'"></div>
              </div>
              <!-- <div class="col-xs-4" >
                <div class="cilp-type" :style="'background-image: url('+tempUrl+');'"></div>
              </div>
              <div class="col-xs-4" >
                <div class="cilp-type" :style="'background-image: url('+tempUrl+');'"></div>
              </div>
              <div class="col-xs-4" >
                <div class="cilp-type" :style="'background-image: url('+tempUrl+');'"></div>
              </div> -->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="$('#clip-head-img').modal('hide')">取消</button>
            <button type="button" class="btn btn-primary" @click="clipImg()">确定</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      oHeadImg: this.$route.query.headImg,
      nHeadImg: null,
      isListenFile: false,
      tempUrl:'',
      clipType:2
    }
  },
  methods: {
    $,
    selectImg () {
      let inputFile = document.getElementById('input-file')
      if (!this.isListenFile) {
        inputFile.addEventListener('change', () => {
          let nFile = inputFile.files[0]
          // let src = URL.createObjectURL(nFile)
          this.tempUrl = URL.createObjectURL(nFile)
          // this.clipImg (2)
          inputFile.value = ''
          $('#clip-head-img').modal('show')
        }, false)
        this.isListenFile = true
      }
      inputFile.click()
    },
    clipImg () {
      let clipType = this.clipType
      let flag = clipType===0?-1:4-clipType
      this.utils.sliceImg(this.tempUrl,flag,640*640,'image/jpeg').then(res=>{
        console.log(res)
        this.nHeadImg = res
         $('#clip-head-img').modal('hide')
      }).catch(er=>{
        console.error(er)
      })
    },
    goback () {
      this.$router.go(-1)
    },
    modifyHeadImg () {
      var apis = this.apis
      let modifyBtn = $('.to-modify')
      modifyBtn.prop('disabled','disabled').html('图像更新中...')
      apis.uploadImg(this.nHeadImg.blob, 'headImgs').then(res => {
        //					console.log(res)
        apis.updateHeadImg({
          src: res.data
        }).then(res => {
          this.goback()
        }).fail(err => {
          alert('图像更新失败')
        })
      }).fail(err => {
        alert('图像更新失败')
      }).always(()=>{
        modifyBtn.removeProp('disabled').html('保存修改')
      })
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.headimg-container {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  border-radius: 5px;
  img {
    max-width: 90%;
  }
}
.modify-head-img {
  span {
    line-height: 3;
    color: #999;
    padding: 0 10px;
    display: block;
  }
}
[type="file"] {
  display: none;
}
.btns {
  margin-top: 20px;
}
.modify-head-img .modal-header span{
  line-height: 1;
}
#clip-head-img {
  h4{
    font-size: 12px;
  }
  .col-xs-3{
    padding: 3px;
  }
  .cilp-type{
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    background-repeat: no-repeat;
    border: 2px solid transparent;
    border-radius: 3px;
    transition-duration: .3s;
    &.selected{
      border-color: red;
    }
    &.cilp-type-0{
      background-size: contain;
      background-position: center;
    }
    &.cilp-type-1{
        background-size: cover;
        background-position: right bottom;
    }
    &.cilp-type-2{
        background-size: cover;
        background-position: center;
    }
    &.cilp-type-3{
        background-size: cover;
        background-position: left top;
    }
  }
  // .modal-body {
  //   .col-xs-4{
  //     padding-bottom: 33.3333333333%;
  //     height: 0;
  //     background-repeat: no-repeat;
  //     background-position: center;
  //     &:nth-child(1){
  //       background-size: cover;
  //     }
  //     &:nth-child(2){
  //       background-size: contain;
  //     }
  //     &:nth-child(3){

  //     }
  //   }
  // }
}
</style>