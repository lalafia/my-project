import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Login from '@/views/Login'
import List from '@/views/nav1/List'
import AddItem from '@/views/nav1/addItem'
import PicAnalysis from '@/views/nav2/picAnalysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '用户列表',
      component: Home,
      iconCls: 'el-icon-document',
      children: [
        {
          path: '/list',
          name: '用户信息',
          component: List
        },
        {
          path: '/addItem',
          name: '添加活动',
          component: AddItem
        }
      ]
    },

    {
      path: '/',
      name: '图形分析',
      component: Home,
      iconCls: 'el-icon-picture',
      children: [
        {
          path: '/picAnalysis',
          name: '图表',
          component: PicAnalysis
        }
      ]
    },

    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
      hidden: true
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },

    {
      path: '*',
      hidden: true,
      redirect: {
        path: '/404'
      }
    }
  ]
})
