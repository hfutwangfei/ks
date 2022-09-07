import { l as ref, j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, O as toDisplayString, I as withDirectives, an as vModelText, J as normalizeStyle, $ as getCurrentInstance, x as ElMessage, A as ElLoading, N as createTextVNode } from './element-plus.da98f360.js';
import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { _ as _sfc_main$1 } from './UploadFlie.ee92a521.js';
import { i as getModelComparedInfo, j as dealWithModel, k as batchDealWithModel } from './modelScene.42824c77.js';
import './monaco-editor.e9574fd0.js';
import './spark-md5.2cc5764b.js';
import './sceneList.b22bf172.js';

var pendingExport_vue_vue_type_style_index_0_scope_true_lang = /* #__PURE__ */ (() => ".padding-batch-export-model{background:#2a2e39;width:100%;height:100vh;overflow:hidden}.padding-batch-export-model h1{color:#fff;font-size:.083333rem;margin-left:.104167rem;margin-top:.104167rem}.padding-batch-export-model .export-scene{border:1px solid #428fff;color:#fff9;margin-right:.104167rem;background:#428fff}.padding-batch-export-model .batch-export-table{width:100%;background:#2a2e39;padding:0 .104167rem}.padding-batch-export-model .batch-export-table .el-table__row{background:#2a2e39}.padding-batch-export-model .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff}.padding-batch-export-model .batch-export-table .table-input{position:relative}.padding-batch-export-model .batch-export-table .table-input input{width:80%;color:#fff;background:#2a2e39;height:.130208rem;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.padding-batch-export-model .batch-export-table .table-input .field-btn{width:80%;height:.130208rem;line-height:.145833rem;display:inline-block;background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.padding-batch-export-model .batch-export-table .cascader .el-input .el-input__inner{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.padding-batch-export-model .batch-export-table:before{height:0;border:none}.padding-batch-export-model .batch-export-table .hover-row{background:#000}.padding-batch-export-model .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:#2a2e39}.padding-batch-export-model .batch-export-table th{background:#2a2e39;border-bottom-color:#ffffff0a}.padding-batch-export-model .img-url{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.padding-batch-export-model .img-url .upload-demo,.padding-batch-export-model .img-url .upload-demo .el-upload{width:100%}.padding-batch-export-model .img-url span{display:inline-block;max-width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.padding-batch-export-model .img-url span.upload-btn{width:100%;color:#428fff}.padding-batch-export-model .img-url span.upload-json{color:#428fff}.padding-batch-export-model .img-url img{width:.083333rem;height:.083333rem;cursor:pointer}.padding-batch-export-model .scene-select{width:100%;background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}.padding-batch-export-model .scene-select input{background:#2a2e39;border:none}.padding-batch-export-model .scene-select .el-select__tags .el-tag{background:#333}.padding-batch-export-model .do-box{width:100%;margin-top:.104167rem;color:#fff9;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.padding-batch-export-model .do-box span{margin-left:.104167rem}.padding-batch-export-model .do-box .btn-box{margin-right:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.padding-batch-export-model .do-box .btn-box .upload-demo .el-icon{display:none}.padding-batch-export-model .do-box .btn-box span{display:inline-block;color:#fff;font-size:.072917rem;border-radius:.020833rem;width:.427083rem;height:.166667rem;line-height:.166667rem;text-align:center;cursor:pointer}.padding-batch-export-model .do-box .btn-box span.export{background:#428fff}.padding-batch-export-model .do-box .btn-box span.submit{border:1px solid #428fff;color:#428fff}.padding-batch-export-model .do-box .btn-box span.back{color:#fff9;border:1px solid rgba(255,255,255,.6)}.field-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.field-box ul{padding-left:0;width:1.041667rem}.field-box ul li{width:100%;height:.15625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;font-size:.0625rem;text-align:left}.field-box ul li.active{background:rgba(34,37,44,.5)}.field-box ul li .tree-word{display:inline-block;width:.833333rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.field-box ul li .select-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.field-box ul li .select-box input{margin-right:.026042rem}.edit-confirm-dialog{background:#373b48}.edit-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.edit-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.edit-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.edit-confirm-dialog .dialog-content .confirm-tag{margin-top:.114583rem}.edit-confirm-dialog .dialog-content .confirm-tag span.el-radio__label{color:#fff;font-size:.0625rem}.edit-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.edit-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.edit-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48;height:.166667rem}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important;background:#2a2e39}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#212e3e!important}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#000}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#000}.cascader-float .el-cascader-panel{background:#212e3e!important}input:focus{outline:none}ul li{list-style:none}.el-table__inner-wrapper:before{background:rgba(255,255,255,.04)}.el-table .el-table__header th.el-table__cell.is-leaf,.el-table .el-table__header td.el-table__cell{border-color:#ffffff0a;background:rgba(255,255,255,.05)}.bantch-detail .upload-btn{border-color:#fff9;padding:0}\n")();

