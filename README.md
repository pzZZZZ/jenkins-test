# score-items

> pzzz

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
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 引入reset.css
## 引入rem布局设计稿尺寸为750px
## 配置环境变量Dev 233 226 prod
## 引入Vux作为UI组件库
## 引入vux-loader解析vux组件
## 引入less-loader解析vux less源码
## 引入yaml-loader 解析语言文件
## 引入fastclick解决移动端点击延迟
## 引入bridge.js 调用方式
```js
let globalJsBridge;
    const _this = this;
    _this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
      _this.$bridge.initBaseHandler(bridge);
      _this.$bridge.injectHandler("nativeHandler", bridge, function(
        data,
        handleName,
        responseCallback
      ) {
        var responseData = { "Javascript Says": "Right back atcha!" };
        _this.$bridge.log("JS responding with", responseData);
        _this.$bridge.responseCallback(responseData);
      });
      globalJsBridge = bridge;
    });

    function executeCommand(url) {
      _this.$bridge.sendMessage(globalJsBridge, url, function(response) {
          //callback handler
            let reg = /mistong:\/\//;
          let res = response.replace(reg, "");
          let resjson = JSON.parse(res);
          let token = resjson.params.token;
      });
    }

    executeCommand(
      'mistong://{"domain":"live", "action":"open_series_detail","params":{"id":"4"}}'
    );
```
- 应用层级的状态应该集中到单个 store 对象中。

- 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。

- 异步逻辑都应该封装到 action 里面。
