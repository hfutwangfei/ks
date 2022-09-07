import { d as defineComponent, j as reactive, h as computed, l as ref, F as toRefs, o as openBlock, B as createElementBlock, C as createBaseVNode, Y as normalizeClass, a as createVNode, w as withCtx, $ as getCurrentInstance, W as pushScopeId, X as popScopeId, r as resolveComponent, I as withDirectives, a0 as vShow, N as createTextVNode, O as toDisplayString } from './element-plus.da98f360.js';
import { _ as _export_sfc, b as useStore, u as useRouter, L as Login, U as UE } from './index.acc4a696.js';
import './monaco-editor.e9574fd0.js';

var _imports_0 = "/assets/bg-login2.328b103b.png";

var _imports_1 = "/assets/logo.0b37d177.png";

var _imports_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAP1BMVEVHcExRUWJSWGhRV2VSWGZSWWVJUmRRWGZRWGVRV2VRWGZRWGVRV2ZSV2ZQWWZSV2VSV2ZRWGZRWGZSV2ZSWGUI1JfJAAAAFXRSTlMADi79ZR8HoOLwTLGDmDnKkdi+WnZWxFNsAAAAl0lEQVR4AX2RW7KGIAyDy+WUlqrgZf9rPbYo4v9gHsjMV1IyA3xr33/JH0BKZg8qa4NUOva83Tc39o05EjWFAELO4NS8QUeTGnKEB0JkPM8luBG6sOiI2urJcmcDDcb1XXlVmPkNOWvz4Efmg/Uv8wjnYpbtvUtLyNeQ+gJPdwwTH9oY8OCEPRSJpVZh69iFuYrUjB+f8A8F5QP6PldkMAAAAABJRU5ErkJggg==";

var _imports_3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAPFBMVEVHcExSWGVRV2VSWGVQWmVSV2ZTWGZRV2ZRWGZJWlpRV2VRV2ZSWWdQVWNSV2ZRV2ZSWWdSWGdRWWZSWGYxqIGYAAAAE3RSTlMAzI52GLxf9n4LretKL1jbj2+MixBq8AAAAIlJREFUeAF9keEOgyAMhEeFXgsCKu//rnOgW3XZ7s8lX9JrL338k5cYxV/ZjEpUMVuWIS8TZANjGB6igakML8nAM2yGga5H7qHOwDX1a3xa7fpQi2qp4XKnbmgNm94qac435Fm62BSdABd2OWB6s0bHpFI7qAd9hggjgWE2KPi7xlmOFwsX/vGGJxJyA6PVz7JJAAAAAElFTkSuQmCC";

var _imports_4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAQlBMVEVHcExSWGVQUGZSV2ZSWGZSWGZRWGZRV2ZRWGZRV2ZRV2VPT1dRWGZRV2VSV2ZRWGVRV2ZSWGVSV2ZSV2ZSVmNPV2czcRa7AAAAFnRSTlMANwxzv2iL+UiA1gaX5bL17aLMWBwgQctwKAAAAI9JREFUeAGF0UsOxCAIBmBUBEWr9jH3v+pg5qF2UzYlX+hPiPBQVyyFzGq+ChFyTpOd7PrHbHlY2ujTGB4JoVqFtgPgGHVHj+UGQDhQeobXX3MZu9l+O4n/SP61nq/FdNZG9otFlqNu52Qm6YxzwU6WRDhM93ULr7wYoF5R2mqAuoRuBohxv5veihieHkDrDYpvBDQ/WXOuAAAAAElFTkSuQmCC";

var _imports_5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAM1BMVEVHcEymqK6lqK6lqK2lqK2lqK2lqK2lqK2jqaukq62lqK2lqK2lqa2lqK2lqa2kp6ylqK3/md73AAAAEXRSTlMAK02Z86y8/GIbi9B5a14+25O6M1kAAAChSURBVHgBjZBZrsYgCIWxgIhj97/aCw7tTf6XmtTgB4dDgW+nh1+WpJ9QK5cSqxpLB7GU3FqO+rKLyjhaujaT7G9Mrs0yaaBqdyQ2bQPI5O6R7WoWmnamI8AQzzC6Fu0NQYZ9alGdvsgbAsflm6x733JQ72T9EMkLlxGM4nUXog+Da6SpxT1yoZcx3f6bt7A+LIE2WwjXg6A/O/h3Qv+2/D8BEATWdbVw8gAAAABJRU5ErkJggg==";

