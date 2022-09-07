import { c as store, _ as _export_sfc, d as _, U as UE, u as useRouter, o as onBeforeRouteLeave } from './index.acc4a696.js';
import { am as close_default, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, I as withDirectives, a0 as vShow, O as toDisplayString, L as Fragment, M as renderList, Y as normalizeClass, W as pushScopeId, X as popScopeId, l as ref, h as computed, N as createTextVNode, x as ElMessage, T as onMounted, m as watch, an as vModelText, u as unref, a4 as withModifiers, ao as check_default, ap as edit_pen_default, c as createBlock, G as createCommentVNode, j as reactive, _ as onBeforeUnmount, F as toRefs, $ as getCurrentInstance, d as defineComponent, b as resolveDynamicComponent } from './element-plus.da98f360.js';
import { U as UploadCommonFile } from './UploadCommonFlie.b601e7ae.js';
import { A as AddLabelDialogModule, a as TenantPanelModule, T as TenantUploadFile } from './AddLabelDialogModule.544fe093.js';
import { g as getLabelList, u as uploadCommonFile } from './sceneList.b22bf172.js';
import { u as updateTenantModel, g as getTenantModelInfo, s as saveModelmemberInfo, a as getModelmemberInfo } from './tenantModel.e1d9386d.js';
import { _ as _imports_0 } from './tianjia.4a8b4043.js';
import { T as TSlider } from './index.be6ed1cf.js';
import { a as addScene, _ as _sfc_main$6 } from './UploadFlie.62952e96.js';
import { g as getModelInfo, a as getAllFieldList, b as getBrandList, u as updateModel, c as createModel } from './modelScene.42824c77.js';
import './monaco-editor.e9574fd0.js';
import './spark-md5.2cc5764b.js';
import './tenantScene.d6a51745.js';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

const emitter = mitt();

var ModelEditDetailModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".model-edit-container .item-active[data-v-1d01cb90]{color:#428fff!important;background:rgba(66,143,255,.3)!important}.model-edit-container .my-form[data-v-1d01cb90]{margin:.052083rem .104167rem}.model-edit-container .avatar-uploader-icon[data-v-1d01cb90]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:.145833rem;color:#8c939d;width:.625rem;height:auto;text-align:center}.model-edit-container .avatar-uploader-icon .slt-avatar[data-v-1d01cb90]{width:100%;height:auto}.model-edit-container .my-tag ul[data-v-1d01cb90]{-webkit-padding-start:0;padding-inline-start:0;-webkit-margin-before:0em;margin-block-start:0em;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.model-edit-container .my-tag ul li[data-v-1d01cb90]{display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 .104167rem;cursor:pointer;height:.145833rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;margin-top:.041667rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem}\n")();

const { userinfo } = store.state.account;
const _sfc_main$5 = {
  components: {
    Close: close_default,
    UploadCommonFile,
    AddLabelDialogModule,
    // eslint-disable-next-line vue/no-unused-components
    TenantPanelModule,
    TenantUploadFile,
  },
  name: 'ModelEditDetailModule',
  data() {
    return {
      imageUrl: '',
      format: '',
      id: '',
      userType: userinfo.userType,
      sceneUrl: '',
      sceneFileName: '',
      sceneFileName2: '',
      uuIDKey: '',
      initFlag: 0,
      labelIds: [],
      labelList: [],
      labelWidth: '120px',
      form: {
        name: '',
        modelFile: '',
        thumbnail: '',
      },
      addTenantFormRules: {
        name: [
          {
            required: true,
            message: '请输入模型名称',
            trigger: 'blur',
          },
        ],
        modelFile: [
          {
            required: true,
            message: '请上传模型文件',
            trigger: 'change',
          },
        ],
        thumbnail: [
          {
            required: true,
            message: '请上传模型缩略图文件',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      // console.log(this.$refs.form,198888);
      this.$refs.formABC.validate(valid => {
        if (valid) {
          console.log('submit!');
          this.editTenantModel();
        } else {
          console.log('error submit!');
          return false
        }
      });
    },
    editTenantModel() {
      let req = {
        brandId: this.form.brandId,
        brandName: this.form.brandName,
        objectModel: this.form.objectModel,
        specifications: this.form.specifications,
        id: this.form.id,
        labelIds: this.labelIds,
        name: this.form.name,
        thumbnail: this.form.thumbnail,
        modelFile: this.sceneUrl + this.uuIDKey + '.' + this.format, //模型文件标记
        modelSourceFile: this.uuIDKey + '.' + this.format, //模型文件标记
      };
      console.log('req::::', req);

      updateTenantModel(req).then(res => {
        // console.log(this.userType, 'this.userType')
        if (res.code === 1) ;
      });
    },
    deleteModelFile() {
      this.sceneFileName = '';
    },
    queryLabels() {
      getLabelList({ type: 0 })
        .then(res => {
          if (res.code === 1) {
            this.labelList = res.data;
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
    addLabelBtnParent() {
      this.$refs.dialogChild.resetLabelBtn(0);
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
    exportUrlFn(obj) {
      this.sceneUrl = obj.fileValue;
      this.sceneFileName = obj.fileName;
      this.uuIDKey = obj.uuIDKey;
      this.format = obj.format;
      console.log(12334, obj)
      ;(this.form.modelFile = this.sceneUrl + this.uuIDKey + '.' + this.format),
        this.$refs.form.clearValidate('modelFile');
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
          console.log(res.data.downloadUrl, 88880);
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
      this.$refs.form.clearValidate('thumbnail');
      return false
    },
    exportUrlFn2(obj) {
      this.form.objectModel = obj.fileValue;
      this.$refs.form.clearValidate('modelFile');
      this.sceneFileName2 = obj.fileName;
      console.log(obj, 1234567);
    },
    queryTenantModelInfo(code) {
      let _this = this;
      getTenantModelInfo({ code: code }).then(resp => {
        if (resp.code === 1) {
          this.form = resp.data;
          this.imageUrl = this.form.thumbnail;
          this.form.fileName = this.form.modelFile; //copy value
          this.sceneFileName = resp.data.modelFile;
          let labelIds = resp.data.labels;
          this.labelIds = [];
          labelIds.forEach(item => {
            this.labelIds.push(item.id);
          });
          getLabelList({ type: 0 })
            .then(res => {
              if (res.code == 1) {
                _this.labelList = res.data;
                // console.log( _this.labelList,19882);
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
    let code = this.$route.query.code
      ? this.$route.query.code
      : this.$route.params.code;
    this.queryTenantModelInfo(code);
    const _this = this;
    emitter.on('saveModelUpdate', () => {
      _this.onSubmit();
    });
  },
};


const _withScopeId$2 = n => (pushScopeId("data-v-1d01cb90"),n=n(),popScopeId(),n);
const _hoisted_1$5 = { class: "model-edit-container" };
const _hoisted_2$5 = { class: "avatar-uploader-icon" };
const _hoisted_3$5 = ["src"];
const _hoisted_4$5 = {
  key: 1,
  style: {"height":"20px","width":"20px"},
  src: _imports_0,
  alt: ""
};
const _hoisted_5$5 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createBaseVNode("div", { style: {"display":"flex"} }, [
  /*#__PURE__*/createBaseVNode("div", {
    style: {"display":"flex","font-size":"12px","color":"#606266"},
    class: ""
  }, " 提示：支持JPG、PNG等格式，图片大小不超过10MB ")
], -1));
const _hoisted_6$4 = {
  class: "my-tag",
  style: {"margin-top":"-6px"}
};
const _hoisted_7$4 = ["onClick"];

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_tenant_upload_file = resolveComponent("tenant-upload-file");
  const _component_Close = resolveComponent("Close");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_upload_common_file = resolveComponent("upload-common-file");
  const _component_el_form = resolveComponent("el-form");
  const _component_add_label_dialog_module = resolveComponent("add-label-dialog-module");

  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    createBaseVNode("div", null, [
      createVNode(_component_el_form, {
        class: "my-form",
        ref: "formABC",
        rules: $data.addTenantFormRules,
        model: $data.form,
        "label-width": $data.labelWidth
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, {
            label: "模型名称",
            prop: "name"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: $data.form.name,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.form.name) = $event)),
                placeholder: "请输入模型名称"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "模型文件",
            prop: "modelFile"
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(_component_tenant_upload_file, { onExportUrlFn: $options.exportUrlFn }, null, 8, ["onExportUrlFn"]), [
                [vShow, $data.sceneFileName === '']
              ]),
              withDirectives(createBaseVNode("span", { style: {"display":"inline-block","width":"90%","color":"#428fff","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"} }, toDisplayString($data.sceneFileName), 513), [
                [vShow, $data.sceneFileName != '']
              ]),
              withDirectives(createBaseVNode("span", {
                style: {"display":"inline-block"},
                onClick: _cache[1] || (_cache[1] = (...args) => ($options.deleteModelFile && $options.deleteModelFile(...args)))
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(_component_Close)
                  ]),
                  _: 1
                })
              ], 512), [
                [vShow, $data.sceneFileName != '']
              ])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "模型缩略图",
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
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.form.thumbnail) = $event))
              }, {
                tip: withCtx(() => [
                  _hoisted_5$5
                ]),
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2$5, [
                    ($data.imageUrl)
                      ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          src: $data.imageUrl,
                          class: "slt-avatar"
                        }, null, 8, _hoisted_3$5))
                      : (openBlock(), createElementBlock("img", _hoisted_4$5))
                  ])
                ]),
                _: 1
              }, 8, ["before-upload", "modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "物模型",
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
            label: "品牌厂家",
            prop: "brandName"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: $data.form.brandName,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (($data.form.brandName) = $event)),
                placeholder: "请输入品牌厂家"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            label: "规格型号",
            prop: "specifications"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: $data.form.specifications,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => (($data.form.specifications) = $event)),
                placeholder: "请输入品牌型号"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { label: "标签" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_6$4, [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.labelList, (item, index) => {
                    return (openBlock(), createElementBlock("li", {
                      key: index,
                      onClick: $event => ($options.selectLabels(item)),
                      class: normalizeClass(item.isSelected ? 'item-active' : '')
                    }, toDisplayString(item.labelName), 11, _hoisted_7$4))
                  }), 128)),
                  createBaseVNode("li", {
                    onClick: _cache[5] || (_cache[5] = (...args) => ($options.addLabelBtnParent && $options.addLabelBtnParent(...args)))
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
    }, null, 8, ["onChildfn"])
  ]))
}
var ModelEditDetailModule = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$1],['__scopeId',"data-v-1d01cb90"]]);

var ActionCreationModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".action-creation .title[data-v-5412b4c5]{margin-top:.104167rem;margin-left:.104167rem;margin-bottom:.052083rem;color:#fff}.action-creation .menu-panel .setting-info[data-v-5412b4c5]{margin-left:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.action-creation .menu-panel .setting-info .label-title[data-v-5412b4c5]{white-space:nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}.action-creation .menu-panel .setting-info .label-item[data-v-5412b4c5]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;display:-webkit-box;display:-ms-flexbox;display:flex}.action-creation .menu-panel .setting-info .label-item2[data-v-5412b4c5]{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;display:-webkit-box;display:-ms-flexbox;display:flex}.action-creation .menu-panel .setting-info .label-title2[data-v-5412b4c5]{margin-top:.052083rem;white-space:nowrap;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;display:-webkit-box;display:-ms-flexbox;display:flex}\n")();

const _withScopeId$1 = n => (pushScopeId("data-v-5412b4c5"),n=n(),popScopeId(),n);
const _hoisted_1$4 = { class: "action-creation" };
const _hoisted_2$4 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", { class: "title" }, "模型动作创建菜单", -1));
const _hoisted_3$4 = { class: "menu-panel" };
const _hoisted_4$4 = { class: "setting-info" };
const _hoisted_5$4 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", { class: "label-title" }, "动作类型：", -1));
const _hoisted_6$3 = { class: "label-item" };
const _hoisted_7$3 = { class: "setting-info" };
const _hoisted_8$3 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", { class: "label-title2" }, "参考轴系：", -1));
const _hoisted_9$3 = { class: "label-item2" };
const _hoisted_10$3 = { class: "setting-info" };
const _hoisted_11$2 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createBaseVNode("div", {
  class: "label-title2",
  style: {"visibility":"hidden"}
}, "是占位符：", -1));
const _hoisted_12$2 = { class: "label-item2" };
const _hoisted_13$2 = /*#__PURE__*/createTextVNode(" 创建运动 ");

//动作类型

