import { T as TenantLayoutModule } from './Classify.vue_vue_type_style_index_0_scoped_true_lang.e05be8cd.js';
import { _ as _export_sfc, u as useRouter, b as useStore, U as UE } from './index.acc4a696.js';
import { r as resolveComponent, o as openBlock, B as createElementBlock, L as Fragment, M as renderList, C as createBaseVNode, O as toDisplayString, Y as normalizeClass, G as createCommentVNode, a as createVNode, w as withCtx, W as pushScopeId, X as popScopeId, N as createTextVNode, h as computed, l as ref, m as watch, T as onMounted, a1 as withKeys, u as unref, a5 as search_default, c as createBlock, a6 as download_default, I as withDirectives, a0 as vShow } from './element-plus.da98f360.js';
import { r as removeTenantModel } from './tenantModel.e1d9386d.js';
import { _ as _imports_0$2 } from './tianjia.4a8b4043.js';
import { _ as _imports_0 } from './location-icon.2a626473.js';
import { _ as _imports_0$1, a as _imports_1 } from './delete-icon.a33587a6.js';
import { f as getModelPage, h as getTenantModelPagePost, i as getCommonModelPage, j as getTenantModelPageGet, k as getAllFieldList } from './drafts.60815a70.js';
import { g as getLabelList } from './sceneList.b22bf172.js';
import { u as useProgress } from './useProgress.535f7864.js';
import { _ as _imports_0$3 } from './warning-icon.ecaebaa1.js';
import './monaco-editor.e9574fd0.js';

const _withScopeId$2 = n => (pushScopeId("data-v-5d1758fb"),n=n(),popScopeId(),n);
const _hoisted_1$2 = { class: "classify" };
const _hoisted_2$2 = {
  key: 0,
  class: "classify__container"
};
const _hoisted_3$2 = { class: "title" };
const _hoisted_4$2 = { class: "classify__content" };
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$2 = {
  key: 1,
  class: "classify__container"
};
const _hoisted_7$2 = { class: "classify__wrap" };
const _hoisted_8$2 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("span", { class: "title" }, "标签", -1));
const _hoisted_9$2 = { class: "classify__content" };
const _hoisted_10$2 = ["onClick"];
const _hoisted_11$2 = { class: "classify__bottom" };
const _hoisted_12$2 = /*#__PURE__*/createTextVNode(" 重置 ");
const _hoisted_13$2 = /*#__PURE__*/createTextVNode("收起");


const _sfc_main$2 = {
  __name: 'Classify',
  props: {
  type: String,
  attributes: Object,
  subattributeId: Array,
  label: Object,
},
  emits: ['modelClick', 'sceneClick', 'reset', 'close'],
  setup(__props, { emit: emits }) {




return (_ctx, _cache) => {
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    (__props.type === 'model')
      ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.attributes, (attr) => {
            return (openBlock(), createElementBlock("div", {
              class: "classify__wrap",
              key: attr.id
            }, [
              createBaseVNode("span", _hoisted_3$2, toDisplayString(attr.attributesName) + "：", 1),
              createBaseVNode("div", _hoisted_4$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(attr.subattributes, (sub) => {
                  return (openBlock(), createElementBlock("div", {
                    class: normalizeClass(["btn", { active: __props.subattributeId.includes(sub.id) }]),
                    key: sub.id,
                    onClick: $event => (emits('modelClick', sub.id))
                  }, [
                    createBaseVNode("span", null, toDisplayString(sub.subattributeName), 1)
                  ], 10, _hoisted_5$2))
                }), 128))
              ])
            ]))
          }), 128))
        ]))
      : createCommentVNode("", true),
    (__props.type === 'scene')
      ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
          createBaseVNode("div", _hoisted_7$2, [
            _hoisted_8$2,
            createBaseVNode("div", _hoisted_9$2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.attributes, (attr) => {
                return (openBlock(), createElementBlock("div", {
                  class: normalizeClass(["btn", { active: __props.label.id === attr.id }]),
                  key: attr.id,
                  onClick: $event => (emits('sceneClick', attr))
                }, [
                  createBaseVNode("span", null, toDisplayString(attr.labelName), 1)
                ], 10, _hoisted_10$2))
              }), 128))
            ])
          ])
        ]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_11$2, [
      createVNode(_component_el_button, {
        type: "primary",
        size: "mini",
        onClick: _cache[0] || (_cache[0] = $event => (emits('reset')))
      }, {
        default: withCtx(() => [
          _hoisted_12$2
        ]),
        _: 1
      }),
      createVNode(_component_el_button, {
        size: "mini",
        onClick: _cache[1] || (_cache[1] = $event => (emits('close')))
      }, {
        default: withCtx(() => [
          _hoisted_13$2
        ]),
        _: 1
      })
    ])
  ]))
}
}

};
var Classify = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-5d1758fb"]]);

var ModelModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-6eaa10f9]::-webkit-scrollbar{display:none}.com[data-v-6eaa10f9]{width:2.083333rem;height:100%;padding:.104167rem .104167rem 0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.com[data-v-6eaa10f9] .el-tabs__nav-wrap:after{height:.005208rem;background:#ffffff;opacity:.05}.com[data-v-6eaa10f9] .el-tabs__active-bar{height:.005208rem;background:-webkit-gradient(linear,right top,left top,from(rgba(66,143,255,0)),color-stop(50%,#428fff),to(rgba(66,143,255,0)));background:linear-gradient(270deg,rgba(66,143,255,0) 0%,#428fff 50%,rgba(66,143,255,0) 100%)}.com[data-v-6eaa10f9] .el-tabs__item{height:.130208rem;line-height:.078125rem;color:#fff9}.com[data-v-6eaa10f9] .el-tabs__item.is-active{color:#428fff}.com__filter .el-row[data-v-6eaa10f9]{margin-bottom:.041667rem}.com__filter .el-input[data-v-6eaa10f9],.com__filter[data-v-6eaa10f9] .el-input__inner{height:.145833rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff;border-right:none;background:none}.com__filter .el-input[data-v-6eaa10f9]{border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.com__filter[data-v-6eaa10f9] .el-input-group__append{background:none;-webkit-box-shadow:none;box-shadow:none}.com__filter[data-v-6eaa10f9] .el-input-group__append .el-button{height:.135417rem;border:none;-webkit-box-sizing:border-box;box-sizing:border-box}.com__filter .el-select[data-v-6eaa10f9]{width:96%;border:1px solid rgba(255,255,255,.14)}.com__filter .el-select[data-v-6eaa10f9] .el-input__suffix,.com__filter .el-select[data-v-6eaa10f9] .el-input__icon{line-height:.145833rem}.com__filter[data-v-6eaa10f9] .filter-btn{padding:0;width:.145833rem;height:.145833rem;line-height:.145833rem;min-height:auto;border-radius:.020833rem;border:1px solid rgba(255,255,255,.14);background:none}.com__content[data-v-6eaa10f9]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-line-pack:start;align-content:flex-start}.com__item[data-v-6eaa10f9]{margin-bottom:.104167rem;width:49%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item .image-wrap[data-v-6eaa10f9]{position:relative;margin-bottom:.041667rem;padding-top:100%;width:100%}.com__item .image[data-v-6eaa10f9]{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:.041667rem}.com__item .download[data-v-6eaa10f9]{position:absolute;right:.041667rem;bottom:.041667rem;width:.25rem;height:.166667rem;background:rgba(255,255,255,.9);border-radius:.010417rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item span[data-v-6eaa10f9]{line-height:.0625rem;font-size:.0625rem;font-weight:400;color:#fff}.com__item .edit-delete-btn[data-v-6eaa10f9]{display:inline-block;vertical-align:middle;height:.072917rem;width:.072917rem;margin-left:.078125rem}.com__bottom[data-v-6eaa10f9]{padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.com__bottom[data-v-6eaa10f9] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.com__bottom[data-v-6eaa10f9] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com__bottom[data-v-6eaa10f9] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.com__bottom[data-v-6eaa10f9] .el-pagination .btn-prev,.com__bottom[data-v-6eaa10f9] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com .add-btn[data-v-6eaa10f9]{height:100%;width:96%;border-radius:.026042rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.052083rem;border:1px dashed #d9d9d9}\n")();

const _withScopeId$1 = n => (pushScopeId("data-v-6eaa10f9"),n=n(),popScopeId(),n);
const _hoisted_1$1 = { class: "com" };
const _hoisted_2$1 = { class: "com__filter" };
const _hoisted_3$1 = { class: "com__content" };
const _hoisted_4$1 = {
  key: 0,
  class: "com__item",
  style: {"min-height":"180px"}
};
const _hoisted_5$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("img", {
  style: {"cursor":"pointer"},
  src: _imports_0$2
}, null, -1));
const _hoisted_6$1 = [
  _hoisted_5$1
];
const _hoisted_7$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", { class: "scene-item-name-add" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"font-size":"12px","color":"rgba(255,255,255,0.6)"} }, "添加")
], -1));
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = { class: "image-wrap" };
const _hoisted_10$1 = ["onClick", "src"];
const _hoisted_11$1 = {
  key: 0,
  class: "download"
};
const _hoisted_12$1 = ["onClick"];
const _hoisted_13$1 = ["onClick"];
const _hoisted_14$1 = ["onClick"];
const _hoisted_15$1 = { class: "com__bottom" };


