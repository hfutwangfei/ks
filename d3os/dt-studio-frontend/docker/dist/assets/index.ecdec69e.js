import { s as service, _ as _export_sfc, c as store, u as useRouter } from './index.acc4a696.js';
import { _ as _imports_0, a as _imports_1 } from './delete-icon.a33587a6.js';
import { _ as _imports_0$1 } from './icon-warning.45fa206e.js';
import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, L as Fragment, M as renderList, O as toDisplayString, G as createCommentVNode, $ as getCurrentInstance, N as createTextVNode } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

// 我的案例列表
const QueryCasesList = params => {
  return service({
    url: `/api/case/queryCasesList`,
    method: 'get',
    params,
  })
};

// 删除案例
const DeleteCase = data => {
  return service({
    url: `/api/case/deleteCase?caseId=${data}`,
    method: 'delete',
  })
};

// 更新案例发布状态
const UpdateCasePublishState = data => {
  return service({
    url: `/api/case/updateCasePublishState`,
    method: 'post',
    data,
  })
};

var index_vue_vue_type_style_index_0_scope_true_lang = /* #__PURE__ */ (() => ".my-case-page{padding:0 0 0 .104167rem;background:#2a2e39;min-height:100%}.my-case-page .search-area{padding:.104167rem 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.my-case-page .search-area .text{width:1.25rem;line-height:1;font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.my-case-page .search-area .text .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.my-case-page .search-area .text .el-input__inner::-moz-placeholder{color:#ffffff4d}.my-case-page .search-area .text .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.my-case-page .search-area .text .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.my-case-page .search-area .text .el-input__inner::placeholder{color:#ffffff4d}.my-case-page .search-area .btn{margin-left:.083333rem;width:.427083rem;height:.166667rem;min-height:.166667rem;border-radius:.020833rem;border:1px solid #428fff;background:transparent;color:#428fff;padding:0;line-height:.166667rem}.my-case-page-content{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.my-case-page-content .item-area{width:20%}.my-case-page-content .item-area-content{border-radius:.020833rem;padding-right:.104167rem;overflow:hidden;margin-bottom:.104167rem}.my-case-page-content .item-area-content .top{width:100%;height:1.052083rem}.my-case-page-content .item-area-content .top img{width:100%;height:100%;cursor:pointer}.my-case-page-content .item-area-content .bottom{background:#373b48;padding:.083333rem}.my-case-page-content .item-area-content .bottom .title-area{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.0625rem}.my-case-page-content .item-area-content .bottom .title-area .title{font-size:.083333rem;color:#fff;line-height:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer}.my-case-page-content .item-area-content .bottom .title-area .icon-area{-webkit-box-flex:0;-ms-flex:0 0 14%;flex:0 0 14%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.my-case-page-content .item-area-content .bottom .title-area .icon-area .icon{cursor:pointer;width:.083333rem}.my-case-page-content .item-area-content .bottom .title-area .icon-area .icon+.icon{margin-left:.083333rem}.my-case-page-content .item-area-content .bottom .content-area{font-size:.0625rem;color:#fff9;line-height:1;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.delete-dialog{background:rgb(55,59,72);border-radius:.020833rem}.delete-dialog .el-dialog__header{border-bottom:.005208rem solid rgb(24,26,33);padding:.083333rem .104167rem}.delete-dialog .el-dialog__header .el-dialog__title{font-size:.09375rem;font-weight:500;color:#fff}.delete-dialog .el-dialog__header .el-dialog__close{font-size:.083333rem;color:#fff}.delete-dialog .el-dialog__body{padding-top:.208333rem}.delete-dialog .el-dialog__body .row{padding-left:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.delete-dialog .el-dialog__body .row .name{font-size:.09375rem;font-weight:500;color:#fff;margin-left:.125rem}.delete-dialog .el-dialog__body .tips{margin-top:.088542rem;margin-bottom:.348958rem;padding-left:.354167rem;font-size:.0625rem;color:#fff9}.delete-dialog .el-dialog__footer .btn{width:.427083rem;height:.166667rem;min-height:.166667rem;padding:0;border-radius:.020833rem}.delete-dialog .el-dialog__footer .btn.btn-save{background:#428fff;border:none}.delete-dialog .el-dialog__footer .btn.btn-cancel{background:transparent;color:#fff9;border:1px solid rgba(255,255,255,.6);margin-left:.083333rem}\n")();

const { menusData } = store.state.menu;