const _sfc_main$4 = {
  __name: 'ActionCreationModule',
  setup(__props) {

// eslint-disable-next-line no-unused-vars
const actionType = ref('linearMotion');

const coordinate = ref('X+');
const currentModelEntities = computed(
  () => store.state.modelEditV2.currentModelEntities
);
const currentNode = computed(() => store.state.modelEditV2.currentNode);
const currentModelActions = computed(
  () => store.state.modelEditV2.currentModelActions
);
const modelStatusList = computed(() => store.state.modelEditV2.modelStatusList);

// const copyCurrentModelActions = ref([]);
const actionTypeList = [
  { label: 'linearMotion', text: '直线运动' },
  { label: 'rotationMotion', text: '旋转运动' },
];
const coordinateList = [
  { label: 'X+', text: 'X+' },
  { label: 'Y+', text: 'Y+' },
  { label: 'Z+', text: 'Z+' },
  { label: 'X-', text: 'X-' },
  { label: 'Y-', text: 'Y-' },
  { label: 'Z-', text: 'Z-' },
];
const createAction = () => {
  console.log('currentModelEntities:::', currentModelEntities.value);
  console.log('currentNode:::', currentNode.value.nodeId);
  console.log('currentModelActions:::', currentModelActions.value);
  let current = _.cloneDeep(currentNode.value);
  let arrActions = _.cloneDeep(currentModelActions.value);
  let action = null;
  let currentNodeFlag = false;
  if (currentNode.value.nodeId) {
    currentModelActions.value.forEach(item => {
      if (
        item.nodeId == currentNode.value.nodeId &&
        item.motionType == actionType.value &&
        item.axis == coordinate.value
      ) {
        currentNodeFlag = true;
      }
    });
    if (currentNodeFlag) {
      ElMessage({
        type: 'warning',
        message: '当前节点已创建动作同类型动作，不可重复，请调整配置再试',
      });
    } else {
      if (actionType.value == 'linearMotion') {
        action = {
          modelId: current.modelId,
          nodeId: current.nodeId,
          motionType: actionType.value,
          axis: coordinate.value,
          name: '自定义' + arrActions.length,
          min: -1000,
          value: 0,
          max: 1000,
        };
      } else {
        action = {
          modelId: current.modelId,
          nodeId: current.nodeId,
          motionType: actionType.value,
          axis: coordinate.value,
          name: '自定义' + arrActions.length,
          min: -180,
          value: 0,
          max: 180,
        };
      }
      //存在相同nodeId的动作，先移除,再添加；
      // 再将当前所有状态列表中该nodeId的的motionType和axis修改为本次动作创建的motionType和axis
      _.remove(arrActions, function(a) {
        return a.nodeId == action.nodeId
      });
      arrActions.push(action);
      arrActions.map(ac => {
        if (ac.nodeId == action.nodeId) {
          ac.motionType = action.motionType;
          ac.axis = action.axis;
        }
        return ac
      });
      //0.先调用复位接口
      let tmpObj = {
        modelId: current.modelId,
        nodeId: current.nodeId,
      };
      UE.publish('JS2UE_InitMechanism', tmpObj);
      //1.通知UE当前节点定义的机构类型
      //2.更新currentModelActions
      //3.更新-每个模型状态都添加一个当前创建的动作
      let objMsg = {
        modelId: current.modelId,
        nodeId: current.nodeId,
        motionType: actionType.value,
        axis: coordinate.value,
      };
      UE.publish('JS2UE_MechanismDefine', objMsg);
      store.commit('modelEditV2/setCurrentModelActions', arrActions);
      let copyModelStatus = _.cloneDeep(modelStatusList.value);
      copyModelStatus.map(item => {
        _.remove(item.actions, function(a) {
          return a.nodeId == action.nodeId
        });
        return item
      });
      copyModelStatus.map(item => {
        item.actions.push(action);
        item.actions.map(citem => {
          if (citem.nodeId == action.nodeId) {
            citem.motionType = action.motionType;
            citem.axis = action.axis;
          }
          return citem
        });
        return item
      });
      console.log('changed copyModelStatus:', copyModelStatus);
      store.commit('modelEditV2/setModelStatusList', copyModelStatus);
    }
  } else {
    console.log('未选中节点');
  }

  // if(1==1){
  //   ElMessage({
  //     type:"warning",
  //     message:"当前节点已创建动作，不可重复，请更换其他节点",
  //   })
  // }else{
  //   console.log("执行创建节点任务")
  //   console.log(copyValus)
  //   console.log(currentNode.value.nodeId)
  //   changeTreeItem(copyValus,currentNode.value.nodeId);
  //   console.log("changed:",copyValus)
  //   //currentModelActions.value.push()
  //   let arr =_.cloneDeep(currentModelActions.value);
  //   let action = null;
  //   if (actionType.value=='linearMotion'){
  //     action={
  //       modelId:current.modelId,
  //       nodeId:current.nodeId,
  //       motionType:actionType.value,
  //       axis:coordinate.value,
  //       name: '自定义',
  //       min: -1000,
  //       value:0,
  //       max:1000
  //     }
  //   }else{
  //     action={
  //       modelId:current.modelId,
  //       nodeId:current.nodeId,
  //       motionType:actionType.value,
  //       axis:coordinate.value,
  //       name: '自定义',
  //       min: -180,
  //       value:0,
  //       max:180
  //     }
  //   }
  //   arr.push(action)
  //   //通知UE当前节点定义的机构类型
  //   let objMsg={
  //     modelId:current.modelId,
  //     nodeId:current.nodeId,
  //     motionType:actionType.value,
  //     axis:coordinate.value,
  //   }
  //   UE.publish("JS2UE_MechanismDefine",objMsg)
  //   store.commit('modelEditV2/setCurrentModelActions',arr)
  //   //每个状态都添加一个当前创建的动作
  //   let copyModelStatus=_.cloneDeep(modelStatusList.value);
  //   copyModelStatus.map(item=>{
  //     item.actions.push(action)
  //   })
  //   console.log("changed copyModelStatus:",copyModelStatus)
  //
  //   store.commit('modelEditV2/setModelStatusList',copyModelStatus)

  // }
};
// const updateDatas = (val) => {
//
//   copyCurrentModelActions.value = val;
// }

return (_ctx, _cache) => {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    _hoisted_2$4,
    createBaseVNode("div", _hoisted_3$4, [
      createBaseVNode("div", _hoisted_4$4, [
        _hoisted_5$4,
        createBaseVNode("div", _hoisted_6$3, [
          createVNode(_component_el_radio_group, {
            modelValue: actionType.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((actionType).value = $event))
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(actionTypeList, (option) => {
                return createVNode(_component_el_radio, {
                  label: option.label,
                  key: option.label,
                  size: "large"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(option.text), 1)
                  ]),
                  _: 2
                }, 1032, ["label"])
              }), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_7$3, [
        _hoisted_8$3,
        createBaseVNode("div", _hoisted_9$3, [
          createVNode(_component_el_radio_group, {
            modelValue: coordinate.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((coordinate).value = $event))
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock(Fragment, null, renderList(coordinateList, (option) => {
                return createVNode(_component_el_radio, {
                  label: option.label,
                  key: option.label,
                  size: "large"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(option.text), 1)
                  ]),
                  _: 2
                }, 1032, ["label"])
              }), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ]),
      createBaseVNode("div", _hoisted_10$3, [
        _hoisted_11$2,
        createBaseVNode("div", _hoisted_12$2, [
          createVNode(_component_el_button, {
            onClick: createAction,
            style: {"background":"transparent","color":"#409eff","border":"solid 1px #409eff"},
            type: "primary",
            plain: ""
          }, {
            default: withCtx(() => [
              _hoisted_13$2
            ]),
            _: 1
          })
        ])
      ])
    ])
  ]))
}
}

};
var ActionCreationModule = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-5412b4c5"]]);

var DriverPanelModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".driver-panel-setting-container[data-v-5c11a480]{margin-left:.026042rem;margin-right:.026042rem}.driver-panel-setting-container table[data-v-5c11a480]{width:100%}.driver-panel-setting-container .slider-item[data-v-5c11a480]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.052083rem}.driver-panel-setting-container .slider-item .slider-left-input[data-v-5c11a480],.driver-panel-setting-container .slider-item .slider-right-input[data-v-5c11a480]{display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 .015625rem}.driver-panel-setting-container .slider-item .slider-delete[data-v-5c11a480]{cursor:pointer}.driver-panel-setting-container .slider-item .slider-text[data-v-5c11a480]{z-index:300;color:#000;display:-webkit-box;display:-ms-flexbox;display:flex;left:50%;position:absolute}.driver-panel-setting-container .slider-item .el-slider__button-wrapper[data-v-5c11a480]{display:none}\n")();

var DriverPanelModule_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".driver-panel-setting-container .my-btn{color:#fff}.driver-panel-setting-container .my-btn:hover{color:#409eff}.driver-panel-setting-container .my-input{font-size:.072917rem;text-align:center;width:90%;height:.1875rem;border:solid 1px rgba(255,255,255,.5);color:#fff;border-radius:.015625rem;background:#2a2e39}.driver-panel-setting-container table tr:hover{background:#2c3d57}.driver-panel-setting-container .number-input{width:16%}.driver-panel-setting-container .slider{width:40%}.driver-panel-setting-container .slider .el-input-number{width:auto}.driver-panel-setting-container .model-action-name .el-input__wrapper{padding:0!important}.driver-panel-setting-container .my-data{background:#2a2e39}\n")();

