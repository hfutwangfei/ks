import { A as AddLabelDialogModule, T as TenantUploadFile, a as TenantPanelModule } from './AddLabelDialogModule.544fe093.js';
import { c as createTenantModel } from './tenantModel.e1d9386d.js';
import { u as uploadCommonFile, g as getLabelList } from './sceneList.b22bf172.js';
import { U as UploadCommonFile } from './UploadCommonFlie.b601e7ae.js';
import { _ as _export_sfc, c as store } from './index.acc4a696.js';
import { r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, I as withDirectives, a0 as vShow, O as toDisplayString, G as createCommentVNode, L as Fragment, M as renderList, Y as normalizeClass, W as pushScopeId, X as popScopeId, N as createTextVNode } from './element-plus.da98f360.js';
import { _ as _imports_0 } from './tianjia.4a8b4043.js';
import './spark-md5.2cc5764b.js';
import './tenantScene.d6a51745.js';
import './monaco-editor.e9574fd0.js';

var Add_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".item-active[data-v-58831855]{color:#428fff!important;background:rgba(66,143,255,.3)!important}.btn-box[data-v-58831855]{width:30%;padding-left:42%;position:absolute;bottom:.416667rem;text-align:left}.container[data-v-58831855]{background-color:#2a2e39;height:100%;min-height:100%}.form-bg[data-v-58831855]{min-height:100%;height:100%;margin-left:35%;width:30%;text-align:center}.my-tag ul[data-v-58831855]{-webkit-padding-start:0;padding-inline-start:0;-webkit-margin-before:0em;margin-block-start:0em;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.my-tag ul li[data-v-58831855]{display:-webkit-box;display:-ms-flexbox;display:flex;cursor:pointer;height:.145833rem;padding:0 .104167rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;margin-top:.041667rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem}\n")();

var Add_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:.03125rem;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#409eff}.avatar-uploader-icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.145833rem;color:#8c939d;width:.625rem;height:auto;min-height:.46875rem;text-align:center}.avatar-uploader-icon .slt-avatar{width:100%;height:auto}.my-form{text-align:left}.my-form .el-form-item .el-form-item__label{color:#fff9}.my-form .el-form-item .el-form-item__content .el-input .el-input__inner{background-color:#2a2e39;border:1px solid rgba(255,255,255,.14)}\n")();

