import { l as ref, r as resolveComponent, o as openBlock, B as createElementBlock, L as Fragment, M as renderList, Y as normalizeClass, a as createVNode, C as createBaseVNode, O as toDisplayString, m as watch, K as resolveDirective, w as withCtx, I as withDirectives, G as createCommentVNode, a4 as withModifiers, H as renderSlot, W as pushScopeId, X as popScopeId, N as createTextVNode, h as computed, j as reactive, T as onMounted, u as unref, c as createBlock, a1 as withKeys, a5 as search_default, a6 as download_default, n as nextTick, a7 as isRef, a0 as vShow, J as normalizeStyle, a8 as upload_default, a9 as useAttrs, aa as minus_default, ab as plus_default, x as ElMessage, ac as watchEffect, ad as delete_default, q as onUnmounted, A as ElLoading, v as onActivated, t as onDeactivated, b as resolveDynamicComponent } from './element-plus.da98f360.js';
import { _ as _export_sfc, b as useStore, U as UE, u as useRouter, a as useRoute } from './index.acc4a696.js';
import { n as nanoid } from './index.browser.8e74d592.js';
import { g as getScenesPage, b as getTenantScenesPagePost, c as getTenantScenesPageGet, e as getLabelList, f as getModelPage, h as getTenantModelPagePost, i as getCommonModelPage, j as getTenantModelPageGet, k as getAllFieldList, l as queryDatabaseSource, m as getDashBoardPage, n as getDashBoardList, o as queryDataSources, p as queryCasesList, a as uploadCommonFile$1, r as queryCaseDetails } from './drafts.60815a70.js';
import { u as useProgress } from './useProgress.535f7864.js';
import { p as parseTime, r as rgba2Str, s as str2Rgba, d as dataURLtoFile } from './index.36626fcb.js';
import { T as TSlider } from './index.be6ed1cf.js';
import { u as uploadCommonFile } from './index.79bebf24.js';
import { u as useHotFix } from './useHotFix.6e3a57e1.js';
import './monaco-editor.e9574fd0.js';

var Menu_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".menu[data-v-27cfe5bf]{position:relative;padding-top:.104167rem;width:.208333rem;background-color:#373b48;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.menu__item[data-v-27cfe5bf]{margin-bottom:.041667rem;padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.menu__item.act[data-v-27cfe5bf]{background-color:#428fff}.menu__item .svg-img[data-v-27cfe5bf]{width:.104167rem;height:.104167rem}.menu__item span[data-v-27cfe5bf]{margin-top:.03125rem;width:.145833rem;font-size:.0625rem;color:#fff;text-align:center}\n")();

const _hoisted_1$l = { class: "menu" };
const _hoisted_2$i = ["onClick"];


const _sfc_main$m = {
  __name: 'Menu',
  props: {
  active: String,
},
  emits: ['change'],
  setup(__props, { emit }) {




const show = ref(false);
const list = ref([
  // {
  //   type: 'ylmb',
  //   text: '????????????',
  //   icon: 'drafts-ylmb',
  // },
  {
    type: 'yycj',
    text: '????????????',
    icon: 'drafts-yycj',
  },
  {
    type: 'sjmb',
    text: '????????????',
    icon: 'drafts-sjmb',
  },
  {
    type: 'mxk',
    text: '?????????',
    icon: 'drafts-mxk',
  },
]);
const changeMenu = val => {
  emit('change', val);
  show.value = false;
};

return (_ctx, _cache) => {
  const _component_svg_icon = resolveComponent("svg-icon");

  return (openBlock(), createElementBlock("div", _hoisted_1$l, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(["menu__item", { act: __props.active === item.type }]),
        key: item.type,
        onClick: $event => (changeMenu(item.type))
      }, [
        createVNode(_component_svg_icon, {
          name: item.icon,
          class: "svg-img"
        }, null, 8, ["name"]),
        createBaseVNode("span", null, toDisplayString(item.text), 1)
      ], 10, _hoisted_2$i))
    }), 128))
  ]))
}
}

};
var Menu = /*#__PURE__*/_export_sfc(_sfc_main$m, [['__scopeId',"data-v-27cfe5bf"]]);

var ButtonSelect_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".button-select[data-v-eb306790]{position:relative}.button-select .el-button[data-v-eb306790]{background-color:#373b48;border:none}.button-select .triangle[data-v-eb306790]{position:absolute;right:-.041667rem;bottom:-.041667rem;z-index:101;width:.104167rem;height:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.button-select .triangle__content[data-v-eb306790]{width:0;height:0;border:2px solid #373b48;border-top-color:transparent;border-left-color:transparent}.button-select .list[data-v-eb306790]{position:absolute;left:0;top:.229167rem;padding:.0625rem 0;background:#373b48}.button-select .list[data-v-eb306790]:before{position:absolute;top:-.026042rem;left:.052083rem;z-index:-1;width:.052083rem;height:.052083rem;content:\" \";-webkit-transform:rotate(45deg);transform:rotate(45deg);background:#373b48;-webkit-box-sizing:border-box;box-sizing:border-box}.button-select .list .item[data-v-eb306790]{padding:.041667rem;width:.9375rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.button-select .list .item .svg-img[data-v-eb306790]{width:.072917rem;height:.072917rem}.button-select .list .item span[data-v-eb306790]{margin-left:.041667rem;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#fff9;text-align:left;text-overflow:ellipsis;overflow:hidden}.button-select .list .item[data-v-eb306790]:hover,.button-select .list .item.active[data-v-eb306790]{background:rgba(66,143,255,.3)}.button-select .list .item:hover span[data-v-eb306790],.button-select .list .item.active span[data-v-eb306790]{color:#428fff}\n")();

const _withScopeId$e = n => (pushScopeId("data-v-eb306790"),n=n(),popScopeId(),n);
const _hoisted_1$k = { class: "button-select" };
const _hoisted_2$h = /*#__PURE__*/ _withScopeId$e(() => /*#__PURE__*/createBaseVNode("div", { class: "triangle__content" }, null, -1));
const _hoisted_3$d = [
  _hoisted_2$h
];
const _hoisted_4$9 = {
  key: 1,
  class: "list"
};
const _hoisted_5$6 = ["onClick"];


const _sfc_main$l = {
  __name: 'ButtonSelect',
  props: {
  data: Object,
  list: Array,
  tooltip: String,
  buttonIcon: String,
  itemIcon: String,
  valueKey: String,
  outSideFn: Function,
},
  emits: ['buttonClick', 'toggleClick', 'itemClick'],
  setup(__props, { emit: emits }) {

const props = __props;





const buttonClick = () => {
  emits('buttonClick');
};

const listShow = ref(false);
const toggle = () => {
  listShow.value = !listShow.value;
  emits('toggleClick');
};
const itemClick = (item, index) => {
  listShow.value = false;
  emits('itemClick', item, index);
};
const clickOutSide = () => {
  listShow.value = false;
  props.outSideFn && props.outSideFn();
};

watch(
  () => props.list,
  list => {
    if (!list.length) listShow.value = false;
  },
  {
    deep: true,
  }
);

return (_ctx, _cache) => {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _directive_click_outside = resolveDirective("click-outside");

  return (openBlock(), createElementBlock("div", _hoisted_1$k, [
    createVNode(_component_el_tooltip, {
      effect: "light",
      content: __props.tooltip,
      disabled: !__props.tooltip
    }, {
      default: withCtx(() => [
        createVNode(_component_el_button, {
          circle: "",
          class: normalizeClass({ active: Object.keys(__props.data).length }),
          onClick: buttonClick
        }, {
          default: withCtx(() => [
            createVNode(_component_svg_icon, {
              name: __props.buttonIcon,
              class: "svg-img"
            }, null, 8, ["name"])
          ]),
          _: 1
        }, 8, ["class"])
      ]),
      _: 1
    }, 8, ["content", "disabled"]),
    (__props.list.length)
      ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: "triangle",
          onClick: toggle
        }, _hoisted_3$d)), [
          [_directive_click_outside, clickOutSide]
        ])
      : createCommentVNode("", true),
    (listShow.value)
      ? (openBlock(), createElementBlock("div", _hoisted_4$9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.list, (item, index) => {
            return (openBlock(), createElementBlock("div", {
              class: "item",
              key: index,
              onClick: withModifiers($event => (itemClick(item, index)), ["stop"])
            }, [
              renderSlot(_ctx.$slots, "item", { item: item }, () => [
                createVNode(_component_svg_icon, {
                  name: __props.itemIcon,
                  class: "svg-img"
                }, null, 8, ["name"]),
                createBaseVNode("span", null, toDisplayString(item[__props.valueKey]), 1)
              ], true)
            ], 8, _hoisted_5$6))
          }), 128))
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
var ButtonSelect = /*#__PURE__*/_export_sfc(_sfc_main$l, [['__scopeId',"data-v-eb306790"]]);

var Classify_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".classify[data-v-3c0cf3d2]{position:absolute;top:0;left:calc(100% + .114583rem);z-index:999;padding:0 .104167rem .104167rem;width:2.083333rem;height:3.125rem;-webkit-box-sizing:border-box;box-sizing:border-box;background:#373b48;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.classify__container[data-v-3c0cf3d2]{-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:.0625rem;color:#fff9}.classify__wrap[data-v-3c0cf3d2]{padding-top:.104167rem;border-bottom:.005208rem solid rgba(255,255,255,.05)}.classify__content[data-v-3c0cf3d2]{padding:.104167rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.classify__content .btn[data-v-3c0cf3d2]{margin:0 .041667rem .041667rem 0;padding:0 .0625rem;line-height:.145833rem;background:rgba(255,255,255,.05)}.classify__content .btn.active[data-v-3c0cf3d2]{color:#428fff;background:rgba(66,143,255,.14)}.classify__bottom[data-v-3c0cf3d2]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center}\n")();

const _withScopeId$d = n => (pushScopeId("data-v-3c0cf3d2"),n=n(),popScopeId(),n);
const _hoisted_1$j = { class: "classify" };
const _hoisted_2$g = {
  key: 0,
  class: "classify__container"
};
const _hoisted_3$c = { class: "title" };
const _hoisted_4$8 = { class: "classify__content" };
const _hoisted_5$5 = ["onClick"];
const _hoisted_6$5 = {
  key: 1,
  class: "classify__container"
};
const _hoisted_7$5 = { class: "classify__wrap" };
const _hoisted_8$5 = /*#__PURE__*/ _withScopeId$d(() => /*#__PURE__*/createBaseVNode("span", { class: "title" }, "??????", -1));
const _hoisted_9$3 = { class: "classify__content" };
const _hoisted_10$3 = ["onClick"];
const _hoisted_11$3 = { class: "classify__bottom" };
const _hoisted_12$2 = /*#__PURE__*/createTextVNode(" ?????? ");
const _hoisted_13$2 = /*#__PURE__*/createTextVNode("??????");


