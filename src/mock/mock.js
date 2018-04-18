import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {users} from './data'

export default {
  init () {
    let mock = new MockAdapter(axios)
    // 获取用户列表
    mock.onGet('/user/list').reply(config => {
      console.log(config)
      let { name } = config.params
      let mockUsers
      if (name) {
        mockUsers = users.filter(user => name === user.name)
      } else {
        mockUsers = users
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }])
        }, 1000)
      })
    })
    // 获取分页列表
    mock.onGet('/user/listByPage').reply(config => {
      let {pageNo, pageSize, name} = config.params
      let mockUsers
      if (name) {
        mockUsers = users.filter(user => name === user.name)
      } else {
        mockUsers = users
      }
      let totalSize = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            totalSize: totalSize,
            users: mockUsers
          }])
        }, 1000)
      })
    })
    // 新增用户
    mock.onGet('/user/addUsers').reply(config => {
      let pageNo = 1
      let pageSize = 10
      let { user } = config.params
      let mockUsers = users
      mockUsers.unshift(user)
      let totalSize = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            totalSize: totalSize,
            users: mockUsers,
            code: 200,
            msg: '新增用户成功'
          }])
        }, 1000)
      })
    })
    // 修改用户
    mock.onGet('/user/editUsers').reply(config => {
      let pageNo = 1
      let pageSize = 10
      let { user, id } = config.params
      users.some(item => {
        if (item.id === id) {
          item.name = user.name
          item.age = user.age
          item.gender = user.gender
          item.addr = user.addr
          item.birth = user.birth
          return true
        }
      })
      let totalSize = users.length
      let mockUsers = users.filter((u, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            totalSize: totalSize,
            users: mockUsers,
            code: 200,
            msg: '编辑用户成功'
          }])
        }, 1000)
      })
    })
    // 删除用户
    mock.onGet('/user/deleteUsers').reply(config => {
      let pageNo = 1
      let pageSize = 10
      let { id } = config.params
      id.map(i => {
        for (let j = 0; j < users.length; j++) {
          if (i === users[j].id) {
            users.splice(j, 1)
          }
        }
      })
      let totalSize = users.length
      let mockUsers = users.filter((u, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            totalSize: totalSize,
            users: mockUsers,
            code: 200,
            msg: '删除用户成功'
          }])
        }, 1000)
      })
    })
  }
}
