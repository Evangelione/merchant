const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  devServer: {
    proxy: 'http://cs.7youke.com',
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'nav-bar-background-color': '@primary-c',
          'nav-bar-icon-color': 'white',
          'nav-bar-text-color': 'white',
          'nav-bar-title-text-color': 'white',
          'button-primary-background-color': '@primary-c',
          'button-primary-border-color': '@primary-c',
          'tag-primary-color': '@primary-c',
          'switch-on-background-color': '@primary-c',
          'dropdown-menu-title-active-text-color': '@primary-c',
          'dropdown-menu-option-active-color': '@primary-c',
          'tabs-default-color': '@primary-c',
          'picker-action-text-color': '@primary-c',
          'checkbox-checked-icon-color': '@primary-c',
          'primary-c': '#00a29a',
          'primary-deep-c': '#007b81',
          'gray-light-c': '#f7f7f7',
          'gray-c': '#dfdfdf',
          'gray-deep-c': '#888',
          'gray-background-c': '#fafafa',
          'font-gray-c': '#9e9e9e',
          'red-c': '#ff4646',
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
}
