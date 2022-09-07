import { u as useRouter, _ as _export_sfc, a as useRoute, b as useStore, U as UE } from './index.acc4a696.js';
import { d as defineComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, W as pushScopeId, X as popScopeId, h as computed, r as resolveComponent, Y as normalizeClass, c as createBlock, G as createCommentVNode, O as toDisplayString, L as Fragment, w as withCtx, a as createVNode, M as renderList, l as ref, D as onBeforeMount, m as watch, N as createTextVNode, H as renderSlot, Z as KeepAlive, b as resolveDynamicComponent, _ as onBeforeUnmount } from './element-plus.da98f360.js';
import { u as useUserinfo } from './useUserinfo.f5ce2794.js';
import './monaco-editor.e9574fd0.js';

var _imports_0$1 = "/assets/logo.0164491f.svg";

var Logo_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".brand[data-v-1630103c]{height:.25rem;padding:0 .041667rem 0 .104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.brand .logo[data-v-1630103c]{cursor:pointer;width:.598958rem;height:.1875rem}.brand .shuxian[data-v-1630103c]{width:.005208rem;height:.072917rem;background:#ffffff;margin:0 .041667rem}.brand .title[data-v-1630103c]{color:#fff;font-family:PingFangSC-Medium,PingFang SC;font-size:.083333rem;font-weight:500;white-space:nowrap;-webkit-transition:all .5s;transition:all .5s;line-height:1}\n")();

const _sfc_main$b = defineComponent({
  setup() {
    const router = useRouter();
    const goHome = () => {
      router.push('/');
    };
    return { goHome }
  },
});


const _withScopeId$2 = n => (pushScopeId("data-v-1630103c"),n=n(),popScopeId(),n);
const _hoisted_1$4 = { class: "brand" };
const _hoisted_2$3 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("div", { class: "shuxian" }, null, -1));
const _hoisted_3$2 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("div", { class: "title" }, "DT Studio", -1));

function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("img", {
      class: "logo",
      src: _imports_0$1,
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.goHome && _ctx.goHome(...args)))
    }),
    _hoisted_2$3,
    _hoisted_3$2
  ]))
}
var Logo = /*#__PURE__*/_export_sfc(_sfc_main$b, [['render',_sfc_render$b],['__scopeId',"data-v-1630103c"]]);

var Item_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".icon[data-v-7c99261c]{margin-right:.052083rem;width:.083333rem!important;height:.083333rem!important;font-size:.083333rem;text-align:center;color:currentColor;vertical-align:middle}\n")();

const _sfc_main$a = defineComponent({
  props: ['title', 'icon'],
  setup({ icon }) {
    const isElementIcon = computed(() => icon && icon.startsWith('el-icon'));

    return {
      isElementIcon,
    }
  },
});

function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    (_ctx.isElementIcon)
      ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(`icon ${_ctx.icon}`)
        }, null, 2))
      : (!!_ctx.icon)
        ? (openBlock(), createBlock(_component_svg_icon, {
            key: 1,
            class: "icon",
            name: _ctx.icon
          }, null, 8, ["name"]))
        : createCommentVNode("", true),
    createBaseVNode("span", null, toDisplayString(_ctx.title), 1)
  ], 64))
}
var Item = /*#__PURE__*/_export_sfc(_sfc_main$a, [['render',_sfc_render$a],['__scopeId',"data-v-7c99261c"]]);

const _sfc_main$9 = defineComponent({
  name: 'Submenu',
  components: {
    Item,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
});

function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_item = resolveComponent("item");
  const _component_el_menu_item = resolveComponent("el-menu-item");
  const _component_submenu = resolveComponent("submenu", true);
  const _component_el_sub_menu = resolveComponent("el-sub-menu");

  return (!_ctx.menu.children)
    ? (openBlock(), createBlock(_component_el_menu_item, {
        key: 0,
        index: _ctx.menu.url
      }, {
        default: withCtx(() => [
          createVNode(_component_item, {
            icon: _ctx.menu.icon,
            title: _ctx.menu.title
          }, null, 8, ["icon", "title"])
        ]),
        _: 1
      }, 8, ["index"]))
    : (openBlock(), createBlock(_component_el_sub_menu, {
        key: 1,
        index: _ctx.menu.url
      }, {
        title: withCtx(() => [
          createVNode(_component_item, {
            icon: _ctx.menu.icon,
            title: _ctx.menu.title
          }, null, 8, ["icon", "title"])
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.menu.children, (submenu) => {
            return (openBlock(), createBlock(_component_submenu, {
              key: submenu.url,
              "is-nest": true,
              menu: submenu
            }, null, 8, ["menu"]))
          }), 128))
        ]),
        _: 1
      }, 8, ["index"]))
}
var Submenu = /*#__PURE__*/_export_sfc(_sfc_main$9, [['render',_sfc_render$9]]);

