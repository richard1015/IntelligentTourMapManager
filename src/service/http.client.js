/*
 * @Description: In User Settings Edit
 * @Author: richard
 * @Date: 2018-12-26 17:15:14
 * @LastEditTime: 2019-04-12 16:15:04
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import { Spin, Message } from 'iview'
import 'iview/dist/styles/iview.css';

class Http {
  /**
   * 检查状态
   * @param {object} response 响应值
   */
  checkStatus(response) {
    Spin.hide();
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      if (response.data.success) {
        return response.data.data || true;
      } else {
        if (response.data.status == 201) {
          localStorage.removeItem("userInfo");
          setTimeout(() => {
            location.href = "/";
          }, 2000);
        }
        Message.error(response.data.errorMsg)
        return false;
      }
    } else {
      Message.error('数据报错,请稍后再试！')
    }
  }
  put(url, params) {
    return this.request('put', url, params)
  }
  get(url, params) {
    return this.request('get', url, params)
  }
  post(url, params) {
    return this.request('post', url, params)
  }
  delete(url, params) {
    return this.request('delete', url, params)
  }
  /**
  * request请求
  * @param {string} method get|post|put|delete
  * @param {string} url URL地址
  * @param {*} [params] 请求参数
  */
  request(method, url, params) {
    let userInfo = localStorage.getItem('userInfo');
    let token;
    if (userInfo)
      token = JSON.parse(userInfo).token;
    Spin.show();
    params.timestamp = new Date().getTime()
    return axios({
      method,
      url,
      data: params,
      params, // get 请求时带的参数
      timeout: 1000 * 30,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'token': token
      }
    }).then((res) => {
      return this.checkStatus(res)
    }).catch(error => {
      console.error(error)
      Spin.hide();
      Message.error('服务器出错了，请稍后再试！')
      return null
    })
  }
}
export default Http