const _hoisted_1$3 = { class: "driver-panel-setting-container" };
const _hoisted_2$3 = ["onInput", "onUpdate:modelValue"];
const _hoisted_3$3 = { class: "number-input" };
const _hoisted_4$3 = ["onInput", "onUpdate:modelValue"];
const _hoisted_5$3 = { class: "slider" };
const _hoisted_6$2 = { class: "number-input" };
const _hoisted_7$2 = ["onInput", "onUpdate:modelValue"];
const _hoisted_8$2 = { style: {"margin-top":"20px","margin-right":"5px","float":"right"} };
const _hoisted_9$2 = /*#__PURE__*/createTextVNode(" 更新 ");
const _hoisted_10$2 = /*#__PURE__*/createTextVNode(" 新建 ");


const _sfc_main$3 = {
  __name: 'DriverPanelModule',
  setup(__props) {

const currentModelActions = computed(
  () => store.state.modelEditV2.currentModelActions
);
// const currentNode = computed(() => store.state.modelEditV2.currentNode)
const modelStatusList = computed(() => store.state.modelEditV2.modelStatusList);
const currentModelStatus = computed(
  () => store.state.modelEditV2.currentModelStatus
);

const tableData = ref([]);

const changeName = (aitem, name) => {
  let arrData = _.cloneDeep(currentModelActions.value);
  function changeTreeItem(data, id) {
    data.map(item => {
      if (item.nodeId == id) {
        item.name = name;
      }
    });
  }
  changeTreeItem(arrData, aitem.nodeId);
  store.commit('modelEditV2/setCurrentModelActions', arrData);
};
const changeMin = (aitem, min) => {
  let arrData = _.cloneDeep(currentModelActions.value);
  function changeTreeItem(data, id) {
    data.map(item => {
      if (item.nodeId == id) {
        item.min = min;
      }
    });
  }
  changeTreeItem(arrData, aitem.nodeId);
  store.commit('modelEditV2/setCurrentModelActions', arrData);
};
const changeMax = (aitem, max) => {
  let arrData = _.cloneDeep(currentModelActions.value);
  function changeTreeItem(data, id) {
    data.map(item => {
      if (item.nodeId == id) {
        item.max = max;
      }
    });
  }
  changeTreeItem(arrData, aitem.nodeId);
  store.commit('modelEditV2/setCurrentModelActions', arrData);
};

const copyDatas = val => {
  console.log(tableData.value, 1);
  tableData.value = JSON.parse(JSON.stringify(val));
  console.log(tableData.value, 2);

  if (tableData.value.length) {
    const entities = tableData.value.map(item => {
      return {
        nodeId: item.nodeId,
        motionType: item.motionType,
        axis: item.axis,
        sliderValue:
          item.motionType == 'linearMotion' ? item.value : item.value,
      }
    });

    const tmp = {
      modelId: tableData.value[0].modelId,
      dynamicPlay: 'false',
      playTime: 1.0,
      entities,
    };
    UE.publish('JS2UE_MechanismDriver', tmp);
  }
};
// const name1 = ref('可自定义')
// const min1 = ref(0)
// const max1 = ref(180)

// const value = ref(90)
const marks = ref([]);
const init = () => {
  marks.value = {
    0: '0°',
    180: '180°',
  };
};
const changeActionItem = aitem => {
  console.log('滑动的项：', aitem);
  let arrData = _.cloneDeep(currentModelActions.value);
  function changeTreeItem(data, id) {
    data.map(item => {
      // console.log(item.nodeId);
      if (item.nodeId == id) {
        item.value = aitem.value;
      }
    });
  }
  changeTreeItem(arrData, aitem.nodeId);
  console.log('changed arrdata', arrData);

  store.commit('modelEditV2/setCurrentModelActions', arrData);
  //模型管理机构拖拽通知UE做相应动画,单条数据，不考虑动画
  // let tmp = {
  //   modelId: aitem.modelId,
  //   dynamicPlay: 'false',
  //   playTime: 1.0,
  //   entities: [],
  // }
  // let obj = {
  //   nodeId: aitem.nodeId,
  //   motionType: aitem.motionType,
  //   axis: aitem.axis,
  //   sliderValue: aitem.motionType == 'linearMotion' ? aitem.value : aitem.value,
  // }
  // tmp.entities.push(obj)
  // console.log('tmp:::', tmp, 'JS2UE_MechanismDriver')
  // UE.publish('JS2UE_MechanismDriver', tmp)
};
const deleteSliderItem = item => {
  console.log('从数组中移除当前item', item);
  //currentModelActions
  let arr = _.cloneDeep(currentModelActions.value);
  _.remove(arr, function(citem) {
    return citem.nodeId == item.nodeId
  });
  console.log('removed:', arr);
  store.commit('modelEditV2/setCurrentModelActions', arr);

  //删除完，是否需要更新，再生效？默认不需要更新，立刻生效
  //删除一个状态的某个动作，默认其他状态的该项动作也随之删除
  let arr2 = _.cloneDeep(modelStatusList.value);
  console.log('删除前', modelStatusList.value);
  console.log('currentModelStatus.value:::', currentModelStatus.value);
  //状态管理中-当前状态保存的动作中要删除当前这条动作；
  let currentModelStatusList = _.cloneDeep(currentModelStatus.value);
  _.remove(currentModelStatusList.actions, function(citem) {
    return citem.nodeId == item.nodeId
  });
  store.commit('modelEditV2/setCurrentModelStatus', currentModelStatusList);
  console.log('currentModelStatus.value222:::', currentModelStatus.value);
  //状态管理中-所有状态都要遍历删除当前这条动作；

  arr2.map(aitem => {
    let innerActions = aitem.actions;
    _.remove(innerActions, function(citem) {
      return citem.nodeId == item.nodeId
    });
    return (aitem.actions = innerActions)
  });
  console.log('删除后', arr2);
  store.commit('modelEditV2/setModelStatusList', arr2);
  //modelStatusList
};
const updateModelStatus = () => {
  let arr = _.cloneDeep(modelStatusList.value);
  console.log('更新前', arr);
  console.log('currentModelStatus.value:::', currentModelStatus.value);
  function changeAllActionsName(itemActions, currentActions) {
    for (let i = 0; i < itemActions.length; i++) {
      for (let j = 0; j < currentActions.length; j++) {
        if (itemActions[i].nodeId === currentActions[j].nodeId) {
          itemActions[i].name = currentActions[j].name;
        }
      }
    }
    return itemActions
  }
  arr.map(item => {
    if (item.name == currentModelStatus.value.name) {
      //重要
      item.actions = currentModelActions.value;
    }
  });
  console.log('更新后 arr:', arr);
  arr.map(item => {
    let itemActions = changeAllActionsName(
      item.actions,
      currentModelActions.value
    );
    item.actions = itemActions;
  });
  console.log('更新后2 arr:', arr);
  store.commit('modelEditV2/setModelStatusList', arr);
  ElMessage({
    type: 'success',
    message: '更新成功！',
  });
};
const createModelStatus = () => {
  // let arr = [...modelStatusList.value]
  let arr = _.cloneDeep(modelStatusList.value);
  //插入一条数据至模型状态列表,并将default或当前状态的动作列表拷贝
  //   let actions=[...currentModelActions.value];
  let actions = _.cloneDeep(currentModelActions.value);

  const getValidName = num => {
    const expectationName = `自定义${num}`;
    const isInvalidName = arr.find(item => item.name === expectationName);

    if (isInvalidName) {
      return getValidName(num + 1)
    } else {
      return expectationName
    }
  };

  const name = getValidName(arr.length);

  arr.push({ name, actions });
  store.commit('modelEditV2/setModelStatusList', arr);
  //高亮选中新建的这一行
  store.commit('modelEditV2/setCurrentRowIndex', arr.length - 1);
};
onMounted(() => {
  init();
});
watch(currentModelActions, val => {
  console.log('动作列表监听：：：', val);
  copyDatas(val);
});

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("table", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(tableData.value, (item, index) => {
        return (openBlock(), createElementBlock("tr", { key: index }, [
          createBaseVNode("td", null, [
            withDirectives(createBaseVNode("input", {
              class: "my-input",
              onInput: $event => (changeName(item, item.name)),
              type: "text",
              "onUpdate:modelValue": $event => ((item.name) = $event),
              autocomplete: "off"
            }, null, 40, _hoisted_2$3), [
              [vModelText, item.name]
            ])
          ]),
          createBaseVNode("td", _hoisted_3$3, [
            withDirectives(createBaseVNode("input", {
              class: "my-input",
              onInput: $event => (changeMin(item, item.min)),
              type: "number",
              "onUpdate:modelValue": $event => ((item.min) = $event),
              autocomplete: "off"
            }, null, 40, _hoisted_4$3), [
              [vModelText, item.min]
            ])
          ]),
          createBaseVNode("td", _hoisted_5$3, [
            createVNode(TSlider, {
              modelValue: item.value,
              "onUpdate:modelValue": $event => ((item.value) = $event),
              min: item.min,
              max: item.max,
              unit: item.motionType === 'rotationMotion' ? '°' : 'mm',
              onInput: $event => (changeActionItem(item)),
              onChange: $event => (changeActionItem(item))
            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "unit", "onInput", "onChange"])
          ]),
          createBaseVNode("td", _hoisted_6$2, [
            withDirectives(createBaseVNode("input", {
              class: "my-input",
              type: "number",
              onInput: $event => (changeMax(item, item.max)),
              "onUpdate:modelValue": $event => ((item.max) = $event),
              autocomplete: "off"
            }, null, 40, _hoisted_7$2), [
              [vModelText, item.max]
            ])
          ]),
          createBaseVNode("td", null, [
            createVNode(_component_el_icon, {
              style: {"cursor":"pointer"},
              onClick: withModifiers($event => (deleteSliderItem(item)), ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(unref(close_default))
              ]),
              _: 2
            }, 1032, ["onClick"])
          ])
        ]))
      }), 128))
    ]),
    createBaseVNode("div", _hoisted_8$2, [
      createVNode(_component_el_button, {
        class: "my-btn",
        onClick: updateModelStatus,
        plain: "",
        style: {"background":"transparent","width":"75px"}
      }, {
        default: withCtx(() => [
          _hoisted_9$2
        ]),
        _: 1
      }),
      createVNode(_component_el_button, {
        class: "my-btn",
        onClick: createModelStatus,
        plain: "",
        style: {"background":"transparent","width":"75px"}
      }, {
        default: withCtx(() => [
          _hoisted_10$2
        ]),
        _: 1
      })
    ])
  ]))
}
}

};
var DriverPanelModule = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-5c11a480"]]);

