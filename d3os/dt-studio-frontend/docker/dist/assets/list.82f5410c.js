import { l as ref, T as onMounted, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, a1 as withKeys, u as unref, C as createBaseVNode, L as Fragment, M as renderList, Y as normalizeClass, O as toDisplayString, N as createTextVNode, x as ElMessage, a3 as ElMessageBox } from './element-plus.da98f360.js';
import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { q as queryCasesByPage, u as updateCasePublishState, d as deleteCase } from './drafts.60815a70.js';
import './monaco-editor.e9574fd0.js';

var list_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => "[data-v-aec4934e]::-webkit-scrollbar{display:none}.draft-list[data-v-aec4934e]{padding:.104167rem;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background:#2a2e39;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.draft-list__top .search[data-v-aec4934e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-list__top .search .el-input[data-v-aec4934e]{width:1.25rem;font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.draft-list__top .search .el-input[data-v-aec4934e] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.draft-list__top .search .el-input[data-v-aec4934e] .el-input__inner::-moz-placeholder{color:#ffffff4d}.draft-list__top .search .el-input[data-v-aec4934e] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.draft-list__top .search .el-input[data-v-aec4934e] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.draft-list__top .search .el-input[data-v-aec4934e] .el-input__inner::placeholder{color:#ffffff4d}.draft-list__top .search .el-button[data-v-aec4934e]{margin-left:.083333rem;padding:0;width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff;background:none}.draft-list__top .create[data-v-aec4934e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.draft-list__top .create .el-button[data-v-aec4934e]{padding:0;width:.541667rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem}.draft-list__ul[data-v-aec4934e]{margin:.104167rem 0;-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-line-pack:start;align-content:flex-start}.draft-list__ul .item[data-v-aec4934e]{margin-bottom:.104167rem;width:1.875rem}.draft-list__ul .item.mr[data-v-aec4934e]{margin-right:.104167rem}.draft-list__ul .item .el-card[data-v-aec4934e]{background:#373b48}.draft-list__ul .item .image[data-v-aec4934e]{width:1.875rem;height:1.052083rem}.draft-list__ul .item .card__bottom[data-v-aec4934e]{padding:0 .083333rem;height:.375rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.draft-list__ul .item .card__bottom .top[data-v-aec4934e]{color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-list__ul .item .card__bottom .top .btns[data-v-aec4934e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.draft-list__ul .item .card__bottom .top .btns .btn[data-v-aec4934e]{margin-left:.083333rem}.draft-list__ul .item .card__bottom .top .btns .btn .svg-img[data-v-aec4934e]{width:.083333rem;height:.083333rem}.draft-list__ul .item .card__bottom .desc[data-v-aec4934e]{margin-top:.052083rem;color:#fff9}.draft-list__bottom[data-v-aec4934e]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.draft-list__bottom[data-v-aec4934e] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.draft-list__bottom[data-v-aec4934e] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.draft-list__bottom[data-v-aec4934e] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.draft-list__bottom[data-v-aec4934e] .el-pagination .btn-prev,.draft-list__bottom[data-v-aec4934e] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}\n")();

const _hoisted_1 = { class: "draft-list" };
const _hoisted_2 = /*#__PURE__*/createTextVNode("查 询");
const _hoisted_3 = /*#__PURE__*/createTextVNode(" 创建案例 ");
const _hoisted_4 = { class: "draft-list__ul" };
const _hoisted_5 = ["src", "onClick"];
const _hoisted_6 = { class: "card__bottom" };
const _hoisted_7 = { class: "top" };
const _hoisted_8 = { class: "btns" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = ["onClick"];
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "desc" };
const _hoisted_13 = { class: "draft-list__bottom" };


