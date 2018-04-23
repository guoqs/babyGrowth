<template>
  <div class=" container-fluid">
    <h3>修改性别</h3>
    <div class="sex-list">
    <input type="radio" :value="0" id="sex0" v-model="sex">
    <input type="radio" :value="1" id="sex1" v-model="sex">
    <input type="radio" :value="2" id="sex2" v-model="sex">
    <label for="sex1" :class="sex==1?'cur':''" @click="changeSex()">男</label>
    <label for="sex2" :class="sex==2?'cur':''" @click="changeSex()">女</label>
    <label for="sex0" :class="sex==0?'cur':''" @click="changeSex()">未知</label>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      sex: this.$route.query.sex,
    }
  },
  methods:{
    changeSex () {
      // console.log(this.sex)
    }
  },
  watch:{
    sex(n){
      var apis = this.apis
      if(typeof n === 'number'){
        loading.show = true
        loading.texts = '信息更新中...'
        apis.updeteInfo({
          type:'user_sex',
          value:n
        }).then(res => {
          this.$router.go(-1)
        }).fail(err => {
          alert('更新失败')
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
[type="radio"] {
  display: none;
}
label{
  display: block;
  position: relative;
  line-height: 2.5;
  margin-bottom: 0;
  cursor: pointer;
  transition-duration: .3s;
  padding:  0 10px;
  &:active{
    background-color: #eee;
  }
  &::after{
    display: block;
    position: absolute;
    content: '';
    transform: translateY(-50%) rotate(45deg);
    right: 10px;
    top:50%;
    color: red;
    border-style: solid;
    border-color: transparent;
    border-width: 2px;
    height: 10px;
    width: 6px;
    transition-duration: .3s;
    transition-property: border-color;
  }
  &.cur::after{
    border-color: transparent  red red  transparent;
  }
  &:not(:last-child){
    border-bottom: 1px solid #f6f6f6;
  }
}
</style>