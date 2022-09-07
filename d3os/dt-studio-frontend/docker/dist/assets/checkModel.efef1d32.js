import { _ as _export_sfc, c as store, u as useRouter } from './index.acc4a696.js';
import { c as checkDetail } from './checkDetail.6e738929.js';
import { g as getModelInfo } from './modelScene.42824c77.js';
import { l as ref, j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, O as toDisplayString, G as createCommentVNode, L as Fragment, M as renderList, $ as getCurrentInstance } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var checkModel_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".model-check h1{color:#fff;font-size:.083333rem;padding:.104167rem 0 .0625rem}.model-check .scene-content{font-size:.0625rem}.model-check .scene-content .model-item{display:-webkit-box;display:-ms-flexbox;display:flex;margin-top:.104167rem}.model-check .scene-content .model-item label{display:inline-block;width:.520833rem;text-align:right;color:#fff9;margin-right:.083333rem}.model-check .scene-content .model-item .model-item-detail{color:#fff}.model-check .scene-content .model-item .model-item-detail .model-small-img-box{color:#fff9;height:.4375rem;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.model-check .scene-content .model-item .model-item-detail .model-small-img-box span{padding-right:.083333rem}.model-check .scene-content .model-item .model-item-detail .model-small-img-box img{width:.583333rem;height:.4375rem}.model-check .scene-content .model-item .model-item-detail .span-bg{display:inline-block;width:.291667rem;height:.145833rem;color:#fff;text-align:center;line-height:.145833rem;border-radius:.010417rem;background:rgba(255,255,255,.04);margin-right:.041667rem}\n")();

// eslint-disable-next-line no-unused-vars
store.state.account;
const _sfc_main = {
  setup(props) {
    let router = useRouter();
    const checkDetail = ref('');
    const { proxy } = getCurrentInstance();
    const { code } = router.currentRoute.value.query;
    let state = reactive({
      modelName: ['场景名称', '苏州工业区', '苏州工业区'],
      tags: ['标签一', '标签二', '标签三'],
      pageData: {},
    });
    onMounted(() => {
      proxy.getModelInfo();
    });
    const methods = {
      async getModelInfo() {
        let data = await getModelInfo({ code: code });
        if (data.code === 1) {
          state.pageData = data.data;
          checkDetail.value.code = data.data.code;
          checkDetail.value.source = data.data.source;
          checkDetail.value.modAndDelFlag = data.data.modAndDelFlag;
          checkDetail.value.pageData = data.data;
          checkDetail.value.checkModel(data.data.code);
        }
      },
      goBack() {
        router.push({
          name: 'modelIndex',
          query: {
            from: 'mxlb',
          },
        });
      },
    };
    return {
      ...toRefs(state),
      ...methods,
      checkDetail,
      //   ...components
    }
  },
  unmounted() {},
  components: {
    checkDetail,
  },
};

const _hoisted_1 = { class: "model-check" };
const _hoisted_2 = { class: "scene-content" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("h1", null, "模型详情", -1);
const _hoisted_4 = { class: "model-item" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("label", null, "模型名称", -1);
const _hoisted_6 = { class: "model-item-detail" };
const _hoisted_7 = { class: "model-item" };
const _hoisted_8 = /*#__PURE__*/createBaseVNode("label", null, "模型文件", -1);
const _hoisted_9 = { class: "model-item-detail" };
const _hoisted_10 = { class: "model-item" };
const _hoisted_11 = /*#__PURE__*/createBaseVNode("label", null, "模型缩略图", -1);
const _hoisted_12 = { class: "model-item-detail" };
const _hoisted_13 = { class: "model-small-img-box" };
const _hoisted_14 = ["src"];
const _hoisted_15 = { class: "model-item" };
const _hoisted_16 = /*#__PURE__*/createBaseVNode("label", null, "品牌厂家", -1);
const _hoisted_17 = { class: "model-item-detail" };
const _hoisted_18 = { class: "model-item" };
const _hoisted_19 = /*#__PURE__*/createBaseVNode("label", null, "规格型号", -1);
const _hoisted_20 = { class: "model-item-detail" };
const _hoisted_21 = {
  key: 0,
  class: "model-item"
};
const _hoisted_22 = /*#__PURE__*/createBaseVNode("label", null, "所属领域", -1);
const _hoisted_23 = { class: "model-item-detail" };
const _hoisted_24 = {
  key: 1,
  class: "model-item"
};
const _hoisted_25 = /*#__PURE__*/createBaseVNode("label", null, "分类", -1);
const _hoisted_26 = { class: "model-item-detail" };
const _hoisted_27 = {
  key: 2,
  class: "model-item-box"
};
const _hoisted_28 = { class: "model-item" };
const _hoisted_29 = /*#__PURE__*/createBaseVNode("label", null, "模型来源", -1);
const _hoisted_30 = { class: "model-item-detail" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_checkDetail = resolveComponent("checkDetail");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_checkDetail, {
      source: "model",
      onGoBack: _ctx.goBack,
      ref: "checkDetail"
    }, {
      content: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createBaseVNode("div", _hoisted_4, [
            _hoisted_5,
            createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.pageData.name), 1)
          ]),
          createBaseVNode("div", _hoisted_7, [
            _hoisted_8,
            createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.pageData.modelSourceFile), 1)
          ]),
          createBaseVNode("div", _hoisted_10, [
            _hoisted_11,
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("img", {
                  class: "model-small-img",
                  src: _ctx.pageData.thumbnail,
                  alt: ""
                }, null, 8, _hoisted_14)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_15, [
            _hoisted_16,
            createBaseVNode("div", _hoisted_17, toDisplayString(_ctx.pageData.brandName), 1)
          ]),
          createBaseVNode("div", _hoisted_18, [
            _hoisted_19,
            createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.pageData.specifications), 1)
          ]),
          (_ctx.pageData.source === 0 && _ctx.pageData.fieldDTO != null)
            ? (openBlock(), createElementBlock("div", _hoisted_21, [
                _hoisted_22,
                createBaseVNode("div", _hoisted_23, toDisplayString(_ctx.pageData.fieldDTO.fieldName), 1)
              ]))
            : createCommentVNode("", true),
          (_ctx.pageData.source == 1)
            ? (openBlock(), createElementBlock("div", _hoisted_24, [
                _hoisted_25,
                createBaseVNode("div", _hoisted_26, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pageData.labels, (val, index) => {
                    return (openBlock(), createElementBlock("span", {
                      class: "span-bg",
                      key: index
                    }, toDisplayString(val.labelName), 1))
                  }), 128))
                ])
              ]))
            : createCommentVNode("", true),
          (_ctx.pageData.source === 0 && _ctx.pageData.fieldDTO != null)
            ? (openBlock(), createElementBlock("div", _hoisted_27, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pageData.fieldDTO.attributes, (item, index) => {
                  return (openBlock(), createElementBlock("div", {
                    class: "model-item",
                    key: index
                  }, [
                    createBaseVNode("label", null, toDisplayString(item.attributesName) + ":", 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.subattributes, (tag, tagIndex) => {
                      return (openBlock(), createElementBlock("div", {
                        class: "model-item-detail",
                        key: tagIndex
                      }, toDisplayString(tag.subattributeName), 1))
                    }), 128))
                  ]))
                }), 128))
              ]))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_28, [
            _hoisted_29,
            createBaseVNode("div", _hoisted_30, toDisplayString(_ctx.pageData.source === 0 ? '平台' : '租户'), 1)
          ])
        ])
      ]),
      _: 1
    }, 8, ["onGoBack"])
  ]))
}
var checkModel = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { checkModel as default };
