import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, O as toDisplayString, a as createVNode, L as Fragment, M as renderList, N as createTextVNode, G as createCommentVNode, I as withDirectives, an as vModelText, Y as normalizeClass, w as withCtx, $ as getCurrentInstance, x as ElMessage } from './element-plus.da98f360.js';
import { _ as _export_sfc, c as store, u as useRouter } from './index.acc4a696.js';
import { a as getUsedField, u as updateField, c as createField } from './field.879e735d.js';
import './monaco-editor.e9574fd0.js';

var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAD1BMVEVHcEz///////////////8T4DEaAAAABXRSTlMAHHwMmaApG04AAABTSURBVHgBzY/RCcAwCEQL2aAblHaA4gjuP1R7FxD1FvA+JDxeEu+YlPPFXFeA58Y0D2D+K2tjhmfSpGSBShGgFAFKFRT0K/Jo/1YWk9WlnNQfkA8glAxbaxa81wAAAABJRU5ErkJggg==";

var _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAD1BMVEVHcEz///////////////8T4DEaAAAABXRSTlMAIXSQIi08xZgAAAA0SURBVHgBxdCxCQAgEEPRRBwgI4hu4P7DqWARSK+/OHjdEWSUobS3YN+Nea5QHV/eyUFuC1LdBXZok6jjAAAAAElFTkSuQmCC";

var addField_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".add-field{width:100%;height:100vh;background:#2a2e39}.add-field .add-field-title{color:#fff;font-size:.083333rem;padding:.104167rem 0 0 .104167rem}.add-field .add-field-box{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.add-field .add-field-box .field-item{width:3.125rem;margin-top:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.add-field .add-field-box .field-item .tag-attr{width:.520833rem;margin-right:.083333rem;margin-top:.052083rem;display:-webkit-box;display:-ms-flexbox;display:flex;height:.145833rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid rgba(255,255,255,.14)}.add-field .add-field-box .field-item .tag-attr span{display:inline-block;width:10%;height:100%;color:#f77560;line-height:.145833rem;margin-left:.026042rem}.add-field .add-field-box .field-item .tag-attr input{width:90%;padding:0;text-align:left;border:none}.add-field .add-field-box .field-item label{display:inline-block;width:.520833rem;text-align:right;margin-right:.083333rem;color:#fff9;line-height:.145833rem;margin-top:.052083rem}.add-field .add-field-box .field-item label.field-title{margin-top:0;color:#f77560}.add-field .add-field-box .field-item label span{color:#f77560;font-size:.0625rem}.add-field .add-field-box .field-item input{width:2.083333rem;height:.145833rem;background:#2a2e39;color:#fff;border:1px solid rgba(255,255,255,.14)}.add-field .add-field-box .field-item .tag-box ul{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0;margin:0;-ms-flex-wrap:wrap;flex-wrap:wrap}.add-field .add-field-box .field-item .tag-box ul li{height:.145833rem;display:inline-block;margin-top:.052083rem;color:#fff9;font-size:.0625rem;border-radius:.010417rem;text-align:center;line-height:.145833rem;background:rgba(255,255,255,.05);border-radius:.020833rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 .0625rem;margin-right:.041667rem}.add-field .add-field-box .field-item .tag-box ul li span{display:inline-block;max-width:.416667rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.add-field .add-field-box .field-item .tag-box ul li.is-active{background:gray}.add-field .add-field-box .field-item .tag-box ul li img{width:.083333rem;height:.083333rem;margin-top:.010417rem;margin-left:.010417rem}.add-field .add-field-box .field-item .tag-box ul li.delete-tag{border:1px solid #428fff;color:#428fff;margin-left:.036458rem}.add-field .add-field-box .field-item .add-field-box-input{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.add-field .add-field-box .field-item .add-field-box-input .tag-input{height:.145833rem}.add-field .add-field-box .field-item .add-field-box-input .add-label-btn{display:inline-block;width:.427083rem;height:.145833rem;background:#428fff;color:#fff;font-size:.0625rem;border-radius:.010417rem;text-align:center;line-height:.145833rem}.add-field .add-field-box .field-item .small-img .small-img-box img{width:.625rem;height:.46875rem}.add-field .add-field-box .field-item .small-img .small-img-box a{color:#428fff;margin-left:.052083rem}.add-field .add-field-box .field-item .small-img p{margin-top:.052083rem;color:#ffffff4d}.add-field .add-field-box .field-item .upload-file{color:#428fff}.add-field .edit-dobtn{width:100%;text-align:center}.add-field .edit-dobtn.source-scene{position:absolute;bottom:.416667rem}.add-field .edit-dobtn.source-model{margin-top:.104167rem}.add-field .edit-dobtn .edit-btn-box{display:inline-block}.add-field .edit-dobtn .edit-btn-box .edit-save{width:.427083rem;height:.166667rem;padding:0}.add-field .edit-dobtn .edit-btn-box .edit-cancel{width:.427083rem;height:.166667rem;padding:0;background:#2a2e39;border:1px solid rgba(255,255,255,.6)}.add-field .add-confirm-dialog{background:#373b48}.add-field .add-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.add-field .add-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.add-field .add-confirm-dialog .dialog-content p{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;margin-top:.104167rem}.add-field .add-confirm-dialog .dialog-content p label{display:inline-block;width:.625rem;height:.166667rem;color:#f77560;text-align:right;margin-right:.041667rem;line-height:.166667rem}.add-field .add-confirm-dialog .dialog-content p input,.add-field .add-confirm-dialog .dialog-content p textarea{width:2.083333rem;height:.145833rem;background:#373b48;font-size:.0625rem;border:1px solid rgba(255,255,255,.14);color:#fff}.add-field .add-confirm-dialog .dialog-content p input.tag-label,.add-field .add-confirm-dialog .dialog-content p textarea.tag-label{height:.442708rem;padding-top:.041667rem}.add-field .add-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.add-field .add-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48;height:.166667rem}.add-field .edit-confirm-dialog{background:#373b48}.add-field .edit-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.add-field .edit-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.add-field .edit-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.add-field .edit-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.add-field .edit-confirm-dialog .dialog-content .confirm-tag{margin-top:.114583rem}.add-field .edit-confirm-dialog .dialog-content .confirm-tag span.el-radio__label{color:#fff;font-size:.0625rem}.add-field .edit-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.add-field .edit-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.add-field .edit-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48}ul li{list-style:none}input:focus{outline:none}textarea:focus{outline:none}\n")();

