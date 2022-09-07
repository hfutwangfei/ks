import { _ as _export_sfc, c as store, u as useRouter, a as useRoute } from './index.acc4a696.js';
import { G as GetCompanyInfoList, i as GetCompanyInfo, j as CreateCompany, k as UpdateCompany } from './systemSetting.9e7fc686.js';
import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, O as toDisplayString, a as createVNode, w as withCtx, c as createBlock, G as createCommentVNode, $ as getCurrentInstance, N as createTextVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var detail_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip] .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader .el-cascader-node__label{color:#fff}.system-setting-cascader .el-cascader-node:not(.is-disabled):hover,.system-setting-cascader .el-cascader-node:not(.is-disabled):focus{background:#428fff}.system-setting-cascader .el-cascader-panel .el-radio{width:100%;height:100%;z-index:10;position:absolute;right:-.052083rem}.system-setting-select.el-select__popper.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-select.el-popper.is-light .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important;border-bottom-color:transparent!important;border-right-color:transparent!important}.system-setting-select .el-select-dropdown__item{color:#fff}.system-setting-select .el-select-dropdown__item.hover,.system-setting-select .el-select-dropdown__item:hover{background:#428fff}.system-org-detail-page{height:100%;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:0 .104167rem}.system-org-detail-page .title{font-size:.083333rem;font-weight:700;color:#fff;padding:.104167rem 0 .166667rem}.system-org-detail-page .btn{width:.427083rem;height:.166667rem;border-radius:.020833rem;font-size:.072917rem}.system-org-detail-page .btn.btn-add{border:1px solid #428fff;background:#428fff;color:#fff}.system-org-detail-page .btn.btn-cancel{border:1px solid rgba(255,255,255,.6);background:transparent;color:#fff9;margin-left:.083333rem}.system-org-detail-page .form{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:0 auto}.system-org-detail-page .form .demo-form-inline{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.system-org-detail-page .form .demo-form-inline .top{-webkit-box-flex:1;-ms-flex:1;flex:1}.system-org-detail-page .form .demo-form-inline .top .el-form-item{margin-bottom:.104167rem}.system-org-detail-page .form .demo-form-inline .top .el-form-item__label{font-size:.0625rem;color:#fff9;padding-right:.083333rem}.system-org-detail-page .form .demo-form-inline .top .el-input,.system-org-detail-page .form .demo-form-inline .top .el-cascader{width:2.083333rem;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.system-org-detail-page .form .demo-form-inline .top .el-input .el-input__inner,.system-org-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner{background:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff;font-size:.0625rem;text-align:left}.system-org-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-webkit-input-placeholder,.system-org-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.system-org-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-moz-placeholder,.system-org-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-moz-placeholder{color:#ffffff4d}.system-org-detail-page .form .demo-form-inline .top .el-input .el-input__inner:-ms-input-placeholder,.system-org-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.system-org-detail-page .form .demo-form-inline .top .el-input .el-input__inner::-ms-input-placeholder,.system-org-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.system-org-detail-page .form .demo-form-inline .top .el-input .el-input__inner::placeholder,.system-org-detail-page .form .demo-form-inline .top .el-cascader .el-input__inner::placeholder{color:#ffffff4d}.system-org-detail-page .form .demo-form-inline .top .el-input-number{width:2.083333rem}.system-org-detail-page .form .demo-form-inline .top .el-input-number.is-controls-right .el-input-number__increase{background:transparent;border-bottom:none;border-left:none}.system-org-detail-page .form .demo-form-inline .top .el-input-number.is-controls-right .el-input-number__decrease{background:transparent;border-left:none}.system-org-detail-page .form .demo-form-inline .bottom{-webkit-box-flex:0;-ms-flex:0 0 .583333rem;flex:0 0 .583333rem}.system-org-detail-page .form .demo-form-inline .bottom .el-form-item--default{margin-bottom:0}\n")();

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
      formInline: {
        companyName: '',
        pid: '',
        sort: 0,
      },
      rules: {
        companyName: [
          {
            required: true,
            message: '请输入组织名称',
            trigger: 'blur',
          },
        ],
        pid: [
          {
            validator: (rule, value, callback) => {
              if (state.userType == 0) {
                callback();
              } else {
                if (value) {
                  callback();
                } else {
                  callback(new Error('请选择上级组织'));
                }
              }
            },
            trigger: 'change',
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
        if (state.userType != 0) {
          ctx.$refs.orgCascader.popperVisible = false;
        }
      },
      // 获取组织信息
      getOrgInfo: async () => {
        const { code, data } = await GetCompanyInfo({
          code: state.code,
        });
        if (+code === 1) {
          state.formInline.companyName = data.companyName;
          state.formInline.pid = data.pid;
          state.formInline.sort = data.sort;
          state.editId = data.id;
        }
      },
      // 取消
      back: () => {
        router.push(`/system?from=zzgl`);
      },
      // 确定
      submitForm: () => {
        ctx.$refs.formRef.validate(valid => {
          if (valid) {
            let pname = '';
            if (state.userType != 0) {
              let checkNode = ctx.$refs.orgCascader.getCheckedNodes();
              if (state.formInline.pid && checkNode && checkNode.length) {
                pname = checkNode[0].label;
              }
            }
            if (state.type == 'add') {
              state.add(pname);
            } else {
              state.edit(pname);
            }
          } else {
            return false
          }
        });
      },
      // 新增
      add: async pname => {
        const { code } = await CreateCompany({
          ...state.formInline,
          pname,
        });
        if (+code === 1) {
          ctx.$message.success('创建成功');
          state.back();
        }
      },
      // 编辑
      edit: async pname => {
        const { code } = await UpdateCompany({
          id: state.editId,
          ...state.formInline,
          pname,
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
        await state.getOrgInfo();
      }
    });
    return {
      ...toRefs(state),
    }
  },
};

const _hoisted_1 = { class: "system-org-detail-page" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "form" };
const _hoisted_4 = { class: "top" };
const _hoisted_5 = { class: "bottom" };
const _hoisted_6 = /*#__PURE__*/createTextVNode(" 确 定 ");
const _hoisted_7 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_cascader = resolveComponent("el-cascader");
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, toDisplayString(_ctx.type == 'add' ? '新增' : '编辑'), 1),
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
              label: "组织名称",
              prop: "companyName"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.companyName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.formInline.companyName) = $event)),
                  placeholder: "请输入组织名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            (_ctx.userType != 0)
              ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 0,
                  label: "上级组织",
                  prop: "pid",
                  required: _ctx.userType == 0 ? false : true
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_cascader, {
                      ref: "orgCascader",
                      options: _ctx.orgList,
                      props: _ctx.props1,
                      clearable: "",
                      modelValue: _ctx.formInline.pid,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.formInline.pid) = $event)),
                      "show-all-levels": false,
                      "popper-class": "system-setting-cascader",
                      onChange: _ctx.orgChange
                    }, null, 8, ["options", "props", "modelValue", "onChange"])
                  ]),
                  _: 1
                }, 8, ["required"]))
              : createCommentVNode("", true),
            createVNode(_component_el_form_item, { label: "排序" }, {
              default: withCtx(() => [
                createVNode(_component_el_input_number, {
                  modelValue: _ctx.formInline.sort,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.formInline.sort) = $event)),
                  min: 0,
                  "controls-position": "right"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-add",
                  onClick: _cache[3] || (_cache[3] = $event => (_ctx.submitForm(_ctx.ruleFormRef)))
                }, {
                  default: withCtx(() => [
                    _hoisted_6
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-cancel",
                  onClick: _ctx.back
                }, {
                  default: withCtx(() => [
                    _hoisted_7
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
