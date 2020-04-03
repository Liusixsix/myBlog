<template>
  <div class="tags-page">
    <header class="post-header">
      <h1 class="post-title">标签</h1>
    </header>
    <div class="post-body">
      <div class="tag-cloud-title">目前共计 53 个标签</div>
      <div class="tag-clound-tags">
        <nuxt-link
          to
          v-for="(item,index) in tags"
          :key="index"
          :style="{fontSize:sizeRandom()+'px'}"
        >{{item}}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  data() {
    return {
      tags: [
        "cass",
        "cass",
        "Canvas",
        "JavaScript",
        "css",
        "cass",
        "Github Actiona",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass",
        "cass"
      ]
    };
  },
  methods: {
    sizeRandom() {
      let size =  Math.floor(Math.random() * 26 + 13);
      if(size>12){
        size =  Math.random()>0.5?13:size
      }
      return size
    }
  }
};
</script>

<style scoped lang='scss'>
.tags-page {
  text-align: center;
  .post-title {
    font-size: 26px;
    font-weight: 400;
  }
  .post-body {
    font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #555;
    .tag-cloud-title {
      font-size: 14px;
      margin: 20px 0 20px;
    }
    .tag-clound-tags {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: baseline;
      line-height: 2;
      & > a {
        margin-left: 20px;
        color: #555;
        border-bottom-color: #ccc;
        border-bottom: 1px solid #999;
        &:hover{
            border-bottom-color: #222;
        }
      }
    }
  }
}
</style>