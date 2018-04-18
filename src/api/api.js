import axios from 'axios'

let base = 'https://lalafia.github.io/vue-element-demo'

export const getList = params => { return axios.get(`${base}/user/list`, { params: params }) }
export const getListByPage = params => { return axios.get(`${base}/user/listByPage`, { params: params }) }
export const addUsers = params => { return axios.get(`${base}/user/addUsers`, { params: params }) }
export const editUsers = params => { return axios.get(`${base}/user/editUsers`, { params: params }) }
export const deleteUsers = params => { return axios.get(`${base}/user/deleteUsers`, { params: params }) }
