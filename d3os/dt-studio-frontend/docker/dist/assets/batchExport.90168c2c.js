import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { _ as _sfc_main$1 } from './UploadFlie.ee92a521.js';
import { g as getLabelList, c as batchCreateScenes, u as uploadCommonFile } from './sceneList.b22bf172.js';
import { _ as _imports_0 } from './icon-close.e91a2d7c.js';
import { j as reactive, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, O as toDisplayString, G as createCommentVNode, L as Fragment, M as renderList, c as createBlock, x as ElMessage, N as createTextVNode, $ as getCurrentInstance } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';
import './spark-md5.2cc5764b.js';

var batchExport_vue_vue_type_style_index_0_scope_true_lang = /* #__PURE__ */ (() => ".batch-export{background:#2a2e39;width:100%;height:100vh;overflow:hidden}.batch-export h1{color:#fff;font-size:.083333rem;margin-left:.104167rem;margin-top:.104167rem}.batch-export .batch-export-table{width:100%;background:#2a2e39;padding:0 .104167rem}.batch-export .batch-export-table .el-table__row{background:#2a2e39}.batch-export .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff}.batch-export .batch-export-table:before{height:0;border:none}.batch-export .batch-export-table .hover-row{background:#000}.batch-export .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:#2a2e39}.batch-export .batch-export-table th{background:#2a2e39;border-bottom-color:#ffffff0a}.batch-export .img-url{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.batch-export .img-url .upload-img span.upload-btn{border:none;background:#2a2e39;color:#428fff}.batch-export .img-url span{display:inline-block;width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.batch-export .img-url span.upload-btn{width:100%}.batch-export .img-url img{width:.083333rem;height:.083333rem;cursor:pointer}.batch-export .scene-select{width:100%;background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}.batch-export .scene-select input{background:#2a2e39;border:none}.batch-export .scene-select .el-select__tags .el-tag{background:#333}.batch-export .do-box{width:100%;margin-top:.104167rem;color:#fff9;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.batch-export .do-box span{margin-left:.104167rem}.batch-export .do-box .btn-box{margin-right:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.batch-export .do-box .btn-box .upload-demo .el-icon{display:none}.batch-export .do-box .btn-box span{display:inline-block;color:#fff;font-size:.072917rem;border-radius:.020833rem;width:.427083rem;height:.166667rem;line-height:.166667rem;text-align:center;cursor:pointer}.batch-export .do-box .btn-box span.export{background:#428fff}.batch-export .do-box .btn-box span.submit{border:1px solid #428fff;color:#428fff}.batch-export .do-box .btn-box span.back{color:#fff9;border:1px solid rgba(255,255,255,.6)}.batch-export .edit-confirm-dialog{background:#373b48}.batch-export .edit-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.batch-export .edit-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.batch-export .edit-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.batch-export .edit-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.batch-export .edit-confirm-dialog .dialog-content .confirm-tag{margin-top:.114583rem}.batch-export .edit-confirm-dialog .dialog-content .confirm-tag span.el-radio__label{color:#fff;font-size:.0625rem}.batch-export .edit-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.batch-export .edit-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.batch-export .edit-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}.el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#212e3e!important}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#000}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#000}.cascader-float .el-cascader-panel{background:#212e3e!important}input:focus{outline:none}ul li{list-style:none}.el-table__inner-wrapper:before{background:rgba(255,255,255,.04)}.el-table .el-table__header th.el-table__cell.is-leaf,.el-table .el-table__header td.el-table__cell{border-color:#ffffff0a;background:rgba(255,255,255,.05)}.mode-upload .upload-btn{padding:0}\n")();

