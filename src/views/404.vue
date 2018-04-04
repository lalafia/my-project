<template>
  <div @click="jumpBack">
    <p class="warning">
      <i class="el-icon-warning"></i>
      404 page not found
      <br/>
      点击跳回首页
    </p>
  </div>
</template>

<script>
export default({
  methods: {
    jumpBack: function () {
      this.$router.push({path: '/'})
    }
  }
})
</script>

<style>
  .warning {
    text-align: center;
    font-size: 2rem;
    padding-top: 200px;
    color: #98a9a9;
  }
</style>
