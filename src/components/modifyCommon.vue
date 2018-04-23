<template>
  <div class="container-fluid">
    {{type}}
    <div class="modify-container">
      <input :type="type" placeholder="" class="form-control" v-model="nValue">
      <div class="row btns">
        <div class="col-xs-6 text-center">
          <button class="btn btn-default" @click="$router.go(-1)">放弃修改</button>
        </div>
        <div class="col-xs-6">
          <button class="btn btn-primary to-modify" :disabled="!nValue || nValue===oValue" @click="saveModified()">保存修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    let query = this.$route.query
    let val = query.nickName || query.mobile || query.birthday
    return {
      nValue: val,
      oValue: val,
      type: (() => {
        console.log(this)
        let route = this.$route.path
        console.log(this.$route)
        return route.indexOf('mobile') > -1 ? 'tel' : route.indexOf('birthday') > -1 ? 'date' : 'text'
      })()
    }
  },
  methods: {
    saveModified () {
      var apis = this.apis
      loading.show = true
      loading.texts = '信息更新中...'
      let query = this.$route.query
      let val = query.nickName || query.mobile || query.birthday
      let type = query.mobile?'user_mobile':query.birthday?'user_birthday':'user_nick_name'
      apis.updeteInfo({
        type,
        value: this.nValue
      }).then(res => {
        this.$router.go(-1)
      }).fail(err => {
        alert('更新失败')
      })
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.btns,
.form-control {
  margin-top: 20px;
}
</style>