var _imports_6 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAKlBMVEVHcEykp6ylqa6lqK2lqK2lqK2lqKylqK2lqK2lqK2goKClqq6kqa6mpq1X8fn2AAAADnRSTlMAEWayzXLx45e9BSQvS0LQjZsAAACRSURBVHgBjY6tCgJBFIW/FbbsKiwiK9sUwQcQ8SeKL7BRbGtRMVmEAZtoF4NgmmKwTTLbrD6S9zJFi3jSF8797uGfVLvjpqdwvp9scqXg3ICSSQRrx6jVsdlIcGhvi8MlOklzTdvFM+o56YMB7CgXpC+PlYJw5Qt30fWdnsXGQrZV2VNlQW8K12Xy/fhzzu+8AX5jHcjlYAOPAAAAAElFTkSuQmCC";

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".login[data-v-69b6708a]{-webkit-transition:-webkit-transform 1s;transition:-webkit-transform 1s;transition:transform 1s;transition:transform 1s,-webkit-transform 1s;-webkit-transform:scale(1);transform:scale(1);width:100%;height:100%;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex}.login .left[data-v-69b6708a]{-webkit-box-flex:0;-ms-flex:0 0 62.5%;flex:0 0 62.5%;position:relative;background:#fff}.login .left .bg-login[data-v-69b6708a]{width:100%;height:100%}.login .left .bg-login.is-loading[data-v-69b6708a]{-webkit-filter:blur(.2em);filter:blur(.2em)}.login .left .logo[data-v-69b6708a]{position:absolute;top:.208333rem;left:.208333rem;width:1.916667rem}.login .right[data-v-69b6708a]{-webkit-box-flex:0;-ms-flex:0 0 37.5%;flex:0 0 37.5%;background:#fff;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.login .right .icon-power[data-v-69b6708a]{position:absolute;right:.104167rem;top:.104167rem;cursor:pointer}.login .right .form[data-v-69b6708a]{width:2.25rem;max-width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.login .right .form .title[data-v-69b6708a]{color:#1f242e;font-size:.208333rem;font-weight:700;margin:0 0 .416667rem}.login .right .form .text[data-v-69b6708a]{font-size:.083333rem;height:.333333rem;line-height:.333333rem;background:rgb(242,242,244);border-radius:.020833rem}.login .right .form .text[data-v-69b6708a] .el-input__wrapper{padding:0}.login .right .form .text[data-v-69b6708a] .el-input__wrapper .el-input__inner{color:#000}.login .right .form .btn[data-v-69b6708a]{width:100%;height:.333333rem;background:#428fff;-webkit-box-shadow:.026042rem .041667rem .078125rem 0 rgba(141,145,153,.43);box-shadow:.026042rem .041667rem .078125rem #8d91996e;border-radius:.020833rem}.login .right .form[data-v-69b6708a] .el-form-item__label{padding:0 0 .083333rem;line-height:1}.login .right .form[data-v-69b6708a] .el-form-item{margin-bottom:.166667rem}.login .right .form[data-v-69b6708a] .el-input__prefix{padding:0 .104167rem}.login .right .form[data-v-69b6708a] .el-input__prefix img{width:.104167rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.login .right .form[data-v-69b6708a] .el-input__suffix{padding:0 .104167rem}.login .right .form[data-v-69b6708a] .el-input__suffix img{width:.104167rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.login .right .form .btn-form-item[data-v-69b6708a]{margin-bottom:0}.login .right .form .pwd-form-item[data-v-69b6708a]{margin-bottom:.416667rem}\n")();

