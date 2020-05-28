<template>
  <div class="details">
    <h1 class="title">{{details.title}}</h1>
    <div class="post-meta">
      <span class="post-time">
        <span class="post-meta-item-icon">
          <i class="iconfont icon-aui-icon-calendar"></i>
        </span>
        <span class="post-meta-item-text">发表于</span>
        <span class="post-meta-item-time">{{momentFormat(details.created)}}</span>
      </span>

      <span class="post-category">
        <span class="post-meta-item-icon">
          <i class="iconfont icon-icon-test"></i>
        </span>
        <span class="post-meta-item-text">分类于</span>
        <span>
          <nuxt-link to="/categoryies">{{details.Category.name}}</nuxt-link>
        </span>
      </span>
      <span class="post-meta-count">
        <span class="post-meta-item-icon">
          <i class="iconfont icon-eye"></i>
        </span>
        <span class="post-meta-item-text">阅读次数:{{details.Browse}}</span>
        <!-- <span class="leancloud-visitors-count">{{item.Browse}}</span> -->
      </span>
    </div>
    <div class="highlight" v-html="html">{{$route.params.id}}</div>
  </div>
</template>
<script>
import { momentFormat } from "~/utils/index";
export default {
  name: "detail",
  data() {
    return { momentFormat, html: "" };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(
      `http://localhost:3000/blog/getDetils/${params.id}`
    );
    return {
      details: res
    };
  },
  mounted() {
    let converter = new showdown.Converter();
    let html = converter.makeHtml(this.details.content);
    this.html = html;
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/markdown.scss";
.details h1.title {
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  //   margin-bottom: 20px;
  line-height: 2;
}
.details .post-meta {
  margin-top: 5px;
  margin-bottom: 60px;
  color: #999;
  font-size: 12px;
  text-align: center;
  span {
    vertical-align: middle;
  }
  & > span {
    margin-right: 10px;
  }
  & .iconfont {
    font-size: 14px;
    vertical-align: middle;
  }

   .post-category {
    a {
      vertical-align: text-top;
      color: #555;
      text-decoration: underline;
    }
  }
}
</style>