<!-- bolg详细信息-->
<template>
  <div class="blog-list-container">
    <a-card v-for="item in blogList" :key="item.blogId" :body-style="blogBodyStyle" class="blog-card">
      <div class="blog-main">
        <div v-if="item.blogImage" class="blog-image">
          <img :src="item.blogImage" class="blog-cover">
        </div>
        <router-link :to="'/info/'+item.blogId" :class="item.blogImage ? 'image-blog' : 'blog-container'">
          <div class="blog-title">{{ item.blogTitle }}</div>
          <div class="blog-comment">{{ item.blogRemark }}</div>
          <div class="blog-bottom">
            <div class="blog-type">
              分类：<a-tag color="green">{{ item.typeName }}</a-tag>
            </div>
            <div class="blog-meta">
              <div class="blog-time">{{ item.createdTime| formatDate }}</div>
              <div class="blog-other">
                <a-icon type="eye" /> {{ item.blogRead }}
                <a-icon type="heart" /> {{ item.blogCollection }}
                <a-icon type="like" /> {{ item.blogGoods }}
                <a-icon type="message" /> {{ item.blogComment }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  // props: {
  //   blogList: {
  //     type: Object,
  //     default() {
  //       return {}
  //     }
  //   }
  //   // flog: {
  //   //   type: Boolean,
  //   //   default: true
  //   // }
  // },
  props: [
    'blogList',
    'flag'// css样式标识
  ],
  data() {
    return {
      blogBodyStyle: {
        padding: '18px'
      }
    }
  },
  created() {
    console.log('created flag :' + this.flag)
  },
  mounted() {
    this.setCss()
  },
  methods: {
    // 设置blog的样式
    setCss() {
      const that = this
      var flag = that.flag
      if (flag === 1) {
        require('../assets/blog/blog1.css')
      } else {
        require('../assets/blog/blog2.css')
      }
    }
  }
}
</script>

<style scoped>
/* 分号一定要写，要不会报错 */
/* @import '../assets/blog/blog.css'; */
</style>
