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
      let {pageNo, pageSize} = config.params
      let mockUsers = users
      mockUsers.unshift(config.params)
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
  }
}
