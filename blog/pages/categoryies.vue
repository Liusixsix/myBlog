<template>
  <div class="categoryies-page">
    <header class="post-header">
      <h1 class="post-title">分类</h1>
    </header>
    <div class="post-body">
      <div class="tag-cloud-title">目前共计 53 个分类</div>

      <ul class="category-list">
        <li class="category-list-item" v-for="(item,index) in categoryList" :key="index">
          <nuxt-link :to="/catedetails/+item.name">{{item.name}}</nuxt-link>
          <span class="category-list-count">{{item.count}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryies",
  data() {
    return {
      categoryList: []
    };
  },
  head() {
    return {
      title: "博客分类"
    };
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get("/blog/getCateCount");
    return {
      categoryList: data
    };
  }
};
</script>
<style lang="scss" scoped>
.categoryies-page {
  .post-title {
    font-size: 26px;
    font-weight: 400;
    text-align: center;
  }
  .post-body {
    font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #555;
    .tag-cloud-title {
      font-size: 14px;
      margin: 20px 0 20px;
      text-align: center;
    }
  }
  .category-list {
    .category-list-item {
      margin: 5px 10px;
      line-height: 2;
      list-style: circle;
      a {
        word-wrap: break-word;
        color: #555;
        border-bottom-color: #ccc;
        font-size: 15px;
        border-bottom: 1px solid #999;
        vertical-align: top;
        &:hover {
          color: #222;
          border-bottom-color: #222;
        }
      }
      .category-list-count {
        color: #bbb;
        &::before {
          display: inline;
          content: " (";
        }
        &::after {
          display: inline;
          content: ")";
        }
      }
    }
  }
}
</style>