import { _ as _export_sfc, c as store, u as useRouter, a as useRoute } from './index.acc4a696.js';
import { G as GetCompanyInfoList, l as GetMenuAuthorization, m as GetRoleInfo, n as CreateRole, o as UpdateRole } from './systemSetting.9e7fc686.js';
import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, O as toDisplayString, a as createVNode, w as withCtx, c as createBlock, G as createCommentVNode, $ as getCurrentInstance, N as createTextVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var detail_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip] .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader .el-cascader-node__label{color:#fff}.system-setting-cascader .el-cascader-node:not(.is-disabled):hover,.system-setting-cascader .el-cascader-node:not(.is-disabled):focus{background:#428fff}.system-setting-cascader .el-cascader-panel .el-radio{width:100%;height:100%;z-index:10;position:absolute;right:-.052083rem}.system-setting-select.el-select__popper.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-select.el-popper.is-light .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important;border-bottom-color:transparent!important;border-right-color:transparent!important}.system-setting-select .el-select-dropdown__item{color:#fff}.system-setting-select .el-select-dropdown__item.hover,.system-setting-select .el-select-dropdown__item:hover{background:#428fff}.system-role-detail-page{min-height:100%;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0 .104167rem}.system-role-detail-page .title{font-size:.083333rem;font-weight:700;color:#fff;padding:.104167rem 0 .166667rem}.system-role-detail-page .btn{width:.427083rem;height:.166667rem;border-radius:.020833rem;font-size:.072917rem}.system-role-detail-page .btn.btn-add{border:1px solid #428fff;background:#428fff;color:#fff}.system-role-detail-page .btn.btn-cancel{border:1px solid rgba(255,255,255,.6);background:transparent;color:#fff9;margin-left:.083333rem}.system-role-detail-page .form{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:0 auto}.system-role-detail-page .form .demo-form-inline{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;min-height:84vh}.system-role-detail-page .form .demo-form-inline .top{-webkit-box-flex:1;-ms-flex:1;flex:1}.system-role-detail-page .form .demo-form-inline .top .el-form-item{margin-bottom:.104167rem}.system-role-detail-page .form .demo-form-inline .top .el-form-item__label{font-size:.0625rem;color:#fff9;padding-right:.083333rem}.system-role-detail-page .form .demo-form-inline .top .el-input,.system-role-detail-page .form .demo-form-inline .top .el-cascader{width:2.083333rem;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.system-role-detail-page .form .demo-form-inline .top .el-input .el-input__inner,.system-role-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner{background:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff;font-size:.0625rem;text-align:left}.system-role-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-webkit-input-placeholder,.system-role-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.system-role-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-moz-placeholder,.system-role-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-moz-placeholder{color:#ffffff4d}.system-role-detail-page .form .demo-form-inline .top .el-input .el-input__inner:-ms-input-placeholder,.system-role-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.system-role-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-ms-input-placeholder,.system-role-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.system-role-detail-page .form .demo-form-inline .top .el-input .el-input__inner::placeholder,.system-role-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::placeholder{color:#ffffff4d}.system-role-detail-page .form .demo-form-inline .top .el-input-number{width:2.083333rem}.system-role-detail-page .form .demo-form-inline .top .el-input-number.is-controls-right .el-input-number__increase{background:transparent;border-bottom:none;border-left:none}.system-role-detail-page .form .demo-form-inline .top .el-input-number.is-controls-right .el-input-number__decrease{background:transparent;border-left:none}.system-role-detail-page .form .demo-form-inline .bottom{-webkit-box-flex:0;-ms-flex:0 0 .583333rem;flex:0 0 .583333rem}.system-role-detail-page .form .demo-form-inline .bottom .el-form-item--default{margin-bottom:0}.system-role-detail-page .form .el-tree{background:transparent;width:100%;height:1.822917rem;overflow:auto}.system-role-detail-page .form .el-tree::-webkit-scrollbar{width:.041667rem}.system-role-detail-page .form .el-tree::-webkit-scrollbar-track{background:rgb(239,239,239);border-radius:.052083rem}.system-role-detail-page .form .el-tree::-webkit-scrollbar-thumb{background:#bfbfbf;border-radius:.052083rem}.system-role-detail-page .form .el-tree-node__label{font-size:.0625rem;color:#fff}.system-role-detail-page .form .el-checkbox__inner{background:transparent;border:1px solid rgba(255,255,255,.15)}.system-role-detail-page .form .el-tree-node:focus>.el-tree-node__content{background-color:transparent}.system-role-detail-page .form .el-tree-node__content:hover{background-color:transparent}\n")();

const { userinfo } = store.state.account;

const _sfc_main = {
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const router = useRouter();
    const route = useRoute();
    let state = reactive({
      userType: userinfo.userType,
      companyId: userinfo.companyId,
      type: route.query.type,
      code: route.query.code,
      editId: '',
      props1: {
        checkStrictly: true,
        value: 'id',
        label: 'companyName',
        emitPath: false,
        expandTrigger: 'hover',
      },
      orgList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      menuList: [],
      formInline: {
        type: 0, // 0平台端，1租户端
        roleName: '',
        companyId: '',
        description: '',
        permissions: '',
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
        companyId: [
          {
            required: true,
            message: '请选择所属组织',
            trigger: 'change',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入备注信息',
            trigger: 'blur',
          },
        ],
      },
      // 获取组织列表
      getOrgList: async () => {
        const { code, data } = await GetCompanyInfoList({
          companyId: state.userType == 0 ? '' : state.companyId, // 平台端不传，租户端要传
        });
        state.orgList = +code === 1 ? data : [];
      },
      orgChange() {
        if (state.userType == 0) {
          ctx.$refs.cascader.popperVisible = false;
        }
      },
      // 获取授权菜单
      getMenuList: async permissions => {
        // admin登录，分类选择平台管理员，type=0 & (source=null || source=0)
        // admin登录，分类选择租户，type=1 & source=0
        // 租户端登录，type=1 & source=1
        let type = null,
          source = null;
        if (state.userType == 0) {
          // admin
          type = state.formInline.type == 0 ? 0 : 1;
          source = 0;
        } else {
          // 租户端
          type = 1;
          source = 1;
        }
        const { code, data } = await GetMenuAuthorization({
          type,
          source,
        });
        state.menuList = +code === 1 ? data : [];
        if (permissions && permissions.length) {
          ctx.$refs.menuTree.setCheckedKeys(permissions, false);
        }
      },
      // 分类改变
      classificationChange(v) {
        state.getMenuList();
      },
      // 获取角色信息
      getRoleInfo: async () => {
        const { code, data } = await GetRoleInfo({
          code: state.code,
        });
        if (+code === 1) {
          state.editId = data.id;
          state.formInline.roleName = data.roleName;
          state.formInline.description = data.description;
          state.formInline.companyId = data.companyId;
          state.formInline.type = data.type;
        }
        state.getMenuList(data.permissions);
      },
      // 取消
      back: () => {
        router.push(`/system?from=jsgl`);
      },
      // 确定
      submitForm: () => {
        ctx.$refs.formRef.validate(valid => {
          if (valid) {
            let params = {
              roleName: state.formInline.roleName,
              description: state.formInline.description,
              companyId:
                state.userType == 0
                  ? state.formInline.companyId
                  : state.companyId,
              permissions: ctx.$refs.menuTree.getCheckedKeys(),
              roleType: state.userType == 0 ? 0 : 1,
              type:
                state.userType == 1 || state.userType == 2
                  ? 1
                  : state.formInline.type,
            };
            if (state.type == 'add') {
              state.add(params);
            } else {
              state.edit(params);
            }
          } else {
            return false
          }
        });
      },
      // 新增
      add: async params => {
        const { code } = await CreateRole({
          ...params,
        });
        if (+code === 1) {
          ctx.$message.success('创建成功');
          state.back();
        }
      },
      // 编辑
      edit: async params => {
        const { code } = await UpdateRole({
          ...params,
          id: state.editId,
        });
        if (+code === 1) {
          ctx.$message.success('修改成功');
          state.back();
        }
      },
    });
    onMounted(async () => {
      await state.getOrgList();
      if (state.type == 'add') {
        await state.getMenuList();
      } else {
        state.getRoleInfo();
      }
    });
    return {
      ...toRefs(state),
    }
  },
};

