import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import zhCNAnTd from 'ant-design-vue/lib/locale-provider/zh_CN'
// import Antd_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
Vue.use(Antd)
// 音乐播放器
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})

// 引入阿里妈妈icon 图标
import '@/assets/iconfont/iconfont.js'
// 引入swiper组件
// import 'swiper/dist/css/swiper.min.css'
// import 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// 引入 elementui 插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n 英文
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n 中文
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 视频播放器插件
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

// 代码高亮插件
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS)
import hljs from 'highlight.js'
Vue.directive('hljs', el => {
  const blocks = el.querySelectorAll('pre code')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

// npm install moment --save Moment插件格式化时间
import Moment from 'moment'
// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
