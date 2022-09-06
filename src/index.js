const path = require('path');

const fs = require('fs-extra');
const TalOss = require('@xes/tal-oss');

const isFile = (path) => {
  return fs.statSync(path).isFile();
}

module.exports = class UploadCdnPlugin {
  constructor(options) {
    const { bucket, accessKeyId, accessKeySecret, appName } = options || {};
    this.bucket = bucket;
    this.accessKeyId = accessKeyId;
    this.accessKeySecret = accessKeySecret;
    this.appName = appName || 'common';
    this.outputPath = '';
  }

  apply(compiler) {
    this.outputPath = compiler.options.output.path;

    compiler.hooks.afterEmit.tap('UploadCdnPlugin', (compliaction) => {
      // this.outputPath = path.resolve(__dirname, '../', './build');
      this.uploadFiles(this.outputPath);
    })
  }

  uploadFiles(myPath) {
    const filesList = fs.readdirSync(myPath);

    filesList.forEach(item => {
      const filePath = `${myPath}/${item}`;
      if (isFile(filePath)) {
        const myUploadTo = filePath.split(this.outputPath)[1];
        const newMyUploadTo =
          myUploadTo.split('/')
            .filter(myUploadToItem => {
              return myUploadToItem !== '' && myUploadToItem !== item;
            })
            .join('/');
        const uploadTo = newMyUploadTo ? `${this.appName}/${newMyUploadTo}` : this.appName;
        this.talOssOne({
          filePath,
          uploadTo
        });
      } else {
        this.uploadFiles(filePath);
      }
    })
  }

  talOssOne({ filePath, uploadTo }) {
    if (!fs.existsSync(filePath)) {
      console.log('文件不存在');
      return;
    }
    if (!fs.statSync(filePath).isFile()) {
      console.log('不是文件', filePath);
      return;
    }

    return new Promise((resolve, reject) => {
      new TalOss({
        uploadTo,
        bucket: this.bucket,
        limit: 100,
        accessKeyId: this.accessKeyId,
        accessKeySecret: this.accessKeySecret,
        success() {
          console.log(filePath, `${this.bucket}/${uploadTo}`, 'success');
          resolve();
        },
        fail(err) {
          console.log('================ 若为测试环境, 请检查是否绑定测试环境hosts: 120.52.32.211 upload.xueersi.com ================');
          reject(err);
        },
      }).uploadFile(filePath);
    });
  };
}