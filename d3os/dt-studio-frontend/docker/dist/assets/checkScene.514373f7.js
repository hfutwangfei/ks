import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { c as checkDetail } from './checkDetail.6e738929.js';
import { b as getScenesInfo } from './sceneList.b22bf172.js';
import { l as ref, j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, O as toDisplayString, L as Fragment, M as renderList } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var checkScene_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".check-scene .scene-content h1{color:#fff;font-size:.083333rem;padding:.104167rem 0 .0625rem}.check-scene .scene-content .model-tag{color:#fff9}.check-scene .scene-content .model-tag span{color:#fff9;padding-left:.083333rem}.check-scene .scene-content .modal-tag-label{margin-top:.104167rem;margin-left:.052083rem}.check-scene .scene-content .modal-tag-label span{color:#fff9;background-color:#ffffff0a;padding:.015625rem;border-radius:.010417rem;margin-left:.041667rem}.check-scene .scene-content .model-small-img-box{color:#fff9;margin-top:.104167rem;height:.4375rem;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.check-scene .scene-content .model-small-img-box span{padding-right:.083333rem}.check-scene .scene-content .model-small-img-box img{width:.583333rem;height:.4375rem}\n")();

const _sfc_main = {
  setup(props) {
    const checkDetail = ref('');
    let router = useRouter();
    const { code } = router.currentRoute.value.query;
    console.log(checkDetail, 'checkDetail');
    let state = reactive({
      modelName: ['场景名称', '苏州工业区', '苏州工业区'],
      tags: ['标签一', '标签二', '标签三'],
      pageData: {},
      code: '',
    });
    onMounted(() => {});
    const methods = {
      async getScenesInfo() {
        let data = await getScenesInfo({ code });
        console.log(data, 'check');
        if (data.code === 1) {
          state.pageData = data.data;
          checkDetail.value.modAndDelFlag = data.data.modAndDelFlag;
          checkDetail.value.id = data.data.id;
          checkDetail.value.code = data.data.code;
          checkDetail.value.pageData = data.data;
          checkDetail.value.source = data.data.source;
          checkDetail.value.checkSceneModel(data.data.code);
          // checkDetail.value.modAndDelFlag = false
        }
      },
      goBack() {
        router.push({
          name: 'scenelist',
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
  mounted() {
    this.getScenesInfo();
  },
  unmounted() {},
  components: {
    checkDetail,
  },
};

const _hoisted_1 = { class: "check-scene" };
const _hoisted_2 = { class: "scene-content" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("h1", null, "场景详情", -1);
const _hoisted_4 = { class: "model-tag" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("span", null, "场景名称", -1);
const _hoisted_6 = { class: "model-small-img-box" };
const _hoisted_7 = /*#__PURE__*/createBaseVNode("span", null, "模型缩略图", -1);
const _hoisted_8 = ["src"];
const _hoisted_9 = { class: "modal-tag-label" };
const _hoisted_10 = /*#__PURE__*/createBaseVNode("span", null, "标签", -1);

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_checkDetail = resolveComponent("checkDetail");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_checkDetail, {
      ref: "checkDetail",
      source: "scene",
      onGoBack: _ctx.goBack,
      code: _ctx.pageData.code
    }, {
      content: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createBaseVNode("div", _hoisted_4, [
            _hoisted_5,
            createBaseVNode("span", null, toDisplayString(_ctx.pageData.scenesName), 1)
          ]),
          createBaseVNode("div", _hoisted_6, [
            _hoisted_7,
            createBaseVNode("img", {
              class: "model-small-img",
              src: _ctx.pageData.thumbnail,
              alt: ""
            }, null, 8, _hoisted_8)
          ]),
          createBaseVNode("div", _hoisted_9, [
            _hoisted_10,
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pageData.labels, (item, index) => {
              return (openBlock(), createElementBlock("span", {
                class: "modal-tag-span",
                key: index
              }, toDisplayString(item.labelName), 1))
            }), 128))
          ])
        ])
      ]),
      _: 1
    }, 8, ["onGoBack", "code"])
  ]))
}
var checkScene = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { checkScene as default };
