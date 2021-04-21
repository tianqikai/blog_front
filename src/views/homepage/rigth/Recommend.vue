<template>
  <div>
    <a-card title="推荐阅读" :head-style="headStyle" :body-style="bodyStyle">
      <router-link v-for="blog in page.list" :key="blog.blogId" :to="'/info/'+blog.blogId" class="blog-title-container">
        <div class="blog-title">{{ blog.blogTitle }}</div>
        <div class="blog-type">分类：<a-tag color="green">{{ blog.typeName }}</a-tag></div>
        <div class="blog-bottom">
          <span class="blog-time">{{ blog.created| formatDate }}</span>
          <span class="blog-count">
            <a-icon type="eye" />{{ blog.blogRead }}
            <a-icon type="heart" />{{ blog.blogCollection }}
            <a-icon type="like" />{{ blog.blogGoods }}
            <a-icon type="message" />{{ blog.blogComment }}
          </span>
        </div>
      </router-link>
    </a-card>
  </div>
</template>
<script>
import blogApi from '@/api/blog'
export default {
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        borderLeft: '5px solid #409eff',
        paddingLeft: '20px',
        lineHeight: '15px'
      },
      bodyStyle: {
        maxHeight: '550px',
        overflow: 'hidden'
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sorted: {
          createdTime: 'desc'
        }
      }
    }
  },
  created() {
    this.getBlogPage()
  },
  methods: {
    getBlogPage() {
      blogApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>
<style scoped>
.ant-card-bordered {
  border: none;
}
.ant-card-head {
  padding: 0;
}
.blog-title-container {
  color: #3e4149;
  margin: 10px 0;
  display: block;
}
.blog-title-container:hover {
  color: #3e4149;
}
.blog-title {
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.blog-type {
  margin: 15px 0;
}
.blog-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #9c9ea8;
}
.blog-count {
  color: #3e4149;
}
.blog-time{
  color: #3e4149;
}
</style>
