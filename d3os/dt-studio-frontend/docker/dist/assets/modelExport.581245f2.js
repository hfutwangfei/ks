import { l as ref, j as reactive, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, a as createVNode, w as withCtx, C as createBaseVNode, O as toDisplayString, G as createCommentVNode, I as withDirectives, an as vModelText, J as normalizeStyle, a4 as withModifiers, L as Fragment, M as renderList, Y as normalizeClass, a0 as vShow, ar as vModelCheckbox, x as ElMessage, N as createTextVNode, $ as getCurrentInstance } from './element-plus.da98f360.js';
import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { _ as _sfc_main$1 } from './UploadFlie.ee92a521.js';
import { a as getChunkId, u as uploadCommonFile } from './sceneList.b22bf172.js';
import { a as getAllFieldList, f as batchCreateModel } from './modelScene.42824c77.js';
import { _ as _imports_0 } from './icon-close.e91a2d7c.js';
import './monaco-editor.e9574fd0.js';
import './spark-md5.2cc5764b.js';

var modelExport_vue_vue_type_style_index_0_scope_true_lang = /* #__PURE__ */ (() => ".batch-export-model{background:#2a2e39;width:100%;height:100vh;overflow:hidden}.batch-export-model h1{color:#fff;font-size:.083333rem;margin-left:.104167rem;margin-top:.104167rem}.batch-export-model .batch-export-table{width:100%;background:#2a2e39;padding:0 .104167rem}.batch-export-model .batch-export-table .el-table__row{background:#2a2e39}.batch-export-model .batch-export-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff}.batch-export-model .batch-export-table .table-input{position:relative}.batch-export-model .batch-export-table .table-input.model-name-box input{border:none}.batch-export-model .batch-export-table .table-input.delete-siggle{color:#428fff}.batch-export-model .batch-export-table .table-input input{width:80%;color:#fff;background:#2a2e39;height:.130208rem;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.batch-export-model .batch-export-table .table-input .field-btn{width:80%;height:.130208rem;line-height:.145833rem;display:inline-block;background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.batch-export-model .batch-export-table .cascader .el-input .el-input__inner{background:#2a2e39;border:1px solid rgba(255,255,255,.14)}.batch-export-model .batch-export-table:before{height:0;border:none}.batch-export-model .batch-export-table .hover-row{background:#000}.batch-export-model .batch-export-table .el-table__header-wrapper .el-table__header thead tr{background:#2a2e39}.batch-export-model .batch-export-table th{background:#2a2e39;border-bottom-color:#ffffff0a}.batch-export-model .img-url{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.batch-export-model .img-url .upload-demo{width:100%}.batch-export-model .img-url .upload-demo .el-upload{width:100%;text-align:left;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.batch-export-model .img-url span{display:inline-block;max-width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.batch-export-model .img-url span.upload-btn{width:100%;color:#428fff}.batch-export-model .img-url span.upload-json{color:#428fff}.batch-export-model .img-url img{width:.083333rem;height:.083333rem;cursor:pointer}.batch-export-model .scene-select{width:100%;background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}.batch-export-model .scene-select input{background:#2a2e39;border:none}.batch-export-model .scene-select .el-select__tags .el-tag{background:#333}.batch-export-model .do-box{width:100%;margin-top:.104167rem;color:#fff9;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.batch-export-model .do-box span{margin-left:.104167rem}.batch-export-model .do-box .btn-box{margin-right:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex}.batch-export-model .do-box .btn-box .upload-demo .el-icon{display:none}.batch-export-model .do-box .btn-box span{display:inline-block;color:#fff;font-size:.072917rem;border-radius:.020833rem;width:.427083rem;height:.166667rem;line-height:.166667rem;text-align:center;cursor:pointer}.batch-export-model .do-box .btn-box span.export{background:#428fff}.batch-export-model .do-box .btn-box span.submit{border:1px solid #428fff;color:#428fff}.batch-export-model .do-box .btn-box span.back{color:#fff9;border:1px solid rgba(255,255,255,.6)}.field-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.field-box ul{padding-left:0;width:1.041667rem}.field-box ul li{width:100%;height:.15625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;font-size:.0625rem;text-align:left}.field-box ul li.active{background:rgba(34,37,44,.5)}.field-box ul li .tree-word{display:inline-block;width:.833333rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.field-box ul li .select-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.field-box ul li .select-box input{margin-right:.026042rem}.edit-confirm-dialog{background:#373b48}.edit-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.edit-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.edit-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.edit-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.edit-confirm-dialog .dialog-content .confirm-tag{margin-top:.114583rem}.edit-confirm-dialog .dialog-content .confirm-tag span.el-radio__label{color:#fff;font-size:.0625rem}.edit-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.edit-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.edit-confirm-dialog .dialog-footer .dialog-footer-cancel{border:1px solid rgba(255,255,255,.6);background:#373b48;height:.166667rem}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important;background:#2a2e39}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#212e3e!important}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#000}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#000}.cascader-float .el-cascader-panel{background:#212e3e!important}input:focus{outline:none}ul li{list-style:none}.el-table__inner-wrapper:before{background:rgba(255,255,255,.04)}.el-table .el-table__header th.el-table__cell.is-leaf,.el-table .el-table__header td.el-table__cell{border-color:#ffffff0a;background:rgba(255,255,255,.05)}.mode-upload .upload-btn{padding:0}\n")();

