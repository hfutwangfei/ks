import { _ as _export_sfc, c as store, e as axios } from './index.acc4a696.js';
import { o as openBlock, B as createElementBlock, C as createBaseVNode, H as renderSlot, r as resolveComponent, c as createBlock, w as withCtx, a as createVNode, I as withDirectives, an as vModelText, O as toDisplayString, N as createTextVNode } from './element-plus.da98f360.js';
import { S as SparkMD5 } from './spark-md5.2cc5764b.js';
import { a as getChunkId } from './sceneList.b22bf172.js';
import { a as createLabel } from './tenantScene.d6a51745.js';

var TenantPanelModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".container[data-v-99966836]{height:100%;min-height:100%;width:100%}.panel-page-head[data-v-99966836]{font-size:.083333rem;padding-left:.104167rem;padding-top:.104167rem;color:#fff}.panel-page-body[data-v-99966836]{min-height:calc(100% - .5rem);height:calc(100% - .5rem)}\n")();

const _sfc_main$2 = {
  name: 'TenantPanelModule',
};
const _hoisted_1$2 = { class: "container" };
const _hoisted_2$1 = { class: "panel-page-head" };
const _hoisted_3$1 = { class: "panel-page-body" };

function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "head", {}, undefined, true)
    ]),
    createBaseVNode("div", _hoisted_3$1, [
      renderSlot(_ctx.$slots, "body", {}, undefined, true)
    ])
  ]))
}
var TenantPanelModule = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$2],['__scopeId',"data-v-99966836"]]);

var TenantUploadFlie_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".uploader-app{width:4.427083rem;padding:.078125rem;margin:.208333rem auto 0;font-size:.0625rem;-webkit-box-shadow:0 0 .052083rem rgba(0,0,0,.4);box-shadow:0 0 .052083rem #0006}.uploader-app .uploader-btn{margin-right:.208333rem}.upload-btn{padding:.015625rem .026042rem;border-radius:.010417rem;border:1px solid #428fff}.uploader-app .uploader-list{max-height:2.291667rem;overflow:auto;overflow-x:hidden;overflow-y:auto}\n")();

// import {
//   defineComponent,
//   reactive,
//   toRefs,
//   getCurrentInstance,
//   ref,
//   defineEmits,
// } from 'vue'

