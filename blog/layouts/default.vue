<template>
  <div class="main">
    <v-content class="body-container">
      <myHeader></myHeader>
      <div id="main-inner">
        <nuxt />
      </div>
      <v-navigation-drawer
        v-model="drawer"
        :right="right"
        :clipped="clipped"
        width="320"
        style="background:#222;color: #999;z-index:0"
        app
      >
        <aside>
          <my-sidebar></my-sidebar>
        </aside>
      </v-navigation-drawer>
    </v-content>

   

    <div class="scroll-top" @click="scrollTop" :class="{'hidde':scrollCount<=0}">
      <i class="iconfont icon-xiangshang"></i>
      <span>{{scrollCount}}%</span>
    </div>

    <canvas id="cas"></canvas>
  </div>
</template>

<script>
import myHeader from "../components/Header";
import mySidebar from "../components/Sidebar";
import "../static/js/canvas.js";
// import "../utils/clickHeart.js";
export default {
  components: { myHeader, mySidebar },
  data() {
    return {
      clipped: false,
      drawer: true,
      right: true,
      NumObj: {},
      scrollCount: 0,
      H:0
    };
  },
  watch: {
    $route(to){
      setTimeout(()=>{
       this.H =  document.body.scrollHeight - document.documentElement.clientHeight
      },200)
    }
  },
  methods: {
    initL2Dwidget() {
      window.L2Dwidget.init({
        pluginRootPath: "static/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-z16/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath: "/live2dw/live2d-widget-model-z16/assets/z16.model.json"
        },
        display: { position: "fixed", width: 220, height: 350, right: "50px" },
        mobile: { show: true },
        log: false
      });
    },
    initScroll() {
     this.H =  document.body.scrollHeight - document.documentElement.clientHeight;
      window.addEventListener("scroll", e => {
        let ScollH = document.documentElement.scrollTop;
        this.scrollCount = Math.min(
          ((ScollH / this.H).toFixed(2) * 100).toFixed(2),
          100
        );
      });
    },
    scrollTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    this.initL2Dwidget();
    this.initScroll();
  }
};
</script>
<style lang='scss' >
.main >>> .body-container {
  // min-height: 1000px !important;
  // padding-bottom: 150px !important;
  box-sizing: border-box;
  position: relative;
}
#main-inner {
  margin: 0 auto;
  margin-top: 90px;
  width: 700px;
  margin-bottom: 100px;
}
@media (min-width: 1600px) {
  #main-inner {
    width: 900px;
  }
}

.scroll-top {
  position: fixed;
  right: 30px;
  padding: 7px 6px;
  background: #222;
  bottom: 0px;
  transform: translate3d(0, -20px, 0);
  transition: all 0.2s;
  z-index: 99;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  i {
    vertical-align: middle;
    font-size: 11px;
    margin-right: 5px;
  }
  &.hidde {
    transform: translate3d(0, 28px, 0);
    transition: all 0.2s;
  }
}
#cas {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
  opacity: 0.5;
}
#live2d-widget {
  right: 100px;
}
</style>