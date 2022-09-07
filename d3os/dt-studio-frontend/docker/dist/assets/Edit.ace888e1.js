import { A as AddLabelDialogModule, a as TenantPanelModule, T as TenantUploadFile } from './AddLabelDialogModule.544fe093.js';
import { u as updateTenantScenes, g as getTenantScenesInfo } from './tenantScene.d6a51745.js';
import { u as uploadCommonFile, g as getLabelList } from './sceneList.b22bf172.js';
import { _ as _export_sfc, c as store } from './index.acc4a696.js';
import { r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, I as withDirectives, a0 as vShow, O as toDisplayString, L as Fragment, M as renderList, Y as normalizeClass, W as pushScopeId, X as popScopeId, N as createTextVNode } from './element-plus.da98f360.js';
import { _ as _imports_0 } from './tianjia.4a8b4043.js';
import './spark-md5.2cc5764b.js';
import './monaco-editor.e9574fd0.js';

var Edit_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".item-active[data-v-4ed7ad7b]{color:#428fff!important;background:rgba(66,143,255,.3)!important}.btn-box[data-v-4ed7ad7b]{width:30%;padding-left:42%;position:absolute;bottom:.416667rem;text-align:left}.container[data-v-4ed7ad7b]{background-color:#2a2e39;height:100%;min-height:100%}.form-bg[data-v-4ed7ad7b]{min-height:100%;height:100%;margin-left:35%;width:30%;text-align:center}.my-tag ul[data-v-4ed7ad7b]{-webkit-padding-start:0;padding-inline-start:0;-webkit-margin-before:0em;margin-block-start:0em;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.my-tag ul li[data-v-4ed7ad7b]{padding:0 .104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;cursor:pointer;height:.145833rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;margin-top:.041667rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem}\n")();

var Edit_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:.03125rem;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#409eff}.avatar-uploader-icon{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.145833rem;color:#8c939d;width:.625rem;height:auto;text-align:center}.avatar-uploader-icon .slt-avatar{width:100%;height:auto}.my-form{text-align:left}.my-form .el-form-item .el-form-item__label{color:#fff9}.my-form .el-form-item .el-form-item__content .el-input .el-input__inner{background-color:#2a2e39;border:1px solid rgba(255,255,255,.14)}\n")();

const { userinfo } = store.state.account;
const _sfc_main = {
  name: 'tenantEdit',
  components: { AddLabelDialogModule, TenantPanelModule, TenantUploadFile },
  data() {
    return {
      id: '',
      sceneUrl: '',
      sceneFileName: '',
      uuIDKey: '',
      initFlag: 0,
      labelIds: [],
      labelList: [],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
      labelWidth: '120px',
      form: {
        scenesName: '',
        modelFile: '',
        thumbnail: '',
      },
      imageUrl: '',
      addTenantFormRules: {
        scenesName: [
          {
            required: true,
            message: '请输入场景名称',
            trigger: 'blur',
          },
        ],
        modelFile: [
          {
            required: true,
            message: '请上传场景文件',
            trigger: 'change',
          },
        ],
        thumbnail: [
          {
            required: true,
            message: '请上传场景缩略图文件',
            trigger: 'change',
          },
        ],
      },
      userType: userinfo.userType,
    }
  },
  methods: {
    addLabelBtnParent() {
      this.$refs.dialogChild.resetLabelBtn(1);
    },
    exportUrlFn(obj) {
      console.log(obj, 12334);
      this.sceneUrl = obj.fileValue;
      this.sceneFileName = obj.fileName;
      this.uuIDKey = obj.uuIDKey;
      this.form.modelFile = this.sceneUrl + this.uuIDKey + '.FBX';
      this.$refs.formRef.clearValidate('modelFile');
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
      // console.log(file, 77777)
      let formData = new FormData();
      formData.append('file', file);
      uploadCommonFile(formData).then(res => {
        if (res.code === 1) {
          // console.log(res.data.downloadUrl, 88880)
          _this.form.thumbnail = res.data.downloadUrl;
        }
      });
      var reader = new FileReader();
      reader.onload = function(e) {
        // console.log(reader.result, 9999)
        _this.imageUrl = reader.result;
        //_this.imageUrl.push(reader.result);//将bade64位图片保存至数组里供上面图片显示
      };
      reader.readAsDataURL(file);
      // this.form.thumbnail = 'https://mini.io.com/123.png'
      this.$refs.formRef.clearValidate('thumbnail');
      return false
    },

    cancelBtn() {
      var pathName = '';
      if (this.userType === 1) {
        pathName = 'scenelist';
      } else {
        pathName = 'tenantList';
      }
      this.$router.push({
        name: pathName,
      });
      // this.$router.push({
      //     path:'/tenant/list'
      // })
    },
    onSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          console.log('submit!');
          this.editTenantScene();
        } else {
          console.log('error submit!');
          return false
        }
      });
    },
    editTenantScene() {
      let req = {
        id: this.id,
        labelIds: this.labelIds,
        modelFile: this.form.modelFile,
        scenesName: this.form.scenesName,
        thumbnail: this.form.thumbnail,
        modelSourceFile: this.sceneFileName,
      };
      updateTenantScenes(req).then(res => {
        if (res.code === 1) {
          this.$message.success('保存成功！');
          var pathName = '';
          if (this.userType === 1) {
            pathName = 'scenelist';
          } else {
            pathName = 'tenantList';
          }
          this.$router.push({
            name: pathName,
          });
          // this.$router.push({
          //     path:'/tenant/list'
          // })
        } else {
          this.$message.error('保存失败！');
        }
      });
    },
    queryLabels() {
      getLabelList({ type: 1 })
        .then(res => {
          if (res.code === 1) {
            this.labelList = res.data;
            console.log(this.labelList);
            this.labelList.map(item => {
              if (this.labelIds.includes(item.id)) {
                item.isSelected = true;
              }
              return item
            });
          }
        })
        .catch();
    },
    queryTenantSceneInfo(code) {
      let _this = this;
      getTenantScenesInfo({
        code: code,
        source: this.activeName == 0 ? 0 : 1,
      }).then(resp => {
        if (resp.code === 1) {
          this.form = resp.data;
          this.imageUrl = this.form.thumbnail;
          this.sceneFileName = this.form.modelFile; //copy value
          let labelIds = resp.data.labels;
          this.labelIds = [];
          labelIds.forEach(item => {
            this.labelIds.push(item.id);
          });

          // console.log( this.labelIds,1988)
          getLabelList({ type: 0 })
            .then(res => {
              if (res.code == 1) {
                _this.labelList = res.data;
                console.log(_this.labelList, 19882);
                for (let i = 0; i < _this.labelList.length; i++) {
                  for (let j = 0; j < labelIds.length; j++) {
                    if (_this.labelList[i].id == labelIds[j].id) {
                      _this.labelList[i].isSelected = true;
                    }
                  }
                }
              }
            })
            .catch();
        }
      });
    },
  },
  mounted() {
    // let obj = JSON.parse(localStorage.getItem('tenantEditSceneItem'))
    // this.form = obj
    // this.id = obj.id
    // this.imageUrl = obj.thumbnail
    // this.labelIds = []
    // for (let i = 0; i < obj.labels.length; i++) {
    //   this.labelIds.push(obj.labels[i].id)
    // }
    // obj.fileName = obj.modelFile;
    // this.exportUrlFn(obj)
    // this.queryLabels();
    // let code = this.$route.query.code

    let code = this.$route.query.code
      ? this.$route.query.code
      : this.$route.params.code;
    this.id = this.$route.query.id
      ? this.$route.query.id
      : this.$route.params.id;
    console.log(this.id, 3333);
    this.queryTenantSceneInfo(code);
  },
};


