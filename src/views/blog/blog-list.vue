<template>
  <div>
    <div class="button-container">
      <div class="button-text">{{ name }}</div>
      <div class="button-menu">
        <a-menu v-model="current" mode="horizontal" @click="changeSort">
          <a-menu-item key="createdTime">
            最新
          </a-menu-item>
          <a-menu-item key="blogGoods">
            点赞最多
          </a-menu-item>
          <a-menu-item key="blogComment">
            评论最多
          </a-menu-item>
          <a-menu-item key="blogRead">
            阅读最多
          </a-menu-item>
          <a-menu-item key="blogCollection">
            收藏最多
          </a-menu-item>
        </a-menu>
      </div>
    </div>
    <!-- blog 列表 -->
    <div class="TypeBlogList">
      <blog :blog-list="blogList" :flag="1" />
    </div>

    <div class="blog-pagination">
      <a-pagination :show-total="total => `共 ${total} 条`" show-quick-jumper :default-current="1" :total="page.totalCount" @change="pageChange" />
    </div>

  </div>
</template>

<script>
import blogApi from '@/api/blog'
import Blog from '@/components/Blog'
// import Blog from '../../components/Blog.vue'
export default {
  components: {
    Blog
  },
  props: {
    name: {
      type: String,
      default: '博客'
    }
  },
  data() {
    return {
      current: ['createdTime'],
      blogBodyStyle: {
        padding: '18px'
      },
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
    if (this.$route.params.type) {
      this.page.params.typeId = this.$route.params.type
    }
    this.getByPage()
  },
  methods: {
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      this.getByPage()
    },
    getByPage() {
      blogApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.blogList = this.page.list
      })
    },
    changeSort(e) {
      this.page.sortColumn = e.key
      this.getByPage()
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5px;
  align-items: center;
  line-height: 70px;
}
.button-text {
  font-size: 20px;
}

.ant-menu-horizontal {
  border-bottom: none !important;
}

.ant-menu {
  background: none !important;
}

a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #3e4149;
}
</style>