const menuBg = "#2a2e39";
const menuTextColor = "rgba(255, 255, 255, 0.6)";
const menuActiveTextColor = "#fff";
var config = {
	menuBg: menuBg,
	menuTextColor: menuTextColor,
	menuActiveTextColor: menuActiveTextColor
};

var Menus_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".el-menu-item{border:none!important}.el-scrollbar__view{height:100%}.el-menu-item:hover,.el-submenu__title:hover,.el-submenu .el-menu-item,.el-submenu .el-submenu .el-submenu__title,.el-submenu .el-menu-item:hover,.el-submenu .el-submenu .el-submenu__title:hover,.el-menu-item.is-active,.el-menu-item.is-active:hover{background-color:#2a2e39!important}.el-menu--collapse .el-menu-item.is-active,.el-menu--collapse .el-submenu.is-active>.el-submenu__title{position:relative;background-color:#1f2d3d!important;color:#fff9!important}.el-menu--collapse .el-menu-item.is-active:before,.el-menu--collapse .el-submenu.is-active>.el-submenu__title:before{content:\"\";position:absolute;left:0;top:0;width:.010417rem;height:100%;background-color:#409eff}.el-submenu__title i{color:#909399}.el-menu--horizontal{height:100%}.el-menu--horizontal .el-menu-item,.el-menu--horizontal .el-sub-menu .el-sub-menu__title{height:100%;line-height:100%;border:none}.el-menu--horizontal .el-menu-item.is-active,.el-menu--horizontal .el-submenu.is-active .el-submenu__title{border:none}\n")();

var Menus_vue_vue_type_style_index_1_scoped_true_lang = /* #__PURE__ */ (() => ".scroll[data-v-165bda0b]{height:auto;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-x:hidden;overflow-y:auto}.scroll .menu[data-v-165bda0b]{background-color:transparent;border:none}\n")();

const _sfc_main$8 = defineComponent({
  components: {
    Submenu,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'vertical',
    },
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const select = (index, ...arg) => {
      if (index === '/help/api') {
        UE.publish('JS2UE_OpenURL', {
          url: 'https://wangweiqi04.github.io/ueapi.github.io/docs/guide/js',
        });
        return
      }
    };

    return {
      menus: computed(() => store.state.menu.menus),
      activePath: computed(() => route.path),
      variables: computed(() => config),
      select,
    }
  },
});

function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_submenu = resolveComponent("submenu");
  const _component_el_menu = resolveComponent("el-menu");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");

  return (openBlock(), createBlock(_component_el_scrollbar, { class: "scroll" }, {
    default: withCtx(() => [
      createVNode(_component_el_menu, {
        class: "menu",
        mode: _ctx.mode,
        collapse: _ctx.collapse,
        uniqueOpened: true,
        router: true,
        "default-active": _ctx.activePath,
        "background-color": _ctx.variables.menuBg,
        "text-color": _ctx.variables.menuTextColor,
        "active-text-color": _ctx.variables.menuActiveTextColor,
        onSelect: _ctx.select
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.menus, (menu) => {
            return (openBlock(), createBlock(_component_submenu, {
              key: menu.url,
              menu: menu
            }, null, 8, ["menu"]))
          }), 128))
        ]),
        _: 1
      }, 8, ["mode", "collapse", "default-active", "background-color", "text-color", "active-text-color", "onSelect"])
    ]),
    _: 1
  }))
}
var Menus = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$8],['__scopeId',"data-v-165bda0b"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang$3 = /* #__PURE__ */ (() => ".left[data-v-84f0b574]{width:1.09375rem;background:#2a2e39;-webkit-transition:all .3s;transition:all .3s;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.left.collapse[data-v-84f0b574]{width:.333333rem}.left.collapse[data-v-84f0b574] .brand .title{display:none}.left.mobile[data-v-84f0b574]{height:100%;position:fixed;left:0;top:0;z-index:10}.left.mobile+.mask[data-v-84f0b574]{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.3);z-index:9}.left.mobile.collapse[data-v-84f0b574]{-webkit-transform:translateX(-100%);transform:translate(-100%)}.left.mobile.collapse+.mask[data-v-84f0b574]{display:none}\n")();

const _sfc_main$7 = defineComponent({
  components: {
    Logo,
    Menus,
  },
  setup() {
    const store = useStore();
    const collapse = computed(() => !!store.state.app.sidebar.collapse);
    const device = computed(() => store.state.app.device);

    const closeSidebar = () => {
      store.commit('app/setCollapse', 1);
    };

    return {
      collapse,
      device,
      closeSidebar,
    }
  },
});

function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_logo = resolveComponent("logo");
  const _component_menus = resolveComponent("menus");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", {
      class: normalizeClass(["left", { collapse: _ctx.collapse, mobile: _ctx.device === 'mobile' }])
    }, [
      createVNode(_component_logo),
      createVNode(_component_menus, { collapse: _ctx.collapse }, null, 8, ["collapse"])
    ], 2),
    createBaseVNode("div", {
      class: "mask",
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.closeSidebar && _ctx.closeSidebar(...args)))
    })
  ], 64))
}
var Sidebar = /*#__PURE__*/_export_sfc(_sfc_main$7, [['render',_sfc_render$7],['__scopeId',"data-v-84f0b574"]]);