const _hoisted_1 = { class: "system-role-detail-page" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "form" };
const _hoisted_4 = { class: "top" };
const _hoisted_5 = /*#__PURE__*/createTextVNode("平台管理员");
const _hoisted_6 = /*#__PURE__*/createTextVNode("租户");
const _hoisted_7 = { class: "bottom" };
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 确 定 ");
const _hoisted_9 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_cascader = resolveComponent("el-cascader");
  const _component_el_tree = resolveComponent("el-tree");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.type == 'add' ? '新增' : _ctx.type == 'edit' ? '编辑' : '查看'), 1),
    createBaseVNode("div", _hoisted_3, [
      createVNode(_component_el_form, {
        ref: "formRef",
        model: _ctx.formInline,
        class: "demo-form-inline",
        rules: _ctx.rules,
        "label-width": "80px"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_4, [
            (_ctx.userType == 0)
              ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 0,
                  label: "分类"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_radio_group, {
                      modelValue: _ctx.formInline.type,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.formInline.type) = $event)),
                      onChange: _ctx.classificationChange
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_radio, { label: 0 }, {
                          default: withCtx(() => [
                            _hoisted_5
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_radio, { label: 1 }, {
                          default: withCtx(() => [
                            _hoisted_6
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onChange"])
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            createVNode(_component_el_form_item, {
              label: "角色名称",
              prop: "roleName"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.roleName,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.formInline.roleName) = $event)),
                  placeholder: "请输入角色名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            (_ctx.userType == 0)
              ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 1,
                  label: "所属组织",
                  prop: "companyId"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_cascader, {
                      options: _ctx.orgList,
                      props: _ctx.props1,
                      clearable: "",
                      modelValue: _ctx.formInline.companyId,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.formInline.companyId) = $event)),
                      "show-all-levels": false,
                      "popper-class": "system-setting-cascader",
                      ref: "cascader",
                      onChange: _ctx.orgChange
                    }, null, 8, ["options", "props", "modelValue", "onChange"])
                  ]),
                  _: 1
                }))
              : createCommentVNode("", true),
            createVNode(_component_el_form_item, {
              label: "备注",
              prop: "description"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.description,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.formInline.description) = $event)),
                  placeholder: "备注信息"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "菜单授权",
              prop: "permissions"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_tree, {
                  ref: "menuTree",
                  data: _ctx.menuList,
                  "show-checkbox": "",
                  "node-key": "id",
                  props: _ctx.defaultProps
                }, null, 8, ["data", "props"])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_7, [
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-add",
                  onClick: _cache[4] || (_cache[4] = $event => (_ctx.submitForm(_ctx.ruleFormRef)))
                }, {
                  default: withCtx(() => [
                    _hoisted_8
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-cancel",
                  onClick: _ctx.back
                }, {
                  default: withCtx(() => [
                    _hoisted_9
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["model", "rules"])
    ])
  ]))
}
var detail = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { detail as default };