var ModelStatusListModule_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".model-status-list-container[data-v-3b74de9a]{display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:.104167rem;margin-right:.104167rem}.model-status-list-container table[data-v-3b74de9a]{width:100%}\n")();

var ModelStatusListModule_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".el-input.is-disabled .el-input__inner{background-color:transparent!important;cursor:not-allowed!important}.el-input.is-disabled .el-input__inner:hover{background:#2f3c55!important;color:#409eff!important;cursor:not-allowed!important}.isSelect{background:#2f3c55!important}.isSelect .el-input__inner{color:#409eff!important}\n")();

const _hoisted_1$2 = { class: "model-status-list-container" };
const _hoisted_2$2 = { style: {"width":"90%"} };
const _hoisted_3$2 = { border: "0" };
const _hoisted_4$2 = ["onClick"];
const _hoisted_5$2 = { style: {"position":"absolute","bottom":"10px"} };

const _sfc_main$2 = {
  __name: 'ModelStatusListModule',
  setup(__props) {

const tableData = ref([]);
const currentRowIndex = computed(() => store.state.modelEditV2.currentRowIndex);
const currentRow = ref();
const checked1 = ref(true);
const modelStatusList = computed(() => store.state.modelEditV2.modelStatusList);
const copyDatas = val => {
  console.log(tableData.value, 11);
  tableData.value = _.cloneDeep(val);
  tableData.value.map(t => {
    t.check = false;
    return t
  });
  console.log(tableData.value, 12);
};

const blurEvent = () => {
  setTimeout(() => copyDatas(modelStatusList.value), 200);
};

const changeName = (item, index) => {
  console.log('changeitem::', item, index);
  item.check = !item.check;
  let mList = _.cloneDeep(modelStatusList.value);
  mList.forEach((m, mIndex) => {
    if (mIndex == index) {
      m.name = item.name;
    }
    return m
  });
  console.log('mList::', mList);
  store.commit('modelEditV2/setModelStatusList', mList);
};
const handleCurrentChange = (val, index, event) => {
  console.log(event);
  // currentRowIndex.value = index
  store.commit('modelEditV2/setCurrentRowIndex', index);
  currentRow.value = val;
  if (currentRow.value) {
    console.log('currentRowIndex.value:::', currentRowIndex.value);
    console.log('currentRow.value:::', currentRow.value);
    //切换机构面板的显示动作列表
    // let arr = [...currentRow.value.actions];
    let obj = _.cloneDeep(currentRow.value);
    console.log('obj:', obj);
    //把选中状态的批量动作列表传值给UE
    if (obj.actions.length > 0) {
      store.commit('modelEditV2/setCurrentModelStatus', obj);
      store.commit('modelEditV2/setCurrentModelActions', obj.actions);
      let tmp = {
        modelId: obj.actions[0].modelId,
        dynamicPlay: checked1.value,
        playTime: 1.0,
        entities: [],
      };
      obj.actions.forEach(item => {
        let child = {};
        child.nodeId = item.nodeId;
        child.motionType = item.motionType;
        child.axis = item.axis;
        child.sliderValue =
          item.motionType == 'linearMotion' ? item.value : item.value;
        tmp.entities.push(child);
      });

      console.log('tmp:::', tmp);
      UE.publish('JS2UE_MechanismDriver', tmp);
    }
  } else {
    console.log('点击没反应', val);
  }
};
const deleteModelStatus = item => {
  //1.删除modelStatusList中当前状态
  //2.重新设置currentModelStatus的值为modelStatusList中的第一项状态,并为选中高亮状态
  //3.重新设置currentModelActions为modelStatusList中的第一项状态的actions
  let copy_modelStatusList = _.cloneDeep(modelStatusList.value);
  _.remove(copy_modelStatusList, function(citem) {
    return citem.name == item.name
  });
  //删除后默认选中第一行
  // currentRowIndex.value = 0
  //高亮选中第一行
  store.commit('modelEditV2/setCurrentRowIndex', 0);
  store.commit('modelEditV2/setModelStatusList', copy_modelStatusList);
  store.commit('modelEditV2/setCurrentModelStatus', copy_modelStatusList[0]);
  store.commit(
    'modelEditV2/setCurrentModelActions',
    copy_modelStatusList[0].actions
  );
  //需要调用一次UE，复位模型
  let tmp = {
    modelId: copy_modelStatusList[0].actions[0].modelId,
    dynamicPlay: checked1.value,
    playTime: 1.0,
    entities: [],
  };
  copy_modelStatusList[0].actions.forEach(item => {
    let child = {};
    child.nodeId = item.nodeId;
    child.motionType = item.motionType;
    child.axis = item.axis;
    child.sliderValue =
      item.motionType == 'linearMotion' ? item.value : item.value;
    tmp.entities.push(child);
  });
  UE.publish('JS2UE_MechanismDriver', tmp);
};
onMounted(() => {
  copyDatas(modelStatusList.value);
});
// eslint-disable-next-line no-unused-vars
watch(modelStatusList, newValue => {
  console.log(newValue);
  copyDatas(newValue);
});

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_checkbox = resolveComponent("el-checkbox");

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      createBaseVNode("table", _hoisted_3$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(tableData.value, (item, index) => {
          return (openBlock(), createElementBlock("tr", { key: index }, [
            createBaseVNode("td", {
              onClick: $event => (handleCurrentChange(item, index, $event))
            }, [
              createVNode(_component_el_input, {
                onBlur: withModifiers($event => (blurEvent()), ["stop"]),
                disabled: !item.check,
                class: normalizeClass([{ isSelect: unref(currentRowIndex) == index }, "my-model-status-name"]),
                style: {"width":"100%","background":"#353842","margin-bottom":"8px"},
                modelValue: item.name,
                "onUpdate:modelValue": $event => ((item.name) = $event)
              }, {
                suffix: withCtx(() => [
                  createVNode(_component_el_icon, { class: "el-input__icon" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(unref(check_default), {
                        onClick: withModifiers($event => (changeName(item, index)), ["stop"])
                      }, null, 8, ["onClick"]), [
                        [vShow, item.check && item.name != 'default']
                      ]),
                      withDirectives(createVNode(unref(edit_pen_default), {
                        onClick: withModifiers($event => (item.check = !item.check), ["stop"])
                      }, null, 8, ["onClick"]), [
                        [vShow, !item.check && item.name != 'default']
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["onBlur", "disabled", "class", "modelValue", "onUpdate:modelValue"])
            ], 8, _hoisted_4$2),
            createBaseVNode("td", null, [
              (item.name != 'default')
                ? (openBlock(), createBlock(_component_el_icon, {
                    key: 0,
                    style: {"cursor":"pointer"},
                    onClick: withModifiers($event => (deleteModelStatus(item)), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(close_default))
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))
                : createCommentVNode("", true)
            ])
          ]))
        }), 128))
      ]),
      createBaseVNode("div", _hoisted_5$2, [
        createVNode(_component_el_checkbox, {
          modelValue: checked1.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((checked1).value = $event)),
          label: "动态播放",
          size: "large"
        }, null, 8, ["modelValue"])
      ])
    ])
  ]))
}
}

};
var ModelStatusListModule = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-3b74de9a"]]);

