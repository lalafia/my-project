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
        prop="format(gender)"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :label-width="formLabelWidth">
        <el-form-item label="姓名">
          <el-input v-model="dialogForm.name" auto-complete="off" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="dialogForm.age" placeholder="请填写年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="dialogForm.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
            :options="addrOptions"
            v-model="dialogForm.addr"
            @change="addrChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="dialogForm.birth"
            type="date"
            placeholder="请选择出生日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-loading="dialogLoading" type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getListByPage, addUsers } from '@/api/api'

export default {
  data () {
    return {
      form: {
        name: ''
      },
      formLabelWidth: '100px',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      totalSize: 0,
      loading: false,
      dialogLoading: false,
      dialogForm: {
        name: '',
        age: '',
        gender: '',
        birth: '',
        addr: ''
      },
      addrOptions: [
        {
          value: '湖南省',
          label: '湖南省',
          children: [
            {
              value: '长沙市',
              label: '长沙市',
              children: [
                {
                  value: '雨花区',
                  label: '雨花区'
                },
                {
                  value: '芙蓉区',
                  label: '芙蓉区'
                },
                {
                  value: '天心区',
                  label: '天心区'
                },
                {
                  value: '望城区',
                  label: '望城区'
                },
                {
                  value: '开福区',
                  label: '开福区'
                }
              ]
            },
            {
              value: '岳阳市',
              label: '岳阳市',
              children: [
                {
                  value: '云梦区',
                  label: '云梦区'
                },
                {
                  value: '岳楼区',
                  label: '岳楼区'
                },
                {
                  value: '荣湾区',
                  label: '荣湾区'
                },
                {
                  value: '天河区',
                  label: '天河区'
                }
              ]
            }
          ]
        }
      ],
      dialogTitle: '',
      dialogFormVisible: false
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
        this.tableData = res.data.users
        this.totalSize = res.data.totalSize
        this.loading = false
      })
    },
    onAdd () {
      this.dialogFormVisible = true
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
    },
    addUser () {
      this.dialogLoading = true
      let para = {
        ...this.dialogForm,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      addUsers(para).then(res => {
        console.log(res.data.users[0])
        this.tableData = res.data.users
        this.totalSize = res.data.totalSize
        this.dialogLoading = false
        this.dialogFormVisible = false
      })
    },
    addrChange () {
      console.log(1)
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
    position: relative;
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
