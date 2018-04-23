<template>
	<div id=app>
		<transition :name="transition">
			<router-view/>
		</transition>
		<!-- <div class="app-view">
			<transition :name="transition">
    		<router-view/>
			</transition>
		</div>
		<div class="app-menu">
				<router-link to="/topic-list" replace>活动列表</router-link>
				<router-link to="/publish-topic" replace>发布活动</router-link>
				<router-link to="/user-info" replace>我的</router-link>
		</div> -->
		<div id="loading" v-show="loading.show">
			<div class="loading-zhuan">
			</div>
			<p style="color: #ddd;">{{loading.texts}}</p>
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
	mounted () {
		console.log(this.loading)
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

<style lang="scss" type="text/css">
// 动画
.app-view {
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active {
  transition-duration: 0.3s;
  transform: translateX(0);
}
.slide-right-leave-active {
  transition-duration: 0.3s;
  transform: translateX(-50%);
}
.slide-right-enter {
  opacity: 0.5;
  transform: translateX(50%);
}
.slide-right-leave-to {
  opacity: 0.5;
  transform: translateX(-100%);
}

.slide-left-enter-active {
  transition-duration: 0.3s;
  transform: translateX(0);
}
.slide-left-leave-active {
  transition-duration: 0.3s;
  transform: translateX(50%);
}
.slide-left-enter {
  opacity: 0.5;
  transform: translateX(-50%);
}
.slide-left-leave-to {
  opacity: 0.5;
  transform: translateX(100%);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
  .app-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 40px;
    right: 0;
    overflow: auto;
  }
  .app-menu {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 40px;
    box-shadow: 0 -2px 2px #eee;
    display: flex;
    a {
      display: block;
      text-decoration: none;
      flex: 1;
      line-height: 40px;
      text-align: center;
      position: relative;
      &:not(:last-child) {
        border-right: 1px solid #f6f6f6;
      }
      &:after {
        content: "";
        display: block;
        height: 2px;
        background-color: red;
        position: absolute;
        bottom: 0;
        z-index: 1;
        width: 0;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
        left: 50%;
        transform: translateX(-50%);
      }
      &.router-link-active::after,
      &:hover::after {
        width: 100%;
      }
    }
  }
}
/*#loading{
	text-align: center;
	padding-top: 80px;
	.loading-zhuan{
		width: 80px;
		height: 80px;
		position:  relative;
		margin:auto;
	}
}*/
#loading {
  height: 100%;
  position: relative;
	background-color: rgba(0,0,0,.3)
}
.bg-img-center {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
 /*#loading{
	text-align: center;
	padding-top: 80px;
	.loading-zhuan{
		width: 80px;
		height: 80px;
		position:  relative;
		margin:auto;
	}
	 .loading-zhuan-item{
			width: 30px;
			height: 0;
			border-width: 2px;
			border-style: solid;
			margin:auto;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			@for $i from 1 through 12 {
			  &:nth-child(#{$i}){
					border-color: lighten(#000,$i/12);
			  }
			}
		}
}*/