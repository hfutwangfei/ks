import { T as TenantLayoutModule } from './Classify.vue_vue_type_style_index_0_scoped_true_lang.e05be8cd.js';
import { _ as _export_sfc, b as useStore, U as UE } from './index.acc4a696.js';
import { r as removeTenantScene } from './tenantScene.d6a51745.js';
import { h as computed, l as ref, m as watch, j as reactive, T as onMounted, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, a1 as withKeys, u as unref, a5 as search_default, c as createBlock, L as Fragment, M as renderList, G as createCommentVNode, a6 as download_default, O as toDisplayString, W as pushScopeId, X as popScopeId, I as withDirectives, a0 as vShow, Y as normalizeClass, N as createTextVNode } from './element-plus.da98f360.js';
import { _ as _imports_0$1 } from './tianjia.4a8b4043.js';
import { _ as _imports_0, a as _imports_1 } from './delete-icon.a33587a6.js';
import { g as getScenesPage, b as getTenantScenesPagePost, c as getTenantScenesPageGet, e as getLabelList } from './drafts.60815a70.js';
import { u as useProgress } from './useProgress.535f7864.js';
import { _ as _imports_0$2 } from './warning-icon.ecaebaa1.js';
import './monaco-editor.e9574fd0.js';
import './sceneList.b22bf172.js';

var SceneModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-1b6ad952]::-webkit-scrollbar{display:none}.com[data-v-1b6ad952]{width:2.083333rem;height:100%;padding:.104167rem .104167rem 0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.com[data-v-1b6ad952] .el-tabs__nav-wrap:after{height:.005208rem;background:#ffffff;opacity:.05}.com[data-v-1b6ad952] .el-tabs__active-bar{height:.005208rem;background:-webkit-gradient(linear,right top,left top,from(rgba(66,143,255,0)),color-stop(50%,#428fff),to(rgba(66,143,255,0)));background:linear-gradient(270deg,rgba(66,143,255,0) 0%,#428fff 50%,rgba(66,143,255,0) 100%)}.com[data-v-1b6ad952] .el-tabs__item{height:.130208rem;line-height:.078125rem;color:#fff9}.com[data-v-1b6ad952] .el-tabs__item.is-active{color:#428fff}.com__filter .el-row[data-v-1b6ad952]{margin-bottom:.041667rem}.com__filter .el-input[data-v-1b6ad952],.com__filter[data-v-1b6ad952] .el-input__inner{height:.145833rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff;border-right:none;background:none}.com__filter .el-input[data-v-1b6ad952]{width:96%;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.com__filter[data-v-1b6ad952] .el-input-group__append{background:none;-webkit-box-shadow:none;box-shadow:none}.com__filter[data-v-1b6ad952] .el-input-group__append .el-button{height:.135417rem;border:none;-webkit-box-sizing:border-box;box-sizing:border-box}.com__filter .el-select[data-v-1b6ad952]{width:96%;border:1px solid rgba(255,255,255,.14)}.com__filter .el-select[data-v-1b6ad952] .el-input__suffix,.com__filter .el-select[data-v-1b6ad952] .el-input__icon{line-height:.145833rem}.com__filter[data-v-1b6ad952] .filter-btn{padding:0;width:.145833rem;height:.145833rem;line-height:.145833rem;min-height:auto;border-radius:.020833rem;border:1px solid rgba(255,255,255,.14);background:none}.com__content[data-v-1b6ad952]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-line-pack:start;align-content:flex-start}.com__item[data-v-1b6ad952]{margin-bottom:.104167rem;width:49%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item .image-wrap[data-v-1b6ad952]{position:relative;margin-bottom:.041667rem;padding-top:100%;width:100%}.com__item .image[data-v-1b6ad952]{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:.041667rem}.com__item .download[data-v-1b6ad952]{position:absolute;right:.041667rem;bottom:.041667rem;width:.25rem;height:.166667rem;background:rgba(255,255,255,.9);border-radius:.010417rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item span[data-v-1b6ad952]{line-height:.0625rem;font-size:.0625rem;font-weight:400;color:#fff}.com__item .edit-delete-btn[data-v-1b6ad952]{display:inline-block;vertical-align:middle;height:.072917rem;width:.072917rem;margin-left:.078125rem}.com__bottom[data-v-1b6ad952]{padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.com__bottom[data-v-1b6ad952] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.com__bottom[data-v-1b6ad952] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com__bottom[data-v-1b6ad952] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.com__bottom[data-v-1b6ad952] .el-pagination .btn-prev,.com__bottom[data-v-1b6ad952] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com .add-btn[data-v-1b6ad952]{height:100%;width:96%;border-radius:.026042rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.052083rem;border:1px dashed #d9d9d9}.com .edit-delete-btn[data-v-1b6ad952]{display:inline-block;vertical-align:middle;height:.072917rem;width:.072917rem;margin-left:.078125rem}\n")();

const _withScopeId$1 = n => (pushScopeId("data-v-1b6ad952"),n=n(),popScopeId(),n);
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
  src: _imports_0$1
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
const _hoisted_14$1 = { class: "com__bottom" };


const _sfc_main$1 = {
  __name: 'SceneModule',
  emits: [
  'myClick',
  'changeAddDialog',
  'openEdit',
  'openDelete',
],
  setup(__props, { expose, emit }) {

const store = useStore();

const userinfo = computed(() => store.state.account.userinfo);

// tab切换
const activeTab = ref('common');
watch(activeTab, tab => {
  console.log(tab);
  page.value = 1;
  total.value = 0;
  list.value = [];
  getScenes();
});

// 标签
// eslint-disable-next-line no-unused-vars
ref([]);
const getLabels = async () => {
  let { data } = await getLabelList({ type: 1, companyId: 1 });
  labelList.value = data;
};
const getLabels2 = async () => {
  let { data } = await getLabelList({ type: 1 });
  labelList2.value = data;
};

// 场景列表
const name = ref('');
// eslint-disable-next-line no-unused-vars
ref(false);
const hasRight = ref(false);
const label = reactive({
  labelName: '',
  id: '',
  id2: '',
});
const page = ref(1);
const total = ref(0);
const list = ref([]);
const labelList = ref([]);
const labelList2 = ref([]);
const scenesListApi = computed(() => {
  let { userType } = userinfo.value;
  if (userType === 0) return getScenesPage
  if (userType === 1) return getTenantScenesPagePost
  if (userType === 2) return getTenantScenesPageGet
  return getScenesPage
});

const getScenes = async () => {
  let params = {};
  if (activeTab.value === 'common') {
    params = {
      source: 0,
      labelId: label.id,
      scenesName: name.value,
    };
  }
  if (activeTab.value === 'mine') {
    params = {
      source: 1,
      labelId: label.id2,
      scenesName: name.value,
    };
  }

  let { data } = await scenesListApi.value({
    ...params,
    name: name.value,
    page: page.value,
    state: 1,
  });
  list.value = data.list;
  total.value = data.total;
  // getqueryHadDownLoadScenes();
  //childClick(list.value.length>0?list.value[0]:{});
};
const change = num => {
  page.value = num;
  getScenes();
};

const listenUeInterface = () => {
  UE.publish('CGX_HotFixMessage', {});
  UE.subscribe('UE2JS_HotFixMessage', obj => {
    // console.log('UE2JS_HotFixMessage', obj)
    let { data } = obj;
    store.commit('app/setModels', data);
  });
};
const hasCreateRight = () => {
  const permissions = computed(() => store.state.menu.permissions);
  console.log(permissions, permissions.value);
  permissions.value.map(item => {
    if (item.keystr === 'tenant_scenes_manager') {
      if (item.children.length > 0) {
        item.children.map(citem => {
          if (citem.keystr === 'tenant_scenes_create') {
            hasRight.value = true;
          }
        });
      }
    }
  });
  // for (let i=0;i<permissions.value.)
};
onMounted(() => {
  hasCreateRight();
  getLabels2();
  getLabels();
  getScenes();
  listenUeInterface();
});

// const sceneHandle = model => {
//   let { progress, code } = model
//   if (progress === 0) {
//     UE.publish('CGX_DownLoadModel', { modelCode: code })
//   }
//   if (progress === 100) {
//     setScene(model)
//   }
// }

// // 切换场景
// const setScene = model => {
//   // console.log(model)
//   let { code, scenesName } = model
//   let initData = {
//     modelId: code,
//     modelName: scenesName,
//     modelType: 1,
//     entityLocate: '',
//     entityRotate: '',
//     entitySize: '',
//     indexCode: '',
//     entityHide: false,
//     entityLock: false,
//   }
//   UE.publish('CGX_SceneButtonClick', initData)
//   store.commit('drafts/toggleScene', initData)
//   store.commit('drafts/toggleEditType', ['base'])
// }

const empty = model => {
  console.log('已下载完成调用，空回调函数::', model);
};
const sceneHandle = useProgress('scene', list, empty);
// 注册事件

expose({
  getScenes,
});

//更新父组件模型详情
const childClick = item => {
  console.log('item-last:::', item);
  emit('myClick', JSON.stringify(item));
};

const jj = () => {
  emit('changeAddDialog');
};

const editSceneFunc = item => {
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
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
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
          label: "通用场景",
          name: "common"
        }),
        createVNode(_component_el_tab_pane, {
          label: "我的场景",
          name: "mine"
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createBaseVNode("div", _hoisted_2$1, [
      createVNode(_component_el_row, { style: {"position":"relative"} }, {
        default: withCtx(() => [
          createVNode(_component_el_col, { span: 24 }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                style: {"width":"100% !important"},
                modelValue: name.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((name).value = $event)),
                placeholder: "请输入场景名称",
                onKeyup: withKeys(getScenes, ["enter"])
              }, {
                append: withCtx(() => [
                  createVNode(_component_el_button, {
                    icon: unref(search_default),
                    onClick: getScenes
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["modelValue", "onKeyup"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      (activeTab.value === 'common')
        ? (openBlock(), createBlock(_component_el_row, { key: 0 }, {
            default: withCtx(() => [
              createVNode(_component_el_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    onChange: getScenes,
                    modelValue: label.id,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((label.id) = $event)),
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
              })
            ]),
            _: 1
          }))
        : createCommentVNode("", true),
      (activeTab.value === 'mine')
        ? (openBlock(), createBlock(_component_el_row, { key: 1 }, {
            default: withCtx(() => [
              createVNode(_component_el_col, { span: 24 }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    onChange: getScenes,
                    modelValue: label.id2,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((label.id2) = $event)),
                    style: {"width":"100% !important"},
                    placeholder: "选择标签"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "全部",
                        value: ""
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(labelList2.value, (item) => {
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
              })
            ]),
            _: 1
          }))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_3$1, [
      (activeTab.value === 'mine' && hasRight.value)
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
          onClick: $event => (unref(sceneHandle)(item))
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
            createBaseVNode("span", null, toDisplayString(item.scenesName), 1),
            (activeTab.value === 'mine' && item.modAndDelFlag)
              ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  onClick: $event => (editSceneFunc(item)),
                  class: "edit-delete-btn",
                  src: _imports_0,
                  alt: ""
                }, null, 8, _hoisted_12$1))
              : createCommentVNode("", true),
            (activeTab.value === 'mine' && item.modAndDelFlag)
              ? (openBlock(), createElementBlock("img", {
                  key: 1,
                  onClick: $event => (showDeleteDialog(item)),
                  class: "edit-delete-btn",
                  src: _imports_1,
                  alt: ""
                }, null, 8, _hoisted_13$1))
              : createCommentVNode("", true)
          ])
        ], 8, _hoisted_8$1))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_14$1, [
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
var SceneModule = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-1b6ad952"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".tenant-app-scene-container[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.tenant-app-scene-container .t-scene-panel-left[data-v-23576cee]{width:2.083333rem;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex}.tenant-app-scene-container .t-scene-panel-content[data-v-23576cee]{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;z-index:1}.tenant-app-scene-container .t-scene-panel-right[data-v-23576cee]{width:1.5625rem;height:100%;background:#2a2e39;overflow-y:auto;position:relative;z-index:100}.detail-info[data-v-23576cee]{background:#2a2e39;width:1.5625rem;height:100%}.detail-tag[data-v-23576cee]{margin-top:.015625rem}.detail-tag ul[data-v-23576cee]{-webkit-padding-start:0;padding-inline-start:0;-webkit-margin-before:0em;margin-block-start:0em;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.detail-tag ul li[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 .104167rem;cursor:pointer;height:.145833rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem}.avatar-uploader-icon[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.145833rem;color:#8c939d;width:.625rem;height:auto;text-align:center}.avatar-uploader-icon .slt-avatar[data-v-23576cee]{width:100%;max-height:.625rem}.item-active[data-v-23576cee]{color:#428fff!important;background:rgba(66,143,255,.3)!important}.scene-item-name[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:.015625rem}.scene-item-name span[data-v-23576cee]{color:#fff;font-size:.083333rem}.scene-item-name .scene-btn[data-v-23576cee]{margin-top:-.078125rem;display:-webkit-box;display:-ms-flexbox;display:flex}.scene-item-name .scene-btn .btn-icon[data-v-23576cee]{width:.083333rem;height:.083333rem;cursor:pointer;margin-right:.083333rem}.scene-item-name .scene-btn .btn-icon img[data-v-23576cee]{width:100%;height:100%}.scene-item-name-add[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-top:.052083rem}.scene-item-name-add span[data-v-23576cee]{color:#fff;font-size:.083333rem}[data-v-23576cee]::-webkit-scrollbar{display:none}.panel-left[data-v-23576cee]{height:100%;overflow-y:auto;width:2.083333rem;display:-webkit-box;display:-ms-flexbox;display:flex;background-color:#2a2e39}.panel-right[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:3;-ms-flex:3;flex:3}.panel-close-icon[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;border:solid 1px gray;position:absolute;right:.052083rem;top:.369792rem;color:red;font-size:.114583rem;font-weight:600}.right-content[data-v-23576cee]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;padding-left:.010417rem;text-align:center;height:100%;min-height:100%}.tenant-app-scen-container[data-v-23576cee]{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.scen-item[data-v-23576cee]{width:50%}.search-input[data-v-23576cee]{margin-top:-.052083rem;padding-left:.104167rem;padding-right:.09375rem}.left-panel[data-v-23576cee]{-webkit-margin-before:0rem;margin-block-start:0rem;-webkit-padding-start:0;padding-inline-start:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.left-panel .item-image[data-v-23576cee]:hover{cursor:pointer;opacity:.5}.left-panel .add-btn[data-v-23576cee]{height:.6875rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-left:.104167rem;border:1px dashed #d9d9d9}\n")();

var index_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".common-scene-select{margin-top:.041667rem;width:100%;margin-left:.104167rem;margin-right:.09375rem}.common-scene-select .el-input__inner,.my-search{height:.145833rem}.page-bottom{position:absolute;bottom:.052083rem}.page-box button:disabled{border:1px solid rgba(255,255,255,.14);background:#2a2e39}.page-box .el-input__inner{color:#fff;border:1px solid rgba(255,255,255,.14);background:#2a2e39}.page-box .btn-prev,.page-box .btn-next{color:#fff;border:1px solid rgba(255,255,255,.14);background:#2a2e39;margin:.005208rem}.page-box .el-pager li{border:1px solid rgba(255,255,255,.14);background:#2a2e39;color:#fff}.scene-search-item2{margin-bottom:.052083rem;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.scene-search-item2 .scene-select{width:100%;margin-left:.104167rem;margin-right:.104167rem;height:.166667rem}.scene-search-item2 input{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.scene-search-item2 input.search-input{margin-right:.083333rem;width:70%;height:.166667rem;border-radius:.020833rem;text-indent:.0625rem}.el-scrollbar__view{background:#2a2e39!important}.delete-confirm-dialog2{background:#373b48}.delete-confirm-dialog2 .el-dialog__header{border-bottom:.005208rem solid #181a21}.delete-confirm-dialog2 .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.delete-confirm-dialog2 .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.delete-confirm-dialog2 .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.delete-confirm-dialog2 .dialog-content .confirm-box img{width:.166667rem;height:.166667rem;margin-right:.125rem}.delete-confirm-dialog2 .dialog-content .confirm-tag span{display:inline-block;width:.166667rem;height:.166667rem;margin-right:.125rem}.delete-confirm-dialog2 .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.delete-confirm-dialog2 .dialog-footer .dialog-footer-confirm{height:.166667rem}.delete-confirm-dialog2 .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}.my-input>.el-input__inner{background-color:#2a2e39;border:1px solid rgba(255,255,255,.14);height:.145833rem;color:#ffffff4d}.demo-tabs{width:2.083333rem}.demo-tabs .el-tabs__nav-scroll{padding-left:.104167rem}.demo-tabs .el-tabs__nav-wrap{margin-left:.104167rem;margin-right:.104167rem}.demo-tabs>.el-tabs__content{font-size:.166667rem;font-weight:600}.demo-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav>.el-tabs__item{color:#fff}.demo-tabs>.el-tabs__header>.el-tabs__nav-wrap>.el-tabs__nav-scroll>.el-tabs__nav>.is-active{color:#428fff}\n")();

const _sfc_main = {
  name: 'index',
  // eslint-disable-next-line vue/no-unused-components
  components: { SceneModule, TenantLayoutModule, Search: search_default },
  data() {
    return {
      showDetailPanel: false,
      detailInfo: {},
      addDialogVisible: false,
      dialogVisible: false,
      sceneDeleteId: undefined,
    }
  },
  methods: {
    clickChangeScenesEntity(citem) {
      UE.publish('YYCJ_View', {
        modelId: citem.code,
        //id: citem.id,
        UIPos: '400,60',
        UISize: '1220,1020',
      });
      console.log(citem.code, '与UE联调');
    },
    getChild(msg) {
      //清空模型
      // this.quitScenesEntity();
      this.detailInfo = JSON.parse(msg);
      console.log('changjing', this.detailInfo);
      if (this.detailInfo) {
        this.showDetailPanel = true;
        //调用UE接口，切换应用场景
        if (this.detailInfo.progress == 100) {
          console.log('已下载场景，可预览，调用UE开始');
          this.clickChangeScenesEntity(this.detailInfo);
        } else {
          console.log('未下载场景，不可预览，结束');
        }
      } else {
        this.showDetailPanel = false;
      }
    },
    handleClose2() {
      this.addDialogVisible = false;
    },
    quitScenesEntity() {
      UE.publish('YYCJ_ViewQuit', {});
    },

    openDeleteDialog(citem) {
      citem = JSON.parse(citem);
      if (!citem.modAndDelFlag) {
        this.$message.warning('您没有删除权限');
        return
      }
      this.dialogVisible = true;
      this.sceneDeleteId = citem.code;
    },
    deleteTenantScene() {
      removeTenantScene({ code: this.sceneDeleteId }).then(res => {
        this.dialogVisible = false;
        if (res.code === 1) {
          this.$message.success('删除成功！');
          this.$refs.sceneChild.getScenes();
        } else {
          this.$message.success('删除失败，请稍后重试！！');
        }
      });
    },
    goAdd() {
      //弹出弹出框
      this.addDialogVisible = true;
      // this.$router.push('/tenant/add')
    },
    finalGo(num) {
      if (num == 0) {
        this.$router.push('/tenant/add');
      } else {
        this.$router.push('/tenant/sceneBatch');
      }
    },
    editScene(citem) {
      citem = JSON.parse(citem);
      if (!citem.modAndDelFlag) {
        this.$message.warning('您没有编辑权限');
        return
      }
      localStorage.setItem('tenantEditSceneItem', JSON.stringify(citem));
      this.$router.push({
        name: 'tenantEdit',
        query: {
          code: citem.code,
          id: citem.id,
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    UE.publish('JS2UE_SetGlobalState', { currentState: 'SceneManager' });
    next();
  },
  beforeRouteLeave(to, from, next) {
    UE.publish('JS2UE_SetGlobalState', { currentState: 'NULL' });
    UE.publish('DestroyAll', {});
    next();
  },
};


const _withScopeId = n => (pushScopeId("data-v-23576cee"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "tenant-app-scene-container" };
const _hoisted_2 = { class: "t-scene-panel-left" };
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "t-scene-panel-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "right-content" })
], -1));
const _hoisted_4 = { class: "t-scene-panel-right" };
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { style: {"margin":"15px","font-size":"14px","color":"rgb(255,255,255)"} }, " 场景详情 ", -1));
const _hoisted_6 = { class: "detail-item" };
const _hoisted_7 = { class: "avatar-uploader-icon" };
const _hoisted_8 = ["src"];
const _hoisted_9 = { class: "detail-tag" };
const _hoisted_10 = { class: "dialog-content" };
const _hoisted_11 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", {
  class: "confirm-box",
  style: {"margin-bottom":"24px"}
}, [
  /*#__PURE__*/createBaseVNode("span", null, "请选择添加方式")
], -1));
const _hoisted_12 = /*#__PURE__*/createTextVNode(" 添加单个场景 ");
const _hoisted_13 = /*#__PURE__*/createTextVNode(" 批量导入场景 ");
const _hoisted_14 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "dialog-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$2,
      alt: ""
    }),
    /*#__PURE__*/createBaseVNode("span", null, "确认删除该场景？")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-tag" }, [
    /*#__PURE__*/createBaseVNode("span"),
    /*#__PURE__*/createBaseVNode("a", {
      href: "void(0)",
      class: "confirm-tag-detail"
    }, " 删除后平台租户不可再下载使用。 ")
  ])
], -1));
const _hoisted_15 = { class: "dialog-footer" };
const _hoisted_16 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_17 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_scene_module = resolveComponent("scene-module");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_scene_module, {
        ref: "sceneChild",
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
        "label-width": "90px"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, {
            label: "场景名称",
            prop: "sceneName"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_6, toDisplayString($data.detailInfo.scenesName), 1)
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "场景缩略图",
            prop: "thumbnail"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_7, [
                ($data.detailInfo.thumbnail)
                  ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: $data.detailInfo.thumbnail,
                      class: "slt-avatar"
                    }, null, 8, _hoisted_8))
                  : createCommentVNode("", true)
              ])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "标签" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_9, [
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
      }, 512), [
        [vShow, $data.showDetailPanel]
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: $data.addDialogVisible,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.addDialogVisible) = $event)),
      title: "添加场景",
      width: "640px",
      "custom-class": "delete-confirm-dialog2",
      "before-close": $options.handleClose2
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_10, [
          _hoisted_11,
          createVNode(_component_el_button, {
            onClick: _cache[0] || (_cache[0] = $event => ($options.finalGo(0))),
            style: {"background":"transparent","border":"solid 1px #428FFF","color":"#428FFF"}
          }, {
            default: withCtx(() => [
              _hoisted_12
            ]),
            _: 1
          }),
          createVNode(_component_el_button, {
            onClick: _cache[1] || (_cache[1] = $event => ($options.finalGo(1))),
            style: {"background":"transparent","border":"solid 1px #428FFF","color":"#428FFF"}
          }, {
            default: withCtx(() => [
              _hoisted_13
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"]),
    createVNode(_component_el_dialog, {
      modelValue: $data.dialogVisible,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => (($data.dialogVisible) = $event)),
      title: "删除确认",
      width: "640px",
      "custom-class": "delete-confirm-dialog2",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_15, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _cache[3] || (_cache[3] = $event => ($options.deleteTenantScene()))
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[4] || (_cache[4] = $event => ($data.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_14
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-23576cee"]]);

export { index as default };