const { userinfo } = store.state.account;
const _sfc_main = {
  name: 'tenantAdd',
  components: {
    UploadCommonFile,
    AddLabelDialogModule,
    TenantUploadFile,
    TenantPanelModule,
  },
  data() {
    return {
      format: '',
      sceneUrl: '',
      sceneFileName: '',
      sceneFileName2: '',
      uuIDKey: '',
      initFlag: 0,
      labelIds: [],
      labelList: [
        { name: '??????1', isSelected: false },
        { name: '??????2', isSelected: false },
        { name: '??????3', isSelected: false },
        { name: '??????4', isSelected: false },
        { name: '??????5', isSelected: false },
        { name: '??????6', isSelected: false },
        { name: '??????7', isSelected: false },
        { name: '??????8', isSelected: false },
      ],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      labelWidth: '120px',
      form: {
        objectModel: '',
        specifications: '',
        brandName: '',
        scenesName: '',
        modelFile: '',
        thumbnail: '',
      },
      imageUrl: '',
      addTenantFormRules: {
        scenesName: [
          {
            required: true,
            message: '?????????????????????',
            trigger: 'blur',
          },
        ],
        modelFile: [
          {
            required: true,
            message: '?????????????????????',
            trigger: 'change',
          },
        ],
        thumbnail: [
          {
            required: true,
            message: '??????????????????????????????',
            trigger: 'change',
          },
        ],
      },
      userType: userinfo.userType,
    }
  },
  methods: {
    cancelBtn() {
      var pathName = '';
      if (this.userType === 1) {
        pathName = 'modelList';
      } else {
        pathName = 'tenantModelList';
      }
      this.$router.push({
        name: pathName,
      });
      // this.$router.push({
      //     path:'/tenant/model/list'
      // })
    },
    addLabelBtnParent() {
      this.$refs.dialogChild.resetLabelBtn(0);
    },
    exportUrlFn(obj) {
      console.log(obj, 12334);
      // this.sceneUrl = obj.fileValue
      // let sceneFileNameArr =obj.fileName.split('.');
      // this.sceneFileName = sceneFileNameArr[0]+'-'+timestamp()+produceNum(10000, 10000000000)+'.'+sceneFileNameArr[1];
      // this.uuIDKey = obj.uuIDKey
      this.sceneUrl = obj.fileValue;
      this.sceneFileName = obj.fileName;
      this.uuIDKey = obj.uuIDKey;
      this.format = obj.format
      ;(this.form.modelFile = this.sceneUrl + this.uuIDKey + '.' + this.format),
        this.$refs.formRef.clearValidate('modelFile');
    },
    exportUrlFn2(obj) {
      this.form.objectModel = obj.fileValue;
      this.$refs.formRef.clearValidate('modelFile');
      this.sceneFileName2 = obj.fileName;
      console.log(obj, 1234567);
    },
    selectLabels(item) {
      item.isSelected = !item.isSelected;
      if (item.isSelected && !this.labelIds.includes(item.id)) {
        this.labelIds.push(item.id);
      } else {
        this.labelIds.splice(
          this.labelIds.findIndex(citem => citem.id === item.id),
          1
        );
      }
      //console.log(this.labelIds,987)
    },
    // createTenantScenes() {},
    beforeTenantSceneUpload(file) {
      this.form.modelFile = 'https://mini.io.com/123.fbx';
      this.$refs.formRef.clearValidate('modelFile');
      console.log(file);
      return false
    },
    handleChange22(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove22() {
      return this.$messageBox.confirm('are you sure?')
    },

    // modelFileOnChange(){
    //   // if(this.form.thumbnail){
    //       this.$refs.modelFileRef.clearValidate();
    //   // }
    // },
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        this.$message.error('ge shi cuo wu');
      }
      let _this = this;
      console.log(file, 77777);
      let formData = new FormData();
      formData.append('file', file);
      uploadCommonFile(formData).then(res => {
        if (res.code === 1) {
          console.log(res.data.downloadUrl, 88880);
          _this.form.thumbnail = res.data.downloadUrl;
        }
      });
      //???????????????
      var reader = new FileReader();
      reader.onload = function(e) {
        // console.log(reader.result, 9999)
        _this.imageUrl = reader.result;
        //_this.imageUrl.push(reader.result);//???bade64????????????????????????????????????????????????
      };
      reader.readAsDataURL(file);

      this.$refs.formRef.clearValidate('thumbnail');
      return false
    },
    imgPreview(file) {
      // this.imageUrl.posterURL = file.url;
    },
    onSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          console.log('submit!');
          this.addTenantModel();
        } else {
          console.log('error submit!');
          return false
        }
      });
    },
    addTenantModel() {
      let req = {
        brandId: this.form.brandId,
        brandName: this.form.brandName,
        objectModel: this.form.objectModel,
        specifications: this.form.specifications,
        labelIds: this.labelIds,
        state: 0, //0 or 1
        name: this.form.scenesName,
        thumbnail: this.form.thumbnail,
        modelFile: this.sceneUrl + this.uuIDKey + '.' + this.format, //??????????????????
        modelSourceFile: this.uuIDKey + '.' + this.format, //??????????????????
      };
      createTenantModel(req).then(res => {
        if (res.code === 1) {
          this.$message.success('???????????????');
          var pathName = '';
          if (this.userType === 1) {
            pathName = 'modelList';
          } else {
            pathName = 'tenantModelList';
          }
          this.$router.push({
            name: pathName,
          });
        } else {
          this.$message.error('???????????????');
        }
      });
    },
    queryLabels() {
      getLabelList({ type: 0 })
        .then(res => {
          if (res.code === 1) {
            this.labelList = res.data;
            // this.labelList.map(item => {
            //     if (this.labelIds.includes(item.id)) {
            //         item.isSelected = true
            //     }
            //     return item
            // })
          }
        })
        .catch();
    },
  },
  mounted() {
    this.queryLabels();
  },
};