const _sfc_main$k = {
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

  return (openBlock(), createElementBlock("div", _hoisted_1$j, [
    (__props.type === 'model')
      ? (openBlock(), createElementBlock("div", _hoisted_2$g, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.attributes, (attr) => {
            return (openBlock(), createElementBlock("div", {
              class: "classify__wrap",
              key: attr.id
            }, [
              createBaseVNode("span", _hoisted_3$c, toDisplayString(attr.attributesName) + "???", 1),
              createBaseVNode("div", _hoisted_4$8, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(attr.subattributes, (sub) => {
                  return (openBlock(), createElementBlock("div", {
                    class: normalizeClass(["btn", { active: __props.subattributeId.includes(sub.id) }]),
                    key: sub.id,
                    onClick: $event => (emits('modelClick', sub.id))
                  }, [
                    createBaseVNode("span", null, toDisplayString(sub.subattributeName), 1)
                  ], 10, _hoisted_5$5))
                }), 128))
              ])
            ]))
          }), 128))
        ]))
      : createCommentVNode("", true),
    (__props.type === 'scene')
      ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
          createBaseVNode("div", _hoisted_7$5, [
            _hoisted_8$5,
            createBaseVNode("div", _hoisted_9$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.attributes, (attr) => {
                return (openBlock(), createElementBlock("div", {
                  class: normalizeClass(["btn", { active: __props.label.id === attr.id }]),
                  key: attr.id,
                  onClick: $event => (emits('sceneClick', attr))
                }, [
                  createBaseVNode("span", null, toDisplayString(attr.labelName), 1)
                ], 10, _hoisted_10$3))
              }), 128))
            ])
          ])
        ]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_11$3, [
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
var Classify = /*#__PURE__*/_export_sfc(_sfc_main$k, [['__scopeId',"data-v-3c0cf3d2"]]);

var SceneCom_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-4066cc3a]::-webkit-scrollbar{display:none}.com[data-v-4066cc3a]{height:100%;padding:.104167rem .104167rem 0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.com[data-v-4066cc3a] .el-tabs__nav-wrap:after{height:.005208rem;background:#ffffff;opacity:.05}.com[data-v-4066cc3a] .el-tabs__active-bar{height:.005208rem;background:-webkit-gradient(linear,right top,left top,from(rgba(66,143,255,0)),color-stop(50%,#428fff),to(rgba(66,143,255,0)));background:linear-gradient(270deg,rgba(66,143,255,0) 0%,#428fff 50%,rgba(66,143,255,0) 100%)}.com[data-v-4066cc3a] .el-tabs__item{height:.130208rem;line-height:.078125rem;color:#fff9}.com[data-v-4066cc3a] .el-tabs__item.is-active{color:#428fff}.com__filter .el-row[data-v-4066cc3a]{margin-bottom:.041667rem}.com__filter .el-input[data-v-4066cc3a],.com__filter[data-v-4066cc3a] .el-input__inner{height:.145833rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff;border-right:none;background:none}.com__filter .el-input[data-v-4066cc3a]{width:96%;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.com__filter[data-v-4066cc3a] .el-input-group__append{background:none;-webkit-box-shadow:none;box-shadow:none}.com__filter[data-v-4066cc3a] .el-input-group__append .el-button{height:.135417rem;border:none;-webkit-box-sizing:border-box;box-sizing:border-box}.com__filter .el-select[data-v-4066cc3a]{width:96%;border:1px solid rgba(255,255,255,.14)}.com__filter .el-select[data-v-4066cc3a] .el-input__suffix,.com__filter .el-select[data-v-4066cc3a] .el-input__icon{line-height:.145833rem}.com__filter[data-v-4066cc3a] .filter-btn{padding:0;width:.145833rem;height:.145833rem;line-height:.145833rem;min-height:auto;border-radius:.020833rem;border:1px solid rgba(255,255,255,.14);background:none}.com__content[data-v-4066cc3a]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto}.com__item[data-v-4066cc3a]{margin-bottom:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item .image-wrap[data-v-4066cc3a]{position:relative;margin-bottom:.041667rem;width:100%;height:.927083rem}.com__item .image[data-v-4066cc3a]{width:100%;height:100%;border-radius:.041667rem}.com__item .download[data-v-4066cc3a]{position:absolute;right:.041667rem;bottom:.041667rem;width:.25rem;height:.166667rem;background:rgba(255,255,255,.9);border-radius:.010417rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item span[data-v-4066cc3a]{line-height:.0625rem;font-size:.0625rem;font-weight:400;color:#fff}.com__bottom[data-v-4066cc3a]{padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.com__bottom[data-v-4066cc3a] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.com__bottom[data-v-4066cc3a] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com__bottom[data-v-4066cc3a] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.com__bottom[data-v-4066cc3a] .el-pagination .btn-prev,.com__bottom[data-v-4066cc3a] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}\n")();

const _hoisted_1$i = { class: "com" };
const _hoisted_2$f = { class: "com__filter" };
const _hoisted_3$b = { class: "com__content" };
const _hoisted_4$7 = ["onMousedown"];
const _hoisted_5$4 = { class: "image-wrap" };
const _hoisted_6$4 = ["src"];
const _hoisted_7$4 = {
  key: 0,
  class: "download"
};
const _hoisted_8$4 = { class: "com__bottom" };


const _sfc_main$j = {
  __name: 'SceneCom',
  setup(__props) {

const store = useStore();

const userinfo = computed(() => store.state.account.userinfo);

// tab??????
const activeTab = ref('common');
watch(activeTab, tab => {
  console.log(tab);
  page.value = 1;
  total.value = 0;
  list.value = [];
  getScenes();
});

// ??????
const attributes = ref([]);
const getLabels = async () => {
  let { data } = await getLabelList({
    type: 1,
  });
  attributes.value = data;
};

// ????????????
const name = ref('');
const show = ref(false);
const label = reactive({
  labelName: '',
  id: '',
});
const page = ref(1);
const total = ref(0);
const list = ref([]);
const reset = () => {
  label.id = '';
  label.labelName = '';
  getScenes();
};
const sceneClick = ({ id, labelName }) => {
  label.id = id;
  label.labelName = labelName;
  getScenes();
};
const scenesListApi = computed(() => {
  let { userType } = userinfo.value;
  if (userType === 0) return getScenesPage
  if (userType === 1) return getTenantScenesPagePost
  if (userType === 2) return getTenantScenesPageGet
  return getScenesPage
});
const getScenes = async () => {
  let { userType } = userinfo.value;
  let params = {};
  if (userType === 0) {
    params = {
      // companyId: [0],
      labelName: label.labelName,
    };
  }
  if (userType === 1) {
    params = {
      // companyId: [0],
      labelName: label.labelName,
    };
  }
  if (userType === 2) {
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
        labelId: label.id,
        scenesName: name.value,
      };
    }
  }
  let { data } = await scenesListApi.value({
    ...params,
    name: name.value,
    page: page.value,
    state: 1,
  });
  list.value = data.list;
  total.value = data.total;
};
const change = num => {
  page.value = num;
  getScenes();
};
onMounted(() => {
  getLabels();
  getScenes();
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

// ????????????
const setScene = model => {
  // console.log(model)
  let { code, scenesName } = model;
  let initData = {
    modelId: code,
    modelName: scenesName,
    modelType: 1,
    entityLocate: '',
    entityRotate: '',
    entitySize: '',
    indexCode: '',
    entityHide: false,
    entityLock: false,
  };
  UE.publish('CGX_SceneButtonClick', initData);
  store.commit('drafts/toggleScene', initData);
  store.commit('drafts/toggleEditType', ['base']);
};

const sceneHandle = useProgress('scene', list, setScene);

return (_ctx, _cache) => {
  const _component_el_tab_pane = resolveComponent("el-tab-pane");
  const _component_el_tabs = resolveComponent("el-tabs");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_col = resolveComponent("el-col");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_progress = resolveComponent("el-progress");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1$i, [
    (unref(userinfo).userType === 2)
      ? (openBlock(), createBlock(_component_el_tabs, {
          key: 0,
          modelValue: activeTab.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((activeTab).value = $event))
        }, {
          default: withCtx(() => [
            createVNode(_component_el_tab_pane, {
              label: "????????????",
              name: "common"
            }),
            createVNode(_component_el_tab_pane, {
              label: "????????????",
              name: "mine"
            })
          ]),
          _: 1
        }, 8, ["modelValue"]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_2$f, [
      createVNode(_component_el_row, { style: {"position":"relative"} }, {
        default: withCtx(() => [
          createVNode(_component_el_col, { span: 22 }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: name.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((name).value = $event)),
                placeholder: "?????????????????????",
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
          }),
          createVNode(_component_el_col, { span: 2 }, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                class: "filter-btn",
                onClick: _cache[2] || (_cache[2] = $event => (show.value = !show.value))
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
          }),
          (show.value)
            ? (openBlock(), createBlock(Classify, {
                key: 0,
                type: "scene",
                attributes: attributes.value,
                label: label,
                onSceneClick: sceneClick,
                onReset: reset,
                onClose: _cache[3] || (_cache[3] = $event => (show.value = false))
              }, null, 8, ["attributes", "label"]))
            : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    createBaseVNode("div", _hoisted_3$b, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
        return (openBlock(), createElementBlock("div", {
          class: "com__item",
          key: item.id,
          onMousedown: $event => (unref(sceneHandle)(item))
        }, [
          createBaseVNode("div", _hoisted_5$4, [
            createBaseVNode("img", {
              class: "image",
              src: item.thumbnail,
              draggable: false
            }, null, 8, _hoisted_6$4),
            (item.progress !== 100)
              ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
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
          createBaseVNode("span", null, toDisplayString(item.scenesName), 1)
        ], 40, _hoisted_4$7))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_8$4, [
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
var SceneCom = /*#__PURE__*/_export_sfc(_sfc_main$j, [['__scopeId',"data-v-4066cc3a"]]);

var ModelCom_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-73d05c2c]::-webkit-scrollbar{display:none}.com[data-v-73d05c2c]{height:100%;padding:.104167rem .104167rem 0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.com[data-v-73d05c2c] .el-tabs__nav-wrap:after{height:.005208rem;background:#ffffff;opacity:.05}.com[data-v-73d05c2c] .el-tabs__active-bar{height:.005208rem;background:-webkit-gradient(linear,right top,left top,from(rgba(66,143,255,0)),color-stop(50%,#428fff),to(rgba(66,143,255,0)));background:linear-gradient(270deg,rgba(66,143,255,0) 0%,#428fff 50%,rgba(66,143,255,0) 100%)}.com[data-v-73d05c2c] .el-tabs__item{height:.130208rem;line-height:.078125rem;color:#fff9}.com[data-v-73d05c2c] .el-tabs__item.is-active{color:#428fff}.com__filter .el-row[data-v-73d05c2c]{margin-bottom:.041667rem}.com__filter .el-input[data-v-73d05c2c],.com__filter[data-v-73d05c2c] .el-input__inner{height:.145833rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff;border-right:none;background:none}.com__filter .el-input[data-v-73d05c2c]{border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.com__filter[data-v-73d05c2c] .el-input-group__append{background:none;-webkit-box-shadow:none;box-shadow:none}.com__filter[data-v-73d05c2c] .el-input-group__append .el-button{height:.135417rem;border:none;-webkit-box-sizing:border-box;box-sizing:border-box}.com__filter .el-select[data-v-73d05c2c]{width:96%;border:1px solid rgba(255,255,255,.14)}.com__filter .el-select[data-v-73d05c2c] .el-input__suffix,.com__filter .el-select[data-v-73d05c2c] .el-input__icon{line-height:.145833rem}.com__filter[data-v-73d05c2c] .filter-btn{padding:0;width:.145833rem;height:.145833rem;line-height:.145833rem;min-height:auto;border-radius:.020833rem;border:1px solid rgba(255,255,255,.14);background:none}.com__content[data-v-73d05c2c]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-line-pack:start;align-content:flex-start}.com__item[data-v-73d05c2c]{margin-bottom:.104167rem;width:49%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item .image-wrap[data-v-73d05c2c]{position:relative;margin-bottom:.041667rem;padding-top:100%;width:100%}.com__item .image[data-v-73d05c2c]{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:.041667rem}.com__item .download[data-v-73d05c2c]{position:absolute;right:.041667rem;bottom:.041667rem;width:.25rem;height:.166667rem;background:rgba(255,255,255,.9);border-radius:.010417rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item span[data-v-73d05c2c]{line-height:.0625rem;font-size:.0625rem;font-weight:400;color:#fff}.com__bottom[data-v-73d05c2c]{padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.com__bottom[data-v-73d05c2c] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.com__bottom[data-v-73d05c2c] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com__bottom[data-v-73d05c2c] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.com__bottom[data-v-73d05c2c] .el-pagination .btn-prev,.com__bottom[data-v-73d05c2c] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}\n")();

const _hoisted_1$h = { class: "com" };
const _hoisted_2$e = { class: "com__filter" };
const _hoisted_3$a = { class: "com__content" };
const _hoisted_4$6 = ["onMousedown"];
const _hoisted_5$3 = { class: "image-wrap" };
const _hoisted_6$3 = ["src"];
const _hoisted_7$3 = {
  key: 0,
  class: "download"
};
const _hoisted_8$3 = { class: "com__bottom" };


const _sfc_main$i = {
  __name: 'ModelCom',
  setup(__props) {

const store = useStore();

const userinfo = computed(() => store.state.account.userinfo);

// tab??????
const activeTab = ref('common');
watch(activeTab, tab => {
  console.log(tab);
  page.value = 1;
  total.value = 0;
  list.value = [];
  getModels();
});

// ??????
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

// ????????????
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
        // labelId
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
};
const change = num => {
  page.value = num;
  getModels();
};
onMounted(async () => {
  await getFieldList();
  getModels();
});

// const modelHandle = model => {
//   let { progress, code } = model
//   if (progress === 0) {
//     UE.publish('CGX_DownLoadModel', { modelCode: code })
//   }
//   if (progress === 100) {
//     createModel(model)
//   }
// }

// ????????????
const createModel = model => {
  // console.log(model)
  let { code, name } = model;
  let data = {
    modelId: code,
    modelName: name,
    modelType: 3,
    entityLocate: '',
    entityRotate: '',
    entitySize: '',
    indexCode: '',
    entityHide: false,
    entityLock: false,
  };
  UE.publish('CGX_ModelButtonClick', data);
};

const modelHandle = useProgress('model', list, createModel);

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

  return (openBlock(), createElementBlock("div", _hoisted_1$h, [
    (unref(userinfo).userType === 2)
      ? (openBlock(), createBlock(_component_el_tabs, {
          key: 0,
          modelValue: activeTab.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((activeTab).value = $event))
        }, {
          default: withCtx(() => [
            createVNode(_component_el_tab_pane, {
              label: "????????????",
              name: "common"
            }),
            createVNode(_component_el_tab_pane, {
              label: "????????????",
              name: "mine"
            })
          ]),
          _: 1
        }, 8, ["modelValue"]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_2$e, [
      createVNode(_component_el_row, null, {
        default: withCtx(() => [
          createVNode(_component_el_input, {
            modelValue: name.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((name).value = $event)),
            placeholder: "?????????????????????",
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
          createVNode(_component_el_col, { span: 22 }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: fieldId.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((fieldId).value = $event)),
                class: "m-2",
                placeholder: "????????????"
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
          }),
          createVNode(_component_el_col, { span: 2 }, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                class: "filter-btn",
                onClick: _cache[3] || (_cache[3] = $event => (show.value = !show.value))
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
          }),
          (show.value)
            ? (openBlock(), createBlock(Classify, {
                key: 0,
                type: "model",
                attributes: unref(attributes),
                subattributeId: subattributeId.value,
                onModelClick: modelClick,
                onReset: reset,
                onClose: _cache[4] || (_cache[4] = $event => (show.value = false))
              }, null, 8, ["attributes", "subattributeId"]))
            : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    createBaseVNode("div", _hoisted_3$a, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
        return (openBlock(), createElementBlock("div", {
          class: "com__item",
          key: item.id,
          onMousedown: $event => (unref(modelHandle)(item))
        }, [
          createBaseVNode("div", _hoisted_5$3, [
            createBaseVNode("img", {
              class: "image",
              src: item.thumbnail,
              draggable: false
            }, null, 8, _hoisted_6$3),
            (item.progress !== 100)
              ? (openBlock(), createElementBlock("div", _hoisted_7$3, [
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
          createBaseVNode("span", null, toDisplayString(item.name), 1)
        ], 40, _hoisted_4$6))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_8$3, [
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
var ModelCom = /*#__PURE__*/_export_sfc(_sfc_main$i, [['__scopeId',"data-v-73d05c2c"]]);

var iconEyesOn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEVHcEz////////////////////////////////////////////////////////////////P0YphAAAAEXRSTlMAcXgeETSRmYgKfwY9ZE9bRcSIdWwAAADASURBVHgB5VLdesUgCEMUAtb+vP/TTj161rXdt11v3NCvCQQD9P8ibsFULWzxEZaMd2S5VzOgq0RfYtm1Ui5dDsCKU2FVLuSHAdsJXlZgdUrhJRASLXtNPnFnaBMNMElJDKGNZGD/xJtigfU/big1pYycev9a2D8YY3YB04mxDpwUr0wJOltn/wWhScRHCR6lk3Ed0mbrxrg/M+p4RI+bUf7FqGH18bZ6KRer57J2qbVRnpb187rnwVSp7w7mT8cH0N0IHXoO/LEAAAAASUVORK5CYII=";

var iconEyesOff = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEVHcEz////////////////////////////////////////////////////////////////P0YphAAAAEXRSTlMAMQN4kgiAmQ6JGGQ+cSJMWg6POacAAAEPSURBVHgBxVJbcoMwDJRt2Ss/4f6n7RoCkyaUTD861Q8zaKV9WPJfFZu/Byyot/2iGLeA+sOCsvSsmvsKtYu2CzhruZhmW6sb5ktF9rKWV9nILUoLZFA4cdD2bLsC1cT6TtD5Z+Unnv0Adfx2ZGcD2La7jGBnP0/bDZkzHauUud4S0obwHNxmArknuUkN8oSg6H2VwsQnNInQY3WKG6CcgIbkxb4D4hOF6U6zU4SHiCmy7CLrtEjuKbKkY/Vhk/zToksTJSM/5jcjDGqNQgJaZEL2EtSMWhm1m0HUQBst88H822NhcsfiVgXS+8Uw2+Q3HWy7i5ukgkEnyH0Zv7qzowa0fDjU5bbPIOMHwJ/VF+uNCiFc+QJ7AAAAAElFTkSuQmCC";

var DashboardCom_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-a5babd28]::-webkit-scrollbar{display:none}.com[data-v-a5babd28]{height:100%;padding:.104167rem .104167rem 0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.com[data-v-a5babd28] .el-tabs__nav-wrap:after{height:.005208rem;background:#ffffff;opacity:.05}.com[data-v-a5babd28] .el-tabs__active-bar{height:.005208rem;background:-webkit-gradient(linear,right top,left top,from(rgba(66,143,255,0)),color-stop(50%,#428fff),to(rgba(66,143,255,0)));background:linear-gradient(270deg,rgba(66,143,255,0) 0%,#428fff 50%,rgba(66,143,255,0) 100%)}.com[data-v-a5babd28] .el-tabs__item{color:#fff9}.com[data-v-a5babd28] .el-tabs__item.is-active{color:#428fff}.com__filter .el-row[data-v-a5babd28]{margin-bottom:.041667rem}.com__filter .el-input[data-v-a5babd28],.com__filter[data-v-a5babd28] .el-input__inner{height:.145833rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff;border-right:none;background:none}.com__filter .el-input[data-v-a5babd28]{border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.com__filter[data-v-a5babd28] .el-input-group__append{background:none;-webkit-box-shadow:none;box-shadow:none}.com__filter[data-v-a5babd28] .el-input-group__append .el-button{height:.135417rem;border:none;-webkit-box-sizing:border-box;box-sizing:border-box}.com__filter .el-select[data-v-a5babd28]{width:100%;border:1px solid rgba(255,255,255,.14)}.com__filter .el-select[data-v-a5babd28] .el-input__suffix,.com__filter .el-select[data-v-a5babd28] .el-input__icon{line-height:.145833rem}.com__filter[data-v-a5babd28] .filter-btn{padding:0;width:.145833rem;height:.145833rem;line-height:.145833rem;min-height:auto;border-radius:.020833rem;border:1px solid rgba(255,255,255,.14);background:none}.com__content[data-v-a5babd28]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto}.com__item[data-v-a5babd28]{margin-bottom:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com__item .image-wrap[data-v-a5babd28]{position:relative;width:100%;margin-bottom:.041667rem}.com__item .image-wrap .image[data-v-a5babd28]{width:100%;height:.927083rem;border-radius:.041667rem}.com__item .title-wrap[data-v-a5babd28]{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.com__item .title-wrap .title[data-v-a5babd28]{-webkit-box-flex:1;-ms-flex:1;flex:1;line-height:.0625rem;font-size:.0625rem;font-weight:400;color:#fff;text-align:center}.com__item .title-wrap img[data-v-a5babd28]{width:.083333rem;height:.083333rem}.com .nav__item[data-v-a5babd28]{margin-bottom:.104167rem;width:49%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.com .nav__item .svg-wrap[data-v-a5babd28]{position:relative;margin-bottom:.041667rem;padding-top:100%;width:100%}.com .nav__item .svg-wrap .icon[data-v-a5babd28]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:66%;height:66%;border-radius:.041667rem}.com .nav__item span[data-v-a5babd28]{line-height:.0625rem;font-size:.0625rem;font-weight:400;color:#fff}.com__bottom[data-v-a5babd28]{padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.com__bottom[data-v-a5babd28] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.com__bottom[data-v-a5babd28] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.com__bottom[data-v-a5babd28] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.com__bottom[data-v-a5babd28] .el-pagination .btn-prev,.com__bottom[data-v-a5babd28] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}\n")();

const _hoisted_1$g = { class: "com" };
const _hoisted_2$d = { class: "com__filter" };
const _hoisted_3$9 = {
  key: 0,
  class: "com__content"
};
const _hoisted_4$5 = { class: "image-wrap" };
const _hoisted_5$2 = ["src", "onMousedown"];
const _hoisted_6$2 = { class: "title-wrap" };
const _hoisted_7$2 = { class: "title" };
const _hoisted_8$2 = ["src", "onClick"];
const _hoisted_9$2 = {
  key: 1,
  class: "com__content"
};
const _hoisted_10$2 = { class: "svg-wrap" };
const _hoisted_11$2 = {
  key: 2,
  class: "com__bottom"
};


const _sfc_main$h = {
  __name: 'DashboardCom',
  setup(__props, { expose }) {

const store = useStore();

const type = ref(1);
const options = [
  {
    value: 1,
    label: '????????????',
  },
  {
    value: 2,
    label: '????????????',
  },
];

const panel = computed(() => store.state.drafts.panel);
const navigations = computed(() => store.state.drafts.navigations);

// ????????????
const name = ref('');
const page = ref(1);
const total = ref(0);
const sources = ref([]);
const sourceId = ref('');
const list = ref([]);
const getDashboardsSource = async () => {
  let { data } = await queryDatabaseSource();
  sources.value = data;
  if (data.length) sourceId.value = data[0].id;
};
const getDashboards = async () => {
  let { data } = await getDashBoardPage({
    namePanel: name.value,
    panelUsage: 0,
    page: page.value,
    dataSourceId: sourceId.value,
  });
  list.value = data.list;
  total.value = data.total;
};
const change = num => {
  page.value = num;
  getDashboards();
};
onMounted(async () => {
  await getDashboardsSource();
  getDashboards();
});

// ????????????
const dashboardHandle = model => {
  let { id, ...panelData } = model;
  store.commit('drafts/setPanel', {
    ...panelData,
    modelId: id,
    modelType: 2,
  });
};
// ????????????
const clearDashboard = () => {
  store.commit('drafts/setPanel', {});
};

// ??????
const navList = [
  {
    icon: 'drafts-nav',
    text: '????????????',
  },
];
const addNav = params => {
  let initData = {
    _id: nanoid(),
    navigationCode: parseTime(Date.now(), '{y}{m}{d}{h}{i}{s}'),
    navigationName: '??????' + (navigations.value.length + 1),
    fontSize: 13,
    textColor: 'rgba(0,0,0,1)',
    navigationWidth: 48,
    navigationHeight: 48,
    pictureUrl:
      'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/dd216edf-9dee-4ced-b3cd-89a0c2fa0cf9.png',
    relatedCaseId: '',
    ...params,
  };
  store.commit('drafts/addNav', initData);
};
const navDragstart = e => {
  // console.log('navDragstart', e)
  e.dataTransfer.setData('nav', true);
};
expose({
  addNav,
});

return (_ctx, _cache) => {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_input = resolveComponent("el-input");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1$g, [
    createBaseVNode("div", _hoisted_2$d, [
      createVNode(_component_el_row, null, {
        default: withCtx(() => [
          createVNode(_component_el_select, {
            modelValue: type.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((type).value = $event))
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(options, (item) => {
                return createVNode(_component_el_option, {
                  key: item.value,
                  label: item.label,
                  value: item.value
                }, null, 8, ["label", "value"])
              }), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      }),
      (type.value === 1)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(_component_el_row, null, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  modelValue: sourceId.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((sourceId).value = $event)),
                  onChange: _cache[2] || (_cache[2] = $event => (change(1)))
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(sources.value, (item) => {
                      return (openBlock(), createBlock(_component_el_option, {
                        key: item.id,
                        label: item.applicationName,
                        value: item.id
                      }, null, 8, ["label", "value"]))
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_row, null, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: name.value,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((name).value = $event)),
                  placeholder: "?????????????????????",
                  onKeyup: withKeys(getDashboards, ["enter"])
                }, {
                  append: withCtx(() => [
                    createVNode(_component_el_button, {
                      icon: unref(search_default),
                      onClick: getDashboards
                    }, null, 8, ["icon"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onKeyup"])
              ]),
              _: 1
            })
          ], 64))
        : createCommentVNode("", true)
    ]),
    (type.value === 1)
      ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
            return (openBlock(), createElementBlock("div", {
              class: "com__item",
              key: item.id
            }, [
              createBaseVNode("div", _hoisted_4$5, [
                createBaseVNode("img", {
                  class: "image",
                  src: item.thumbnail,
                  draggable: false,
                  onMousedown: $event => (dashboardHandle(item))
                }, null, 40, _hoisted_5$2)
              ]),
              createBaseVNode("div", _hoisted_6$2, [
                createBaseVNode("span", _hoisted_7$2, toDisplayString(item.panelName), 1),
                createBaseVNode("img", {
                  src: unref(panel).modelId === item.id ? unref(iconEyesOff) : unref(iconEyesOn),
                  onClick: $event => (
              unref(panel).modelId === item.id
                ? clearDashboard()
                : dashboardHandle(item)
            )
                }, null, 8, _hoisted_8$2)
              ])
            ]))
          }), 128))
        ]))
      : (openBlock(), createElementBlock("div", _hoisted_9$2, [
          (openBlock(), createElementBlock(Fragment, null, renderList(navList, (item, index) => {
            return createBaseVNode("div", {
              class: "nav__item",
              key: index
            }, [
              createBaseVNode("div", _hoisted_10$2, [
                createBaseVNode("div", {
                  draggable: true,
                  onDragstart: navDragstart
                }, [
                  createVNode(_component_svg_icon, {
                    class: "svg-img",
                    name: item.icon
                  }, null, 8, ["name"])
                ], 32)
              ]),
              createBaseVNode("span", null, toDisplayString(item.text), 1)
            ])
          }), 64))
        ])),
    (type.value === 1)
      ? (openBlock(), createElementBlock("div", _hoisted_11$2, [
          createVNode(_component_el_pagination, {
            small: "",
            "pager-count": 5,
            background: "",
            layout: "total, prev, pager, next",
            total: total.value,
            onCurrentChange: change
          }, null, 8, ["total"])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
var DashboardCom = /*#__PURE__*/_export_sfc(_sfc_main$h, [['__scopeId',"data-v-a5babd28"]]);

var BaseSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-1c0fe23e]{background:transparent;color:#fff;border:none}.box-card[data-v-1c0fe23e] .el-card__header{border:none}.box-card[data-v-1c0fe23e] .el-card__body{padding-bottom:0}.box-card[data-v-1c0fe23e] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-1c0fe23e] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-1c0fe23e] .el-input,.box-card[data-v-1c0fe23e] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-1c0fe23e] .el-input__inner,.box-card[data-v-1c0fe23e] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.el-tag[data-v-1c0fe23e],.el-button[data-v-1c0fe23e]{margin:0 .03125rem .03125rem 0;color:#fff9;background:rgba(66,143,255,.14);border:none;border-radius:.010417rem;-webkit-transform:translateY(.015625rem);transform:translateY(.015625rem)}.el-button[data-v-1c0fe23e]{padding:0;width:.197917rem;line-height:.166667rem;font-size:.104167rem}\n")();

const _withScopeId$c = n => (pushScopeId("data-v-1c0fe23e"),n=n(),popScopeId(),n);
const _hoisted_1$f = /*#__PURE__*/ _withScopeId$c(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));
const _hoisted_2$c = /*#__PURE__*/createTextVNode(" + ");


const _sfc_main$g = {
  __name: 'BaseSetting',
  setup(__props) {

const store = useStore();

const caseData = computed(() => store.state.drafts.caseData);

// ??????
const caseLabels = computed(() => store.state.drafts.caseLabels);
const inputValue = ref('');
const inputVisible = ref(false);
const InputRef = ref();
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};
const handleClose = id => {
  caseLabels.value.splice(
    caseLabels.value.findIndex(item => item._id === id),
    1
  );
};
const handleInputConfirm = () => {
  if (inputValue.value) {
    caseLabels.value.push({
      id: 0,
      _id: Date.now(),
      labelName: inputValue.value,
    });
  }
  inputVisible.value = false;
  inputValue.value = '';
};

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$f
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(caseData),
        "label-width": "76px",
        "label-position": "left",
        onSubmit: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent"]))
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(caseData).caseName,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(caseData).caseName) = $event)),
                maxlength: "50",
                placeholder: "????????????"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                type: "textarea",
                modelValue: unref(caseData).caseDesc,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(caseData).caseDesc) = $event)),
                maxlength: "150",
                placeholder: "????????????"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(caseLabels), (label) => {
                return (openBlock(), createBlock(_component_el_tag, {
                  key: label._id,
                  effect: "dark",
                  closable: "",
                  onClose: $event => (handleClose(label._id))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(label.labelName), 1)
                  ]),
                  _: 2
                }, 1032, ["onClose"]))
              }), 128)),
              (inputVisible.value)
                ? (openBlock(), createBlock(_component_el_input, {
                    key: 0,
                    ref_key: "InputRef",
                    ref: InputRef,
                    modelValue: inputValue.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((inputValue).value = $event)),
                    class: "ml-1 w-20",
                    size: "small",
                    onKeyup: withKeys(handleInputConfirm, ["enter"]),
                    onBlur: handleInputConfirm
                  }, null, 8, ["modelValue", "onKeyup"]))
                : (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    class: "button-new-tag ml-1",
                    size: "small",
                    onClick: showInput
                  }, {
                    default: withCtx(() => [
                      _hoisted_2$c
                    ]),
                    _: 1
                  }))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var BaseSetting = /*#__PURE__*/_export_sfc(_sfc_main$g, [['__scopeId',"data-v-1c0fe23e"]]);

var ComSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-b1db0ae8]{background:transparent;color:#fff;border:none}.box-card[data-v-b1db0ae8] .el-card__header{border:none}.box-card[data-v-b1db0ae8] .el-card__body{padding-bottom:0}.box-card[data-v-b1db0ae8] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-b1db0ae8] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-b1db0ae8] .el-input,.box-card[data-v-b1db0ae8] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-b1db0ae8] .el-input__inner,.box-card[data-v-b1db0ae8] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.el-row[data-v-b1db0ae8]{width:100%}.el-row .el-col[data-v-b1db0ae8]{text-align:center}\n")();

const _withScopeId$b = n => (pushScopeId("data-v-b1db0ae8"),n=n(),popScopeId(),n);
const _hoisted_1$e = /*#__PURE__*/ _withScopeId$b(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));
const _hoisted_2$b = /*#__PURE__*/createTextVNode("X");
const _hoisted_3$8 = /*#__PURE__*/createTextVNode("Y");
const _hoisted_4$4 = /*#__PURE__*/createTextVNode("Z");


const _sfc_main$f = {
  __name: 'ComSetting',
  setup(__props) {

const store = useStore();

const entity = computed(() => store.state.drafts.entity[0]);

const change = () => {
  let { sizeX, sizeY, sizeZ } = entity.value;
  let { locateX, locateY, locateZ } = entity.value;
  let { rotateX, rotateY, rotateZ } = entity.value;
  let entityLocate = [locateX, locateY, locateZ].join(',');
  let entityRotate = [rotateX, rotateY, rotateZ].join(',');
  let entitySize = [sizeX, sizeY, sizeZ].join(',');

  console.log(entityLocate);
  console.log(entityRotate);
  console.log(entitySize);

  let {
    indexCode,
    modelName,
    modelId,
    modelType,
    entityHide,
    entityLock,
  } = entity.value;
  let data = {
    indexCode,
    modelName,
    modelId,
    modelType,
    entityLocate,
    entityRotate,
    entitySize,
    entityHide,
    entityLock,
  };

  UE.publish('CGX_ModelOperaiton', { entities: [data] });
  store.commit('drafts/changeEntity', [data]);
};

// ????????????
const options = ref([]);
const getDashboards = async () => {
  let { data } = await getDashBoardList({ panelUsage: 1 });
  options.value = data;
};
onMounted(() => {
  getDashboards();
});

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$e
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(entity),
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(entity).entityCode,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(entity).entityCode) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(entity).entityName,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(entity).entityName) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(entity).deviceCode,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(entity).deviceCode) = $event)),
                placeholder: "?????????????????????ID"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_row, { justify: "space-between" }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      _hoisted_2$b
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      _hoisted_3$8
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      _hoisted_4$4
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_row, { justify: "space-between" }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).sizeX,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(entity).sizeX) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).sizeY,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(entity).sizeY) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).sizeZ,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(entity).sizeZ) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_row, { justify: "space-between" }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).locateX,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(entity).locateX) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).locateY,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((unref(entity).locateY) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).locateZ,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((unref(entity).locateZ) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_row, { justify: "space-between" }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).rotateX,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((unref(entity).rotateX) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).rotateY,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((unref(entity).rotateY) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, { span: 7 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(entity).rotateZ,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((unref(entity).rotateZ) = $event)),
                        onChange: change
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "???????????????" }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: unref(entity).entityDashboardCode,
                "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((unref(entity).entityDashboardCode) = $event)),
                filterable: "",
                clearable: "",
                placeholder: "???"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(options.value, (item) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: item.id,
                      label: item.panelName,
                      value: item.id
                    }, null, 8, ["label", "value"]))
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox, {
                modelValue: unref(entity).dashboardShowState,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((unref(entity).dashboardShowState) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var ComSetting = /*#__PURE__*/_export_sfc(_sfc_main$f, [['__scopeId',"data-v-b1db0ae8"]]);

var DataSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-cf60e2d6]{background:transparent;color:#fff;border:none}.box-card[data-v-cf60e2d6] .el-card__header{border:none}.box-card[data-v-cf60e2d6] .el-card__body{padding-bottom:0}.box-card[data-v-cf60e2d6] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-cf60e2d6] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-cf60e2d6] .el-input,.box-card[data-v-cf60e2d6] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-cf60e2d6] .el-input__inner,.box-card[data-v-cf60e2d6] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}._el-form-item[data-v-cf60e2d6]{position:relative;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}._el-form-item .down[data-v-cf60e2d6]{position:absolute;right:0;top:-.1875rem;font-size:.0625rem;color:#428fff}\n")();

const _withScopeId$a = n => (pushScopeId("data-v-cf60e2d6"),n=n(),popScopeId(),n);
const _hoisted_1$d = /*#__PURE__*/ _withScopeId$a(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "???????????????")
], -1));


