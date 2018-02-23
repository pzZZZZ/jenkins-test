<template>
    <div>
        <group>
            <div @click="getuserMsg">获取用户信息</div>
            <!-- <cell-box >
                
            </cell-box> -->
        </group>
    </div>
</template>
<script>
import { CellBox, Group, Cell } from "vux";
import { get360 } from "../api/index";
export default {
  data() {
    return {};
  },
  components: {
    CellBox,
    Group,
    Cell
  },
  methods: {
    getuserMsg() {
      console.log(123);
      alert(123);
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
          let reg = /mistong:\/\//;
          let res = response.replace(reg, "");
          let resjson = JSON.parse(res);
          let token = resjson.params.token;
        });
      }

      executeCommand(
        'mistong://{"domain":"user", "action":"info"}'
      );
    }
  }
};
</script>

