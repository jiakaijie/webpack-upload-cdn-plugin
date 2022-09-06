# webpack-upload-cdn-assets-plugin

静态文件发布cdn webpack plugin
(上传包使用好未来内部包，外部不能使用)

## 环境

### 本地开发与测试

Node 环境：v16.16.0

npm install

<!-- npm i --registry=https://npm.xesv5.com/ @xes/tal-oss -g (必须在内网镜像源装) -->

找个webpack项目使用plugin

## 发布 npm 包

修改 package.json 中 version 版本号

选好对应的 npm 镜像源

npm login 完成

npm publish

## 其他

1.包名和文件夹名称不一致，因为npm上已经存在一个包

2.
<!-- webpack-upload-cdn-assets-plugin 库里边使用 @xes/tal-oss

@xes/tal-oss 属于内部上传cdn的包

去开发环境 npm i --registry=https://npm.xesv5.com/ @xes/tal-oss -g -->

