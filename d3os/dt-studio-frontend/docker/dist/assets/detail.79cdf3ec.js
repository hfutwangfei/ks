import { _ as _export_sfc, a as useRoute, u as useRouter } from './index.acc4a696.js';
import { l as ref, j as reactive, T as onMounted, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, u as unref, aq as arrow_left_default, C as createBaseVNode, G as createCommentVNode, L as Fragment, M as renderList, aa as minus_default, ab as plus_default, W as pushScopeId, X as popScopeId, N as createTextVNode, a3 as ElMessageBox } from './element-plus.da98f360.js';
import { u as useEnumFields } from './useEnumFields.6bbf4d51.js';
import { a as getDefinitionInfo, c as addOrEditDefinition } from './model-object-template-definition.51792958.js';
import './monaco-editor.e9574fd0.js';
import './index.browser.8e74d592.js';

var detail_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-container[data-v-534508f0]{width:100%;padding:.104167rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-container .c-empty-text[data-v-534508f0]{text-align:center;height:.520833rem;line-height:.520833rem;color:#fff9}.c-container .c-breadcrumb[data-v-534508f0]{font-size:.083333rem;font-weight:500;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.166667rem;cursor:pointer}.c-container .c-header[data-v-534508f0]{height:.166667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-content[data-v-534508f0]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:.104167rem 0;max-height:4.791667rem;overflow-y:auto}.c-container .c-action-button-list[data-v-534508f0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.c-container .c-action-button-list[data-v-534508f0] .el-upload-list{display:none}.c-container .c-form-content[data-v-534508f0]{max-width:3.125rem;height:80%;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-form-content[data-v-534508f0] .el-input{--el-disabled-text-color: #fff;--el-input-text-color: #fff}.c-container .c-form-content[data-v-534508f0] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content[data-v-534508f0] .el-form{width:100%}.c-container .c-form-content[data-v-534508f0] .el-form .el-form-item__label{color:#fff9;margin-right:.083333rem}.c-container .c-form-content .c-form-table[data-v-534508f0]{max-height:2.083333rem;overflow-y:auto;overflow-x:hidden;width:100%;padding:.083333rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff9;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content .c-form-table .c-form-table--row[data-v-534508f0]{margin-bottom:.041667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-container .c-form-content .c-form-table .c-form-table--row.c-form-table--header-row[data-v-534508f0]{line-height:.0625rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-534508f0]{-webkit-box-flex:15;-ms-flex:15;flex:15;margin:0 .041667rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-534508f0]:first-child{margin-left:0}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-534508f0]:last-child{margin-right:0}.c-container .c-form-content .c-form-table .c-form-table--row--2 .c-form-table--col[data-v-534508f0]:last-child{min-width:.145833rem;max-width:.145833rem;height:.145833rem;background-color:#363644;border-radius:.020833rem;-webkit-box-flex:1;-ms-flex:auto;flex:auto;text-align:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--header-row.c-form-table--row--2 .c-form-table--col[data-v-534508f0]:last-child{background-color:transparent!important;height:0}.c-container .c-form-content .c-form-table .c-form-table--row-add[data-v-534508f0]{width:100%;padding:.052083rem 0;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);font-size:.0625rem;line-height:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--row-add .icon[data-v-534508f0]{margin-right:.052083rem}.c-container .c-form-content .c-form-table .c-form-table--row-add span[data-v-534508f0]{margin-left:.052083rem}.c-container .c-table-content[data-v-534508f0]{max-width:100%;overflow:hidden}.c-container .c-table-content .c-table-action[data-v-534508f0]{font-size:.0625rem;color:#428fff;cursor:pointer;margin:0 .020833rem}.c-container .c-table-content[data-v-534508f0] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.c-container .c-table-content[data-v-534508f0] .c-table{background:transparent}.c-container .c-table-content[data-v-534508f0] .c-table .el-table__inner-wrapper:before{display:none}.c-container .c-table-content[data-v-534508f0] .c-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.c-container .c-table-content[data-v-534508f0] .c-table .el-table__row{background:transparent}.c-container .c-table-content[data-v-534508f0] .c-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.c-container .c-table-content[data-v-534508f0] .c-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.c-container .c-table-content[data-v-534508f0] .c-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}.c-container .c-footer[data-v-534508f0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-container .c-footer[data-v-534508f0] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.c-container .c-footer[data-v-534508f0] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-footer[data-v-534508f0] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.c-container .c-footer[data-v-534508f0] .el-pagination .btn-prev,.c-container .c-footer[data-v-534508f0] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-search-form[data-v-534508f0]{--el-form-label-font-size: .0625rem;--el-text-color-regular: rgba(255, 255, 255, .6)}.c-container .c-search-form[data-v-534508f0] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container[data-v-534508f0] .el-textarea__inner{--el-input-border-color: rgba(255, 255, 255, .15);color:#fff;background-color:transparent}.c-container .el-button[data-v-534508f0]{margin-left:.083333rem;padding:0 .083333rem;min-width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff}.c-container .el-button.el-button--primary[data-v-534508f0]{color:#428fff;background:none}.c-container .el-button.el-button--success[data-v-534508f0]{background:#428FFF;color:#fff}.c-container .el-button.el-button--warning[data-v-534508f0]{color:#fff9;background:none;border:1px solid rgba(255,255,255,.6)}.c-container .el-input[data-v-534508f0]{font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.c-container .el-input[data-v-534508f0] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-534508f0] .el-input__inner::-moz-placeholder{color:#ffffff4d}.c-container .el-input[data-v-534508f0] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-534508f0] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-534508f0] .el-input__inner::placeholder{color:#ffffff4d}.c-container[data-v-534508f0]{height:100%;background:#2a2e39}\n")();

const _withScopeId = n => (pushScopeId("data-v-534508f0"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "c-container" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", null, "模型点位信息", -1));
const _hoisted_3 = { class: "c-content" };
const _hoisted_4 = { class: "c-form-content" };
const _hoisted_5 = { class: "c-form-table" };
const _hoisted_6 = {
  key: 0,
  class: "c-form-table--row c-form-table--header-row c-form-table--row--2"
};
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, "字段", -1));
const _hoisted_8 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, "值", -1));
const _hoisted_9 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, null, -1));
const _hoisted_10 = [
  _hoisted_7,
  _hoisted_8,
  _hoisted_9
];
const _hoisted_11 = { class: "c-form-table--col" };
const _hoisted_12 = { class: "c-form-table--col" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", null, "添加", -1));
const _hoisted_15 = { class: "c-form-footer" };
const _hoisted_16 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_17 = /*#__PURE__*/createTextVNode(" 取消 ");


const _sfc_main = {
  __name: 'detail',
  setup(__props) {

const route = useRoute();
const router = useRouter();

const formRef = ref();

const form = reactive({
  pointName: '',
  pointEnglish: '',
  dataType: '',
  pointDesc: '',
});

const enumFields = useEnumFields();

onMounted(() => {
  const id = route.params.id;

  if (id != -1) {
    getPointInfo(id);
  }
});

const getPointInfo = async id => {
  const res = await getDefinitionInfo({ id });

  if (res.code === 1) {
    const {
      pointName,
      pointEnglish,
      dataType,
      pointDesc,
      enumKey,
      enumValue,
    } = res.data;

    form.pointName = pointName;
    form.pointEnglish = pointEnglish;
    form.pointDesc = pointDesc;
    form.dataType = dataType;

    enumFields.fill({ enumKey, enumValue });
  }
};

const submitForm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      const data = Object.assign(form, enumFields.toString());
      const id = route.params.id;

      data.modelCode = route.params.code;

      if (id != -1) {
        data.id = route.params.id;
      }

      const res = await addOrEditDefinition(data);

      const actionText = id != -1 ? '编辑' : '添加';

      if (res.code === 1) {
        ElMessageBox.confirm(
          `${actionText}点位成功，是否返回点位信息列表`,
          '确认提示',
          {
            confirmButtonText: '确 认',
            cancelButtonText: '取 消',
            type: 'warning',
          }
        )
          .then(() => {
            backToModelPointList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      console.log(res);
    } else {
      console.log('error submit!');
      return false
    }
  });
};

const backToModelPointList = () => {
  router.push({
    name: 'modelPointList',
    params: {
      code: route.params.code,
    },
  });
};

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_router_link = resolveComponent("router-link");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_router_link, {
      class: "c-breadcrumb",
      to: {
        name: 'modelPointList',
        params: {
          code: unref(route).params.code,
        },
      }
    }, {
      default: withCtx(() => [
        createVNode(_component_el_icon, { size: 14 }, {
          default: withCtx(() => [
            createVNode(unref(arrow_left_default))
          ]),
          _: 1
        }),
        _hoisted_2
      ]),
      _: 1
    }, 8, ["to"]),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        createVNode(_component_el_form, {
          ref_key: "formRef",
          ref: formRef,
          model: form,
          "status-icon": "",
          "label-width": "140px"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "点位名称" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: form.pointName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.pointName) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "点位英文名称" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: form.pointEnglish,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.pointEnglish) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "数据类型" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: form.dataType,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.dataType) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "枚举字典" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  (unref(enumFields).value.length > 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_6, _hoisted_10))
                    : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(enumFields).value, (enumField, enumFieldIndex) => {
                    return (openBlock(), createElementBlock("div", {
                      class: "c-form-table--row c-form-table--body-row c-form-table--row--2",
                      key: enumField.key
                    }, [
                      createBaseVNode("div", _hoisted_11, [
                        createVNode(_component_el_input, {
                          modelValue: enumField.enumKey,
                          "onUpdate:modelValue": $event => ((enumField.enumKey) = $event)
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_12, [
                        createVNode(_component_el_input, {
                          modelValue: enumField.enumValue,
                          "onUpdate:modelValue": $event => ((enumField.enumValue) = $event)
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createBaseVNode("div", {
                        class: "c-form-table--col",
                        onClick: $event => (unref(enumFields).remove(enumFieldIndex))
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(minus_default))
                          ]),
                          _: 1
                        })
                      ], 8, _hoisted_13)
                    ]))
                  }), 128)),
                  createBaseVNode("div", {
                    class: "c-form-table--row-add",
                    onClick: _cache[3] || (_cache[3] = (...args) => (unref(enumFields).add && unref(enumFields).add(...args)))
                  }, [
                    createVNode(_component_el_icon, {
                      class: "icon",
                      size: 16
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(plus_default))
                      ]),
                      _: 1
                    }),
                    _hoisted_14
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "描述" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: form.pointDesc,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.pointDesc) = $event)),
                  resize: "none",
                  rows: 5,
                  type: "textarea"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"]),
        createBaseVNode("div", _hoisted_15, [
          createVNode(_component_el_button, {
            type: "success",
            "auto-insert-space": "",
            onClick: submitForm
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }),
          createVNode(_component_el_button, {
            type: "warning",
            "auto-insert-space": "",
            onClick: backToModelPointList
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          })
        ])
      ])
    ])
  ]))
}
}

};
var detail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-534508f0"]]);

export { detail as default };
