# IntelligentTourMapManager 智能导览图后台管理

项目地址 https://github.com/richard1015/IntelligentTourMapManager

技术栈 Vue.js、iview、websocket、Amap

演示地址：
- 后台管理  http://schoolmgr.zhuzhida.vip
- 前台展示  https://school.zhuzhida.vip
- API文档地址 https://school.zhuzhida.vip/swagger-ui.html
- 后台API源码 > https://github.com/richard1015/IntelligentTourMap

## 功能说明

- 1.登录
- 2.用户管理（增删改查）
- 3.内容管理（增删改查）支持高德地图抓取经纬度
- 4. 文件上传 token验证
- 5.后台WebSocket 日志 实时推送  token验证

## 功能截图

![](https://user-gold-cdn.xitu.io/2019/6/21/16b77d7de66b6b13?w=2874&h=1522&f=png&s=486571)
![](https://user-gold-cdn.xitu.io/2019/6/21/16b77d88de6d9318?w=2872&h=1520&f=png&s=160309)
![](https://user-gold-cdn.xitu.io/2019/6/21/16b77d910c01db6a?w=2874&h=1524&f=png&s=361767)
![](https://user-gold-cdn.xitu.io/2019/6/21/16b77d979b0f0cf6?w=2874&h=1524&f=png&s=398504)
![](https://user-gold-cdn.xitu.io/2019/6/21/16b77da24771808b?w=2876&h=1524&f=png&s=1121477)
## QuickStart

<!-- add docs here for user -->

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### doc tree

```bash
.
├── LICENSE
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── bg.jpeg
│   │   └── logo.png
│   ├── components
│   │   ├── Login.vue
│   │   ├── Logs.vue
│   │   ├── Main.vue
│   │   ├── School.vue
│   │   ├── Spot.vue
│   │   ├── User.vue
│   │   └── common
│   │       ├── AMap.vue
│   │       └── Upload.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── service
│       ├── api.js
│       ├── http.client.js
│       └── web.socket.js
├── static
└── test
    └── e2e
        ├── custom-assertions
        │   └── elementCount.js
        ├── nightwatch.conf.js
        ├── runner.js
        └── specs
            └── test.js
```