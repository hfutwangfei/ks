import { j as reactive, T as onMounted, F as toRefs, o as openBlock, B as createElementBlock, C as createBaseVNode, O as toDisplayString, I as withDirectives, a0 as vShow, L as Fragment, M as renderList, G as createCommentVNode, N as createTextVNode, x as ElMessage } from './element-plus.da98f360.js';
import { _ as _imports_0 } from './location-icon.2a626473.js';
import { a as _imports_1, _ as _imports_0$1 } from './delete-icon.a33587a6.js';
import { _ as _export_sfc } from './index.acc4a696.js';

var defaultImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAioAAAE8AgMAAACTOXI7AAAACVBMVEUiJjA2OkZBRk55zK3zAAAB7UlEQVR4Ae3VPa7UMBRH8etIuMgCKLKEWYWhpHoNzfQUL6uYJVhoRJ3CSGOvkut8gJS0SPcizk/vFTPVkfMfRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPB/uLeTp1lKOKe0atYSLy0tWbWM+fzNLVu1TJdTiGYtt0vLsJi1CC08o3+45Z59tOhePrTmo0X/x9ayl5ZbnhYvLXOKxUWL7qVKeLloEQl6KNVLix7Ku5eW4qVF9/Ly84w8bVfe0+DjN+3prtO9TI7eAUOryUuL3J/bh28OWnahJfO9HOI6Gx/nMv0oblrmT9VLS6jSB+NiL7HorefkXKYsY3HSMicZqnVLeJNtLiLNei/9yaxz0Y8P6/d0P5E+F5GPxbYltPXun9cXwE/blqFOyz4X7bLdy1j6VNa56Ok8TM/llvuZrHPRHS+mLbqWef3r4suypd9v07LNpQ/Gci/9dolln4sO5rPhufT3Yaj7XPSIvhu2bJdLO97Xsdm1DNulu8+lD8au5cufl9Fmtmu5b0M5HlH/TZm1/B7KIdq11PM3hvdLcdSSHbUkRy1Ci/tndGmxu1+mx/mbMVu1jJf7ZX5YtcR2kaxawiWlWqXoYM4tZnMBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODv++rG2y9gQ/CscLV71AAAAABJRU5ErkJggg==";

var _imports_3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAPFBMVEVCj/9DkP9DkP9Tmv9Cj/9Cj/9Cj/9HcExDlf9Dkf9CkP9Cj/9Cj/9Cj/9DkP9DkP9Ck/9Dkf9Dj/9DkP9gnu5MAAAAFHRSTlP/inIK4vP4ABZPgqO1xSNdMjGFmH7HMBUAAADOSURBVHgBdZLdsoMgDIS3kD/AWlvf/11PINVDZ3QvHMKnSDYLzVldlhZioSWtGoLhqbo2AEIk/mz2DwqD69bLrRK4HCABe7zmyhVSAnCsTr1G7QB4zfuqRdgGoIdrnciOFl90zacZ+3YuIZsP+yBBr/TGcg1U6Aa4B0LXCCQ3YMH7GiR85tq+t8/dq7mF8u3XoA2PuYNuDw1g/Gtut3cAN/PXXq+7V7Gq+fz7DqRngD5aquPWW/UpFz2AWpMjDGg+mRN4Tjw+wh6fcXeP1B8vrw6jh8pHtAAAAABJRU5ErkJggg==";

var _imports_4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEVHcEx6ntpCj/9Ekv9NkfVtm9xFkPtsoPJVk+5ym9eZuNZYl+15ndlclelomN9Cj/9fluVelOZHkfliluOgo69yntuhprCgo65Zlu6fo69DkP+fo65Cj/+fo65Dj/9CkP+BncifpK+fo65Cj/+fo67fgys6AAAAI3RSTlMAFvA3+1z+Ce1HBjAh2ofDxdL+tZEdM/Q/4XG+t72XkfN2u8a2/IcAAAEMSURBVHgBjZIJj4MgEIXBIkfFW2vssdfj///GBQRZjyb70tDgl3l5zAz5n/T3zzxxJnt1QLeXcYKTzDfoOhgzDUoLqqqyA9prYvRhkSDhC204pF7rHma+/TXKGWSsHcw8bhMUDG3IYqZYd7nEWo4l1csMkWVZpA2k+1PsS0QGRDp2cO/tUSaWaInenhLVEiJDDfvLCn+tvC/z9Z5RgEaqwOzJQd3liVoIQIgaT98K8AT1pyAOEvGhEwy2Th4GLbYx0A4ugdanbOHyFIVuPMLQBOvbHGFoH8nB4+jv933jSQtWvBsZuUqw/N2wiZbgzTrvcbMmtrYFurJS9GTBnJPEqt1q+n71kvHzpT7VL/9hFyEbyysCAAAAAElFTkSuQmCC";

