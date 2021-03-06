const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  devServer: {
    // proxy: 'http://cs.7youke.com',
    proxy: 'https://www.9youke.com',
    // proxy: 'http://cs.czg365.cn',
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'nav-bar-background-color': 'white',
          'nav-bar-icon-color': '#606266',
          'nav-bar-text-color': '#606266',
          'nav-bar-title-text-color': '#303133',
          'button-primary-background-color': '@primary-c',
          'button-primary-border-color': '@primary-c',
          'tag-primary-color': '@primary-c',
          'switch-on-background-color': '@primary-c',
          'dropdown-menu-title-active-text-color': '@primary-c',
          'dropdown-menu-option-active-color': '@primary-c',
          'tabs-default-color': '@primary-c',
          'picker-action-text-color': '@primary-deep-c',
          'checkbox-checked-icon-color': '@primary-c',
          'radio-checked-icon-color': '@primary-c',
          'primary-c': '#FFD344',
          'primary-light-c': '#FFE75F',
          'primary-deep-c': '#FFB744',
          'gray-light-c': '#f7f7f7',
          'gray-c': '#dfdfdf',
          'gray-deep-c': '#888',
          'gray-background-c': '#fafafa',
          'font-gray-c': '#666666',
          'red-c': '#ff4646',
          'green-c': '#77ca35',
          'black-c': '#444',
          'black-light-c': '#333',
        },
      },
      postcss: {
        plugins: [
          pxtoviewport({
            viewportWidth: 375,
          }),
        ],
      },
    },
  },
  publicPath: './',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'vue-baidu-map': 'BaiduMap',
      moment: 'moment',
      quill: 'Quill',
      echarts: 'echarts',
      'vue-echarts': 'VueECharts',
    },
  },
}