const _sfc_main = {
  __name: 'list',
  setup(__props) {

const router = useRouter();

const page = ref(1);
const total = ref(0);

const keyWord = ref('');
const caseList = ref([]);
const getList = async () => {
  let { data } = await queryCasesByPage({
    publishState: 0,
    keyWord: keyWord.value,
    page: page.value,
  });
  caseList.value = data.list;
  total.value = data.total;
};
const change = num => {
  page.value = num;
  getList();
};
onMounted(() => {
  getList();
});

const preview = caseId => {
  router.push(`/preview?id=${caseId}&from=/drafts`);
};

const pub = item => {
  let { operateFlag, id } = item;
  if (operateFlag !== 1) return ElMessage.error('无操作权限')

  ElMessageBox.confirm('发布以后请在“我的案例”中查看。', '是否确定发布案例？', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    // type: 'warning',
  })
    .then(async () => {
      await updateCasePublishState({ id, publishState: 1 });
      ElMessage({
        type: 'success',
        message: '发布成功',
      });
      getList();
    })
    .catch(() => {});
};

const edit = item => {
  let { operateFlag, id } = item;
  if (operateFlag !== 1) return ElMessage.error('无操作权限')

  router.push(`/drafts/edit/scene?id=${id}`);
};

const del = item => {
  let { operateFlag, id } = item;
  if (operateFlag !== 1) return ElMessage.error('无操作权限')

  ElMessageBox.confirm('删除此记录后将无法恢复。', '是否确定删除记录？', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    type: 'error',
  })
    .then(async () => {
      await deleteCase({ caseId: id });
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
      getList();
    })
    .catch(() => {});
};

return (_ctx, _cache) => {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_card = resolveComponent("el-card");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_el_row, {
      class: "draft-list__top",
      justify: "space-between"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_col, {
          span: 5,
          class: "search"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_input, {
              modelValue: keyWord.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((keyWord).value = $event)),
              placeholder: "请输入搜索条件",
              onKeyup: withKeys(getList, ["enter"])
            }, null, 8, ["modelValue", "onKeyup"]),
            createVNode(_component_el_button, {
              type: "primary",
              plain: "",
              onClick: getList
            }, {
              default: withCtx(() => [
                _hoisted_2
              ]),
              _: 1
            })
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
              onClick: _cache[1] || (_cache[1] = $event => (unref(router).push('/drafts/edit/scene')))
            }, {
              default: withCtx(() => [
                _hoisted_3
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createBaseVNode("div", _hoisted_4, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(caseList.value, (item, i) => {
        return (openBlock(), createElementBlock("div", {
          class: normalizeClass(["item", { mr: (i + 1) % 5 !== 0 }]),
          key: item.id
        }, [
          createVNode(_component_el_card, { "body-style": { padding: '0px' } }, {
            default: withCtx(() => [
              createBaseVNode("img", {
                src: item.imageUrl,
                class: "image",
                onClick: $event => (preview(item.id))
              }, null, 8, _hoisted_5),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("span", null, toDisplayString(item.caseName), 1),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", {
                      class: "btn",
                      onClick: $event => (pub(item))
                    }, [
                      createVNode(_component_svg_icon, {
                        name: "drafts-issue",
                        class: "svg-img"
                      })
                    ], 8, _hoisted_9),
                    createBaseVNode("div", {
                      class: "btn",
                      onClick: $event => (edit(item))
                    }, [
                      createVNode(_component_svg_icon, {
                        name: "drafts-edit",
                        class: "svg-img"
                      })
                    ], 8, _hoisted_10),
                    createBaseVNode("div", {
                      class: "btn",
                      onClick: $event => (del(item))
                    }, [
                      createVNode(_component_svg_icon, {
                        name: "drafts-delete",
                        class: "svg-img"
                      })
                    ], 8, _hoisted_11)
                  ])
                ]),
                createBaseVNode("span", _hoisted_12, toDisplayString(item.caseDesc), 1)
              ])
            ]),
            _: 2
          }, 1024)
        ], 2))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_13, [
      createVNode(_component_el_pagination, {
        "pager-count": 5,
        background: "",
        layout: "total, prev, pager, next",
        total: total.value,
        onCurrentChange: change
      }, null, 8, ["total"])
    ])
  ]))
}
}

};
var list = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-aec4934e"]]);

export { list as default };
