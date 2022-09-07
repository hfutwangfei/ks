import { s as service, _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { u as useSearchForm, a as usePagination } from './usePagination.61a5d9aa.js';
import { u as useSwitch } from './useSwitch.af1bb2ba.js';
import { l as ref, T as onMounted, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, u as unref, N as createTextVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-13 11:44:09
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-14 10:25:55
 * @FilePath: /dt-commercialization-front/src/api/dataBinding/bindEntityInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const prefix = `/api/bindCaseInfo`;

const updateCase = data => {
  return service({
    url: `${prefix}/updateCase`,
    method: 'put',
    data,
  })
};

const queryAllCase = params => {
  return service({
    url: `${prefix}/queryAllCase`,
    method: 'get',
    params,
  })
};

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-container[data-v-7fbb0141]{width:100%;padding:.104167rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-container .c-empty-text[data-v-7fbb0141]{text-align:center;height:.520833rem;line-height:.520833rem;color:#fff9}.c-container .c-breadcrumb[data-v-7fbb0141]{font-size:.083333rem;font-weight:500;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.166667rem;cursor:pointer}.c-container .c-header[data-v-7fbb0141]{height:.166667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-content[data-v-7fbb0141]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:.104167rem 0;max-height:4.791667rem;overflow-y:auto}.c-container .c-action-button-list[data-v-7fbb0141]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.c-container .c-action-button-list[data-v-7fbb0141] .el-upload-list{display:none}.c-container .c-form-content[data-v-7fbb0141]{max-width:3.125rem;height:80%;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-form-content[data-v-7fbb0141] .el-input{--el-disabled-text-color: #fff;--el-input-text-color: #fff}.c-container .c-form-content[data-v-7fbb0141] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content[data-v-7fbb0141] .el-form{width:100%}.c-container .c-form-content[data-v-7fbb0141] .el-form .el-form-item__label{color:#fff9;margin-right:.083333rem}.c-container .c-form-content .c-form-table[data-v-7fbb0141]{max-height:2.083333rem;overflow-y:auto;overflow-x:hidden;width:100%;padding:.083333rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff9;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content .c-form-table .c-form-table--row[data-v-7fbb0141]{margin-bottom:.041667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-container .c-form-content .c-form-table .c-form-table--row.c-form-table--header-row[data-v-7fbb0141]{line-height:.0625rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-7fbb0141]{-webkit-box-flex:15;-ms-flex:15;flex:15;margin:0 .041667rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-7fbb0141]:first-child{margin-left:0}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-7fbb0141]:last-child{margin-right:0}.c-container .c-form-content .c-form-table .c-form-table--row--2 .c-form-table--col[data-v-7fbb0141]:last-child{min-width:.145833rem;max-width:.145833rem;height:.145833rem;background-color:#363644;border-radius:.020833rem;-webkit-box-flex:1;-ms-flex:auto;flex:auto;text-align:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--header-row.c-form-table--row--2 .c-form-table--col[data-v-7fbb0141]:last-child{background-color:transparent!important;height:0}.c-container .c-form-content .c-form-table .c-form-table--row-add[data-v-7fbb0141]{width:100%;padding:.052083rem 0;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);font-size:.0625rem;line-height:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--row-add .icon[data-v-7fbb0141]{margin-right:.052083rem}.c-container .c-form-content .c-form-table .c-form-table--row-add span[data-v-7fbb0141]{margin-left:.052083rem}.c-container .c-table-content[data-v-7fbb0141]{max-width:100%;overflow:hidden}.c-container .c-table-content .c-table-action[data-v-7fbb0141]{font-size:.0625rem;color:#428fff;cursor:pointer;margin:0 .020833rem}.c-container .c-table-content[data-v-7fbb0141] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.c-container .c-table-content[data-v-7fbb0141] .c-table{background:transparent}.c-container .c-table-content[data-v-7fbb0141] .c-table .el-table__inner-wrapper:before{display:none}.c-container .c-table-content[data-v-7fbb0141] .c-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.c-container .c-table-content[data-v-7fbb0141] .c-table .el-table__row{background:transparent}.c-container .c-table-content[data-v-7fbb0141] .c-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.c-container .c-table-content[data-v-7fbb0141] .c-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.c-container .c-table-content[data-v-7fbb0141] .c-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}.c-container .c-footer[data-v-7fbb0141]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-container .c-footer[data-v-7fbb0141] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.c-container .c-footer[data-v-7fbb0141] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-footer[data-v-7fbb0141] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.c-container .c-footer[data-v-7fbb0141] .el-pagination .btn-prev,.c-container .c-footer[data-v-7fbb0141] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-search-form[data-v-7fbb0141]{--el-form-label-font-size: .0625rem;--el-text-color-regular: rgba(255, 255, 255, .6)}.c-container .c-search-form[data-v-7fbb0141] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container[data-v-7fbb0141] .el-textarea__inner{--el-input-border-color: rgba(255, 255, 255, .15);color:#fff;background-color:transparent}.c-container .el-button[data-v-7fbb0141]{margin-left:.083333rem;padding:0 .083333rem;min-width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff}.c-container .el-button.el-button--primary[data-v-7fbb0141]{color:#428fff;background:none}.c-container .el-button.el-button--success[data-v-7fbb0141]{background:#428FFF;color:#fff}.c-container .el-button.el-button--warning[data-v-7fbb0141]{color:#fff9;background:none;border:1px solid rgba(255,255,255,.6)}.c-container .el-input[data-v-7fbb0141]{font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.c-container .el-input[data-v-7fbb0141] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-7fbb0141] .el-input__inner::-moz-placeholder{color:#ffffff4d}.c-container .el-input[data-v-7fbb0141] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-7fbb0141] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-7fbb0141] .el-input__inner::placeholder{color:#ffffff4d}\n")();

const _hoisted_1 = { class: "c-container" };
const _hoisted_2 = { class: "c-header" };
const _hoisted_3 = { class: "c-search-form" };
const _hoisted_4 = /*#__PURE__*/createTextVNode(" 查询 ");
const _hoisted_5 = /*#__PURE__*/createTextVNode(" 重置 ");
const _hoisted_6 = { class: "c-content c-table-content" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "c-footer" };


const _sfc_main = {
  __name: 'index',
  setup(__props) {

const router = useRouter();
const list = ref([]);

const { searchForm, searchFormRef, resetSearchFrom } = useSearchForm([
  'caseName',
  'caseStart',
]);

const {
  pagination,
  paginationChange,
  paginationQueryListCallback,
} = usePagination({
  current: 1,
});

const { switchLoading, changeSwitch, switchQueryListCallback } = useSwitch({
  updateSwitchEvent: updateCase,
  switchField: 'caseStart',
});

const redirectToApiDetail = row => {
  const superId = row.id;
  router.push({
    name: 'dataBindingBindingCaseApiList',
    params: { superId },
  });
};

onMounted(() => {
  getList();
});

// 查询列表
const getList = async () => {
  const query = {
    ...searchForm,
    ...pagination,
  };

  delete query.total;
  delete query.page;

  const caseListRes = await queryAllCase(query);

  const data = caseListRes.data;

  // 存储请求数据，重新赋值分页器
  pagination.total = data.total;
  pagination.current = data.current;
  list.value = data.records;
};

paginationQueryListCallback.value = getList;
switchQueryListCallback.value = getList;

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("section", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createVNode(_component_el_form, {
          model: unref(searchForm),
          inline: true,
          ref_key: "searchFormRef",
          ref: searchFormRef
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, {
              prop: "caseName",
              label: "案例名称"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: unref(searchForm).caseName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(searchForm).caseName) = $event)),
                  placeholder: "请输入案例名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              prop: "caseStart",
              label: "数据开启状态"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  modelValue: unref(searchForm).caseStart,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(searchForm).caseStart) = $event)),
                  placeholder: "请选择"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      value: 1,
                      label: "开启"
                    }),
                    createVNode(_component_el_option, {
                      value: 0,
                      label: "关闭"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  plain: "",
                  onClick: getList,
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
      ])
    ]),
    createBaseVNode("section", _hoisted_6, [
      createVNode(_component_el_table, {
        class: "c-table",
        data: list.value
      }, {
        default: withCtx(() => [
          createVNode(_component_el_table_column, {
            prop: "caseName",
            label: "案例名称"
          }),
          createVNode(_component_el_table_column, {
            prop: "caseStatus",
            label: "案例状态"
          }),
          createVNode(_component_el_table_column, { label: "数据开启状态" }, {
            default: withCtx((scope) => [
              createVNode(_component_el_switch, {
                "active-value": 1,
                "inactive-value": 0,
                loading: unref(switchLoading),
                "before-change": unref(changeSwitch).bind(this, scope.row),
                modelValue: scope.row.caseStart,
                "onUpdate:modelValue": $event => ((scope.row.caseStart) = $event)
              }, null, 8, ["loading", "before-change", "modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_table_column, {
            label: "操作",
            width: "120"
          }, {
            default: withCtx((scope) => [
              createBaseVNode("span", {
                onClick: $event => (redirectToApiDetail(scope.row)),
                class: "c-table-action"
              }, " 查看 ", 8, _hoisted_7)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["data"])
    ]),
    createBaseVNode("section", _hoisted_8, [
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
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7fbb0141"]]);

export { index as default };