const _withScopeId = n => (pushScopeId("data-v-58831855"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "container" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("p", null, "????????????", -1));
const _hoisted_3 = { class: "form-bg" };
const _hoisted_4 = { class: "avatar-uploader-icon" };
const _hoisted_5 = ["src"];
const _hoisted_6 = {
  key: 1,
  style: {"height":"15px","width":"15px","margin-bottom":"20px"},
  src: _imports_0,
  alt: ""
};
const _hoisted_7 = {
  key: 2,
  style: {"position":"absolute","font-size":"12px","top":"40px"}
};
const _hoisted_8 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { style: {"font-size":"12px","color":"rgb(96, 98, 102)"} }, " ???????????????JPG???PNG?????????????????????????????????10MB ", -1));
const _hoisted_9 = {
  class: "my-tag",
  style: {"margin-top":"-6px"}
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "btn-box" };
const _hoisted_12 = /*#__PURE__*/createTextVNode("??? ???");
const _hoisted_13 = /*#__PURE__*/createTextVNode(" ??? ??? ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_tenant_upload_file = resolveComponent("tenant-upload-file");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_upload_common_file = resolveComponent("upload-common-file");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_button = resolveComponent("el-button");
  const _component_tenant_panel_module = resolveComponent("tenant-panel-module");
  const _component_add_label_dialog_module = resolveComponent("add-label-dialog-module");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_tenant_panel_module, null, {
      head: withCtx(() => [
        _hoisted_2
      ]),
      body: withCtx(() => [
        createBaseVNode("div", _hoisted_3, [
          createVNode(_component_el_form, {
            class: "my-form",
            ref: "formRef",
            rules: $data.addTenantFormRules,
            model: $data.form,
            "label-width": $data.labelWidth
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, {
                label: "????????????",
                prop: "scenesName"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: $data.form.scenesName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.form.scenesName) = $event)),
                    placeholder: "?????????????????????"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "????????????",
                prop: "modelFile"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_tenant_upload_file, { onExportUrlFn: $options.exportUrlFn }, null, 8, ["onExportUrlFn"]), [
                    [vShow, $data.sceneFileName === '']
                  ]),
                  withDirectives(createBaseVNode("span", { style: {"color":"#428fff"} }, toDisplayString($data.sceneFileName), 513), [
                    [vShow, $data.sceneFileName != '']
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "???????????????",
                prop: "thumbnail"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_upload, {
                    ref: "thumbnailRef",
                    class: "avatar-uploader",
                    action: "https://jsonplaceholder.typicode.com/posts/",
                    "show-file-list": false,
                    "before-upload": $options.beforeAvatarUpload,
                    modelValue: $data.form.thumbnail,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.form.thumbnail) = $event))
                  }, {
                    tip: withCtx(() => [
                      _hoisted_8
                    ]),
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_4, [
                        ($data.imageUrl)
                          ? (openBlock(), createElementBlock("img", {
                              key: 0,
                              src: $data.imageUrl,
                              class: "slt-avatar"
                            }, null, 8, _hoisted_5))
                          : (openBlock(), createElementBlock("img", _hoisted_6)),
                        (!$data.imageUrl)
                          ? (openBlock(), createElementBlock("div", _hoisted_7, " ???????????? "))
                          : createCommentVNode("", true)
                      ])
                    ]),
                    _: 1
                  }, 8, ["before-upload", "modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "?????????",
                prop: "objectModel"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_upload_common_file, { onExportUrlFn2: $options.exportUrlFn2 }, null, 8, ["onExportUrlFn2"]), [
                    [vShow, $data.sceneFileName2 === '']
                  ]),
                  withDirectives(createBaseVNode("span", { style: {"color":"#428fff"} }, toDisplayString($data.sceneFileName2), 513), [
                    [vShow, $data.sceneFileName2 != '']
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "????????????",
                prop: "brandName"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: $data.form.brandName,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.form.brandName) = $event)),
                    placeholder: "?????????????????????"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "????????????",
                prop: "specifications"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: $data.form.specifications,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (($data.form.specifications) = $event)),
                    placeholder: "?????????????????????"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "??????" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_9, [
                    createBaseVNode("ul", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($data.labelList, (item, index) => {
                        return (openBlock(), createElementBlock("li", {
                          key: index,
                          onClick: $event => ($options.selectLabels(item)),
                          class: normalizeClass(item.isSelected ? 'item-active' : '')
                        }, toDisplayString(item.labelName), 11, _hoisted_10))
                      }), 128)),
                      createBaseVNode("li", {
                        onClick: _cache[4] || (_cache[4] = (...args) => ($options.addLabelBtnParent && $options.addLabelBtnParent(...args)))
                      }, "+")
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["rules", "model", "label-width"])
        ]),
        createBaseVNode("div", _hoisted_11, [
          createVNode(_component_el_button, {
            type: "primary",
            onClick: $options.onSubmit
          }, {
            default: withCtx(() => [
              _hoisted_12
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            onClick: $options.cancelBtn,
            style: {"background":"#2a2e39","color":"rgba(255,255,255,0.6)"}
          }, {
            default: withCtx(() => [
              _hoisted_13
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      _: 1
    }),
    createVNode(_component_add_label_dialog_module, {
      ref: "dialogChild",
      onChildfn: $options.queryLabels
    }, null, 8, ["onChildfn"])
  ]))
}
var Add = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-58831855"]]);

export { Add as default };
