<template>
  <div class="container-inner text-center">
    <ul>
      <li v-for="(item,index) of blogList" :key="index" class="text-left">
        <h1 class="title">
          <nuxt-link class="title-link" :to="/details/+item._id">{{item.title}}</nuxt-link>
        </h1>
        <div class="post-meta">
          <span class="post-time">
            <span class="post-meta-item-icon">
              <i class="iconfont icon-aui-icon-calendar"></i>
            </span>
            <span class="post-meta-item-text">发表于</span>
            <span class="post-meta-item-time">{{momentFormat(item.created)}}</span>
          </span>

          <span class="post-category">
            <span class="post-meta-item-icon">
              <i class="iconfont icon-icon-test"></i>
            </span>
            <span class="post-meta-item-text">分类于</span>
            <span>
              <nuxt-link to="/categoryies">{{item.Category.name}}</nuxt-link>
            </span>
          </span>
          <span class="post-meta-count">
            <span class="post-meta-item-icon">
              <i class="iconfont icon-eye"></i>
            </span>
            <span class="post-meta-item-text">阅读次数</span>
            <span class="leancloud-visitors-count">{{item.Browse}}</span>
          </span>
        </div>
        <div v-html="item.content"></div>
        <div class="post-button">
          <nuxt-link :to="/details/+item._id">阅读全文 »</nuxt-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { momentFormat } from "~/utils/index";
export default {
  data() {
    return {
      blogList: [],
      momentFormat,
      converter: null
    };
  },
  async asyncData({ $axios }) {
    const res = await $axios.get("/admin/Article");
    return {
      blogList: res.data
    };
  },

  methods: {
    filterText(text) {
      if (this.converter) {
        let html = this.converter.makeHtml(text);
        return html
          .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
          .replace(/<[^>]+?>/g, "")
          .replace(/\s+/g, " ")
          .replace(/ /g, " ")
          .replace(/>/g, " ");
      } else {
        return "";
      }
      // let html = this.converter.makeHtml(this.details.content);
      // console.log(html);
    },
    async fetchList() {
      const res = await this.$axios.get("/admin/Article");
      this.blogList = res.data;
    }
  },
  mounted() {
    this.converter = new showdown.Converter();
  }
};
</script>

<style lang='scss' >
.container-inner {
  margin: 0 auto;
  line-height: 2;
  & li:not(:first-child) {
    margin-top: 120px;
  }
  h1.title {
    font-size: 26px;
    font-weight: 400;
    a.title-link {
      color: #555;
      text-decoration: none;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #000;
        transform: scaleX(0);
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
      }
      &:hover {
        color: #222;
        border-bottom-color: #222;
        &::before {
          transform: scaleX(1);
        }
      }
    }
  }
  .post-meta {
    margin-top: 5px;
    margin-bottom: 20px;
    color: #999;
    font-size: 12px;
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
        vertical-align: middle;
        color: #555;
        text-decoration: underline;
      }
    }
  }
  .post-button {
    margin-top: 15px;
    a {
      font-size: 14px;
      background: none;
      border: none;
      border-bottom: 2px solid #666;
      transition-property: border;
      color: #555;
    }
  }
}
</style>
