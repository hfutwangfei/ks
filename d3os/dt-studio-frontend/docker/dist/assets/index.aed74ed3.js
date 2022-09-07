import { ab as plus_default, j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, a1 as withKeys, L as Fragment, M as renderList, O as toDisplayString, c as createBlock, a3 as ElMessageBox, x as ElMessage, N as createTextVNode } from './element-plus.da98f360.js';
import { s as service, _ as _export_sfc, U as UE } from './index.acc4a696.js';
import { u as uploadCommonFile } from './index.79bebf24.js';
import './monaco-editor.e9574fd0.js';

// 获取扩展数据
const queryAppExpand = params => {
  return service({
    url: '/api/appExpand/queryAppExpand',
    method: 'get',
    params,
  })
};

// 新增扩展
const insertAppExpand = data => {
  return service({
    url: '/api/appExpand/insertAppExpand',
    method: 'post',
    data,
  })
};

// 修改扩展
const updateAppExpand = data => {
  return service({
    url: '/api/appExpand/updateAppExpand',
    method: 'put',
    data,
  })
};

// 删除扩展
const deleteAppExpand = params => {
  return service({
    url: '/api/appExpand/deleteAppExpand',
    method: 'delete',
    params,
  })
};

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-781828be]::-webkit-scrollbar{display:none}.expands[data-v-781828be]{padding:.104167rem;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.expands[data-v-781828be] .el-tabs__nav-wrap:after{height:.005208rem;background:#ffffff;opacity:.05}.expands[data-v-781828be] .el-tabs__active-bar{height:.005208rem;background:-webkit-gradient(linear,right top,left top,from(rgba(66,143,255,0)),color-stop(50%,#428fff),to(rgba(66,143,255,0)));background:linear-gradient(270deg,rgba(66,143,255,0) 0%,#428fff 50%,rgba(66,143,255,0) 100%)}.expands[data-v-781828be] .el-tabs__item{height:.130208rem;line-height:.078125rem;color:#fff9}.expands[data-v-781828be] .el-tabs__item.is-active{color:#428fff}.expands__top .search[data-v-781828be]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.expands__top .search .el-input[data-v-781828be]{width:1.25rem;font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.expands__top .search .el-input[data-v-781828be] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.expands__top .search .el-input[data-v-781828be] .el-input__inner::-moz-placeholder{color:#ffffff4d}.expands__top .search .el-input[data-v-781828be] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.expands__top .search .el-input[data-v-781828be] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.expands__top .search .el-input[data-v-781828be] .el-input__inner::placeholder{color:#ffffff4d}.expands__top .search .el-button[data-v-781828be]{margin-left:.083333rem;padding:0;width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff;background:none}.expands__top .create[data-v-781828be]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.expands__top .create .el-button[data-v-781828be]{padding:0;width:.541667rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem}.expands__ul[data-v-781828be]{margin:.104167rem 0;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:start;align-content:flex-start;gap:.104167rem}.expands__ul .expand[data-v-781828be]{padding:.083333rem;width:calc(20% - .083333rem);background:#373b48;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:.020833rem;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:.083333rem}.expands__ul .expand .image[data-v-781828be]{width:.625rem;height:.625rem}.expands__ul .expand__content[data-v-781828be]{margin-left:.083333rem;-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.expands__ul .expand__content .btns[data-v-781828be]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.expands__ul .expand__content .btns .btn[data-v-781828be]{margin-left:.083333rem}.expands__ul .expand__content .btns .btn .svg-img[data-v-781828be]{width:.104167rem;height:.104167rem}.expands__ul .expand__top[data-v-781828be]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.expands__bottom[data-v-781828be]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.expands__bottom[data-v-781828be] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.expands__bottom[data-v-781828be] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.expands__bottom[data-v-781828be] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.expands__bottom[data-v-781828be] .el-pagination .btn-prev,.expands__bottom[data-v-781828be] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}\n")();

var index_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".t-dialog .expand_icon .uploader .el-upload{border-radius:.03125rem;border:1px dashed rgba(255,255,255,.14)}.t-dialog .expand_icon .uploader img{display:block;width:.416667rem;height:.416667rem}.t-dialog .expand_icon .uploader__icon{width:.416667rem;height:.416667rem;font-size:.114583rem;color:#8c939d;text-align:center}\n")();

const _sfc_main = {
  components: {
    Plus: plus_default,
  },
  setup() {
    const state = reactive({
      currentStatus: 0,
      applicationName: '',
      editType: 0,
      expandList: [],
      current: 1,
      total: 0,
      dialogVisible: false,
      expandForm: {},
      size: 10,
    });
    const methods = {
      async getList() {
        let { data } = await queryAppExpand({
          applicationName: state.applicationName,
          currentStatus: state.currentStatus,
          current: state.current,
          size: state.size,
        });
        state.expandList = data.records;
        state.total = data.total;
      },
      change(num) {
        state.current = num;
        methods.getList();
      },
      link(url) {
        UE.publish('JS2UE_OpenURL', {
          url,
        });
      },
      async changeImg(uploadFile) {
        let { raw } = uploadFile;
        let { data } = await uploadCommonFile(raw);
        state.expandForm.applicationIcon = data.downloadUrl;
      },
      add() {
        state.editType = 0;
        state.expandForm = {};
        state.dialogVisible = true;
      },
      edit(form) {
        state.editType = 1;
        state.expandForm = { ...form };
        state.dialogVisible = true;
      },
      async changeStatus(expand) {
        await updateAppExpand(expand);
      },
      async submit() {
        let fn = state.editType == 0 ? insertAppExpand : updateAppExpand;
        await fn(state.expandForm);
        state.dialogVisible = false;
        methods.getList();
      },
      del(id) {
        ElMessageBox.confirm(
          '卸载应用以后，也可以打开开关再次添加应用。',
          '是否确认将扩展应用从系统中卸载',
          {
            confirmButtonText: '确 认',
            cancelButtonText: '取 消',
            type: 'warning',
          }
        )
          .then(async () => {
            await deleteAppExpand({ id });
            ElMessage({
              type: 'success',
              message: '删除成功',
            });
            methods.getList();
          })
          .catch(e => {
            console.log(e);
          });
      },
    };

    onMounted(() => {
      methods.getList();
    });

    return {
      ...toRefs(state),
      ...methods,
    }
  },
};
const _hoisted_1 = { class: "expands" };
const _hoisted_2 = /*#__PURE__*/createTextVNode("查 询");
const _hoisted_3 = /*#__PURE__*/createTextVNode(" 添加 ");
const _hoisted_4 = { class: "expands__ul" };
const _hoisted_5 = ["src", "onClick"];
const _hoisted_6 = { class: "expand__content" };
const _hoisted_7 = { class: "expand__top" };
const _hoisted_8 = { class: "btns" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "expands__bottom" };
const _hoisted_12 = ["src"];
const _hoisted_13 = /*#__PURE__*/createTextVNode("服务");
const _hoisted_14 = /*#__PURE__*/createTextVNode("接口");
const _hoisted_15 = { class: "dialog-footer" };
const _hoisted_16 = /*#__PURE__*/createTextVNode(" 确 定 ");
const _hoisted_17 = /*#__PURE__*/createTextVNode("取 消");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tab_pane = resolveComponent("el-tab-pane");
  const _component_el_tabs = resolveComponent("el-tabs");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_Plus = resolveComponent("Plus");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createVNode(_component_el_tabs, {
        modelValue: _ctx.currentStatus,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.currentStatus) = $event)),
        onTabChange: _ctx.getList
      }, {
        default: withCtx(() => [
          createVNode(_component_el_tab_pane, {
            label: "所有",
            name: 0
          }),
          createVNode(_component_el_tab_pane, {
            label: "已安装",
            name: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "onTabChange"]),
      createVNode(_component_el_row, {
        class: "expands__top",
        justify: "space-between"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_col, {
            span: 5,
            class: "search"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: _ctx.applicationName,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.applicationName) = $event)),
                placeholder: "请输入搜索条件",
                onKeyup: withKeys(_ctx.getList, ["enter"])
              }, null, 8, ["modelValue", "onKeyup"]),
              createVNode(_component_el_button, {
                type: "primary",
                plain: "",
                onClick: _ctx.getList
              }, {
                default: withCtx(() => [
                  _hoisted_2
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_el_col, {
            span: 2,
            class: "create"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                onClick: _ctx.add
              }, {
                default: withCtx(() => [
                  _hoisted_3
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createBaseVNode("div", _hoisted_4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.expandList, (item) => {
          return (openBlock(), createElementBlock("div", {
            class: "expand",
            key: item.id
          }, [
            createBaseVNode("img", {
              class: "image",
              src: item.applicationIcon,
              onClick: $event => (_ctx.link(item.targetUrl))
            }, null, 8, _hoisted_5),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("span", null, toDisplayString(item.applicationName), 1),
                createVNode(_component_el_switch, {
                  modelValue: item.currentStatus,
                  "onUpdate:modelValue": $event => ((item.currentStatus) = $event),
                  "active-value": 1,
                  "inactive-value": 0,
                  onChange: $event => (_ctx.changeStatus(item))
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
              ]),
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", {
                  class: "btn",
                  onClick: $event => (_ctx.edit(item))
                }, [
                  createVNode(_component_svg_icon, {
                    name: "drafts-edit",
                    class: "svg-img"
                  })
                ], 8, _hoisted_9),
                createBaseVNode("div", {
                  class: "btn",
                  onClick: $event => (_ctx.del(item.id))
                }, [
                  createVNode(_component_svg_icon, {
                    name: "drafts-delete",
                    class: "svg-img"
                  })
                ], 8, _hoisted_10)
              ])
            ])
          ]))
        }), 128))
      ]),
      createBaseVNode("div", _hoisted_11, [
        createVNode(_component_el_pagination, {
          "page-size": _ctx.size,
          background: "",
          layout: "total, prev, pager, next",
          total: _ctx.total,
          onCurrentChange: _ctx.change
        }, null, 8, ["page-size", "total", "onCurrentChange"])
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.dialogVisible) = $event)),
      title: `${_ctx.editType == 0 ? '添加' : '编辑'}扩展`,
      width: 640,
      "custom-class": "t-dialog"
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_15, [
          createVNode(_component_el_button, {
            type: "primary",
            onClick: _ctx.submit
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            onClick: _cache[7] || (_cache[7] = $event => (_ctx.dialogVisible = false)),
            plain: ""
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          model: _ctx.expandForm,
          "label-width": "106px",
          "label-position": "right"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "应用名称" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.expandForm.applicationName,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.expandForm.applicationName) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "版本" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.expandForm.buildVersion,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.expandForm.buildVersion) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "应用图标",
              class: "expand_icon"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_upload, {
                  class: "uploader",
                  action: "",
                  "show-file-list": false,
                  "auto-upload": false,
                  "on-change": _ctx.changeImg
                }, {
                  default: withCtx(() => [
                    (_ctx.expandForm.applicationIcon)
                      ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          src: _ctx.expandForm.applicationIcon
                        }, null, 8, _hoisted_12))
                      : (openBlock(), createBlock(_component_el_icon, {
                          key: 1,
                          class: "uploader__icon"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Plus)
                          ]),
                          _: 1
                        }))
                  ]),
                  _: 1
                }, 8, ["on-change"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "类别" }, {
              default: withCtx(() => [
                createVNode(_component_el_radio_group, {
                  modelValue: _ctx.expandForm.applicationType,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.expandForm.applicationType) = $event))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_radio, { label: 0 }, {
                      default: withCtx(() => [
                        _hoisted_13
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio, { label: 1 }, {
                      default: withCtx(() => [
                        _hoisted_14
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "应用地址" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.expandForm.targetUrl,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.expandForm.targetUrl) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "描述" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.expandForm.applicationDesc,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.expandForm.applicationDesc) = $event))
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-781828be"]]);

export { index as default };
