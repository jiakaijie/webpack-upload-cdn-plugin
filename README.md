# webpack-upload-cdn-plugin

静态文件发布cdn 的 webpack plugin

(仅内部可使用此包)

## Node 环境

## 使用方式

### 下载

npm i webpack-upload-cdn-plugin -g

### 引用

#### Vue中使用

vue.config.js

```
const UploadCdnPlugin = require('webpack-upload-cdn-plugin');

module.exports = {
  publicPath: 'https://xxx/xxx/xxx',  // 打包后的静态文件通用前缀
  configureWebpack(config) {
    return {
      plugins: [
        new UploadCdnPlugin({
          appName: 'xxx',             // 项目名称、区分项目的cdn
          bucket: 'xxx',              // cdn桶名称
          accessKeyId: 'xxx',         // 上传到的cdn Key
          accessKeySecret: 'xxx',     // 上传到的cdn Secret
        }),
      ]
    }
  },
}
```