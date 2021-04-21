<template>
  <div>
    <div class="contain-title">
      <!-- 轮播图 -->
      <div class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="@/assets/carousel.gif">
          </swiper-slide>
          <swiper-slide>
            <img src="@/assets/carousel.gif">
          </swiper-slide>
          <!-- 如果需要分页器 -->
          <div slot="pagination" class="swiper-pagination" />
          <!-- 如果需要导航按钮 -->
          <div slot="button-prev" class="swiper-button-prev" />
          <div slot="button-next" class="swiper-button-next" />
          <!-- 如果需要滚动条 -->
          <div slot="scrollbar" class="swiper-scrollbar" />
        </swiper>
      </div>
      <div class="video-Player">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
        />
        <!-- <a-carousel effect="fade">
          <img src="@/assets/springboot.jpg">
          <img src="@/assets/carousel.gif">
        </a-carousel> -->
      </div>
    </div>
    <div>
      <blog :component-name="'博客'" />
    </div>
  </div>
</template>

<script>
import Blog from '@/views/blog/blog-list.vue'
import videoApi from '@/api/video'
export default {
  components: {
    Blog
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: 'http://49.232.21.151/group1/M00/00/00/rBUAEGBWBMmASf67ADfppletxbE074.mp4' // url地址
        }],
        hls: true,
        poster: 'http://49.232.21.151/group1/M00/00/00/rBUAEGBWBL-AZky_AACIH9Hg8Us464.jpg', // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          remainingTimeDisplay: false, // 剩余播放时间
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏按钮
        }
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
          hideOnClick: true // 默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
        },
        speed: 2000, // 设置side滑动开始到结束时间多长,单位ms
        autoplay: 2000, // Swiper3的正确用法
        // 使用Swiper4/5/6的版本书写样式为
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false // 手动切换之后继续自动轮播
        //   // reverseDirection: true,   //开启反向自动轮播。
        // },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  created() {
    this.getVideoByID()
  },
  methods: {
    getVideoByID() {
      videoApi.get(1).then(res => {
        this.playerOptions.sources[0].src = res.data.url
        this.playerOptions.poster = res.data.cover
      })
    }
  }
}
</script>

<style scoped>
  .contain-title{
      display: flex;
      justify-content: space-between;
      /* margin-right: 10px; */
  }
  .video-Player{
      width: 35%;
      height: 250px;
      margin-left: 5px;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
      margin-right: 4px;
  }
  .swiper{
      width: 65%;
      height: 250px !important;
  }
  .swiper-container{
        height: 250px;
        width: 100%;
   }
  .swiper-wrapper .swiper-slide
  {
    width: 100%;
    height: 100%;
    background-color: #42b983;
    text-align: center;
    line-height: 250px;
  }
.swiper-button-prev{
    background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23CCCCFF'%2F%3E%3C%2Fsvg%3E");
}
.swiper-button-next{
    background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23CCCCFF'%2F%3E%3C%2Fsvg%3E");
}
</style>