const _withScopeId = n => (pushScopeId("data-v-4ed7ad7b"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "container" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("p", null, "编辑场景", -1));
const _hoisted_3 = { class: "form-bg" };
const _hoisted_4 = { class: "avatar-uploader-icon" };
const _hoisted_5 = ["src"];
const _hoisted_6 = {
  key: 1,
  style: {"height":"20px","width":"20px"},
  src: _imports_0,
  alt: ""
};
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { style: {"font-size":"12px","color":"rgb(96, 98, 102)"} }, " 提示：支持JPG、PNG等格式，图片大小不超过10MB ", -1));
const _hoisted_8 = {
  class: "my-tag",
  style: {"margin-top":"-6px"}
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "btn-box" };
const _hoisted_11 = /*#__PURE__*/createTextVNode("保存");
const _hoisted_12 = /*#__PURE__*/createTextVNode(" 取 消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_tenant_upload_file = resolveComponent("tenant-upload-file");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_form = resolveComponent("el-form");
  const _component_add_label_dialog_module = resolveComponent("add-label-dialog-module");
  const _component_el_button = resolveComponent("el-button");
  const _component_tenant_panel_module = resolveComponent("tenant-panel-module");

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
                label: "场景名称",
                prop: "scenesName"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: $data.form.scenesName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.form.scenesName) = $event))
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "场景文件",
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
                label: "场景缩略图",
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
                      _hoisted_7
                    ]),
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_4, [
                        ($data.imageUrl)
                          ? (openBlock(), createElementBlock("img", {
                              key: 0,
                              src: $data.imageUrl,
                              class: "slt-avatar"
                            }, null, 8, _hoisted_5))
                          : (openBlock(), createElementBlock("img", _hoisted_6))
                      ])
                    ]),
                    _: 1
                  }, 8, ["before-upload", "modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "标签" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("ul", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($data.labelList, (item, index) => {
                        return (openBlock(), createElementBlock("li", {
                          key: index,
                          onClick: $event => ($options.selectLabels(item)),
                          class: normalizeClass(item.isSelected ? 'item-active' : '')
                        }, toDisplayString(item.labelName), 11, _hoisted_9))
                      }), 128)),
                      createBaseVNode("li", {
                        onClick: _cache[2] || (_cache[2] = (...args) => ($options.addLabelBtnParent && $options.addLabelBtnParent(...args)))
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
        createVNode(_component_add_label_dialog_module, {
          ref: "dialogChild",
          onChildfn: $options.queryLabels
        }, null, 8, ["onChildfn"]),
        createBaseVNode("div", _hoisted_10, [
          createVNode(_component_el_button, {
            type: "primary",
            onClick: $options.onSubmit
          }, {
            default: withCtx(() => [
              _hoisted_11
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            onClick: $options.cancelBtn,
            style: {"background":"#2a2e39","color":"rgba(255,255,255,0.6)"}
          }, {
            default: withCtx(() => [
              _hoisted_12
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      _: 1
    })
  ]))
}
var Edit = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-4ed7ad7b"]]);

export { Edit as default };
