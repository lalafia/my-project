<template>
  <el-form ref='form' :model="form" status-icon  class="loginContainer">
    <h3 class="title">系统登录</h3>
    <el-form-item :rules="rules">
      <el-input v-model="form.userName" auto-complete="on" prop="userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="form.password" prop="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="rememberpsw">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default({
  data: function () {
    return {
      form: {
        userName: '',
        password: ''
      },
      checked: true,
      rules: [
        {required: true, message: '年龄不能为空'},
        {type: 'number', message: '年龄必须为数字值'}
      ]
    }
  },
  methods: {
    onSubmit: function () {
      console.log(this.form)
    }
  }
})
</script>

<style lang="scss">
.loginContainer {
  text-align: left;
  width: 350px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  padding: 30px;
  .title {
    text-align: center;
  }
  .rememberpsw {
    display: inline-block;
    margin: 0 0 35px 0;
  }
}
</style>