const _sfc_main = {
  setup() {
    // const store = useStore()
    const router = useRouter();
    const { proxy: ctx } = getCurrentInstance(); // 可以把ctx当成vue2中的this
    let state = reactive({
      input: '',
      data: [],
      deteleCaseId: '',
      dialogVisible: false,
      permissions: [
        { name: '查看', show: false },
        { name: '删除', show: false },
        { name: '编辑', show: false },
      ],
      // 查询
      query: async type => {
        const { code, data } = await QueryCasesList({
          keyWord: state.input,
          publishState: 1,
        });
        if (+code === 1) {
          // 需求：当普通用户只有一个案例的时候，登录直接显示大屏，当有>=2的时候才会有此窗口，
          // 当创建者或企业租户管理员时不能直接显示大屏（主要为了维护方例）
          // const { userType, userId } = store.state.account.userinfo
          // 用户类型：0平台管理员，1租户管理员，2租户用户
          // if (
          //   type === 'init' &&
          //   data &&
          //   data.length == 1 &&
          //   userType == 2 &&
          //   data[0].createBy != userId
          // ) {
          //   // 跳转显示大屏，调用ue方法
          //   state.viewCase(data[0].id, data[0].entities)
          // } else {
          //   state.data = data
          // }
          state.data = data;
        } else {
          ctx.$message.error('查询失败');
        }
      },
      // 删除
      openDeleteCaseDialog: (operateFlag, id) => {
        if (operateFlag == 1) {
          state.deteleCaseId = id;
          state.dialogVisible = true;
        } else {
          ctx.$message.warning('当前用户没有删除权限');
        }
      },
      deleteCase: async () => {
        const { code } = await DeleteCase(state.deteleCaseId);
        if (+code === 1) {
          state.dialogVisible = false;
          ctx.$message.success('删除成功');
          state.query();
        } else {
          ctx.$message.error('删除失败');
        }
      },
      // 编辑
      editCase: async (operateFlag, id) => {
        if (operateFlag == 1) {
          // 已发布状态变成未发布，然后跳转草稿箱编辑页面
          const { code } = await UpdateCasePublishState({
            id,
            publishState: 0,
          });
          if (+code === 1) {
            router.push(`/drafts/edit/scene?id=${id}`);
          } else {
            ctx.$message.error('操作失败');
          }
        } else {
          ctx.$message.warning('当前用户没有编辑权限');
        }
      },
      // 查看
      viewCase: (id, entities) => {
        if (state.permissions[0].show) {
          // 都有查看权限，进入ue界面
          router.push(`/preview?id=${id}&from=/myCase`);
        } else {
          ctx.$message.warning('当前用户没有查看权限');
        }
      },
    });
    onMounted(async () => {
      await state.query('init');
      let caseMenu = menusData.find(item => item.routing == '/myCase');
      if (caseMenu.children && caseMenu.children.length) {
        state.permissions.map(v => {
          let temp = caseMenu.children.find(item => item.name == v.name);
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


const _hoisted_1 = { class: "my-case-page" };
const _hoisted_2 = { class: "search-area" };
const _hoisted_3 = /*#__PURE__*/createTextVNode("查 询");
const _hoisted_4 = { class: "my-case-page-content" };
const _hoisted_5 = { class: "item-area-content" };
const _hoisted_6 = { class: "top" };
const _hoisted_7 = ["src", "onClick"];
const _hoisted_8 = { class: "bottom" };
const _hoisted_9 = { class: "title-area" };
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "icon-area" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "content-area" };
const _hoisted_15 = /*#__PURE__*/createBaseVNode("div", { class: "row" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$1,
    alt: ""
  }),
  /*#__PURE__*/createBaseVNode("span", { class: "name" }, "是否确定删除记录？")
], -1);
const _hoisted_16 = /*#__PURE__*/createBaseVNode("div", { class: "tips" }, "删除此记录后将无法恢复。", -1);
const _hoisted_17 = { class: "dialog-footer" };
const _hoisted_18 = /*#__PURE__*/createTextVNode(" 确 认 ");
const _hoisted_19 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_el_input, {
        class: "text",
        modelValue: _ctx.input,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.input) = $event)),
        placeholder: "请输入搜索条件"
      }, null, 8, ["modelValue"]),
      createVNode(_component_el_button, {
        type: "primary",
        class: "btn",
        onClick: _ctx.query
      }, {
        default: withCtx(() => [
          _hoisted_3
        ]),
        _: 1
      }, 8, ["onClick"])
    ]),
    createBaseVNode("div", _hoisted_4, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          key: index,
          class: "item-area"
        }, [
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("img", {
                src: item.imageUrl,
                alt: "",
                onClick: $event => (_ctx.viewCase(item.id, item.entities))
              }, null, 8, _hoisted_7)
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("div", {
                  class: "title",
                  onClick: $event => (_ctx.viewCase(item.id, item.entities))
                }, toDisplayString(item.caseName), 9, _hoisted_10),
                createBaseVNode("div", _hoisted_11, [
                  (_ctx.permissions[2].show)
                    ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        class: "icon",
                        src: _imports_0,
                        alt: "",
                        onClick: $event => (_ctx.editCase(item.operateFlag, item.id))
                      }, null, 8, _hoisted_12))
                    : createCommentVNode("", true),
                  (_ctx.permissions[1].show)
                    ? (openBlock(), createElementBlock("img", {
                        key: 1,
                        class: "icon",
                        src: _imports_1,
                        alt: "",
                        onClick: $event => (_ctx.openDeleteCaseDialog(item.operateFlag, item.id))
                      }, null, 8, _hoisted_13))
                    : createCommentVNode("", true)
                ])
              ]),
              createBaseVNode("div", _hoisted_14, toDisplayString(item.caseDesc), 1)
            ])
          ])
        ]))
      }), 128))
    ]),
    createVNode(_component_el_dialog, {
      "custom-class": "delete-dialog",
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.dialogVisible) = $event)),
      title: "确认提示",
      width: "640px"
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_17, [
          createVNode(_component_el_button, {
            class: "btn btn-save",
            type: "primary",
            onClick: _ctx.deleteCase
          }, {
            default: withCtx(() => [
              _hoisted_18
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "btn btn-cancel",
            onClick: _cache[1] || (_cache[1] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_19
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_15,
        _hoisted_16
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { index as default };
