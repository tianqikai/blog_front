<template>
  <div>
    <div class="blog-bg">
      <div class="blog-title">{{ blog.blogTitle }}</div>
      <div class="blog-item">
        <div class="blog-time">发布时间：{{ blog.createdTime | formatDate }}</div>
        <div class="blog-meta">
          <a-icon type="eye" /> {{ blog.blogRead }}阅读
          <a-icon type="heart" /> {{ blog.blogCollection }}收藏
          <a-icon type="like" /> {{ blog.blogGoods }}点赞
        </div>
      </div>
      <div v-hljs class="blog-content" v-html="blog.blogContent" />
      <div v-if="user.username" class="blog-action">
        <a href="javascript:void(0);" :class="isGood ? ' meta-active' : 'blog-good'" @click="saveGoods">
          <a-icon type="like" /> 点赞
        </a>
        <!-- href=”javascript:void(0);”这个的含义是，让超链接去执行一个js函数，而不是去跳转到一个地址，而void(0)表示一个空的方法，也就是不执行js函数。 -->
        <a href="javascript:void(0);" :class="isCollection ? 'meta-active' : 'blog-collection'" @click="saveCollection">
          <a-icon type="heart" /> 收藏
        </a>
      </div>
    </div>

    <div v-if="user.username" class="user-comment">
      <a-textarea v-model="content" placeholder="请输入内容，不超过300字" :rows="4" />
      <div class="comment-button">
        <a-button type="primary" @click="saveComment">发表评论</a-button>
        <div v-show="countShow" class="content-count">
          还能输入 {{ commentContentCount }} 个字符
        </div>
      </div>
    </div>

    <div v-for="item in commentList" :key="item.id" class="comment-bg">
      <div class="comment-header-container">
        <div class="comment-header">
          <img :src="item.user.header" class="comment-img">
        </div>
        <div class="comment-container">
          <div class="comment-nickname">{{ item.user.nickname }}</div>
          <div class="comment-time">发表于 {{ item.createdTime | formatDate }}</div>
          <div class="comment-content">{{ item.commentContent }}</div>
        </div>
      </div>
      <a v-if="user.username" href="javascript:void(0);" :class="item.commentFlag ? 'comment-good meta-active': 'comment-good'" @click="saveCommentGoods(item)"><a-icon type="like" /> {{ item.commentGood }}</a>
    </div>
  </div>
</template>

