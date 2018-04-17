import axios from 'axios'

let base = ''

export const getList = params => { return axios.get(`${base}/user/list`, { params: params }) }
export const getListByPage = params => { return axios.get(`${base}/user/listByPage`, { params: params }) }
