<template>
  <div>
    <div class="app-view">
      <transition :name="transition">
        <router-view/>
      </transition>
    </div>
    <div class="app-menu">
      <router-link to="/topic-list" replace>活动列表</router-link>
      <router-link to="/publish-topic" replace>发布活动</router-link>
      <router-link to="/user-info" replace>我的</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      loading,
      transition: 'fade'
    }
  },
  watch: {
    $route (n, o) {
      let nPathLen = n.fullPath.split('/').length
      let oPathLen = o.fullPath.split('/').length
      console.log(nPathLen)
      console.log(oPathLen)
      if (nPathLen > oPathLen) {
        this.transition = 'slide-right'
      } else if (nPathLen < oPathLen) {
        this.transition = 'slide-left'
      } else {
        this.transition = 'fade'
      }
    }
  }
}
</script>