const _sfc_main$e = {
  __name: 'DataSetting',
  setup(__props) {

const store = useStore();

const method = computed({
  get: () => store.state.drafts.datasource,
  set: val => {
    store.commit('drafts/setDatasource', val);
  },
});
const list = ref([]);
const server = ref({});

const getData = async () => {
  let { data } = await queryDataSources();
  list.value = data.map(item => ({
    ...item,
    id: nanoid(),
  }));
};

const changeServer = () => {
  store.commit('drafts/setDatasource', {});
};

watch(
  () => store.state.drafts.datasource,
  method => {
    let { id } = method;
    if (list.value.length) {
      list.value.forEach(item => {
        let data = item.apiList.find(val => val.id === id);
        if (data) {
          server.value = item;
          store.commit('drafts/setDatasource', data);
        }
      });
    }
  }
);

onMounted(() => {
  getData();
});

return (_ctx, _cache) => {
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$d
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "????????????" }),
          createVNode(_component_el_form_item, { label: "?????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: server.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((server).value = $event)),
                "value-key": "id",
                onChange: changeServer
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: item.id,
                      label: item.serverName,
                      value: item
                    }, null, 8, ["label", "value"]))
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: unref(method),
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (isRef(method) ? (method).value = $event : null)),
                "value-key": "id"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(server.value.apiList, (item) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: item.id,
                      label: item.methodName,
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
      }, 512)
    ]),
    _: 1
  }))
}
}

};
var DataSetting = /*#__PURE__*/_export_sfc(_sfc_main$e, [['__scopeId',"data-v-cf60e2d6"]]);

var AlignSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-5f2abf7a]{background:transparent;color:#fff;border:none}.box-card[data-v-5f2abf7a] .el-card__header{border:none}.box-card[data-v-5f2abf7a] .el-card__body{padding-bottom:0}.box-card[data-v-5f2abf7a] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-5f2abf7a] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-5f2abf7a] .el-input,.box-card[data-v-5f2abf7a] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-5f2abf7a] .el-input__inner,.box-card[data-v-5f2abf7a] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.desc[data-v-5f2abf7a]{margin-left:.0625rem;font-size:.0625rem;color:#fff9}.el-button[data-v-5f2abf7a]{width:100%;border-color:#428fff;background-color:#2a2e39}.el-checkbox[data-v-5f2abf7a]{margin-right:.09375rem}\n")();

const _withScopeId$9 = n => (pushScopeId("data-v-5f2abf7a"),n=n(),popScopeId(),n);
const _hoisted_1$c = /*#__PURE__*/ _withScopeId$9(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????"),
  /*#__PURE__*/createBaseVNode("span", { class: "desc" }, "????????????????????????????????????")
], -1));
const _hoisted_2$a = /*#__PURE__*/createTextVNode("??????");
// eslint-disable-next-line no-unused-vars

const _sfc_main$d = {
  __name: 'AlignSetting',
  setup(__props) {

useStore();

const alignType = ref(['X']);
const list = ref([
  {
    value: 'X???',
    label: 'X',
  },
  {
    value: 'Y???',
    label: 'Y',
  },
  {
    value: 'Z???',
    label: 'Z',
  },
]);
const align = () => {
  UE.publish('CGX_Align', { alignType: alignType.value.sort().join('') });
};

return (_ctx, _cache) => {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$c
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "???????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox_group, {
                modelValue: alignType.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((alignType).value = $event))
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
                    return (openBlock(), createBlock(_component_el_checkbox, {
                      key: item.label,
                      label: item.label
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.value), 1)
                      ]),
                      _: 2
                    }, 1032, ["label"]))
                  }), 128))
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
                onClick: align
              }, {
                default: withCtx(() => [
                  _hoisted_2$a
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 512)
    ]),
    _: 1
  }))
}
}

};
var AlignSetting = /*#__PURE__*/_export_sfc(_sfc_main$d, [['__scopeId',"data-v-5f2abf7a"]]);

var CopySetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-5f212224]{background:transparent;color:#fff;border:none}.box-card[data-v-5f212224] .el-card__header{border:none}.box-card[data-v-5f212224] .el-card__body{padding-bottom:0}.box-card[data-v-5f212224] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-5f212224] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-5f212224] .el-input,.box-card[data-v-5f212224] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-5f212224] .el-input__inner,.box-card[data-v-5f212224] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.el-button[data-v-5f212224]{width:100%;border-color:#428fff;background-color:#2a2e39}[data-v-5f212224] .el-input-group__append{background-color:transparent;border:none}.el-radio[data-v-5f212224]{margin-right:.09375rem}\n")();

const _withScopeId$8 = n => (pushScopeId("data-v-5f212224"),n=n(),popScopeId(),n);
const _hoisted_1$b = /*#__PURE__*/ _withScopeId$8(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));
const _hoisted_2$9 = /*#__PURE__*/createTextVNode("cm");
const _hoisted_3$7 = /*#__PURE__*/createTextVNode("??????");


const _sfc_main$c = {
  __name: 'CopySetting',
  setup(__props) {

const copyType = ref('X');
const space = ref('100');
const count = ref('2');
const list = ref([
  {
    value: 'X???',
    label: 'X',
  },
  {
    value: 'Y???',
    label: 'Y',
  },
  {
    value: 'Z???',
    label: 'Z',
  },
]);
const copy = () => {
  UE.publish('CGX_ArrayCopy', {
    copyType: copyType.value,
    space: space.value,
    count: count.value,
  });
};

return (_ctx, _cache) => {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$b
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "???????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_radio_group, {
                modelValue: copyType.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((copyType).value = $event))
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item) => {
                    return (openBlock(), createBlock(_component_el_radio, {
                      key: item.label,
                      label: item.label
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.value), 1)
                      ]),
                      _: 2
                    }, 1032, ["label"]))
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: space.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((space).value = $event)),
                maxlength: "50"
              }, {
                append: withCtx(() => [
                  _hoisted_2$9
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: count.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((count).value = $event)),
                maxlength: "50"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                plain: "",
                onClick: copy
              }, {
                default: withCtx(() => [
                  _hoisted_3$7
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 512)
    ]),
    _: 1
  }))
}
}

};
var CopySetting = /*#__PURE__*/_export_sfc(_sfc_main$c, [['__scopeId',"data-v-5f212224"]]);

var NodeSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-9c1a6272]{background:transparent;color:#fff;border:none}.box-card[data-v-9c1a6272] .el-card__header{border:none}.box-card[data-v-9c1a6272] .el-card__body{padding-bottom:0}.box-card[data-v-9c1a6272] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-9c1a6272] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-9c1a6272] .el-input,.box-card[data-v-9c1a6272] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-9c1a6272] .el-input__inner,.box-card[data-v-9c1a6272] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}\n")();

const _withScopeId$7 = n => (pushScopeId("data-v-9c1a6272"),n=n(),popScopeId(),n);
const _hoisted_1$a = /*#__PURE__*/ _withScopeId$7(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));


const _sfc_main$b = {
  __name: 'NodeSetting',
  setup(__props) {

const store = useStore();

const caseData = computed(() => store.state.drafts.caseData);

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$a
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(caseData),
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(caseData).caseName,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(caseData).caseName) = $event)),
                maxlength: "15"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                type: "textarea",
                modelValue: unref(caseData).caseDesc,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(caseData).caseDesc) = $event)),
                maxlength: "150",
                placeholder: "????????????150?????????"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var NodeSetting = /*#__PURE__*/_export_sfc(_sfc_main$b, [['__scopeId',"data-v-9c1a6272"]]);