const _sfc_main = {
  setup() {
    let router = useRouter();
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance();
    // eslint-disable-next-line no-unused-vars
    ref();
    // eslint-disable-next-line no-unused-vars
    ref();
    var timer = null;
    let state = reactive({
      value: '',
      fieldValue: '',
      dialogVisible: false,
      radio: 0,
      uploadData: [],
      uploadIndex: 0,
      jsonIndex: 0,
      fieldData: [],
      count: 1,
      countNum: 0,
      fbxData: [],
      source: 0,
      label: '操作',
    });
    onMounted(() => {
      // console.log(router.currentRoute.value.query.source, 'state.editData')
      if (router.currentRoute.value.query.source === 'siggle') {
        state.source = 0;
        state.label = '';
      } else {
        state.source = 1;
        state.label = '操作';
      }
      console.log(state.uploadData, 'state.uploadData');
      proxy.getModelComparedInfo();
    });
    const methods = {
      async getModelComparedInfo() {
        var params = JSON.parse(localStorage.getItem('modelStr'));
        console.log(params, 'state.uploadData');
        var arr = [];
        params.map(item => {
          if (item.fileName.indexOf('pakchunk') != -1) {
            console.log(item.initName, 'item.fileName');
            arr.push(item.initName.replace(/[^\d]/g, ''));
          }
        });
        if (arr.length <= 0) {
          ElMessage.warning('上传文件不符合');
          return
        }
        console.log(arr, 888);
        arr = Array.from(new Set(arr));
        let data = await getModelComparedInfo(arr);
        console.log(data, 'data');
        if (data.code === 1 && data.data) {
          if (data.data.length <= 0) {
            ElMessage.warning('没有匹配到的数据');
            return
          }
          data.data.map(item => {
            // item.chunkId = ''
            item.loadPath = '';
            params.map(val => {
              if (item.chunkId === Number(val.initName.replace(/[^\d]/g, ''))) {
                console.log(item, val, 3333);
                item.fileSize = val.size;
                item.modeCode = item.code;
                item.modelProcessedFile = val.initName + '.' + val.format;
                item.modelFileProcessUrl =
                  val.fileValue + val.fileName + '.' + val.format;
              }
            });
          });
          console.log(data.data, 'data.data');
          state.uploadData = data.data;
        }
      },
      produceNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
      },
      // changeName(str) {
      //   var date = new Date()
      //   var str =
      //     '' +
      //     date.getFullYear() +
      //     (date.getMonth() + 1) +
      //     date.getDate() +
      //     date.getMinutes() +
      //     proxy.produceNum(10000, 10000000000)
      //   var sceneFileNameArr = sceneFileName.split('.')
      //   var sceneFile =
      //     sceneFileNameArr[0] + '-' + str + '.' + sceneFileNameArr[1]
      // },
      onFileAdded(file) {
        console.log(file, 88888);
        state.fbxData.push(file);
        // file.name.split('.')[0]
        if (state.count >= 1) {
          proxy.success();
          state.count = 0;
        }
      },
      exportUrl(file) {
        state.fbxData.push(file);
        if (state.count >= 1) {
          proxy.success();
          state.count = 0;
        }
      },
      success() {
        const loadingInstance = ElLoading.service({
          lock: true,
          text: '匹配中，请稍后~',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        timer = setInterval(() => {
          state.countNum++;
          if (state.countNum >= 6) {
            state.countNum = 0;
            clearInterval(timer);
            proxy.uploadSuccess();
            loadingInstance.close();
            timer = null;
          }
        }, 1000);
      },
      uploadSuccess() {
        var params = Array.from(
          new Set(
            JSON.parse(localStorage.getItem('modelStr')).concat(state.fbxData)
          )
        );
        localStorage.setItem('modelStr', JSON.stringify(params));
        proxy.getModelComparedInfo();
      },
      deleteScene(scope) {
        var params = JSON.parse(localStorage.getItem('modelStr'));
        console.log(params, scope, 333);
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            state.uploadData.splice(index, 1);
          }
        });
        params.map((val, valIndex) => {
          if (val.fileName === scope.row.modelPendingFile) {
            params.splice(valIndex, 1);
          }
        });
        localStorage.setItem('modelStr', JSON.stringify(params));
        proxy.getModelComparedInfo();
      },
      sublitClick() {
        state.dialogVisible = true;
      },
      // 上传确认
      enterSubmit() {
        var params = state.uploadData;
        var saveData = JSON.parse(localStorage.getItem('modelStr'));
        // console.log(params, 'params')
        // var isHaveId = params.every(item => {
        //   return item.chunkId === ''
        // })
        var isHaveLoadPath = params.every(item => {
          return item.loadPath === ''
        });
        if (isHaveLoadPath) {
          ElMessage.error('请输入模块引用地址');
          return
        }
        console.log(saveData, params);
        if (state.source === 1) {
          proxy.batchSubmit(params);
        } else {
          proxy.siggleSubmit(params);
        }
      },
      async siggleSubmit(params) {
        let data = await dealWithModel(params[0]);
        console.log(data, 222);
        if (data.code === 1) {
          ElMessage({
            message: '提交成功',
            type: 'success',
            onClose: () => {
              localStorage.removeItem('modelStr');
              router.push({
                name: 'modelIndex',
                query: {
                  from: 'dclmx',
                },
              });
            },
          });
        } else {
          ElMessage.error(data.msg);
        }
      },
      async batchSubmit(params) {
        let data = await batchDealWithModel(params);
        console.log(data, 222);
        if (data.code === 1) {
          ElMessage({
            message: '提交成功',
            type: 'success',
            onClose: () => {
              localStorage.removeItem('modelStr');
              router.push({
                name: 'modelIndex',
                query: {
                  from: 'dclmx',
                },
              });
            },
          });
        } else {
          ElMessage.error(data.msg);
        }
      },
      backClick() {
        router.push({
          name: 'modelIndex',
          query: {
            from: 'dclmx',
          },
        });
      },
      deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].name == arr[j].name) {
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
  mounted() {},
  components: {
    UploadFile: _sfc_main$1,
  },
};

