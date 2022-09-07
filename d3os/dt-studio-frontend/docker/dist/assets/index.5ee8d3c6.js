import { _ as _export_sfc, p as pageRoute, a as useRoute } from './index.acc4a696.js';
import { l as ref, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, L as Fragment, M as renderList, c as createBlock, w as withCtx, a as createVNode, O as toDisplayString, Y as normalizeClass } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-data-binding[data-v-5296cd27]{height:100%;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.c-data-binding .left-menu[data-v-5296cd27]{list-style:none;padding-left:0;-ms-flex-preferred-size:.25rem;flex-basis:.25rem;position:relative;padding-top:.104167rem;margin:0;width:100%;background-color:#373b48;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-data-binding .left-menu .menu-item[data-v-5296cd27]{margin-bottom:.041667rem;padding:.052083rem .03125rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:center}.c-data-binding .left-menu .menu-item .svg-img[data-v-5296cd27]{width:.104167rem;height:.104167rem;margin-bottom:.020833rem;color:#fff9}.c-data-binding .left-menu .menu-item .svg-name[data-v-5296cd27]{font-size:.0625rem;color:#fff9}.c-data-binding .left-menu .menu-item.is-active[data-v-5296cd27]{background-color:#428fff}.c-data-binding .left-menu .menu-item.is-active .svg-img[data-v-5296cd27],.c-data-binding .left-menu .menu-item.is-active .svg-name[data-v-5296cd27]{color:#fff}\n")();

const _hoisted_1 = { class: "c-data-binding" };
const _hoisted_2 = { class: "left-menu" };
const _hoisted_3 = { class: "svg-name" };


const _sfc_main = {
  __name: 'index',
  setup(__props) {

const sidebarList = ref(pageRoute[0].children);

const route = useRoute();

const isActive = name => name === route.meta.parent;

return (_ctx, _cache) => {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_router_link = resolveComponent("router-link");
  const _component_router_view = resolveComponent("router-view");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("ul", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(sidebarList.value, (sidebarItem) => {
        return (openBlock(), createBlock(_component_router_link, {
          key: sidebarItem.name,
          to: { name: sidebarItem.name },
          class: normalizeClass(['menu-item', isActive(sidebarItem.name) && 'is-active'])
        }, {
          default: withCtx(() => [
            createVNode(_component_svg_icon, {
              name: sidebarItem.meta.icon,
              class: "svg-img"
            }, null, 8, ["name"]),
            createBaseVNode("span", _hoisted_3, toDisplayString(sidebarItem.meta.title), 1)
          ]),
          _: 2
        }, 1032, ["to", "class"]))
      }), 128))
    ]),
    createVNode(_component_router_view)
  ]))
}
}

};
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-5296cd27"]]);

export { index as default };