var Progress_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-progress[data-v-5536e02d]{position:relative;width:100%;height:.104167rem;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:.010417rem;border:1px solid rgba(255,255,255,.04);background:rgb(34,37,44);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:ew-resize}.c-progress .c-progress--label[data-v-5536e02d]{position:absolute;top:0;left:.0625rem;line-height:.104167rem;font-size:.0625rem;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#fff}.c-progress .c-progress--inner[data-v-5536e02d]{height:100%;width:0;background:#385684}.c-progress[data-v-5536e02d] .c-progress--input{height:100%;display:block;line-height:.078125rem;border:0 solid transparent!important}.c-progress[data-v-5536e02d] .c-progress--input .el-input__inner{height:100%;line-height:.078125rem;-webkit-box-shadow:none;box-shadow:none}\n")();

const _sfc_main$a = {
  __name: 'Progress',
  props: {
  modelValue: {
    type: Number,
  },
  range: {
    type: Array,
  },
  unit: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  len: {
    type: [Number, String],
    default: 6,
  },
},
  emits: ['update:modelValue', 'change', 'progressEnd'],
  setup(__props, { emit: $emit }) {

const props = __props;

const isMouseDown = ref(false);
const isInputMode = ref(false);
const editModeInputRef = ref();
const editModeInputValue = ref('');
const progressRef = ref();


const label = ref(props.modelValue);

const labelContent = computed(() => getNum(label.value));

watch(
  () => props.modelValue,
  val => {
    label.value = val;
  }
);



// ?????????input????????????????????????
const enterKeyDownEvent = e => {
  if (e.keyCode === 13) {
    updateProgressValueByInputValue();
  }
};

// ?????????input????????????????????????
watch(
  () => isInputMode.value,
  inputModeVal => {
    if (inputModeVal) {
      window.addEventListener('keydown', enterKeyDownEvent);
    } else {
      window.removeEventListener('keydown', enterKeyDownEvent);
    }
  }
);

// ???????????????????????????
const progressMouseDown = () => {
  isMouseDown.value = true;
  isInputMode.value = false;
};

// ???????????????????????????
const progressMouseMove = $event => {
  if (!isMouseDown.value) return

  const width = $event.offsetX;

  adjustPercent(width);
};

// ???????????????????????????
// ????????????????????????????????????????????????????????????
// ????????????????????????????????????????????????
const progressMouseLeave = $event => {
  if (isMouseDown.value) {
    isMouseDown.value = false;
    const width = $event.offsetX;
    adjustPercent(width);
  } else {
    isMouseDown.value = false;
  }
};
const progressMouseUp = $event => {
  progressMouseLeave($event);
  $emit('progressEnd');
};

// ???????????????????????????????????????
const progressRightClick = () => {
  if (props.disabled) return
  isInputMode.value = true;
  isMouseDown.value = false;
  editModeInputValue.value = getNum(props.modelValue);
  editModeInputRef.value.focus();
};

// ???????????????????????????
const updateProgressValueByInputValue = () => {
  isInputMode.value = false;
  isMouseDown.value = false;

  const [min, max] = props.range;
  let res = Number(editModeInputValue.value);
  // ???????????????????????????????????????????????????
  if (isNaN(res)) res = max;
  // ????????????????????????
  if (res > max) res = max;
  // ?????????????????????
  if (res < min) res = min;
  // ??????
  $emit('update:modelValue', res);
  $emit('change', res);
};

// ????????????
const adjustPercent = width => {
  // ????????????
  if (props.range.length !== 2) return
  // ????????????
  if (props.disabled) return
  // ???????????????????????????
  if (isInputMode.value) return

  // ???????????????dom
  const rect = progressRef.value.getBoundingClientRect();
  const containerWidth = rect.width;
  const [min, max] = props.range;

  let value;

  // ????????????????????????????????????
  if (width >= containerWidth) {
    value = max;
    // ????????????????????????????????????
  } else if (width <= 0) {
    value = min;
  } else {
    // ???????????????????????????
    const leftPercent = 1 - width / containerWidth;
    value = max - (max - min) * leftPercent;
  }

  label.value = Number(getNum(value));
  $emit('update:modelValue', value);
  $emit('change', value);
};

// ??????props value????????????
const width = computed(() => {
  if (props.range.length === 2) {
    const [min, max] = props.range;

    // const valueToMax = max - props.modelValue
    const valueToMax = max - label.value;

    const range = max - min;

    const valueToMaxPercent = (valueToMax * 1) / range;

    return Math.floor((1 - valueToMaxPercent) * 100)
  }

  return 0
});

// ?????????????????????????????????????????????
const getNum = (str = 0) => {
  var num = new Number(str).valueOf();

  if (isNaN(num)) {
    return num
  }

  let rgb = new RegExp('\\d+\\.\\d{1,' + props.len + '}');

  var result = (num + '').match(rgb);

  if (result == null) {
    return num
  }
  return str >= 0 ? result[0] : result[0] * -1
};

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");

  return (openBlock(), createElementBlock("div", {
    ref_key: "progressRef",
    ref: progressRef,
    class: "c-progress",
    onMousedown: progressMouseDown,
    onMousemove: progressMouseMove,
    onMouseleave: progressMouseLeave,
    onMouseup: progressMouseUp,
    onDblclick: progressRightClick
  }, [
    withDirectives(createBaseVNode("div", {
      class: "c-progress--inner",
      style: normalizeStyle({ width: `${unref(width)}% !important` })
    }, null, 4), [
      [vShow, !isInputMode.value]
    ]),
    withDirectives(createBaseVNode("span", { class: "c-progress--label" }, toDisplayString(unref(labelContent)) + toDisplayString(__props.unit), 513), [
      [vShow, !isInputMode.value]
    ]),
    withDirectives(createVNode(_component_el_input, {
      ref_key: "editModeInputRef",
      ref: editModeInputRef,
      modelValue: editModeInputValue.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((editModeInputValue).value = $event)),
      size: "small",
      class: "c-progress--input",
      onBlur: updateProgressValueByInputValue
    }, null, 8, ["modelValue"]), [
      [vShow, isInputMode.value]
    ])
  ], 544))
}
}

};
var Progress = /*#__PURE__*/_export_sfc(_sfc_main$a, [['__scopeId',"data-v-5536e02d"]]);

var Pannel_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-67db320f]{background:transparent;color:#fff;border:none}.box-card[data-v-67db320f] .el-card__header{border:none}.box-card[data-v-67db320f] .el-card__body{padding-bottom:0}.box-card[data-v-67db320f] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-67db320f] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-67db320f] .el-input,.box-card[data-v-67db320f] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-67db320f] .el-input__inner,.box-card[data-v-67db320f] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.box-card .c-section-title[data-v-67db320f]{margin:0;font-size:.0625rem;font-family:PingFangSC-Regular;font-weight:400;color:#fff}.box-card[data-v-67db320f] .el-form .el-form-item{margin-bottom:.041667rem}.box-card[data-v-67db320f] .el-form .el-form-item__label,.box-card[data-v-67db320f] .el-form .c-section-label{font-size:.0625rem;font-family:PingFangSC-Regular;font-weight:400;color:#fff9;white-space:nowrap}.box-card .c-form-select[data-v-67db320f]{width:100%}.box-card .c-section-label-container[data-v-67db320f]{width:.416667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.box-card .c-section-label-container .el-checkbox[data-v-67db320f]{margin-right:.03125rem}.box-card[data-v-67db320f] .el-input-number .el-input__inner{padding:0 .026042rem!important}.box-card[data-v-67db320f] .el-color-picker .el-color-picker__trigger,.box-card[data-v-67db320f] .el-color-picker .el-color-picker__trigger .el-color-picker__color{border:none}.box-card[data-v-67db320f] .el-color-picker .el-color-picker__trigger .el-color-picker__icon{display:none}.box-card .el-button[data-v-67db320f]{width:100%;border-color:#428fff;background-color:#2a2e39}\n")();

var Pannel_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".c-color-picker-popper.el-color-picker__panel.el-popper{background:#373b48;padding:.03125rem .0625rem;border-radius:.020833rem;border:1px solid rgba(255,255,255,.15)}.c-color-picker-popper.el-color-picker__panel.el-popper .el-color-dropdown__btns .el-button--text{font-size:.0625rem;font-family:PingFangSC-Medium;font-weight:500;color:#fff9}.c-color-picker-popper.el-color-picker__panel.el-popper .el-color-dropdown__btns .el-button.is-plain.el-color-dropdown__btn{border-radius:.020833rem;border:1px solid #428fff;font-size:.0625rem;font-family:PingFangSC-Medium;font-weight:500;color:#428fff;padding:.026042rem .0625rem;background-color:transparent}\n")();

const _withScopeId$6 = n => (pushScopeId("data-v-67db320f"),n=n(),popScopeId(),n);
const _hoisted_1$9 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));
const _hoisted_2$8 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("h5", { class: "c-section-title" }, "??????", -1));
const _hoisted_3$6 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("br", null, null, -1));
const _hoisted_4$3 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("h5", { class: "c-section-title" }, "??????", -1));
const _hoisted_5$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("br", null, null, -1));
const _hoisted_6$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("h5", { class: "c-section-title" }, "Cloud", -1));
const _hoisted_7$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("br", null, null, -1));
const _hoisted_8$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("h5", { class: "c-section-title" }, "Bloom", -1));
const _hoisted_9$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("br", null, null, -1));
const _hoisted_10$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("h5", { class: "c-section-title" }, "Exposure", -1));
const _hoisted_11$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("br", null, null, -1));
const _hoisted_12$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("h5", { class: "c-section-title" }, "Global", -1));
const _hoisted_13$1 = { class: "c-section-label-container" };
const _hoisted_14$1 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("label", { class: "c-section-label" }, "?????????", -1));
const _hoisted_15$1 = { class: "c-section-label-container" };
const _hoisted_16 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("label", { class: "c-section-label" }, "?????????", -1));
const _hoisted_17 = { class: "c-section-label-container" };
const _hoisted_18 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("label", { class: "c-section-label" }, "??????", -1));
const _hoisted_19 = /*#__PURE__*/ _withScopeId$6(() => /*#__PURE__*/createBaseVNode("br", null, null, -1));
const _hoisted_20 = /*#__PURE__*/createTextVNode("????????????");