var Hamburger_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".fold-btn[data-v-18c04828]{line-height:.25rem;padding:0 .052083rem;font-size:.09375rem;cursor:pointer}.fold-btn[data-v-18c04828]:hover{background:#f5f5f5}.fold-btn.collapse[data-v-18c04828]{-webkit-transform:scale(-1,1);transform:scaleX(-1)}\n")();

const _sfc_main$6 = defineComponent({
  setup() {
    const store = useStore();
    const collapse = computed(() => !!store.state.app.sidebar.collapse);
    const handleToggleMenu = () => {
      store.commit('app/setCollapse', +!collapse.value);
    };
    return {
      collapse,
      handleToggleMenu,
    }
  },
});

function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: normalizeClass(["fold-btn el-icon-s-fold", { collapse: _ctx.collapse }]),
    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleToggleMenu && _ctx.handleToggleMenu(...args)))
  }, null, 2))
}
var Hamburger = /*#__PURE__*/_export_sfc(_sfc_main$6, [['render',_sfc_render$6],['__scopeId',"data-v-18c04828"]]);

var Breadcrumbs_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".breadcrumb[data-v-73c5b866]{margin-left:.052083rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.breadcrumb[data-v-73c5b866] a,.breadcrumb[data-v-73c5b866] .is-link{font-weight:400}.breadcrumb[data-v-73c5b866] .el-breadcrumb__item{float:none}.breadcrumb .no_link[data-v-73c5b866] .el-breadcrumb__inner{color:#97a8be!important}.breadcrumb.mobile[data-v-73c5b866]{display:none}.breadcrumb.show[data-v-73c5b866]{display:block;margin:0;padding:.083333rem;background:#f5f5f5}.breadcrumb.hide[data-v-73c5b866]{display:none}\n")();

var Breadcrumbs_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".el-breadcrumb__inner.is-link,.el-breadcrumb__inner a{color:#5c5c5c}\n")();

const _sfc_main$5 = defineComponent({
  setup(props, { emit }) {
    const store = useStore();
    const device = computed(() => store.state.app.device);
    const router = useRouter();
    const route = router.currentRoute; // 这里不使用useRoute获取当前路由，否则下面watch监听路由的时候会有警告
    const breadcrumbs = ref([]);
    const defaultSettings = computed(() => store.state.layoutSettings);
    const isHorizontalMenu = computed(
      () => defaultSettings.value.menus.mode === 'horizontal'
    );

    const getBreadcrumbs = route => {
      const home = [{ path: '/', meta: { title: '首页' } }];
      if (route.name === 'home') {
        return home
      } else {
        const matched = route.matched.filter(
          item => !!item.meta && !!item.meta.title
        );

        return [...home, ...matched]
      }
    };

    onBeforeMount(() => {
      breadcrumbs.value = getBreadcrumbs(route.value);
    });

    watch(
      route,
      newRoute => {
        breadcrumbs.value = getBreadcrumbs(newRoute);
        emit('on-breadcrumbs-change', breadcrumbs.value.length > 1);
      },
      {
        immediate: true,
      }
    );

    return {
      device,
      breadcrumbs,
      isHorizontalMenu,
    }
  },
});