const { userinfo } = store.state.account;

const _sfc_main = {
  setup(props, { emit }) {
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance();
    let router = useRouter();
    let state = reactive({
      userType: userinfo.userType,
      dialogVisible: false,
      tagName: '',
      tagValue: '',
      addTagsText: '',
      labelDialog: false,
      fieldName: '',
      // attributes: []
      attributes: [
        // {
        //   attributesName: '232321',
        //   subattributes: [
        //     {
        //       subattributeName: '32123',
        //     },
        //     {
        //       subattributeName: '32123',
        //     },
        //     {
        //       subattributeName: '32123',
        //     },
        //     {
        //       subattributeName: '32123',
        //     },
        //   ],
        // },
      ],
      selectLabel: {},
      selectIndex: 0,
      source: 'add',
      editId: 0,
    });
    onMounted(() => {
      state.source = router.currentRoute.value.query.source;
      var fieldData = JSON.parse(localStorage.getItem('field'));
      if (state.source === 'edit') {
        state.editId = fieldData.id;
        proxy.getUsedField(fieldData.id, fieldData);
      }
    });
    const methods = {
      async getUsedField(fieldId, fieldData) {
        let data = await getUsedField({ fieldId });
        if (data.code === 1) {
          fieldData.attributes.map((item, index) => {
            item.isHaveField = false;
            data.data.attributeIds.map((attr, attrIndex) => {
              if (+item.id === +attr) {
                item.isHaveField = true;
              }
            });
            item.subattributes.map((sub, subIndex) => {
              sub.isHaveLabel = false;
              data.data.subattributeIds.map((val, valIndex) => {
                if (sub.id === val) {
                  sub.isHaveLabel = true;
                }
              });
            });
          });
          state.fieldName = fieldData.fieldName;
          state.attributes = fieldData.attributes;
        }
      },
      addFieldBtnClick() {
        if (state.fieldName === '') {
          ElMessage.error('请输入领域名称');
          return
        }
        state.dialogVisible = true;
      },
      addTagClick() {
        var tagName = state.tagName;
        var flag = state.attributes.find(item => {
          return item.attributesName === tagName
        });
        if (flag) {
          ElMessage.error('属性名称重复');
          return
        }
        var arr = state.tagValue.split('\n');
        if (state.tagValue.length <= 0) {
          ElMessage.error('请输入属性选项值');
          return
        }
        if (tagName.length <= 0) {
          ElMessage.error('请输入属性名称');
          return
        }
        var subattributes = [];
        arr.map(val => {
          subattributes.push({
            subattributeName: val,
          });
        });
        state.attributes.push({
          attributesName: tagName,
          subattributes: subattributes,
        });
        // state.attributes = attributes

        state.dialogVisible = false;
        state.tagName = '';
        state.tagValue = '';
        ElMessage.success('添加成功');
      },
      deleteTag(item, index, val, valIndex) {
        state.attributes.map((data, dataIndex) => {
          if (dataIndex === index) {
            item.subattributes.map((value, valueIndex) => {
              if (valueIndex === valIndex) {
                item.subattributes.splice(valueIndex, 1);
              }
            });
          }
        });
      },
      deleteItem(item, index, val, valIndex) {
        if (item.isHaveField) {
          ElMessage.warning('标签模型在使用，无法操作~');
          return
        }
        state.attributes.map((data, dataIndex) => {
          if (dataIndex === index) {
            // item.subattributes = []
            state.attributes.splice(index, 1);
          }
        });
      },
      addTagLabel(item, index) {
        state.selectLabel = item;
        state.selectIndex = index;
        state.labelDialog = true;
      },
      addLabelClick() {
        if (state.addTagsText === '') {
          ElMessage.error('请先输入标签名称');
          return
        }
        var flag = state.selectLabel.subattributes.find(item => {
          return item.subattributeName === state.addTagsText
        });
        if (flag) {
          ElMessage.error('属性名称重复');
          return
        }
        state.attributes.map((data, dataIndex) => {
          if (dataIndex === state.selectIndex) {
            data.subattributes.push({
              subattributeName: state.addTagsText,
              isHaveLabel: false,
            });
          }
        });
        ElMessage.success('添加成功');
        state.labelDialog = false;
        state.addTagsText = '';
      },
      saveBtn() {
        if (state.fieldName === '') {
          ElMessage.error('请输入领域名称');
          return
        }
        var fieldUpdateVO = {
          fieldName: state.fieldName,
          attributes: state.attributes,
        };
        if (state.source === 'add') {
          proxy.createField(fieldUpdateVO);
        } else {
          fieldUpdateVO.id = state.editId;
          proxy.updateField(fieldUpdateVO);
        }
      },
      async updateField(fieldUpdateVO) {
        let data = await updateField(fieldUpdateVO);
        if (data.code === 1) {
          ElMessage({
            message: '编辑成功',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'fieldList',
                query: {},
              });
            },
          });
        } else {
          ElMessage.error(data.msg);
        }
      },
      async createField(fieldUpdateVO) {
        let data = await createField(fieldUpdateVO);
        if (data.code === 1) {
          ElMessage({
            message: '提交成功',
            type: 'success',
            onClose: () => {
              router.push({
                name: 'fieldList',
                query: {},
              });
            },
          });
        } else {
          ElMessage.error(data.msg);
        }
      },
      liClick(val) {
        if (val.isHaveLabel) {
          ElMessage.warning('标签模型在使用，无法操作~');
        }
      },
      cancelClick() {
        router.push({
          name: 'fieldList',
        });
      },
      closeDialog() {
        state.dialogVisible = false;
        state.tagValue = '';
        state.tagName = '';
      },
      closeLabel() {
        state.labelDialog = false;
        state.addTagsText = '';
      },
    };
    return {
      ...toRefs(state),
      ...methods,
    }
  },
  props: {},
  unmounted() {},
};