const _sfc_main = {
  setup() {
    let router = useRouter();
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance();
    // eslint-disable-next-line no-unused-vars
    ref();
    // eslint-disable-next-line no-unused-vars
    ref();
    let state = reactive({
      value: '',
      fieldValue: '',
      imgData: [],
      fileData: [],
      visible: false,
      selectTwoData: {},
      selectLastData: {},
      popWidth: 200,
      dialogVisible: false,
      radio: 0,
      uploadData: [],
      // uploadData: [
      //   {
      //     modelFile:
      //       'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/36c0098383fece9109f98b1ec1ce59eb.FBX',
      //     modelSourceFile: '111',
      //     name: '111',
      //     state: 0,
      //     objectModel: '',
      //     isShow: false,
      //     fieldDTO: {},
      //     thumbnail:
      //       'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/a75b1343-9858-490c-bcb4-e82509cb9e9b.png',
      //   },
      //   {
      //     modelFile:
      //       'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/36c0098383fece9109f98b1ec1ce59eb.FBX',
      //     modelSourceFile: '111',
      //     name: '111',
      //     state: 0,
      //     objectModel: '',
      //     isShow: false,
      //     fieldDTO: {},
      //     thumbnail:
      //       'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/a75b1343-9858-490c-bcb4-e82509cb9e9b.png',
      //   },
      // ],
      uploadIndex: 0,
      jsonIndex: 0,
      fieldData: [],
      chunkId: 0,
    });
    const methods = {
      openField(scope) {
        state.uploadData[scope.$index].isShow = !state.uploadData[scope.$index]
          .isShow;
        console.log(scope.row, 222);
        var fieldDTO = scope.row.fieldDTO;
        if (fieldDTO.attributes && fieldDTO.attributes.length > 0) {
          state.fieldData.map((fieldOne, fieldOneIndex) => {
            console.log(fieldOne, 'fieldOne');
            if (fieldOne.id === fieldDTO.id) {
              fieldOne.selectOne = true;
              fieldOne.selectOneAvtive = true;
              state.popWidth = 600;
              state.selectTwoData = fieldOne;
              fieldOne.attributes.map(fieldOneItem => {
                fieldDTO.attributes.map((item, index) => {
                  if (item.id === fieldOneItem.id) {
                    fieldOneItem.selectTwo = true;
                    state.selectLastData = fieldOneItem;
                    fieldOneItem.subattributes.map(fieldTowItem => {
                      item.subattributes.map(val => {
                        if (val.id === fieldTowItem.id) {
                          fieldTowItem.selectTree = true;
                        }
                      });
                    });
                  }
                });
              });
            }
          });
        }
        // state.fieldData
        // scope.row.isShow = !scope.row.isShow
      },
      // 选择一级
      selectOne(item, index) {
        state.selectTwoData = {};
        state.selectLastData = {};
        state.fieldData.map((data, dataIndex) => {
          if (index === dataIndex) {
            data.selectOne = true;
          } else {
            data.selectOne = false;
          }
        });
        state.selectTwoData = item;
        state.popWidth = 400;
        console.log(state.selectTwoData, 8888);
      },
      // 选择二级
      selectTwo(item, index) {
        state.selectTwoData.attributes.map((data, dataIndex) => {
          if (index === dataIndex) {
            data.selectTwoActive = true;
          } else {
            data.selectTwoActive = false;
          }
        });
        state.selectLastData = item;
        console.log(state.selectLastData, 777);
        state.popWidth = 600;
      },
      // 选择三级
      selectTwoChange(item, index) {
        state.selectTwoData.attributes.map((data, dataIndex) => {
          if (index === dataIndex) {
            data.selectTwoActive = true;
            if (data.selectTwo) {
              data.subattributes.map(val => {
                val.selectTree = true;
              });
            } else {
              data.subattributes.map(val => {
                val.selectTree = false;
              });
            }
          }
        });
      },
      selctThreeChange(item, index) {
        var filterData = state.selectLastData.subattributes.filter(data => {
          return data.selectTree
        });
        console.log(filterData, 'filterData');
        state.selectTwoData.attributes.map((data, dataIndex) => {
          if (data.id === state.selectLastData.id) {
            console.log(data, 4444);
            // if (data.subattributes.length === filterData.length) {
            //   data.selectTwo = true
            // } else {
            //   data.selectTwo = false
            // }
            if (filterData.length > 0) {
              data.selectTwo = true;
            } else {
              data.selectTwo = false;
            }
          }
        });
      },
      selectTreeClick(item, index) {
        // console.log(item, 'dddddd')
        state.selectLastData.subattributes.map((data, dataIndex) => {
          if (index === dataIndex) {
            data.selectTreeActive = true;
          } else {
            data.selectTreeActive = false;
          }
        });
      },
      hidePop(scope) {
        // uploadData
        var obj = {};
        var fieldData = state.fieldData.filter(item => {
          return item.selectOne
        })[0];
        if (!fieldData) {
          return
        }
        console.log(fieldData, 'fieldData');
        obj.id = fieldData.id;
        obj.code = fieldData.code;
        obj.fieldName = fieldData.fieldName;
        obj.attributes = fieldData.attributes.filter(item => {
          return item.selectTwo
        });
        console.log(obj.attributes, 'obj.attributes');
        obj.attributes.map((item, index) => {
          item.subattributes = item.subattributes.filter(val => {
            return val.selectTree
          });
        });
        state.uploadData[scope.$index].fieldDTO = obj;
        state.selectTwoData = {};
        state.selectLastData = {};
        console.log(fieldData, obj, 'fieldData');
        state.popWidth = 200;
        proxy.getAllFieldList();
      },
      exportClick() {
        document.getElementById('file').click();
      },
      onFileAdded(e) {
        console.log(e);
      },
      exportUrl(data) {
        console.log(data, 555555);
        state.fileData.push(data);
      },
      getImg(data) {
        console.log(data, 'img');
        state.imgData.push(data);
      },
      uploadSuccess() {
        var arr = [];
        console.log(state.fileData, 2223333);
        var saveData = state.uploadData;
        state.imgData.map(item => {
          state.fileData.map(val => {
            item.thumbnail = item.imgName.split('.')[0];
            if (item.imgName === val.initName) {
              console.log(item, val, 888);
              arr.push({
                // brandId: '',
                brandName: '',
                objectModel: '',
                specifications: '',
                modelFile: val.fileValue + val.uuIDKey + '.' + val.format,
                modelSourceFile: val.fileName + '.' + val.format,
                name: item.imgName,
                thumbnail: item.downloadUrl,
                state: 0,
                fieldDTO: {},
              });
            }
          });
        });
        var resetArr = proxy.deWeight(arr);
        saveData.map(item => {
          resetArr.map(val => {
            if (item.modelSourceFile === val.modelSourceFile) {
              val.fieldDTO = item.fieldDTO;
              val.brandName = item.brandName;
              val.specifications = item.specifications;
              val.name = item.name;
            }
          });
        });
        state.uploadData = resetArr;
        console.log(state.uploadData, 2224444);
      },
      async getAllFieldList() {
        let data = await getAllFieldList();
        if (data.code === 1) {
          data.data.map(item => {
            item.selectOne = false;
            item.selectOneAvtive = false;
            if (item.hasOwnProperty('attributes')) {
              item.attributes.map(attr => {
                attr.selectTwo = false;
                attr.selectTwoActive = false;
                attr.subattributes.map(val => {
                  val.selectTree = false;
                  val.selectTreeActive = false;
                });
              });
            }
          });
          state.fieldData = data.data;
        }
      },
      deleteScene(scope) {
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            state.uploadData.splice(index, 1);
          }
        });
        state.fileData.map((item, index) => {
          if (item.fileName === scope.row.name) {
            state.fileData.splice(index, 1);
          }
        });
        state.imgData.map((item, index) => {
          if (item.imgName === scope.row.name) {
            state.imgData.splice(index, 1);
          }
        });
      },
      deleteImgUrl(scope) {
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            item.thumbnail = '';
          }
        });
      },
      deleteObjectUrl(scope) {
        state.uploadData.map((item, index) => {
          if (index === scope.$index) {
            item.objectModel = '';
          }
        });
      },
      async getChunkId() {
        let data = await getChunkId();
        console.log(data, 'data');
        if (data.code === 1) {
          state.chunkId = data.data;
        }
      },
      sublitClick() {
        // proxy.getChunkId()
        state.dialogVisible = true;
      },
      changeName(sceneFileName) {
        var date = new Date();
        var str =
          '' +
          date.getFullYear() +
          (date.getMonth() + 1) +
          date.getDate() +
          date.getMinutes() +
          proxy.produceNum(10000, 10000000000);
        var sceneFileNameArr = sceneFileName.split('.');
        var sceneFile =
          sceneFileNameArr[0] + '-' + str + '.' + sceneFileNameArr[1];
        return sceneFile
      },
      // 上传确认
      async enterSubmit() {
        var params = state.uploadData;
        params.map(item => {
          item.state = state.radio;
        });
        console.log(params, 'params');
        if (params.length <= 0) {
          ElMessage.error('请上传文件');
          return
        }
        var isHaveField = params.every(item => {
          return item.fieldDTO.fieldName != undefined
        });
        console.log(isHaveField);
        if (!isHaveField) {
          ElMessage.error('请选择领域');
          return
        }
        // params.map(item => {
        //   item.modelSourceFile = proxy.changeName(item.modelSourceFile)
        // })
        console.log(params, 'isHaveField');
        // var isHaveScenesName = params.find(item => {
        //   return item.name !== ''
        // })
        // if (!isHaveScenesName) {
        //   ElMessage.error('请模型文件')
        //   return
        // }
        // console.log(isHaveScenesName)
        let data = await batchCreateModel(params);
        console.log(data, 222);
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
          ElMessage.error(data.msg);
        }
      },
      produceNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
      },
      backClick() {
        router.push({
          name: 'modelIndex',
          query: {
            from: 'mxlb',
          },
        });
      },
      async selectImg(file) {
        console.log(file, 2222);
        if (!file.hasOwnProperty('uid')) {
          return
        }
        var files = file.raw;
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          console.log(data, 6666);
          ElMessage.success('上传成功');
          state.uploadData.map((item, index) => {
            if (index === state.uploadIndex) {
              item.thumbnail = data.data.downloadUrl;
            }
          });
        } else {
          ElMessage.success(data.msg);
        }
      },
      // 上传物理型文件
      async selectObjectModel(file) {
        if (!file.hasOwnProperty('uid')) {
          return
        }
        var files = file.raw;
        let formData = new FormData();
        formData.append('file', files);
        let data = await uploadCommonFile(formData);
        if (data.code === 1) {
          console.log(data, 6666);
          ElMessage.success('上传成功');
          state.uploadData.map((item, index) => {
            if (index === state.jsonIndex) {
              console.log(item.objectModel, data.data.downloadUrl);
              item.objectModel = data.data.downloadUrl;
              // item.objectModel = 123455
            }
          });
          console.log(state.uploadData, 'state.uploadData');
        } else {
          ElMessage.success(data.msg);
        }
      },
      uploadClick(scope) {
        // console.log(scope)
        state.uploadIndex = scope.$index;
      },
      uploadClickJson(scope) {
        state.jsonIndex = scope.$index;
      },
      deWeight(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].name == arr[j].name) {
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
    }
  },
  mounted() {
    this.getAllFieldList();
  },
  components: {
    UploadFile: _sfc_main$1,
  },
};