const _sfc_main = {
  setup() {
    let router = useRouter();
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance();
    let state = reactive({
      value: '',
      dialogVisible: false,
      radio: 0,
      tableData: [
        {
          id: 1,
          senceWord: '???????????????',
          img: '999',
          senceName: '???????????????',
          tags: ['??????', '??????', '??????', '??????'],
        },
        {
          id: 2,
          senceWord: '???????????????',
          img: '999',
          senceName: '???????????????',
          tags: ['??????', '??????', '??????', '??????'],
        },
        {
          id: 3,
          senceWord: '???????????????',
          img: '999',
          senceName: '???????????????',
          tags: ['??????', '??????', '??????', '??????'],
        },
        {
          id: 4,
          senceWord: '???????????????',
          img: '999',
          senceName: '???????????????',
          tags: ['??????', '??????', '??????', '??????'],
        },
      ],
      labelList: [],
      imgData: [],
      fileData: [],
      uploadData: [],
      uploadIndex: 0,
    });
    const methods = {
      async getLabelList() {
        let data = await getLabelList({ type: 1 });
        if (data.code === 1) {
          state.labelList = data.data;
        }
      },
      exportClick() {
        document.getElementById('file').click();
      },
      onFileAdded(e) {
        console.log(e);
      },
      exportUrl(data) {
        // console.log(data, 555555)
        state.fileData.push(data);
      },
      getImg(data) {
        console.log(data, 'img');
        state.imgData.push(data);
      },
      uploadSuccess() {
        var arr = [];
        state.imgData.map(item => {
          state.fileData.map(val => {
            item.thumbnail = item.imgName.split('.')[0];
            if (item.imgName === val.initName) {
              arr.push({
                modelFile: val.fileValue + val.uuIDKey + '.' + val.format,
                modelSourceFile: val.fileName + '.' + val.format,
                scenesName: item.imgName,
                thumbnail: item.downloadUrl,
                labels: [],
                state: 0,
              });
            }
          });
        });
        state.uploadData = proxy.deWeight(arr);
        // state.uploadData = arr
      },
      deleteScene(scope) {
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            state.uploadData.splice(index, 1);
          }
        });
      },
      deleteImgUrl(scope) {
        console.log(scope, '222');
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            item.thumbnail = '';
          }
        });
      },
      sublitClick() {
        state.dialogVisible = true;
      },
      produceNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
      },
      changeName(sceneFileName) {
        console.log(sceneFileName, 'sceneFileName');
        var date = new Date();
        var str =
          '' +
          date.getFullYear() +
          (date.getMonth() + 1) +
          date.getDate() +
          date.getMinutes() +
          proxy.produceNum(10000, 10000000000);
        var sceneFileNameArr = sceneFileName.split('.');
        var sceneFile =
          sceneFileNameArr[0] + '-' + str + '.' + sceneFileNameArr[1];
        return sceneFile
      },
      async submitAll() {
        var params = state.uploadData;
        if (params.length <= 0) {
          ElMessage.error('???????????????');
          return
        }
        // eslint-disable-next-line no-unused-vars
        params.find(item => {
          return item.labels.length > 0
        });
        var isHaveScenesName = params.find(item => {
          return item.scenesName !== ''
        });
        if (!isHaveScenesName) {
          ElMessage.error('???????????????');
          return
        }
        // if (!isHaveLabelId) {
        //   ElMessage.error('???????????????')
        //   return
        // }
        params.map(item => {
          item.state = state.radio;
          //  item.modelSourceFile = proxy.changeName(item.modelSourceFile)
        });
        console.log(params, 'params');
        let data = await batchCreateScenes(params);
        console.log(data, 222);
        if (data.code === 1) {
          ElMessage({
            message: '????????????',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'scenelist',
                query: {},
              });
            },
          });
        } else {
          ElMessage.error(data.msg);
        }
      },
      backClick() {
        router.push({
          name: 'scenelist',
        });
      },
      async selectImg(file) {
        if (file == undefined) {
          return
        }
        var files = file.raw;
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          console.log(data, 6666);
          ElMessage.success('????????????');
          state.uploadData.map((item, index) => {
            if (index === state.uploadIndex) {
              item.thumbnail = data.data.downloadUrl;
            }
          });
        } else {
          ElMessage.success(data.msg);
        }
      },
      uploadClick(scope) {
        state.uploadIndex = scope.$index;
      },
      deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].scenesName == arr[j].scenesName) {
              arr.splice(j, 1);
              //????????????????????????1??????????????? j++ ????????????????????????????????? j--
              j--;
            }
          }
        }
        return arr
      },
    };
    return {
      ...toRefs(state),
      ...methods,
    }
  },
  mounted() {
    this.getLabelList();
  },
  components: {
    UploadFile: _sfc_main$1,
  },
};


