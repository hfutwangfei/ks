import { j as reactive, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, O as toDisplayString, G as createCommentVNode, I as withDirectives, an as vModelText, L as Fragment, M as renderList, c as createBlock, x as ElMessage } from './element-plus.da98f360.js';
import { _ as _sfc_main$1 } from './UploadFlie.b12ecf2d.js';
import { g as getLabelList, u as uploadCommonFile } from './sceneList.b22bf172.js';
import { b as batchCreateTenantModel } from './tenantModel.e1d9386d.js';
import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { _ as _imports_0 } from './icon-close.e91a2d7c.js';
import './spark-md5.2cc5764b.js';
import './monaco-editor.e9574fd0.js';

var TenantModelBatchImport_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".el-table th.star>.cell:before{content:\"*\";color:#f77560}.batch-export-model .el-table--border:after,.batch-export-model .el-table--border:before,.batch-export-model .el-table--border .el-table__inner-wrapper:after,.batch-export-model .el-table__inner-wrapper:before{background:rgba(255,255,255,.04)}.batch-export-model .el-table th.el-table__cell.is-leaf,.batch-export-model .el-table td.el-table__cell{border-bottom:rgba(255,255,255,.04)}\n")();

var TenantModelBatchImport_vue_vue_type_style_index_1_scope_true_lang = /* #__PURE__ */ (() => ".batch-export-model{background:#2a2e39;width:100%;height:100vh;overflow:hidden}.batch-export-model .table-input input{color:#fff9}.batch-export-model h1{color:#fff;font-size:.083333rem;margin-left:.104167rem;margin-top:.104167rem}.batch-export-model .batch-export-table{width:100%;background:#2a2e39;padding:0 .104167rem}.batch-export-model .batch-export-table .el-table__row{background:#2a2e39}.batch-export-model .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff}.batch-export-model .batch-export-table .table-input input{background:#2a2e39;height:.130208rem;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.batch-export-model .batch-export-table .cascader .el-input .el-input__inner{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.batch-export-model .batch-export-table:before{height:0;border:none}.batch-export-model .batch-export-table .hover-row{background:#000}.batch-export-model .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:#2a2e39}.batch-export-model .batch-export-table th{background:#2a2e39;border-bottom-color:#ffffff0a}.batch-export-model .img-url{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.batch-export-model .img-url span{display:inline-block;width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.batch-export-model .img-url img{width:.083333rem;height:.083333rem;cursor:pointer}.batch-export-model .my-upload-btn{color:#409eff;display:inline-block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.batch-export-model .scene-select3{width:100%;background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}.batch-export-model .scene-select3 input{background:#2a2e39;border:none}.batch-export-model .scene-select3 .el-select__tags .el-tag{background:#333}.batch-export-model .do-box{width:100%;margin-top:.104167rem;color:#fff9;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.batch-export-model .do-box span{margin-left:.104167rem}.batch-export-model .do-box .btn-box{margin-right:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.batch-export-model .do-box .btn-box .upload-demo .el-icon{display:none}.batch-export-model .do-box .btn-box span{display:inline-block;color:#fff;font-size:.072917rem;border-radius:.020833rem;width:.427083rem;height:.166667rem;line-height:.166667rem;text-align:center;cursor:pointer}.batch-export-model .do-box .btn-box span.export{background:#428fff}.batch-export-model .do-box .btn-box span.submit{border:1px solid #428fff;color:#428fff}.batch-export-model .do-box .btn-box span.back{color:#fff9;border:1px solid rgba(255,255,255,.6)}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important;background:#2a2e39}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#212e3e!important}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#000}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#000}.cascader-float .el-cascader-panel{background:#212e3e!important}\n")();

