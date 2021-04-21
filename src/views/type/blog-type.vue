<template>
  <div class="type-container">
    <div class="type-head">
      <div class="type-title">博客分类</div>
      <div class="type-count">共计{{ size }}个分类</div>
    </div>
    <div class="type-content" style="height:${height}">
      <div v-for="item in typeList" :key="item.typeId" class="typename">
        <li style="list-style-type:none" @click="BlogSelect(item.typeId)">
          {{ item.typeName }}
        </li>
      </div>
    </div>
    <div class="blog-list">
      <blog :blog-list="blogList" :flag="2" />
    </div>
  </div>
</template>
<script>
import blogApi from '@/api/blog'
import typeApi from '@/api/type'
import Blog from '@/components/Blog'
import { Message } from 'element-ui'
export default {
  components: {
    Blog
  },
  data() {
    return {
      typeList: [], // 分类列表
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: 'createdTime',
        sortMethod: 'desc',
        list: []
      },
      blogList: []
    }
  },
  created() {

  },
  mounted() {
    this.getTypeList()
  },
  methods: {
    open1() {
      this.$message({
        showClose: true,
        message: '这是一条消息提示'
      })
    },
    getTypeList() {
      typeApi.getList().then(res => {
        this.typeList = res.data
        this.size = this.typeList.length
        this.page.params.typeId = this.typeList[0].typeId
        blogApi.getByPage(this.page).then(res => {
          this.page = res.data
          this.blogList = this.page.list
        })
      })
    },
    BlogSelect(typeId) {
      console.log('博客类型：' + typeId)
      this.page.params.typeId = typeId
      blogApi.getByPage(this.page).then(res => {
        if (res.code === parseInt(process.env.VUE_APP_SUCCESS)) {
          this.page = res.data
          this.blogList = this.page.list
          console.log('length:' + res.data.list.length)
          // var height = (res.data.list.length / 8) * 40
          // if (res.data.list.length % 8 > 0) {
          //   height = +40
          // }
          // this.height = height + 'px'
          // console.log('111111111111111height:' + this.height)
          if (res.data.list.length === 0) {
            Message({
              showClose: true,
              message: '没有该类型的博客文章',
              type: 'warning'
            })
          }
        } else {
          Message({
            showClose: true,
            message: '查询出现错误！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
/* .alert{

  display: flex;
  justify-content: space-around;
  color: #FC5531;
} */
.type-container {
  background: #fff;
  padding: 40px 25px;
  height: 100%;
}
.type-head{
  width: 100%;
  height: 140px;
}
.type-head .type-title {
  width: 100%;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

.type-head .type-count {
  width: 100%;
  text-align: left;
  font-size: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: darkgrey;
  border-bottom: 1px solid darkgrey;
}

.type-content {
  width: 80%;
  min-height: 40px;
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-content:space-between;
}

.typename{
  height: 35px;
  width: 90px;
  line-height: 35px;
  text-align: center;
  font-size: 16px;
  float: left;
  margin-right: 10px;
  color: #52c41a !important;
}
.typename :hover{
  font-size: 18px;
  color: #FC5531;
  font-weight: bold;
}
.blog-list {
  margin-top: 20px;
}
</style>
