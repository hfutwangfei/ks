import { _ as _export_sfc, c as store, a as useRoute } from './index.acc4a696.js';
import modelList from './modelList.8ad4ea1c.js';
import modelManage from './myModel.1de2110d.js';
import { j as reactive, h as computed, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, L as Fragment, M as renderList, Y as normalizeClass, a as createVNode, O as toDisplayString, G as createCommentVNode, c as createBlock, b as resolveDynamicComponent } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';
import './sceneList.b22bf172.js';
import './modelItem.4c44462f.js';
import './location-icon.2a626473.js';
import './delete-icon.a33587a6.js';
import './modelScene.42824c77.js';
import './warning-icon.ecaebaa1.js';
import './UploadFlie.ee92a521.js';
import './spark-md5.2cc5764b.js';
import './FileSaver.min.1c09ff21.js';

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".system-setting-page[data-v-1a448fa0]{background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;height:100vh}.system-setting-page .left-munu[data-v-1a448fa0]{-webkit-box-flex:0;-ms-flex:0 0 .208333rem;flex:0 0 .208333rem;position:relative;padding-top:.104167rem;width:100%;background-color:#373b48;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.system-setting-page .left-munu .menu__item[data-v-1a448fa0]{margin-bottom:.041667rem;padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer}.system-setting-page .left-munu .menu__item span[data-v-1a448fa0]{display:inline-block;width:100%;text-align:center;margin-top:.026042rem;font-size:.0625rem;color:#fff9}.system-setting-page .left-munu .menu__item .svg-img[data-v-1a448fa0]{width:.104167rem;height:.104167rem;color:#fff9}.system-setting-page .left-munu .menu__item.act[data-v-1a448fa0]{background-color:#428fff}.system-setting-page .left-munu .menu__item.act .svg-img[data-v-1a448fa0],.system-setting-page .left-munu .menu__item.act span[data-v-1a448fa0]{color:#fff}.system-setting-page .right-content[data-v-1a448fa0]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:hidden}[data-v-1a448fa0] .system-user-page{height:100%;padding:0 .104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}[data-v-1a448fa0] .system-user-page .search-area{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding-top:.104167rem}[data-v-1a448fa0] .system-user-page .search-area .btn{width:.427083rem;height:.166667rem;border-radius:.020833rem;font-size:.072917rem}[data-v-1a448fa0] .system-user-page .search-area .left{-webkit-box-flex:1;-ms-flex:1;flex:1}[data-v-1a448fa0] .system-user-page .search-area .left .btn{background:transparent}[data-v-1a448fa0] .system-user-page .search-area .left .btn.btn-search{border:1px solid #428fff;color:#428fff}[data-v-1a448fa0] .system-user-page .search-area .left .btn.btn-reset{border:1px solid rgba(255,255,255,.6);color:#fff9;margin-left:.166667rem;margin-left:.083333rem}[data-v-1a448fa0] .system-user-page .search-area .right{-webkit-box-flex:0;-ms-flex:0 0 .9375rem;flex:0 0 .9375rem;display:-webkit-box;display:-ms-flexbox;display:flex}[data-v-1a448fa0] .system-user-page .search-area .right .btn{border:1px solid #428fff}[data-v-1a448fa0] .system-user-page .search-area .right .btn.btn-add{background:#428fff;color:#fff}[data-v-1a448fa0] .system-user-page .search-area .right .btn.btn-delete{background:transparent;color:#428fff;margin-left:.083333rem}[data-v-1a448fa0] .system-user-page .table-content{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}[data-v-1a448fa0] .delete-dialog{background:rgb(55,59,72);border-radius:.020833rem}[data-v-1a448fa0] .delete-dialog .el-dialog__header{border-bottom:.005208rem solid rgb(24,26,33);padding:.083333rem .104167rem}[data-v-1a448fa0] .delete-dialog .el-dialog__header .el-dialog__title{font-size:.09375rem;font-weight:500;color:#fff}[data-v-1a448fa0] .delete-dialog .el-dialog__header .el-dialog__close{font-size:.083333rem;color:#fff}[data-v-1a448fa0] .delete-dialog .el-dialog__body{padding-top:.208333rem}[data-v-1a448fa0] .delete-dialog .el-dialog__body .row{padding-left:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}[data-v-1a448fa0] .delete-dialog .el-dialog__body .row .name{font-size:.09375rem;font-weight:500;color:#fff;margin-left:.125rem}[data-v-1a448fa0] .delete-dialog .el-dialog__body .tips{margin-top:.088542rem;margin-bottom:.348958rem;padding-left:.354167rem;font-size:.0625rem;color:#fff9}[data-v-1a448fa0] .delete-dialog .el-dialog__footer .btn{width:.427083rem;height:.166667rem;min-height:.166667rem;padding:0;border-radius:.020833rem}[data-v-1a448fa0] .delete-dialog .el-dialog__footer .btn.btn-save{background:#428fff;border:none}[data-v-1a448fa0] .delete-dialog .el-dialog__footer .btn.btn-cancel{background:transparent;color:#fff9;border:1px solid rgba(255,255,255,.6);margin-left:.083333rem}\n")();