const _hoisted_1 = { class: "padding-batch-export-model" };
const _hoisted_2 = /*#__PURE__*/createBaseVNode("h1", null, "批量处理", -1);
const _hoisted_3 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("label", null, "提交时间")
], -1);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("label", null, "模型来源")
], -1);
const _hoisted_5 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("label", null, "上传人")
], -1);
const _hoisted_6 = { class: "table-input" };
const _hoisted_7 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("label", null, "源文件")
], -1);
const _hoisted_8 = { class: "table-input" };
const _hoisted_9 = { class: "table-input" };
const _hoisted_10 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "块ID")
], -1);
const _hoisted_11 = { class: "table-input" };
const _hoisted_12 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "模型引用地址")
], -1);
const _hoisted_13 = { class: "table-input" };
const _hoisted_14 = ["onUpdate:modelValue"];
const _hoisted_15 = ["onClick"];
const _hoisted_16 = /*#__PURE__*/createBaseVNode("input", {
  style: {"display":"none"},
  type: "file",
  name: "file",
  id: "file",
  multiple: "multiple"
}, null, -1);
const _hoisted_17 = { class: "do-box" };
const _hoisted_18 = { class: "btn-box" };
const _hoisted_19 = /*#__PURE__*/createBaseVNode("div", { class: "dialog-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
    /*#__PURE__*/createBaseVNode("span", null, "确定提交吗？")
  ])
], -1);
const _hoisted_20 = { class: "dialog-footer" };
const _hoisted_21 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_22 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_UploadFile = resolveComponent("UploadFile");
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
          label: "序号",
          width: "100"
        }),
        createVNode(_component_el_table_column, {
          prop: "createTime",
          "min-width": "10%"
        }, {
          header: withCtx(() => [
            _hoisted_3
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_4
          ]),
          default: withCtx((scope) => [
            createBaseVNode("span", null, toDisplayString(scope.row.companyName), 1)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_5
          ]),
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_6, toDisplayString(scope.row.ownerName), 1)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "模型名称",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("span", null, toDisplayString(scope.row.name), 1)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_7
          ]),
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_8, toDisplayString(scope.row.modelPendingFile), 1)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "处理后文件",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("span", null, toDisplayString(scope.row.state === 0 ? '上传中' : scope.row.modelProcessedFile), 1)
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_10
          ]),
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("span", null, toDisplayString(scope.row.chunkId), 1)
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10" }, {
          header: withCtx(() => [
            _hoisted_12
          ]),
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_13, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": $event => ((scope.row.loadPath) = $event),
                placeholder: "请输入",
                type: "text"
              }, null, 8, _hoisted_14), [
                [vModelText, scope.row.loadPath]
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          "class-name": "table-tr",
          label: _ctx.label,
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", {
              style: normalizeStyle([{ display: _ctx.source === 1 ? 'block' : 'none' }, {"color":"#428fff"}]),
              onClick: $event => (_ctx.deleteScene(scope)),
              class: "table-input"
            }, " 删除 ", 12, _hoisted_15)
          ]),
          _: 1
        }, 8, ["label"])
      ]),
      _: 1
    }, 8, ["data"]),
    _hoisted_16,
    createBaseVNode("div", _hoisted_17, [
      createBaseVNode("span", null, "共" + toDisplayString(_ctx.uploadData.length) + "个模型文件", 1),
      createBaseVNode("div", _hoisted_18, [
        createVNode(_component_UploadFile, {
          class: "bantch-detail",
          msg: "继续导入",
          onExportUrl: _ctx.exportUrl
        }, null, 8, ["onExportUrl"]),
        createBaseVNode("span", {
          class: "submit",
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.sublitClick && _ctx.sublitClick(...args)))
        }, "确认"),
        createBaseVNode("span", {
          class: "back",
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.backClick && _ctx.backClick(...args)))
        }, "取消")
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.dialogVisible) = $event)),
      title: "提交确认",
      width: "640px",
      "custom-class": "edit-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_20, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.enterSubmit
          }, {
            default: withCtx(() => [
              _hoisted_21
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[2] || (_cache[2] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_22
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_19
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var pendingExport = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { pendingExport as default };
