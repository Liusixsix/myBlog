<template>
  <header id="header">
    <div class="header-inner">
      <div class="site-brand-wrapper">
        <div class="site-meta">
          <nuxt-link to="/" class="brand">
            <span class="logo-line-before">
              <i></i>
            </span>
            <span class="site-title">笔记笔记</span>
            <span class="logo-line-after">
              <i></i>
            </span>
          </nuxt-link>
        </div>

        <ul id="menu">
          <li v-for="(item,index) of menus" :key="index">
            <nuxt-link :to="item.href">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{item.text}}</span>
            </nuxt-link>
          </li>
        </ul>
        <div style="clear:both"></div>
      </div>
    </div>
      <a href="https://your-url" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { icon: "icon-icon_huabanfuben", text: "首页" ,href:'/'},
        { icon: "icon-biaoqian", text: "标签",href:'/tags' },
        { icon: "icon-fenlei", text: "分类" ,href:'/categoryies'},
        { icon: "icon-ic_droptohistory", text: "归档" ,href:'/'},
        { icon: "icon-icon-", text: "热度" ,href:'/'},
        { icon: "icon-lianjie", text: "友链" ,href:'/'},
        { icon: "icon-sousuo", text: "搜索",href:'/' }
      ]
    };
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
#header {
  background: #f5f5f5;
  .header-inner {
    padding: 25px 0 25px;
    width: 700px;

    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    &::before,
    &::after {
      clear: both;
    }
    .site-brand-wrapper::after {
      clear: both;
    }
  }
  @media (min-width: 1600px) {
    .header-inner {
      width: 900px;
    }
  }
  .site-meta {
    // margin-left: -20px;
    line-height: normal;
    float: left;
    text-align: left;
    padding: 2px 1px;
    & a:hover {
      text-decoration: none;
    }
    .logo-line-before,
    .logo-line-after {
      display: block;
      width: 80%;
      i {
        position: relative;
        display: block;
        height: 2px;
        background: #222;
      }
    }
    .logo-line-before i {
      left: -100%;
      animation: line 0.5s linear 0s 1 alternate forwards;
    }
    .logo-line-after i {
      left: 0%;
      opacity: 0;
      animation: lineafter 0.5s linear 0.8s 1 alternate forwards;
    }
    .site-title {
      margin-left: -20px;
      font-size: 22px;
      padding: 2px 1px;
      line-height: 36px;
      vertical-align: top;
      font-weight: bolder;
      color: #000;
      font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
      opacity: 0;
      animation: textshow 1.5s linear 0s 1 alternate forwards;
    }
  }

  #menu {
    float: right;
    li {
      margin-top: 15px;
      font-size: 13px;
      display: inline-block;
      & a {
        color: #555;
        padding: 3px 10px;
        &:hover {
          text-decoration: none;
          background: #e1e1e1;
        }
        i {
          // vertical-align: middle;
          font-size: 15px;
        }
        span {
          margin-left: 5px;
          // vertical-align: middle;
        }
      }
    }
  }
  @keyframes line {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(100%);
    }
  }

  @keyframes lineafter {
    0% {
      opacity: 1;
      transform: translateX(100%);
    }
    90% {
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  @keyframes textshow {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>