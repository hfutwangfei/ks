import { j as reactive, T as onMounted, _ as onBeforeUnmount, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, I as withDirectives, an as vModelText, a0 as vShow, O as toDisplayString, L as Fragment, M as renderList, a4 as withModifiers, c as createBlock, G as createCommentVNode, N as createTextVNode, Y as normalizeClass, $ as getCurrentInstance, x as ElMessage } from './element-plus.da98f360.js';
import { a as addScene, _ as _sfc_main$1 } from './UploadFlie.62952e96.js';
import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { u as uploadCommonFile } from './sceneList.b22bf172.js';
import { g as getModelInfo, a as getAllFieldList, b as getBrandList, u as updateModel, c as createModel } from './modelScene.42824c77.js';
import './spark-md5.2cc5764b.js';
import './monaco-editor.e9574fd0.js';

var editModel_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".edit-model textarea{width:2.083333rem;background:#2a2e39;color:#fff}.edit-model input{color:#fff}.edit-model input.input-name{text-indent:.0625rem}.edit-model .export-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-model .export-box.export-box{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.edit-model .export-box #tts-input-text,.edit-model .export-box #tts-inputFileAgent{width:1.666667rem;margin-right:.083333rem;height:.166667rem;border:1px solid #c3c4c7;display:none}.edit-model .export-box .upload-btn{width:.625rem;height:.46875rem;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#2a2e39;cursor:pointer}.edit-model .export-box .upload-btn a{margin-top:.140625rem;margin-bottom:.026042rem;margin-left:0!important;color:#ffffff4d!important}.edit-model .export-box .upload-btn span{color:#ffffff4d;font-size:.0625rem}.edit-model .export-box .upload-btn .browse{width:.166667rem;height:.166667rem;background:#2a2e39;background-size:100% 100%;border:none;cursor:pointer}.edit-model .export-box .input-file{width:100%;height:100%}.edit-model .edit-scene-item{position:relative}.edit-model .edit-scene-item .edit-label{color:#fff9!important;line-height:.145833rem}.edit-model .edit-scene-item .edit-label span{color:#f77560}.edit-model .edit-scene-item .json-upload{display:inline-block;width:2.083333rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:.145833rem}.edit-model .edit-scene-item .search-box{width:2.020833rem;position:absolute;right:0;top:.166667rem;z-index:100;height:.625rem}.edit-model .edit-scene-item .search-box ul li{width:100%;height:.145833rem;background:#373b48;line-height:.145833rem}.edit-model .edit-scene-item .search-box ul li span{padding-left:.0625rem}.edit-model .edit-scene-item .search-box ul li.li-active,.edit-model .edit-scene-item .search-box ul li:hover{background:#428fff}.edit-model .edit-scene-item .field-name{width:70%;height:.166667rem}.edit-model .edit-scene-item .field-name .el-select__tags .el-tag{background:#333}.edit-model .edit-scene-item .mode-file-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.edit-model .edit-scene-item .mode-file-box .model-file-name{color:#428fff}.edit-model .edit-scene-item .mode-file-box .model-file-name-close{color:#fff;margin-left:.052083rem;padding:0 .052083rem .052083rem}.edit-model .add-confirm-dialog{background:#373b48}.edit-model .add-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.edit-model .add-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.edit-model .add-confirm-dialog .dialog-content p label{display:inline-block;width:.520833rem;height:.166667rem;color:#f77560}.edit-model .add-confirm-dialog .dialog-content p input{width:2.083333rem;height:.145833rem;background:#373b48;font-size:.0625rem;border:1px solid rgba(255,255,255,.14);color:#fff}.edit-model .add-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.edit-model .add-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}.edit-tage{width:2.083333rem}.edit-tage ul{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.edit-tage ul li{border-radius:.010417rem;text-align:center;height:.145833rem;line-height:.145833rem;padding:.010417rem .041667rem;font-size:.0625rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem;cursor:pointer}.edit-tage ul li.is-active{background:rgba(66,143,255,.3);color:#428fff}.edit-tage#workmanship ul li{width:auto;padding:.005208rem .03125rem}.edit-tage#workmanship ul li.active{color:#428fff}.edit-scene .edit-scene-box .edit-scene-item .field-name input{width:2.010417rem;border:none;-webkit-box-shadow:none;box-shadow:none}ul{margin:0;padding:0}.field-name{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important;background:#2a2e39}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#428fff}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#428fff}.el-popper__arrow:before{background:#2a2e39!important}input:focus{outline:none}textarea:focus{outline:none}.add-model-upload2 .upload-btn,.upload-demo2 .upload-btn{border:1px solid rgb(66,143,255);color:#428fff;background:transparent;height:.145833rem;line-height:.145833rem;font-size:.0625rem;padding:0 .0625rem;display:inline-block}.field-name.el-select .el-input__inner:focus,.field-name.el-select .el-input.is-focus .el-input__inner{-webkit-box-shadow:none!important;box-shadow:none!important}\n")();