const { menusData } = store.state.menu;

const _sfc_main = {
  setup() {
    const route = useRoute();
    let state = reactive({
      show: false,
      active: '',
      sourceMenuList: [
        {
          type: 'mxlb',
          text: '模型列表',
          icon: 'modelmanage',
          otherName: '模型列表',
        },
        {
          type: 'dclmx',
          text: '待处理模型',
          icon: 'daichuli',
          otherName: '待',
          otherName2: '处理',
        },
      ],
      menuList: [],
      changeMenu: val => {
        state.show = false;
        state.active = val;
      },
      Component: computed(() => {
        switch (state.active) {
          case 'mxlb':
            return modelList
          case 'dclmx':
            return modelManage
          default:
            return 'mxlb'
        }
      }),
    });
    onMounted(async () => {
      // console.log(menusData, 8888888888888888)
      if (route.query.from && route.query.from === 'mxlb') {
        state.active = 'mxlb';
      } else {
        state.active = 'dclmx';
      }
      // state.active = route.query.from ? route.query.from : 'yhgl'
      let systemMenu = menusData.find(
        item => item.routing == '/model/modelIndex'
      );

      if (systemMenu && systemMenu.children && systemMenu.children.length) {
        state.sourceMenuList.map(v => {
          let temp = systemMenu.children.find(item => item.name == v.text);
          if (temp) {
            state.menuList.push(v);
          }
        });
        state.active = route.query.from
          ? route.query.from
          : state.menuList[0].type;
      } else {
        state.menuList = [];
        state.active = 'mxlb';
      }
      console.log(state.menuList, 223223);
      // 测试得删除
      // state.active = 'dclmx'
    });
    return {
      ...toRefs(state),
    }
  },
};
const _hoisted_1 = { class: "system-setting-page" };
const _hoisted_2 = { class: "left-munu" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 0,
  style: {"margin-top":"0"}
};
const _hoisted_5 = { class: "right-content" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.menuList, (item) => {
        return (openBlock(), createElementBlock("div", {
          class: normalizeClass(["menu__item", { act: _ctx.active == item.type }]),
          key: item.type,
          onClick: $event => (_ctx.changeMenu(item.type))
        }, [
          createVNode(_component_svg_icon, {
            name: item.icon,
            class: "svg-img"
          }, null, 8, ["name"]),
          createBaseVNode("span", null, toDisplayString(item.otherName), 1),
          (item.otherName2)
            ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(item.otherName2), 1))
            : createCommentVNode("", true)
        ], 10, _hoisted_3))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_5, [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.Component)))
    ])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-1a448fa0"]]);

export { index as default };
