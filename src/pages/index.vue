<template>
  <div class="index">
    <search placeholder="搜索音乐、MV、歌单、用户" v-model="value" :auto-fixed="false" @on-submit="onSubmit" ref="search"></search>
    <div class="list">
      <div class="wrap">
        <swiper :aspect-ratio="300/800" v-show="songList==null">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in imglist" :key="index"><img :src="item"></swiper-item>
        </swiper>
        <div class="song-list" v-show="songList">

          <ul>
            <div class="result-desc">共找到关于
              <span>{{searchKey}}</span>的{{allnum}}首歌曲</div>
            <li class="list-item" v-for="(item,index) in songList" :key="index" @click="playmusic(item.id)">
              <div class="icon"><img :src="item.album.cover" alt=""></div>
              <div class="song-desc">
                <div class="album">专辑：{{item.album.name}}</div>
                <div class="song-msg">
                  <div class="song-name">歌名：{{item.name}}</div>
                  <div class="songer-name">演唱：{{item.artists[0].name}}</div>
                </div>
              </div>
            </li>
            <div class="footer">{{footMsg}}</div>
          </ul>
        </div>
      </div>

    </div>
    <loading v-model="showLoading" :text="loadText"></loading>

  </div>
</template>
<script>
import { Search, Swiper, SwiperItem, Loading } from "vux";
import BScroll from "better-scroll";
import { searchPlayList } from "../api/index.js";

export default {
  components: {
    Search,
    Swiper,
    SwiperItem,
    Loading
  },
  watch: {
    value() {
      this.pageNum = 1;
    }
  },
  methods: {
    playmusic(id) {
      this.$store.dispatch("changeid", id);
      console.log(this.$store.state);
    },
    onSubmit(value) {
      this.$refs.search.setBlur();
      this.btnSearch = true;
      this.showLoading = true;
      this.searchKey = value;
      if (this.btnSearch) {
        searchPlayList({
          key: value,
          limit: 10,
          page: 1
        }).then(res => {
          // console.log(res);
          this.btnSearch = false;
          this.songList = res.data.songList;
          if (res.data.songList.length >= 10) {
            this.pageNum++;
          }
          this.showLoading = false;
          this.allnum = res.data.total;
          this.scrollInit();
        });
      }
    },
    loadData() {
      if (this.isPull) {
        return;
      }
      this.isPull = true;
      searchPlayList({
        key: this.value,
        limit: 10,
        page: this.pageNum
      }).then(res => {
        if (res.data.songList.length >= 10) {
          this.pageNum++;
        }
        this.btnSearch = false;
        this.songList = [...this.songList, ...res.data.songList];
        this.showLoading = false;
        this.scrollInit();
      });
    },
    scrollInit() {
      this.$nextTick(function() {
        this.scroll.finishPullUp();
        this.scroll.refresh();
        this.isPull = false;
      });
    }
  },
  data() {
    return {
      pageNum: 1,
      searchKey: null,
      allnum: 0,
      loadText: "拼命加载中",
      showLoading: false,
      results: [],
      songList: null,
      value: "",
      imglist: [
        "http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff",
        "http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff",
        "http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff"
      ],
      isPull: false,
      footMsg: "下拉加载"
    };
  },
  mounted() {
    this.btnSearch = false;
    let wrapper = document.querySelector(".list");
    this.scroll = new BScroll(wrapper, {
      scrollY: true,
      click: false,
      pullUpLoad: {
        threshold: -70
      },
      scrollbar: {
        fade: true,
        interactive: false // 1.8.0 新增
      }
    });
    console.log(this.scroll);
    this.scroll.on("pullingUp", pos => {
      console.log(111);
      this.loadData();
    });
    // this.scroll.on("scrollEnd", pos => {
    //   console.log(pos);
    // });
  }
};
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list {
  flex: 1;
  overflow: hidden;
  .song-list {
    .result-desc {
      height: 40px;
      background: rgb(138, 238, 177);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      span {
        font-weight: bold;
        font-size: 16px;
        margin: 0 5px;
      }
    }

    .list-item {
      display: flex;
      // margin-bottom: 20px;
      padding: 10px;
      &:nth-child(2n) {
        background: #eee;
      }
      .icon {
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .song-desc {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .album {
          text-align: center;
        }
        .song-msg {
          display: flex;
          justify-content: center;
          .songer-name {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.swiper-demo-img img {
  height: 100%;
}
.footer {
  text-align: center;
}
</style>