const _sfc_main$1 = {
  __name: 'ModelModule',
  emits: [
  'myClick',
  'changeAddDialog',
  'openEdit',
  'openDelete',
],
  setup(__props, { expose, emit }) {

const router = useRouter();

const store = useStore();

const userinfo = computed(() => store.state.account.userinfo);

// tab切换
const activeTab = ref('common');
watch(activeTab, tab => {
  console.log(tab);
  page.value = 1;
  total.value = 0;
  list.value = [];
  getModels();
});

// 领域
const fields = ref([]);
const fieldId = ref('');
const attributes = computed(() => {
  let active = fields.value.find(item => item.id === fieldId.value);
  return active?.attributes || []
});
const getFieldList = async () => {
  let { data } = await getAllFieldList();
  fields.value = data;
  fieldId.value = data.length ? data[0].id : '';
};
//标签
const labelList = ref([]);
const labelId = ref('');
const getLabelListFunc = async () => {
  let { data } = await getLabelList({ type: 0 });
  labelList.value = data;
  // labelId.value = data.length ? data[0].id : ''
};
// 模型列表
const name = ref('');
const show = ref(false);
const subattributeId = ref([]);
const page = ref(1);
const total = ref(0);
const list = ref([]);
const reset = () => {
  subattributeId.value = [];
  getModels();
};
const modelClick = id => {
  if (subattributeId.value.includes(id)) {
    let index = subattributeId.value.findIndex(item => item === id);
    subattributeId.value.splice(index, 1);
  } else {
    subattributeId.value.push(id);
  }
  getModels();
};
const modelListApi = computed(() => {
  let { userType } = userinfo.value;
  if (userType === 0) return getModelPage
  if (userType === 1) return getTenantModelPagePost
  if (userType === 2) {
    if (activeTab.value === 'common') return getCommonModelPage
    if (activeTab.value === 'mine') return getTenantModelPageGet
  }
  return getModelPage
});
const getModels = async () => {
  let { userType } = userinfo.value;
  let params = {};
  if (userType === 0) {
    params = {
      // attributesId
      // companyId: [1],
      // fieldId: fieldId.value,
      subattributeId: subattributeId.value,
    };
  }
  if (userType === 1) {
    params = {
      // attributesId
      // companyId: [1],
      // fieldId: fieldId.value,
      subattributeId: subattributeId.value,
    };
  }
  if (userType === 2) {
    if (activeTab.value === 'common') {
      params = {
        // attributesId
        // fieldId: fieldId.value,
        subattributeId: subattributeId.value,
      };
    }
    if (activeTab.value === 'mine') {
      params = {
        labelId: labelId.value,
      };
    }
  }
  let { data } = await modelListApi.value({
    ...params,
    name: name.value,
    page: page.value,
    state: 1,
  });
  list.value = data.list;
  total.value = data.total;
  // getqueryHadDownLoadModels();
};
const change = num => {
  page.value = num;
  getModels();
};

const listenUeInterface = () => {
  UE.publish('CGX_HotFixMessage', {});
  UE.subscribe('UE2JS_HotFixMessage', obj => {
    // console.log('UE2JS_HotFixMessage', obj)
    let { data } = obj;
    store.commit('app/setModels', data);
  });
};

onMounted(async () => {
  // childClick(list.value.length>0?list.value[0]:{});
  await getFieldList();
  await getModels();
  await getLabelListFunc();
  listenUeInterface();
  // getqueryHadDownLoadModels();
});

const empty = model => {
  console.log('下载完成，回调::', model);
};

const modelHandle = useProgress('model', list, empty);

// 注册事件

expose({
  getModels,
});
// 传给父组件的值
//更新父组件模型详情
const childClick = item => {
  // modelHandle(item);
  console.log('item-last:::', item);
  emit('myClick', JSON.stringify(item));
};

const jj = () => {
  emit('changeAddDialog');
};

const editPointFunc = item => {
  router.push({
    name: 'modelPointList',
    params: { code: item.code },
  });
};

const editModelFunc = item => {
  emit('openEdit', JSON.stringify(item));
};
const showDeleteDialog = item => {
  emit('openDelete', JSON.stringify(item));
};

return (_ctx, _cache) => {
  const _component_el_tab_pane = resolveComponent("el-tab-pane");
  const _component_el_tabs = resolveComponent("el-tabs");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_col = resolveComponent("el-col");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_progress = resolveComponent("el-progress");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(_component_el_tabs, {
      modelValue: activeTab.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((activeTab).value = $event))
    }, {
      default: withCtx(() => [
        createVNode(_component_el_tab_pane, {
          label: "通用模型",
          name: "common"
        }),
        createVNode(_component_el_tab_pane, {
          label: "我的模型",
          name: "mine"
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createBaseVNode("div", _hoisted_2$1, [
      createVNode(_component_el_row, null, {
        default: withCtx(() => [
          createVNode(_component_el_input, {
            modelValue: name.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((name).value = $event)),
            placeholder: "请输入模型名称",
            onKeyup: withKeys(getModels, ["enter"])
          }, {
            append: withCtx(() => [
              createVNode(_component_el_button, {
                icon: unref(search_default),
                onClick: getModels
              }, null, 8, ["icon"])
            ]),
            _: 1
          }, 8, ["modelValue", "onKeyup"])
        ]),
        _: 1
      }),
      createVNode(_component_el_row, { style: {"position":"relative"} }, {
        default: withCtx(() => [
          (activeTab.value === 'common')
            ? (openBlock(), createBlock(_component_el_col, {
                key: 0,
                span: 22
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    modelValue: fieldId.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((fieldId).value = $event)),
                    class: "m-2",
                    placeholder: "选择领域"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(fields.value, (item) => {
                        return (openBlock(), createBlock(_component_el_option, {
                          key: item.id,
                          label: item.fieldName,
                          value: item.id
                        }, null, 8, ["label", "value"]))
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }))
            : createCommentVNode("", true),
          (activeTab.value !== 'common')
            ? (openBlock(), createBlock(_component_el_col, {
                key: 1,
                span: 24
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    onChange: getModels,
                    modelValue: labelId.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((labelId).value = $event)),
                    style: {"width":"100% !important"},
                    placeholder: "选择标签"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "全部",
                        value: ""
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(labelList.value, (item) => {
                        return (openBlock(), createBlock(_component_el_option, {
                          key: item.id,
                          label: item.labelName,
                          value: item.id
                        }, null, 8, ["label", "value"]))
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }))
            : createCommentVNode("", true),
          (activeTab.value === 'common')
            ? (openBlock(), createBlock(_component_el_col, {
                key: 2,
                span: 2
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    class: "filter-btn",
                    onClick: _cache[4] || (_cache[4] = $event => (show.value = !show.value))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_svg_icon, {
                        name: "drafts-filter",
                        class: "svg-img"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }))
            : createCommentVNode("", true),
          (show.value && activeTab.value === 'common')
            ? (openBlock(), createBlock(Classify, {
                key: 3,
                type: "model",
                attributes: unref(attributes),
                subattributeId: subattributeId.value,
                onModelClick: modelClick,
                onReset: reset,
                onClose: _cache[5] || (_cache[5] = $event => (show.value = false))
              }, null, 8, ["attributes", "subattributeId"]))
            : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    createBaseVNode("div", _hoisted_3$1, [
      (activeTab.value === 'mine')
        ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
            createBaseVNode("div", {
              style: {},
              class: "add-btn",
              onClick: jj
            }, _hoisted_6$1),
            _hoisted_7$1
          ]))
        : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
        return (openBlock(), createElementBlock("div", {
          class: "com__item",
          key: item.id,
          onClick: $event => (unref(modelHandle)(item)),
          draggable: false
        }, [
          createBaseVNode("div", _hoisted_9$1, [
            createBaseVNode("img", {
              onClick: $event => (childClick(item)),
              src: item.thumbnail,
              class: "image",
              draggable: false
            }, null, 8, _hoisted_10$1),
            (item.progress !== 100)
              ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                  (item.progress === 0)
                    ? (openBlock(), createBlock(_component_el_icon, {
                        key: 0,
                        size: 18,
                        color: "#428FFF"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(download_default))
                        ]),
                        _: 1
                      }))
                    : (openBlock(), createBlock(_component_el_progress, {
                        key: 1,
                        type: "circle",
                        width: 18,
                        "stroke-width": 2,
                        "show-text": false,
                        percentage: item.progress
                      }, null, 8, ["percentage"]))
                ]))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("span", null, toDisplayString(item.name), 1),
            (activeTab.value === 'mine')
              ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  onClick: $event => (editPointFunc(item)),
                  class: "edit-delete-btn",
                  src: _imports_0,
                  alt: ""
                }, null, 8, _hoisted_12$1))
              : createCommentVNode("", true),
            (activeTab.value === 'mine')
              ? (openBlock(), createElementBlock("img", {
                  key: 1,
                  onClick: $event => (editModelFunc(item)),
                  class: "edit-delete-btn",
                  src: _imports_0$1,
                  alt: ""
                }, null, 8, _hoisted_13$1))
              : createCommentVNode("", true),
            (activeTab.value === 'mine')
              ? (openBlock(), createElementBlock("img", {
                  key: 2,
                  onClick: $event => (showDeleteDialog(item)),
                  class: "edit-delete-btn",
                  src: _imports_1,
                  alt: ""
                }, null, 8, _hoisted_14$1))
              : createCommentVNode("", true)
          ])
        ], 8, _hoisted_8$1))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_15$1, [
      createVNode(_component_el_pagination, {
        small: "",
        "pager-count": 5,
        background: "",
        layout: "total, prev, pager, next",
        total: total.value,
        onCurrentChange: change
      }, null, 8, ["total"])
    ])
  ]))
}
}

};
var ModelModule = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-6eaa10f9"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".detail-item[data-v-4ec49823]{width:.989583rem;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.detail-tag[data-v-4ec49823]{margin-top:.015625rem}.detail-tag ul[data-v-4ec49823]{-webkit-padding-start:0;padding-inline-start:0;-webkit-margin-before:0em;margin-block-start:0em;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.detail-tag ul li[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 .104167rem;cursor:pointer;height:.145833rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem}.avatar-uploader-icon[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.145833rem;color:#8c939d;width:.625rem;height:auto;text-align:center}.avatar-uploader-icon .slt-avatar[data-v-4ec49823]{width:100%;max-height:.625rem}.item-active[data-v-4ec49823]{color:#428fff!important;background:rgba(66,143,255,.3)!important}.scene-item-name-add[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-top:.052083rem}.scene-item-name-add span[data-v-4ec49823]{color:#fff;font-size:.083333rem}.add-btn[data-v-4ec49823]{height:.6875rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-left:.104167rem;border:1px dashed #d9d9d9}.scene-item-name[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:.015625rem}.scene-item-name span[data-v-4ec49823]{color:#fff;font-size:.083333rem}.scene-item-name .scene-btn[data-v-4ec49823]{margin-top:-.078125rem;display:-webkit-box;display:-ms-flexbox;display:flex}.scene-item-name .scene-btn .btn-icon[data-v-4ec49823]{width:.083333rem;height:.083333rem;cursor:pointer;margin-right:.083333rem}.scene-item-name .scene-btn .btn-icon img[data-v-4ec49823]{width:100%;height:100%}[data-v-4ec49823]::-webkit-scrollbar{display:none}.panel-left[data-v-4ec49823]{height:100%;overflow-y:auto;width:2.083333rem;display:-webkit-box;display:-ms-flexbox;display:flex;background-color:#2a2e39}.panel-right[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:3;-ms-flex:3;flex:3}.detail-info[data-v-4ec49823]{background:#2a2e39;width:1.5625rem;height:100%}.right-content[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;padding-left:.010417rem;text-align:center;height:100%;min-height:100%}.panel-close-icon[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;right:.052083rem;top:.369792rem;color:red;font-size:.114583rem;font-weight:600}.tenant-app-scen-container[data-v-4ec49823]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.tenant-app-scen-container .t-model-panel-left[data-v-4ec49823]{width:2.083333rem;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex}.tenant-app-scen-container .t-model-panel-content[data-v-4ec49823]{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;z-index:1}.tenant-app-scen-container .t-model-panel-right[data-v-4ec49823]{width:1.5625rem;height:100%;background:#2a2e39;overflow-y:auto;position:relative;z-index:100}.scen-item[data-v-4ec49823]{width:50%}.search-input[data-v-4ec49823]{margin-top:-.052083rem;padding-left:.104167rem;padding-right:.09375rem}.left-panel[data-v-4ec49823]{-webkit-margin-before:0rem;margin-block-start:0rem;-webkit-padding-start:0;padding-inline-start:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.left-panel .item-image[data-v-4ec49823]:hover{cursor:pointer;opacity:.5}.show-box[data-v-4ec49823]{position:absolute;background-color:#373b48;margin-top:.588542rem;margin-left:.005208rem;margin-bottom:1.161458rem;width:2.083333rem;display:-webkit-box;display:-ms-flexbox;display:flex;min-height:3.125rem}.show-box .item .item-title[data-v-4ec49823]{margin-bottom:.0625rem}.show-box .item .my-tag[data-v-4ec49823]{margin-bottom:.104167rem;border-bottom:.005208rem solid rgba(255,255,255,.05)}.show-box .item .my-tag ul[data-v-4ec49823]{-webkit-padding-start:0;padding-inline-start:0;-webkit-margin-before:0em;margin-block-start:0em;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.show-box .item .my-tag ul li[data-v-4ec49823]{cursor:pointer;padding:0 .0625rem;-ms-flex-wrap:wrap;flex-wrap:wrap;height:.145833rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;margin-top:.041667rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem}.cut-line[data-v-4ec49823]{background-color:#ffffff24;display:block;height:.005208rem;margin:.052083rem 0}.filter-btn-box[data-v-4ec49823]{position:absolute;bottom:.104167rem;right:.104167rem}.filter-btn-box .el-button[data-v-4ec49823]{color:#fff9;background-color:#373b48}\n")();

var index_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".page-bottom{position:absolute;bottom:.052083rem}.page-box button:disabled{border:1px solid rgba(255,255,255,.14);background:#2a2e39}.page-box .el-input__inner{color:#fff;border:1px solid rgba(255,255,255,.14);background:#2a2e39}.page-box .btn-prev,.page-box .btn-next{color:#fff;border:1px solid rgba(255,255,255,.14);background:#2a2e39;margin:.005208rem}.page-box .el-pager li{border:1px solid rgba(255,255,255,.14);background:#2a2e39;color:#fff}.tenant-model-search-item{margin-bottom:.052083rem;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.tenant-model-search-item .scene-select{width:100%;margin-left:.104167rem;margin-right:.104167rem;height:.166667rem}.tenant-model-search-item .common-model-select{margin-top:.041667rem;width:100%;margin-left:.104167rem;margin-right:.041667rem}.tenant-model-search-item .common-model-select .el-input__inner{height:.145833rem}.tenant-model-search-item .my-model-select{margin-top:.041667rem;width:100%;margin-left:.104167rem;margin-right:.09375rem}.tenant-model-search-item .my-model-select .el-input__inner{height:.145833rem}.tenant-model-search-item .filter-icon-box{margin-top:.041667rem;height:.135417rem;width:.151042rem;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:.072917rem;margin-right:.09375rem;border:solid 1px rgba(255,255,255,.14);border-radius:.026042rem;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.tenant-model-search-item .filter-icon-box img{width:60%;height:60%;cursor:pointer}.tenant-model-search-item input{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.tenant-model-search-item input.search-input{margin-right:.083333rem;width:70%;height:.166667rem;border-radius:.020833rem;text-indent:.0625rem}.delete-confirm-dialog2{background:#373b48}.delete-confirm-dialog2 .el-dialog__header{border-bottom:.005208rem solid #181a21}.delete-confirm-dialog2 .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.delete-confirm-dialog2 .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.delete-confirm-dialog2 .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.delete-confirm-dialog2 .dialog-content .confirm-box img{width:.166667rem;height:.166667rem;margin-right:.125rem}.delete-confirm-dialog2 .dialog-content .confirm-tag span{display:inline-block;width:.166667rem;height:.166667rem;margin-right:.125rem}.delete-confirm-dialog2 .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.delete-confirm-dialog2 .dialog-footer .dialog-footer-confirm{height:.166667rem}.delete-confirm-dialog2 .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}.my-search{height:.145833rem}.my-input>.el-input__inner{background-color:#2a2e39;border:1px solid rgba(255,255,255,.14);height:.145833rem;color:#ffffff4d}.demo-tabs{width:2.083333rem}.demo-tabs .el-tabs__nav-scroll{padding-left:.104167rem}.demo-tabs .el-tabs__nav-wrap{margin-left:.104167rem;margin-right:.104167rem}.demo-tabs>.el-tabs__content{font-size:.166667rem;font-weight:600}.demo-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav>.el-tabs__item{color:#fff}.demo-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav>.is-active{color:#428fff}\n")();

const _sfc_main = {
  name: 'index',
  // eslint-disable-next-line vue/no-unused-components
  components: { ModelModule, TenantLayoutModule, Search: search_default },
  data() {
    return {
      showDetailPanel: false,
      detailInfo: {},
      imageUrl: '',
      labelWidth: '90px',
      dialogVisible: false,
      addDialogVisible: false,
      sceneDeleteId: '',
    }
  },
  methods: {
    clickChangeModelEntity(citem) {
      UE.publish('MXGL_View', {
        modelId: citem.code,
        //id: citem.id,
        UIPos: '400,60',
        UISize: '1220,1020',
      });
      console.log(citem.code, '与UE联调');
    },
    getChild(msg) {
      //清空模型
      // this.quitModelEntity();
      this.detailInfo = JSON.parse(msg);
      console.log('this.detailInfo:::', this.detailInfo);
      if (this.detailInfo) {
        UE.publish('CGX_SetAxisPosition', {
          isShow: true,
          axisPostion: '500,1000',
          axisSize: '100,100',
        });
        this.showDetailPanel = true;
        //如果是已下载模型，调用UE接口，切换模型
        if (this.detailInfo.progress == 100) {
          console.log('已下载模型，可预览，调用UE开始');
          this.clickChangeModelEntity(this.detailInfo);
        } else {
          console.log('未下载模型，不可预览，结束');
        }
      } else {
        this.showDetailPanel = false;
      }
    },
    handleClose2() {
      this.addDialogVisible = false;
    },
    finalGo(num) {
      if (num == 0) {
        this.$router.push('/tenant/model/add');
      } else {
        this.$router.push('/tenant/model/modelBatchImport');
      }
    },
    handleCloseDialog() {
      this.dialogVisible = false;
    },
    deleteTenantModel() {
      removeTenantModel({ code: this.sceneDeleteId }).then(res => {
        this.dialogVisible = false;
        if (res.code === 1) {
          this.$message.success('删除成功！');
          // this.queryTenantModelPage()
          //再次查询新的模型列表
          this.$refs.modelChild.getModels();
        } else {
          this.$message.success('删除失败，请稍后重试！！');
        }
      });
    },
    quitModelEntity() {
      UE.publish('MXGL_ViewQuit', {});
    },
    // clickChangeModelEntity(citem) {
    //   //console.log(citem)
    //     UE.publish('MXGL_View', {
    //       indexCode:citem.code,
    //       //id: citem.id,
    //       UIPos: '400,60',
    //       UISize: '1220,1020',
    //     })
    //     console.log(citem.code, '与UE联调')
    // },
    // queryListByFilter() {
    //   let subattributeId = []
    //   if (this.selectData.attributes && this.selectData.attributes.length > 0) {
    //     this.selectData.attributes.forEach(item => {
    //       item.subattributes.forEach(citem => {
    //         if (citem.isSelected) {
    //           subattributeId.push(citem.id)
    //         }
    //       })
    //     })
    //   }
    //   let req = {
    //     fieldId: this.value1 ? this.selectData.id : '',
    //     name: this.scenName,
    //     page: this.currentPage,
    //     size: this.pageSize,
    //     subattributeId: this.value1 ? subattributeId : [],
    //   }
    //   getCommonModelPage(req).then(res => {
    //     if (res.code === 1) {
    //       this.data1 = res.data.list
    //       this.clickChangeModel(res.data.list[0])
    //       this.totalPage = res.data.total
    //       if (res.data.list.length == 0) {
    //         this.closeContent()
    //       }
    //     }
    //   })
    // },
    goAdd() {
      //弹出选择框
      // this.$router.push('/tenant/model/add')
      this.addDialogVisible = true;
    },
    openDeleteDialog(msg) {
      let citem = JSON.parse(msg);
      if (!citem.modAndDelFlag) {
        this.$message.warning('您没有删除权限');
        return
      }
      this.dialogVisible = true;
      this.sceneDeleteId = citem.code;
    },
    editScene(msg) {
      let citem = JSON.parse(msg);
      if (!citem.modAndDelFlag) {
        this.$message.warning('您没有编辑权限');
        return
      }
      localStorage.setItem('tenantEditModelItem', JSON.stringify(citem));
      // this.$router.push({
      //   name: 'tenantModelEdit',
      //   query: {
      //     id: citem.id,
      //     code: citem.code,
      //   },
      // })
      this.$router.push({
        path: '/tenant/model/edit2',
        query: {
          source: 'edit',
          id: citem.id,
          code: citem.code,
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    UE.publish('JS2UE_SetGlobalState', { currentState: 'ModelManager' });
    next();
  },
  beforeRouteLeave(to, from, next) {
    //退出模型的预览
    UE.publish('JS2UE_SetGlobalState', { currentState: 'NULL' });
    UE.publish('MXGL_ViewQuit', {});
    UE.publish('DestroyAll', {});
    next();
  },
};


const _withScopeId = n => (pushScopeId("data-v-4ec49823"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "tenant-app-scen-container" };
const _hoisted_2 = { class: "t-model-panel-left" };
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "t-model-panel-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "right-content" })
], -1));
const _hoisted_4 = { class: "t-model-panel-right" };
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { style: {"margin":"15px","font-size":"14px","color":"rgb(255,255,255)"} }, " 模型详情 ", -1));
const _hoisted_6 = { class: "detail-item" };
const _hoisted_7 = ["title"];
const _hoisted_8 = { class: "avatar-uploader-icon" };
const _hoisted_9 = ["src"];
const _hoisted_10 = ["title"];
const _hoisted_11 = { class: "detail-item" };
const _hoisted_12 = { class: "detail-item" };
const _hoisted_13 = { class: "detail-tag" };
const _hoisted_14 = { class: "dialog-content" };
const _hoisted_15 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", {
  class: "confirm-box",
  style: {"margin-bottom":"24px"}
}, [
  /*#__PURE__*/createBaseVNode("span", null, "请选择添加方式")
], -1));
const _hoisted_16 = /*#__PURE__*/createTextVNode(" 添加单个模型 ");
const _hoisted_17 = /*#__PURE__*/createTextVNode(" 批量导入模型 ");
const _hoisted_18 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "dialog-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$3,
      alt: ""
    }),
    /*#__PURE__*/createBaseVNode("span", null, "确认删除该模型？")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-tag" }, [
    /*#__PURE__*/createBaseVNode("span"),
    /*#__PURE__*/createBaseVNode("a", {
      href: "void(0)",
      class: "confirm-tag-detail"
    }, " 删除后平台租户不可再下载使用。 ")
  ])
], -1));
const _hoisted_19 = { class: "dialog-footer" };
const _hoisted_20 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_21 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ModelModule = resolveComponent("ModelModule");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_ModelModule, {
        ref: "modelChild",
        onMyClick: $options.getChild,
        onChangeAddDialog: $options.goAdd,
        onOpenEdit: $options.editScene,
        onOpenDelete: $options.openDeleteDialog
      }, null, 8, ["onMyClick", "onChangeAddDialog", "onOpenEdit", "onOpenDelete"])
    ]),
    _hoisted_3,
    createBaseVNode("div", _hoisted_4, [
      _hoisted_5,
      withDirectives(createVNode(_component_el_form, {
        class: "my-form",
        ref: "formRef",
        "label-width": $data.labelWidth
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, {
            label: "模型名称",
            prop: "name"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_6, toDisplayString($data.detailInfo.name), 1)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "模型文件",
            prop: "modelFile"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", {
                title: $data.detailInfo.modelFile,
                class: "detail-item",
                style: {"color":"#428fff"}
              }, toDisplayString($data.detailInfo.modelFile), 9, _hoisted_7)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "模型缩略图",
            prop: "thumbnail"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_8, [
                ($data.detailInfo.thumbnail)
                  ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: $data.detailInfo.thumbnail,
                      class: "slt-avatar"
                    }, null, 8, _hoisted_9))
                  : createCommentVNode("", true)
              ])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "物模型",
            prop: "objectModel"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", {
                title: $data.detailInfo.objectModel,
                style: {"color":"#428fff"},
                class: "detail-item"
              }, toDisplayString($data.detailInfo.objectModel), 9, _hoisted_10)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "品牌厂家",
            prop: "brandName"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_11, toDisplayString($data.detailInfo.brandName), 1)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "规格型号",
            prop: "specifications"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_12, toDisplayString($data.detailInfo.specifications), 1)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "标签" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.detailInfo.labels, (item, index) => {
                    return (openBlock(), createElementBlock("li", {
                      key: index,
                      class: normalizeClass(item.isSelected ? 'item-active' : '')
                    }, toDisplayString(item.labelName), 3))
                  }), 128))
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["label-width"]), [
        [vShow, $data.showDetailPanel]
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: $data.addDialogVisible,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.addDialogVisible) = $event)),
      title: "添加模型",
      width: "640px",
      "custom-class": "delete-confirm-dialog2",
      "before-close": $options.handleClose2
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_14, [
          _hoisted_15,
          createVNode(_component_el_button, {
            onClick: _cache[0] || (_cache[0] = $event => ($options.finalGo(0))),
            style: {"background":"transparent","border":"solid 1px #428FFF","color":"#428FFF"}
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }),
          createVNode(_component_el_button, {
            onClick: _cache[1] || (_cache[1] = $event => ($options.finalGo(1))),
            style: {"background":"transparent","border":"solid 1px #428FFF","color":"#428FFF"}
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"]),
    createVNode(_component_el_dialog, {
      modelValue: $data.dialogVisible,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => (($data.dialogVisible) = $event)),
      title: "删除确认",
      width: "640px",
      "custom-class": "delete-confirm-dialog2",
      "before-close": $options.handleCloseDialog
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_19, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: $options.deleteTenantModel
          }, {
            default: withCtx(() => [
              _hoisted_20
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[3] || (_cache[3] = $event => ($data.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_21
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_18
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-4ec49823"]]);

export { index as default };
