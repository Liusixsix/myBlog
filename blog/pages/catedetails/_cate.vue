<template>
  <div class="posts-collapse circular">
    <div class="collection-title">
      <h1>
        {{this.$route.params.cate}}
        <span>分类</span>
      </h1>
    </div>
    <div class="item">22</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.posts-collapse {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 0;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: #f5f5f5;
    z-index: -1;
  }
  .collection-title {
    margin-left: 20px;
    h1 {
      font-size: 24px;
      span {
        color: #bbb;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }
}

.circular {
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -4px;
    margin-top: -12px;
    width: 8px;
    height: 8px;
    background: #bbb;
    border-radius: 50%;
  }

  .item{
    height: 30px;
  }
}
</style>