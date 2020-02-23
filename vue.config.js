module.exports = {
  pages: {},
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-style.css',
              'src/content-scripts/content-script.js'
            ]
          }
        }
      }
    }
  }
}
