<template>
  <div class="logs" ref="logs">
    <p v-bind:key="item" v-for="item in logs">{{item}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logs: []
    };
  },
  mounted() {
    this.openWebSocketTest();
  },
  destroyed() {
    if (this.ws) {
      this.ws.close();
    }
  },
  methods: {
    openWebSocketTest() {
      var self = this;
      if ("WebSocket" in window) {
        // 打开一个 web socket
        console.log(self.$ws.baseUrl);
        var ws = new WebSocket(self.$ws.baseUrl);
        self.ws = ws;
        ws.onopen = function() {
          // Web Socket 已连接上，使用 send() 方法发送数据
          let userInfo = localStorage.getItem("userInfo");
          let token;
          if (userInfo) token = JSON.parse(userInfo).token;
          //发送正确token验证，否则服务端禁止连接
          ws.send(token);
          console.log("请求连接服务器...")
        };

        ws.onmessage = function(evt) {
          var received_msg = evt.data;
          self.logs.unshift(new Date() + ": received_msg >" + received_msg);
          // console.log("received_msg ：" + received_msg);
        };

        ws.onclose = function() {
          // 关闭 websocket
          console.log("close websocket ");
        };
      } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
      }
    }
  }
};
</script>
<style>
/* .logs {
  background: #333;
}
.logs p {
  color: #fff;
} */
</style>

