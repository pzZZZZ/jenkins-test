<template>
    <div class="hello">
        <marquee>
            <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)" class="align-middle">公告 {{i}}</marquee-item>
        </marquee>
        <hist></hist>
    </div>
</template>

<script>
import Vue from "vue";
import { Marquee, MarqueeItem } from "vux";
import hist from "./history";
export default {
  name: "demo",
  components: { MarqueeItem, Marquee, hist },
  data() {
    return {};
  },
  mounted() {
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
      _this.$bridge.sendMessage(globalJsBridge, url, function(response) {});
    }

    executeCommand(
      'mistong://{"domain":"live", "action":"open_series_detail","params":{"id":"4"}}'
    );
  }
};
</script>


<style lang="scss" scoped>

</style>

