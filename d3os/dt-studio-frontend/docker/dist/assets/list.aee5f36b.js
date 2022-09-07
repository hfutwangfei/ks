import { l as ref, a3 as ElMessageBox, x as ElMessage, T as onMounted, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, u as unref, aq as arrow_left_default, a4 as withModifiers, W as pushScopeId, X as popScopeId, N as createTextVNode } from './element-plus.da98f360.js';
import { u as useRouter, a as useRoute, c as store, e as axios, _ as _export_sfc } from './index.acc4a696.js';
import { b as batchDelectDefinition, g as getDefinitionPage } from './model-object-template-definition.51792958.js';
import { u as useSearchForm, a as usePagination } from './usePagination.61a5d9aa.js';
import { F as FileSaver } from './FileSaver.min.1c09ff21.js';
import { g as getEnumList } from './utils.36f2fffd.js';
import './monaco-editor.e9574fd0.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 12:59:47
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-15 14:08:30
 * @FilePath: /dt-commercialization-front/src/views/modelManage/modelPoint/composable/useRedirect.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useRedirect = () => {
  const router = useRouter();
  const route = useRoute();
  const { userType } = store.state.account.userinfo;

  /**
   * @description: 左上角返回事件，根据身份返回进入点位列表前的页面
   * @return {*}
   */
  const goToModelIndexPage = () => {
    console.log(store.state.account.userinfo, userType);
    const name = userType === 2 ? 'tenantModelList' : 'modelIndex';
    router.push({ name });
  };

  /**
   * @description: 点击编辑/新增按钮跳转点位详情页面
   * @param {*} id 点位id
   * @return {*}
   */
  const goToDetailPage = id => {
    router.push({
      name: 'modelPointDetail',
      params: {
        id,
        code: route.params.code,
      },
    });
  };

  return { goToModelIndexPage, goToDetailPage }
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 13:06:04
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-12 16:21:09
 * @FilePath: /dt-commercialization-front/src/views/modelManage/modelPoint/composable/useDownload.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useDownload = () => {
  /**
   * @description: 点位列表的模版下载
   * @return {*}
   */
  const downloadTemplate = async () => {
    const { authorization: Authorization } = store.state.app;

    axios({
      method: 'get',
      url: '/api/model-object-template-definition/download',
      responseType: 'arraybuffer',
      headers: {
        Authorization,
      },
    })
      .then(data => {
        const blob = new Blob([data.data]);
        FileSaver.saveAs(blob, '点位模版.xlsx');
      })
      .catch(error => {});
  };

  return { downloadTemplate }
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 10:57:52
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-19 18:43:50
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/modelList/useSelection.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useSelection = () => {
  const selection = ref([]);

  const selectionQueryListCallback = ref();

  // 删除选中事件处理数据格式函数
  const deleteSelected = item => {
    // 删除信息合集。 text为提示信息，list为id列表
    const deleteInitialInfo = {
      text: '是否确认删除点位',
      list: [],
    };

    const deleteInfo = item.id
      ? deleteItem(deleteInitialInfo, item)
      : deleteList(deleteInitialInfo);

    confirmDelete(deleteInfo);
  };

  // 删除单个项目
  const deleteItem = (deleteInitialInfo, item) => ({
    list: [item.id],
    text: `${deleteInitialInfo.text}${item.pointName}, 删除此记录后将无法恢复!`,
  });

  // 批量删除
  const deleteList = deleteInitialInfo => {
    if (selection.value.length === 0) return deleteInitialInfo

    let text = '';
    const list = [];

    selection.value.forEach(item => {
      text += `${item.pointName}、`;
      list.push(item.id);
    });

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
        const res = await batchDelectDefinition(list);

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

  // 选中列表
  const updateSelection = list => (selection.value = list);

  return { updateSelection, deleteSelected, selectionQueryListCallback }
};

var list_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-container[data-v-601f0b5e]{width:100%;padding:.104167rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-container .c-empty-text[data-v-601f0b5e]{text-align:center;height:.520833rem;line-height:.520833rem;color:#fff9}.c-container .c-breadcrumb[data-v-601f0b5e]{font-size:.083333rem;font-weight:500;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.166667rem;cursor:pointer}.c-container .c-header[data-v-601f0b5e]{height:.166667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-content[data-v-601f0b5e]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:.104167rem 0;max-height:4.791667rem;overflow-y:auto}.c-container .c-action-button-list[data-v-601f0b5e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.c-container .c-action-button-list[data-v-601f0b5e] .el-upload-list{display:none}.c-container .c-form-content[data-v-601f0b5e]{max-width:3.125rem;height:80%;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-form-content[data-v-601f0b5e] .el-input{--el-disabled-text-color: #fff;--el-input-text-color: #fff}.c-container .c-form-content[data-v-601f0b5e] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content[data-v-601f0b5e] .el-form{width:100%}.c-container .c-form-content[data-v-601f0b5e] .el-form .el-form-item__label{color:#fff9;margin-right:.083333rem}.c-container .c-form-content .c-form-table[data-v-601f0b5e]{max-height:2.083333rem;overflow-y:auto;overflow-x:hidden;width:100%;padding:.083333rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff9;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content .c-form-table .c-form-table--row[data-v-601f0b5e]{margin-bottom:.041667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-container .c-form-content .c-form-table .c-form-table--row.c-form-table--header-row[data-v-601f0b5e]{line-height:.0625rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-601f0b5e]{-webkit-box-flex:15;-ms-flex:15;flex:15;margin:0 .041667rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-601f0b5e]:first-child{margin-left:0}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-601f0b5e]:last-child{margin-right:0}.c-container .c-form-content .c-form-table .c-form-table--row--2 .c-form-table--col[data-v-601f0b5e]:last-child{min-width:.145833rem;max-width:.145833rem;height:.145833rem;background-color:#363644;border-radius:.020833rem;-webkit-box-flex:1;-ms-flex:auto;flex:auto;text-align:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--header-row.c-form-table--row--2 .c-form-table--col[data-v-601f0b5e]:last-child{background-color:transparent!important;height:0}.c-container .c-form-content .c-form-table .c-form-table--row-add[data-v-601f0b5e]{width:100%;padding:.052083rem 0;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);font-size:.0625rem;line-height:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--row-add .icon[data-v-601f0b5e]{margin-right:.052083rem}.c-container .c-form-content .c-form-table .c-form-table--row-add span[data-v-601f0b5e]{margin-left:.052083rem}.c-container .c-table-content[data-v-601f0b5e]{max-width:100%;overflow:hidden}.c-container .c-table-content .c-table-action[data-v-601f0b5e]{font-size:.0625rem;color:#428fff;cursor:pointer;margin:0 .020833rem}.c-container .c-table-content[data-v-601f0b5e] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.c-container .c-table-content[data-v-601f0b5e] .c-table{background:transparent}.c-container .c-table-content[data-v-601f0b5e] .c-table .el-table__inner-wrapper:before{display:none}.c-container .c-table-content[data-v-601f0b5e] .c-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.c-container .c-table-content[data-v-601f0b5e] .c-table .el-table__row{background:transparent}.c-container .c-table-content[data-v-601f0b5e] .c-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.c-container .c-table-content[data-v-601f0b5e] .c-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.c-container .c-table-content[data-v-601f0b5e] .c-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}.c-container .c-footer[data-v-601f0b5e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-container .c-footer[data-v-601f0b5e] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.c-container .c-footer[data-v-601f0b5e] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-footer[data-v-601f0b5e] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.c-container .c-footer[data-v-601f0b5e] .el-pagination .btn-prev,.c-container .c-footer[data-v-601f0b5e] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-search-form[data-v-601f0b5e]{--el-form-label-font-size: .0625rem;--el-text-color-regular: rgba(255, 255, 255, .6)}.c-container .c-search-form[data-v-601f0b5e] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container[data-v-601f0b5e] .el-textarea__inner{--el-input-border-color: rgba(255, 255, 255, .15);color:#fff;background-color:transparent}.c-container .el-button[data-v-601f0b5e]{margin-left:.083333rem;padding:0 .083333rem;min-width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff}.c-container .el-button.el-button--primary[data-v-601f0b5e]{color:#428fff;background:none}.c-container .el-button.el-button--success[data-v-601f0b5e]{background:#428FFF;color:#fff}.c-container .el-button.el-button--warning[data-v-601f0b5e]{color:#fff9;background:none;border:1px solid rgba(255,255,255,.6)}.c-container .el-input[data-v-601f0b5e]{font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.c-container .el-input[data-v-601f0b5e] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-601f0b5e] .el-input__inner::-moz-placeholder{color:#ffffff4d}.c-container .el-input[data-v-601f0b5e] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-601f0b5e] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-601f0b5e] .el-input__inner::placeholder{color:#ffffff4d}.c-container[data-v-601f0b5e]{height:100%;background:#2a2e39}\n")();

const _withScopeId = n => (pushScopeId("data-v-601f0b5e"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "c-container" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", null, "返回", -1));
const _hoisted_3 = { class: "c-header" };
const _hoisted_4 = { class: "c-search-form" };
const _hoisted_5 = /*#__PURE__*/createTextVNode(" 查询 ");
const _hoisted_6 = /*#__PURE__*/createTextVNode(" 重置 ");
const _hoisted_7 = { class: "c-action-button-list" };
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 导入点位文件 ");
const _hoisted_9 = /*#__PURE__*/createTextVNode(" 下载模版 ");
const _hoisted_10 = /*#__PURE__*/createTextVNode(" 批量删除 ");
const _hoisted_11 = /*#__PURE__*/createTextVNode(" 新增 ");
const _hoisted_12 = { class: "c-content c-table-content" };
const _hoisted_13 = ["innerHTML"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["onClick"];
const _hoisted_16 = { class: "c-footer" };


const _sfc_main = {
  __name: 'list',
  setup(__props) {

const headers = ref({
  Authorization: store.state.app.authorization,
});

const route = useRoute();

const { searchForm, searchFormRef, resetSearchFrom } = useSearchForm([
  'pointEnglish',
  'pointName',
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

const { goToModelIndexPage, goToDetailPage } = useRedirect();

const { downloadTemplate } = useDownload();

const uploadSuccess = () => {
  ElMessage.success('上传成功');

  queryList();
};

const list = ref([]);

onMounted(() => {
  queryList();
});

/**
 * @description: 查询列表，参数为搜索框，分页器，modelCode(route参数)
 * @return {*}
 */
const queryList = async () => {
  const query = {
    modelCode: route.params.code,
    ...searchForm,
    ...pagination,
  };

  delete pagination.total;

  const pointRes = await getDefinitionPage(query);

  const data = pointRes.data;

  // 存储请求数据，重新赋值分页器
  pagination.total = data.total;
  pagination.page = data.pageNum;
  list.value = data.list;
};

paginationQueryListCallback.value = queryList;
selectionQueryListCallback.value = queryList;

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: "c-breadcrumb",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(goToModelIndexPage) && unref(goToModelIndexPage)(...args)))
    }, [
      createVNode(_component_el_icon, { size: 14 }, {
        default: withCtx(() => [
          createVNode(unref(arrow_left_default))
        ]),
        _: 1
      }),
      _hoisted_2
    ]),
    createBaseVNode("section", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        createVNode(_component_el_form, {
          inline: true,
          ref_key: "searchFormRef",
          ref: searchFormRef,
          model: unref(searchForm)
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, {
              label: "点位英文名称",
              prop: "pointEnglish"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: unref(searchForm).pointEnglish,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(searchForm).pointEnglish) = $event)),
                  placeholder: "请输入点位英文名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "点位名称",
              prop: "pointName"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: unref(searchForm).pointName,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(searchForm).pointName) = $event)),
                  placeholder: "请输入点位名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  plain: "",
                  onClick: queryList,
                  "auto-insert-space": ""
                }, {
                  default: withCtx(() => [
                    _hoisted_5
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
                    _hoisted_6
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
      createBaseVNode("div", _hoisted_7, [
        createVNode(_component_el_upload, {
          ref: "uploadRef",
          accept: "xlsx",
          headers: headers.value,
          data: { modelCode: unref(route).params.code },
          "on-success": uploadSuccess,
          action: "/api/model-object-template-definition/importDefinition"
        }, {
          trigger: withCtx(() => [
            createVNode(_component_el_button, {
              type: "warning",
              plain: ""
            }, {
              default: withCtx(() => [
                _hoisted_8
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["headers", "data"]),
        createVNode(_component_el_button, {
          type: "warning",
          plain: "",
          onClick: unref(downloadTemplate),
          "auto-insert-space": ""
        }, {
          default: withCtx(() => [
            _hoisted_9
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          type: "primary",
          plain: "",
          onClick: unref(deleteSelected)
        }, {
          default: withCtx(() => [
            _hoisted_10
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          type: "success",
          plain: "",
          onClick: _cache[3] || (_cache[3] = withModifiers($event => (unref(goToDetailPage)(-1)), ["prevent"])),
          "auto-insert-space": ""
        }, {
          default: withCtx(() => [
            _hoisted_11
          ]),
          _: 1
        })
      ])
    ]),
    createBaseVNode("section", _hoisted_12, [
      createVNode(_component_el_table, {
        class: "c-table",
        data: list.value,
        onSelectionChange: unref(updateSelection)
      }, {
        default: withCtx(() => [
          createVNode(_component_el_table_column, {
            type: "selection",
            width: "55"
          }),
          createVNode(_component_el_table_column, {
            prop: "pointName",
            label: "点位名称"
          }),
          createVNode(_component_el_table_column, {
            prop: "pointEnglish",
            label: "点位英文名称"
          }),
          createVNode(_component_el_table_column, {
            prop: "dataType",
            label: "数据类型"
          }),
          createVNode(_component_el_table_column, {
            prop: "enumKey",
            label: "枚举字典"
          }, {
            default: withCtx((scope) => [
              createBaseVNode("span", {
                innerHTML: unref(getEnumList)(scope.row)
              }, null, 8, _hoisted_13)
            ]),
            _: 1
          }),
          createVNode(_component_el_table_column, {
            prop: "pointDesc",
            label: "描述"
          }),
          createVNode(_component_el_table_column, {
            label: "操作",
            width: "120"
          }, {
            default: withCtx((scope) => [
              createBaseVNode("span", {
                onClick: $event => (unref(goToDetailPage)(scope.row.id)),
                class: "c-table-action"
              }, " 编辑 ", 8, _hoisted_14),
              createBaseVNode("span", {
                onClick: $event => (unref(deleteSelected)(scope.row)),
                class: "c-table-action"
              }, " 删除 ", 8, _hoisted_15)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["data", "onSelectionChange"])
    ]),
    createBaseVNode("section", _hoisted_16, [
      createVNode(_component_el_pagination, {
        "page-size": unref(pagination).size,
        background: "",
        layout: "total, prev, pager, next",
        total: unref(pagination).total,
        onCurrentChange: unref(paginationChange)
      }, null, 8, ["page-size", "total", "onCurrentChange"])
    ])
  ]))
}
}

};
var list = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-601f0b5e"]]);

export { list as default };
