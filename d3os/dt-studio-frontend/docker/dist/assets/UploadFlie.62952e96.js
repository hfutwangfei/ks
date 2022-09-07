import { c as store, _ as _export_sfc, u as useRouter, e as axios } from './index.acc4a696.js';
import { a as getChunkId } from './sceneList.b22bf172.js';
import { j as reactive, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, O as toDisplayString, G as createCommentVNode, H as renderSlot, a as createVNode, w as withCtx, Y as normalizeClass, N as createTextVNode, c as createBlock } from './element-plus.da98f360.js';
import { S as SparkMD5 } from './spark-md5.2cc5764b.js';

var addScene_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".edit-scene{width:100%;height:100vh;background:#2a2e39}.edit-scene .edit-scene-title{color:#fff;font-size:.083333rem;padding:.104167rem 0 0 .104167rem}.edit-scene .edit-scene-box{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-scene .edit-scene-box .edit-scene-item{width:2.604167rem;margin-top:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.edit-scene .edit-scene-box .edit-scene-item label{display:inline-block;width:.520833rem;text-align:right;margin-right:.083333rem;color:#f77560}.edit-scene .edit-scene-box .edit-scene-item label span{color:#f77560;font-size:.0625rem}.edit-scene .edit-scene-box .edit-scene-item .el-input{border:1px solid rgba(255,255,255,.14);overflow:hidden}.edit-scene .edit-scene-box .edit-scene-item .el-input input{border:none}.edit-scene .edit-scene-box .edit-scene-item input{width:2.083333rem;height:.145833rem;background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.edit-scene .edit-scene-box .edit-scene-item .small-img .small-img-box img{width:.625rem;height:.46875rem}.edit-scene .edit-scene-box .edit-scene-item .small-img .small-img-box a{color:#428fff;margin-left:.052083rem}.edit-scene .edit-scene-box .edit-scene-item .small-img p{margin-top:.052083rem;color:#ffffff4d}.edit-scene .edit-scene-box .edit-scene-item .upload-file{color:#428fff}.edit-scene .edit-dobtn{width:100%;text-align:center}.edit-scene .edit-dobtn.source-scene{position:absolute;bottom:.416667rem}.edit-scene .edit-dobtn.source-model{margin-top:.104167rem}.edit-scene .edit-dobtn .edit-btn-box{display:inline-block}.edit-scene .edit-dobtn .edit-btn-box .edit-save{width:.427083rem;height:.166667rem;padding:0}.edit-scene .edit-dobtn .edit-btn-box .edit-cancel{width:.427083rem;height:.166667rem;padding:0;background:#2a2e39;border:1px solid rgba(255,255,255,.6)}.edit-scene .edit-confirm-dialog{background:#373b48}.edit-scene .edit-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.edit-scene .edit-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.edit-scene .edit-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-scene .edit-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.edit-scene .edit-confirm-dialog .dialog-content .confirm-tag{margin-top:.114583rem}.edit-scene .edit-confirm-dialog .dialog-content .confirm-tag span.el-radio__label{color:#fff;font-size:.0625rem}.edit-scene .edit-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.edit-scene .edit-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.edit-scene .edit-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}ul li{list-style:none}\n")();

const { userinfo } = store.state.account;

const _sfc_main$1 = {
  setup(props, { emit }) {
    // const { source } = props;
    // eslint-disable-next-line no-unused-vars
    useRouter();
    let state = reactive({
      dialogVisible: false,
      radio: 0,
      userType: userinfo.userType,
    });
    const methods = {
      saveBtn() {
        if (state.userType === 0) {
          state.dialogVisible = true;
        } else {
          emit('submitAll', 'tenant');
        }
      },
      submitAll() {
        state.dialogVisible = false;
        emit('submitAll', state.radio, state.chunkId);
      },
      cancelClick() {
        state.dialogVisible = false;
        // router.go(-1)
        emit('cancelClick');
      },
    };
    return {
      ...toRefs(state),
      ...methods,
    }
  },
  props: {
    source: {
      type: String,
      default: 'model',
    },
    type: {
      type: String,
      default: 'add',
    },
  },
  unmounted() {},
};