const _sfc_main = {
  setup() {
    let router = useRouter();
    // const props = { multiple: true }
    // const { proxy, ctx } = getCurrentInstance()
    let state = reactive({
      headerStyle: {
        background: 'rgba(255,255,255,0.05)',
      },
      labelList: [],
      value: '',
      fieldValue: '',
      imgData: [],
      fileData: [],
      uploadData: [
        // {
        //   modelFile:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/36c0098383fece9109f98b1ec1ce59eb.FBX',
        //   modelSourceFile: '111',
        //   scenesName: '111',
        //   state: 0,
        //   faildValue: [],
        //   objectModel: '',
        //   thumbnail:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/a75b1343-9858-490c-bcb4-e82509cb9e9b.png',
        // },
        // {
        //   modelFile:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/36c0098383fece9109f98b1ec1ce59eb.FBX',
        //   modelSourceFile: '111',
        //   scenesName: '111',
        //   state: 0,
        //   faildValue: [],
        //   objectModel: '',
        //   thumbnail:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/a75b1343-9858-490c-bcb4-e82509cb9e9b.png',
        // },
        // {
        //   modelFile:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/36c0098383fece9109f98b1ec1ce59eb.FBX',
        //   modelSourceFile: '111',
        //   scenesName: '111',
        //   state: 0,
        //   faildValue: [],
        //   objectModel: '',
        //   thumbnail:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/a75b1343-9858-490c-bcb4-e82509cb9e9b.png',
        // },
        // {
        //   modelFile:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/36c0098383fece9109f98b1ec1ce59eb.FBX',
        //   modelSourceFile: '111',
        //   scenesName: '111',
        //   state: 0,
        //   faildValue: [],
        //   objectModel: '',
        //   thumbnail:
        //     'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/a75b1343-9858-490c-bcb4-e82509cb9e9b.png',
        // },
      ],
      uploadIndex: 0,
      jsonIndex: 0,
      fieldData: [],
    });
    const methods = {
      star({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return 'star'
        } else {
          return 'star_header'
        }
      },
      async getLabelList() {
        let data = await getLabelList({ type: 0 });
        console.log(data);
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
        console.log(data, 555555);
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
            if (item.imgName === val.fileName) {
              console.log(item, val, '');
              arr.push({
                // brandId: '',
                brandName: '',
                objectModel: '',
                specifications: '',
                modelFile: val.fileValue + val.uuIDKey + '.FBX',
                modelSourceFile: val.uuIDKey + '.FBX',
                scenesName: item.imgName,
                thumbnail: item.downloadUrl,
                state: 0,
              });
            }
          });
        });
        console.log(arr, 2223333);
        // state.uploadData = ctx.deWeight(arr)
        state.uploadData = arr;
      },

      fieldChang() {},
      deleteScene(scope) {
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            state.uploadData.splice(index, 1);
          }
        });
        console.log(state.uploadData, scope, '9999');
      },
      deleteImgUrl(scope) {
        console.log(scope, '222');
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            item.thumbnail = '';
          }
        });
      },
      async sublitClick() {
        var params = state.uploadData;
        console.log(params, 'params');
        if (params.length <= 0) {
          ElMessage.error('请上传文件');
          return
        }
        var isHaveScenesName = params.every(item => {
          return item.scenesName !== ''
        });
        if (!isHaveScenesName) {
          ElMessage.error('请上传模型文件');
          return
        }
        console.log(isHaveScenesName);
        params.forEach(item => {
          return (item.name = item.scenesName)
        });

        let data = await batchCreateTenantModel(params);
        console.log(data, 222);
        if (data.code === 1) {
          ElMessage({
            message: '提交成功',
            type: 'success',
            onClose: () => {
              router.push({
                path: '/tenant/model/list',
              });
            },
          });
        } else {
          ElMessage.error(data.msg);
        }
      },
      backClick() {
        // router.go(-1)
        router.push({
          path: '/tenant/model/list',
        });
      },
      async selectImg(file) {
        console.log(file);
        var files = file.raw;
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          console.log(data, 6666);
          ElMessage.success('上传成功');
          state.uploadData.map((item, index) => {
            if (index === state.uploadIndex) {
              item.thumbnail = data.data.downloadUrl;
            }
          });
        } else {
          ElMessage.success(data.msg);
        }
      },
      // 上传物理型文件
      async selectObjectModel(file) {
        var files = file.raw;
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          console.log(data, 6666);
          ElMessage.success('上传成功');
          state.uploadData.map((item, index) => {
            if (index === state.jsonIndex) {
              console.log(item.objectModel, data.data.downloadUrl);
              item.objectModel = data.data.downloadUrl;
              // item.objectModel = 123455
            }
          });
          console.log(state.uploadData, 'state.uploadData');
        } else {
          ElMessage.success(data.msg);
        }
      },
      uploadClick(scope) {
        // console.log(scope)
        state.uploadIndex = scope.$index;
      },
      uploadClickJson(scope) {
        state.jsonIndex = scope.$index;
      },
      deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].id == arr[j].id) {
              arr.splice(j, 1);
              //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
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
    // this.getAllFieldList()
  },
  components: {
    UploadFile: _sfc_main$1,
  },
};