function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_breadcrumb_item = resolveComponent("el-breadcrumb-item");
  const _component_el_breadcrumb = resolveComponent("el-breadcrumb");

  return (openBlock(), createBlock(_component_el_breadcrumb, {
    "separator-class": "el-icon-arrow-right",
    class: normalizeClass(["breadcrumb", {
      mobile: _ctx.device === 'mobile',
      show: _ctx.isHorizontalMenu,
      hide: _ctx.breadcrumbs.length <= 1,
    }])
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.breadcrumbs, (item, index) => {
        return (openBlock(), createBlock(_component_el_breadcrumb_item, {
          key: index,
          class: normalizeClass({ no_link: index === _ctx.breadcrumbs.length - 1 }),
          to: index < _ctx.breadcrumbs.length - 1 ? item.path : ''
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(item.meta.title), 1)
          ]),
          _: 2
        }, 1032, ["class", "to"]))
      }), 128))
    ]),
    _: 1
  }, 8, ["class"]))
}
var Breadcrumbs = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$5],['__scopeId',"data-v-73c5b866"]]);

var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEVHcEz///////////////////////////////////////+PBM77AAAAC3RSTlMAHFmBkJiZcgsoPJBQR1gAAACpSURBVHgBjZA9DsIwDIXTTMBUIVVCTLBEHABF7EjZGeAAbTHiAp35uQATM9wUjLETyaDmDW7zxbGfbXI1Xq7n6dnuAPazBHT15OwOSUJ7M2YYYkp1xHjfCHCfO1sL8CXGohEQThgH7X+gnqiiqq0ypqzr4dT4GfuCt+IjLInactmueeJn6r+NLSzo5wKUUskMjsy7FYMrXfkHgxEtIJQMCloRREPwG/ToBV7gIkZu3Vn9AAAAAElFTkSuQmCC";

var _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEVHcEz///////////////////////////////8W/R0OAAAACXRSTlMAtv8BxxXUIu317At7AAAAaElEQVR4Aa2Ruw2AMBBDCR/RMgK6gh4xQ3oqBkBiD8TkQA6BYh8FH5dPjmOdkzdyElSdICVQw5MvoPUA8qaPQTFOkDGo5QKHZQdZF6SWDZSL1heZb0Ccaoba31Ixqu78jxfDGWiox1oBOaoT2hmIFNwAAAAASUVORK5CYII=";

var _imports_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMA3mue0sQLFbPxeSEFPulYTCeCvTGH/gv4X7gAAADzSURBVHgBrVLhkrMgDBQBIYAC1Xbf/00/px8GrenczM3ljwy7Lptshj8v738gAF+hMnbCWG7wpPFyB8G9oKcrXhUod4VMUPWMOwVTzx6qgXIdTytsuppMFmtiwqPTuYtd9MEGCdu9zRl0GB2xSnNYMbaTQpEIBer/IWKRJ7kgvr8ZViZY5GZBy2HpZiLgKafzRLgrnOtQKPiyA751F0FJwhO1LgaDWSLMMByF+IbnMBxJEnsWHHi4hM9phm7Hwn6s2GR5RY6Nimc8XjfqfUGBRaZAHz/sdx4gnTfntqwJ8NPdtQWXFQcz1ODNshgfqjz6X9Y/NucNOO1YeqwAAAAASUVORK5CYII=";

var Userinfo_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".userinfo-area[data-v-6e5d2bf6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.userinfo-area img[data-v-6e5d2bf6]{width:.083333rem;height:.083333rem;cursor:pointer}.userinfo-area .avatar[data-v-6e5d2bf6]{margin-right:.041667rem}.userinfo-area .name[data-v-6e5d2bf6]{font-size:.072917rem;color:#fff9}.userinfo-area .logout[data-v-6e5d2bf6]{margin-left:.104167rem}.userinfo-area .power[data-v-6e5d2bf6]{margin:0 .104167rem}\n")();

const _sfc_main$4 = defineComponent({
  components: {
    // LockModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const { userinfo } = useUserinfo();
    const username = store.state.account.userinfo.sub;
    // 退出
    const logout = () => {
      UE.publish('DestroyAll', {});
      // 清除token
      store.dispatch('app/clearToken');
      router.push('/login');
      location.reload();
    };
    // 退出程序
    const exit = () => {
      UE.publish('ApplicationQuit', {});
    };

    return {
      userinfo,
      username,
      logout,
      exit,
    }
  },
});