const _sfc_main$9 = {
  __name: 'Pannel',
  setup(__props) {

const store = useStore();

const form = computed(() => store.state.drafts.caseLighting);

onMounted(() => {
  document.oncontextmenu = () => false;
});

watch(
  () => store.state.drafts.caseLighting,
  val => {
    let {
      lightColor,
      globalSaturationIntensity,
      globalContrastIntensity,
      globalGammaValue,
      lightDirX,
      lightDirY,
      lightDirZ,
    } = form.value;

    lightDirX = lightDirX || 0;
    lightDirY = lightDirY || 0;
    lightDirZ = lightDirZ || 0;

    let data = {
      ...form.value,
      lightDir: `${lightDirX}, ${lightDirY}, ${lightDirZ}`,
      lightColor: rgba2Str(lightColor),
      globalSaturationIntensity: rgba2Str(globalSaturationIntensity),
      globalContrastIntensity: rgba2Str(globalContrastIntensity),
      globalGammaValue: rgba2Str(globalGammaValue),
    };

    delete data.lightDirX;
    delete data.lightDirY;
    delete data.lightDirZ;

    UE.publish('CGX_LightParameterChange', data);
  },
  { deep: true }
);

const reset = () => {
  UE.publish('CGX_LightDefaultClick', {});
};

// const params = {
//   lightIntensity: '0.0f-150.0f', //???????????? done
//   lightColor: '0-1,0-1,0-1,0-1', //???????????? done
//   lightDir: '0.0f-360.0f,0.0f-360.0f,0.0f-360.0f', //???????????? done
//   sourceAnle: '0.0-5.0f', //???????????? done
//   indirectLightIntensity: '0.0-6.0f', //?????????????????? done
//   lightShaftOcclusion: false, //???????????????????????? done
//   occlusionMaskDarkness: '0.0f-1.0f', //?????????????????? done
//   lightShaftBloom: false, //???????????? done
//   bloomScale: '0.0f-10.0f', //?????????????????? done
//   cloudSpeed: '1.0f', //????????? done
//   cloudOpacity: '0.7f', //???????????? done
//   exposureCompensation: '-15.0f-15.0f', //???????????? done
//   bloomMethod: '??????/??????', //?????????????????? done
//   bloomIntensity: '0.0f-8.0f', //???????????? done
//   globalSaturation: false, //??????????????????????????? done
//   globalSaturationIntensity: '0-1,0-1,0-1,0-1', //????????????????????? done
//   globalContrast: false, //??????????????????????????? done
//   globalContrastIntensity: '0-1,0-1,0-1,0-1', //????????????????????? done
//   globalGamma: false, //??????Gamma???????????? done
//   globalGammaValue: '0-1,0-1,0-1,0-1', //??????Gamma??? done
// }

return (_ctx, _cache) => {
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_color_picker = resolveComponent("el-color-picker");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$9
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        "label-position": "left",
        "label-width": "76px",
        class: "c-form",
        size: "small",
        model: unref(form)
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              _hoisted_2$8
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).lightIntensity,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(form).lightIntensity) = $event)),
                range: [0, 10]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_color_picker, {
                modelValue: unref(form).lightColor,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(form).lightColor) = $event)),
                "popper-class": "c-color-picker-popper",
                "show-alpha": ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????: X" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).lightDirX,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(form).lightDirX) = $event)),
                range: [-360, 360]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????: Y" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).lightDirY,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(form).lightDirY) = $event)),
                range: [-360, 360]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????: Z" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).lightDirZ,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(form).lightDirZ) = $event)),
                range: [-360, 360]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????????????????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).indirectLightIntensity,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(form).indirectLightIntensity) = $event)),
                range: [0, 6]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          _hoisted_3$6,
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              _hoisted_4$3
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox, {
                modelValue: unref(form).lightShaftOcclusion,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(form).lightShaftOcclusion) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????????????????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).occlusionMaskDarkness,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((unref(form).occlusionMaskDarkness) = $event)),
                disabled: !unref(form).lightShaftOcclusion,
                range: [0, 1]
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox, {
                modelValue: unref(form).lightShaftBloom,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((unref(form).lightShaftBloom) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).bloomScale,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((unref(form).bloomScale) = $event)),
                range: [0, 10],
                disabled: !unref(form).lightShaftBloom
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          _hoisted_5$1,
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              _hoisted_6$1
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "?????????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).cloudSpeed,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((unref(form).cloudSpeed) = $event)),
                range: [0, 10],
                disabled: !unref(form).lightShaftBloom
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).cloudOpacity,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((unref(form).cloudOpacity) = $event)),
                range: [0, 1],
                disabled: !unref(form).lightShaftBloom
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          _hoisted_7$1,
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              _hoisted_8$1
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: unref(form).bloomMethod,
                "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((unref(form).bloomMethod) = $event)),
                class: "c-form-select",
                size: "small"
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock(Fragment, null, renderList(['Standard', 'Convolution'], (item, index) => {
                    return createVNode(_component_el_option, {
                      key: index,
                      label: item,
                      value: item
                    }, null, 8, ["label", "value"])
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).bloomIntensity,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((unref(form).bloomIntensity) = $event)),
                range: [0, 8]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          _hoisted_9$1,
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              _hoisted_10$1
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).exposureCompensation,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((unref(form).exposureCompensation) = $event)),
                range: [-15, 15]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          _hoisted_11$1,
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              _hoisted_12$1
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              createBaseVNode("div", _hoisted_13$1, [
                createVNode(_component_el_checkbox, {
                  modelValue: unref(form).globalSaturation,
                  "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((unref(form).globalSaturation) = $event))
                }, null, 8, ["modelValue"]),
                _hoisted_14$1
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_el_color_picker, {
                modelValue: unref(form).globalSaturationIntensity,
                "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((unref(form).globalSaturationIntensity) = $event)),
                "popper-class": "c-color-picker-popper",
                disabled: !unref(form).globalSaturation,
                "show-alpha": ""
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              createBaseVNode("div", _hoisted_15$1, [
                createVNode(_component_el_checkbox, {
                  modelValue: unref(form).globalContrast,
                  "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((unref(form).globalContrast) = $event))
                }, null, 8, ["modelValue"]),
                _hoisted_16
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_el_color_picker, {
                modelValue: unref(form).globalContrastIntensity,
                "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((unref(form).globalContrastIntensity) = $event)),
                "popper-class": "c-color-picker-popper",
                disabled: !unref(form).globalContrast,
                "show-alpha": ""
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            label: withCtx(() => [
              createBaseVNode("div", _hoisted_17, [
                createVNode(_component_el_checkbox, {
                  modelValue: unref(form).globalGamma,
                  "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((unref(form).globalGamma) = $event))
                }, null, 8, ["modelValue"]),
                _hoisted_18
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_el_color_picker, {
                modelValue: unref(form).globalGammaValue,
                "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => ((unref(form).globalGammaValue) = $event)),
                "popper-class": "c-color-picker-popper",
                disabled: !unref(form).globalGamma,
                "show-alpha": ""
              }, null, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          _hoisted_19,
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                plain: "",
                onClick: reset
              }, {
                default: withCtx(() => [
                  _hoisted_20
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var Pannel = /*#__PURE__*/_export_sfc(_sfc_main$9, [['__scopeId',"data-v-67db320f"]]);

var WeatherSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-d1d47df0]{background:transparent;color:#fff;border:none}.box-card[data-v-d1d47df0] .el-card__header{border:none}.box-card[data-v-d1d47df0] .el-card__body{padding-bottom:0}.box-card[data-v-d1d47df0] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-d1d47df0] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-d1d47df0] .el-input,.box-card[data-v-d1d47df0] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-d1d47df0] .el-input__inner,.box-card[data-v-d1d47df0] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.card-header[data-v-d1d47df0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}[data-v-d1d47df0] .el-input-group__append{background-color:transparent;border:none}.uploader .el-button[data-v-d1d47df0]{font-size:.0625rem}\n")();

const _withScopeId$5 = n => (pushScopeId("data-v-d1d47df0"),n=n(),popScopeId(),n);
const _hoisted_1$8 = /*#__PURE__*/ _withScopeId$5(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));
const _hoisted_2$7 = /*#__PURE__*/createTextVNode(" ???????????? ");


const _sfc_main$8 = {
  __name: 'WeatherSetting',
  setup(__props) {

const store = useStore();

const weatherList = [
  {
    value: '???',
    label: '???',
  },
  {
    value: '??????',
    label: '??????',
  },
  {
    value: '???',
    label: '???',
  },
  {
    value: '??????',
    label: '??????',
  },
  {
    value: '??????',
    label: '??????',
  },
  {
    value: '??????',
    label: '??????',
  },
  {
    value: '??????',
    label: '??????',
  },
  {
    value: '??????',
    label: '??????',
  },
  {
    value: '??????',
    label: '??????',
  },
];
const windList = [
  {
    value: 0,
    label: '0 ???',
  },
  {
    value: 1,
    label: '1 ???',
  },
  {
    value: 2,
    label: '2 ???',
  },
  {
    value: 3,
    label: '3 ???',
  },
  {
    value: 4,
    label: '4 ???',
  },
  {
    value: 5,
    label: '5 ???',
  },
  {
    value: 6,
    label: '6 ???',
  },
  {
    value: 7,
    label: '7 ???',
  },
  {
    value: 8,
    label: '8 ???',
  },
  {
    value: 9,
    label: '9 ???',
  },
  {
    value: 10,
    label: '10 ???',
  },
  {
    value: 11,
    label: '11 ???',
  },
  {
    value: 12,
    label: '12 ???',
  },
];

const form = computed(() => store.state.drafts.caseDynamicWeather);
watch(
  form,
  val => {
    // console.log(val)
    UE.publish('JS2UE_WeatherControl', val);
  },
  {
    deep: true,
  }
);

const change = async uploadFile => {
  let { raw } = uploadFile;
  let { data } = await uploadCommonFile(raw);
  let obj = {
    ...form.value,
    pathHDR: data.downloadUrl,
  };
  // form.value.pathHDR = data.downloadUrl
  store.commit('drafts/setWeather', obj);
};

return (_ctx, _cache) => {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$8
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(form),
        "label-width": "116px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "??????????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox, {
                modelValue: unref(form).isRealTime,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(form).isRealTime) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "???????????????" }, {
            default: withCtx(() => [
              createVNode(TSlider, {
                modelValue: unref(form).adjustTime,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(form).adjustTime) = $event)),
                min: 0,
                max: 24,
                step: 0.5,
                disabled: unref(form).isRealTime
              }, null, 8, ["modelValue", "step", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox, {
                modelValue: unref(form).isRealWeather,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(form).isRealWeather) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: unref(form).adjustWeather,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(form).adjustWeather) = $event)),
                filterable: "",
                clearable: "",
                placeholder: "???",
                disabled: unref(form).isRealWeather
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock(Fragment, null, renderList(weatherList, (item) => {
                    return createVNode(_component_el_option, {
                      key: item.value,
                      label: item.label,
                      value: item.value
                    }, null, 8, ["label", "value"])
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: unref(form).adjustWind,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(form).adjustWind) = $event)),
                filterable: "",
                clearable: "",
                placeholder: "???",
                disabled: unref(form).isRealWeather
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock(Fragment, null, renderList(windList, (item) => {
                    return createVNode(_component_el_option, {
                      key: item.value,
                      label: item.label,
                      value: item.value
                    }, null, 8, ["label", "value"])
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue", "disabled"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "HDR??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_upload, {
                class: "uploader",
                action: "",
                accept: ".hdr",
                "show-file-list": true,
                "auto-upload": false,
                "on-change": change
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    round: "",
                    icon: unref(upload_default)
                  }, {
                    default: withCtx(() => [
                      _hoisted_2$7
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var WeatherSetting = /*#__PURE__*/_export_sfc(_sfc_main$8, [['__scopeId',"data-v-d1d47df0"]]);

var iconLock = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEVHcEz////////////////////////////////////JATChAAAACnRSTlMAHFeHmQVyXSoMGgAaogAAAIBJREFUeAGlz7EKgzAQBuBraWm7lj5AC+0bZOio3qGO6jP4AA4+gKCLm49sDuSSkEFJ/uHk/+AwB0fzVPixe0M6P9OvbTHXfV4JnHEAuKu3wKvkOaUC347nLRNQegPghAK08HyQAecTACNZ+fM/bUBncyvBcEniIe4d3nHe+XtZAT/PIrL7s7yMAAAAAElFTkSuQmCC";

var iconUnlock = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEVHcEz////////////////////////////////////JATChAAAACnRSTlMAHFeHmQVyXSoMGgAaogAAAH5JREFUeAGlzzEOgzAMBVC3atV2rXqAIsENMjACtoAROAMHYOAASLCwcWTixYmSAVD+8CU/gWLD2XwVRvbckU5i5mdfre1YNgJ3nADe6i/wq7mXXCAeuF+FgNJ/ANxQgDbuDxlw17oKM1lJ+U0b0P2eQuCRhUPYHt5x3vlH2QHaKSGi7W3e9wAAAABJRU5ErkJggg==";

var NodePrefix_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-tree-node--prefix[data-v-f12b2e2e]{position:absolute;left:0;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-tree-node--prefix .c-tree-node--prefix-icon[data-v-f12b2e2e]{width:100%;height:100%}.c-tree-node--prefix .c-tree-node--action[data-v-f12b2e2e]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:.005208rem .020833rem;width:.083333rem;height:.083333rem}\n")();

const _hoisted_1$7 = { class: "c-tree-node--prefix" };
const _hoisted_2$6 = ["src", "alt"];
const _hoisted_3$5 = ["src", "alt"];


const _sfc_main$7 = {
  __name: 'NodePrefix',
  props: {
  node: {},
},
  setup(__props) {

const props = __props;

const $attrs = useAttrs();



const node = ref(props.node);

const collection = {
  entityHide: [
    {
      url: iconEyesOn,
      desc: '??????',
    },
    {
      url: iconEyesOff,
      desc: '?????????',
    },
  ],
  entityLock: [
    {
      url: iconUnlock,
      desc: '??????',
    },
    {
      url: iconLock,
      desc: '??????',
    },
  ],
};

const getInfo = type => {
  // eslint-disable-next-line no-debugger
  if (node.value.data[type] === undefined) node.value.data[type] = false;
  let boolIndex = node.value.data[type] ? 1 : 0;
  let remainder = collection[type].length;
  let index = boolIndex % remainder;
  return collection[type][index]
};

const viewInfo = computed(() => getInfo('entityHide'));
const lockInfo = computed(() => getInfo('entityLock'));

const actionClick = type => {
  node.value.data[type] = !node.value.data[type];
  // console.log(type, node.value)
  // ?????? toggles
  $attrs.onToggles(type, [node.value.data]);
};

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$7, [
    createBaseVNode("div", {
      class: "c-tree-node--action",
      onClick: _cache[0] || (_cache[0] = withModifiers($event => (actionClick('entityHide')), ["stop"]))
    }, [
      createBaseVNode("img", {
        class: "c-tree-node--prefix-icon",
        src: unref(viewInfo).url,
        alt: unref(viewInfo).desc
      }, null, 8, _hoisted_2$6)
    ]),
    createBaseVNode("div", {
      class: "c-tree-node--action",
      onClick: _cache[1] || (_cache[1] = withModifiers($event => (actionClick('entityLock')), ["stop"]))
    }, [
      createBaseVNode("img", {
        class: "c-tree-node--prefix-icon",
        src: unref(lockInfo).url,
        alt: unref(lockInfo).desc
      }, null, 8, _hoisted_3$5)
    ])
  ]))
}
}

};
var NodePrefix = /*#__PURE__*/_export_sfc(_sfc_main$7, [['__scopeId',"data-v-f12b2e2e"]]);

var TreeNode_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-tree-input[data-v-81141598]{border-radius:.010417rem}.c-tree-node[data-v-81141598]{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:.0625rem;font-family:PingFangSC-Regular;font-weight:400;color:#fff9}.c-tree-node:hover .c-tree-node--suffix[data-v-81141598]{display:-webkit-box;display:-ms-flexbox;display:flex}.c-tree-node .c-tree-node--suffix[data-v-81141598]{display:none;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-tree-node .c-tree-node--action[data-v-81141598]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:.005208rem .020833rem;width:.083333rem;height:.083333rem}\n")();

const _hoisted_1$6 = { class: "c-tree-node" };
const _hoisted_2$5 = { class: "c-tree-node--text" };
const _hoisted_3$4 = { class: "c-tree-node--suffix" };


const _sfc_main$6 = {
  __name: 'TreeNode',
  props: {
  node: {},
  data: {},
},
  emits: ['nodeChanged', 'nodeSelected'],
  setup(__props, { emit: $emit }) {

const props = __props;





const editModeInputRef = ref(null);
const editModeInputValue = ref('');

// ????????????
// 1.???????????? 2.??????????????????????????????????????? 3.??????????????????????????????????????????????????? 4.????????????????????????????????? 5.??????????????????????????????
// ????????????1 ????????????emit????????????
watch(
  () => props.node.isCurrent,
  isCurrent => {
    if (isCurrent) {
      let node = props.node;
      $emit('nodeSelected', { node, data: node.data });
    }
  }
);
// ????????????2 ?????????????????????????????????, ??????????????????label??????
const triggerNodeToEditMode = node => {
  const { viewName } = node.data;
  editModeInputValue.value = viewName;
  node.isEdit = true;
  editModeInputRef.value.focus();
};
// ????????????3 ????????????????????????????????????????????????????????? && ??????????????????
const changeNodeLabel = node => {
  node.data.viewName = editModeInputValue.value;
  // ????????????????????????
  editModeInputValue.value = '';
  node.isEdit = false;
  $emit('nodeChanged', 'edit', { node, data: node.data });
};
// ????????????4 ????????????
const appendNode = node => {
  const { data } = node;
  const newChild = {
    indexCode: nanoid(),
    isNode: true,
    viewName: '???????????????',
    entityHide: false,
    entityLock: false,
    children: [],
  };
  if (!data.children) {
    data.children = [];
  }
  data.children.push(newChild);
  $emit('nodeChanged', 'append', { node, data });
};
// ????????????5 ??????????????????????????????, ???????????????????????????
const removeNode = node => {
  if (node.data.children && node.data.children.length) {
    return ElMessage.error('??????????????????????????????????????????')
  }
  const parent = node.parent;
  const children = parent.data.children || parent.data;
  const index = children.findIndex(d => d.indexCode === node.data.indexCode);
  children.splice(index, 1);
  $emit('nodeChanged', 'remove', { node, data: node.data });
};

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_icon = resolveComponent("el-icon");

  return (openBlock(), createElementBlock("div", _hoisted_1$6, [
    (!__props.node.data.isNode)
      ? (openBlock(), createBlock(NodePrefix, {
          key: 0,
          node: __props.node,
          onToggles: _ctx.$attrs.onToggles
        }, null, 8, ["node", "onToggles"]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_2$5, [
      withDirectives(createVNode(_component_el_input, {
        class: "c-tree-input",
        size: "small",
        maxlength: "10",
        modelValue: editModeInputValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((editModeInputValue).value = $event)),
        ref_key: "editModeInputRef",
        ref: editModeInputRef,
        onBlur: _cache[1] || (_cache[1] = $event => (changeNodeLabel(__props.node)))
      }, null, 8, ["modelValue"]), [
        [vShow, __props.node.isEdit]
      ]),
      (!__props.node.isEdit)
        ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "c-tree-node--label",
            onDblclick: _cache[2] || (_cache[2] = withModifiers($event => (triggerNodeToEditMode(__props.node)), ["stop"]))
          }, toDisplayString(__props.node.data.viewName), 33))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_3$4, [
      (__props.node.data.indexCode !== 0)
        ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "c-tree-node--action",
            onClick: _cache[3] || (_cache[3] = withModifiers($event => (removeNode(__props.node)), ["stop"]))
          }, [
            createVNode(_component_el_icon, { size: 14 }, {
              default: withCtx(() => [
                createVNode(unref(minus_default))
              ]),
              _: 1
            })
          ]))
        : createCommentVNode("", true),
      (__props.node.data.isNode)
        ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "c-tree-node--action",
            onClick: _cache[4] || (_cache[4] = withModifiers($event => (appendNode(__props.node)), ["stop"]))
          }, [
            createVNode(_component_el_icon, { size: 14 }, {
              default: withCtx(() => [
                createVNode(unref(plus_default))
              ]),
              _: 1
            })
          ]))
        : createCommentVNode("", true)
    ])
  ]))
}
}

};
var TreeNode = /*#__PURE__*/_export_sfc(_sfc_main$6, [['__scopeId',"data-v-81141598"]]);

var Tree_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-e581fe26]::-webkit-scrollbar{width:.020833rem;height:.020833rem}[data-v-e581fe26]::-webkit-scrollbar-track{background:transparent}[data-v-e581fe26]::-webkit-scrollbar-thumb{border-radius:.010417rem;background:rgba(255,255,255,.15)}.c-tree[data-v-e581fe26]{min-width:1.354167rem}.c-tree .c-tree-input[data-v-e581fe26]{margin-bottom:.104167rem;border-radius:.010417rem}.c-tree .c-tree-container[data-v-e581fe26]{width:100%;min-height:.3125rem;max-height:1.354167rem;overflow:auto}.c-tree .c-tree-container[data-v-e581fe26] .el-tree{--el-tree-text-color: #999;--el-tree-node-hover-bg-color: $active-bg;background:rgb(34,37,44)}.c-tree .c-tree-container[data-v-e581fe26] .el-tree .is-current>.el-tree-node__content{background:rgb(34,37,44)}.c-tree .c-tree-container[data-v-e581fe26] .el-tree .el-tree-node.is-selected>.el-tree-node__content{background-color:#2f323a}.c-tree .c-tree-container[data-v-e581fe26] .el-tree .el-tree-node.is-selected>.el-tree-node__content .c-tree-node--label{color:#fff}.c-tree .c-tree-container[data-v-e581fe26] .el-tree .el-tree-node__content{position:relative}.c-tree .c-tree-container[data-v-e581fe26] .el-tree .el-tree-node__content .el-tree-node__expand-icon{margin-left:.052083rem}\n")();

const _hoisted_1$5 = { class: "c-tree" };
const _hoisted_2$4 = { class: "c-tree-container" };


const _sfc_main$5 = {
  __name: 'Tree',
  props: {
  data: {
    type: Array,
  },
  delete: {
    type: Array,
  },
  select: {
    type: Array,
  },
  multiple: {
    type: Boolean,
  },
},
  emits: ['changed', 'selected'],
  setup(__props, { emit: $emit }) {

const props = __props;



// ????????????
const allowDrag = node => {
  // ?????????????????????
  return node.data.indexCode !== 0
};
const allowDrop = (draggingNode, dropNode, type) => {
  // ????????????????????????
  if (!dropNode.data.isNode) return type !== 'inner'
  // ???????????????????????????
  if (dropNode.data.indexCode === 0) return type === 'inner'
  return true
};

// ??????
const filterText = ref('');
const treeRef = ref();
watch(filterText, val => {
  treeRef.value.filter(val);
});
const filterNode = (value, data) => {
  if (!value) return true
  return data.viewName.includes(value)
};



const dataSource = ref(props.data);
watch(
  () => props.data,
  val => {
    dataSource.value = val;
  },
  { deep: true, immediate: true }
);

// ????????????
const nodeChanged = (type, { node, data }) => {
  // if (type === 'append') {
  //   treeRef.value.setCurrentKey(
  //     data.children[data.children.length - 1].indexCode
  //   )
  // }
  dataSource.value = [...dataSource.value];
  $emit('changed', {
    type,
    node,
    data,
    source: dataSource.value,
  });
};

// ????????????
// const checkedKeys = ref([])
// @node-click="nodeClick"
// const nodeClick = (data, node, _, event) => {
//   let { ctrlKey } = event
//   console.log(ctrlKey)
//   if (ctrlKey) {
//     data.$isSelected = true
//     checkedKeys.value.push(data.indexCode)
//     checkedKeys.value = [...new Set(checkedKeys.value)]
//   } else {
//     checkedKeys.value = [data.indexCode]
//   }
//   console.log(checkedKeys.value)
//   dataSource.value[0].children.forEach(item => {
//     if (checkedKeys.value.includes(item.indexCode)) item.$isSelected = true
//   })
// }
const selectedData = ref([]);
const nodeSelected = node => {
  let { data } = node;
  if (data.isNode) return
  // ??????control?????????, ???????????????????????????????????????????????????
  // ??????control?????????, ??????????????????
  if (props.multiple) {
    selectedData.value.push(data);
  } else {
    selectedData.value = [data];
  }
  dataSource.value.forEach(item => {
    selectItems(
      item,
      selectedData.value.map(v => v.indexCode)
    );
  });
  $emit('selected', selectedData.value);
};

// UE??????
function selectItems(node, ids) {
  if (!ids || !ids.length) return
  node.$isSelected = false;
  if (ids.includes(node.indexCode)) {
    node.$isSelected = true;
  }
  if (node.children && node.children.length) {
    node.children.forEach(v => {
      selectItems(v, ids);
    });
  }
}
watch(
  () => props.select,
  ids => {
    dataSource.value.forEach(item => {
      selectItems(item, ids);
    });
  },
  { deep: true, immediate: true }
);

// ??????
// function deleteItems(node, ids) {
//   if (!ids || !ids.length) return
//   if (node.children && node.children.length) {
//     node.children = node.children.filter(v => !ids.includes(v.indexCode))
//     if (node.children.length) {
//       node.children.forEach(v => deleteItems(v, ids))
//     }
//   }
// }
watch(
  () => props.delete,
  ids => {
    // dataSource.value.forEach(item => {
    //   deleteItems(item, ids)
    // })
    ids.forEach(code => {
      treeRef.value.remove({ indexCode: code });
    });
  },
  { deep: true, immediate: true }
);

let level = 0;
const containerWidth = ref('100%');
// ??????????????????
function recursion(node, n) {
  level = Math.max(level, n);
  if (node.children) {
    node.children.forEach(v => {
      recursion(v, n + 1);
    });
  }
}
watchEffect(() => {
  level = 0;
  dataSource.value.forEach(item => {
    recursion(item, 1);
  });
  // console.log('level', level)
  containerWidth.value = '100%';
  if (level > 5) {
    // containerWidth.value = 256 + (level - 5) * 34
    containerWidth.value = `calc(100% + ${(level - 5) * 34}px)`;
  }
  // console.log(containerWidth.value)
});

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_tree = resolveComponent("el-tree");

  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    createVNode(_component_el_input, {
      class: "c-tree-input",
      modelValue: filterText.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((filterText).value = $event)),
      placeholder: "??????",
      "suffix-icon": unref(search_default)
    }, null, 8, ["modelValue", "suffix-icon"]),
    createBaseVNode("div", _hoisted_2$4, [
      createVNode(_component_el_tree, {
        style: normalizeStyle({ width: containerWidth.value }),
        ref_key: "treeRef",
        ref: treeRef,
        "node-key": "indexCode",
        "highlight-current": "",
        "default-expand-all": "",
        "expand-on-click-node": false,
        draggable: "",
        "allow-drag": allowDrag,
        "allow-drop": allowDrop,
        data: dataSource.value,
        "filter-node-method": filterNode,
        props: {
          class: (data, node) => {
            return data.$isSelected ? 'is-selected' : ''
          },
        }
      }, {
        default: withCtx(({ node }) => [
          createVNode(TreeNode, {
            node: node,
            data: node.data,
            onNodeChanged: nodeChanged,
            onNodeSelected: nodeSelected,
            onToggles: _ctx.$attrs.onToggles
          }, null, 8, ["node", "data", "onToggles"])
        ]),
        _: 1
      }, 8, ["style", "data", "props"])
    ])
  ]))
}
}

};
var Tree = /*#__PURE__*/_export_sfc(_sfc_main$5, [['__scopeId',"data-v-e581fe26"]]);

var TreeView_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-1a3087be]{background:transparent;color:#fff;border:none}.box-card[data-v-1a3087be] .el-card__header{border:none}.box-card[data-v-1a3087be] .el-card__body{padding-bottom:0}.box-card[data-v-1a3087be] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-1a3087be] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-1a3087be] .el-input,.box-card[data-v-1a3087be] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-1a3087be] .el-input__inner,.box-card[data-v-1a3087be] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.card-header[data-v-1a3087be]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}\n")();

const _withScopeId$4 = n => (pushScopeId("data-v-1a3087be"),n=n(),popScopeId(),n);
const _hoisted_1$4 = /*#__PURE__*/ _withScopeId$4(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "????????????")
], -1));


