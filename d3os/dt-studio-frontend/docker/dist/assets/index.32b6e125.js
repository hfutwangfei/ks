import { _ as _export_sfc } from './index.acc4a696.js';
import { d as defineComponent, o as openBlock, B as createElementBlock, L as Fragment, a as createVNode, G as createCommentVNode, w as withCtx, W as pushScopeId, X as popScopeId, C as createBaseVNode, r as resolveComponent, N as createTextVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".error[data-v-aa4901d0]{position:relative;text-align:center;padding-top:.25rem}.error .code-403[data-v-aa4901d0]{position:absolute;font-size:.260417rem;top:.770833rem;left:50%;-webkit-transform:translateX(.166667rem);transform:translate(.166667rem);font-family:arial;color:#ee5c42}.error .error-img[data-v-aa4901d0]{font-size:1.666667rem;pointer-events:none}.error .title[data-v-aa4901d0]{font-size:.104167rem;margin:.166667rem 0}\n")();

const _sfc_main = defineComponent({
  props: ['error'],
});

const _withScopeId = n => (pushScopeId("data-v-aa4901d0"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "error" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", { class: "code-403" }, "403", -1));
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("h2", { class: "title" }, "您无权访问此页面", -1));
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("h2", { class: "title" }, "服务器出错了", -1));
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("h2", { class: "title" }, "您访问的页面不存在", -1));
const _hoisted_6 = /*#__PURE__*/createTextVNode("返回首页");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.error === '403')
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _hoisted_2,
          createVNode(_component_svg_icon, {
            name: "error-icons-403",
            class: "error-img"
          }),
          _hoisted_3
        ], 64))
      : (_ctx.error === '500')
        ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(_component_svg_icon, {
              name: "error-icons-500",
              class: "error-img"
            }),
            _hoisted_4
          ], 64))
        : (_ctx.error === '404')
          ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createVNode(_component_svg_icon, {
                name: "error-icons-404",
                class: "error-img"
              }),
              _hoisted_5
            ], 64))
          : createCommentVNode("", true),
    createVNode(_component_router_link, { to: "/" }, {
      default: withCtx(() => [
        createVNode(_component_el_button, { type: "primary" }, {
          default: withCtx(() => [
            _hoisted_6
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-aa4901d0"]]);

export { index as default };
