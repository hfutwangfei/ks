import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, I as withDirectives, a0 as vShow, O as toDisplayString, L as Fragment, M as renderList, Y as normalizeClass, an as vModelText, x as ElMessage, N as createTextVNode, $ as getCurrentInstance } from './element-plus.da98f360.js';
import { _ as _export_sfc, c as store, u as useRouter } from './index.acc4a696.js';
import { a as addScene, _ as _sfc_main$1 } from './UploadFlie.62952e96.js';
import { g as getLabelList, b as getScenesInfo, i as createLabel, u as uploadCommonFile, j as getDownUrl, k as createScenes, l as updateScenes } from './sceneList.b22bf172.js';
import './monaco-editor.e9574fd0.js';
import './spark-md5.2cc5764b.js';

var editScene_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".edit-scene .scene-name-item{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-scene .scene-name-item .scene-name{width:1.927083rem;color:#fff}.edit-scene .scene-name-item .scene-name input{color:#fff}.edit-scene .mode-file-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.edit-scene .mode-file-box .model-file-name{color:#428fff}.edit-scene .mode-file-box .model-file-name-close{color:#fff;margin-left:.052083rem;padding:0 .052083rem .052083rem}.edit-scene .edit-label{color:#fff9!important;line-height:.145833rem}.edit-scene .edit-label span{color:#f77560}.edit-scene .export-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-scene .export-box.export-box{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.edit-scene .export-box #tts-input-text,.edit-scene .export-box #tts-inputFileAgent{width:1.666667rem;margin-right:.083333rem;height:.166667rem;border:1px solid #c3c4c7;display:none}.edit-scene .export-box .upload-btn{width:.625rem;height:.46875rem;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#2a2e39;cursor:pointer}.edit-scene .export-box .upload-btn a{margin-top:.140625rem;margin-bottom:.026042rem}.edit-scene .export-box .upload-btn span{color:#ffffff4d;font-size:.0625rem}.edit-scene .export-box .upload-btn .browse{width:.166667rem;height:.166667rem;background:#2a2e39;background-size:100% 100%;border:none;cursor:pointer}.edit-scene .export-box .input-file{width:100%;height:100%}.edit-scene .edit-tage{width:2.083333rem}.edit-scene .edit-tage ul{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.edit-scene .edit-tage ul li{padding:.010417rem .041667rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;margin-top:.041667rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem;cursor:pointer}.edit-scene .edit-tage ul li.is-active{background:rgba(66,143,255,.3);color:#428fff}.edit-scene .add-confirm-dialog{background:#373b48}.edit-scene .add-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.edit-scene .add-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.edit-scene .add-confirm-dialog .dialog-content p label{display:inline-block;width:.520833rem;height:.166667rem;color:#f77560}.edit-scene .add-confirm-dialog .dialog-content p input{width:2.083333rem;height:.145833rem;background:#373b48;font-size:.0625rem;border:1px solid rgba(255,255,255,.14);color:#fff}.edit-scene .add-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.edit-scene .add-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}.edit-scene .el-upload-list{display:none}.add-model-upload2 .upload-btn,.upload-demo2 .upload-btn{border:1px solid rgb(66,143,255);color:#428fff;background:transparent;height:.145833rem;line-height:.145833rem;font-size:.0625rem;padding:0 .0625rem;display:inline-block}ul{margin:0;padding:0}input:focus{outline:none}textarea:focus{outline:none}\n")();

const { userinfo } = store.state.account;
// import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

