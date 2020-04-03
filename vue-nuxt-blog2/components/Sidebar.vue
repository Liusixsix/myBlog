<template>
  <div id="sidebar">
    <div class="author">
      <img src="~/assets/img/head.jpg" alt />
    </div>
    <p class="site-author-name">Liu Six Six</p>
    <p class="description">卖报的小行家</p>

    <nav class="site-state">
      <div class="site-state-item site-state-posts">
        <nuxt-link to="/">
          <span class="site-state-item-count">68</span>
          <span class="site-state-item-name">日志</span>
        </nuxt-link>
      </div>
      <div class="site-state-item site-state-categories">
        <nuxt-link to="/">
          <span class="site-state-item-count">12</span>
          <span class="site-state-item-name">分类</span>
        </nuxt-link>
      </div>
      <div class="site-state-item">
        <nuxt-link to="/">
          <span class="site-state-item-count">50</span>
          <span class="site-state-item-name">标签</span>
        </nuxt-link>
      </div>
    </nav>
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
#sidebar {
  text-align: center;
  padding: 20px 10px;
  .author {
    // max-width: 96px;
    text-align: center;
    margin: 13px 0;
    img {
      z-index: 9;
      max-width: 96px;
      height: auto;
      border: 2px solid #333;
      padding: 2px;
    }
  }
  .site-author-name {
    color: #f5f5f5;
  }
  .description {
    margin-top: 18px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .site-state {
    text-align: center;
    margin-top: 30px;
    & > .site-state-item {
      display: inline-block;
      padding: 0 15px;
      line-height: 1.4;
      border-left: 1px solid #333;
      &.site-state-posts {
        border: none;
      }
      a {
        color: #999;
        text-decoration: none;
        &:hover {
          color: #eee;
        }
        span.site-state-item-count {
          display: block;
          text-align: center;
          font-size: 18px;
          color: inherit;
          font-weight: 600;
        }
        span.site-state-item-name {
          font-size: 13px;
          color: inherit;
        }
      }
    }
  }
}
</style>