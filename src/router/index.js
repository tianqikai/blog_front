import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '../views/Home.vue'
// import Left from '../views/homepage/left/left.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/type',
        name: 'Type',
        component: () => import('@/views/type/blog-type')
      },
      {
        path: '/timeLine',
        name: 'Timeline',
        component: () => import('@/views/time-line/time-line')
      },
      {
        path: '/my-album',
        name: 'Myalbum',
        component: () => import('@/views/my-album/my-album')
      },
      {
        path: '/about',
        name: 'Manager',
        redirect: '/about/userInfo',
        component: () => import('@/views/about/index'),
        children: [
          {
            path: 'userInfo',
            name: 'UserInfo',
            component: () => import('@/views/about/user-info')
          },
          {
            path: 'collection',
            name: 'Collection',
            component: () => import('@/views/about/user-collection')
          },
          {
            path: 'comment',
            name: 'Comment',
            component: () => import('@/views/about/user-comment')
          }
        ]
      },
      {
        path: '/',
        name: 'left',
        component: () => import('@/views/homepage/left/left')
      },
      {
        path: '/info/:id',
        name: 'Info',
        component: () => import('@/views/blog/blog-info')
      },
      {
        path: '/blogList/:type',
        name: 'BlogList',
        component: () => import('@/views/blog/blog-list')
      },
      {
        path: '/search/:blogTitle',
        name: 'Search',
        component: () => import('@/views/blog/search')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