const _sfc_main$4 = {
  __name: 'TreeView',
  emits: ['delete', 'toggles', 'select'],
  setup(__props, { expose, emit: $emit }) {

/**
 * ??????
 * 1.UE???????????????????????????????????? append
 * 2.UE???????????????????????????????????? remove
 * 3.UE??????/??????????????????????????????/???????????? toggles
 * 4.UE??????/??????????????????????????????/???????????? toggles
 * 5.UE???????????????????????????????????? select
 */

/**
 * ??????
 * 1.????????????????????????UE???????????? delete
 * 2.????????????/??????????????????UE??????/???????????? toggles
 * 3.????????????/??????????????????UE??????/???????????? toggles
 * 4.????????????????????????UE???????????? select
 */

const store = useStore();

const outlineViews = computed(() => store.state.drafts.outlineViews);
// const addNode = () => {
//   let newChild = {
//     indexCode: nanoid(),
//     isNode: true,
//     viewName: '???????????????',
//     entityHide: false,
//     entityLock: false,
//     children: [],
//   }
//   append([newChild])
// }

const data = ref([]);
const deleteRef = ref([]);
const selectRef = ref([]);
const multiple = ref(false);
// ??????1 ??????
const append = childs => {
  // data.value = [...data.value, ...childs]
  data.value[0].children = [...data.value[0].children, ...childs];
};
// ??????2 ??????
const remove = items => {
  deleteRef.value = [...items];
};
// ??????3???4 ??????
const toggles = (type, items) => {
  const digui = list => {
    list.forEach(item => {
      if (items.includes(item.indexCode)) {
        item[type] = !item[type];
      } else if (item.children && item.children.length) {
        digui(item.children);
      }
    });
  };
  digui(data.value);
};
// ??????5 ??????
const select = items => {
  selectRef.value = [...items];
};
// ??????6 ??????
const toggleMultiple = bol => {
  multiple.value = bol;
};
expose({
  append,
  remove,
  toggles,
  select,
  toggleMultiple,
});


// ??????1 ????????????
const onChange = ({ type, node, data }) => {
  if (type === 'remove' && !data.isNode) {
    $emit('delete', [data]);
  }
};
// ??????2???3 ????????????
const onToggles = (type, nodes) => {
  $emit('toggles', type, nodes);
};
// ??????4 ????????????
const onSelect = nodes => {
  $emit('select', nodes);
};

watch(
  data,
  outlineViews => {
    // console.log(outlineViews[0].children)
    store.commit('drafts/setOutline', outlineViews[0].children);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  data.value = [
    {
      indexCode: 0,
      viewName: '????????????',
      isNode: true,
      entityHide: false,
      entityLock: false,
      children: outlineViews.value,
    },
  ];
  // data.value = initData
  // setTimeout(() => {
  // ??????
  // append([
  //   {
  //     indexCode: Date.now(),
  //     viewName: 'xxx',
  //     isNode: false,
  //     entityHide: false,
  //     entityLock: false,
  //   },
  // ])
  // ??????
  // remove([2, 3, 4, 5, 8])
  // ????????????
  // toggles('entityHide', [14, 18])
  // ????????????
  // toggles('entityLock', [5, 8, 14])
  // ??????
  // select([13, 8])
  // setTimeout(() => select([8]), 2000)
  // }, 2000)
});

return (_ctx, _cache) => {
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      _hoisted_1$4
    ]),
    default: withCtx(() => [
      createVNode(Tree, {
        multiple: multiple.value,
        data: data.value,
        select: selectRef.value,
        delete: deleteRef.value,
        onSelected: onSelect,
        onChanged: onChange,
        onToggles: onToggles
      }, null, 8, ["multiple", "data", "select", "delete"])
    ]),
    _: 1
  }))
}
}

};
var TreeView = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-1a3087be"]]);

var PathSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-7b5d6eb2]{background:transparent;color:#fff;border:none}.box-card[data-v-7b5d6eb2] .el-card__header{border:none}.box-card[data-v-7b5d6eb2] .el-card__body{padding-bottom:0}.box-card[data-v-7b5d6eb2] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-7b5d6eb2] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-7b5d6eb2] .el-input,.box-card[data-v-7b5d6eb2] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-7b5d6eb2] .el-input__inner,.box-card[data-v-7b5d6eb2] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.card-header[data-v-7b5d6eb2]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.el-button[data-v-7b5d6eb2]{width:100%;border-color:#428fff;background-color:#2a2e39}[data-v-7b5d6eb2] .el-input-group__append{background-color:transparent;border:none;-webkit-box-shadow:none;box-shadow:none}.el-radio[data-v-7b5d6eb2]{margin-right:.09375rem}\n")();

const _withScopeId$3 = n => (pushScopeId("data-v-7b5d6eb2"),n=n(),popScopeId(),n);
const _hoisted_1$3 = { class: "card-header" };
const _hoisted_2$3 = /*#__PURE__*/ _withScopeId$3(() => /*#__PURE__*/createBaseVNode("span", null, "????????????", -1));
const _hoisted_3$3 = /*#__PURE__*/createTextVNode("cm");
const _hoisted_4$2 = /*#__PURE__*/createTextVNode("??????");


const _sfc_main$3 = {
  __name: 'PathSetting',
  setup(__props) {

const store = useStore();

const form = computed(() => store.state.drafts.pathObj);

const list = ref([
  {
    label: true,
    value: '??????',
  },
  {
    label: false,
    value: '??????',
  },
]);
// const onChange = e => {
//   console.log(e)
//   console.log(123)
// }
const submit = () => {
  console.log('submit', form.value);
  UE.publish('CGX_PathChange', form.value);
  UE.publish('CGX_SavePath', {});
  store.commit('drafts/toggleEditType', []);
};
const deletePath = () => {
  UE.publish('CGX_CancelEditor', {});
  store.commit('drafts/deletePath', form.value);
  store.commit('drafts/toggleEditType', []);
};
watch(
  () => store.state.drafts.pathObj,
  form => {
    console.log(form);
    UE.publish('CGX_PathChange', form);
  },
  {
    deep: true,
    // immediate: true,
  }
);
onMounted(() => {
  UE.subscribe('UE2JS_SavePath', data => {
    if (!data) {
      store.commit('drafts/toggleEditType', ['path']);
      return ElMessage.error('???????????????????????????')
    }
    let { pathEntities } = data;
    let obj = {
      ...form.value,
      pathEntities,
    };
    store.commit('drafts/updatePath', { ...obj });
    UE.publish('CGX_PlayPath', obj);
  });
});

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      createBaseVNode("div", _hoisted_1$3, [
        _hoisted_2$3,
        createVNode(_component_el_icon, {
          size: 14,
          onClick: deletePath
        }, {
          default: withCtx(() => [
            createVNode(unref(delete_default))
          ]),
          _: 1
        })
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(form),
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(form).pathName,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(form).pathName) = $event)),
                maxlength: "15"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(form).pathHeight,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(form).pathHeight) = $event))
              }, {
                append: withCtx(() => [
                  _hoisted_3$3
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(form).pathTime,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(form).pathTime) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_radio_group, {
                modelValue: unref(form).pathDirection,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(form).pathDirection) = $event))
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (item, index) => {
                    return (openBlock(), createBlock(_component_el_radio, {
                      key: index,
                      label: item.label
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.value), 1)
                      ]),
                      _: 2
                    }, 1032, ["label"]))
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(Progress, {
                modelValue: unref(form).pathAngle,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(form).pathAngle) = $event)),
                range: [-360, 360]
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_checkbox, {
                modelValue: unref(form).pathLoop,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(form).pathLoop) = $event))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                plain: "",
                onClick: submit
              }, {
                default: withCtx(() => [
                  _hoisted_4$2
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var PathSetting = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-7b5d6eb2"]]);

var ScreenShot_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-a352f7c8]{background:transparent;color:#fff;border:none}.box-card[data-v-a352f7c8] .el-card__header{border:none}.box-card[data-v-a352f7c8] .el-card__body{padding-bottom:0}.box-card[data-v-a352f7c8] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-a352f7c8] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-a352f7c8] .el-input,.box-card[data-v-a352f7c8] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-a352f7c8] .el-input__inner,.box-card[data-v-a352f7c8] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.card-header[data-v-a352f7c8]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.el-image[data-v-a352f7c8]{width:.958333rem;height:.958333rem}.el-button[data-v-a352f7c8]{width:100%;border-color:#428fff;background-color:#2a2e39}\n")();

const _withScopeId$2 = n => (pushScopeId("data-v-a352f7c8"),n=n(),popScopeId(),n);
const _hoisted_1$2 = { class: "card-header" };
const _hoisted_2$2 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("span", null, "????????????", -1));
const _hoisted_3$2 = /*#__PURE__*/createTextVNode("??????");


const _sfc_main$2 = {
  __name: 'ScreenShot',
  setup(__props) {

const store = useStore();

const snapshots = computed(() => store.state.drafts.snapshots);
const form = computed(() => store.state.drafts.snapshotObj);

const submit = () => {
  let { _id, snapshotName } = form.value;
  if (!snapshotName) {
    return ElMessage.error('?????????????????????')
  }
  if (
    snapshots.value.some(
      item => item._id !== _id && item.snapshotName === snapshotName
    )
  ) {
    return ElMessage.error('????????????????????????????????????')
  }
  store.commit('drafts/setSnapshootList', form.value);
  store.commit('drafts/toggleEditType', []);
};
const deleteShot = () => {
  store.commit('drafts/delSnapshot', form.value);
  store.commit('drafts/toggleEditType', []);
};

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_image = resolveComponent("el-image");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      createBaseVNode("div", _hoisted_1$2, [
        _hoisted_2$2,
        createVNode(_component_el_icon, {
          size: 14,
          onClick: deleteShot
        }, {
          default: withCtx(() => [
            createVNode(unref(delete_default))
          ]),
          _: 1
        })
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(form),
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(form).snapshotName,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(form).snapshotName) = $event)),
                maxlength: "15",
                placeholder: "????????????"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "?????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_image, {
                src: unref(form).snapshotUrl,
                fit: "fit"
              }, null, 8, ["src"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                plain: "",
                onClick: submit
              }, {
                default: withCtx(() => [
                  _hoisted_3$2
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var ScreenShot = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-a352f7c8"]]);

var NavSetting_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-4202298e]{background:transparent;color:#fff;border:none}.box-card[data-v-4202298e] .el-card__header{border:none}.box-card[data-v-4202298e] .el-card__body{padding-bottom:0}.box-card[data-v-4202298e] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-4202298e] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-4202298e] .el-input,.box-card[data-v-4202298e] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-4202298e] .el-input__inner,.box-card[data-v-4202298e] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.card-header[data-v-4202298e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.el-button[data-v-4202298e]{width:100%;border-color:#428fff;background-color:#2a2e39}[data-v-4202298e] .el-input-group__append{background-color:transparent;border:none}.el-radio[data-v-4202298e]{margin-right:.09375rem}.uploader[data-v-4202298e] .el-upload{border-radius:.03125rem;border:1px dashed rgba(255,255,255,.14)}.uploader img[data-v-4202298e]{display:block;width:.947917rem;height:.947917rem}.uploader__icon[data-v-4202298e]{width:.947917rem;height:.947917rem;font-size:.166667rem;color:#8c939d;text-align:center}\n")();

const _withScopeId$1 = n => (pushScopeId("data-v-4202298e"),n=n(),popScopeId(),n);
const _hoisted_1$1 = { class: "card-header" };
const _hoisted_2$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("span", null, "????????????", -1));
const _hoisted_3$1 = ["src"];
const _hoisted_4$1 = /*#__PURE__*/createTextVNode("??????");


const _sfc_main$1 = {
  __name: 'NavSetting',
  setup(__props) {

const store = useStore();

const form = computed(() => store.state.drafts.navigationObj);

const options = [
  {
    value: 6,
    label: 6,
  },
  {
    value: 7,
    label: 7,
  },
  {
    value: 8,
    label: 8,
  },
  {
    value: 9,
    label: 9,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 11,
    label: 11,
  },
  {
    value: 12,
    label: 12,
  },
  {
    value: 13,
    label: 13,
  },
  {
    value: 14,
    label: 14,
  },
  {
    value: 16,
    label: 16,
  },
  {
    value: 18,
    label: 18,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 28,
    label: 28,
  },
  {
    value: 36,
    label: 36,
  },
  {
    value: 48,
    label: 48,
  },
  {
    value: 72,
    label: 72,
  },
];

// ??????????????????
const casesList = ref([]);
const getCasesList = async () => {
  let { data } = await queryCasesList({ publishState: 1 });
  casesList.value = data;
};

const change = async uploadFile => {
  let { raw } = uploadFile;
  let { data } = await uploadCommonFile$1(raw);
  form.value.pictureUrl = data.downloadUrl;
};

const submit = () => {
  store.commit('drafts/toggleEditType', []);
};
const deleteNav = () => {
  store.commit('drafts/deleteNav', form.value);
  store.commit('drafts/toggleEditType', []);
};
onMounted(() => {
  getCasesList();
});

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_color_picker = resolveComponent("el-color-picker");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");

  return (openBlock(), createBlock(_component_el_card, { class: "box-card" }, {
    header: withCtx(() => [
      createBaseVNode("div", _hoisted_1$1, [
        _hoisted_2$1,
        createVNode(_component_el_icon, {
          size: 14,
          onClick: deleteNav
        }, {
          default: withCtx(() => [
            createVNode(unref(delete_default))
          ]),
          _: 1
        })
      ])
    ]),
    default: withCtx(() => [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: unref(form),
        "label-width": "76px",
        "label-position": "left"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(form).navigationCode,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(form).navigationCode) = $event)),
                maxlength: "15",
                disabled: ""
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: unref(form).navigationName,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(form).navigationName) = $event)),
                maxlength: "15"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_row, null, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 11 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: unref(form).fontSize,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(form).fontSize) = $event))
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createElementBlock(Fragment, null, renderList(options, (item) => {
                            return createVNode(_component_el_option, {
                              key: item.value,
                              label: item.label,
                              value: item.value
                            }, null, 8, ["label", "value"])
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, {
                    span: 11,
                    push: 2
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_color_picker, {
                        modelValue: unref(form).textColor,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(form).textColor) = $event)),
                        "show-alpha": ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_row, null, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 11 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(form).navigationWidth,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(form).navigationWidth) = $event)),
                        placeholder: "??????"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_col, {
                    span: 11,
                    push: 2
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(form).navigationHeight,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(form).navigationHeight) = $event)),
                        placeholder: "??????"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "??????" }, {
            default: withCtx(() => [
              createVNode(_component_el_upload, {
                class: "uploader",
                action: "",
                "show-file-list": false,
                "auto-upload": false,
                "on-change": change
              }, {
                default: withCtx(() => [
                  (unref(form).pictureUrl)
                    ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        src: unref(form).pictureUrl
                      }, null, 8, _hoisted_3$1))
                    : (openBlock(), createBlock(_component_el_icon, {
                        key: 1,
                        class: "uploader__icon"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(plus_default))
                        ]),
                        _: 1
                      }))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "????????????" }, {
            default: withCtx(() => [
              createVNode(_component_el_select, {
                modelValue: unref(form).relatedCaseId,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(form).relatedCaseId) = $event)),
                filterable: "",
                clearable: "",
                placeholder: "???"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(casesList.value, (item) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: item.id,
                      label: item.caseName,
                      value: item.id
                    }, null, 8, ["label", "value"]))
                  }), 128))
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
                onClick: submit
              }, {
                default: withCtx(() => [
                  _hoisted_4$1
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model"])
    ]),
    _: 1
  }))
}
}

};
var NavSetting = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-4202298e"]]);

var index_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".el-select-dropdown__item{padding-left:.052083rem}\n")();

