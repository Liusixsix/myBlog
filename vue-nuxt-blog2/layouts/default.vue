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
      <!-- <v-footer class="footer">
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer> -->
    </v-content>

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
    };
  },
  mounted() {
    window.L2Dwidget.init({
      pluginRootPath: "static/live2dw/",
      pluginJsPath: "lib/",
      pluginModelPath: "live2d-widget-model-z16/assets/",
      tagMode: false,
      debug: false,
      model: {
        jsonPath: "/live2dw/live2d-widget-model-z16/assets/z16.model.json"
      },
      display: { position: "right", width: 220, height: 350, right: "50px" },
      mobile: { show: true },
      log: false
    });
  }
};
</script>
<style lang='scss' scoped>
.main >>> .body-container {
  // min-height: 1000px !important;
  // padding-bottom: 150px !important;
  box-sizing: border-box;
  position: relative;
}
#main-inner{
  margin: 0 auto;
  margin-top:90px;
  width: 700px;
}
@media (min-width: 1600px) {
  #main-inner {
    width: 900px;
  }
}
#cas {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
  opacity: 0.5;
}
.footer {
  // height: 80px;
}
</style>