const _sfc_main = {
  setup(props) {
    const { proxy } = getCurrentInstance();
    let router = useRouter();
    let state = reactive({
      dialogVisible: false,
      workmanship: [
        { name: '标准模型', id: 1, select: true },
        { name: '非标准模型', id: 2, select: false },
      ],
      modelName: '',
      downloadUrl: '',
      uuIDKey: '',
      sceneUrl: '',
      sceneFileName: '',
      brand: '', //品牌厂家
      brandModel: '', //品牌型号
      fieldValue: '', // 所属领域
      fieldData: [],
      description: '',
      fieldSecond: {},
      code: '',
      source: '',
      editData: {},
      brandData: [],
      brandId: '',
      isShowBrand: false,
      jsonUrl: '',
      jsonName: '',
      format: '',
    });
    state.code = router.currentRoute.value.query.code;
    state.source = router.currentRoute.value.query.source;
    console.log(state.code, 'state.code');
    onMounted(() => {
      document.addEventListener('click', proxy.bodyCloseMenus);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', proxy.bodyCloseMenus);
    });
    const methods = {
      async getModelInfo() {
        let data = await getModelInfo({ code: state.code });
        if (data.code === 1) {
          var getData = data.data;
          state.editData = data.data;
          state.modelName = getData.name;
          state.sceneFileName = getData.modelSourceFile;
          state.downloadUrl = getData.thumbnail;
          state.brand = getData.brandName;
          state.brandModel = getData.specifications;
          state.jsonUrl = getData.objectModel;
          state.description = getData.description;
          proxy.getAllFieldList(getData);
        }
      },
      async getAllFieldList(getData) {
        // { fieldName: '海尔' }
        let data = await getAllFieldList();
        if (data.code === 1) {
          console.log(data.data, 'data.data');
          if (data.data.length <= 0) return
          data.data.map(item => {
            if (item.hasOwnProperty('attributes')) {
              item.attributes.map(attr => {
                if (attr.hasOwnProperty('subattributes')) {
                  attr.subattributes.map(val => {
                    val.select = false;
                  });
                }
              });
            }
          });

          // state.fieldSecond.attributes.map(item => {
          //   item.subattributes.map(val => {
          //     val.select = false
          //   })
          // })
          state.fieldData = data.data;
          state.fieldValue = data.data[0].id;
          state.fieldSecond = data.data[0];
          if (state.source === 'edit') {
            state.fieldSecond = state.fieldData.filter(item => {
              return item.id === getData.fieldDTO.id
            })[0];
            if (getData.fieldDTO != null) {
              console.log(getData, '2222');
              state.fieldValue = getData.fieldDTO.id;
            }
            console.log(
              state.editData.fieldDTO.attributes,
              state.fieldSecond.attributes,
              'state.fieldSecond'
            );
            state.editData.fieldDTO.attributes.map((item, index) => {
              state.fieldSecond.attributes.map((val, valIndex) => {
                item.subattributes.map(editItem => {
                  val.subattributes.map(getValue => {
                    if (editItem.id === getValue.id) {
                      getValue.select = true;
                    }
                  });
                });
              });
            });
          }
        }
      },
      // 上传图片
      async readFile(e) {
        var files = e.target.files[0];
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          ElMessage.success('上传成功');
          state.downloadUrl = data.data.downloadUrl;
        } else {
          ElMessage.success(data.msg);
        }
      },
      selectWorkmanship(item, index) {
        state.workmanship.map((item, itemIndex) => {
          if (index === itemIndex) {
            item.select = true;
          } else {
            item.select = false;
          }
        });
      },
      btnClick() {
        document.getElementById('tts-input-text').click();
      },
      exportUrl(obj) {
        console.log(obj, 8888);
        state.sceneUrl = obj.fileValue;
        state.sceneFileName = obj.fileName;
        state.uuIDKey = obj.uuIDKey;
        state.format = obj.format;
      },
      // 物理模型
      async selectImg(file) {
        var files = file.raw;
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          ElMessage.success('上传成功');
          state.jsonUrl = data.data.downloadUrl;
          // state.jsonName = file.name
        } else {
          ElMessage.success(data.msg);
        }
      },
      // 获取品牌厂家
      async brandInput() {
        let data = await getBrandList({ brandName: state.brand });
        if (data.code === 1) {
          state.brandData = data.data;
          if (state.brandData.length > 0) {
            state.isShowBrand = true;
          } else {
            state.isShowBrand = false;
          }
        }
      },
      selectBrand(item, index) {
        state.brand = item.brandName;
        state.brandId = item.id;
        state.isShowBrand = false;
      },
      bodyCloseMenus() {
        if (state.isShowBrand == true) {
          state.isShowBrand = false;
        }
      },
      tagClick(item, index, attributes, attributesIndex) {
        var { fieldSecond } = state;
        fieldSecond.attributes.map((second, secondIndex) => {
          if (secondIndex === index) {
            second.subattributes.map((third, thirdIndex) => {
              if (thirdIndex === attributesIndex) {
                third.select = !third.select;
              }
            });
          }
        });
      },
      fieldChang() {
        const { fieldData } = state;
        state.fieldSecond = fieldData.filter(item => {
          return item.id === state.fieldValue
        })[0];
        state.fieldSecond.attributes.map(item => {
          item.subattributes.map(val => {
            val.select = false;
          });
        });
      },
      produceNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
      },
      submitAll(value, chunkId) {
        const {
          modelName,
          sceneFileName,
          downloadUrl,
          sceneUrl,
          uuIDKey,
          brand,
          brandModel,
          fieldValue,
          fieldData,
          description,
        } = state;
        if (modelName === '') {
          ElMessage.error('请输入模型名称');
          return
        }
        if (sceneFileName === '') {
          ElMessage.error('请上传模型文件');
          return
        }
        if (downloadUrl === '') {
          ElMessage.error('请输上传缩略图');
          return
        }
        var fieldDataCopy = JSON.parse(JSON.stringify(fieldData));
        var filerData = fieldDataCopy.filter(item => {
          return item.id === fieldValue
        })[0];
        var obj = {
          id: filerData.id,
          code: filerData.code,
          fieldName: filerData.fieldName,
          attributes: [],
        };
        filerData.attributes.map((item, index) => {
          item.subattributes = item.subattributes.filter(val => {
            return val.select
          });
        });
        obj.attributes = filerData.attributes.filter(item => {
          return item.subattributes.length > 0
        });
        if (obj.attributes.length <= 0) {
          ElMessage.error('请选择领域');
          return
        }
        // var date = new Date()
        // var str =
        //   '' +
        //   date.getFullYear() +
        //   (date.getMonth() + 1) +
        //   date.getDate() +
        //   date.getMinutes() +
        //   proxy.produceNum(10000, 10000000000)
        // var sceneFileNameArr = sceneFileName.split('.')
        // var sceneFile =
        //   sceneFileNameArr[0] + '-' + str + '.' + sceneFileNameArr[1]
        //   console.log(sceneUrl, sceneFileNameArr[1], sceneFileName)
        console.log(sceneFileName, uuIDKey, 'sceneFileName');
        var params = {
          name: modelName,
          // modelFile: state.source === 'edit' ? sceneUrl :  sceneUrl + uuIDKey + '.' + sceneFileNameArr[1], //模型文件标记
          modelFile:
            state.source === 'edit'
              ? sceneUrl
              : sceneUrl + uuIDKey + '.' + state.format, //模型文件标记
          modelSourceFile:
            state.source === 'edit'
              ? sceneFileName
              : uuIDKey + '.' + state.format, //模型文件标记
          thumbnail: downloadUrl, //缩略图URL
          brandName: brand, //品牌名称
          specifications: brandModel, //品牌型号
          description: description,
          code: value,
          fieldDTO: obj,
          objectModel: state.jsonUrl,
          // brandId: 0,
          state: value,
        };
        console.log(params);
        if (state.source === 'edit') {
          params.modelFile = state.editData.modelFile;
          params.id = state.editData.id;
          proxy.updateModel(params);
        } else {
          proxy.createModel(params);
        }
      },
      async updateModel(params) {
        let data = await updateModel(params);
        if (data.code === 1) {
          ElMessage({
            message: '编辑成功',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'modelIndex',
                query: {
                  from: 'mxlb',
                },
              });
            },
          });
        } else {
          ElMessage.warning(data.msg);
        }
      },
      async createModel(params) {
        let data = await createModel(params);
        if (data.code === 1) {
          ElMessage({
            message: '提交成功',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'modelIndex',
                query: {
                  from: 'mxlb',
                },
              });
            },
          });
        } else {
          ElMessage.warning(data.msg);
        }
      },
      deleteModelName() {
        state.sceneFileName = '';
      },
      cancelClick() {
        router.push({
          name: 'modelIndex',
          query: {
            from: 'mxlb',
          },
        });
      },
      deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].id == arr[j].id) {
              arr.splice(j, 1);
              //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
              j--;
            }
          }
        }
        return arr
      },
    };
    return {
      ...toRefs(state),
      ...methods,
      //   ...components
    }
  },
  mounted() {
    if (this.$router.currentRoute.value.query.source === 'edit') {
      this.getModelInfo();
    } else {
      this.getAllFieldList();
    }
  },
  unmounted() {},
  components: {
    addScene,
    UploadFlie: _sfc_main$1,
  },
};

