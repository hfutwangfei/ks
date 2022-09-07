import { l as ref, T as onMounted, j as reactive, q as onUnmounted, F as toRefs, o as openBlock, B as createElementBlock, C as createBaseVNode, H as renderSlot, I as withDirectives, a0 as vShow, J as normalizeStyle, x as ElMessage } from './element-plus.da98f360.js';
import { _ as _export_sfc, u as useRouter, U as UE } from './index.acc4a696.js';

var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAD1BMVEVHcEz///////////////8T4DEaAAAABXRSTlMATZgYMYvQ93oAAAAzSURBVHgBvdAxEQAwCEPR1kGvEghC8K+KPRmYSMZ/j4Vj3n0UPghEEUg70CAnRoLphZtrqQsFVYwelaoAAAAASUVORK5CYII=";

var checkDetail_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".check-view{width:100%;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex}.check-view .check-view-drawer{width:20%}.check-view .check-view-drawer .close-box{position:absolute;right:-.083333rem;top:40%;width:.083333rem;height:.208333rem;z-index:3000;background-color:#373b48;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer}.check-view .check-view-drawer .close-box img{width:100%;height:.083333rem}.check-view .check-view-drawer .check-view-drawer-box{width:100%;height:100%;background-color:#2a2e39}.check-view .check-view-drawer .check-view-drawer-box .check-view-drawer-content{margin-left:.104167rem;position:relative;height:100%}.check-view .check-view-drawer .check-view-drawer-box .check-view-drawer-content .btn-box{width:100%;position:absolute;bottom:.416667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;cursor:pointer}.check-view .check-view-drawer .check-view-drawer-box .check-view-drawer-content .btn-box span{display:inline-block;width:.427083rem;height:.166667rem;color:#fff;background-color:#428fff;border-radius:.020833rem;text-align:center;line-height:.166667rem;font-size:.072917rem}.check-view .check-view-drawer .check-view-drawer-box .check-view-drawer-content .btn-box span.btn-edit{margin-left:20%}.check-view .check-view-drawer .check-view-drawer-box .check-view-drawer-content .btn-box span.btn-back{background-color:#2a2e39;border:1px solid #428fff;color:#428fff;margin-right:30%}.check-view .model-box{display:-webkit-box;display:-ms-flexbox;display:flex;width:80%;height:100%;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.check-view .model-box .model-image{width:100%;height:100%}div.check-view-drawer .ltr{height:1.5625rem}div.check-view-drawer.ltr{height:calc(100vh - .317708rem);top:.317708rem}.top{position:relative}\n")();

const _sfc_main = {
  setup(props, { emit }) {
    let router = useRouter();
    const model_box = ref(null);
    console.log(model_box, '222');

    onMounted(() => {
      var top = document.querySelector('.top');
      state.pageHeight =
        document.querySelector('#app').offsetHeight - Number(top.offsetHeight);
      // console.log(state.pageHeight, top.offsetHeight, 'state.pageHeight')
      state.UISize = model_box.value.offsetWidth + ',' + state.pageHeight;

      state.UIPos = model_box.value.offsetLeft + ',' + model_box.value.offsetTop;
      //  console.log(model_box.value.offsetWidth,'222')
      console.log(state.UISize, state.UIPos, '1111');
    });
    // let modAndDelFlag = props.modAndDelFlag
    let state = reactive({
      count: 0,
      modelName: ['场景名称', '苏州工业区', '苏州工业区'],
      tags: ['标签一', '标签二', '标签三'],
      imgWidth: '80%',
      sourceName: '',
      code: '',
      id: '',
      source: 0,
      pageData: {},
      modAndDelFlag: true,
      pageHeight: 0,
      UISize: '',
      UIPos: '',
    });
    onUnmounted(() => {
      console.log('edit onUnmounted');
      UE.publish('DestroyAll', {});
    });
    console.log(state.modAndDelFlag, 'modAndDelFlagmodAndDelFlag');
    state.sourceName = props.source;
    state.code = props.code;
    const methods = {
      checkSceneModel(id) {
        var params = {
          modelId: id,
          UISize: state.UISize,
          UIPos: state.UIPos,
        };
        // UIPos: '400,60',
        // UISize: '1220,1020'
        console.log(params, 4444);
        UE.publish('YYCJ_View', params);
      },
      checkModel(id) {
        var params = {
          modelId: id,
          UISize: state.UISize,
          UIPos: state.UIPos,
        };
        console.log(params, 123);
        UE.publish('MXGL_View', params);
      },
      toEdit() {
        if (!state.modAndDelFlag) {
          ElMessage.error('您没有权限');
          return
        }
        var params = {};
        var pathName;
        params.code = state.code;
        params.source = 'edit';
        console.log(state.pageData, 222);
        if (state.source === 0) {
          if (state.sourceName === 'scene') {
            pathName = 'editScene';
          } else {
            pathName = 'editModel';
          }
          router.push({
            name: pathName,
            query: params,
          });
        } else {
          if (state.sourceName === 'scene') {
            pathName = '';
            router.push({
              name: 'tenantEdit',
              params: {
                id: state.id,
              },
            });
            localStorage.setItem(
              'tenantEditSceneItem',
              JSON.stringify(state.pageData)
            );
            // router.push({
            //   name: 'editScene',
            //   query: params,
            // })
          } else {
            router.push({
              name: 'tenantModelEdit',
              params: {
                id: state.id,
                code: state.code,
              },
            });
            localStorage.setItem(
              'tenantEditModelItem',
              JSON.stringify(state.pageData)
            );
          }
        }
      },
      goBack() {
        emit('goBack');
      },
    };
    return {
      ...toRefs(state),
      ...methods,
      model_box,
    }
  },
  mounted() {
    // this.checkModel()
  },
  props: {
    source: {
      type: String,
      default: 'scene',
    },
    code: {
      type: String,
    },
    // modAndDelFlag: {
    //   type: Boolean
    // }
  },
  unmounted() {
    // var top = document.getElementsByClassName('top')
    // console.log(top, 33333)
  },
};


const _hoisted_1 = { class: "check-view-drawer" };
const _hoisted_2 = { class: "check-view-drawer-box" };
const _hoisted_3 = { class: "check-view-drawer-content" };
const _hoisted_4 = { class: "btn-box" };
const _hoisted_5 = { class: "close-box" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0,
  alt: ""
}, null, -1);
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = {
  class: "model-box",
  ref: "model_box"
};

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: "check-view",
    style: normalizeStyle({ height: _ctx.pageHeight + 'px' })
  }, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "content"),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("span", {
              class: "btn-edit",
              onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.toEdit && _ctx.toEdit(...args)))
            }, "编辑"),
            createBaseVNode("span", {
              class: "btn-back",
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.goBack && _ctx.goBack(...args)))
            }, "返回")
          ]),
          withDirectives(createBaseVNode("div", _hoisted_5, _hoisted_7, 512), [
            [vShow, false]
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_8, null, 512)
  ], 4))
}
var checkDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { checkDetail as c };