const _sfc_main = defineComponent({
  name: 'login',
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const store = useStore();
    const router = useRouter();
    // const route = useRoute()
    const state = reactive({
      pwdType: 'password',
      model: {
        // username: '',
        // password: '',
        username: 'user',
        password: 'Haier-test!@',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur',
          },
        ],
      },
      isBgLoading: true,
      loading: false,
      btnText: computed(() => (state.loading ? '登录中...' : '登 录')),
      loginForm: ref(null),
      changePwdType: () => {
        state.pwdType === 'password'
          ? (state.pwdType = '')
          : (state.pwdType = 'password');
      },
      submit: () => {
        if (state.loading) {
          return
        }
        state.loginForm.validate(async valid => {
          if (valid) {
            state.loading = true;
            const { code, data } = await Login(state.model);
            if (+code === 1) {
              ctx.$message.success({
                message: '登录成功',
                duration: 1000,
              });

              // const targetPath = decodeURIComponent(route.query.redirect)
              // if (targetPath.startsWith('http')) {
              //   // 如果是一个url地址
              //   window.location.href = targetPath
              // } else if (targetPath.startsWith('/')) {
              //   // 如果是内部路由地址
              //   router.push(targetPath)
              // } else {
              //   router.push('/')
              // }

              // UE.publish('JS2UE_LoginState', { loginState: 1 })
              UE.publish('DestroyAll', {});

              router.push('/');

              store.dispatch('app/setToken', data);
            }
            state.loading = false;
          }
        });
      },
      loadBackgroundImg() {
        state.isBgLoading = false;
      },
      // 退出程序
      exit: () => {
        UE.publish('ApplicationQuit', {});
      },
    });

    return {
      ...toRefs(state),
    }
  },
});


const _withScopeId = n => (pushScopeId("data-v-69b6708a"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "login" };
const _hoisted_2 = { class: "left" };
const _hoisted_3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("img", {
  class: "logo",
  src: _imports_1,
  alt: ""
}, null, -1));
const _hoisted_4 = { class: "right" };
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("h1", { class: "title" }, "登 录", -1));
const _hoisted_6 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("img", { src: _imports_3 }, null, -1));
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("img", { src: _imports_4 }, null, -1));

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("img", {
        onLoad: _cache[0] || (_cache[0] = (...args) => (_ctx.loadBackgroundImg && _ctx.loadBackgroundImg(...args))),
        class: normalizeClass(['bg-login', _ctx.isBgLoading && 'is-loading']),
        src: _imports_0,
        alt: ""
      }, null, 34),
      _hoisted_3
    ]),
    createBaseVNode("div", _hoisted_4, [
      createBaseVNode("img", {
        class: "icon-power",
        src: _imports_2,
        alt: "",
        onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.exit && _ctx.exit(...args)))
      }),
      createVNode(_component_el_form, {
        class: "form",
        model: _ctx.model,
        rules: _ctx.rules,
        ref: "loginForm",
        "label-position": "top",
        "hide-required-asterisk": ""
      }, {
        default: withCtx(() => [
          _hoisted_5,
          createVNode(_component_el_form_item, {
            prop: "username",
            label: "用户名"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                class: "text",
                modelValue: _ctx.model.username,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.model.username) = $event)),
                placeholder: "请输入用户名"
              }, {
                prefix: withCtx(() => [
                  _hoisted_6
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            prop: "password",
            label: "密码",
            class: "pwd-form-item"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                class: "text",
                modelValue: _ctx.model.password,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.model.password) = $event)),
                type: _ctx.pwdType,
                placeholder: "请输入密码"
              }, {
                prefix: withCtx(() => [
                  _hoisted_7
                ]),
                suffix: withCtx(() => [
                  withDirectives(createBaseVNode("img", {
                    src: _imports_5,
                    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.changePwdType && _ctx.changePwdType(...args)))
                  }, null, 512), [
                    [vShow, !_ctx.pwdType]
                  ]),
                  withDirectives(createBaseVNode("img", {
                    src: _imports_6,
                    onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.changePwdType && _ctx.changePwdType(...args)))
                  }, null, 512), [
                    [vShow, _ctx.pwdType]
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "type"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { class: "btn-form-item" }, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                loading: _ctx.loading,
                type: "primary",
                class: "btn",
                onClick: _ctx.submit
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.btnText), 1)
                ]),
                _: 1
              }, 8, ["loading", "onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"])
    ])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-69b6708a"]]);

export { index as default };
