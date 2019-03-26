/*
 * @Description: 接口api列表
 * @Author: richard
 * @Date: 2019-01-18 10:15:48
 * @LastEditTime: 2019-03-26 14:53:45
 * @LastEditors: Please set LastEditors
 */
import HttpClient from './http.client.js'
const baseUrl = process.env.API_ROOT;
export const ApiModule = {
  baseUrl,
  // 新增修改接口
  login(params) {
    return new HttpClient().post(`${baseUrl}/common/login`, params)
  },
  // 用户列表
  getUser(params) {
    return new HttpClient().get(`${baseUrl}/user/query`, params)
  },
  // 新增修改接口
  modifyUser(params) {
    return new HttpClient().post(`${baseUrl}/user/update`, params)
  },
  //删除 
  deleteUser(params) {
    return new HttpClient().delete(`${baseUrl}/user/destroy/${params.id}`, params)
  },
  // 内容列表
  getSchool(params) {
    return new HttpClient().get(`${baseUrl}/school/query`, params)
  },
  // 新增修改接口
  modifySchool(params) {
    return new HttpClient().post(`${baseUrl}/school/update`, params)
  },
  //删除 
  deleteSchool(params) {
    return new HttpClient().delete(`${baseUrl}/school/destroy/${params.id}`, params)
  },
  // 标注列表
  getSpot(params) {
    return new HttpClient().get(`${baseUrl}/spot/query`, params)
  },
  // 新增修改接口
  modifySpot(params) {
    return new HttpClient().post(`${baseUrl}/spot/update`, params)
  },
  //删除 
  deleteSpot(params) {
    return new HttpClient().delete(`${baseUrl}/spot/destroy/${params.id}`, params)
  },
}
export default {
  install: function (vm) {
    vm.prototype.$api = ApiModule
  }
}