const _hoisted_1$1 = { class: "edit-scene" };
const _hoisted_2 = { class: "edit-scene-title" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { class: "edit-scene-box" };
const _hoisted_6 = { class: "edit-btn-box" };
const _hoisted_7 = /*#__PURE__*/createTextVNode(" 保存 ");
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 取消 ");
const _hoisted_9 = { class: "dialog-content" };
const _hoisted_10 = /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
  /*#__PURE__*/createBaseVNode("span", null, "请选择场景处理方式：")
], -1);
const _hoisted_11 = { class: "confirm-tag" };
const _hoisted_12 = /*#__PURE__*/createTextVNode("需加工处理");
const _hoisted_13 = /*#__PURE__*/createTextVNode("直接上传，无需加工处理");
const _hoisted_14 = { class: "dialog-footer" };
const _hoisted_15 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_16 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2, [
      ($props.source === 'scene')
        ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString($props.type === 'add' ? '添加场景' : '编辑场景'), 1))
        : createCommentVNode("", true),
      ($props.source === 'model')
        ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString($props.type === 'add' ? '添加模型' : '编辑模型'), 1))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_5, [
      renderSlot(_ctx.$slots, "content")
    ]),
    createBaseVNode("div", {
      class: normalizeClass(["edit-dobtn", [$props.source === 'model' ? 'source-model' : 'source-scene']])
    }, [
      createBaseVNode("div", _hoisted_6, [
        createVNode(_component_el_button, {
          class: "edit-save",
          onClick: _ctx.saveBtn,
          type: "primary"
        }, {
          default: withCtx(() => [
            _hoisted_7
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          class: "edit-cancel",
          onClick: _ctx.cancelClick
        }, {
          default: withCtx(() => [
            _hoisted_8
          ]),
          _: 1
        }, 8, ["onClick"])
      ])
    ], 2),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.dialogVisible) = $event)),
      title: "提交确认",
      width: "640px",
      "custom-class": "edit-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_14, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.submitAll
          }, {
            default: withCtx(() => [
              _hoisted_15
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[1] || (_cache[1] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_9, [
          _hoisted_10,
          createBaseVNode("div", _hoisted_11, [
            createVNode(_component_el_radio_group, {
              modelValue: _ctx.radio,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.radio) = $event))
            }, {
              default: withCtx(() => [
                createVNode(_component_el_radio, { label: 0 }, {
                  default: withCtx(() => [
                    _hoisted_12
                  ]),
                  _: 1
                }),
                createVNode(_component_el_radio, { label: 1 }, {
                  default: withCtx(() => [
                    _hoisted_13
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var addScene = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

var UploadFlie_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".uploader-app{width:4.427083rem;padding:.078125rem;margin:.208333rem auto 0;font-size:.0625rem;-webkit-box-shadow:0 0 .052083rem rgba(0,0,0,.4);box-shadow:0 0 .052083rem #0006}.uploader-app .uploader-btn{margin-right:.208333rem}.upload-btn{padding:.015625rem .026042rem;border-radius:.010417rem;border:1px solid #428fff}.uploader-app .uploader-list{max-height:2.291667rem;overflow:auto;overflow-x:hidden;overflow-y:auto}\n")();

const _hoisted_1 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-btn",
  type: "primary"
}, "上传文件", -1);

const _sfc_main = {
  __name: 'UploadFlie',
  emits: {
  exportUrl: null,
},
  setup(__props, { emit }) {

const urlPrex = '/api/file';

const { authorization } = store.state.app;
// const fileUrl = ref('')
// 监听文件改变
const onFileAdded = async file => {
  let data = await getChunkId();
  if (data.code === 1) {
    file.urlPrex = urlPrex;
    file.chunkId = data.data;
    // 计算MD5
    computeMD5(file);
  }
  console.log('onFileAdded', file);
  //   this.progress = 0
  //   this.status = '初始状态'
};
const beforeRemove = () => {
  var paramsRemove = {
    fileValue: '',
    fileName: '',
  };
  emit('exportUrl', paramsRemove);
};
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

  let time = new Date().getTime();

  console.log('计算MD5...');
  //   this.status = '计算MD5'
  file.totalChunkCounts = chunks;
  loadNext();

  fileReader.onload = e => {
    spark.append(e.target.result); // Append array buffer
    currentChunk++;

    if (currentChunk < chunks) {
      console.log(
        `第${currentChunk}分片解析完成, 开始第${currentChunk +
          1}/${chunks}分片解析`
      );
      loadNext();
    } else {
      let md5 = spark.end();
      console.log(
        `MD5计算完成：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
          file.size
        } 用时：${(new Date().getTime() - time) / 1000} s`
      );
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
  console.log('computeMD5Success', file);
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
  // console.log(sceneFile, 'sceneFileName1111111')
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
      // console.log(uploadInfos, 'iiii')
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
      // console.log(file, 'sceneFile22222')
      var paramsObj = {
        fileValue: downloadUrl,
        fileName: file.name,
        // uuIDKey: file.uniqueIdentifier,
        uuIDKey: sceneFile,
        size: file.size,
        format: file.name.split('.')[1],
      };
      emit('exportUrl', paramsObj);
      {
        loadNext();
        fileReader.onload = async e => {
          // console.log(currentChunk, 1)
          // console.log(e)
          // console.log(uploadInfos, 2)
          // console.log(uploadInfos[currentChunk], 88888888)
          // eslint-disable-next-line no-unused-vars
          uploadInfos[currentChunk].url;
          await uploadMinio(uploadInfos[currentChunk].url, e);

          fileReader.abort();
          currentChunk++;

          if (currentChunk < chunks) {
            console.log(
              `第${currentChunk}个分片上传完成, 开始第${currentChunk +
                1}/${chunks}个分片上传`
            );
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
          console.log(res, 33333);
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
    limit: 3,
    "auto-upload": false,
    "before-remove": beforeRemove,
    accept: ".FBX,.fbx",
    "on-change": onFileAdded
  }, {
    tip: withCtx(() => []),
    default: withCtx(() => [
      _hoisted_1
    ]),
    _: 1
  }))
}
}

};

export { _sfc_main as _, addScene as a };