const _sfc_main = {
  setup(props) {
    let router = useRouter();
    const { proxy } = getCurrentInstance();
    let state = reactive({
      tags: [],
      sceneName: '',
      addTagsText: '',
      dialogVisible: false,
      tagIndex: 0,
      downloadUrl: '',
      sceneUrl: '',
      sceneFileName: '',
      editData: {},
      source: 'add',
      uuIDKey: '',
      imgkey: '',
      detailData: {},
      userType: userinfo.userType,
      format: '.FBX',
    });
    onMounted(() => {
      console.log(router.currentRoute.value.query.code, 'state.editData');
      state.source = router.currentRoute.value.query.source;
    });

    const methods = {
      async getLabelList() {
        console.log(userinfo, 'userinfo');
        let { data, code } = await getLabelList({
          type: 1,
          companyId: userinfo.companyId,
        });
        console.log(code, 'code');
        if (code === 1) {
          data.map(item => {
            item.select = false;
          });
          state.tags = data;
          console.log(data, 2222);
          if (router.currentRoute.value.query.code) {
            proxy.getScenesInfo(router.currentRoute.value.query.code);
          }
        }
      },
      async getScenesInfo(code) {
        let data = await getScenesInfo({ code });
        console.log(data, state.tags, 8888);
        var detail = data.data;
        if (data.code === 1) {
          state.sceneName = detail.scenesName;
          state.downloadUrl = detail.thumbnail;
          state.sceneUrl = detail.modelFile;
          state.sceneFileName = detail.modelSourceFile;
          detail.labels.map(item => {
            state.tags.map(tag => {
              if (item.id === tag.id) {
                tag.select = true;
              }
            });
          });
          state.detailData = detail;
        }
      },
      addTags() {
        state.dialogVisible = true;
      },
      async addTagClick() {
        var addTagsText = state.addTagsText;
        if (addTagsText === '') {
          ElMessage.error('请输入标签名称');
          return
        }
        var params = {
          labelName: addTagsText,
          type: 1,
        };
        let data = await createLabel(params);
        console.log(data);
        if (data.code === 1) {
          state.dialogVisible = false;
          ElMessage.success('添加成功');
          state.addTagsText = '';
          proxy.getLabelList();
        } else {
          ElMessage.error(data.msg);
        }
      },
      selectTag(item, index) {
        var tags = state.tags;
        tags[index].select = !tags[index].select;
        console.log(tags, 'tags');
      },
      btnClick() {
        console.log(999);
        document.getElementById('tts-input-text').click();
      },
      // 上传图片
      async readFile(e) {
        console.log(e.target.files[0], 777);
        var files = e.target.files[0];
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          console.log(data, 6666);
          ElMessage.success('上传成功');
          state.downloadUrl = data.data.downloadUrl;
          // this.getDownUrl(data.data.fileKey)
          // state.imgkey = data.data.fileKey
        } else {
          ElMessage.success(data.msg);
        }
        console.log(data, 111);
      },
      // 获取图片url
      async getDownUrl(fileKey) {
        console.log(fileKey, 'fileKey');
        let { data } = await getDownUrl({ fileKey });
        console.log(data, 222);
        if (data.hasOwnProperty('downloadUrl')) {
          ElMessage.success('上传成功');
          state.downloadUrl = data.downloadUrl;
        }
      },
      exportUrl(obj) {
        console.log(obj, 12334);
        state.sceneUrl = obj.fileValue;
        state.sceneFileName = obj.fileName;
        state.uuIDKey = obj.uuIDKey;
        state.format = obj.format;
      },
      produceNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
      },
      async submitAll(getRadio) {
        console.log(state.sceneUrl, 'state.sceneUrl');
        if (state.sceneName.length <= 0) {
          ElMessage.error('请输入场景名称');
          return
        }
        if (state.downloadUrl.length <= 0) {
          ElMessage.error('请上传场景缩略图');
          return
        }
        if (state.sceneUrl.length <= 0) {
          ElMessage.error('请上传场景文件');
          return
        }
        var selectTags = state.tags.filter(item => {
          return item.select
        });
        var arr = [];
        selectTags.map(item => {
          arr.push(item.id);
        });
        // var date = new Date()
        // var str =
        //   '' +
        //   date.getFullYear() +
        //   (date.getMonth() + 1) +
        //   date.getDate() +
        //   date.getMinutes() + proxy.produceNum(10000, 10000000000)
        // var sceneFileNameArr = state.sceneFileName.split('.')
        // var sceneFileName = sceneFileNameArr[0] + '-' + str + '.' + sceneFileNameArr[1]
        console.log(
          state.sceneUrl,
          state.uuIDKey,
          state.sceneFileName,
          state.format,
          789
        );
        var params = {
          // labels: arr,
          scenesName: state.sceneName,
          thumbnail: state.downloadUrl,
          modelFile: router.currentRoute.value.query.code
            ? state.sceneUrl
            : state.sceneUrl + state.uuIDKey + '.' + state.format,
          modelSourceFile: router.currentRoute.value.query.code
            ? state.sceneFileName
            : state.uuIDKey + '.' + state.format,
        };
        console.log(params, 'params');
        if (getRadio != 'tenant') {
          params.state = getRadio;
        }
        if (state.userType === 0) {
          params.labels = arr;
        } else {
          params.labelIds = arr;
        }
        if (state.source === 'add') {
          proxy.addData(params);
        }
        if (state.source === 'edit') {
          params.id = state.detailData.id;
          proxy.updateData(params);
        }
      },
      async addData(params) {
        let data = await createScenes(params);
        if (data.code === 1) {
          ElMessage({
            message: '提交成功',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'scenelist',
                query: {},
              });
            },
          });
        } else {
          ElMessage.warning(data.msg);
        }
      },
      async updateData(params) {
        let data = await updateScenes(params);
        if (data.code === 1) {
          ElMessage({
            message: '更新成功',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'scenelist',
                query: {},
              });
            },
          });
        }
      },
      deleteModelName() {
        state.sceneUrl = '';
        // state.sceneFileName = ''
      },
      cancelClick() {
        router.push({
          name: 'scenelist',
        });
      },
    };
    console.log(router.currentRoute.value.query.source, 666);

    return {
      ...toRefs(state),
      ...methods,
    }
  },
  mounted() {
    this.getLabelList();
  },
  unmounted() {},
  components: {
    addScene,
    UploadFlie: _sfc_main$1,
  },
};

