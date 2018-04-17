<template>
  <div class="list-container">
    <el-form :model="form" label-position="left"  label-width="50px" class='formcss' ref="form" inline>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="onSearch">搜索</el-button>
        <el-button  type="info" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      @selection-change="handleSelectionChange"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="100">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="warning" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="console.log(123)">删除选中</el-button>
      <el-button @click="console.log(123)">取消</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      class="pagination">
    </el-pagination>
  </div>
</template>

<script>
import { getListByPage } from '@/api/api'

export default {
  data () {
    return {
      form: {
        name: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      loading: false
    }
  },
  methods: {
    onSearch () {
      let para = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.form.name
      }
      this.loading = true
      getListByPage(para).then((res) => {
        console.log(res)
        this.tableData = res.data.users
        this.totalSize = res.data.totalSize
        this.loading = false
      })
    },
    onAdd () {
      console.log(2)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSearch()
    }
  },
  mounted () {
    this.onSearch()
  }
}
</script>

<style>
  .list-container {
    padding: 20px;
  }
  .formcss {
    padding: 10px;
    border: 1px solid #dde8e8;
    border-top: 0;
    margin-bottom: 30px;
  }
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 40px;
  }
</style>
