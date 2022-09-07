import { c as store, _ as _export_sfc, u as useRouter, a as useRoute } from './index.acc4a696.js';
import { G as GetCompanyInfoList, a as GetUserPage, U as UpdateState, D as DeleteUser, B as BatchDeleteUser, b as DeleteCompany, c as GetRolePage, d as DeleteRole, e as BatchDeleteRole } from './systemSetting.9e7fc686.js';
import { _ as _imports_0 } from './icon-warning.45fa206e.js';
import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, c as createBlock, G as createCommentVNode, N as createTextVNode, O as toDisplayString, $ as getCurrentInstance, W as pushScopeId, X as popScopeId, h as computed, L as Fragment, M as renderList, Y as normalizeClass, b as resolveDynamicComponent } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var index_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader.el-cascader__dropdown.el-popper[role=tooltip] .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.system-setting-cascader .el-cascader-node__label{color:#fff}.system-setting-cascader .el-cascader-node:not(.is-disabled):hover,.system-setting-cascader .el-cascader-node:not(.is-disabled):focus{background:#428fff}.system-setting-cascader .el-cascader-panel .el-radio{width:100%;height:100%;z-index:10;position:absolute;right:-.052083rem}.system-setting-select.el-select__popper.el-popper[role=tooltip]{background:#2a2e39;-webkit-box-shadow:none;box-shadow:none;border:1px solid rgba(255,255,255,.14)}.system-setting-select.el-popper.is-light .el-popper__arrow:before{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important;border-bottom-color:transparent!important;border-right-color:transparent!important}.system-setting-select .el-select-dropdown__item{color:#fff}.system-setting-select .el-select-dropdown__item.hover,.system-setting-select .el-select-dropdown__item:hover{background:#428fff}.system-user-page .demo-form-inline .el-form-item{margin-right:.166667rem;margin-bottom:.104167rem}.system-user-page .demo-form-inline .el-form-item__label{font-size:.0625rem;color:#fff9;padding-right:.083333rem}.system-user-page .demo-form-inline .el-input,.system-user-page .demo-form-inline .el-select,.system-user-page .demo-form-inline .el-cascader{width:1.041667rem;font-size:.0625rem;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.system-user-page .demo-form-inline .el-input .el-input__inner::-webkit-input-placeholder,.system-user-page .demo-form-inline .el-select .el-input__inner::-webkit-input-placeholder,.system-user-page .demo-form-inline .el-cascader .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input .el-input__inner::-moz-placeholder,.system-user-page .demo-form-inline .el-select .el-input__inner::-moz-placeholder,.system-user-page .demo-form-inline .el-cascader .el-input__inner::-moz-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input .el-input__inner:-ms-input-placeholder,.system-user-page .demo-form-inline .el-select .el-input__inner:-ms-input-placeholder,.system-user-page .demo-form-inline .el-cascader .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input .el-input__inner::-ms-input-placeholder,.system-user-page .demo-form-inline .el-select .el-input__inner::-ms-input-placeholder,.system-user-page .demo-form-inline .el-cascader .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input .el-input__inner::placeholder,.system-user-page .demo-form-inline .el-select .el-input__inner::placeholder,.system-user-page .demo-form-inline .el-cascader .el-input__inner::placeholder{color:#ffffff4d}.system-user-page .table-content .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.system-user-page .table-content .batch-export-table{background:transparent}.system-user-page .table-content .batch-export-table .el-table__inner-wrapper:before{display:none}.system-user-page .table-content .batch-export-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.system-user-page .table-content .batch-export-table .el-table__row{background:transparent}.system-user-page .table-content .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.system-user-page .table-content .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.system-user-page .table-content .batch-export-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}.system-user-page .table-content .state-area{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.system-user-page .table-content .state-area .name{font-size:.072917rem;color:#fff;margin-left:.041667rem}\n")();

const { userinfo: userinfo$2 } = store.state.account;
const { menusData: menusData$3 } = store.state.menu;

const _sfc_main$3 = {
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const router = useRouter();
    let state = reactive({
      userType: userinfo$2.userType,
      companyId: userinfo$2.companyId,
      props1: {
        checkStrictly: true,
        value: 'id',
        label: 'companyName',
        emitPath: false,
        expandTrigger: 'hover',
      },
      orgList: [],
      formInline: {
        realname: '',
        mobile: '',
        companyId: '',
        state: '',
      },
      total: 0,
      currentPage: 1,
      tableData: [],
      selectRows: [],
      deleteCode: '',
      dialogVisible: false,
      permissions: [
        { name: '新增', show: false },
        { name: '查看', show: false },
        { name: '删除', show: false },
        { name: '编辑', show: false },
      ],
      // 获取组织列表
      getOrgList: async () => {
        const { code, data } = await GetCompanyInfoList({
          companyId: state.userType == 0 ? '' : state.companyId, // 平台端不传，租户端要传
        });
        state.orgList = +code === 1 ? data : [];
      },
      orgChange() {
        ctx.$refs.cascader.popperVisible = false;
      },
      // 查询
      query: async () => {
        const { code, data } = await GetUserPage({
          ...state.formInline,
          companyId: state.formInline.companyId
            ? state.formInline.companyId
            : state.userType == 0
            ? ''
            : state.companyId,
          page: state.currentPage,
          size: 10,
          userType: state.userType == 0 ? '0, 1' : '1, 2', // 平台端传0，1；租户端传1，2
        });
        if (+code === 1) {
          state.total = data.total;
          state.tableData = data.list;
        } else {
          state.total = 0;
          state.tableData = [];
        }
      },
      // 重置
      reset: () => {
        Object.keys(state.formInline).forEach(
          key => (state.formInline[key] = '')
        );
        state.query();
      },
      // 分页
      changeCurrent(value) {
        state.currentPage = value;
        state.query();
      },
      // 列表状态切换
      stateChange: async (userCode, userState) => {
        const { code } = await UpdateState({
          code: userCode,
          state: userState,
        });
        if (+code === 1) {
          ctx.$message.success('修改状态成功');
        }
        // state.query()
      },
      // 表格多选
      selectionChange: selection => {
        state.selectRows = selection;
      },
      // 打开删除弹窗
      openDeleteDialog: code => {
        state.deleteCode = code;
        if (code) {
          // 单个删除
          state.dialogVisible = true;
        } else {
          // 批量删除
          if (state.selectRows.length < 1) {
            ctx.$message.warning('请选择用户');
          } else {
            state.dialogVisible = true;
          }
        }
      },
      // 删除用户
      deleteUser: async () => {
        let res;
        if (state.deleteCode) {
          res = await DeleteUser({ code: state.deleteCode });
        } else {
          res = await BatchDeleteUser(state.selectRows.map(v => v.code));
        }
        if (+res.code) {
          ctx.$message.success('删除成功');
          state.query();
        }
        state.dialogVisible = false;
      },
      // 跳转详情
      toDetail: (type, code) => {
        router.push(`/system/userDetail?type=${type}&code=${code}`);
      },
    });
    onMounted(async () => {
      await state.query();
      await state.getOrgList();
      let systemMenu = menusData$3.find(item => item.routing == '/system');
      let userMenu = systemMenu.children.find(item => item.name == '用户管理');
      if (userMenu.children && userMenu.children.length) {
        state.permissions.map(v => {
          let temp = userMenu.children.find(item => item.name == v.name);
          if (temp) {
            v.show = true;
          }
        });
      }
    });
    return {
      ...toRefs(state),
    }
  },
};


