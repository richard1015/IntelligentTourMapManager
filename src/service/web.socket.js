/*
 * @Description: web socket api列表
 * @Author: richard
 * @Date: 2019-01-18 10:15:48
 * @LastEditTime: 2019-04-26 16:38:48
 * @LastEditors: Please set LastEditors
 */
const baseUrl = process.env.WEBSOCKET_ROOT;
export const WebSocketModule = {
    baseUrl,
}
export default {
    install: function (vm) {
        vm.prototype.$ws = WebSocketModule
    }
}