const _hoisted_1 = { class: "edit-model" };
const _hoisted_2 = { class: "edit-scene-box model-edit" };
const _hoisted_3 = { class: "edit-scene-item" };
const _hoisted_4 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 模型名称 ")
], -1);
const _hoisted_5 = { class: "edit-scene-item" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 模型文件 ")
], -1);
const _hoisted_7 = { class: "mode-file-box" };
const _hoisted_8 = { class: "model-file-name" };
const _hoisted_9 = { class: "edit-scene-item" };
const _hoisted_10 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 模型缩略图 ")
], -1);
const _hoisted_11 = { class: "small-img" };
const _hoisted_12 = { class: "small-img-box" };
const _hoisted_13 = { class: "export-box" };
const _hoisted_14 = /*#__PURE__*/createBaseVNode("a", { href: "javascript:;" }, "+", -1);
const _hoisted_15 = /*#__PURE__*/createBaseVNode("span", null, "点击上传", -1);
const _hoisted_16 = [
  _hoisted_14,
  _hoisted_15
];
const _hoisted_17 = { class: "export-box export-box-img" };
const _hoisted_18 = ["src"];
const _hoisted_19 = /*#__PURE__*/createBaseVNode("p", null, "提示：支持JPG、PNG等格式，图片大小", -1);
const _hoisted_20 = { class: "edit-scene-item" };
const _hoisted_21 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span"),
  /*#__PURE__*/createTextVNode(" 品牌厂家 ")
], -1);
const _hoisted_22 = { class: "search-box" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "edit-scene-item" };
const _hoisted_25 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span"),
  /*#__PURE__*/createTextVNode(" 品牌型号 ")
], -1);
const _hoisted_26 = { class: "edit-scene-item" };
const _hoisted_27 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span"),
  /*#__PURE__*/createTextVNode(" 物模型 ")
], -1);
const _hoisted_28 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-btn",
  type: "primary"
}, "上传JSON文件", -1);
const _hoisted_29 = { class: "edit-scene-item" };
const _hoisted_30 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 所属领域 ")
], -1);
const _hoisted_31 = { class: "edit-label" };
const _hoisted_32 = /*#__PURE__*/createBaseVNode("span", null, null, -1);
const _hoisted_33 = { class: "edit-tage" };
const _hoisted_34 = ["onClick"];
const _hoisted_35 = { class: "edit-scene-item" };
const _hoisted_36 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span"),
  /*#__PURE__*/createTextVNode(" 说明 ")
], -1);

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_UploadFlie = resolveComponent("UploadFlie");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_addScene = resolveComponent("addScene");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_addScene, {
      type: _ctx.source,
      source: "model",
      onCancelClick: _ctx.cancelClick,
      onSubmitAll: _ctx.submitAll
    }, {
      content: withCtx(() => [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _hoisted_4,
            withDirectives(createBaseVNode("input", {
              class: "input-name",
              type: "text",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.modelName) = $event)),
              placeholder: "请输入模型名称"
            }, null, 512), [
              [vModelText, _ctx.modelName]
            ])
          ]),
          createBaseVNode("div", _hoisted_5, [
            _hoisted_6,
            withDirectives(createVNode(_component_UploadFlie, {
              onExportUrl: _ctx.exportUrl,
              class: "add-model-upload add-model-upload2"
            }, null, 8, ["onExportUrl"]), [
              [vShow, _ctx.sceneFileName === '']
            ]),
            withDirectives(createBaseVNode("div", _hoisted_7, [
              createBaseVNode("span", _hoisted_8, toDisplayString(_ctx.sceneFileName), 1),
              createBaseVNode("span", {
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.deleteModelName && _ctx.deleteModelName(...args))),
                class: "model-file-name-close"
              }, " X ")
            ], 512), [
              [vShow, _ctx.sceneFileName != '']
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            _hoisted_10,
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                withDirectives(createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("input", {
                    type: "file",
                    id: "tts-input-text",
                    ref: "exportInput",
                    accept: ".jpg,.png",
                    onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.readFile && _ctx.readFile(...args)))
                  }, null, 544),
                  createBaseVNode("div", {
                    class: "upload-btn",
                    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.btnClick && _ctx.btnClick(...args)))
                  }, _hoisted_16)
                ], 512), [
                  [vShow, _ctx.downloadUrl === '']
                ]),
                withDirectives(createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("img", {
                    src: _ctx.downloadUrl,
                    alt: ""
                  }, null, 8, _hoisted_18),
                  createBaseVNode("a", {
                    href: "javascript:;",
                    onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.btnClick && _ctx.btnClick(...args)))
                  }, "重新上传")
                ], 512), [
                  [vShow, _ctx.downloadUrl != '']
                ])
              ]),
              _hoisted_19
            ])
          ]),
          createBaseVNode("div", _hoisted_20, [
            _hoisted_21,
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: "input-name",
              "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.brand) = $event)),
              onInput: _cache[6] || (_cache[6] = (...args) => (_ctx.brandInput && _ctx.brandInput(...args))),
              placeholder: "请输入品牌厂家"
            }, null, 544), [
              [vModelText, _ctx.brand]
            ]),
            withDirectives(createBaseVNode("div", _hoisted_22, [
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.brandData, (item, index) => {
                  return (openBlock(), createElementBlock("li", {
                    onClick: withModifiers($event => (_ctx.selectBrand(item, index)), ["stop"]),
                    key: index
                  }, [
                    createBaseVNode("span", null, toDisplayString(item.brandName), 1)
                  ], 8, _hoisted_23))
                }), 128))
              ])
            ], 512), [
              [vShow, _ctx.isShowBrand]
            ])
          ]),
          createBaseVNode("div", _hoisted_24, [
            _hoisted_25,
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: "input-name",
              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((_ctx.brandModel) = $event)),
              placeholder: "请输入品牌型号"
            }, null, 512), [
              [vModelText, _ctx.brandModel]
            ])
          ]),
          createBaseVNode("div", _hoisted_26, [
            _hoisted_27,
            (_ctx.jsonUrl === '')
              ? (openBlock(), createBlock(_component_el_upload, {
                  key: 0,
                  class: "upload-demo upload-demo2",
                  action: "",
                  limit: 10,
                  "auto-upload": false,
                  "on-change": _ctx.selectImg
                }, {
                  tip: withCtx(() => []),
                  default: withCtx(() => [
                    _hoisted_28
                  ]),
                  _: 1
                }, 8, ["on-change"]))
              : createCommentVNode("", true),
            (_ctx.jsonUrl !== '')
              ? withDirectives((openBlock(), createElementBlock("span", {
                  key: 1,
                  class: "json-upload",
                  style: {"color":"#428fff"}
                }, toDisplayString(_ctx.jsonUrl), 513)), [
                  [vShow, _ctx.jsonUrl != '']
                ])
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_29, [
            _hoisted_30,
            createVNode(_component_el_select, {
              class: "field-name",
              size: "small",
              style: {"width":"400px"},
              modelValue: _ctx.fieldValue,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.fieldValue) = $event)),
              placeholder: "请选择",
              onChange: _ctx.fieldChang
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fieldData, (item) => {
                  return (openBlock(), createBlock(_component_el_option, {
                    key: item.id,
                    label: item.fieldName,
                    value: item.id
                  }, null, 8, ["label", "value"]))
                }), 128))
              ]),
              _: 1
            }, 8, ["modelValue", "onChange"])
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fieldSecond.attributes, (item, index) => {
            return (openBlock(), createElementBlock("div", {
              class: "edit-scene-item",
              key: index
            }, [
              createBaseVNode("label", _hoisted_31, [
                _hoisted_32,
                createTextVNode(" " + toDisplayString(item.attributesName), 1)
              ]),
              createBaseVNode("div", _hoisted_33, [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.subattributes, (attributes, attributesIndex) => {
                    return (openBlock(), createElementBlock("li", {
                      class: normalizeClass({ 'is-active': attributes.select }),
                      onClick: $event => (_ctx.tagClick(item, index, attributes, attributesIndex)),
                      key: attributesIndex
                    }, toDisplayString(attributes.subattributeName), 11, _hoisted_34))
                  }), 128))
                ])
              ])
            ]))
          }), 128)),
          createBaseVNode("div", _hoisted_35, [
            _hoisted_36,
            withDirectives(createBaseVNode("textarea", {
              type: "text",
              class: "input-name",
              "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((_ctx.description) = $event))
            }, null, 512), [
              [vModelText, _ctx.description]
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["type", "onCancelClick", "onSubmitAll"])
  ]))
}
var editModel = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { editModel as default };