const _hoisted_1 = { class: "batch-export" };
const _hoisted_2 = /*#__PURE__*/createBaseVNode("h1", null, "????????????", -1);
const _hoisted_3 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "????????????")
], -1);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "?????????")
], -1);
const _hoisted_5 = {
  key: 0,
  class: "img-url"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 1,
  class: "img-url"
};
const _hoisted_8 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-btn",
  type: "primary"
}, "????????????", -1);
const _hoisted_9 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "????????????")
], -1);
const _hoisted_10 = ["onClick"];
const _hoisted_11 = /*#__PURE__*/createBaseVNode("input", {
  style: {"display":"none"},
  type: "file",
  name: "file",
  id: "file",
  multiple: "multiple"
}, null, -1);
const _hoisted_12 = { class: "do-box" };
const _hoisted_13 = { class: "btn-box" };
const _hoisted_14 = { class: "dialog-content" };
const _hoisted_15 = /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
  /*#__PURE__*/createBaseVNode("span", null, "??????????????????????????????")
], -1);
const _hoisted_16 = { class: "confirm-tag" };
const _hoisted_17 = /*#__PURE__*/createTextVNode("???????????????");
const _hoisted_18 = /*#__PURE__*/createTextVNode("?????????????????????????????????");
const _hoisted_19 = { class: "dialog-footer" };
const _hoisted_20 = /*#__PURE__*/createTextVNode(" ?????? ");
const _hoisted_21 = /*#__PURE__*/createTextVNode(" ?????? ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_table = resolveComponent("el-table");
  const _component_UploadFile = resolveComponent("UploadFile");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(_component_el_table, {
      data: _ctx.uploadData,
      class: "batch-export-table"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_table_column, {
          type: "index",
          label: "??????",
          width: "100"
        }),
        createVNode(_component_el_table_column, {
          prop: "modelSourceFile",
          width: "180"
        }, {
          header: withCtx(() => [
            _hoisted_3
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { width: "180" }, {
          header: withCtx(() => [
            _hoisted_4
          ]),
          default: withCtx((scope) => [
            (scope.row.thumbnail != '')
              ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  createBaseVNode("span", null, toDisplayString(scope.row.thumbnail), 1),
                  createBaseVNode("img", {
                    onClick: $event => (_ctx.deleteImgUrl(scope)),
                    src: _imports_0,
                    alt: ""
                  }, null, 8, _hoisted_6)
                ]))
              : createCommentVNode("", true),
            (scope.row.thumbnail === '')
              ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  createVNode(_component_el_upload, {
                    class: "upload-demo upload-img",
                    action: "",
                    limit: 10,
                    "auto-upload": false,
                    onClick: $event => (_ctx.uploadClick(scope)),
                    "on-change": _ctx.selectImg
                  }, {
                    tip: withCtx(() => []),
                    default: withCtx(() => [
                      _hoisted_8
                    ]),
                    _: 2
                  }, 1032, ["onClick", "on-change"])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { prop: "scenesName" }, {
          header: withCtx(() => [
            _hoisted_9
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          prop: "tags",
          label: "??????"
        }, {
          default: withCtx((scope) => [
            createVNode(_component_el_select, {
              size: "small",
              clearable: "",
              multiple: "",
              class: "scene-select",
              modelValue: scope.row.labels,
              "onUpdate:modelValue": $event => ((scope.row.labels) = $event),
              placeholder: "?????????"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.labelList, (item) => {
                  return (openBlock(), createBlock(_component_el_option, {
                    key: item.id,
                    label: item.labelName,
                    value: item.id
                  }, null, 8, ["label", "value"]))
                }), 128))
              ]),
              _: 2
            }, 1032, ["modelValue", "onUpdate:modelValue"])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "??????",
          width: "120"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", {
              onClick: $event => (_ctx.deleteScene(scope)),
              style: {"width":"100px","height":"30px","color":"#428fff"}
            }, " ?????? ", 8, _hoisted_10)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["data"]),
    _hoisted_11,
    createBaseVNode("div", _hoisted_12, [
      createBaseVNode("span", null, "???" + toDisplayString(_ctx.uploadData.length) + "???????????????", 1),
      createBaseVNode("div", _hoisted_13, [
        createVNode(_component_UploadFile, {
          onExportUrl: _ctx.exportUrl,
          onGetImg: _ctx.getImg,
          onUploadSuccess: _ctx.uploadSuccess
        }, null, 8, ["onExportUrl", "onGetImg", "onUploadSuccess"]),
        createBaseVNode("span", {
          class: "submit",
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.sublitClick && _ctx.sublitClick(...args)))
        }, "??????"),
        createBaseVNode("span", {
          class: "back",
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.backClick && _ctx.backClick(...args)))
        }, "??????")
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.dialogVisible) = $event)),
      title: "????????????",
      width: "640px",
      "custom-class": "edit-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_19, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.submitAll
          }, {
            default: withCtx(() => [
              _hoisted_20
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[3] || (_cache[3] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_21
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_14, [
          _hoisted_15,
          createBaseVNode("div", _hoisted_16, [
            createVNode(_component_el_radio_group, {
              modelValue: _ctx.radio,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.radio) = $event))
            }, {
              default: withCtx(() => [
                createVNode(_component_el_radio, { label: 0 }, {
                  default: withCtx(() => [
                    _hoisted_17
                  ]),
                  _: 1
                }),
                createVNode(_component_el_radio, { label: 1 }, {
                  default: withCtx(() => [
                    _hoisted_18
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
var batchExport = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { batchExport as default };