var modelItem_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".scene-list-component{width:100%;margin:.4%;background:#373b48;padding-bottom:.052083rem}.scene-list-component .list-item{list-style:none;cursor:pointer;position:relative}.scene-list-component .list-item .img-box{width:100%;height:1.145833rem;border-top-left-radius:.020833rem;border-top-right-radius:.020833rem;position:relative;overflow:hidden}.scene-list-component .list-item .img-box .download{position:absolute;right:.041667rem;bottom:.041667rem;width:.25rem;height:.166667rem;background:rgba(255,255,255,.9);border-radius:.010417rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.scene-list-component .list-item .img-box img{width:100%;height:100%}.scene-list-component .list-item .scene-item-name{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:.067708rem}.scene-list-component .list-item .scene-item-name span{display:inline-block;max-width:calc(100% - .333333rem);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:#fff;font-size:.0625rem;margin-left:.083333rem}.scene-list-component .list-item .scene-item-name .scene-btn{display:-webkit-box;display:-ms-flexbox;display:flex}.scene-list-component .list-item .scene-item-name .scene-btn .btn-icon{width:.083333rem;height:.083333rem;cursor:pointer;margin-right:.083333rem}.scene-list-component .list-item .scene-item-name .scene-btn .btn-icon img{width:100%;height:100%}.scene-list-component .list-item .scene-item-tag{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-top:.026042rem}.scene-list-component .list-item .scene-item-tag .field-box{width:80%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.scene-list-component .list-item .scene-item-tag p{margin:0 0 .026042rem .083333rem}.scene-list-component .list-item .scene-item-tag span{color:#fff9;margin-right:.015625rem;font-size:.0625rem}.scene-list-component .list-item .scene-item-tag span.scene-source{margin-right:.083333rem;margin-left:.083333rem}.scene-list-component .list-item .mode-state{padding:.020833rem;background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#428fff;position:absolute;font-size:.0625rem;right:0;top:0;border-radius:0 .020833rem}.scene-list-component .list-item .mode-state img{width:.072917rem;height:.072917rem;margin-right:.020833rem;margin-left:.041667rem}\n")();

const _sfc_main = {
  setup(props, { emit }) {
    const { listItem } = props;
    let state = reactive({
      dialogVisible: false,
      deleteData: {},
      pageData: {},
      defaultImg: defaultImg,
    });
    state.pageData = listItem;
    onMounted(() => {});
    // console.log(state.pageData)
    const methods = {
      editScene() {
        // if (state.pageData.uploadState === 0 || state.pageData.state === 0) {
        //   ElMessage.warning('无法操作')
        //   return
        // }

        // if (!state.pageData.modAndDelFlag) {
        //   ElMessage.warning('您没有编辑权限')
        //   return
        // }
        emit('editScene', state.pageData);
      },
      editPoint() {
        emit('editPoint', state.pageData);
      },
      checkScene() {
        // if (!proxy.doData.isCheck) {
        //   ElMessage.warning('无法查看')
        //   return
        // }
        if (state.pageData.uploadState === 0 || state.pageData.state === 0) {
          ElMessage.warning('无法查看');
          return
        }
        emit('checkScene', state.pageData);
      },
      deleteClick() {
        if (state.pageData.uploadState === 0 || state.pageData.state === 0) {
          ElMessage.warning('无法操作');
          return
        }
        if (!state.pageData.modAndDelFlag) {
          ElMessage.warning('您没有删除权限');
          return
        }
        emit('deleteClick', state.pageData);
      },
      changeCurrent(size) {},
      defaultImgShow(event) {
        if (event.target.complete == true) {
          event.target.classList.remove('default-image');
          var imgParentNode = event.target.parentNode;
          if (imgParentNode.classList.contains('show-img') == true) {
            imgParentNode.style.background = '#000';
          }
        }
      },
    };
    return {
      ...toRefs(state),
      ...methods,
    }
  },
  props: {
    source: {
      type: String,
      default: 'model',
    },
    listItem: {
      type: Object,
    },
    doData: {
      type: Object,
    },
  },
  mounted() {},
  unmounted() {},
};


