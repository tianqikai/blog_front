<template>
  <div id="nav">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header class="header">
        <!-- 导航栏 ------ container -->
        <narbar />
      </a-layout-header>
      <!-- <div style="margin-top:16px">11</div> -->
      <a-layout-content style="padding: 0 60px;margin-top:16px" class="content">
        <a-locale-provider :locale="locale">
          <div class="left" :style="{ background: '#fff', padding: '24px', minHeight: '720px' }">
            <router-view />
          </div>
        </a-locale-provider>
        <div class="rigth">
          <right />
        </div>
      </a-layout-content>
      <!-- 页脚 -->
      <a-layout-footer style="text-align: center">
        Ant Design ©2021 Created by QiKai Tian
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Narbar from '@/components/narbar'
import Right from '@/views/homepage/rigth/rigth'
// import Container from './components/container.vue'
export default {
  components: {
    Narbar,
    Right
  },
  data() {
    return {
      locale: zhCN
    }
  },
  created() {
    this.mouseScroll()
  },
  mounted() {
    this.initLive2d()
  },
  methods: {
    mouseScroll() {
      // 给页面绑定滑轮滚动事件
      if (document.addEventListener) { // firefox
        document.addEventListener('DOMMouseScroll', this.watchScroll, false)
      }
      // 滚动滑轮触发scrollFunc方法  //ie 谷歌
      window.onmousewheel = document.onmousewheel = this.watchScroll
    },
    initLive2d() {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-shizuku/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: '../live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json' },
          display: { position: 'right', width: 120, height: 240 },
          mobile: { show: true },
          log: false
        })
      }, 1000)
    },
    watchScroll(e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && this.show === false) {
          // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) {
          // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) {
          // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) {
          // 当滑轮向下滚动
          this.show = false
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 1800px;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.header{
  background-color: white !important;
  height: 70px  !important;
}
.content{
  display: flex;
  justify-content:space-around;
}
.left{
  width: 70%;
}
.rigth{
  background: cornsilk;
  width: 25%;
}
/* @media screen and (min-width: 1200px) {
    #nav {
      width: 1900px;
     background-color: lightgreen;
     zoom: (current screen width)/(480);
    }
} */
</style>