var AdminEditModelModule_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".edit-model{margin-left:.104167rem}.edit-model textarea{background:#2a2e39;color:#fff}.edit-model input{background:rgb(34,37,44);color:#fff}.edit-model input.input-name{text-indent:.0625rem}.edit-model .export-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-model .export-box.export-box{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}.edit-model .export-box #tts-input-text,.edit-model .export-box #tts-inputFileAgent{width:1.666667rem;margin-right:.083333rem;height:.166667rem;border:1px solid #c3c4c7;display:none}.edit-model .export-box .upload-btn{width:.625rem;height:.46875rem;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:#2a2e39;cursor:pointer}.edit-model .export-box .upload-btn a{margin-top:.140625rem;margin-bottom:.026042rem;margin-left:0!important;color:#ffffff4d!important}.edit-model .export-box .upload-btn span{color:#ffffff4d;font-size:.0625rem}.edit-model .export-box .upload-btn .browse{width:.166667rem;height:.166667rem;background:#2a2e39;background-size:100% 100%;border:none;cursor:pointer}.edit-model .export-box .input-file{width:100%;height:100%}.edit-model .edit-scene-item{position:relative}.edit-model .edit-scene-item .edit-label{color:#fff9!important;line-height:.145833rem}.edit-model .edit-scene-item .edit-label span{color:#f77560}.edit-model .edit-scene-item .json-upload{display:inline-block;width:2.083333rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:.145833rem}.edit-model .edit-scene-item .search-box{width:2.020833rem;position:absolute;right:0;top:.166667rem;z-index:100;height:.625rem}.edit-model .edit-scene-item .search-box ul li{width:100%;height:.145833rem;background:#373b48;line-height:.145833rem}.edit-model .edit-scene-item .search-box ul li span{padding-left:.0625rem}.edit-model .edit-scene-item .search-box ul li.li-active,.edit-model .edit-scene-item .search-box ul li:hover{background:#428fff}.edit-model .edit-scene-item .field-name{width:70%;height:.166667rem}.edit-model .edit-scene-item .field-name .el-select__tags .el-tag{background:#333}.edit-model .edit-scene-item .mode-file-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.edit-model .edit-scene-item .mode-file-box .model-file-name{color:#428fff}.edit-model .edit-scene-item .mode-file-box .model-file-name-close{color:#fff;margin-left:.052083rem;padding:0 .052083rem .052083rem}.edit-model .add-confirm-dialog{background:#373b48}.edit-model .add-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.edit-model .add-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.edit-model .add-confirm-dialog .dialog-content p label{display:inline-block;width:.520833rem;height:.166667rem;color:#f77560}.edit-model .add-confirm-dialog .dialog-content p input{width:2.083333rem;height:.145833rem;background:#373b48;font-size:.0625rem;border:1px solid rgba(255,255,255,.14);color:#fff}.edit-model .add-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.edit-model .add-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}.edit-tage{width:2.083333rem}.edit-tage ul{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.edit-tage ul li{border-radius:.010417rem;text-align:center;height:.145833rem;line-height:.145833rem;padding:.010417rem .041667rem;font-size:.0625rem;background:rgba(255,255,255,.04);color:#fff9;margin-right:.041667rem;cursor:pointer}.edit-tage ul li.is-active{background:rgba(66,143,255,.3);color:#428fff}.edit-tage#workmanship ul li{width:auto;padding:.005208rem .03125rem}.edit-tage#workmanship ul li.active{color:#428fff}.edit-scene .edit-scene-box .edit-scene-item .field-name input{width:2.010417rem;border:none;-webkit-box-shadow:none;box-shadow:none}ul{margin:0;padding:0}.field-name{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important;background:#2a2e39}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#428fff}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#428fff}.el-popper__arrow:before{background:#2a2e39!important}input:focus{outline:none}textarea:focus{outline:none}.add-model-upload2 .upload-btn,.upload-demo2 .upload-btn{border:1px solid rgb(66,143,255);color:#428fff;background:transparent;height:.145833rem;line-height:.145833rem;font-size:.0625rem;padding:0 .0625rem;display:inline-block}.field-name.el-select .el-input__inner:focus,.field-name.el-select .el-input.is-focus .el-input__inner{-webkit-box-shadow:none!important;box-shadow:none!important}\n")();

