import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Login from '@/views/Login'
import List from '@/views/nav1/List'
import AddItem from '@/views/nav1/addItem'

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
          name: 'UserList',
          component: List
        },
        {
          path: '/addItem',
          name: 'AddUsers',
          component: AddItem
        }
      ]
    },

    {
      path: '/',
      name: '图形分析',
      component: Home,
      iconCls: 'el-icon-star-off',
      children: [
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