const _sfc_main$1 = {
  name: 'TenantUploadFile',
  components: {},
  data() {
    return {
      urlPrex: '/api/file',
      name: 123,
    }
  },
  methods: {
    // 监听文件改变
    async onFileAdded(file) {
      let data = await getChunkId();
      if (file == undefined || file.name == undefined) {
        return
      }
      console.log('onFileAdded', file);
      if (file.name.includes('.FBX') || file.name.includes('.fbx')) {
        file.urlPrex = this.urlPrex;
        file.chunkId = data.data;
        // 计算MD5
        this.computeMD5(file);
      } else {
        this.$message.error('文件格式不正确，请上传FBX文件!');
      }
    },
    beforeRemove() {
      var paramsRemove = {
        fileValue: '',
        fileName: '',
      };
      this.$emit('exportUrlFn', paramsRemove);
    },
    // 根据文件计算MD5
    computeMD5(file) {
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

          this.computeMD5Success(file);
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
    },

    computeMD5Success(file) {
      function produceNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
      }
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
      let _this = this;
      console.log('computeMD5Success', file);
      const { authorization } = store.state.app;

      axios
        .get(file.urlPrex + '/partInitUpload', {
          params: {
            fileSize: file.size,
            // uuIDKey: file.uniqueIdentifier,
            uuIDKey: sceneFile,
          },
          headers: { Authorization: authorization },
        })
        .then(function(response) {
          console.log('response', response);
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
          console.log(file, 'iiii');
          let blobSlice =
              File.prototype.slice ||
              File.prototype.mozSlice ||
              File.prototype.webkitSlice,
            chunkSize = partSize,
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            fileReader = new FileReader(),
            time = new Date().getTime();

          function loadNext() {
            let start = currentChunk * chunkSize;
            let end =
              start + chunkSize >= file.size ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(blobSlice.call(file.raw, start, end));
          }
          // var paramsObj = {
          //   fileValue: downloadUrl,
          //   fileName: file.name,
          //   uuIDKey: file.uniqueIdentifier,
          // }
          var paramsObj = {
            fileValue: downloadUrl,
            fileName: file.name,
            // uuIDKey: file.uniqueIdentifier,
            uuIDKey: sceneFile,
            size: file.size,
            format: file.name.split('.')[1],
          };
          _this.$emit('exportUrlFn', paramsObj);
          {
            loadNext();
            fileReader.onload = async e => {
              console.log(currentChunk);
              console.log(e);
              console.log(uploadInfos);
              console.log(uploadInfos[currentChunk], 88888888);
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
                console.log(
                  `文件上传完成：${file.name} \n分片：${chunks} 大小:${
                    file.size
                  } 用时：${(new Date().getTime() - time) / 1000} s`
                );
                // this.progress = 100;
                // this.status = "上传完成";
                //window.location.reload();
                const { authorization } = store.state.app;
                axios.get(file.urlPrex + '/composeFilePart', {
                  params: {
                    fileName: file.name,
                    fileSize: file.size,
                    folderId: file.folderId,
                    // uuIDKey: file.uniqueIdentifier,
                    uuIDKey: sceneFile,
                  },
                  headers: { Authorization: authorization },
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
    },
  },
};

const _hoisted_1$1 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-btn",
  type: "primary"
}, "上传文件", -1);

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_upload = resolveComponent("el-upload");

  return (openBlock(), createBlock(_component_el_upload, {
    class: "upload-demo",
    action: "",
    multiple: "",
    limit: 3,
    "auto-upload": false,
    "before-remove": $options.beforeRemove,
    "on-change": $options.onFileAdded
  }, {
    tip: withCtx(() => []),
    default: withCtx(() => [
      _hoisted_1$1
    ]),
    _: 1
  }, 8, ["before-remove", "on-change"]))
}
var TenantUploadFile = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

var AddLabelDialogModule_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".add-confirm-dialog12{background:#373b48}.add-confirm-dialog12 .el-dialog__header{border-bottom:.005208rem solid #181a21}.add-confirm-dialog12 .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.add-confirm-dialog12 .dialog-content p label{display:inline-block;width:.520833rem;height:.166667rem;color:#fff}.add-confirm-dialog12 .dialog-content p input{width:2.083333rem;height:.145833rem;background:#373b48;font-size:.0625rem;border:1px solid rgba(255,255,255,.14);color:#fff}.add-confirm-dialog12 .dialog-footer .dialog-footer-confirm{height:.166667rem}.add-confirm-dialog12 .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}\n")();

const _sfc_main = {
  name: 'AddLabelDialogModule',
  data() {
    return {
      type: 0,
      dialogVisible: false,
      tipText: '',
      addTagsText: '',
    }
  },
  methods: {
    resetLabelBtn(type) {
      this.type = type;
      this.dialogVisible = true;
      this.tipText = '';
      this.addTagsText = '';
    },
    labelInputFn() {
      if (!this.addTagsText) {
        this.tipText = '标签名称不能为空';
      } else {
        this.tipText = '';
      }
    },
    addTagClick() {
      if (!this.addTagsText) {
        this.tipText = '标签名称不能为空';
      } else {
        this.tipText = '';
        this.createLabelFn(this.addTagsText);
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    createLabelFn(labelName) {
      let req = {
        labelName,
        type: this.type,
      };
      createLabel(req).then(res => {
        if (res.code === 1) {
          this.$message.success('添加成功!');
          this.dialogVisible = false;
          this.$emit('childfn');
        }
      });
    },
  },
};

const _hoisted_1 = { class: "dialog-content" };
const _hoisted_2 = /*#__PURE__*/createBaseVNode("label", null, "标签名称", -1);
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1);
const _hoisted_4 = {
  style: {"color":"#f77560","margin-left":"100px"},
  class: "tip"
};
const _hoisted_5 = { class: "dialog-footer" };
const _hoisted_6 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_7 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", null, [
    createVNode(_component_el_dialog, {
      modelValue: $data.dialogVisible,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (($data.dialogVisible) = $event)),
      title: "新增标签",
      width: "640px",
      "custom-class": "add-confirm-dialog12",
      "before-close": $options.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_5, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: $options.addTagClick
          }, {
            default: withCtx(() => [
              _hoisted_6
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[2] || (_cache[2] = $event => ($data.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_7
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("p", null, [
            _hoisted_2,
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.addTagsText) = $event)),
              type: "text",
              onInput: _cache[1] || (_cache[1] = (...args) => ($options.labelInputFn && $options.labelInputFn(...args)))
            }, null, 544), [
              [vModelText, $data.addTagsText]
            ]),
            _hoisted_3,
            createBaseVNode("span", _hoisted_4, toDisplayString($data.tipText), 1)
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var AddLabelDialogModule = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { AddLabelDialogModule as A, TenantUploadFile as T, TenantPanelModule as a };