const _withScopeId$1 = n => (pushScopeId("data-v-6e5d2bf6"),n=n(),popScopeId(),n);
const _hoisted_1$3 = { class: "userinfo-area" };
const _hoisted_2$2 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("img", {
  class: "avatar",
  src: _imports_0,
  alt: ""
}, null, -1));
const _hoisted_3$1 = { class: "name" };

function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    _hoisted_2$2,
    createBaseVNode("span", _hoisted_3$1, toDisplayString(_ctx.username), 1),
    createBaseVNode("img", {
      class: "logout",
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.logout && _ctx.logout(...args))),
      src: _imports_1,
      alt: ""
    }),
    createBaseVNode("img", {
      class: "power",
      src: _imports_2,
      alt: "",
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.exit && _ctx.exit(...args)))
    })
  ]))
}
var Userinfo = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$4],['__scopeId',"data-v-6e5d2bf6"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang$2 = /* #__PURE__ */ (() => ".errLog-container[data-v-5d293896]{margin-right:.052083rem}.message-title[data-v-5d293896]{font-size:.083333rem;color:#333;font-weight:700;padding-right:.041667rem}\n")();

const _sfc_main$3 = defineComponent({
  name: 'ErrorLog',
  setup() {
    const dialogTableVisible = ref(false);
    const store = useStore();
    const errorLogs = computed(() => store.state.errorLog.logs);
    const clearAll = () => {
      dialogTableVisible.value = false;
      store.dispatch('errorLog/clearErrorLog');
    };

    return {
      dialogTableVisible,
      errorLogs,
      clearAll,
    }
  },
});

const _withScopeId = n => (pushScopeId("data-v-5d293896"),n=n(),popScopeId(),n);
const _hoisted_1$2 = {
  key: 0,
  class: "errLog-container"
};
const _hoisted_2$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", { style: {"padding-right":"10px"} }, "错误日志", -1));
const _hoisted_3 = /*#__PURE__*/createTextVNode(" Clear All ");
const _hoisted_4 = { style: {"margin-bottom":"10px"} };
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", {
  class: "message-title",
  style: {"padding-right":"16px"}
}, " 页面: ", -1));
const _hoisted_6 = { style: {"margin-bottom":"10px"} };
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", { class: "message-title" }, "事件源:", -1));
const _hoisted_8 = { style: {"margin-bottom":"10px"} };
const _hoisted_9 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", { class: "message-title" }, "错误提示:", -1));
const _hoisted_10 = { key: 0 };
const _hoisted_11 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", {
  class: "message-title",
  style: {"padding-right":"16px"}
}, " 接口地址: ", -1));

