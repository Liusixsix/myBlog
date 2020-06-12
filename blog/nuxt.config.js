import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/clickHeart.js' },
      { src: '/live2dw/lib/L2Dwidget.min.js' },
      { src: 'https://cdn.bootcss.com/showdown/1.9.1/showdown.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'assets/css/reset.css',
    'assets/css/iconfont.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/loading', ssr: false },
    '~/plugins/axios.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   cache: true,
   parallel: true,
    extend(config, ctx) {
    }
  },
  server: {
    host:"127.0.0.1",
    port: 3001, // default: 3000
  },
}