const _sfc_main$1 = {
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
    // eslint-disable-next-line vue/no-unused-components
    addScene,
    UploadFlie: _sfc_main$6,
  },
};

const _hoisted_1$1 = { class: "edit-model" };
const _hoisted_2$1 = { class: "edit-scene-box model-edit" };
const _hoisted_3$1 = { class: "edit-scene-item" };
const _hoisted_4$1 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 模型名称 ")
], -1);
const _hoisted_5$1 = { class: "edit-scene-item" };
const _hoisted_6$1 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 模型文件 ")
], -1);
const _hoisted_7$1 = { class: "mode-file-box" };
const _hoisted_8$1 = { class: "model-file-name" };
const _hoisted_9$1 = { class: "edit-scene-item" };
const _hoisted_10$1 = /*#__PURE__*/createBaseVNode("label", { class: "edit-label" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 模型缩略图 ")
], -1);
const _hoisted_11$1 = { class: "small-img" };
const _hoisted_12$1 = { class: "small-img-box" };
const _hoisted_13$1 = { class: "export-box" };
const _hoisted_14$1 = /*#__PURE__*/createBaseVNode("a", { href: "javascript:;" }, "+", -1);
const _hoisted_15 = /*#__PURE__*/createBaseVNode("span", null, "点击上传", -1);
const _hoisted_16 = [
  _hoisted_14$1,
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

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3$1, [
        _hoisted_4$1,
        withDirectives(createBaseVNode("input", {
          class: "input-name",
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.modelName) = $event)),
          placeholder: "请输入模型名称"
        }, null, 512), [
          [vModelText, _ctx.modelName]
        ])
      ]),
      createBaseVNode("div", _hoisted_5$1, [
        _hoisted_6$1,
        withDirectives(createVNode(_component_UploadFlie, {
          onExportUrl: _ctx.exportUrl,
          class: "add-model-upload add-model-upload2"
        }, null, 8, ["onExportUrl"]), [
          [vShow, _ctx.sceneFileName === '']
        ]),
        withDirectives(createBaseVNode("div", _hoisted_7$1, [
          createBaseVNode("span", _hoisted_8$1, toDisplayString(_ctx.sceneFileName), 1),
          createBaseVNode("span", {
            onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.deleteModelName && _ctx.deleteModelName(...args))),
            class: "model-file-name-close"
          }, "X")
        ], 512), [
          [vShow, _ctx.sceneFileName != '']
        ])
      ]),
      createBaseVNode("div", _hoisted_9$1, [
        _hoisted_10$1,
        createBaseVNode("div", _hoisted_11$1, [
          createBaseVNode("div", _hoisted_12$1, [
            withDirectives(createBaseVNode("div", _hoisted_13$1, [
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
                alt: "",
                style: {"width":"40%","height":"auto"}
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
              style: {"display":"inline-block"},
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
  ]))
}
var AdminEditModelModule = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render]]);

var EditV2_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".model-edit2-container[data-v-f8e99bc0]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.model-edit2-container .buttons2[data-v-f8e99bc0]{position:absolute;top:.104167rem;right:.104167rem;z-index:10;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.model-edit2-container .buttons2 .el-button[data-v-f8e99bc0]{position:relative;font-size:.0625rem;color:#fff9;border:none;background-color:#373b48;border-radius:.083333rem}.model-edit2-container .buttons2 .el-button .icon[data-v-f8e99bc0]{margin-right:.020833rem}.model-edit2-container .title-view[data-v-f8e99bc0]{margin-left:.104167rem;margin-top:.104167rem;margin-bottom:.104167rem;color:#fff}.model-edit2-container .model-edit2-panel-left[data-v-f8e99bc0]{background:#000000!important;width:2.083333rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.model-edit2-container .model-edit2-panel-left .panel-left-up[data-v-f8e99bc0]{overflow-y:auto;background:#2a2e39;width:100%;height:30%;margin-bottom:.010417rem}.model-edit2-container .model-edit2-panel-left .panel-left-down[data-v-f8e99bc0]{background:#2a2e39;width:100%;height:70%}.model-edit2-container .model-edit2-panel-content[data-v-f8e99bc0]{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;z-index:1}.model-edit2-container .model-edit2-panel--right[data-v-f8e99bc0]{width:1.5625rem;height:100%;background:#000000!important;overflow-y:auto;position:relative;z-index:100;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.model-edit2-container .model-edit2-panel--right .panel-right-up[data-v-f8e99bc0]{overflow-y:auto;background:#2a2e39;width:100%;height:40%;margin-bottom:.010417rem}.model-edit2-container .model-edit2-panel--right .panel-right-down[data-v-f8e99bc0]{overflow-y:auto;background:#2a2e39;width:100%;height:60%}\n")();

var EditV2_vue_vue_type_style_index_1_lang = /* #__PURE__ */ (() => ".model-info-tree{color:#fff9;background:transparent;--el-tree-node-hover-bg-color: #353943}\n")();

const _withScopeId = n => (pushScopeId("data-v-f8e99bc0"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "model-edit2-container" };
const _hoisted_2 = { class: "model-edit2-panel-left" };
const _hoisted_3 = { class: "panel-left-up" };
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "title-view" }, "设备大纲视图", -1));
const _hoisted_5 = { class: "panel-left-down" };
const _hoisted_6 = { class: "model-edit2-panel-content" };
const _hoisted_7 = { class: "buttons2" };
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 保存 ");
const _hoisted_9 = /*#__PURE__*/createTextVNode("取消");
const _hoisted_10 = { class: "model-edit2-panel--right" };
const _hoisted_11 = { class: "panel-right-up" };
const _hoisted_12 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "title-view" }, "动作驱动面板", -1));
const _hoisted_13 = { class: "panel-right-down" };
const _hoisted_14 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "title-view" }, "模型状态列表", -1));
const __default__ = defineComponent({
  beforeRouteEnter(to, from, next) {
    UE.publish('JS2UE_SetSpaceType', { spaceType: 'local' });
    next();
  },
});