var index_vue_vue_type_style_index_1_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-0ebb36d4]::-webkit-scrollbar{display:none}.draft-edit[data-v-0ebb36d4]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.draft-edit__left[data-v-0ebb36d4]{position:relative;z-index:100;display:-webkit-box;display:-ms-flexbox;display:flex}.draft-edit__left .component__wrap[data-v-0ebb36d4]{width:1.875rem;height:100%;background:#2a2e39;-webkit-transition:all .2s;transition:all .2s}.draft-edit__left .component__wrap.hide[data-v-0ebb36d4]{width:0;overflow:hidden}.draft-edit__left .component__toggle[data-v-0ebb36d4]{position:absolute;right:-.166667rem;top:50%;z-index:101;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:.1875rem;border-left:.083333rem solid #373b48;border-top:.010417rem solid transparent;border-right:.083333rem solid transparent;border-bottom:.010417rem solid transparent}.draft-edit__left .component__toggle .svg-img[data-v-0ebb36d4]{position:absolute;left:-.083333rem;top:calc(50% - .036458rem)}.draft-edit__content[data-v-0ebb36d4]{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;z-index:1}.draft-edit__content iframe[data-v-0ebb36d4],.draft-edit__content .mask[data-v-0ebb36d4]{position:absolute;left:0;top:0;width:100%;height:100%}.draft-edit__content .mask[data-v-0ebb36d4]{z-index:3}.draft-edit__content .handles[data-v-0ebb36d4]{position:absolute;top:.104167rem;left:.104167rem;z-index:10;display:-webkit-box;display:-ms-flexbox;display:flex}.draft-edit__content .handles .el-select[data-v-0ebb36d4]{width:.572917rem;height:.166667rem}.draft-edit__content .handles .el-select[data-v-0ebb36d4] .el-input__wrapper{border-radius:.072917rem;background:#373b48}.draft-edit__content .handles .el-button[data-v-0ebb36d4]{margin-left:.041667rem;border:none;background-color:#373b48}.draft-edit__content .handles .button-select[data-v-0ebb36d4]{margin-left:.041667rem}.draft-edit__content .handles .snapshot .item .svg-img[data-v-0ebb36d4]{width:.072917rem;height:.072917rem}.draft-edit__content .handles .snapshot .item span[data-v-0ebb36d4]{margin-left:.041667rem;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#fff9;text-align:left;text-overflow:ellipsis;overflow:hidden}.draft-edit__content .handles .snapshot .item[data-v-0ebb36d4]:hover,.draft-edit__content .handles .snapshot .item.active[data-v-0ebb36d4]{background:rgba(66,143,255,.3)}.draft-edit__content .handles .snapshot .item:hover span[data-v-0ebb36d4],.draft-edit__content .handles .snapshot .item.active span[data-v-0ebb36d4]{color:#428fff}.draft-edit__content .buttons[data-v-0ebb36d4]{position:absolute;top:.104167rem;right:.104167rem;z-index:10;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-edit__content .buttons .el-button[data-v-0ebb36d4]{position:relative;font-size:.0625rem;color:#fff9;border:none;background-color:#373b48;border-radius:.083333rem}.draft-edit__content .buttons .el-button .icon[data-v-0ebb36d4]{margin-right:.020833rem}.draft-edit__content .tools[data-v-0ebb36d4]{position:fixed;z-index:10;background:rgba(42,46,57,.6);border-radius:.03125rem;display:-webkit-box;display:-ms-flexbox;display:flex}.draft-edit__content .tools .tool[data-v-0ebb36d4]{position:relative;width:.25rem;height:.25rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-edit__content .tools .tool .triangle[data-v-0ebb36d4]{position:absolute;right:0;bottom:0;width:.104167rem;height:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-edit__content .tools .tool .triangle__content[data-v-0ebb36d4]{width:0;height:0;border:2px solid rgb(255,255,255);border-top-color:transparent;border-left-color:transparent}.draft-edit__content .tools .tool.active .triangle__content[data-v-0ebb36d4]{border:2px solid rgb(66,143,255);border-top-color:transparent;border-left-color:transparent}.draft-edit__content .tools .tool__dropdown[data-v-0ebb36d4]{position:absolute;top:calc(100% + .020833rem);padding:.0625rem 0;background:#373b48}.draft-edit__content .tools .tool__dropdown__item[data-v-0ebb36d4]{padding-left:.041667rem;width:.645833rem;height:.145833rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box}.draft-edit__content .tools .tool__dropdown__item span[data-v-0ebb36d4]{margin-left:.041667rem;font-size:.0625rem;color:#fff9}.draft-edit__content .tools .tool[data-v-0ebb36d4]:last-child{border-left:.005208rem solid rgba(255,255,255,.14)}.draft-edit__content .tools .tool .svg-img[data-v-0ebb36d4]{width:.104167rem;height:.104167rem}.draft-edit__content .navigations[data-v-0ebb36d4]{position:absolute;left:0;top:0;z-index:3;width:100%;height:100%}.draft-edit__content .navigations .nav[data-v-0ebb36d4]{position:fixed;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-edit__content .navigations .nav .img-wrap[data-v-0ebb36d4]{position:relative}.draft-edit__content .navigations .nav .img-wrap img[data-v-0ebb36d4]{position:absolute;left:0;top:0;width:100%;height:100%}.draft-edit__content .navigations .nav span[data-v-0ebb36d4]{margin-top:.052083rem;white-space:nowrap}.draft-edit__right[data-v-0ebb36d4]{position:relative;z-index:100}.draft-edit__right .component__wrap[data-v-0ebb36d4]{width:1.5625rem;height:100%;background:#2a2e39;overflow-y:auto;-webkit-transition:all .2s;transition:all .2s}.draft-edit__right .component__wrap.hide[data-v-0ebb36d4]{width:0;overflow:hidden}.draft-edit__right .component__toggle[data-v-0ebb36d4]{position:absolute;left:-.166667rem;top:50%;z-index:101;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:.1875rem;border-right:.083333rem solid #373b48;border-top:.010417rem solid transparent;border-left:.083333rem solid transparent;border-bottom:.010417rem solid transparent}.draft-edit__right .component__toggle .svg-img[data-v-0ebb36d4]{position:absolute;right:-.083333rem;top:calc(50% - .036458rem)}\n")();

var index_vue_vue_type_style_index_2_lang = /* #__PURE__ */ (() => ".el-select-dropdown{background:#373b48}.el-select-dropdown__item{color:#fff9}.el-select-dropdown__item.selected,.el-select-dropdown__item.hover{color:#428fff;background:rgba(66,143,255,.3)}\n")();

const _withScopeId = n => (pushScopeId("data-v-0ebb36d4"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "draft-edit" };
const _hoisted_2 = { class: "draft-edit__content" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "handles" };
const _hoisted_5 = { style: {"margin-left":"8px"} };
const _hoisted_6 = { class: "buttons" };
const _hoisted_7 = /*#__PURE__*/createTextVNode(" ?????? ");
const _hoisted_8 = /*#__PURE__*/createTextVNode("??????");
const _hoisted_9 = ["onClick"];
const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "triangle__content" }, null, -1));
const _hoisted_11 = [
  _hoisted_10
];
const _hoisted_12 = {
  key: 1,
  class: "tool__dropdown"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["src"];

// import useListenMessage from '@/hooks/useListenMessage'
// let { handleUrl } = useListenMessage()
// console.log(
//   handleUrl('http://dataease-dev.hdt.cosmoplat.com/link/MBxdHN2A', {
//     pre: '?????????',
//   })
// )

// ????????????-->CGX_ModelButtonClick-->CreateModel-->?????????[DeleteModel]
// -- ???UE????????????-->CGX_ModelButtonUp[vaildArea:true]
// -- ???UE????????????-->CGX_ModelButtonUp[vaildArea:false]


const _sfc_main = {
  __name: 'index',
  emits: ['save', 'complete'],
  setup(__props, { emit: $emit }) {

const router = useRouter();
// eslint-disable-next-line no-unused-vars
useRoute();
const store = useStore();

const caseId = computed(() => store.state.drafts.caseId);
const editType = computed(() => store.state.drafts.editType);
const caseData = computed(() => store.state.drafts.caseData);
// const caseLabels = computed(() => store.state.drafts.caseLabels)
// const entities = computed(() => store.state.drafts.entities)
const entity = computed(() => store.state.drafts.entity);
// const scene = computed(() => store.state.drafts.scene)
const panel = computed(() => store.state.drafts.panel);
// const caseLighting = computed(() => store.state.drafts.caseLighting)
computed(() => store.state.drafts.ent);
// const outlineViews = computed(() => store.state.drafts.outlineViews)
const pathList = computed(() => store.state.drafts.pathList);
const pathObj = computed(() => store.state.drafts.pathObj);
const snapshots = computed(() => store.state.drafts.snapshots);
const snapshotObj = computed(() => store.state.drafts.snapshotObj);
// const datasource = computed(() => store.state.drafts.datasource)
const navigations = computed(() => store.state.drafts.navigations);

// ??????
const dynamicCom = ref();
const navDragover = e => {
  e.preventDefault();
};
const navDrop = e => {
  console.log('navDrop', e);
  let isNavDrag = e.dataTransfer.getData('nav');
  let { clientX, clientY } = e;
  let { addNav } = dynamicCom.value;
  !!isNavDrag &&
    addNav &&
    addNav({ navigationToLeft: clientX - 24, navigationToTop: clientY - 24 });
};

// watch(
//   () => editType.value,
//   (t1, t2) => {
//     console.log(t1, t2)
//     if (
//       (t2.includes('path') && !t1.includes('path')) ||
//       (t2.includes('path') && !t1.length)
//     ) {
//       store.commit('drafts/setPathObj', {})
//     }
//   }
// )

const treeView = ref();
// onMounted(() => {
//   let { append, remove } = treeView.value
//   setTimeout(() => {
//     append([
//       {
//         indexCode: 1,
//         viewName: '????????????',
//         entityHide: false,
//         entityLock: false,
//       },
//     ])
//   }, 2000)
//   setTimeout(() => {
//     append([
//       {
//         indexCode: 2,
//         viewName: '?????????',
//         entityHide: false,
//         entityLock: false,
//       },
//     ])
//   }, 4000)
//   setTimeout(() => {
//     remove([1])
//   }, 6000)
// })

// ????????????
const viewType = ref({
  type: 'Perspective',
  label: '?????????',
  icon: 'drafts-select-tou-0',
  active: 'drafts-select-tou-1',
});
const viewTypes = ref([
  {
    type: 'TopView',
    label: '?????????',
    icon: 'drafts-select-top-0',
    active: 'drafts-select-top-1',
  },
  // {
  //   type: 'BottomView',
  //   label: '?????????',
  //   icon: 'drafts-select-bottom-0',
  //   active: 'drafts-select-bottom-1',
  // },
  {
    type: 'LeftView',
    label: '?????????',
    icon: 'drafts-select-left-0',
    active: 'drafts-select-left-1',
  },
  {
    type: 'RightView',
    label: '?????????',
    icon: 'drafts-select-right-0',
    active: 'drafts-select-right-1',
  },
  {
    type: 'Perspective',
    label: '?????????',
    icon: 'drafts-select-tou-0',
    active: 'drafts-select-tou-1',
  },
  {
    type: 'FrontView',
    label: '?????????',
    icon: 'drafts-select-front-0',
    active: 'drafts-select-front-1',
  },
]);
const changeViewType = view => {
  let { type } = view;
  UE.publish('CGX_SwitchView', { viewType: type });
};

// ?????????
const gridLineShow = ref(true);
const toggleGridLine = () => {
  gridLineShow.value = !gridLineShow.value;
  UE.publish('CGX_ShowGird', {
    isShow: gridLineShow.value,
  });
};

// ??????VR
const openVR = () => {
  sideHide.value = true;
  UE.publish('CGX_VRButtonClick', {});

  // ???????????????
  UE.publish('CGX_SetAxisPosition', {
    isShow: false,
    axisPostion: '500,1000',
    axisSize: '100,100',
  });
};

// ????????????
const openLamplight = () => {
  let isLight = true;
  caseData.value.isLight = isLight;
  UE.publish('JS2UE_SwitchLightAndWeather', {
    isLight,
  });
  store.commit('drafts/toggleEditType', ['light']);
};

// ????????????
const openWeather = () => {
  let isLight = false;
  caseData.value.isLight = isLight;
  UE.publish('JS2UE_SwitchLightAndWeather', {
    isLight,
  });
  store.commit('drafts/toggleEditType', ['weather']);
};

// ????????????
const snapshootClick = () => {
  UE.publish('CGX_ScreenShot', {});
};
const snapshoot = async sourceData => {
  let { pngData } = sourceData;
  let file = dataURLtoFile(
    `data:image/png;base64,${pngData}`,
    `${Date.now()}.png`
  );
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  let { data } = await uploadCommonFile$1(file);
  // ElMessage.success('????????????')
  loading.close();
  let initData = {
    _id: nanoid(),
    snapshotName: '',
    snapshotUrl: data.downloadUrl,
  };
  store.commit('drafts/setSnapshootObj', initData);
  store.commit('drafts/toggleEditType', ['shot']);
};
const snapshootItemClick = data => {
  store.commit('drafts/setSnapshootObj', data);
  store.commit('drafts/toggleEditType', ['shot']);
};
const deleteShot = data => {
  store.commit('drafts/delSnapshot', data);
  store.commit('drafts/toggleEditType', []);
};

// ??????
const roam = () => {
  console.log('roam');
  // ????????????????????????????????????????????????
  if (Object.keys(pathObj.value).length) return
  toolShow.value = false;

  let initData = {
    _id: nanoid(),
    pathName: parseTime(Date.now(), '{y}{m}{d}{h}{i}{s}'),
    pathHeight: 200,
    pathTime: 10,
    pathDirection: true,
    pathAngle: -20,
    pathLoop: false,
  };
  store.commit('drafts/pathAdd', initData);
  UE.publish('CGX_PathEditor', {});
  UE.publish('CGX_PathChange', initData);
};
const pathPlay = data => {
  console.log('pathPlay');
  // ??????????????????
  // UE.publish('CGX_CancelEditor', {})
  store.commit('drafts/setPathObj', data);
  UE.publish('CGX_PlayPath', data);
};

// ?????????????????????
const sideHide = ref(false);
const toggleSide = () => {
  sideHide.value = !sideHide.value;

  // ???????????????
  UE.publish('CGX_SetAxisPosition', {
    isShow: true,
    axisPostion: sideHide.value ? '140,1000' : '500,1000',
    axisSize: '100,100',
  });
};
onMounted(() => {
  // document.addEventListener('mouseup', mouseup)

  window.addEventListener(
    'message',
    e => {
      if (e.data.type === 'metabase-iframe-event-mouseup') {
        console.log('????????????????????????', e);
      }

      if (e.data.type === 'CGX_ViewSelect') {
        UE.publish('CGX_ViewSelect', {
          editorType: 'sceneEditor',
          entities: [
            {
              indexCode: e.data.params.fieldValue.toUpperCase(),
            },
          ],
        });
      }
    },
    false
  );
});
onUnmounted(() => {
  // document.removeEventListener('mouseup', mouseup)
});

// ??????
const tools = ref([
  {
    type: 'Scale',
    title: '??????',
    icon: 'drafts-tools-tool1-0',
    active: 'drafts-tools-tool1-1',
  },
  {
    type: 'Move',
    title: '??????',
    icon: 'drafts-tools-tool2-0',
    active: 'drafts-tools-tool2-1',
  },
  {
    type: 'Rotate',
    title: '??????',
    icon: 'drafts-tools-tool3-0',
    active: 'drafts-tools-tool3-1',
  },
  {
    type: 'Align',
    title: '??????',
    icon: 'drafts-tools-tool4-0',
    active: 'drafts-tools-tool4-1',
  },
  {
    type: 'Group1',
    title: '??????',
    icon: 'drafts-tools-tool5-0',
    active: 'drafts-tools-tool5-1',
  },
  {
    type: 'Group2',
    title: '??????',
    icon: 'drafts-tools-tool5-00',
    active: 'drafts-tools-tool5-11',
  },
  {
    type: 'Copy',
    title: '??????',
    icon: 'drafts-tools-tool6-0',
    active: 'drafts-tools-tool6-1',
    childrenShow: false,
    children: [
      {
        type: 'Copy',
        text: '??????',
        icon: 'drafts-tools-tool6-0',
      },
      {
        type: 'ArrayCopy',
        text: '????????????',
        icon: 'drafts-tools-tool7-0',
      },
    ],
  },
  {
    type: 'Hide',
    title: '??????',
    icon: 'drafts-tools-tool8-0',
    active: 'drafts-tools-tool8-1',
  },
  {
    type: 'Lock',
    title: '??????',
    icon: 'drafts-tools-tool9-0',
    active: 'drafts-tools-tool9-11',
  },
  {
    type: 'Delete',
    title: '??????',
    icon: 'drafts-tools-tool10-0',
    active: 'drafts-tools-tool10-1',
  },
]);
const toolIcon = t => {
  let { type, icon, active } = t;
  if (type === 'Hide') {
    if (entity.value.length) {
      let { entityHide } = entity.value[0];
      return entityHide ? active : icon
    }
    return icon
  }
  if (type === 'Lock') {
    if (entity.value.length) {
      let { entityLock } = entity.value[0];
      return entityLock ? active : icon
    }
    return icon
  }
  return type === tool.value ? active : icon
};
const tool = ref('Move');
const toolShow = ref(false);
const toolPos = ref({
  left: '1100px',
  top: '910px',
});
// eslint-disable-next-line no-unused-vars
ref(false);
const changeTool = type => {
  tool.value = type;

  tools.value.forEach(item => {
    item.childrenShow = false;
  });

  if (type === 'Align') {
    return store.commit('drafts/toggleEditType', ['align'])
  }

  if (type === 'Group1') {
    UE.publish('CGX_Group', {
      isGroup: true,
    });
    return
  }

  if (type === 'Group2') {
    UE.publish('CGX_Group', {
      isGroup: false,
    });
    return
  }

  if (type === 'Hide') {
    // UE.publish('CGX_HideButtonClick', {})
    entity.value.forEach(item => {
      item.entityHide = !item.entityHide;
    });
    UE.publish('CGX_ViewHide', { entities: entity.value });
    // ????????????
    let indexCodes = entity.value.map(item => item.indexCode);
    let { toggles } = treeView.value;
    toggles('entityHide', indexCodes);
    return
  }

  if (type === 'Lock') {
    // UE.publish('CGX_LockButtonClick', {})
    entity.value.forEach(item => {
      item.entityLock = !item.entityLock;
    });
    UE.publish('CGX_ViewLock', { entities: entity.value });
    // ????????????
    let indexCodes = entity.value.map(item => item.indexCode);
    let { toggles } = treeView.value;
    toggles('entityLock', indexCodes);
    return
  }

  if (type === 'Delete') {
    toolShow.value = false;
    UE.publish('CGX_EditorChange', { EditorType: type });
    resetTool();
    return
  }

  UE.publish('CGX_EditorChange', { EditorType: type });
};
const copy = (type, t) => {
  store.commit('drafts/toggleEditType', []);

  if (type === 'Copy') {
    UE.publish('CGX_EditorChange', { EditorType: type });
  }
  if (type === 'ArrayCopy') {
    store.commit('drafts/toggleEditType', ['copy']);
  }

  t.childrenShow = false;
};
const resetTool = () => {
  tool.value = 'Move';
  UE.publish('CGX_EditorChange', { EditorType: tool.value });
};

// ????????????
const menu = ref('yycj');
const changeMenu = value => {
  menu.value = value;
};
const Component = computed(() => {
  switch (menu.value) {
    case 'yycj':
      return SceneCom
    case 'mxk':
      return ModelCom
    case 'sjmb':
      return DashboardCom
    default:
      return SceneCom
  }
});

// ?????????
let loading;
const percentage = ref(0);
// const caseId = ref()
// caseId.value = route.query.id
const caseDetails = ref({});
const getDetail = async () => {
  let { data } = await queryCaseDetails({ caseId: caseId.value });
  caseDetails.value = data;
  store.commit('drafts/init', data);
};
const loadModel = data => {
  if (!Object.keys(data).length) return
  let {
    caseScene,
    entities,
    isLight,
    caseLighting,
    caseDynamicWeather,
    casePanel,
  } = data;
  UE.publish('CGX_Editor', {
    entities: [caseScene, ...entities],
  });

  // ????????????????????????
  UE.publish('JS2UE_SwitchLightAndWeather', {
    isLight,
  });
  if (isLight || !caseDynamicWeather) {
    let {
      lightColor,
      globalSaturationIntensity,
      globalContrastIntensity,
      globalGammaValue,
    } = caseLighting;
    let obj = {
      ...caseLighting,
      lightColor: rgba2Str(lightColor),
      globalSaturationIntensity: rgba2Str(globalSaturationIntensity),
      globalContrastIntensity: rgba2Str(globalContrastIntensity),
      globalGammaValue: rgba2Str(globalGammaValue),
    };
    UE.publish('CGX_LightParameterChange', obj);
  } else {
    UE.publish('JS2UE_WeatherControl', caseDynamicWeather);
  }

  // ????????????
  if (!casePanel) return
  let { modelId } = casePanel;
  if (!modelId) return
  getDashBoard(modelId);
};
const getDashBoard = async modelId => {
  let { data } = await getDashBoardList({ id: modelId });
  if (!data.length) return
  let [dashBoard] = data;
  let { id, ...panelData } = dashBoard;
  dashBoard = {
    ...panelData,
    modelId: id,
    modelType: 2,
  };
  store.commit('drafts/setPanel', dashBoard);
};
// ?????????????????????????????????????????????????????????????????????CreateModel?????????????????????????????????
// ?????????????????????????????????false???????????????????????????true???????????????????????????
const createFlag = ref(true);
useHotFix(
  () => {
    loadModel(caseDetails.value);
    loading && loading.close();
  },
  num => {
    percentage.value = num;
    loading = ElLoading.service({
      lock: true,
      text: `??????????????? ${num}%`,
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }
);
onMounted(() => {
  if (caseId.value) {
    console.log('??????');
    createFlag.value = false;
    getDetail();
    loading = ElLoading.service({
      lock: true,
      text: '???????????????',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  } else {
    console.log('??????');
    UE.publish('CGX_Create', {});
    UE.publish('CGX_LightButtonClick', {});
  }
});

// ???????????????

// const publishState = ref(0)
const save = () => {
  // publishState.value = 0
  // UE.publish('CGX_SaveOrPulish', {})
  $emit('save');
};
// const pub = () => {
//   publishState.value = 1
//   UE.publish('CGX_SaveOrPulish', {})
// }
const cancel = () => {
  router.replace('/drafts');
};
// const submit = async sourceData => {
//   let { caseName, caseDesc } = caseData.value
//   if (!Object.keys(scene.value).length) {
//     return ElMessage.error('???????????????')
//   }
//   if (!caseName) {
//     return ElMessage.error('?????????????????????')
//   }
//   if (!caseDesc) {
//     return ElMessage.error('?????????????????????')
//   }
//   // ??????????????????????????????
//   if (Object.keys(pathObj.value).length && !pathObj.value.pathEntities) {
//     return ElMessage.error('??????????????????????????????')
//   }

//   let { pngData, entities: ents } = sourceData

//   // ???UE?????????????????????????????????
//   const filterEntities = list => {
//     list.forEach(item => {
//       let model = entities.value.find(e => e.indexCode === item.indexCode)
//       if (model) {
//         let {
//           entityCode,
//           entityName,
//           deviceCode,
//           entityDashboardCode,
//           dashboardShowState,
//         } = model
//         // item = {
//         //   ...item,
//         //   entityCode,
//         //   entityName,
//         //   deviceCode,
//         //   entityDashboardCode,
//         //   dashboardShowState,
//         // }
//         item.entityCode = entityCode
//         item.entityName = entityName
//         item.deviceCode = deviceCode
//         item.entityDashboardCode = entityDashboardCode
//         item.dashboardShowState = dashboardShowState
//       } else if (item.children && item.children.length) {
//         filterEntities(item.children)
//       }
//     })
//   }
//   filterEntities(ents)

//   let sIndex = ents.findIndex(item => item.modelType == 1)
//   let [caseScene] = ents.splice(sIndex, 1)
//   let file = dataURLtoFile(
//     `data:image/png;base64,${pngData}`,
//     `${Date.now()}.png`
//   )
//   const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
//   let { data } = await uploadCommonFile(file)
//   loading.close()
//   let obj = {
//     ...caseData.value,
//     caseLighting: caseLighting.value,
//     caseLabels: caseLabels.value,
//     caseScene,
//     casePanel:
//       Object.keys(panel.value).length && panel.value.publicUrl
//         ? panel.value
//         : null,
//     entities: ents,
//     outlineViews: outlineViews.value,
//     routes: pathList.value,
//     snapshots: snapshots.value,
//     publishState: publishState.value,
//     imageUrl: data.downloadUrl,
//     datasourceId: datasource.value.id,
//     navigations: navigations.value,
//   }
//   console.log('saveOrUpdate', obj)
//   await saveOrUpdate(obj)
//   cancel()
// }

// ??????????????????
const onSelect = nodes => {
  console.log('tSelect', nodes);
  UE.publish('CGX_ViewSelect', { editorType: 'sceneEditor', entities: nodes });
};
const onToggles = (type, nodes) => {
  console.log('tToggles', type, nodes);
  store.commit('drafts/changeEntityStatus', nodes);
  if (type === 'entityHide') {
    UE.publish('CGX_ViewHide', { entities: nodes });
  }
  if (type === 'entityLock') {
    UE.publish('CGX_ViewLock', { entities: nodes });
  }
};
const onDelete = nodes => {
  console.log('tDelete', nodes);
  UE.publish('CGX_ViewSelect', { editorType: 'sceneEditor', entities: nodes });
  UE.publish('CGX_EditorChange', { EditorType: 'Delete' });
  setTimeout(() => {
    toolShow.value = false;
  }, 100);
};

// tools????????????
const leftDomRef = ref();
const rightDomRef = ref();
const toolsDomRef = ref();
const getToolPos = pos => {
  let [left, top] = pos.split(',');
  // ?????????
  left = +left + 48;
  top = +top + 48;
  let {
    offsetTop: minTop,
    offsetWidth: minLeft,
    offsetHeight: height,
  } = leftDomRef.value;
  let maxTop = minTop + height;
  let { offsetLeft: maxLeft } = rightDomRef.value;
  // ??? v-show ??????????????????????????? visibility
  let { clientWidth: toolWidth, clientHeight: toolHeight } = toolsDomRef.value;

  if (left < minLeft || left > maxLeft || top < minTop || top > maxTop) {
    return {
      show: false,
    }
  }
  if (left > maxLeft - toolWidth) {
    left = maxLeft - toolWidth;
  }
  if (top > maxTop - toolHeight) {
    top = maxTop - toolHeight;
  }

  return {
    left,
    top,
    show: true,
  }
};

// ??????UE??????
onMounted(() => {
  // ??????????????????
  UE.subscribe('UE2JS_CompleteEditor', data => {
    createFlag.value = true;
    $emit('complete', true);
  });
  // ??????VR
  UE.subscribe('UE2JS_QuitVR', data => {
    sideHide.value = false;

    // ???????????????
    UE.publish('CGX_SetAxisPosition', {
      isShow: true,
      axisPostion: '500,1000',
      axisSize: '100,100',
    });
  });
  // ????????????
  UE.subscribe('UE2JS_ScreenShot', data => {
    snapshoot(data);
  });
  // ????????????
  UE.subscribe('UE2JS_PathEditor', data => {
    store.commit('drafts/toggleEditType', ['path']);
  });
  // ????????????
  UE.subscribe('UE2JS_CancelEditor', data => {
    store.commit('drafts/toggleEditType', []);
    store.commit('drafts/setPathObj', {});
  });
  // ????????????????????????
  UE.subscribe('UE2JS_LightButtonClick', data => {
    let {
      lightColor,
      globalSaturationIntensity,
      globalContrastIntensity,
      globalGammaValue,
    } = data;

    data.lightColor = str2Rgba(lightColor);
    data.globalSaturationIntensity = str2Rgba(globalSaturationIntensity);
    data.globalContrastIntensity = str2Rgba(globalContrastIntensity);
    data.globalGammaValue = str2Rgba(globalGammaValue);

    store.commit('drafts/setLight', data);
  });
  // ??????????????????
  // UE.subscribe('UE2JS_Hide', data => {
  //   let { entities } = data
  //   // ????????????
  //   let indexCodes = entities.map(item => item.indexCode)
  //   let { toggles } = treeView.value
  //   toggles('entityHide', indexCodes)
  // })
  // ??????????????????
  // UE.subscribe('UE2JS_Lock', data => {
  //   let { entities } = data
  //   // ????????????
  //   let indexCodes = entities.map(item => item.indexCode)
  //   let { toggles } = treeView.value
  //   toggles('entityLock', indexCodes)
  // })
  // ??????UE???????????????????????????
  UE.subscribe('UE2JS_KeyState', data => {
    let { keyName, state } = data;
    if (keyName === 'Ctrl') {
      let { toggleMultiple } = treeView.value;
      toggleMultiple(state);
    }
  });
  // ??????????????????
  UE.subscribe('CreateModel', data => {
    let { entities } = data;

    // ?????????????????????
    if (entities.length === 1 && entities[0].modelType === '1') return

    console.log('CreateModel', data);

    let temArr = [];
    entities.forEach(entity => {
      let {
        indexCode,
        modelId,
        modelName,
        entitySize,
        entityLocate,
        entityRotate,
      } = entity;
      let [sizeX, sizeY, sizeZ] = entitySize.split(',');
      let [locateX, locateY, locateZ] = entityLocate.split(',');
      let [rotateX, rotateY, rotateZ] = entityRotate.split(',');
      let initData = {
        entitySize,
        entityLocate,
        entityRotate,
        sizeX,
        sizeY,
        sizeZ,
        locateX,
        locateY,
        locateZ,
        rotateX,
        rotateY,
        rotateZ,
        indexCode,
        modelId,
        modelName,
        modelType: 3,
        entityCode: indexCode.slice(0, 6),
        entityName: modelName,
        deviceCode: '',
        entityDashboardCode: '',
        dashboardShowState: false,
        entityHide: false,
        entityLock: false,
      };
      temArr.push(initData);
    });

    store.commit('drafts/addEntity', temArr);

    // ?????????????????????????????????????????????????????????????????????????????????????????????
    if (createFlag.value) {
      let { append } = treeView.value;
      append(
        temArr.map(item => ({
          ...item,
          viewName: item.modelName,
          viewDesc: '',
        }))
      );
    }

    // ?????????????????????setEnt???{}?????????????????????????????????????????????
    // ????????????????????????????????????
    // let obj = {}
    // if (isCopy.value) {
    //   isCopy.value = false
    // } else {
    //   let { indexCode, modelId } = entities[0]
    //   obj = {
    //     indexCode,
    //     modelId,
    //     modelType: 3,
    //   }
    // }
    // store.commit('drafts/setEnt', obj)
  });
  // ????????????
  UE.subscribe('DeleteModel', data => {
    let { entities } = data;
    let indexCodes = entities.map(item => item.indexCode);
    store.commit('drafts/delEntity', indexCodes);

    // ????????????
    let { remove } = treeView.value;
    remove(indexCodes);
  });
  // ?????????????????????
  UE.subscribe('OperationModel', data => {
    // ???????????????????????????OperationModel
    if (Object.keys(pathObj.value).length) return

    // ????????????
    let { select } = treeView.value;

    // ???????????????
    if (!data) {
      toolShow.value = false;
      resetTool();

      select([]);
      store.commit('drafts/setEntity', []);

      return store.commit('drafts/toggleEditType', ['base'])
    }

    let { screenPos, isTranlate, entities } = data;
    // console.log('OperationModel', data)

    // ???????????????
    let { show, left, top } = getToolPos(screenPos);
    let tShow = show && !isTranlate;
    if (tShow) {
      toolPos.value = {
        left: left + 'px',
        top: top + 'px',
      };
    }
    toolShow.value = tShow;

    let temArr = [];
    entities.forEach(entity => {
      let {
        indexCode,
        modelId,
        entitySize,
        entityLocate,
        entityRotate,
      } = entity;
      let [sizeX, sizeY, sizeZ] = entitySize.split(',');
      let [locateX, locateY, locateZ] = entityLocate.split(',');
      let [rotateX, rotateY, rotateZ] = entityRotate.split(',');
      let changeData = {
        indexCode,
        modelId,
        entitySize,
        entityLocate,
        entityRotate,
        sizeX,
        sizeY,
        sizeZ,
        locateX,
        locateY,
        locateZ,
        rotateX,
        rotateY,
        rotateZ,
      };
      temArr.push(changeData);
    });

    store.commit('drafts/changeEntity', temArr);

    let indexCodes = entities.map(item => item.indexCode);
    select(indexCodes);
  });
  // ??????
  // UE.subscribe('SaveOrPulish', data => {
  //   submit(data)
  // })
});
onActivated(() => {
  UE.publish('JS2UE_SetGlobalState', {
    currentState: 'SceneEditor',
  });
  // ???????????????
  UE.publish('CGX_SetAxisPosition', {
    isShow: true,
    axisPostion: '500,1000',
    axisSize: '100,100',
  });
});
onDeactivated(() => {
  toolShow.value = false;
  // ???????????????
  UE.publish('CGX_SetAxisPosition', {
    isShow: false,
    axisPostion: '500,1000',
    axisSize: '100,100',
  });
});
onUnmounted(() => {
  // ??????????????????
  UE.publish('CGX_CancelEditor', {});
});

return (_ctx, _cache) => {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _directive_click_outside = resolveDirective("click-outside");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: "draft-edit__left",
      ref_key: "leftDomRef",
      ref: leftDomRef
    }, [
      createVNode(Menu, {
        active: menu.value,
        onChange: changeMenu
      }, null, 8, ["active"]),
      createBaseVNode("div", {
        class: normalizeClass(["component__wrap", { hide: sideHide.value }])
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(Component)), {
          ref_key: "dynamicCom",
          ref: dynamicCom
        }, null, 512))
      ], 2),
      createBaseVNode("div", {
        class: "component__toggle",
        onClick: toggleSide
      }, [
        createVNode(_component_svg_icon, {
          name: sideHide.value ? 'drafts-arrow-right' : 'drafts-arrow-left',
          class: "svg-img"
        }, null, 8, ["name"])
      ])
    ], 512),
    createBaseVNode("div", _hoisted_2, [
      (Object.keys(unref(panel)).length && unref(panel).publicUrl)
        ? (openBlock(), createElementBlock("iframe", {
            key: 0,
            src: unref(panel).publicUrl,
            frameborder: "0",
            ref: "iframe"
          }, null, 8, _hoisted_3))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_4, [
        createVNode(_component_el_select, {
          modelValue: viewType.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((viewType).value = $event)),
          "value-key": "type",
          onChange: changeViewType
        }, {
          prefix: withCtx(() => [
            createVNode(_component_svg_icon, {
              name: viewType.value.icon
            }, null, 8, ["name"])
          ]),
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(viewTypes.value, (item) => {
              return (openBlock(), createBlock(_component_el_option, {
                key: item.type,
                label: item.label,
                value: item
              }, {
                default: withCtx(() => [
                  createVNode(_component_svg_icon, {
                    name: viewType.value.type === item.type ? item.active : item.icon
                  }, null, 8, ["name"]),
                  createBaseVNode("span", _hoisted_5, toDisplayString(item.label), 1)
                ]),
                _: 2
              }, 1032, ["label", "value"]))
            }), 128))
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(_component_el_tooltip, {
          effect: "light",
          content: "??????"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              onClick: openLamplight,
              circle: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_svg_icon, { name: "drafts-main-light" })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_el_tooltip, {
          effect: "light",
          content: "??????"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              onClick: openWeather,
              circle: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_svg_icon, { name: "drafts-main-weather" })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_el_tooltip, {
          effect: "light",
          content: "?????????"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              onClick: toggleGridLine,
              circle: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_svg_icon, { name: "drafts-main-grid" })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_el_tooltip, {
          effect: "light",
          content: "VR??????"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              onClick: openVR,
              circle: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_svg_icon, { name: "drafts-main-vr" })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(ButtonSelect, {
          data: unref(pathObj),
          list: unref(pathList),
          tooltip: "????????????",
          "button-icon": "drafts-roam",
          "item-icon": "drafts-path",
          "value-key": "pathName",
          onButtonClick: roam,
          onItemClick: pathPlay
        }, null, 8, ["data", "list"]),
        createVNode(ButtonSelect, {
          class: "snapshot",
          data: unref(snapshotObj),
          list: unref(snapshots),
          tooltip: "????????????",
          "button-icon": "drafts-snapshoot",
          onButtonClick: snapshootClick,
          onItemClick: snapshootItemClick
        }, {
          item: withCtx(({ item }) => [
            createVNode(_component_svg_icon, {
              name: "drafts-snapshoot2",
              class: "svg-img"
            }),
            createBaseVNode("span", null, toDisplayString(item.snapshotName), 1),
            createVNode(_component_svg_icon, {
              name: "drafts-close",
              class: "svg-img",
              onClick: withModifiers($event => (deleteShot(item)), ["stop"])
            }, null, 8, ["onClick"])
          ]),
          _: 1
        }, 8, ["data", "list"])
      ]),
      createBaseVNode("div", _hoisted_6, [
        createVNode(_component_el_button, { onClick: save }, {
          default: withCtx(() => [
            createVNode(_component_svg_icon, { name: "drafts-main-save" }),
            _hoisted_7
          ]),
          _: 1
        }),
        createVNode(_component_el_button, { onClick: cancel }, {
          default: withCtx(() => [
            _hoisted_8
          ]),
          _: 1
        })
      ]),
      createBaseVNode("div", {
        class: "tools",
        style: normalizeStyle([toolPos.value, { visibility: toolShow.value ? 'visible' : 'hidden' }]),
        ref_key: "toolsDomRef",
        ref: toolsDomRef
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(tools.value, (t) => {
          return (openBlock(), createElementBlock("div", {
            class: normalizeClass(['tool', { active: tool.value === t.type }]),
            key: t.type
          }, [
            createVNode(_component_el_tooltip, {
              effect: "light",
              placement: "top",
              offset: 30,
              content: t.title
            }, {
              default: withCtx(() => [
                createVNode(_component_svg_icon, {
                  name: toolIcon(t),
                  class: "svg-img",
                  onClick: $event => (changeTool(t.type))
                }, null, 8, ["name", "onClick"])
              ]),
              _: 2
            }, 1032, ["content"]),
            (t.children)
              ? withDirectives((openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "triangle",
                  onClick: $event => (t.childrenShow = !t.childrenShow)
                }, _hoisted_11, 8, _hoisted_9)), [
                  [_directive_click_outside, 
              () => {
                t.childrenShow = false;
              }
            ]
                ])
              : createCommentVNode("", true),
            (t.childrenShow)
              ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(t.children, (item) => {
                    return (openBlock(), createElementBlock("div", {
                      class: "tool__dropdown__item",
                      key: item.type,
                      onClick: withModifiers($event => (copy(item.type, t)), ["stop"])
                    }, [
                      createVNode(_component_svg_icon, {
                        name: item.icon,
                        class: "svg-img"
                      }, null, 8, ["name"]),
                      createBaseVNode("span", null, toDisplayString(item.text), 1)
                    ], 8, _hoisted_13))
                  }), 128))
                ]))
              : createCommentVNode("", true)
          ], 2))
        }), 128))
      ], 4),
      createBaseVNode("div", {
        class: "navigations",
        onDragover: navDragover,
        onDrop: navDrop
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navigations), (item) => {
          return (openBlock(), createElementBlock("div", {
            class: "nav",
            style: normalizeStyle({
            left: item.navigationToLeft + 'px',
            top: item.navigationToTop + 'px',
          }),
            key: item.navigationCode,
            onClick: $event => (unref(store).commit('drafts/setNavigationObj', item))
          }, [
            (item.pictureUrl)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "img-wrap",
                  style: normalizeStyle({
              width: item.navigationWidth + 'px',
              height: item.navigationHeight + 'px',
            })
                }, [
                  createBaseVNode("img", {
                    src: item.pictureUrl,
                    draggable: false
                  }, null, 8, _hoisted_15)
                ], 4))
              : createCommentVNode("", true),
            createBaseVNode("span", {
              style: normalizeStyle({ fontSize: item.fontSize + 'px', color: item.textColor })
            }, toDisplayString(item.navigationName), 5)
          ], 12, _hoisted_14))
        }), 128))
      ], 32)
    ]),
    createBaseVNode("div", {
      class: "draft-edit__right",
      ref_key: "rightDomRef",
      ref: rightDomRef
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["component__wrap", { hide: sideHide.value }])
      }, [
        (createFlag.value)
          ? (openBlock(), createBlock(TreeView, {
              key: 0,
              ref_key: "treeView",
              ref: treeView,
              onSelect: onSelect,
              onToggles: onToggles,
              onDelete: onDelete
            }, null, 512))
          : createCommentVNode("", true),
        (unref(editType).includes('node'))
          ? (openBlock(), createBlock(NodeSetting, { key: 1 }))
          : createCommentVNode("", true),
        (unref(editType).includes('base'))
          ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createVNode(BaseSetting),
              createVNode(DataSetting)
            ], 64))
          : createCommentVNode("", true),
        (unref(editType).includes('model'))
          ? (openBlock(), createBlock(ComSetting, { key: 3 }))
          : createCommentVNode("", true),
        (unref(editType).includes('align'))
          ? (openBlock(), createBlock(AlignSetting, { key: 4 }))
          : createCommentVNode("", true),
        (unref(editType).includes('copy'))
          ? (openBlock(), createBlock(CopySetting, { key: 5 }))
          : createCommentVNode("", true),
        (unref(editType).includes('light'))
          ? (openBlock(), createBlock(Pannel, { key: 6 }))
          : createCommentVNode("", true),
        (unref(editType).includes('weather'))
          ? (openBlock(), createBlock(WeatherSetting, { key: 7 }))
          : createCommentVNode("", true),
        (unref(editType).includes('path'))
          ? (openBlock(), createBlock(PathSetting, { key: 8 }))
          : createCommentVNode("", true),
        (unref(editType).includes('shot'))
          ? (openBlock(), createBlock(ScreenShot, { key: 9 }))
          : createCommentVNode("", true),
        (unref(editType).includes('nav'))
          ? (openBlock(), createBlock(NavSetting, { key: 10 }))
          : createCommentVNode("", true)
      ], 2),
      createBaseVNode("div", {
        class: "component__toggle",
        onClick: toggleSide
      }, [
        createVNode(_component_svg_icon, {
          name: sideHide.value ? 'drafts-arrow-left' : 'drafts-arrow-right',
          class: "svg-img"
        }, null, 8, ["name"])
      ])
    ], 512)
  ]))
}
}

};
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-0ebb36d4"]]);

export { index as default };
