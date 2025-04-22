const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  outputDir: path.resolve(
    __dirname,
    '../../../domains/onkoplus/wp-content/themes/onkoplus/assets/boocking-app/'
  ),
  transpileDependencies: true,
  css: {
    loaderOptions: {
      css: {
        url: false,
      },
    },
  },
})
