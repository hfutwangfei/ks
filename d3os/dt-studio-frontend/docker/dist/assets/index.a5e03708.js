import { u as useSearchForm, a as usePagination } from './usePagination.61a5d9aa.js';
import { s as service, _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { l as ref, a3 as ElMessageBox, x as ElMessage, j as reactive, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, u as unref, a7 as isRef, O as toDisplayString, W as pushScopeId, X as popScopeId, ac as watchEffect, T as onMounted, w as withCtx, L as Fragment, M as renderList, c as createBlock, N as createTextVNode } from './element-plus.da98f360.js';
import { u as useDownload } from './useDownload.d93d4421.js';
import './monaco-editor.e9574fd0.js';
import './FileSaver.min.1c09ff21.js';

const prefix = `/api/model-object-template`;

const addOrEditObjectTemplate = data => {
  return service({
    url: `${prefix}/addOrEditObjectTemplate`,
    method: 'post',
    data,
  })
};

const batchDelectTemplate = data => {
  return service({
    url: `${prefix}/batchDelectTemplate`,
    method: 'delete',
    data,
  })
};

const getModelList = params => {
  return service({
    url: `${prefix}/getModelList`,
    method: 'get',
    params,
  })
};

const getTemplatePage = data => {
  return service({
    url: `${prefix}/getTemplatePage`,
    method: 'post',
    data,
  })
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 10:57:52
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-12 15:46:58
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/modelList/useSelection.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useSelection = () => {
  const selection = ref(new Map());

  const selectionQueryListCallback = ref();

  // 删除选中事件处理数据格式函数
  const deleteSelected = item => {
    // 删除信息合集。 text为提示信息，list为id列表
    const deleteInitialInfo = {
      text: '是否确认删除模版',
    };

    const deleteInfo = item.id
      ? deleteItem(deleteInitialInfo, item)
      : deleteList(deleteInitialInfo);

    confirmDelete(deleteInfo);
  };

  // 删除单个项目
  const deleteItem = (deleteInitialInfo, item) => ({
    list: [item.id],
    text: `${deleteInitialInfo.text}${item.name}, 删除此记录后将无法恢复!`,
  });

  // 批量删除
  const deleteList = deleteInitialInfo => {
    if (selection.value.size === 0) return deleteInitialInfo

    let text = '';
    const list = [];

    for (let value of selection.value.values()) {
      text += `${value.name}、`;
      list.push(value.id);
    }

    text = text.substring(0, text.length - 1);

    return {
      list,
      text: `${deleteInitialInfo.text}${text}, 删除此记录后将无法恢复!`,
    }
  };

  // 确认删除提示框
  const confirmDelete = ({ text, list }) => {
    if (list.length === 0) return

    ElMessageBox.confirm(text, '确认提示', {
      confirmButtonText: '确 认',
      cancelButtonText: '取 消',
      type: 'warning',
    })
      .then(async () => {
        const res = await batchDelectTemplate(list);

        if (res.code === 1) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          });

          if (typeof selectionQueryListCallback.value === 'function') {
            selectionQueryListCallback.value();
          }
        } else {
          ElMessage.error(res.msg);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  // 选中卡片事件, 从selection中添加或者删除item
  const updateSelection = (action, item) =>
    selection.value[action](item.id, item);

  return { updateSelection, deleteSelected, selectionQueryListCallback }
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 12:27:39
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-12 17:05:46
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/modelList/useDialog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useDialog = () => {
  const dialogVisible = ref(false);
  const dialogFormRef = ref(null);
  const dialogForm = reactive({});
  const dialogQueryListCallback = ref(null);

  const dialogFormRules = reactive({
    name: [{ required: true, message: '请输入模版名称', trigger: 'blur' }],
    model: [{ required: true, message: '请选择模型', trigger: 'blur' }],
  });

  const openDialog = () => {
    dialogVisible.value = true;
  };
  const closeDialog = () => {
    dialogVisible.value = false;
    dialogFormRef.value.resetFields();
  };

  const openEditDialog = item => {
    dialogForm.name = item.name;
    dialogForm.id = item.id;
    dialogForm.model = {
      name: item.modelName,
      code: item.modelCode,
    };

    openDialog();
  };

  // 对话框提交事件
  const submitDialogForm = () => {
    dialogFormRef.value.validate(async (valid, fields) => {
      if (valid) {
        const { name, model, id } = dialogForm;
        const { code: modelCode, name: modelName } = model;

        let requestParams = {
          name,
          modelCode,
          modelName,
        };

        let successText = id ? '修改成功!' : '新增成功!';

        if (id) {
          requestParams.id = id;
        }

        const res = await addOrEditObjectTemplate(requestParams);

        if (res.code === 1) {
          closeDialog();

          ElMessage.success(successText);

          if (typeof dialogQueryListCallback.value === 'function') {
            dialogQueryListCallback.value();
          }
        } else {
          ElMessage.error(res.msg);
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  return {
    dialogVisible,
    dialogForm,
    dialogFormRef,
    dialogQueryListCallback,
    openDialog,
    openEditDialog,
    closeDialog,
    dialogFormRules,
    submitDialogForm,
  }
};

var Card_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-card-list[data-v-5136b53d]{display:grid;grid-template-columns:repeat(5,1fr);gap:.052083rem;list-style:none;padding:0;margin:0}.c-card-item[data-v-5136b53d]{background:#373B48;border-radius:.020833rem}.c-card-item .c-card-checkbox[data-v-5136b53d]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding-right:.083333rem}.c-card-item .c-card-checkbox[data-v-5136b53d] .el-checkbox__input .el-checkbox__inner{width:.083333rem;height:.083333rem}.c-card-item .c-card-checkbox[data-v-5136b53d] .el-checkbox__input .el-checkbox__inner:after{left:.020833rem;top:0;height:.041667rem;width:.026042rem}.c-card-item .c-card-body[data-v-5136b53d]{border-bottom:.005208rem solid rgba(255,255,255,.05)}.c-card-item .c-card-content[data-v-5136b53d]{padding:0 .083333rem .083333rem;-webkit-box-sizing:border-box;box-sizing:border-box}.c-card-item .c-card-content[data-v-5136b53d]{display:-webkit-box;display:-ms-flexbox;display:flex;cursor:pointer}.c-card-item .c-card-content .c-view[data-v-5136b53d]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-card-item .c-decoration[data-v-5136b53d]{padding:.052083rem 0;margin-right:.052083rem}.c-card-item .c-decoration .top[data-v-5136b53d],.c-card-item .c-decoration .bottom[data-v-5136b53d]{width:.046875rem;height:.09375rem;border-left:.005208rem solid rgba(255,255,255,.15);margin-left:.020833rem}.c-card-item .c-decoration .top[data-v-5136b53d]{border-top:.005208rem solid rgba(255,255,255,.15)}.c-card-item .c-decoration .bottom[data-v-5136b53d]{border-bottom:.005208rem solid rgba(255,255,255,.15)}.c-card-item .c-card-footer[data-v-5136b53d]{padding:.083333rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-card-item .c-card-footer span[data-v-5136b53d]:not(:first-child){margin-left:.083333rem}.c-card-item .c-card-footer .svg-img[data-v-5136b53d]{display:inline-block;width:.104167rem;height:.104167rem;color:#fff9;cursor:pointer}\n")();

const _withScopeId = n => (pushScopeId("data-v-5136b53d"),n=n(),popScopeId(),n);
const _hoisted_1$1 = { class: "c-card-item" };
const _hoisted_2$1 = { class: "c-card-checkbox" };
const _hoisted_3$1 = { class: "c-card-content" };
const _hoisted_4$1 = { class: "c-decoration" };
const _hoisted_5$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "top" }, null, -1));
const _hoisted_6$1 = { class: "mid" };
const _hoisted_7$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "bottom" }, null, -1));
const _hoisted_8$1 = { class: "c-view" };
const _hoisted_9$1 = { class: "c-card-footer" };


const _sfc_main$1 = {
  __name: 'Card',
  props: {
  data: {
    type: Object,
  },
  deleteItem: {
    type: Function,
  },
},
  emits: ['selected', 'edit'],
  setup(__props, { emit: $emit }) {

const props = __props;

const { downloadModelTsl } = useDownload();

const router = useRouter();

// 卡片勾选事件
const useChecked = () => {
  const isChecked = ref(false);

  const toggleCheckBox = () => (isChecked.value = !isChecked.value);

  watchEffect(() => {
    const action = isChecked.value ? 'set' : 'delete';

    $emit('selected', action, props.data);
  });

  return { isChecked, toggleCheckBox }
};

// 卡片底部动作事件
const useActions = () => {
  const view = () => {
    const { code: templateCode, modelCode, id: templateId } = props.data;
    router.push({
      name: 'dataBindingMappingModelTemplateList',
      params: { templateId, templateCode, modelCode },
    });
  };

  const edit = () => $emit('edit', props.data);

  const download = () => downloadModelTsl(props.data.modelCode);

  return { view, edit, download }
};

const { isChecked, toggleCheckBox } = useChecked();
const { view, edit, download } = useActions();




return (_ctx, _cache) => {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_svg_icon = resolveComponent("svg-icon");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createVNode(_component_el_checkbox, {
        modelValue: unref(isChecked),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(isChecked) ? (isChecked).value = $event : null)),
        size: "large"
      }, null, 8, ["modelValue"])
    ]),
    createBaseVNode("div", {
      class: "c-card-body",
      onClick: _cache[1] || (_cache[1] = (...args) => (unref(toggleCheckBox) && unref(toggleCheckBox)(...args)))
    }, [
      createBaseVNode("div", _hoisted_3$1, [
        createBaseVNode("div", _hoisted_4$1, [
          _hoisted_5$1,
          createBaseVNode("div", _hoisted_6$1, [
            createVNode(_component_svg_icon, {
              name: "connection",
              class: "svg-img"
            })
          ]),
          _hoisted_7$1
        ]),
        createBaseVNode("div", _hoisted_8$1, [
          createBaseVNode("div", null, toDisplayString(__props.data.name), 1),
          createBaseVNode("div", null, toDisplayString(__props.data.modelName), 1)
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_9$1, [
      createBaseVNode("span", {
        onClick: _cache[2] || (_cache[2] = (...args) => (unref(view) && unref(view)(...args)))
      }, [
        createVNode(_component_svg_icon, {
          class: "svg-img",
          name: "show"
        })
      ]),
      createBaseVNode("span", {
        onClick: _cache[3] || (_cache[3] = (...args) => (unref(download) && unref(download)(...args)))
      }, [
        createVNode(_component_svg_icon, {
          class: "svg-img",
          name: "download"
        })
      ]),
      createBaseVNode("span", {
        onClick: _cache[4] || (_cache[4] = (...args) => (unref(edit) && unref(edit)(...args)))
      }, [
        createVNode(_component_svg_icon, {
          class: "svg-img",
          name: "edit"
        })
      ]),
      createBaseVNode("span", {
        onClick: _cache[5] || (_cache[5] = $event => (__props.deleteItem(__props.data)))
      }, [
        createVNode(_component_svg_icon, {
          class: "svg-img",
          name: "delete"
        })
      ])
    ])
  ]))
}
}

};
var Card = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-5136b53d"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-container[data-v-c71513b0]{width:100%;padding:.104167rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-container .c-empty-text[data-v-c71513b0]{text-align:center;height:.520833rem;line-height:.520833rem;color:#fff9}.c-container .c-breadcrumb[data-v-c71513b0]{font-size:.083333rem;font-weight:500;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.166667rem;cursor:pointer}.c-container .c-header[data-v-c71513b0]{height:.166667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-content[data-v-c71513b0]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:.104167rem 0;max-height:4.791667rem;overflow-y:auto}.c-container .c-action-button-list[data-v-c71513b0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.c-container .c-action-button-list[data-v-c71513b0] .el-upload-list{display:none}.c-container .c-form-content[data-v-c71513b0]{max-width:3.125rem;height:80%;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-form-content[data-v-c71513b0] .el-input{--el-disabled-text-color: #fff;--el-input-text-color: #fff}.c-container .c-form-content[data-v-c71513b0] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content[data-v-c71513b0] .el-form{width:100%}.c-container .c-form-content[data-v-c71513b0] .el-form .el-form-item__label{color:#fff9;margin-right:.083333rem}.c-container .c-form-content .c-form-table[data-v-c71513b0]{max-height:2.083333rem;overflow-y:auto;overflow-x:hidden;width:100%;padding:.083333rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff9;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content .c-form-table .c-form-table--row[data-v-c71513b0]{margin-bottom:.041667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-container .c-form-content .c-form-table .c-form-table--row.c-form-table--header-row[data-v-c71513b0]{line-height:.0625rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-c71513b0]{-webkit-box-flex:15;-ms-flex:15;flex:15;margin:0 .041667rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-c71513b0]:first-child{margin-left:0}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-c71513b0]:last-child{margin-right:0}.c-container .c-form-content .c-form-table .c-form-table--row--2 .c-form-table--col[data-v-c71513b0]:last-child{min-width:.145833rem;max-width:.145833rem;height:.145833rem;background-color:#363644;border-radius:.020833rem;-webkit-box-flex:1;-ms-flex:auto;flex:auto;text-align:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--header-row.c-form-table--row--2 .c-form-table--col[data-v-c71513b0]:last-child{background-color:transparent!important;height:0}.c-container .c-form-content .c-form-table .c-form-table--row-add[data-v-c71513b0]{width:100%;padding:.052083rem 0;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);font-size:.0625rem;line-height:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--row-add .icon[data-v-c71513b0]{margin-right:.052083rem}.c-container .c-form-content .c-form-table .c-form-table--row-add span[data-v-c71513b0]{margin-left:.052083rem}.c-container .c-table-content[data-v-c71513b0]{max-width:100%;overflow:hidden}.c-container .c-table-content .c-table-action[data-v-c71513b0]{font-size:.0625rem;color:#428fff;cursor:pointer;margin:0 .020833rem}.c-container .c-table-content[data-v-c71513b0] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.c-container .c-table-content[data-v-c71513b0] .c-table{background:transparent}.c-container .c-table-content[data-v-c71513b0] .c-table .el-table__inner-wrapper:before{display:none}.c-container .c-table-content[data-v-c71513b0] .c-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.c-container .c-table-content[data-v-c71513b0] .c-table .el-table__row{background:transparent}.c-container .c-table-content[data-v-c71513b0] .c-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.c-container .c-table-content[data-v-c71513b0] .c-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.c-container .c-table-content[data-v-c71513b0] .c-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}.c-container .c-footer[data-v-c71513b0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-container .c-footer[data-v-c71513b0] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.c-container .c-footer[data-v-c71513b0] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-footer[data-v-c71513b0] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.c-container .c-footer[data-v-c71513b0] .el-pagination .btn-prev,.c-container .c-footer[data-v-c71513b0] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-search-form[data-v-c71513b0]{--el-form-label-font-size: .0625rem;--el-text-color-regular: rgba(255, 255, 255, .6)}.c-container .c-search-form[data-v-c71513b0] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container[data-v-c71513b0] .el-textarea__inner{--el-input-border-color: rgba(255, 255, 255, .15);color:#fff;background-color:transparent}.c-container .el-button[data-v-c71513b0]{margin-left:.083333rem;padding:0 .083333rem;min-width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff}.c-container .el-button.el-button--primary[data-v-c71513b0]{color:#428fff;background:none}.c-container .el-button.el-button--success[data-v-c71513b0]{background:#428FFF;color:#fff}.c-container .el-button.el-button--warning[data-v-c71513b0]{color:#fff9;background:none;border:1px solid rgba(255,255,255,.6)}.c-container .el-input[data-v-c71513b0]{font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.c-container .el-input[data-v-c71513b0] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-c71513b0] .el-input__inner::-moz-placeholder{color:#ffffff4d}.c-container .el-input[data-v-c71513b0] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-c71513b0] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-c71513b0] .el-input__inner::placeholder{color:#ffffff4d}.c-card-list[data-v-c71513b0]{display:grid;grid-template-columns:repeat(5,1fr);gap:.052083rem;list-style:none;padding:0;margin:0}.c-card-item[data-v-c71513b0]{background:#373B48;border-radius:.020833rem}.c-card-item .c-card-checkbox[data-v-c71513b0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding-right:.083333rem}.c-card-item .c-card-checkbox[data-v-c71513b0] .el-checkbox__input .el-checkbox__inner{width:.083333rem;height:.083333rem}.c-card-item .c-card-checkbox[data-v-c71513b0] .el-checkbox__input .el-checkbox__inner:after{left:.020833rem;top:0;height:.041667rem;width:.026042rem}.c-card-item .c-card-body[data-v-c71513b0]{border-bottom:.005208rem solid rgba(255,255,255,.05)}.c-card-item .c-card-content[data-v-c71513b0]{padding:0 .083333rem .083333rem;-webkit-box-sizing:border-box;box-sizing:border-box}.t-dialog .c-dialog-form[data-v-c71513b0]{max-width:3.125rem;margin:0 auto .15625rem}.t-dialog .c-dialog-form .el-form-item[data-v-c71513b0]{margin-bottom:.15625rem}.t-dialog .c-dialog-form[data-v-c71513b0] .el-select{width:100%}\n")();

const _hoisted_1 = { class: "c-container" };
const _hoisted_2 = { class: "c-header" };
const _hoisted_3 = { class: "c-search-form" };
const _hoisted_4 = /*#__PURE__*/createTextVNode(" 查询 ");
const _hoisted_5 = /*#__PURE__*/createTextVNode(" 重置 ");
const _hoisted_6 = { class: "c-action-button-list" };
const _hoisted_7 = /*#__PURE__*/createTextVNode(" 批量删除 ");
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 新增 ");
const _hoisted_9 = { class: "c-content" };
const _hoisted_10 = {
  key: 0,
  class: "c-card-list"
};
const _hoisted_11 = {
  key: 1,
  class: "c-empty-text"
};
const _hoisted_12 = { class: "c-footer" };
const _hoisted_13 = { class: "dialog-footer" };
const _hoisted_14 = /*#__PURE__*/createTextVNode(" 确定 ");
const _hoisted_15 = /*#__PURE__*/createTextVNode("取消");


const _sfc_main = {
  __name: 'index',
  setup(__props) {

const { searchForm, searchFormRef, resetSearchFrom } = useSearchForm([
  'name',
  'modelName',
]);

const {
  updateSelection,
  deleteSelected,
  selectionQueryListCallback,
} = useSelection();

const {
  pagination,
  paginationChange,
  paginationQueryListCallback,
} = usePagination();

const {
  dialogVisible,
  dialogForm,
  dialogFormRef,
  openDialog,
  dialogFormRules,
  closeDialog,
  openEditDialog,
  submitDialogForm,
  dialogQueryListCallback,
} = useDialog();

const list = ref([]);
const modelList = ref([]);

onMounted(() => {
  queryTemplateList();
  queryModelList();
});

// 查询列表
const queryTemplateList = async () => {
  const query = Object.assign(searchForm, pagination);
  const templateRes = await getTemplatePage(query);
  const { data } = templateRes;

  pagination.total = data.total;
  pagination.page = data.pageNum;
  list.value = data.list;
};

// 查询对话框模型列表
const queryModelList = async () => {
  const modelRes = await getModelList();
  modelList.value = modelRes.data;
};

dialogQueryListCallback.value = queryTemplateList;
paginationQueryListCallback.value = queryTemplateList;
selectionQueryListCallback.value = queryTemplateList;

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("section", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createVNode(_component_el_form, {
            inline: true,
            model: unref(searchForm),
            ref_key: "searchFormRef",
            ref: searchFormRef
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, {
                label: "物模版名称",
                prop: "name"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(searchForm).name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(searchForm).name) = $event)),
                    placeholder: "请输入物模版名称"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "模型名称",
                prop: "modelName"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(searchForm).modelName,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(searchForm).modelName) = $event)),
                    placeholder: "请输入模型名称"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    plain: "",
                    onClick: queryTemplateList,
                    "auto-insert-space": ""
                  }, {
                    default: withCtx(() => [
                      _hoisted_4
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "warning",
                    plain: "",
                    onClick: unref(resetSearchFrom),
                    "auto-insert-space": ""
                  }, {
                    default: withCtx(() => [
                      _hoisted_5
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createVNode(_component_el_button, {
            type: "primary",
            plain: "",
            onClick: unref(deleteSelected)
          }, {
            default: withCtx(() => [
              _hoisted_7
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            type: "success",
            plain: "",
            onClick: unref(openDialog),
            "auto-insert-space": ""
          }, {
            default: withCtx(() => [
              _hoisted_8
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      createBaseVNode("section", _hoisted_9, [
        (list.value.length)
          ? (openBlock(), createElementBlock("ul", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
                return (openBlock(), createElementBlock("li", {
                  class: "c-card-item",
                  key: item.id
                }, [
                  createVNode(Card, {
                    data: item,
                    onSelected: unref(updateSelection),
                    onEdit: unref(openEditDialog),
                    deleteItem: unref(deleteSelected)
                  }, null, 8, ["data", "onSelected", "onEdit", "deleteItem"])
                ]))
              }), 128))
            ]))
          : (openBlock(), createElementBlock("h2", _hoisted_11, "暂无模型映射"))
      ]),
      createBaseVNode("section", _hoisted_12, [
        createVNode(_component_el_pagination, {
          "page-size": unref(pagination).size,
          background: "",
          layout: "total, prev, pager, next",
          total: unref(pagination).total,
          onCurrentChange: unref(paginationChange)
        }, null, 8, ["page-size", "total", "onCurrentChange"])
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: unref(dialogVisible),
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => (isRef(dialogVisible) ? (dialogVisible).value = $event : null)),
      title: "物模版信息",
      width: 640,
      "custom-class": "t-dialog",
      onClose: unref(closeDialog)
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_13, [
          createVNode(_component_el_button, {
            type: "primary",
            onClick: unref(submitDialogForm),
            "auto-insert-space": ""
          }, {
            default: withCtx(() => [
              _hoisted_14
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            onClick: unref(closeDialog),
            "auto-insert-space": "",
            plain: ""
          }, {
            default: withCtx(() => [
              _hoisted_15
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          class: "c-dialog-form",
          ref_key: "dialogFormRef",
          ref: dialogFormRef,
          model: unref(dialogForm),
          "label-width": 120,
          rules: unref(dialogFormRules),
          "label-position": "right"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, {
              prop: "name",
              label: "物模版名称"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: unref(dialogForm).name,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(dialogForm).name) = $event)),
                  placeholder: "请输入物模版名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              prop: "model",
              label: "模型名称"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  modelValue: unref(dialogForm).model,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(dialogForm).model) = $event)),
                  "value-key": "code",
                  filterable: "",
                  clearable: "",
                  placeholder: "请选择模型"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(modelList.value, (item) => {
                      return (openBlock(), createBlock(_component_el_option, {
                        key: item.code,
                        label: item.name,
                        value: item
                      }, null, 8, ["label", "value"]))
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])
      ]),
      _: 1
    }, 8, ["modelValue", "onClose"])
  ], 64))
}
}

};
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-c71513b0"]]);

export { index as default };
