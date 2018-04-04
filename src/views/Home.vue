<template>
  <el-container style="height: 100%;">
    <el-aside class="side-bar" width="240px">
      <el-row class="title">Project</el-row>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo menu-bar"
        @open="handleOpen"
        @close="handleClose"
        background-color="#dce8e8"
        active-text-color='teal'
        router
        unique-opened>
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :key='index' :index="index+''" v-if="item.children && item.children.length > 0">
            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"></i>{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key='index' :index="item.path">{{item.name}}</el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header" height="70px">
        <el-col class="userInfo">
          <el-dropdown trigger="hover" v-if="loginState">
            <span class="userinfo-inner"><img :src="this.userAvatar" />{{userName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-else class="userinfo-inner">登录</span>
        </el-col>
      </el-header>
      <el-main class="main">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item v-for="item in $route.matched" :item="item" :key="item.name"> {{item.name}} </el-breadcrumb-item>
        </el-breadcrumb>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default({
  data: function () {
    return {
      userName: '',
      userAvatar: '',
      loginState: false
    }
  },
  methods: {
    logout () {
      this.$router.push('/login')
      window.sessionStorage.removeItem('userInfo')
    },

    handleOpen () {
      console.log('OPEN MENU')
    },

    handleClose () {
      console.log('close menu')
    }
  },
  mounted () {
    if (window.sessionStorage.getItem('userInfo')) {
      var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      this.userName = userInfo.userName
      this.userAvatar = userInfo.userAvatar
      this.loginState = true
    }
  }
})
</script>

<style scoped lang="scss">
  @import '../element-variables.scss';
  .side-bar {
    background-color: #dce8e8;
    .title {
      height: 70px;
      background-color: $--color-primary;
      border-right: 1px solid #a9afaf;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.6rem;
    }
  }
  .header {
    background-color: $--color-primary;
    .userInfo {
      line-height: 70px;
      height: 70px;
      text-align: right;
      verticle-align: middle;
      float: right;
      padding-right: 35px;
      color: #fff;
      .userinfo-inner {
        color: #fff;
      }
    }
  }
  .main {
    padding: 0;
    .breadcrumb {
      padding: 20px;
      border-bottom: 1px solid teal;
    }
    .table {
      padding: 20px;
    }
  }
</style>