const _sfc_main = /*#__PURE__*/Object.assign(__default__, {
  __name: 'EditV2',
  setup(__props) {

// eslint-disable-next-line no-unused-vars
const modelStatusList = computed(() => store.state.modelEditV2.modelStatusList);
const userinfo = computed(() => store.state.account);

const router = useRouter();

const defaultProps = {
  children: 'children',
  label: 'nodeId',
};
const showAll = ref(true);
const queryObj = ref({});
const ueData = ref([]);
// const modelId = ref('ee7f4be5-8b80-44e7-93f9-90c001821e91')
const active = ref(true);
const tree = ref('tree');
const handleNodeClick = data => {
  let node = tree.value.getCurrentNode();
  if (node.isRoot) {
    active.value = true;
  } else {
    active.value = false;
  }
  node.modelId = queryObj.value.code;
  console.log(data);
  console.log(data.nodeId);
  store.commit('modelEditV2/setCurrentNode', node);
  //调用UE接口，使当前节点高亮
  let obj = {
    modelId: node.modelId,
    nodeId: node.nodeId,
  };
  UE.publish('JS2UE_SelectHierarchyChild', obj);
};
const saveTotal = () => {
  console.log('保存当前模型下节点的动作创建信息', modelStatusList.value);
  let tmpArr = _.cloneDeep(modelStatusList.value);
  tmpArr.map(item => {
    item.modelId = Number(queryObj.value.id);
    item.modelCode = queryObj.value.code;
    item.modelStateName = item.name;
    item.modelDriveStateId = item.id;
    item.actions.map(childItem => {
      childItem.lowerLimit = childItem.min;
      childItem.modelCode = queryObj.value.code;
      childItem.realTimeValue = childItem.value;
      childItem.upLimit = childItem.max;
      childItem.mechanismDrivenName = childItem.name;
      childItem.modelMemberId = childItem.id;
      return childItem
    });
    item.modelMemberList = item.actions;
    return item
  });
  console.log(tmpArr);
  let data = {
    modelStateList: tmpArr,
  };
  saveModelmemberInfo(data).then(res => {
    console.log(res);
    if (res.code == 1) {
      ElMessage({
        type: 'success',
        message: '保存成功！',
      });
    } else {
      ElMessage({
        type: 'error',
        message: '保存失败',
      });
    }
  });
  //调用模型详情编辑界面的保存事件
  if (active.value) {
    emitter.emit('saveModelUpdate');
  }
};
const cancelTotal = () => {
  router.push({
    path: '/tenant/model/list',
  });
  console.log('取消当前节点的动作修改信息');
};
const addListenUeInterfaces = modelId => {
  // //临时调用
  // UE.publish('CGX_HotFixMessage', {})
  // //临时调用
  UE.publish('MXGL_View', {
    modelId: modelId,
    //id: citem.id,
    UIPos: '400,60',
    UISize: '1220,1020',
  });
  UE.publish('JS2UE_GetModelHierarchy', { modelId });
  UE.subscribe('UE2JS_GetModelHierarchy', obj => {
    // let { data } = obj
    console.log('tree-data::::', obj);
    if (obj) {
      ueData.value = obj;
      // init(ueData.value);
      commonFunction(ueData.value);
    }
  });
};

const commonFunction = resp => {
  let arrary = [];
  resp.entities.isRoot = true;
  arrary.push(resp.entities);
  ueData.value = arrary;
  function formatRoutes(routerArr, modelId) {
    const arr = [];
    let obj = {};
    routerArr.forEach(router => {
      // const tmp = { ...router };
      const tmp = _.cloneDeep(router);
      if (tmp.children) {
        // console.log(tmp,tmp.children)
        //内部调用即递归
        tmp.children = formatRoutes(tmp.children, modelId);
        // const {nodeId, children} = router;
        obj = {
          modelId,
          nodeId: tmp.nodeId,
          children: tmp.children,
        };
      }
      arr.push(obj);
    });
    return arr
  }
  let modifyEntities = formatRoutes(arrary, resp.modelId);
  console.log('sp::::', modifyEntities);
  store.commit('modelEditV2/setCurrentModelEntities', modifyEntities);
};

const Component = computed(() => {
  if (active.value) {
    if (userinfo.value.userinfo.userType == 2) {
      return ModelEditDetailModule
    } else {
      return AdminEditModelModule
    }
  } else {
    return ActionCreationModule
  }
});
const queryModelMemberList = () => {
  let req = {
    modelCode: router.currentRoute.value.query.code,
  };
  getModelmemberInfo(req).then(res => {
    // console.log("res:::",res)
    if (res.code === 1) {
      if (res.data.modelStateList.length > 0) {
        let tmpArr = res.data.modelStateList;
        tmpArr.map(item => {
          // item.modelId=Number(queryObj.value.id);
          item.name = item.modelStateName;
          item.modelMemberList.map(childItem => {
            childItem.min = Number(childItem.lowerLimit);
            childItem.value = Number(childItem.realTimeValue);
            childItem.max = Number(childItem.upLimit);
            childItem.name = childItem.mechanismDrivenName;
            return childItem
          });
          item.actions = item.modelMemberList;
          return item
        });
        // let actions= _.cloneDeep(tmpArr[0].actions);
        // console.log("接口转换后：：：：",actions)
        store.commit('modelEditV2/setCurrentModelActions', tmpArr[0].actions);
        store.commit('modelEditV2/setCurrentModelStatus', tmpArr[0]);
        store.commit('modelEditV2/setModelStatusList', tmpArr);
      } else {
        store.commit('modelEditV2/setCurrentModelActions', []);
        store.commit('modelEditV2/setCurrentModelStatus', []);
        let arr = [
          //模型状态列表
          { name: 'default', actions: [] },
        ];
        store.commit('modelEditV2/setModelStatusList', arr);
      }
    }
  });
};
onMounted(async () => {
  // console.log('router:', router.currentRoute.value.query)
  let query = router.currentRoute.value.query;
  queryObj.value = query;
  addListenUeInterfaces(query.code);
  // console.log("userinfo::",userinfo.value.userinfo.userType)
  // cookMockData()
  queryModelMemberList();
});

onBeforeRouteLeave((to, from, next) => {
  //状态清空
  store.commit('modelEditV2/setCurrentModelActions', []);
  store.commit('modelEditV2/setCurrentModelStatus', undefined);
  store.commit('modelEditV2/setModelStatusList', []);
  UE.publish('JS2UE_SetSpaceType', { spaceType: 'world' });
  UE.publish('MXGL_ViewQuit', {});
  UE.publish('DestroyAll', {});
  next();
});
// watch(tree, () => {
//   console.log(tree.value.getCurrentNode())
// })

return (_ctx, _cache) => {
  const _component_el_tree = resolveComponent("el-tree");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        _hoisted_4,
        createVNode(_component_el_tree, {
          ref_key: "tree",
          ref: tree,
          class: "model-info-tree",
          "default-expand-all": showAll.value,
          data: ueData.value,
          props: defaultProps,
          onNodeClick: handleNodeClick
        }, null, 8, ["default-expand-all", "data"])
      ]),
      createBaseVNode("div", _hoisted_5, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(Component))))
      ])
    ]),
    createBaseVNode("div", _hoisted_6, [
      createBaseVNode("div", _hoisted_7, [
        createVNode(_component_el_button, { onClick: saveTotal }, {
          default: withCtx(() => [
            createVNode(_component_svg_icon, { name: "drafts-main-save" }),
            _hoisted_8
          ]),
          _: 1
        }),
        createVNode(_component_el_button, { onClick: cancelTotal }, {
          default: withCtx(() => [
            _hoisted_9
          ]),
          _: 1
        })
      ])
    ]),
    createBaseVNode("div", _hoisted_10, [
      createBaseVNode("div", _hoisted_11, [
        _hoisted_12,
        createVNode(DriverPanelModule)
      ]),
      createBaseVNode("div", _hoisted_13, [
        _hoisted_14,
        createVNode(ModelStatusListModule)
      ])
    ])
  ]))
}
}

});
var EditV2 = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-f8e99bc0"]]);

export { EditV2 as default };