const _hoisted_1 = { class: "add-field" };
const _hoisted_2 = { class: "add-field-title" };
const _hoisted_3 = { class: "add-field-box" };
const _hoisted_4 = { class: "field-item" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("label", { class: "field-title" }, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 领域名称 ")
], -1);
const _hoisted_6 = { class: "add-field-box-input" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = /*#__PURE__*/createBaseVNode("span", null, "*", -1);
const _hoisted_9 = {
  key: 1,
  class: "tag-attr"
};
const _hoisted_10 = /*#__PURE__*/createBaseVNode("span", null, "*", -1);
const _hoisted_11 = ["onUpdate:modelValue"];
const _hoisted_12 = { class: "tag-box" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["onClick"];
const _hoisted_16 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_1,
  alt: ""
}, null, -1);
const _hoisted_17 = [
  _hoisted_16
];
const _hoisted_18 = ["onClick"];
const _hoisted_19 = { class: "edit-btn-box" };
const _hoisted_20 = /*#__PURE__*/createTextVNode("取消");
const _hoisted_21 = { class: "dialog-content" };
const _hoisted_22 = /*#__PURE__*/createBaseVNode("label", null, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 属性名称 ")
], -1);
const _hoisted_23 = /*#__PURE__*/createBaseVNode("label", null, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 输入选项值 ")
], -1);
const _hoisted_24 = { class: "dialog-footer" };
const _hoisted_25 = /*#__PURE__*/createTextVNode(" 创建 ");
const _hoisted_26 = /*#__PURE__*/createTextVNode(" 取消 ");
const _hoisted_27 = { class: "dialog-content" };
const _hoisted_28 = /*#__PURE__*/createBaseVNode("label", null, [
  /*#__PURE__*/createBaseVNode("span", null, "*"),
  /*#__PURE__*/createTextVNode(" 标签名称 ")
], -1);
const _hoisted_29 = { class: "dialog-footer" };
const _hoisted_30 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_31 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("span", null, toDisplayString(_ctx.source === 'add' ? '添加领域' : '编辑领域'), 1)
    ]),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        _hoisted_5,
        createBaseVNode("div", _hoisted_6, [
          createVNode(_component_el_input, {
            class: "tag-input",
            modelValue: _ctx.fieldName,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.fieldName) = $event))
          }, null, 8, ["modelValue"]),
          createBaseVNode("span", {
            class: "add-label-btn",
            onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.addFieldBtnClick && _ctx.addFieldBtnClick(...args)))
          }, "添加属性")
        ])
      ]),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.attributes, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          class: "field-item",
          key: index
        }, [
          (_ctx.source === 'add')
            ? (openBlock(), createElementBlock("label", _hoisted_7, [
                _hoisted_8,
                createTextVNode(" " + toDisplayString(item.attributesName), 1)
              ]))
            : createCommentVNode("", true),
          (_ctx.source === 'edit')
            ? (openBlock(), createElementBlock("div", _hoisted_9, [
                _hoisted_10,
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": $event => ((item.attributesName) = $event)
                }, null, 8, _hoisted_11), [
                  [vModelText, item.attributesName]
                ])
              ]))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("ul", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.subattributes, (val, valIndex) => {
                return (openBlock(), createElementBlock("li", {
                  onClick: $event => (_ctx.liClick(val)),
                  class: normalizeClass({ 'is-active': val.isHaveLabel }),
                  key: valIndex
                }, [
                  createBaseVNode("span", null, toDisplayString(val.subattributeName), 1),
                  (!val.isHaveLabel)
                    ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        src: _imports_0,
                        onClick: $event => (_ctx.deleteTag(item, index, val, valIndex)),
                        alt: ""
                      }, null, 8, _hoisted_14))
                    : createCommentVNode("", true)
                ], 10, _hoisted_13))
              }), 128)),
              createBaseVNode("li", {
                onClick: $event => (_ctx.addTagLabel(item, index))
              }, _hoisted_17, 8, _hoisted_15),
              (!item.isHaveField)
                ? (openBlock(), createElementBlock("li", {
                    key: 0,
                    class: "delete-tag",
                    onClick: $event => (_ctx.deleteItem(item, index, _ctx.val, _ctx.valIndex))
                  }, " 删除 ", 8, _hoisted_18))
                : createCommentVNode("", true)
            ])
          ])
        ]))
      }), 128))
    ]),
    createBaseVNode("div", {
      class: normalizeClass(["edit-dobtn", [_ctx.source === 'model' ? 'source-model' : 'source-scene']])
    }, [
      createBaseVNode("div", _hoisted_19, [
        createVNode(_component_el_button, {
          class: "edit-save",
          onClick: _ctx.saveBtn,
          type: "primary"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.source === 'add' ? '创建' : '保存'), 1)
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          class: "edit-cancel",
          onClick: _ctx.cancelClick
        }, {
          default: withCtx(() => [
            _hoisted_20
          ]),
          _: 1
        }, 8, ["onClick"])
      ])
    ], 2),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.dialogVisible) = $event)),
      title: "添加属性",
      width: "640px",
      "custom-class": "add-confirm-dialog",
      "before-close": _ctx.closeDialog
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_24, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.addTagClick
          }, {
            default: withCtx(() => [
              _hoisted_25
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _ctx.closeDialog
          }, {
            default: withCtx(() => [
              _hoisted_26
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_21, [
          createBaseVNode("p", null, [
            _hoisted_22,
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.tagName) = $event)),
              placeholder: "请输入属性名称",
              type: "text"
            }, null, 512), [
              [vModelText, _ctx.tagName]
            ])
          ]),
          createBaseVNode("p", null, [
            _hoisted_23,
            withDirectives(createBaseVNode("textarea", {
              class: "tag-label",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.tagValue) = $event)),
              placeholder: "请输入选项值，每行表示一个选项",
              type: "text"
            }, null, 512), [
              [vModelText, _ctx.tagValue]
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.labelDialog,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.labelDialog) = $event)),
      title: "新增标签",
      width: "640px",
      "custom-class": "add-confirm-dialog",
      "before-close": _ctx.closeLabel
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_29, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.addLabelClick
          }, {
            default: withCtx(() => [
              _hoisted_30
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _ctx.closeLabel
          }, {
            default: withCtx(() => [
              _hoisted_31
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_27, [
          createBaseVNode("p", null, [
            _hoisted_28,
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.addTagsText) = $event)),
              placeholder: "请输入标签名称",
              type: "text"
            }, null, 512), [
              [vModelText, _ctx.addTagsText]
            ])
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var addField = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { addField as default };
