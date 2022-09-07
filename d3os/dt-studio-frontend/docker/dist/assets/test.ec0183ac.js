import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { d as getScenesPage, h as deleteScenes } from './sceneList.b22bf172.js';
import { a as _imports_1, _ as _imports_0$1 } from './delete-icon.a33587a6.js';
import { _ as _imports_0 } from './warning-icon.ecaebaa1.js';
import { j as reactive, l as ref, n as nextTick, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, L as Fragment, M as renderList, O as toDisplayString, J as normalizeStyle, a as createVNode, w as withCtx, x as ElMessage, N as createTextVNode, $ as getCurrentInstance } from './element-plus.da98f360.js';
import { c as checkDetail } from './checkDetail.6e738929.js';
import './monaco-editor.e9574fd0.js';

var senceList_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".scene-list-component{height:100%;overflow:hidden}.scene-list-component .scene-list-box{width:100%;margin-left:.104167rem;overflow:scroll;height:3.385417rem}.scene-list-component .scene-list-box ul{width:98%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:0}.scene-list-component .scene-list-box ul li{width:19%;list-style:none;cursor:pointer;margin:.4%;background:#373b48;margin-top:.104167rem}.scene-list-component .scene-list-box ul li .img-box{width:100%;height:1.145833rem;border-top-left-radius:.020833rem;border-top-right-radius:.020833rem;overflow:hidden}.scene-list-component .scene-list-box ul li .img-box img{width:100%;height:100%}.scene-list-component .scene-list-box ul li .scene-item-name{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:.067708rem}.scene-list-component .scene-list-box ul li .scene-item-name span{color:#fff;font-size:.083333rem;margin-left:.104167rem}.scene-list-component .scene-list-box ul li .scene-item-name .scene-btn{display:-webkit-box;display:-ms-flexbox;display:flex}.scene-list-component .scene-list-box ul li .scene-item-name .scene-btn .btn-icon{width:.083333rem;height:.083333rem;cursor:pointer;margin-right:.083333rem}.scene-list-component .scene-list-box ul li .scene-item-name .scene-btn .btn-icon img{width:100%;height:100%}.scene-list-component .scene-list-box ul li .scene-item-tag{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:.067708rem}.scene-list-component .scene-list-box ul li .scene-item-tag p{margin-left:.083333rem}.scene-list-component .scene-list-box ul li .scene-item-tag span{color:#fff9;margin-right:.015625rem;font-size:.0625rem}.scene-list-component .scene-list-box ul li .scene-item-tag span.scene-source{margin-right:.083333rem}.scene-list-component .pagination{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.scene-list-component .pagination span{color:#fff9;font-size:.072917rem;margin-right:.098958rem}.scene-list-component .pagination .pagination-detail{margin-right:.09375rem}.scene-list-component .pagination .pagination-detail .el-pager li,.scene-list-component .pagination .pagination-detail .btn-next,.scene-list-component .pagination .pagination-detail .btn-prev{background:#2a2e39;border:1px solid rgba(255,255,255,.3)}.scene-list-component .pagination .pagination-detail .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.scene-list-component .delete-confirm-dialog{background:#373b48}.scene-list-component .delete-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.scene-list-component .delete-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.scene-list-component .delete-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.scene-list-component .delete-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.scene-list-component .delete-confirm-dialog .dialog-content .confirm-box img{width:.166667rem;height:.166667rem;margin-right:.125rem}.scene-list-component .delete-confirm-dialog .dialog-content .confirm-tag span{display:inline-block;width:.166667rem;height:.166667rem;margin-right:.125rem}.scene-list-component .delete-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.scene-list-component .delete-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.scene-list-component .delete-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}\n")();