function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_badge = resolveComponent("el-badge");
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (_ctx.errorLogs.length > 0)
    ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_el_badge, {
          "is-dot": true,
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.dialogTableVisible = true))
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              style: {"padding":"8px 10px"},
              size: "small",
              type: "danger"
            }, {
              default: withCtx(() => [
                createVNode(_component_svg_icon, { name: "bug" })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_el_dialog, {
          modelValue: _ctx.dialogTableVisible,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.dialogTableVisible) = $event)),
          width: "80%",
          "append-to-body": ""
        }, {
          title: withCtx(() => [
            _hoisted_2$1,
            createVNode(_component_el_button, {
              size: "mini",
              type: "primary",
              icon: "el-icon-delete",
              onClick: _ctx.clearAll
            }, {
              default: withCtx(() => [
                _hoisted_3
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          default: withCtx(() => [
            createVNode(_component_el_table, {
              data: _ctx.errorLogs,
              border: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_el_table_column, { label: "Message" }, {
                  default: withCtx(({ row }) => [
                    createBaseVNode("div", _hoisted_4, [
                      _hoisted_5,
                      createVNode(_component_el_tag, { type: "success" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.url), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    createBaseVNode("div", _hoisted_6, [
                      _hoisted_7,
                      createVNode(_component_el_tag, { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.info && row.info), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    createBaseVNode("div", _hoisted_8, [
                      _hoisted_9,
                      createVNode(_component_el_tag, { type: "danger" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.err && row.err.message), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    (row.err && row.err.config)
                      ? (openBlock(), createElementBlock("div", _hoisted_10, [
                          _hoisted_11,
                          createVNode(_component_el_tag, { type: "info" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.err && row.err.config && row.err.config.url), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]))
                      : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, { label: "Stack" }, {
                  default: withCtx(({ row }) => [
                    createTextVNode(toDisplayString(row.err && row.err.stack), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]))
    : createCommentVNode("", true)
}
var ErrorLog = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$3],['__scopeId',"data-v-5d293896"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang$1 = /* #__PURE__ */ (() => ".header[data-v-5cb6e299]{height:.3125rem;border-bottom:.010417rem solid #000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.header .navigation[data-v-5cb6e299]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:hidden}.header .action[data-v-5cb6e299]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mobile[data-v-5cb6e299]{padding-right:0}.mobile[data-v-5cb6e299] .title{display:none}.show-title[data-v-5cb6e299] .title{display:block}\n")();

const _sfc_main$2 = defineComponent({
  components: {
    Logo,
    Hamburger,
    Breadcrumbs,
    Userinfo,
    ErrorLog,
  },
  setup() {
    const store = useStore();
    const defaultSettings = computed(() => store.state.layoutSettings);

    const device = computed(() => store.state.app.device);

    const isHorizontalMenu = computed(
      () => defaultSettings.value.menus.mode === 'horizontal'
    );

    const isShowLogo = computed(
      () => isHorizontalMenu.value || device.value === 'mobile'
    );

    const isShowHamburger = computed(() => !isHorizontalMenu.value);

    const isShowBreadcrumbs = computed(
      () => defaultSettings.value.breadcrumbs.isShow && !isHorizontalMenu.value
    );

    return {
      device,
      isHorizontalMenu,
      isShowLogo,
      isShowHamburger,
      isShowBreadcrumbs,
    }
  },
});
const _hoisted_1$1 = { class: "navigation" };
const _hoisted_2 = { class: "action" };

function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_logo = resolveComponent("logo");
  const _component_hamburger = resolveComponent("hamburger");
  const _component_breadcrumbs = resolveComponent("breadcrumbs");
  const _component_error_log = resolveComponent("error-log");
  const _component_userinfo = resolveComponent("userinfo");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["header", { 'no-border': _ctx.isHorizontalMenu }])
  }, [
    createBaseVNode("div", _hoisted_1$1, [
      (_ctx.isShowLogo)
        ? (openBlock(), createBlock(_component_logo, {
            key: 0,
            class: normalizeClass(["mobile", { 'show-title': _ctx.isHorizontalMenu }])
          }, null, 8, ["class"]))
        : createCommentVNode("", true),
      (_ctx.isShowHamburger)
        ? (openBlock(), createBlock(_component_hamburger, { key: 1 }))
        : createCommentVNode("", true),
      (_ctx.isShowBreadcrumbs)
        ? (openBlock(), createBlock(_component_breadcrumbs, { key: 2 }))
        : createCommentVNode("", true)
    ]),
    renderSlot(_ctx.$slots, "default", {}, undefined, true),
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_error_log),
      createVNode(_component_userinfo)
    ])
  ], 2))
}
var Topbar = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$2],['__scopeId',"data-v-5cb6e299"]]);

const _sfc_main$1 = defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const cacheList = computed(() => store.state.tags.cacheList);
    const key = computed(() => route.fullPath);

    return {
      cacheList,
      key,
    }
  },
});

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");

  return (openBlock(), createBlock(_component_router_view, null, {
    default: withCtx(({ Component }) => [
      (openBlock(), createBlock(KeepAlive, { include: _ctx.cacheList }, [
        (openBlock(), createBlock(resolveDynamicComponent(Component)))
      ], 1032, ["include"]))
    ]),
    _: 1
  }))
}
var Content = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

/*
 *                   ___====-_  _-====___
 *             _--^^^#####//      \\#####^^^--_
 *          _-^##########// (    ) \\##########^-_
 *         -############//  |\^^/|  \\############-
 *       _/############//   (@::@)   \############\_
 *      /#############((     \\//     ))#############\
 *     -###############\\    (oo)    //###############-
 *    -#################\\  / VV \  //#################-
 *   -###################\\/      \//###################-
 *  _#/|##########/\######(   /\   )######/\##########|\#_
 *  |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
 *  `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
 *     `   `  `      `   / | |  | | \   '      '  '   '
 *                      (  | |  | |  )
 *                     __\ | |  | | /__
 *                    (vvv(VVV)(VVV)vvv)
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                神兽保佑            永无BUG
 *
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-29 11:31:50
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

const WIDTH = 768;
const useResizeHandler = () => {
  const store = useStore();
  // const router = useRouter();
  // const route = router.currentRoute;

  const isMobile = () => {
    return window.innerWidth < WIDTH
  };

  const resizeHandler = () => {
    if (isMobile()) {
      store.commit('app/setDevice', 'mobile');
      store.commit('app/setCollapse', 1);
    } else {
      store.commit('app/setDevice', 'desktop');
      store.commit('app/setCollapse', 0);
    }
  };

  onBeforeMount(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler);
  });

  // // 监听路由的时候不能使用useRoute获取路由，否则会有警告
  // watch(route, () => {
  //   if (store.state.app.device === 'mobile' && !store.state.app.sidebar.collapse) {
  //     store.commit('app/setCollapse', 1)
  //   }
  // })
};

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".wrapper[data-v-0ca6ff1b]{color:#fff9;display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 auto;width:7.5rem;height:100%}.wrapper.fluid[data-v-0ca6ff1b]{width:100%}.wrapper .right[data-v-0ca6ff1b]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.wrapper .right.flex[data-v-0ca6ff1b]{overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.wrapper .right .top[data-v-0ca6ff1b]{background:#2a2e39}.wrapper .right .main[data-v-0ca6ff1b]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.wrapper .right .main.pt0[data-v-0ca6ff1b]{padding-top:0}\n")();

const _sfc_main = defineComponent({
  name: 'layout',
  components: {
    Sidebar,
    Topbar,
    Menus,
    // Tagsbar,
    Breadcrumbs,
    Content,
  },
  setup() {
    useResizeHandler();
    const store = useStore();
    const defaultSettings = computed(() => store.state.layoutSettings);
    const isFluid = computed(() => defaultSettings.value.layout.isFluid);
    const isTopbarFixed = computed(() => defaultSettings.value.topbar.isFixed);
    const isMenusShow = computed(() => defaultSettings.value.menus.isShow);
    const isHorizontalMenu = computed(
      () => defaultSettings.value.menus.mode === 'horizontal'
    );
    const isBreadcrumbsShow = computed(
      () => isHorizontalMenu.value && defaultSettings.value.breadcrumbs.isShow
    );
    const paddingFlag = ref(true);
    const handleBreadcrumbsChange = boo => {
      paddingFlag.value = boo;
    };

    return {
      isFluid,
      isTopbarFixed,
      isMenusShow,
      isHorizontalMenu,
      isBreadcrumbsShow,
      paddingFlag,
      handleBreadcrumbsChange,
    }
  },
});
const _hoisted_1 = { class: "top" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_sidebar = resolveComponent("sidebar");
  const _component_menus = resolveComponent("menus");
  const _component_topbar = resolveComponent("topbar");
  const _component_breadcrumbs = resolveComponent("breadcrumbs");
  const _component_Content = resolveComponent("Content");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["wrapper", { fluid: _ctx.isFluid }])
  }, [
    (_ctx.isMenusShow && !_ctx.isHorizontalMenu)
      ? (openBlock(), createBlock(_component_sidebar, { key: 0 }))
      : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(["right", { flex: _ctx.isTopbarFixed }])
    }, [
      createBaseVNode("div", _hoisted_1, [
        createVNode(_component_topbar, null, {
          default: withCtx(() => [
            (_ctx.isMenusShow && _ctx.isHorizontalMenu)
              ? (openBlock(), createBlock(_component_menus, {
                  key: 0,
                  mode: "horizontal"
                }))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        (_ctx.isBreadcrumbsShow)
          ? (openBlock(), createBlock(_component_breadcrumbs, {
              key: 0,
              onOnBreadcrumbsChange: _ctx.handleBreadcrumbsChange
            }, null, 8, ["onOnBreadcrumbsChange"]))
          : createCommentVNode("", true)
      ]),
      createBaseVNode("div", {
        class: normalizeClass(["main", { pt0: _ctx.isBreadcrumbsShow && _ctx.paddingFlag }])
      }, [
        createVNode(_component_Content)
      ], 2)
    ], 2)
  ], 2))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-0ca6ff1b"]]);

export { index as default };
