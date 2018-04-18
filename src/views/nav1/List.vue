<template>
  <div class="list-container">
    <el-form :model="form" label-position="left"  label-width="50px" class='formcss' ref="form" inline>
      <el-form-item label="姓名">
        <el-input v-model.trim="form.name" @keyup.enter.native="onSearch" clearable></el-input>
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
        width="100"
        sortable>
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        :formatter="formatGender"
        width="100"
        sortable>
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="editTips(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteTips(scope.row)" type="warning" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type='warning' @click="batchDelete">批量删除</el-button>
      <el-button @click="sels=[]">取消</el-button>
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
      <el-form :model="dialogForm" :label-width="formLabelWidth" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="dialogForm.name" auto-complete="off" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="dialogForm.age" placeholder="请填写年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="dialogForm.gender" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model.trim="dialogForm.addr" placeholder="请填写地址"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
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
        <el-button v-loading="dialogLoading" type="primary" @click="submitDialog">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除用户信息？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteUser" v-loading="dialogLoading">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { getListByPage, addUsers, editUsers, deleteUsers } from '@/api/api'

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
        age: 0,
        gender: '',
        birth: '',
        addr: ''
      },
      dialogTitle: '',
      dialogFormVisible: false,
      dialogVisible: false,
      sels: [],
      submitDialog: {},
      currentRow: {},
      currentRowId: '',
      batch: false,
      rules: {
        name: [
          {required: true, message: '请填写姓名', trigger: 'blur'},
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        age: [
          {required: true, message: '请填写年龄', trigger: 'blur'},
          {type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        addr: [
          {required: true, message: '请填写地址', trigger: 'blur'}
        ],
        birth: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
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
      this.dialogForm = {
        name: '',
        age: '',
        gender: '',
        birth: '',
        addr: ''
      }
      this.dialogTitle = '新增用户信息'
      this.dialogFormVisible = true
      this.submitDialog = this.addUser
    },
    handleSelectionChange (val) {
      this.sels = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.pageNo = val
      this.onSearch()
    },
    addUser () {
      this.dialogLoading = true
      this.dialogForm.gender = Number(this.dialogForm.gender)
      let para = {
        user: this.dialogForm
      }
      addUsers(para).then(res => {
        console.log(res.data.users[0])
        this.tableData = res.data.users
        this.totalSize = res.data.totalSize
        this.dialogLoading = false
        this.dialogFormVisible = false
      })
    },
    editUser () {
      this.dialogLoading = true
      let para = {
        id: this.currentRow.id,
        user: this.dialogForm
      }
      editUsers(para).then(res => {
        this.tableData = res.data.users
        this.totalSize = res.data.totalSize
        this.dialogLoading = false
        this.dialogFormVisible = false
      })
    },
    deleteUser () {
      this.dialogLoading = true
      let para
      if (!this.batch) {
        para = { id: [this.currentRowId] }
      } else {
        let ids = []
        this.sels.map(sel => {
          ids.push(sel.id)
        })
        para = {id: ids}
      }

      deleteUsers(para).then(res => {
        this.tableData = res.data.users
        this.totalSize = res.data.totalSize
        this.dialogLoading = false
        this.dialogVisible = false
        this.batch = false
      })
    },
    formatGender (row) {
      let g = Number(row.gender)
      return g === 1 ? '男' : g === 0 ? '女' : '未知'
    },
    batchDelete () {
      this.dialogVisible = true
      this.batch = true
    },
    editTips (row) {
      this.dialogTitle = '编辑用户信息'
      this.dialogForm = row
      this.currentRow = row
      this.dialogFormVisible = true
      this.submitDialog = this.editUser
    },
    deleteTips (row) {
      this.currentRowId = row.id
      this.dialogVisible = true
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
