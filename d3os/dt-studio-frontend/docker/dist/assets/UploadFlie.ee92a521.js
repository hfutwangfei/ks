import { S as SparkMD5 } from './spark-md5.2cc5764b.js';
import { c as store, e as axios } from './index.acc4a696.js';
import { a as getChunkId, u as uploadCommonFile } from './sceneList.b22bf172.js';
import { r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, C as createBaseVNode, O as toDisplayString, A as ElLoading } from './element-plus.da98f360.js';

var UploadFlie_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".uploader-app{width:4.427083rem;padding:.078125rem;margin:.208333rem auto 0;font-size:.0625rem;-webkit-box-shadow:0 0 .052083rem rgba(0,0,0,.4);box-shadow:0 0 .052083rem #0006}.uploader-app .uploader-btn{margin-right:.208333rem}.upload-btn{height:.166667rem;border-radius:.010417rem;border:1px solid #428fff;background:#428fff}.uploader-app .uploader-list{max-height:2.291667rem;overflow:auto;overflow-x:hidden;overflow-y:auto}.upload-demo .el-upload-list{display:none}\n")();

const _hoisted_1 = {
  class: "upload-btn",
  type: "primary"
};

const _sfc_main = {
  __name: 'UploadFlie',
  props: {
  msg: String,
},
  emits: {
  exportUrl: null,
},
  setup(__props, { emit }) {

const { authorization } = store.state.app;
const urlPrex = '/api/file';
var timer;
// 监听文件改变
const onFileAdded = async (file, fileList) => {
  if (
    file.name.split('.')[1] != 'FBX' &&
    file.name.split('.')[1] != 'PAK' &&
    file.name.split('.')[1] != 'pak' &&
    file.name.split('.')[1] != 'dwg'
  ) {
    upLoadImg(file);
    console.log(1);
  } else {
    let data = await getChunkId();
    if (data.code === 1) {
      file.urlPrex = urlPrex;
      file.chunkId = data.data;
      // 计算MD5
      computeMD5(file);
    }
    // computeMD5(file)
  }
  // arr.push(fileList)
  // console.log('onFileAdded', arr, fileList)
  //   this.progress = 0
  //   this.status = '初始状态'
  file.urlPrex = urlPrex;
  // upLoadImg(file)
  // 计算MD5
  // computeMD5(file)
};
async function upLoadImg(file) {
  // console.log(file.raw, '222')
  var obj = {};
  var files = file.raw;
  let formData = new FormData();
  formData.append('file', files);
  let data = await uploadCommonFile(formData);
  if (data.code === 1) {
    obj.imgName = files.name.split('.')[0];
    obj.downloadUrl = data.data.downloadUrl;
    emit('getImg', obj);
  } else {
    alert(data.msg);
  }
  // console.log(data, 222)
}
// 根据文件计算MD5
const computeMD5 = file => {
  let blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice,
    chunkSize = 1024 * 1024 * 5,
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    spark = new SparkMD5.ArrayBuffer(),
    fileReader = new FileReader();

  // eslint-disable-next-line no-unused-vars
  new Date().getTime();

  // console.log('计算MD5...')
  //   this.status = '计算MD5'
  file.totalChunkCounts = chunks;
  loadNext();

  fileReader.onload = e => {
    spark.append(e.target.result); // Append array buffer
    currentChunk++;

    if (currentChunk < chunks) {
      // console.log(
      //   `第${currentChunk}分片解析完成, 开始第${currentChunk +
      //     1}/${chunks}分片解析`
      // )
      loadNext();
    } else {
      let md5 = spark.end();
      // console.log(
      //   `MD5计算完成：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
      //     file.size
      //   } 用时：${(new Date().getTime() - time) / 1000} s`
      // )
      spark.destroy(); //释放缓存
      file.uniqueIdentifier = md5; //将文件md5赋值给文件唯一标识
      file.cmd5 = false; //取消计算md5状态

      computeMD5Success(file);
    }
  };

  fileReader.onerror = () => {
    console.warn('oops, something went wrong.');
    file.cancel();
  };

  function loadNext() {
    let start = currentChunk * chunkSize;
    let end = start + chunkSize >= file.size ? file.size : start + chunkSize;

    fileReader.readAsArrayBuffer(blobSlice.call(file.raw, start, end));
  }
};
function produceNum(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}
const computeMD5Success = file => {
  // console.log('computeMD5Success', file)
  const loadingInstance = ElLoading.service({
    lock: true,
    text: '上传中，请稍后~',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  var date = new Date();
  var str =
    '' +
    date.getFullYear() +
    (date.getMonth() + 1) +
    date.getDate() +
    date.getMinutes() +
    produceNum(10000, 10000000000) +
    '-' +
    file.chunkId;
  // var sceneFileName = file.name
  var sceneFileName = '';
  var sceneFile = '';
  if (file.name.indexOf('-') != -1) {
    sceneFileName = file.name.split('-');
    sceneFile = sceneFileName[0] + str;
  } else {
    sceneFileName = file.name.split('.');
    sceneFile = sceneFileName[0] + '-' + str;
  }
  console.log(sceneFile, 'sceneFile');
  axios
    .get(file.urlPrex + '/partInitUpload', {
      params: {
        fileSize: file.size,
        // uuIDKey: file.uniqueIdentifier,
        uuIDKey: sceneFile,
      },
      headers: {
        Authorization: authorization,
      },
    })
    .then(function(response) {
      // console.log('response', response)
      let {
        // eslint-disable-next-line no-unused-vars
        count,
        partSize,
        folderId,
        uploadInfos,
        downloadUrl,
      } = response.data.data;
      // file.uploadID = response.data.uploadID;
      // file.uuid = response.data.uuid;
      // file.uploaded = response.data.uploaded;
      // file.chunks = response.data.chunks;
      // resolve(response);

      file.folderId = folderId;
      // console.log(file, 'iiii')
      let blobSlice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice,
        chunkSize = partSize,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        fileReader = new FileReader();
        // eslint-disable-next-line no-unused-vars
        new Date().getTime();

      function loadNext() {
        let start = currentChunk * chunkSize;
        let end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file.raw, start, end));
      }
      var paramsObj = {
        fileValue: downloadUrl,
        // fileName: file.name.split('.')[0],
        fileName: sceneFile,
        format: file.name.split('.')[1],
        // uuIDKey: file.uniqueIdentifier,
        uuIDKey: sceneFile,
        size: file.size,
        initName: file.name.split('.')[0],
      };
      console.log(paramsObj, 'paramsObj');
      emit('exportUrl', paramsObj);
      {
        loadNext();
        fileReader.onload = async e => {
          // console.log(currentChunk)
          // console.log(e)
          // console.log(uploadInfos)
          // eslint-disable-next-line no-unused-vars
          uploadInfos[currentChunk].url;
          await uploadMinio(uploadInfos[currentChunk].url, e);

          fileReader.abort();
          currentChunk++;
          if (currentChunk < chunks) {
            // console.log(
            //   `第${currentChunk}个分片上传完成, 开始第${currentChunk +
            //     1}/${chunks}个分片上传`
            // )
            // this.progress = Math.ceil((currentChunk / chunks) * 100);
            await loadNext();
          } else {
            // await completeUpload();
            // console.log(
            //   `文件上传完成：${file.name} \n分片：${chunks} 大小:${
            //     file.size
            //   } 用时：${(new Date().getTime() - time) / 1000} s`
            // )
            // this.progress = 100;
            // this.status = "上传完成";
            //window.location.reload();
            count++;
            loadingInstance.close();
            emit('uploadSuccess');
            clearInterval(timer);
            // timer = setInterval(() => {
            //   count = 0
            //   console.log(count, 2222)
            //   clearInterval(timer)
            //   emit('uploadSuccess')
            // }, 2000)
            // upload-id
            axios.get(file.urlPrex + '/composeFilePart', {
              params: {
                fileName: file.name,
                fileSize: file.size,
                folderId: file.folderId,
                // uuIDKey: file.uniqueIdentifier,
                uuIDKey: sceneFile,
              },
              headers: {
                Authorization: authorization,
              },
            });
          }
        };
      }
    });

  function uploadMinio(url, e) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, e.target.result)
        .then(function(res) {
          // console.log(res, 33333)
          resolve(res);
        })
        .catch(function(err) {
          console.log(err, '0000');
          reject(err);
        });
    })
  }
};

return (_ctx, _cache) => {
  const _component_el_upload = resolveComponent("el-upload");

  return (openBlock(), createBlock(_component_el_upload, {
    class: "upload-demo",
    action: "",
    multiple: "",
    id: "upload-id",
    limit: 10,
    "auto-upload": false,
    "on-change": onFileAdded
  }, {
    tip: withCtx(() => []),
    default: withCtx(() => [
      createBaseVNode("span", _hoisted_1, toDisplayString(__props.msg ? __props.msg : '批量导入'), 1)
    ]),
    _: 1
  }))
}
}

};

export { _sfc_main as _ };
