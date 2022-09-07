import './spark-md5.2cc5764b.js';
import { _ as _export_sfc } from './index.acc4a696.js';
import { u as uploadCommonFile } from './sceneList.b22bf172.js';
import { r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, C as createBaseVNode, a as createVNode } from './element-plus.da98f360.js';

var _imports_0 = "/assets/help.6b0fff3c.svg";

var UploadCommonFlie_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".el-popper.is-myself-define{background:#20232b;color:#fff9;width:2.083333rem;line-height:.130208rem}.my-box-item{color:#525866}.uploader-app{width:4.427083rem;padding:.078125rem;margin:.208333rem auto 0;font-size:.0625rem;-webkit-box-shadow:0 0 .052083rem rgba(0,0,0,.4);box-shadow:0 0 .052083rem #0006}.uploader-app .uploader-btn{margin-right:.208333rem}.upload-btn{padding:.015625rem .026042rem;border-radius:.010417rem;border:1px solid #428fff}.uploader-app .uploader-list{max-height:2.291667rem;overflow:auto;overflow-x:hidden;overflow-y:auto}\n")();

// import {
//   defineComponent,
//   reactive,
//   toRefs,
//   getCurrentInstance,
//   ref,
//   defineEmits,
// } from 'vue'

const _sfc_main = {
  name: 'UploadCommonFile',
  components: {},
  data() {
    return {
      urlPrex: '/api/file',
      name: 123,
    }
  },
  methods: {
    // 监听文件改变
    onFileAdded(file) {
      console.log('onFileAdded', file);
      if (file.raw.type != 'application/json') {
        this.$message.error('文件格式不正确，请上传json文件');
        return
      }
      //   this.progress = 0
      //   this.status = '初始状态'
      file.urlPrex = this.urlPrex;
      let formData = new FormData();
      formData.append('file', file.raw);
      uploadCommonFile(formData).then(res => {
        if (res.code === 1) {
          console.log(res.data.downloadUrl, 198877);
          let paramsobj = {
            fileValue: res.data.downloadUrl,
            fileName: file.raw.name,
          };
          this.$emit('exportUrlFn2', paramsobj);
        }
      });
      // 计算MD5
      // this.computeMD5(file)
    },
    beforeRemove() {
      var paramsRemove = {
        fileValue: '',
        fileName: '',
      };
      this.$emit('exportUrlFn2', paramsRemove);
    },
    // 根据文件计算MD5
  },
};


const _hoisted_1 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-btn",
  type: "primary"
}, "上传JSON文件", -1);
const _hoisted_2 = { style: {"display":"flex"} };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("div", {
  style: {"display":"flex","font-size":"12px","color":"#606266"},
  class: ""
}, " 支持JSON格式文件 ", -1);
const _hoisted_4 = { style: {"display":"flex"} };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("img", {
  class: "help",
  style: {"width":"18px","margin-left":"5px"},
  src: _imports_0
}, null, -1);

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_upload = resolveComponent("el-upload");

  return (openBlock(), createBlock(_component_el_upload, {
    class: "upload-demo",
    action: "",
    multiple: "",
    limit: 3,
    "auto-upload": false,
    "before-remove": $options.beforeRemove,
    "on-change": $options.onFileAdded
  }, {
    tip: withCtx(() => [
      createBaseVNode("div", _hoisted_2, [
        _hoisted_3,
        createBaseVNode("div", _hoisted_4, [
          createVNode(_component_el_tooltip, {
            class: "my-box-item",
            effect: "myself-define",
            content: "物模型是对设备在云端的功能描述，包括设备的属性、服务、和事件。物联网平台通过定义一种物的描述语言来描述物模型，称之为TSL（即Thing Specification Language），采用JSON格式，您可以根据TSL组装上报设备的数据。您可以导出完整的物模型，用于云端应用开发。",
            placement: "right"
          }, {
            default: withCtx(() => [
              _hoisted_5
            ]),
            _: 1
          })
        ])
      ])
    ]),
    default: withCtx(() => [
      _hoisted_1
    ]),
    _: 1
  }, 8, ["before-remove", "on-change"]))
}
var UploadCommonFile = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { UploadCommonFile as U };