const _hoisted_1 = { class: "edit-scene" };
const _hoisted_2 = { class: "edit-scene-box" };
const _hoisted_3 = { class: "edit-scene-item scene-name-item" };
const _hoisted_4 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 场景名称 ")
], -1);
const _hoisted_5 = { class: "edit-scene-item" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 场景文件 ")
], -1);
const _hoisted_7 = { class: "mode-file-box" };
const _hoisted_8 = { style: {"color":"#428fff"} };
const _hoisted_9 = { class: "edit-scene-item" };
const _hoisted_10 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 场景缩略图 ")
], -1);
const _hoisted_11 = { class: "small-img" };
const _hoisted_12 = { class: "small-img-box" };
const _hoisted_13 = { class: "export-box" };
const _hoisted_14 = /*#__PURE__*/createBaseVNode("a", { href: "javascript:;" }, "+", -1);
const _hoisted_15 = /*#__PURE__*/createBaseVNode("span", null, "点击上传", -1);
const _hoisted_16 = [
  _hoisted_14,
  _hoisted_15
];
const _hoisted_17 = { class: "export-box export-box-img" };
const _hoisted_18 = ["src"];
const _hoisted_19 = /*#__PURE__*/createBaseVNode("p", null, "提示：支持JPG、PNG等格式，图片大小", -1);
const _hoisted_20 = { class: "edit-scene-item" };
const _hoisted_21 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span"),
  /*#__PURE__*/createTextVNode(" 标签 ")
], -1);
const _hoisted_22 = { class: "edit-tage" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "dialog-content" };
const _hoisted_25 = /*#__PURE__*/createBaseVNode("label", null, [
  /*#__PURE__*/createTextVNode(" 标签名称 "),
  /*#__PURE__*/createBaseVNode("span", null, "*")
], -1);
const _hoisted_26 = { class: "dialog-footer" };
const _hoisted_27 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_28 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_UploadFlie = resolveComponent("UploadFlie");
  const _component_addScene = resolveComponent("addScene");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_addScene, {
      type: _ctx.source,
      source: "scene",
      onSubmitAll: _ctx.submitAll,
      onCancelClick: _ctx.cancelClick
    }, {
      content: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _hoisted_4,
            createVNode(_component_el_input, {
              class: "scene-name",
              modelValue: _ctx.sceneName,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.sceneName) = $event))
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("div", _hoisted_5, [
            _hoisted_6,
            withDirectives(createVNode(_component_UploadFlie, {
              onExportUrl: _ctx.exportUrl,
              class: "add-model-upload add-model-upload2"
            }, null, 8, ["onExportUrl"]), [
              [vShow, _ctx.sceneUrl === '']
            ]),
            withDirectives(createBaseVNode("div", _hoisted_7, [
              createBaseVNode("span", _hoisted_8, toDisplayString(_ctx.sceneFileName), 1),
              createBaseVNode("span", {
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.deleteModelName && _ctx.deleteModelName(...args))),
                class: "model-file-name-close"
              }, " X ")
            ], 512), [
              [vShow, _ctx.sceneUrl != '']
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            _hoisted_10,
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                withDirectives(createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("input", {
                    type: "file",
                    id: "tts-input-text",
                    ref: "exportInput",
                    accept: ".jpg,.png",
                    onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.readFile && _ctx.readFile(...args)))
                  }, null, 544),
                  createBaseVNode("div", {
                    class: "upload-btn",
                    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.btnClick && _ctx.btnClick(...args)))
                  }, _hoisted_16)
                ], 512), [
                  [vShow, _ctx.downloadUrl === '']
                ]),
                withDirectives(createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("img", {
                    src: _ctx.downloadUrl,
                    alt: ""
                  }, null, 8, _hoisted_18),
                  createBaseVNode("a", {
                    href: "javascript:;",
                    onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.btnClick && _ctx.btnClick(...args)))
                  }, "重新上传")
                ], 512), [
                  [vShow, _ctx.downloadUrl != '']
                ])
              ]),
              _hoisted_19
            ])
          ]),
          createBaseVNode("div", _hoisted_20, [
            _hoisted_21,
            createBaseVNode("div", _hoisted_22, [
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tags, (item, index) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass({ 'is-active': item.select }),
                    onClick: $event => (_ctx.selectTag(item, index)),
                    key: index
                  }, toDisplayString(item.labelName), 11, _hoisted_23))
                }), 128)),
                createBaseVNode("li", {
                  onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.addTags && _ctx.addTags(...args)))
                }, "+")
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["type", "onSubmitAll", "onCancelClick"]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.dialogVisible) = $event)),
      title: "新增标签",
      width: "640px",
      "custom-class": "add-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_26, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.addTagClick
          }, {
            default: withCtx(() => [
              _hoisted_27
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[7] || (_cache[7] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_28
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_24, [
          createBaseVNode("p", null, [
            _hoisted_25,
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.addTagsText) = $event)),
              type: "text"
            }, null, 512), [
              [vModelText, _ctx.addTagsText]
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var editScene = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { editScene as default };