const _hoisted_1 = { class: "scene-list-component" };
const _hoisted_2 = { class: "list-item" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "scene-item-name" };
const _hoisted_5 = { class: "scene-btn" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0,
  alt: ""
}, null, -1);
const _hoisted_7 = [
  _hoisted_6
];
const _hoisted_8 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$1,
  alt: ""
}, null, -1);
const _hoisted_9 = [
  _hoisted_8
];
const _hoisted_10 = { class: "btn-icon" };
const _hoisted_11 = { class: "scene-item-tag" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { key: 1 };
const _hoisted_14 = {
  key: 2,
  class: "field-box"
};
const _hoisted_15 = /*#__PURE__*/createBaseVNode("span", null, "领域：", -1);
const _hoisted_16 = { class: "scene-source" };
const _hoisted_17 = {
  key: 0,
  class: "mode-state"
};
const _hoisted_18 = {
  key: 0,
  src: _imports_3,
  alt: ""
};
const _hoisted_19 = {
  key: 1,
  src: _imports_4,
  alt: ""
};

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", {
        class: "img-box",
        onClick: _cache[2] || (_cache[2] = $event => (_ctx.checkScene()))
      }, [
        createBaseVNode("img", {
          src: _ctx.pageData.thumbnail,
          onLoad: _cache[0] || (_cache[0] = (...args) => (_ctx.defaultImgShow && _ctx.defaultImgShow(...args))),
          onError: _cache[1] || (_cache[1] = (...args) => (_ctx.defaultImgShow && _ctx.defaultImgShow(...args))),
          class: "default-image",
          alt: ""
        }, null, 40, _hoisted_3)
      ]),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("span", null, toDisplayString($props.source === 'scene' ? _ctx.pageData.scenesName : _ctx.pageData.name), 1),
        createBaseVNode("div", _hoisted_5, [
          withDirectives(createBaseVNode("div", {
            class: "btn-icon",
            onClick: _cache[3] || (_cache[3] = $event => (_ctx.editPoint()))
          }, _hoisted_7, 512), [
            [vShow, _ctx.pageData.isEdit]
          ]),
          withDirectives(createBaseVNode("div", {
            class: "btn-icon",
            onClick: _cache[4] || (_cache[4] = $event => (_ctx.editScene()))
          }, _hoisted_9, 512), [
            [vShow, _ctx.pageData.isEdit]
          ]),
          withDirectives(createBaseVNode("div", _hoisted_10, [
            createBaseVNode("img", {
              onClick: _cache[5] || (_cache[5] = $event => (_ctx.deleteClick())),
              src: _imports_1,
              alt: ""
            })
          ], 512), [
            [vShow, _ctx.pageData.isDelete]
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_11, [
        (_ctx.pageData.labels.length > 0)
          ? (openBlock(), createElementBlock("p", _hoisted_12, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pageData.labels, (tag, tagIndex) => {
                return (openBlock(), createElementBlock("span", { key: tagIndex }, toDisplayString(tag.labelName), 1))
              }), 128))
            ]))
          : createCommentVNode("", true),
        ($props.source === 'model' && _ctx.pageData.fieldDTO === null)
          ? (openBlock(), createElementBlock("span", _hoisted_13))
          : createCommentVNode("", true),
        (_ctx.pageData.fieldDTO !== null && $props.source === 'model')
          ? (openBlock(), createElementBlock("div", _hoisted_14, [
              createBaseVNode("p", null, [
                _hoisted_15,
                createTextVNode(" " + toDisplayString(_ctx.pageData.fieldDTO != null ? _ctx.pageData.fieldDTO.fieldName : ''), 1)
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pageData.fieldDTO.attributes, (item, index) => {
                return (openBlock(), createElementBlock("p", { key: index }, [
                  createBaseVNode("span", null, toDisplayString(item.attributesName) + "：", 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.subattributes, (tag, tagIndex) => {
                    return (openBlock(), createElementBlock("span", { key: tagIndex }, toDisplayString(tag.subattributeName), 1))
                  }), 128))
                ]))
              }), 128))
            ]))
          : createCommentVNode("", true),
        createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.pageData.companyName), 1)
      ]),
      (_ctx.pageData.state !== 1)
        ? (openBlock(), createElementBlock("div", _hoisted_17, [
            (_ctx.pageData.state === 0)
              ? (openBlock(), createElementBlock("img", _hoisted_18))
              : createCommentVNode("", true),
            (_ctx.pageData.uploadState === 0)
              ? (openBlock(), createElementBlock("img", _hoisted_19))
              : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(_ctx.pageData.uploadState === 0
            ? '上传中'
            : _ctx.pageData.state === 0
            ? '处理中'
            : '已处理'), 1)
          ]))
        : createCommentVNode("", true)
    ])
  ]))
}
var modelItem = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { modelItem as m };
