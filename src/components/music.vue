<template>
    <div class="music">
        <audio ref="nomusic">
            <source :src="playurl" type="audio/mpeg">
        </audio>
    </div>
</template>
<script>
import { searchMusicurl } from "../api/index.js";
export default {
  data() {
    return {
      id: null,
      playurl: null
    };
  },
  computed: {
    musicid() {
      return this.$store.state.musicid;
    }
  },
  watch: {
    musicid(newid, oldid) {
      if (!newid) {
        return;
      }
      const _this = this;
      console.log(this);
      searchMusicurl({ id: newid }).then(res => {
        _this.$nextTick(() => {
          _this.$refs.nomusic.src = res.data.url;
          _this.$refs.nomusic.play();
        });
      });
    }
  },
  mounted() {}
};
</script>