const _hoisted_1$3 = { class: "system-user-page" };
const _hoisted_2$3 = { class: "search-area" };
const _hoisted_3$3 = { class: "left" };
const _hoisted_4$3 = /*#__PURE__*/createTextVNode(" 查 询 ");
const _hoisted_5$3 = /*#__PURE__*/createTextVNode(" 重 置 ");
const _hoisted_6$3 = { class: "right" };
const _hoisted_7$2 = /*#__PURE__*/createTextVNode(" 新 增 ");
const _hoisted_8$2 = /*#__PURE__*/createTextVNode(" 删除所选 ");
const _hoisted_9$2 = { class: "table-content" };
const _hoisted_10$2 = { class: "state-area" };
const _hoisted_11$2 = { class: "name" };
const _hoisted_12$1 = /*#__PURE__*/createTextVNode(" 查看 ");
const _hoisted_13$1 = /*#__PURE__*/createTextVNode(" 编辑 ");
const _hoisted_14$1 = /*#__PURE__*/createTextVNode(" 删除 ");
const _hoisted_15$1 = { class: "pagination" };
const _hoisted_16$1 = /*#__PURE__*/createBaseVNode("div", { class: "row" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    alt: ""
  }),
  /*#__PURE__*/createBaseVNode("span", { class: "name" }, "是否确定删除记录？")
], -1);
const _hoisted_17$1 = /*#__PURE__*/createBaseVNode("div", { class: "tips" }, "删除此记录后将无法恢复。", -1);
const _hoisted_18$1 = { class: "dialog-footer" };
const _hoisted_19 = /*#__PURE__*/createTextVNode(" 确 认 ");
const _hoisted_20 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_cascader = resolveComponent("el-cascader");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", _hoisted_2$3, [
      createBaseVNode("div", _hoisted_3$3, [
        createVNode(_component_el_form, {
          inline: true,
          model: _ctx.formInline,
          class: "demo-form-inline"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "用户姓名" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.realname,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.formInline.realname) = $event)),
                  placeholder: "请输入用户姓名"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "手机号码" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.mobile,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.formInline.mobile) = $event)),
                  placeholder: "请输入手机号码"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "所属组织" }, {
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
            }),
            createVNode(_component_el_form_item, { label: "状态" }, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  modelValue: _ctx.formInline.state,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.formInline.state) = $event)),
                  placeholder: "请选择",
                  "popper-class": "system-setting-select"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: "开启",
                      value: "0"
                    }),
                    createVNode(_component_el_option, {
                      label: "关闭",
                      value: "1"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-search",
                  onClick: _ctx.query
                }, {
                  default: withCtx(() => [
                    _hoisted_4$3
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-reset",
                  onClick: _ctx.reset
                }, {
                  default: withCtx(() => [
                    _hoisted_5$3
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])
      ]),
      createBaseVNode("div", _hoisted_6$3, [
        (_ctx.permissions[0].show)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 0,
              type: "primary",
              class: "btn btn-add",
              onClick: _cache[4] || (_cache[4] = $event => (_ctx.toDetail('add', '')))
            }, {
              default: withCtx(() => [
                _hoisted_7$2
              ]),
              _: 1
            }))
          : createCommentVNode("", true),
        (_ctx.permissions[2].show)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 1,
              type: "primary",
              class: "btn btn-delete",
              onClick: _cache[5] || (_cache[5] = $event => (_ctx.openDeleteDialog('')))
            }, {
              default: withCtx(() => [
                _hoisted_8$2
              ]),
              _: 1
            }))
          : createCommentVNode("", true)
      ])
    ]),
    createBaseVNode("div", _hoisted_9$2, [
      createVNode(_component_el_table, {
        data: _ctx.tableData,
        class: "batch-export-table",
        onSelectionChange: _ctx.selectionChange,
        height: "100%"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_table_column, {
            type: "selection",
            width: "50"
          }),
          createVNode(_component_el_table_column, {
            prop: "loginName",
            label: "登录名"
          }),
          createVNode(_component_el_table_column, {
            prop: "realname",
            label: "用户姓名"
          }),
          createVNode(_component_el_table_column, {
            prop: "companyName",
            label: "所属组织"
          }),
          createVNode(_component_el_table_column, {
            prop: "roleName",
            label: "角色"
          }),
          createVNode(_component_el_table_column, {
            prop: "mobile",
            label: "手机号码"
          }),
          createVNode(_component_el_table_column, {
            prop: "sex",
            label: "性别"
          }, {
            default: withCtx((scope) => [
              createTextVNode(toDisplayString(scope.row.sex == 1 ? '女' : '男'), 1)
            ]),
            _: 1
          }),
          createVNode(_component_el_table_column, {
            prop: "state",
            label: "状态"
          }, {
            default: withCtx((scope) => [
              createBaseVNode("div", _hoisted_10$2, [
                createVNode(_component_el_switch, {
                  "active-value": 0,
                  "inactive-value": 1,
                  modelValue: scope.row.state,
                  "onUpdate:modelValue": $event => ((scope.row.state) = $event),
                  onChange: $event => (_ctx.stateChange(scope.row.code, scope.row.state))
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                createBaseVNode("span", _hoisted_11$2, toDisplayString(scope.row.state == 1 ? '关' : '开'), 1)
              ])
            ]),
            _: 1
          }),
          createVNode(_component_el_table_column, {
            prop: "operations",
            label: "操作",
            width: "160"
          }, {
            default: withCtx((scope) => [
              (_ctx.permissions[1].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "text",
                    onClick: $event => (_ctx.toDetail('view', scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_12$1
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true),
              (_ctx.permissions[3].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    type: "text",
                    onClick: $event => (_ctx.toDetail('edit', scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_13$1
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true),
              (_ctx.permissions[2].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 2,
                    type: "text",
                    onClick: $event => (_ctx.openDeleteDialog(scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_14$1
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["data", "onSelectionChange"])
    ]),
    createBaseVNode("div", _hoisted_15$1, [
      createBaseVNode("span", null, "总共" + toDisplayString(_ctx.total) + "条", 1),
      createVNode(_component_el_pagination, {
        class: "pagination-detail",
        background: "",
        layout: "prev, pager, next",
        total: _ctx.total,
        currentPage: _ctx.currentPage,
        "onUpdate:currentPage": _cache[6] || (_cache[6] = $event => ((_ctx.currentPage) = $event)),
        onCurrentChange: _ctx.changeCurrent
      }, null, 8, ["total", "currentPage", "onCurrentChange"])
    ]),
    createVNode(_component_el_dialog, {
      "custom-class": "delete-dialog",
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.dialogVisible) = $event)),
      title: "确认提示",
      width: "640px"
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_18$1, [
          createVNode(_component_el_button, {
            class: "btn btn-save",
            type: "primary",
            onClick: _ctx.deleteUser
          }, {
            default: withCtx(() => [
              _hoisted_19
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "btn btn-cancel",
            onClick: _cache[7] || (_cache[7] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_20
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_16$1,
        _hoisted_17$1
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]))
}
var UserCom = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render$3]]);

var index_vue_vue_type_style_index_0_scoped_true_lang$2 = /* #__PURE__ */ (() => ".system-user-page .search-area-organization[data-v-1db17f10]{padding:.104167rem 0;text-align:right}.system-user-page .search-area-organization .btn[data-v-1db17f10]{width:.427083rem;height:.166667rem;border-radius:.020833rem;font-size:.072917rem;border:1px solid #428fff}.system-user-page .search-area-organization .btn.btn-add[data-v-1db17f10]{background:#428fff;color:#fff}.system-user-page .table-content[data-v-1db17f10] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.system-user-page .table-content[data-v-1db17f10] .batch-export-table{background:transparent}.system-user-page .table-content[data-v-1db17f10] .batch-export-table .el-table__inner-wrapper:before{display:none}.system-user-page .table-content[data-v-1db17f10] .batch-export-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.system-user-page .table-content[data-v-1db17f10] .batch-export-table .el-table__row{background:transparent}.system-user-page .table-content[data-v-1db17f10] .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.system-user-page .table-content[data-v-1db17f10] .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.system-user-page .table-content[data-v-1db17f10] .batch-export-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}\n")();

const { userinfo: userinfo$1 } = store.state.account;
const { menusData: menusData$2 } = store.state.menu;

const _sfc_main$2 = {
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const router = useRouter();
    let state = reactive({
      userType: userinfo$1.userType,
      companyId: userinfo$1.companyId,
      tableData: [],
      deleteCode: '',
      dialogVisible: false,
      permissions: [
        { name: '新增', show: false },
        { name: '删除', show: false },
        { name: '编辑', show: false },
      ],
      // 查询
      query: async () => {
        const { code, data } = await GetCompanyInfoList({
          companyId: state.userType == 0 ? '' : state.companyId, // 平台端不传，租户端要传
        });
        state.tableData = +code === 1 ? data : [];
      },
      // 打开删除弹窗
      openDeleteDialog: code => {
        state.deleteCode = code;
        state.dialogVisible = true;
      },
      // 删除组织
      deleteOrg: async () => {
        const { code } = await DeleteCompany({
          code: state.deleteCode,
        });
        if (+code === 1) {
          ctx.$message.success('删除成功');
          state.query();
        }
        state.dialogVisible = false;
      },
      // 跳转详情
      toDetail: (type, code) => {
        router.push(`/system/orgDetail?type=${type}&code=${code}`);
      },
    });
    onMounted(async () => {
      await state.query();
      let systemMenu = menusData$2.find(item => item.routing == '/system');
      let orgMenu = systemMenu.children.find(item => item.name == '组织管理');
      if (orgMenu.children && orgMenu.children.length) {
        state.permissions.map(v => {
          let temp = orgMenu.children.find(item => item.name == v.name);
          if (temp) {
            v.show = true;
          }
        });
      }
    });
    return {
      ...toRefs(state),
    }
  },
};


const _withScopeId$2 = n => (pushScopeId("data-v-1db17f10"),n=n(),popScopeId(),n);
const _hoisted_1$2 = { class: "system-user-page" };
const _hoisted_2$2 = { class: "search-area-organization" };
const _hoisted_3$2 = /*#__PURE__*/createTextVNode(" 新 增 ");
const _hoisted_4$2 = { class: "table-content" };
const _hoisted_5$2 = /*#__PURE__*/createTextVNode(" 编辑 ");
const _hoisted_6$2 = /*#__PURE__*/createTextVNode(" 删除 ");
const _hoisted_7$1 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("div", { class: "row" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    alt: ""
  }),
  /*#__PURE__*/createBaseVNode("span", { class: "name" }, "是否确定删除记录？")
], -1));
const _hoisted_8$1 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("div", { class: "tips" }, "删除此记录后将无法恢复。", -1));
const _hoisted_9$1 = { class: "dialog-footer" };
const _hoisted_10$1 = /*#__PURE__*/createTextVNode(" 确 认 ");
const _hoisted_11$1 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      (_ctx.permissions[0].show)
        ? (openBlock(), createBlock(_component_el_button, {
            key: 0,
            type: "primary",
            class: "btn btn-add",
            onClick: _cache[0] || (_cache[0] = $event => (_ctx.toDetail('add', '')))
          }, {
            default: withCtx(() => [
              _hoisted_3$2
            ]),
            _: 1
          }))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_4$2, [
      createVNode(_component_el_table, {
        data: _ctx.tableData,
        "row-key": "id",
        "default-expand-all": "",
        class: "batch-export-table",
        height: "100%"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_table_column, {
            prop: "companyName",
            label: "组织名称"
          }),
          (_ctx.userType != 0)
            ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                prop: "pname",
                label: "上级组织"
              }))
            : createCommentVNode("", true),
          createVNode(_component_el_table_column, {
            prop: "sort",
            label: "排序"
          }),
          createVNode(_component_el_table_column, {
            prop: "operations",
            label: "操作",
            width: "160"
          }, {
            default: withCtx((scope) => [
              (_ctx.permissions[2].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "text",
                    onClick: $event => (_ctx.toDetail('edit', scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_5$2
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true),
              (_ctx.permissions[1].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    type: "text",
                    onClick: $event => (_ctx.openDeleteDialog(scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_6$2
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["data"])
    ]),
    createVNode(_component_el_dialog, {
      "custom-class": "delete-dialog",
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.dialogVisible) = $event)),
      title: "确认提示",
      width: "640px"
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_9$1, [
          createVNode(_component_el_button, {
            class: "btn btn-save",
            type: "primary",
            onClick: _ctx.deleteOrg
          }, {
            default: withCtx(() => [
              _hoisted_10$1
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "btn btn-cancel",
            onClick: _cache[1] || (_cache[1] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_11$1
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_7$1,
        _hoisted_8$1
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]))
}
var OrganizationCom = /*#__PURE__*/_export_sfc(_sfc_main$2, [['render',_sfc_render$2],['__scopeId',"data-v-1db17f10"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang$1 = /* #__PURE__ */ (() => ".system-user-page .demo-form-inline[data-v-f89a81c0] .el-form-item{margin-right:.166667rem;margin-bottom:.104167rem}.system-user-page .demo-form-inline[data-v-f89a81c0] .el-form-item__label{font-size:.0625rem;color:#fff9;padding-right:.083333rem}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0],.system-user-page .demo-form-inline .el-select[data-v-f89a81c0]{width:1.041667rem;height:.166667rem;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0] .el-input__inner,.system-user-page .demo-form-inline .el-select[data-v-f89a81c0] .el-input__inner{background:transparent;-webkit-box-shadow:none;box-shadow:none;color:#fff;font-size:.0625rem}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0] .el-input__inner::-webkit-input-placeholder,.system-user-page .demo-form-inline .el-select[data-v-f89a81c0] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0] .el-input__inner::-moz-placeholder,.system-user-page .demo-form-inline .el-select[data-v-f89a81c0] .el-input__inner::-moz-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0] .el-input__inner:-ms-input-placeholder,.system-user-page .demo-form-inline .el-select[data-v-f89a81c0] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0] .el-input__inner::-ms-input-placeholder,.system-user-page .demo-form-inline .el-select[data-v-f89a81c0] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.system-user-page .demo-form-inline .el-input[data-v-f89a81c0] .el-input__inner::placeholder,.system-user-page .demo-form-inline .el-select[data-v-f89a81c0] .el-input__inner::placeholder{color:#ffffff4d}.system-user-page .table-content[data-v-f89a81c0] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table{background:transparent}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table .el-table__inner-wrapper:before{display:none}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table .el-table__row{background:transparent}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.system-user-page .table-content[data-v-f89a81c0] .batch-export-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}\n")();

const { userinfo } = store.state.account;
const { menusData: menusData$1 } = store.state.menu;

const _sfc_main$1 = {
  setup() {
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    const router = useRouter();
    let state = reactive({
      userType: userinfo.userType,
      companyId: userinfo.companyId,
      formInline: {
        roleName: '',
      },
      total: 0,
      currentPage: 1,
      tableData: [],
      selectRows: [],
      deleteCode: '',
      dialogVisible: false,
      permissions: [
        { name: '新增', show: false },
        { name: '查看', show: false },
        { name: '删除', show: false },
        { name: '编辑', show: false },
      ],
      // 查询
      query: async () => {
        const { code, data } = await GetRolePage({
          roleName: state.formInline.roleName,
          companyId: state.userType == 0 ? '' : state.companyId, // 平台端不传，租户端要传
          roleType: state.userType == 0 ? 0 : 1, // 角色类型，0管理员角色，1租户角色
          page: state.currentPage,
          size: 10,
        });
        if (+code === 1) {
          state.total = data.total;
          state.tableData = data.list;
        } else {
          state.total = 0;
          state.tableData = [];
        }
      },
      // 重置
      reset: () => {
        state.formInline.roleName = '';
        state.query();
      },
      // 分页
      changeCurrent(value) {
        state.currentPage = value;
        state.query();
      },
      // 表格多选
      selectionChange: selection => {
        state.selectRows = selection;
      },
      // 打开删除弹窗
      openDeleteDialog: code => {
        state.deleteCode = code;
        if (code) {
          // 单个删除
          state.dialogVisible = true;
        } else {
          // 批量删除
          if (state.selectRows.length < 1) {
            ctx.$message.warning('请选择角色');
          } else {
            state.dialogVisible = true;
          }
        }
      },
      // 删除角色
      deleteRole: async () => {
        let res;
        if (state.deleteCode) {
          res = await DeleteRole({ code: state.deleteCode });
        } else {
          res = await BatchDeleteRole(state.selectRows.map(v => v.code));
        }
        if (+res.code) {
          ctx.$message.success('删除成功');
          state.query();
        }
        state.dialogVisible = false;
      },
      // 跳转详情
      toDetail: (type, code) => {
        router.push(`/system/roleDetail?type=${type}&code=${code}`);
      },
    });
    onMounted(async () => {
      await state.query();
      let systemMenu = menusData$1.find(item => item.routing == '/system');
      let roleMenu = systemMenu.children.find(item => item.name == '角色管理');
      if (roleMenu.children && roleMenu.children.length) {
        state.permissions.map(v => {
          let temp = roleMenu.children.find(item => item.name == v.name);
          if (temp) {
            v.show = true;
          }
        });
      }
    });
    return {
      ...toRefs(state),
    }
  },
};


const _withScopeId$1 = n => (pushScopeId("data-v-f89a81c0"),n=n(),popScopeId(),n);
const _hoisted_1$1 = { class: "system-user-page" };
const _hoisted_2$1 = { class: "search-area" };
const _hoisted_3$1 = { class: "left" };
const _hoisted_4$1 = /*#__PURE__*/createTextVNode(" 查 询 ");
const _hoisted_5$1 = /*#__PURE__*/createTextVNode(" 重 置 ");
const _hoisted_6$1 = { class: "right" };
const _hoisted_7 = /*#__PURE__*/createTextVNode(" 新 增 ");
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 删除所选 ");
const _hoisted_9 = { class: "table-content" };
const _hoisted_10 = /*#__PURE__*/createTextVNode(" 查看 ");
const _hoisted_11 = /*#__PURE__*/createTextVNode(" 编辑 ");
const _hoisted_12 = /*#__PURE__*/createTextVNode(" 删除 ");
const _hoisted_13 = { class: "pagination" };
const _hoisted_14 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", { class: "row" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    alt: ""
  }),
  /*#__PURE__*/createBaseVNode("span", { class: "name" }, "是否确定删除记录？")
], -1));
const _hoisted_15 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", { class: "tips" }, "删除此记录后将无法恢复。", -1));
const _hoisted_16 = { class: "dialog-footer" };
const _hoisted_17 = /*#__PURE__*/createTextVNode(" 确 认 ");
const _hoisted_18 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3$1, [
        createVNode(_component_el_form, {
          inline: true,
          model: _ctx.formInline,
          class: "demo-form-inline"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "角色名称" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.formInline.roleName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.formInline.roleName) = $event)),
                  placeholder: "请输入角色名称"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-search",
                  onClick: _ctx.query
                }, {
                  default: withCtx(() => [
                    _hoisted_4$1
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "btn btn-reset",
                  onClick: _ctx.reset
                }, {
                  default: withCtx(() => [
                    _hoisted_5$1
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])
      ]),
      createBaseVNode("div", _hoisted_6$1, [
        (_ctx.permissions[0].show)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 0,
              type: "primary",
              class: "btn btn-add",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.toDetail('add', '')))
            }, {
              default: withCtx(() => [
                _hoisted_7
              ]),
              _: 1
            }))
          : createCommentVNode("", true),
        (_ctx.permissions[2].show)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 1,
              type: "primary",
              class: "btn btn-delete",
              onClick: _cache[2] || (_cache[2] = $event => (_ctx.openDeleteDialog('')))
            }, {
              default: withCtx(() => [
                _hoisted_8
              ]),
              _: 1
            }))
          : createCommentVNode("", true)
      ])
    ]),
    createBaseVNode("div", _hoisted_9, [
      createVNode(_component_el_table, {
        data: _ctx.tableData,
        class: "batch-export-table",
        onSelectionChange: _ctx.selectionChange,
        height: "100%"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_table_column, {
            type: "selection",
            width: "50"
          }),
          createVNode(_component_el_table_column, {
            prop: "roleName",
            label: "角色名称"
          }),
          createVNode(_component_el_table_column, {
            prop: "description",
            label: "备注"
          }),
          createVNode(_component_el_table_column, {
            prop: "operations",
            label: "操作",
            width: "160"
          }, {
            default: withCtx((scope) => [
              (_ctx.permissions[1].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    type: "text",
                    onClick: $event => (_ctx.toDetail('view', scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_10
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true),
              (_ctx.permissions[3].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    type: "text",
                    onClick: $event => (_ctx.toDetail('edit', scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_11
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true),
              (_ctx.permissions[2].show)
                ? (openBlock(), createBlock(_component_el_button, {
                    key: 2,
                    type: "text",
                    onClick: $event => (_ctx.openDeleteDialog(scope.row.code))
                  }, {
                    default: withCtx(() => [
                      _hoisted_12
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["data", "onSelectionChange"])
    ]),
    createBaseVNode("div", _hoisted_13, [
      createBaseVNode("span", null, "总共" + toDisplayString(_ctx.total) + "条", 1),
      createVNode(_component_el_pagination, {
        class: "pagination-detail",
        background: "",
        layout: "prev, pager, next",
        total: _ctx.total,
        currentPage: _ctx.currentPage,
        "onUpdate:currentPage": _cache[3] || (_cache[3] = $event => ((_ctx.currentPage) = $event)),
        onCurrentChange: _ctx.changeCurrent
      }, null, 8, ["total", "currentPage", "onCurrentChange"])
    ]),
    createVNode(_component_el_dialog, {
      "custom-class": "delete-dialog",
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.dialogVisible) = $event)),
      title: "确认提示",
      width: "640px"
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_16, [
          createVNode(_component_el_button, {
            class: "btn btn-save",
            type: "primary",
            onClick: _ctx.deleteRole
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "btn btn-cancel",
            onClick: _cache[4] || (_cache[4] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_18
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_14,
        _hoisted_15
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]))
}
var RoleCom = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1],['__scopeId',"data-v-f89a81c0"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".system-setting-page[data-v-6086fb22]{height:100%;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.system-setting-page .left-munu[data-v-6086fb22]{-webkit-box-flex:0;-ms-flex:0 0 .208333rem;flex:0 0 .208333rem;position:relative;padding-top:.104167rem;width:100%;background-color:#373b48;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.system-setting-page .left-munu .menu__item[data-v-6086fb22]{margin-bottom:.041667rem;padding:.052083rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer}.system-setting-page .left-munu .menu__item .svg-img[data-v-6086fb22]{width:.104167rem;height:.104167rem;margin-bottom:.020833rem;color:#fff9}.system-setting-page .left-munu .menu__item .svg-name[data-v-6086fb22]{font-size:.0625rem;color:#fff9}.system-setting-page .left-munu .menu__item.act[data-v-6086fb22]{background-color:#428fff}.system-setting-page .left-munu .menu__item.act .svg-img[data-v-6086fb22],.system-setting-page .left-munu .menu__item.act .svg-name[data-v-6086fb22]{color:#fff}.system-setting-page .left-munu .menu__mask[data-v-6086fb22]{position:absolute;left:0;top:0;z-index:100;padding:.104167rem 0;width:.583333rem;background-color:#373b48;-webkit-transition:all .2s;transition:all .2s}.system-setting-page .left-munu .menu__mask .menu__item[data-v-6086fb22]{padding-left:.052083rem;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.system-setting-page .left-munu .menu__mask .menu__item span[data-v-6086fb22]{margin-left:.072917rem;color:#fff}.system-setting-page .right-content[data-v-6086fb22]{-webkit-box-flex:1;-ms-flex:1;flex:1}[data-v-6086fb22] .system-user-page{height:100%;padding:0 .104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}[data-v-6086fb22] .system-user-page .search-area{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding-top:.104167rem}[data-v-6086fb22] .system-user-page .search-area .btn{width:.427083rem;height:.166667rem;border-radius:.020833rem;font-size:.072917rem}[data-v-6086fb22] .system-user-page .search-area .left{-webkit-box-flex:1;-ms-flex:1;flex:1}[data-v-6086fb22] .system-user-page .search-area .left .btn{background:transparent}[data-v-6086fb22] .system-user-page .search-area .left .btn.btn-search{border:1px solid #428fff;color:#428fff}[data-v-6086fb22] .system-user-page .search-area .left .btn.btn-reset{border:1px solid rgba(255,255,255,.6);color:#fff9;margin-left:.166667rem;margin-left:.083333rem}[data-v-6086fb22] .system-user-page .search-area .right{-webkit-box-flex:0;-ms-flex:0 0 .9375rem;flex:0 0 .9375rem;display:-webkit-box;display:-ms-flexbox;display:flex}[data-v-6086fb22] .system-user-page .search-area .right .btn{border:1px solid #428fff}[data-v-6086fb22] .system-user-page .search-area .right .btn.btn-add{background:#428fff;color:#fff}[data-v-6086fb22] .system-user-page .search-area .right .btn.btn-delete{background:transparent;color:#428fff;margin-left:.083333rem}[data-v-6086fb22] .system-user-page .table-content{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}[data-v-6086fb22] .system-user-page .pagination{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:.104167rem 0}[data-v-6086fb22] .system-user-page .pagination span{color:#fff9;font-size:.072917rem;margin-right:.098958rem}[data-v-6086fb22] .system-user-page .pagination .pagination-detail .el-pager li,[data-v-6086fb22] .system-user-page .pagination .pagination-detail .btn-next,[data-v-6086fb22] .system-user-page .pagination .pagination-detail .btn-prev{background:#2a2e39;border:1px solid rgba(255,255,255,.3)}[data-v-6086fb22] .system-user-page .pagination .pagination-detail .el-pager li.active{border:1px solid #428fff;background:#2a2e39}[data-v-6086fb22] .delete-dialog{background:rgb(55,59,72);border-radius:.020833rem}[data-v-6086fb22] .delete-dialog .el-dialog__header{border-bottom:.005208rem solid rgb(24,26,33);padding:.083333rem .104167rem}[data-v-6086fb22] .delete-dialog .el-dialog__header .el-dialog__title{font-size:.09375rem;font-weight:500;color:#fff}[data-v-6086fb22] .delete-dialog .el-dialog__header .el-dialog__close{font-size:.083333rem;color:#fff}[data-v-6086fb22] .delete-dialog .el-dialog__body{padding-top:.208333rem}[data-v-6086fb22] .delete-dialog .el-dialog__body .row{padding-left:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}[data-v-6086fb22] .delete-dialog .el-dialog__body .row .name{font-size:.09375rem;font-weight:500;color:#fff;margin-left:.125rem}[data-v-6086fb22] .delete-dialog .el-dialog__body .tips{margin-top:.088542rem;margin-bottom:.348958rem;padding-left:.354167rem;font-size:.0625rem;color:#fff9}[data-v-6086fb22] .delete-dialog .el-dialog__footer .btn{width:.427083rem;height:.166667rem;min-height:.166667rem;padding:0;border-radius:.020833rem}[data-v-6086fb22] .delete-dialog .el-dialog__footer .btn.btn-save{background:#428fff;border:none}[data-v-6086fb22] .delete-dialog .el-dialog__footer .btn.btn-cancel{background:transparent;color:#fff9;border:1px solid rgba(255,255,255,.6);margin-left:.083333rem}\n")();

const { menusData } = store.state.menu;

const _sfc_main = {
  setup() {
    const route = useRoute();
    let state = reactive({
      show: false,
      active: '',
      sourceMenuList: [
        {
          type: 'yhgl',
          text: '用户管理',
          text2: '用户',
          icon: 'system-user',
        },
        {
          type: 'zzgl',
          text: '组织管理',
          text2: '组织',
          icon: 'system-organization',
        },
        {
          type: 'jsgl',
          text: '角色管理',
          text2: '角色',
          icon: 'system-role',
        },
      ],
      menuList: [],
      changeMenu: val => {
        // state.show = false
        state.active = val;
      },
      Component: computed(() => {
        switch (state.active) {
          case 'yhgl':
            return UserCom
          case 'zzgl':
            return OrganizationCom
          case 'jsgl':
            return RoleCom
          default:
            return ''
        }
      }),
    });
    onMounted(async () => {
      // state.active = route.query.from ? route.query.from : 'yhgl'
      let systemMenu = menusData.find(item => item.routing == '/system');
      if (systemMenu.children && systemMenu.children.length) {
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
        state.active = '';
      }
    });
    return {
      ...toRefs(state),
    }
  },
};

const _withScopeId = n => (pushScopeId("data-v-6086fb22"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "system-setting-page" };
const _hoisted_2 = { class: "left-munu" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "svg-name" };
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "svg-name" }, "管理", -1));
const _hoisted_6 = { class: "right-content" };

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
          createBaseVNode("div", _hoisted_4, toDisplayString(item.text2), 1),
          _hoisted_5
        ], 10, _hoisted_3))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_6, [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.Component)))
    ])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-6086fb22"]]);

export { index as default };