<script>
import blogApi from '@/api/blog'
import commentApi from '@/api/comment'
export default {
  data() {
    return {
      content: '',
      blog: {},
      isGood: false, // 判断是否已经点赞
      isCollection: false, // 判断是否已经收藏
      user: {
        username: ''
      },
      commentList: [], // 评论列表
      countShow: false, // 控制是否显示字符个数提示
      commentContentCount: 300 // 显示还能输入的字符数量
    }
  },
  watch: {
    'content': function(newVal, oldVal) {
      if (this.content.length > 300) {
        this.content = this.content.substring(0, 300)
      }
      if (this.content.length > 0) {
        this.countShow = true
      } else {
        this.countShow = false
      }
      const newValLength = newVal ? newVal.length : 0
      const oldValLength = oldVal ? oldVal.length : 0
      this.commentContentCount = this.commentContentCount - (newValLength - oldValLength)
    },
    '$route.params.id': function(newVal, oldVal) {
      this.getBlogInfo(newVal)
      this.getComment()
      this.getGoods()
      this.getCollection()
    }
  },
  created() {
    // 在Vue实例创建完毕执行
    // blog id
    const blogId = this.$route.params.id
    // 获取博客信息
    this.getBlogInfo(blogId)
    // 根据博客id获取评论列表
    this.getComment()
    // 查询点赞
    this.getGoods()
    // 查询收藏
    this.getCollection()
    // 获取用户信息
    this.user = this.$store.getters.getUser
  },
  methods: {
    // 获取博客内容
    getBlogInfo(blogId) {
      blogApi.readById(blogId).then(res => {
        this.blog = res.data
      })
    },
    // 获取评论信息
    getComment() {
      const blogId = this.$route.params.id
      commentApi.getList(blogId).then(res => {
        this.commentList = res.data
      })
    },
    // 获取博客点赞
    saveGoods() {
      if (!this.isGood) {
        const blogId = this.$route.params.id
        const obj = {
          blogId: blogId
        }
        blogApi.goodByBlog(obj).then(res => {
          this.$message.info(res.msg)
          this.getGoods()
        })
      } else {
        this.$message.error('您已点赞，请勿重复点赞')
      }
    },
    // 获取评论点赞
    saveCommentGoods(comment) {
      if (!comment.commentFlag) {
        const commentId = comment.id
        const obj = {
          commentId: commentId
        }
        commentApi.goodById(obj).then(res => {
          this.$message.info(res.msg)
          comment.commentGood = comment.commentGood + 1
          this.getComment()
        })
      } else {
        this.$message.error('您已点赞，请勿重复点赞')
      }
    },
    // 查询博客点赞
    getGoods() {
      const blogId = this.$route.params.id
      blogApi.getGood(blogId).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isGood = false
        } else {
          this.isGood = true
        }
      })
    },
    // 收藏
    saveCollection() {
      if (!this.isCollection) {
        const blogId = this.$route.params.id
        const obj = {
          blogId: blogId
        }
        blogApi.collectionByBlog(obj).then(res => {
          this.$message.info(res.msg)
          this.getCollection()
        })
      } else {
        this.$message.error('您已收藏，请勿重复收藏')
      }
    },
    // 查询收藏
    getCollection() {
      const blogId = this.$route.params.id
      blogApi.getCollection(blogId).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isCollection = false
        } else {
          this.isCollection = true
        }
      })
    },
    // 保存评论
    saveComment() {
      const blogId = this.$route.params.id
      const comment = {
        commentBlog: blogId,
        commentContent: this.content
      }
      commentApi.save(comment).then(res => {
        this.$message.info(res.msg)
        this.content = ''
        this.getComment()
      })
    }
  }
}
</script>

<style scoped>
.blog-content{
  border: 1px solid gray;
  padding: 15px;
}
.comment-header-container{
  width: 650px;
  display: flex;
  justify-content: space-between;
}
.comment-header{
  width: 70px !important;
}
.comment-button {
  margin: 15px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.content-count {
  margin-right: 15px;
}

.user-comment {
  margin-top: 15px;
  background-color: #fff;
}
.comment-bg {
  background-color: #fff;
  margin-top: 15px;
  padding: 10px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.comment-container {
  width: 580px;
  display: flex;
  flex-direction: column;
}

.comment-time {
  font-size: 12px;
  color: #9c9ea8;
}

.comment-nickname {
  font-weight: bold;
}

.header-img {
  width: 100px;
  height: 100px;
  border: 5px solid #e5e5e5;
  border-radius: 50%;
}
.comment-img {
  width: 65px;
  height: 65px;
  border: 5px solid #e5e5e5;
  border-radius: 50%;
}
.blog-bg {
  background: #fff;
  padding: 40px 25px;
}

.blog-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  line-height: 70px;
}

.blog-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 10px;
}

.blog-action {
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 24px;
}

.blog-good {
  color: #595959 !important;
}

.blog-good:hover {
  color: red !important;
}

.comment-good {
  color: #595959  !important;
}

.comment-good:hover {
  color: red  !important;
}

.blog-collection {
  color: #595959 !important;
}

.blog-collection:hover {
  color: red  !important;
}

.meta-active {
  /* 标识当前是否已点赞，是否已收藏 */
  color: red !important;
}

.meta-active:hover {
  /* 标识当前是否已点赞，是否已收藏 */
  color: red !important;
}
</style>