const _hoisted_1 = { class: "batch-export-model" };
const _hoisted_2 = /*#__PURE__*/createBaseVNode("h1", null, "批量导入", -1);
const _hoisted_3 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "模型文件")
], -1);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "缩略图")
], -1);
const _hoisted_5 = {
  key: 0,
  class: "img-url"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 1,
  class: "img-url"
};
const _hoisted_8 = /*#__PURE__*/createBaseVNode("span", {
  class: "upload-json",
  type: "primary"
}, "上传文件", -1);
const _hoisted_9 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "模型名称")
], -1);
const _hoisted_10 = { class: "table-input model-name-box" };
const _hoisted_11 = ["onUpdate:modelValue"];
const _hoisted_12 = {
  key: 0,
  class: "img-url"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = {
  key: 1,
  class: "img-url"
};
const _hoisted_15 = /*#__PURE__*/createBaseVNode("span", { class: "upload-json" }, "上传文件", -1);
const _hoisted_16 = /*#__PURE__*/createBaseVNode("div", { class: "table-header" }, [
  /*#__PURE__*/createBaseVNode("span", { style: {"color":"#f77560"} }, "*"),
  /*#__PURE__*/createBaseVNode("label", null, "所属领域")
], -1);
const _hoisted_17 = { class: "table-input" };
const _hoisted_18 = { class: "field-box" };
const _hoisted_19 = ["onClick"];
const _hoisted_20 = /*#__PURE__*/createBaseVNode("span", null, ">", -1);
const _hoisted_21 = ["onClick"];
const _hoisted_22 = { class: "select-box" };
const _hoisted_23 = ["onChange", "onUpdate:modelValue"];
const _hoisted_24 = { class: "tree-word" };
const _hoisted_25 = /*#__PURE__*/createBaseVNode("span", null, ">", -1);
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "select-box" };
const _hoisted_28 = ["onChange", "onUpdate:modelValue"];
const _hoisted_29 = { class: "tree-word" };
const _hoisted_30 = /*#__PURE__*/createBaseVNode("span", null, null, -1);
const _hoisted_31 = ["onClick"];
const _hoisted_32 = { class: "table-input" };
const _hoisted_33 = ["onUpdate:modelValue"];
const _hoisted_34 = { class: "table-input" };
const _hoisted_35 = ["onUpdate:modelValue"];
const _hoisted_36 = ["onClick"];
const _hoisted_37 = /*#__PURE__*/createBaseVNode("input", {
  style: {"display":"none"},
  type: "file",
  name: "file",
  id: "file",
  multiple: "multiple"
}, null, -1);
const _hoisted_38 = { class: "do-box" };
const _hoisted_39 = { class: "btn-box" };
const _hoisted_40 = { class: "dialog-content" };
const _hoisted_41 = /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
  /*#__PURE__*/createBaseVNode("span", null, "请选择模型处理方式：")
], -1);
const _hoisted_42 = { class: "confirm-tag" };
const _hoisted_43 = /*#__PURE__*/createTextVNode("需加工处理");
const _hoisted_44 = /*#__PURE__*/createTextVNode("直接上传，无需加工处理");
const _hoisted_45 = { class: "dialog-footer" };
const _hoisted_46 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_47 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_upload = resolveComponent("el-upload");
  const _component_el_popover = resolveComponent("el-popover");
  const _component_el_table = resolveComponent("el-table");
  const _component_UploadFile = resolveComponent("UploadFile");
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(_component_el_table, {
      data: _ctx.uploadData,
      class: "batch-export-table"
    }, {
      default: withCtx(() => [
        createVNode(_component_el_table_column, {
          type: "index",
          label: "序号",
          width: "100"
        }),
        createVNode(_component_el_table_column, {
          prop: "modelSourceFile",
          width: "180"
        }, {
          header: withCtx(() => [
            _hoisted_3
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_4
          ]),
          default: withCtx((scope) => [
            (scope.row.thumbnail != '')
              ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  createBaseVNode("span", null, toDisplayString(scope.row.thumbnail), 1),
                  createBaseVNode("img", {
                    onClick: $event => (_ctx.deleteImgUrl(scope)),
                    src: _imports_0,
                    alt: ""
                  }, null, 8, _hoisted_6)
                ]))
              : createCommentVNode("", true),
            (scope.row.thumbnail === '')
              ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  createVNode(_component_el_upload, {
                    class: "upload-demo",
                    action: "",
                    limit: 10,
                    "auto-upload": false,
                    onClick: $event => (_ctx.uploadClick(scope)),
                    "on-change": _ctx.selectImg
                  }, {
                    tip: withCtx(() => []),
                    default: withCtx(() => [
                      _hoisted_8
                    ]),
                    _: 2
                  }, 1032, ["onClick", "on-change"])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_9
          ]),
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_10, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": $event => ((scope.row.name) = $event),
                placeholder: "请输入",
                type: "text"
              }, null, 8, _hoisted_11), [
                [vModelText, scope.row.name]
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "物模型",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            (scope.row.objectModel != '')
              ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  createBaseVNode("span", null, toDisplayString(scope.row.thumbnail), 1),
                  createBaseVNode("img", {
                    onClick: $event => (_ctx.deleteObjectUrl(scope)),
                    src: _imports_0,
                    alt: ""
                  }, null, 8, _hoisted_13)
                ]))
              : createCommentVNode("", true),
            (scope.row.objectModel === '')
              ? (openBlock(), createElementBlock("div", _hoisted_14, [
                  createVNode(_component_el_upload, {
                    class: "upload-demo",
                    style: {"text-align":"center"},
                    action: "",
                    limit: 10,
                    "auto-upload": false,
                    accept: ".json,.JSON",
                    onClick: $event => (_ctx.uploadClickJson(scope)),
                    "on-change": _ctx.selectObjectModel
                  }, {
                    tip: withCtx(() => []),
                    default: withCtx(() => [
                      _hoisted_15
                    ]),
                    _: 2
                  }, 1032, ["onClick", "on-change"])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, { "min-width": "10%" }, {
          header: withCtx(() => [
            _hoisted_16
          ]),
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_17, [
              createVNode(_component_el_popover, {
                modelValue: scope.row.isShow,
                "onUpdate:modelValue": $event => ((scope.row.isShow) = $event),
                placement: "bottom",
                trigger: "click",
                "close-on-click-modal": false,
                width: _ctx.popWidth,
                onHide: $event => (_ctx.hidePop(scope))
              }, {
                reference: withCtx(() => [
                  createBaseVNode("span", {
                    style: normalizeStyle({
                    color: scope.row.fieldDTO.fieldName ? '#fff' : '#666',
                  }),
                    class: "field-btn",
                    onClick: withModifiers($event => (_ctx.openField(scope)), ["stop"])
                  }, toDisplayString(scope.row.fieldDTO.fieldName
                      ? scope.row.fieldDTO.fieldName
                      : '请选择领域'), 13, _hoisted_31)
                ]),
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_18, [
                    createBaseVNode("ul", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fieldData, (item, index) => {
                        return (openBlock(), createElementBlock("li", {
                          key: index,
                          class: normalizeClass({ active: item.selectOne })
                        }, [
                          createBaseVNode("span", {
                            onClick: $event => (_ctx.selectOne(item, index)),
                            class: "tree-word"
                          }, toDisplayString(item.fieldName), 9, _hoisted_19),
                          _hoisted_20
                        ], 2))
                      }), 128))
                    ]),
                    withDirectives(createBaseVNode("ul", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selectTwoData.attributes, (item, index) => {
                        return (openBlock(), createElementBlock("li", {
                          class: normalizeClass({ active: item.selectTwoActive }),
                          key: index,
                          onClick: $event => (_ctx.selectTwo(item, index))
                        }, [
                          createBaseVNode("div", _hoisted_22, [
                            withDirectives(createBaseVNode("input", {
                              onChange: $event => (_ctx.selectTwoChange(item, index)),
                              type: "checkbox",
                              "onUpdate:modelValue": $event => ((item.selectTwo) = $event)
                            }, null, 40, _hoisted_23), [
                              [vModelCheckbox, item.selectTwo]
                            ]),
                            createBaseVNode("span", _hoisted_24, toDisplayString(item.attributesName), 1)
                          ]),
                          _hoisted_25
                        ], 10, _hoisted_21))
                      }), 128))
                    ], 512), [
                      [vShow, 
                    _ctx.selectTwoData.attributes &&
                      _ctx.selectTwoData.attributes.length > 0
                  ]
                    ]),
                    withDirectives(createBaseVNode("ul", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selectLastData.subattributes, (item, index) => {
                        return (openBlock(), createElementBlock("li", {
                          onClick: $event => (_ctx.selectTreeClick(item, index)),
                          class: normalizeClass({ active: item.selectTreeActive }),
                          key: index
                        }, [
                          createBaseVNode("div", _hoisted_27, [
                            withDirectives(createBaseVNode("input", {
                              type: "checkbox",
                              onChange: $event => (_ctx.selctThreeChange(item, index)),
                              "onUpdate:modelValue": $event => ((item.selectTree) = $event)
                            }, null, 40, _hoisted_28), [
                              [vModelCheckbox, item.selectTree]
                            ]),
                            createBaseVNode("span", _hoisted_29, toDisplayString(item.subattributeName), 1)
                          ]),
                          _hoisted_30
                        ], 10, _hoisted_26))
                      }), 128))
                    ], 512), [
                      [vShow, 
                    _ctx.selectLastData.subattributes &&
                      _ctx.selectLastData.subattributes.length > 0
                  ]
                    ])
                  ])
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue", "width", "onHide"])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "规格型号",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_32, [
              withDirectives(createBaseVNode("input", {
                placeholder: "请输入",
                type: "text",
                "onUpdate:modelValue": $event => ((scope.row.specifications) = $event)
              }, null, 8, _hoisted_33), [
                [vModelText, scope.row.specifications]
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "品牌厂家",
          "min-width": "10%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", _hoisted_34, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": $event => ((scope.row.brandName) = $event),
                placeholder: "请输入",
                type: "text"
              }, null, 8, _hoisted_35), [
                [vModelText, scope.row.brandName]
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_table_column, {
          label: "操作",
          "min-width": "5%"
        }, {
          default: withCtx((scope) => [
            createBaseVNode("div", {
              onClick: $event => (_ctx.deleteScene(scope)),
              class: "table-input delete-siggle"
            }, " 删除 ", 8, _hoisted_36)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["data"]),
    _hoisted_37,
    createBaseVNode("div", _hoisted_38, [
      createBaseVNode("span", null, "共" + toDisplayString(_ctx.uploadData.length) + "个模型文件", 1),
      createBaseVNode("div", _hoisted_39, [
        createVNode(_component_UploadFile, {
          class: "mode-upload",
          onExportUrl: _ctx.exportUrl,
          onGetImg: _ctx.getImg,
          msg: "继续导入",
          onUploadSuccess: _ctx.uploadSuccess
        }, null, 8, ["onExportUrl", "onGetImg", "onUploadSuccess"]),
        createBaseVNode("span", {
          class: "submit",
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.sublitClick && _ctx.sublitClick(...args)))
        }, "提交"),
        createBaseVNode("span", {
          class: "back",
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.backClick && _ctx.backClick(...args)))
        }, "返回")
      ])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.dialogVisible) = $event)),
      title: "提交确认",
      width: "640px",
      "custom-class": "edit-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_45, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.enterSubmit
          }, {
            default: withCtx(() => [
              _hoisted_46
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[3] || (_cache[3] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_47
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_40, [
          _hoisted_41,
          createBaseVNode("div", _hoisted_42, [
            createVNode(_component_el_radio_group, {
              modelValue: _ctx.radio,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.radio) = $event))
            }, {
              default: withCtx(() => [
                createVNode(_component_el_radio, { label: 0 }, {
                  default: withCtx(() => [
                    _hoisted_43
                  ]),
                  _: 1
                }),
                createVNode(_component_el_radio, { label: 1 }, {
                  default: withCtx(() => [
                    _hoisted_44
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var modelExport = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { modelExport as default };
