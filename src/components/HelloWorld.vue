<template>
  <div class="hello">
    <div @click="show1=true" class="msg">{{msg}}</div>
    <div class="box"></div>
    <div class="flex" @click="changeColor" ref="color"></div>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <popup v-model="show1">
      <!-- group already has a top border, so we need to hide header's bottom border-->
      <popup-header left-text="取消" right-text="确定" title="请选择银行卡" :show-bottom-border="false" @on-click-left="show1 = false" @on-click-right="rout"></popup-header>
      <group gutter="0">
        <radio :options="card"></radio>
      </group>
    </popup>
  </div>
</template>

<script>
import { getUser, getDefault, get360 } from "../api/index";
import {
  Group,
  Cell,
  ToastPlugin,
  AlertPlugin,
  PopupHeader,
  Popup,
  Radio
} from "vux";
import Vue from "vue";
import axios from "axios";
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
export default {
  name: "HelloWorld",
  components: {
    Group,
    Cell,
    PopupHeader,
    Popup,
    Radio
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      card: [1, 2, 3, 4],
      show1: false
    };
  },
  methods: {
    changeColor() {
      this.$router.push("/bridge");
      // if (this.$refs.color.style.backgroundColor == "blue") {
      //   this.$refs.color.style.backgroundColor = "red";
      //   return false;
      // }
      // this.$refs.color.style.backgroundColor = "blue";
    },
    rout() {
      this.show1 = false;
      this.$router.push("/demo");
    }
  },
  mounted() {
    this.$vux.toast.text("hello", "top");
    getDefault({ name: "zhangsan" }).then(res => {
      console.log(res);
    });
    getUser({ hello: "123" }).then(res => {
      console.log(res);
    });
    get360({
      token: "80020482-1-9d80d422b61ea277",
      paperid: 3278,
      questionid: 4502,
      platform: 1
    }).then(res => {
      console.log(res);
    });

    this.$store.dispatch("addCount");
    console.log(this.$store.getters.getCount);
    // this.$vux.alert.show({
    //   title: "Vux is Cool",
    //   content: "Do you agree?",
    //   onShow() {
    //     console.log("Plugin: I'm showing");
    //   },
    //   onHide() {
    //     console.log("Plugin: I'm hiding");
    //   }
    // });
  }
};
</script>


<style lang="scss" scoped>
.msg {
}
.hello {
  .flex {
    display: flex;
    height: 50px;
    width: 80px;
    background: red;
    transition: all 0.7s ease-in-out;
  }
}
</style>

