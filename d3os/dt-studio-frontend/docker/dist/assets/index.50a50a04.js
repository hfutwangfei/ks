import { _ as _export_sfc } from './index.acc4a696.js';
import { d as defineComponent, o as openBlock, B as createElementBlock, W as pushScopeId, X as popScopeId, C as createBaseVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var _imports_0 = "/assets/welcome.cb28e56c.png";

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".welcome-page[data-v-c7c99394]{height:100%;width:100%;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.welcome-page .logo[data-v-c7c99394]{width:3.895833rem;height:2.666667rem}.welcome-page .title[data-v-c7c99394]{text-align:center;font-size:.208333rem;font-weight:700;color:#fff;margin-top:.208333rem}\n")();

const _sfc_main = defineComponent({});


const _withScopeId = n => (pushScopeId("data-v-c7c99394"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "welcome-page" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", null, [
  /*#__PURE__*/createBaseVNode("img", {
    class: "logo",
    src: _imports_0,
    alt: ""
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "title" }, "欢迎登录")
], -1));
const _hoisted_3 = [
  _hoisted_2
];

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, _hoisted_3))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-c7c99394"]]);

export { index as default };