const _sfc_main$1 = {
  setup(props, { emit }) {
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance();
    const { source, searchObj } = props;
    console.log(searchObj, 'searchObj');
    let router = useRouter();
    let state = reactive({
      form: {
        sceneSource: '',
        sceneState: '',
        sceneName: '',
        tagName: '',
      },
      total: 0,
      currentPage: 1,
      listData: [],
      dialogVisible: false,
      deleteData: {},
    });
    let listHeight = ref('');
    nextTick(() => {
      var searchHeight = document.getElementById('search-id').offsetHeight;
      var paginationScene = document.getElementById('pagination-scene')
        .offsetHeight;
      var pageHeight = document.body.clientHeight - paginationScene;

      console.log(pageHeight, paginationScene, searchHeight, 'search');
      listHeight.value = pageHeight - searchHeight - paginationScene - 60;
    });
    const methods = {
      async getScenesPage() {
        var scenesPageVO = {
          labelName: state.form.tagName,
          sceneName: state.form.sceneName,
          page: state.currentPage,
          size: 10,
          state: state.form.sceneState,
        };
        let { data } = await getScenesPage(scenesPageVO);
        state.listData = data.list;
        state.total = data.total;
        // data.list.map(item => {
        //   state.listData.push(item)
        // })

        console.log(data.list, 222222);
      },
      editScene(item) {
        var pathName;
        if (source === 'scene') {
          pathName = 'editScene';
        } else {
          pathName = 'editModel';
        }
        var params = item.code;
        router.push({
          name: pathName,
          query: {
            params,
            source: 'edit',
          },
        });
      },
      checkScene(item) {
        router.push({
          name: 'sceneCheck',
          query: {
            code: item.code,
            source: 'edit',
          },
        });
      },
      deleteClick(item) {
        state.deleteData = item;
        state.dialogVisible = true;
      },
      async deleteScene() {
        var item = state.deleteData;
        console.log(item, 222);
        let data = await deleteScenes({ code: item.code });
        console.log(data, 222222);
        if (data.code === 1) {
          ElMessage.success('删除成功');
          state.dialogVisible = false;
          ctx.getScenesPage();
        } else {
          ElMessage.error(data.msg);
        }
      },
      changeCurrent(size) {
        console.log(size, ctx);
        state.currentPage = size;
        ctx.getScenesPage();
      },
    };
    return {
      ...toRefs(state),
      ...methods,
      listHeight,
    }
  },
  props: {
    source: {
      type: String,
      default: 'model',
    },
    searchObj: {
      type: Object,
    },
  },
  mounted() {
    this.getScenesPage();
  },
  unmounted() {},
};


const _hoisted_1$1 = { class: "scene-list-component" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "scene-item-name" };
const _hoisted_5 = { class: "scene-btn" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$1,
  alt: ""
}, null, -1);
const _hoisted_8 = [
  _hoisted_7
];
const _hoisted_9 = { class: "btn-icon" };
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "scene-item-tag" };
const _hoisted_12 = { class: "scene-source" };
const _hoisted_13 = {
  class: "pagination",
  id: "pagination-scene"
};
const _hoisted_14 = /*#__PURE__*/createBaseVNode("div", { class: "dialog-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0,
      alt: ""
    }),
    /*#__PURE__*/createBaseVNode("span", null, "确认删除该场景？")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-tag" }, [
    /*#__PURE__*/createBaseVNode("span"),
    /*#__PURE__*/createBaseVNode("a", {
      href: "void(0)",
      class: "confirm-tag-detail"
    }, " 删除后平台租户不可再下载使用。 ")
  ])
], -1);
const _hoisted_15 = { class: "dialog-footer" };
const _hoisted_16 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_17 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", {
      class: "scene-list-box",
      style: normalizeStyle({ height: $setup.listHeight + 'px' })
    }, [
      createBaseVNode("ul", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.listData, (item, index) => {
          return (openBlock(), createElementBlock("li", { key: index }, [
            createBaseVNode("div", {
              class: "img-box",
              onClick: $event => (_ctx.checkScene(item))
            }, [
              createBaseVNode("img", {
                src: item.thumbnail,
                alt: ""
              }, null, 8, _hoisted_3)
            ], 8, _hoisted_2),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", null, toDisplayString(item.scenesName), 1),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", {
                  class: "btn-icon",
                  onClick: $event => (_ctx.editScene(item))
                }, _hoisted_8, 8, _hoisted_6),
                createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("img", {
                    onClick: $event => (_ctx.deleteClick(item)),
                    src: _imports_1,
                    alt: ""
                  }, null, 8, _hoisted_10)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("p", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.labels, (tag, tagIndex) => {
                  return (openBlock(), createElementBlock("span", { key: tagIndex }, toDisplayString(tag.labelName), 1))
                }), 128))
              ]),
              createBaseVNode("span", _hoisted_12, toDisplayString(item.source === 0 ? '平台' : '租户'), 1)
            ])
          ]))
        }), 128))
      ])
    ], 4),
    createBaseVNode("div", _hoisted_13, [
      createBaseVNode("span", null, "总共" + toDisplayString(_ctx.total) + "条", 1),
      createVNode(_component_el_pagination, {
        class: "pagination-detail",
        background: "",
        layout: "prev, pager, next",
        total: _ctx.total,
        onCurrentChange: _ctx.changeCurrent
      }, null, 8, ["total", "onCurrentChange"])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.dialogVisible) = $event)),
      title: "删除确认",
      width: "640px",
      "custom-class": "delete-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_15, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.deleteScene
          }, {
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[0] || (_cache[0] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_14
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var senceList = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

const _sfc_main = {
  setup() {
    let state = reactive({
      modelName: ['场景名称', '苏州工业区', '苏州工业区'],
      tags: ['标签一', '标签二', '标签三'],
    });
    return {
      ...toRefs(state),
      //   ...components
    }
  },
  unmounted() {},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    checkDetail,
    senceList,
  },
};

const _hoisted_1 = { class: "test" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_senceList = resolveComponent("senceList");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_senceList)
  ]))
}
var test = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { test as default };