const _hoisted_1 = { class: "batch-export-model" };
const _hoisted_2 = /*#__PURE__*/createBaseVNode("h1", null, "批量导入", -1);
const _hoisted_3 = {
  key: 0,
  class: "img-url"
};
const _hoisted_4 = {
  key: 1,
  class: "img-url"
};
const _hoisted_5 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-btn",
  type: "primary"
}, "上传文件", -1);
const _hoisted_6 = {
  key: 0,
  class: "img-url"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  key: 1,
  class: "img-url"
};
const _hoisted_9 = {
  class: "my-upload-btn",
  type: "primary"
};
const _hoisted_10 = { class: "table-input" };
const _hoisted_11 = ["onUpdate:modelValue"];
const _hoisted_12 = { class: "table-input" };
const _hoisted_13 = ["onUpdate:modelValue"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = /*#__PURE__*/createBaseVNode("input", {
  style: {"display":"none"},
  type: "file",
  name: "file",
  id: "file",
  multiple: "multiple"
}, null, -1);
const _hoisted_16 = { class: "do-box" };
const _hoisted_17 = { class: "btn-box" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_table = resolveComponent("el-table");
  const _component_UploadFile = resolveComponent("UploadFile");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(_component_el_table, {
      data: _ctx.uploadData,
      class: "batch-export-table",
      "header-cell-style": _ctx.headerStyle,
      "header-cell-class-name": _ctx.star
    }, {
      default: withCtx(() => [
        createVNode(_component_el_table_column, {
          type: "index",
          label: "序号",
          width: "80"
        }),
        createVNode(_component_el_table_column, {
          prop: "modelSourceFile",
          label: "模型文件",
          "min-width": "10%"
        }),
        createVNode(_component_el_table_column, {
          label: "缩略图",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            (scope.row.thumbnail != '')
              ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createBaseVNode("span", null, toDisplayString(scope.row.thumbnail), 1)
                ]))
              : createCommentVNode("", true),
            (scope.row.thumbnail === '')
              ? (openBlock(), createElementBlock("div", _hoisted_4, [
                  createVNode(_component_el_upload, {
                    class: "upload-demo",
                    action: "",
                    limit: 10,
                    "auto-upload": false,
                    onClick: $event => (_ctx.uploadClick(scope)),
                    "on-change": _ctx.selectImg
                  }, {
                    tip: withCtx(() => []),
                    default: withCtx(() => [
                      _hoisted_5
                    ]),
                    _: 2
                  }, 1032, ["onClick", "on-change"])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          prop: "scenesName",
          "min-width": "10%",
          label: "模型名称"
        }),
        createVNode(_component_el_table_column, {
          label: "物模型",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            (scope.row.objectModel != '')
              ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  createBaseVNode("span", null, toDisplayString(scope.row.thumbnail), 1),
                  createBaseVNode("img", {
                    onClick: $event => (_ctx.deleteImgUrl(scope)),
                    src: _imports_0,
                    alt: ""
                  }, null, 8, _hoisted_7)
                ]))
              : createCommentVNode("", true),
            (scope.row.objectModel === '')
              ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  createVNode(_component_el_upload, {
                    class: "upload-demo",
                    action: "",
                    limit: 10,
                    "auto-upload": false,
                    onClick: $event => (_ctx.uploadClickJson(scope)),
                    "on-change": _ctx.selectObjectModel
                  }, {
                    tip: withCtx(() => []),
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9, " 上传" + toDisplayString(_ctx.objectModel), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "on-change"])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "规格型号",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_10, [
              withDirectives(createBaseVNode("input", {
                type: "text",
                "onUpdate:modelValue": $event => ((scope.row.specifications) = $event)
              }, null, 8, _hoisted_11), [
                [vModelText, scope.row.specifications]
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          prop: "tags",
          label: "标签",
          "min-width": "12%"
        }, {
          default: withCtx((scope) => [
            createVNode(_component_el_select, {
              size: "small",
              clearable: "",
              multiple: "",
              class: "scene-select3",
              modelValue: scope.row.labelIds,
              "onUpdate:modelValue": $event => ((scope.row.labelIds) = $event),
              placeholder: "请选择"
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
          label: "品牌厂家",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_12, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": $event => ((scope.row.brandName) = $event),
                type: "text"
              }, null, 8, _hoisted_13), [
                [vModelText, scope.row.brandName]
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "操作",
          "min-width": "5%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", {
              onClick: $event => (_ctx.deleteScene(scope)),
              class: "table-input",
              style: {"color":"#428fff","cursor":"pointer"}
            }, " 删除 ", 8, _hoisted_14)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["data", "header-cell-style", "header-cell-class-name"]),
    _hoisted_15,
    createBaseVNode("div", _hoisted_16, [
      createBaseVNode("span", null, "共" + toDisplayString(_ctx.uploadData.length) + "个模型文件", 1),
      createBaseVNode("div", _hoisted_17, [
        createVNode(_component_UploadFile, {
          onExportUrl: _ctx.exportUrl,
          onGetImg: _ctx.getImg,
          onUploadSuccess: _ctx.uploadSuccess
        }, null, 8, ["onExportUrl", "onGetImg", "onUploadSuccess"]),
        createBaseVNode("span", {
          class: "submit",
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.sublitClick && _ctx.sublitClick(...args)))
        }, "提交"),
        createBaseVNode("span", {
          class: "back",
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.backClick && _ctx.backClick(...args)))
        }, "返回")
      ])
    ])
  ]))
}
var TenantModelBatchImport = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { TenantModelBatchImport as default };
