import { _ as _export_sfc, c as store, u as useRouter, a as useRoute } from './index.acc4a696.js';
import { G as GetCompanyInfoList, f as GetRoleList, g as GetUserInfo, C as CreateUser, h as UpdateUser } from './systemSetting.9e7fc686.js';
import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, O as toDisplayString, a as createVNode, w as withCtx, L as Fragment, M as renderList, c as createBlock, $ as getCurrentInstance, N as createTextVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var detail_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip] .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader .el-cascader-node__label{color:#fff}.system-setting-cascader .el-cascader-node:not(.is-disabled):hover,.system-setting-cascader .el-cascader-node:not(.is-disabled):focus{background:#428fff}.system-setting-cascader .el-cascader-panel .el-radio{width:100%;height:100%;z-index:10;position:absolute;right:-.052083rem}.system-setting-select.el-select__popper.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-select.el-popper.is-light .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important;border-bottom-color:transparent!important;border-right-color:transparent!important}.system-setting-select .el-select-dropdown__item{color:#fff}.system-setting-select .el-select-dropdown__item.hover,.system-setting-select .el-select-dropdown__item:hover{background:#428fff}.system-user-detail-page{min-height:100%;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0 .104167rem}.system-user-detail-page .title{font-size:.083333rem;font-weight:700;color:#fff;padding:.104167rem 0 .166667rem}.system-user-detail-page .btn{width:.427083rem;height:.166667rem;border-radius:.020833rem;font-size:.072917rem}.system-user-detail-page .btn.btn-add{border:1px solid #428fff;background:#428fff;color:#fff}.system-user-detail-page .btn.btn-cancel{border:1px solid rgba(255,255,255,.6);background:transparent;color:#fff9;margin-left:.083333rem}.system-user-detail-page .form{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:0 auto}.system-user-detail-page .form .demo-form-inline{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.system-user-detail-page .form .demo-form-inline .top{-webkit-box-flex:1;-ms-flex:1;flex:1}.system-user-detail-page .form .demo-form-inline .top .el-form-item{margin-bottom:.104167rem}.system-user-detail-page .form .demo-form-inline .top .el-form-item__label{font-size:.0625rem;color:#fff9;padding-right:.083333rem}.system-user-detail-page .form .demo-form-inline .top .el-input,.system-user-detail-page .form .demo-form-inline .top .el-cascader{width:2.083333rem;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.system-user-detail-page .form .demo-form-inline .top .el-input .el-input__inner,.system-user-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner{background:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff;font-size:.0625rem;text-align:left}.system-user-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-webkit-input-placeholder,.system-user-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.system-user-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-moz-placeholder,.system-user-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-moz-placeholder{color:#ffffff4d}.system-user-detail-page .form .demo-form-inline .top .el-input .el-input__inner:-ms-input-placeholder,.system-user-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.system-user-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-ms-input-placeholder,.system-user-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.system-user-detail-page .form .demo-form-inline .top .el-input .el-input__inner::placeholder,.system-user-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::placeholder{color:#ffffff4d}.system-user-detail-page .form .demo-form-inline .top .el-input-number{width:2.083333rem}.system-user-detail-page .form .demo-form-inline .top .el-input-number.is-controls-right .el-input-number__increase{background:transparent;border-bottom:none;border-left:none}.system-user-detail-page .form .demo-form-inline .top .el-input-number.is-controls-right .el-input-number__decrease{background:transparent;border-left:none}.system-user-detail-page .form .demo-form-inline .bottom{-webkit-box-flex:0;-ms-flex:0 0 .583333rem;flex:0 0 .583333rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.system-user-detail-page .form .state-tip{font-size:.072917rem;color:#fff;margin-left:.041667rem}\n")();

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
        // emitPath: false,
        expandTrigger: 'hover',
      },
      orgList: [],
      roleList: [],
      formInline: {
        loginName: '',
        companyId: '',
        password: '',
        repwd: '',
        realname: '',
        mobile: '',
        email: '',
        sex: 0, // 0男  1女
        roleId: '',
        state: 0, // 0可用  1禁用
      },
      rules: {
        loginName: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              let myreg = /^[a-zA-Z0-9_-]+$/;
              if (!myreg.test(value)) {
                callback(new Error('用户名限定字母数字 - _'));
              } else {
                callback();
              }
            },
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
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          // {
          //   validator: (rule, value, callback) => {
          //     // let myreg = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
          //     let myreg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[a-zA-Z0-9\d~!@#$%^&*]{8,}$/
          //     if (!myreg.test(value)) {
          //       callback(
          //         new Error(
          //           '密码必须包含大小写字母和数字,可使用特殊字符~!@#$%^&*,长度不小于8'
          //         )
          //       )
          //     } else {
          //       callback()
          //     }
          //   },
          //   trigger: 'blur',
          // },
        ],
        repwd: [
          {
            required: true,
            message: '请再次确认密码',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (value !== state.formInline.password) {
                callback(new Error('请再次确认密码'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
        realname: [
          {
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
              if (!myreg.test(value)) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            },
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
      // 获取角色列表
      getRolePage: async type => {
        let companyId = '';
        if (type == 'init') {
          if (state.userType == 0) {
            // 平台端
            companyId = state.formInline.companyId;
          } else {
            companyId =
              state.orgList && state.orgList.length
                ? state.orgList[0].id
                : state.companyId;
          }
        } else {
          companyId = state.userType == 0 ? '' : state.companyId;
          if (state.formInline.companyId && state.formInline.companyId.length) {
            companyId = state.formInline.companyId[0];
          }
        }
        const { code, data } = await GetRoleList({
          companyId,
          roleType: state.userType == 0 ? 0 : 1, // 角色类型，0管理员角色，1租户角色
        });
        state.roleList = +code === 1 ? data : [];
      },
      // 组织改变
      orgChange() {
        if (state.userType == 0) {
          state.formInline.roleId = '';
          state.getRolePage();
        }
        ctx.$refs.cascader.popperVisible = false;
      },
      // 角色改变
      roleChange(id) {
        if (!id) {
          return
        }
        if (state.userType == 1 || state.userType == 2) {
          return
        }
        let role = state.roleList.find(item => item.id == id);
        state.formInline.companyId = role.companyId;
        ctx.$refs.formRef.clearValidate('companyId');
      },
      // 获取用户信息
      getUserInfo: async () => {
        const { code, data } = await GetUserInfo({
          code: state.code,
        });
        if (+code === 1) {
          state.formInline.loginName = data.loginName;
          state.formInline.companyId = data.companyId;
          state.formInline.password = '******';
          state.formInline.repwd = '******';
          state.formInline.realname = data.realname;
          state.formInline.mobile = data.mobile;
          state.formInline.email = data.email;
          state.formInline.sex = data.sex;
          state.formInline.roleId = data.roleId;
          state.formInline.state = data.state;
          state.editId = data.id;
        }
        state.getRolePage('init');
      },
      // 取消
      back: () => {
        router.push(`/system?from=yhgl`);
      },
      // 确定
      submitForm: () => {
        ctx.$refs.formRef.validate(valid => {
          if (valid) {
            let form = {};
            Object.assign(form, state.formInline);
            delete form['repwd'];
            if (typeof form.companyId != 'number') {
              form.companyId =
                form.companyId && form.companyId.length
                  ? form.companyId[form.companyId.length - 1]
                  : '';
            }
            if (state.type == 'add') {
              state.add({ ...form });
            } else {
              state.edit({ ...form });
            }
          } else {
            return false
          }
        });
      },
      // 新增
      add: async params => {
        // admin登录，companyId为1，userType=0
        // admin登录，companyId不为1，userType=1
        // 租户管理员和租户登录，userType=2
        let userType2 = null;
        if (state.userType == 0) {
          // admin
          userType2 = state.formInline.companyId == 1 ? 0 : 1;
        } else {
          // 租户端
          userType2 = 2;
        }
        const { code } = await CreateUser({
          ...params,
          userType: userType2,
        });
        if (+code === 1) {
          ctx.$message.success('创建成功');
          state.back();
        }
      },
      // 编辑
      edit: async params => {
        const { code } = await UpdateUser({
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
      if (state.type != 'add') {
        await state.getUserInfo();
      } else {
        await state.getRolePage();
      }
    });
    return {
      ...toRefs(state),
    }
  },
};

const _hoisted_1 = { class: "system-user-detail-page" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "form" };
const _hoisted_4 = { class: "top" };
const _hoisted_5 = /*#__PURE__*/createTextVNode(" 男 ");
const _hoisted_6 = /*#__PURE__*/createTextVNode(" 女 ");
const _hoisted_7 = { class: "state-tip" };
const _hoisted_8 = { class: "bottom" };
const _hoisted_9 = /*#__PURE__*/createTextVNode(" 确 定 ");
const _hoisted_10 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_cascader = resolveComponent("el-cascader");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_switch = resolveComponent("el-switch");
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
            createVNode(_component_el_form_item, {
              label: "登录名称",
              prop: "loginName"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.loginName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.formInline.loginName) = $event)),
                  placeholder: "请输入登录名称",
                  disabled: _ctx.type == 'view' || _ctx.type == 'edit'
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "所属组织",
              prop: "companyId"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_cascader, {
                  options: _ctx.orgList,
                  props: _ctx.props1,
                  clearable: "",
                  modelValue: _ctx.formInline.companyId,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.formInline.companyId) = $event)),
                  "show-all-levels": false,
                  disabled: _ctx.type == 'view',
                  onChange: _ctx.orgChange,
                  "popper-class": "system-setting-cascader",
                  ref: "cascader"
                }, null, 8, ["options", "props", "modelValue", "disabled", "onChange"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "密码",
              prop: "password"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  type: "password",
                  modelValue: _ctx.formInline.password,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.formInline.password) = $event)),
                  placeholder: "请输入密码",
                  disabled: _ctx.type == 'view'
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "确认密码",
              prop: "repwd"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  type: "password",
                  modelValue: _ctx.formInline.repwd,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.formInline.repwd) = $event)),
                  placeholder: "请再次确认密码",
                  disabled: _ctx.type == 'view'
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "用户名",
              prop: "realname"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.realname,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.formInline.realname) = $event)),
                  placeholder: "请输入真实姓名",
                  disabled: _ctx.type == 'view'
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "手机号码",
              prop: "mobile"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.mobile,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.formInline.mobile) = $event)),
                  placeholder: "请输入手机号",
                  disabled: _ctx.type == 'view'
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "邮件地址",
              prop: "email"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.email,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.formInline.email) = $event)),
                  placeholder: "请输入邮件地址",
                  disabled: _ctx.type == 'view'
                }, null, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "性别",
              prop: "sex"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_radio, {
                  modelValue: _ctx.formInline.sex,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((_ctx.formInline.sex) = $event)),
                  label: 0,
                  disabled: _ctx.type == 'view'
                }, {
                  default: withCtx(() => [
                    _hoisted_5
                  ]),
                  _: 1
                }, 8, ["modelValue", "disabled"]),
                createVNode(_component_el_radio, {
                  modelValue: _ctx.formInline.sex,
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.formInline.sex) = $event)),
                  label: 1,
                  disabled: _ctx.type == 'view'
                }, {
                  default: withCtx(() => [
                    _hoisted_6
                  ]),
                  _: 1
                }, 8, ["modelValue", "disabled"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "角色配置",
              prop: "roleId"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  modelValue: _ctx.formInline.roleId,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((_ctx.formInline.roleId) = $event)),
                  placeholder: "请选择",
                  disabled: _ctx.type == 'view',
                  onChange: _ctx.roleChange,
                  clearable: "",
                  "popper-class": "system-setting-select"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.roleList, (item) => {
                      return (openBlock(), createBlock(_component_el_option, {
                        key: item.id,
                        label: item.roleName,
                        value: item.id
                      }, null, 8, ["label", "value"]))
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "disabled", "onChange"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "状态",
              prop: "state"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_switch, {
                  "active-value": 0,
                  "inactive-value": 1,
                  modelValue: _ctx.formInline.state,
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((_ctx.formInline.state) = $event)),
                  disabled: _ctx.type == 'view'
                }, null, 8, ["modelValue", "disabled"]),
                createBaseVNode("span", _hoisted_7, toDisplayString(_ctx.formInline.state == 1 ? '关' : '开'), 1)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_8, [
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-add",
                  onClick: _cache[11] || (_cache[11] = $event => (_ctx.submitForm(_ctx.ruleFormRef))),
                  disabled: _ctx.type == 'view'
                }, {
                  default: withCtx(() => [
                    _hoisted_9
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-cancel",
                  onClick: _ctx.back
                }, {
                  default: withCtx(() => [
                    _hoisted_10
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
