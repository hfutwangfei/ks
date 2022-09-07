import { l as ref, h as computed, j as reactive, d as defineComponent, T as onMounted, m as watch, _ as onBeforeUnmount, o as openBlock, B as createElementBlock, r as resolveComponent, a as createVNode, w as withCtx, u as unref, aq as arrow_left_default, C as createBaseVNode, L as Fragment, M as renderList, c as createBlock, G as createCommentVNode, aa as minus_default, ab as plus_default, a4 as withModifiers, O as toDisplayString, W as pushScopeId, X as popScopeId, N as createTextVNode, a3 as ElMessageBox } from './element-plus.da98f360.js';
import { _ as _export_sfc, u as useRouter, a as useRoute } from './index.acc4a696.js';
import { u as useEnumFields } from './useEnumFields.6bbf4d51.js';
import { u as useTemplateInfo } from './useTemplateInfo.9c3434ed.js';
import { e as getTenantDeviceInfos, f as getTimeseriesKeys, h as bindDevice } from './model-object-template-definition.51792958.js';
import { n as nanoid } from './index.browser.8e74d592.js';
import { e as editor } from './monaco-editor.e9574fd0.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-16 15:18:45
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-19 17:52:21
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/templateDetail/useEquipmentList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useEquipmentList = () => {
  const equipmentList = ref([]);

  const equipmentListSelectLoading = ref(false);

  const getEquipmentList = async (entityName = null) => {
    const equipmentListRes = await getTenantDeviceInfos({ entityName });

    if (equipmentListRes.code === 1) {
      const resEquipmentList = Object.keys(equipmentListRes.data);

      equipmentList.value = resEquipmentList.map(item => {
        return {
          entityId: item,
          entityName: item,
          pointList: equipmentListRes.data[item],
        }
      });
    } else {
      equipmentList.value = [];
    }
  };
  return { equipmentList, getEquipmentList, equipmentListSelectLoading }
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-16 15:25:16
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-19 17:51:29
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/templateDetail/usePointList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const usePointList = () => {
  // 根据用户选择的设备请求到的对应的点位列表
  const requestedPointList = ref([]);
  // 根据用户选择的设备请求到的对应的点位列表长度
  // 后续用来判断是否显示添加按钮，如果用户已经添加的点位数量和这个长度相等则不显示
  const requestedPointListLength = ref(0);
  // 用户当前添加的点位列表
  const pointList = ref([{ key: nanoid() }]);

  // 请求点位列表
  const requestPointList = async entityId => {
    const pointListRes = await getTimeseriesKeys({ entityId });

    const { code, data } = pointListRes;

    if (code === 1 && data) {
      requestedPointList.value = JSON.parse(data).map(item => ({
        key: nanoid(),
        name: item,
      }));

      requestedPointListLength.value = requestedPointList.value.length;
    }
  };

  const fillRequestedPointList = pointList => {
    requestedPointList.value = pointList.map(item => ({
      key: nanoid(),
      name: item,
    }));

    requestedPointListLength.value = requestedPointList.value.length;
  };

  // 选择点位字段名称
  const selectPointName = val => {
    // 移除已选择的选项
    requestedPointList.value = requestedPointList.value.filter(
      item => item.name !== val
    );
  };

  // 选择点位类型
  const selectPointType = () => {};
  // 添加点位字段
  const addPoint = () => {
    pointList.value.push({
      key: nanoid(),
    });
  };
  // 移除点位字段
  const removePoint = index => {
    const removeItem = pointList.value[index];
    pointList.value.splice(index, 1);
    requestedPointList.value.push(removeItem);
  };
  // 是否展示添加按钮
  const isAddButtonShown = computed(
    () => pointList.value.length < requestedPointListLength.value
  );

  const fillPointList = ({ equipmentDataType, equipmentKey }) => {
    const nameArr = equipmentKey.split(',');
    const typeArr = equipmentDataType.split(',');
    const arr = [];

    nameArr.forEach((name, index) => {
      const type = typeArr[index];

      arr.push({
        name,
        type,
        key: nanoid(),
      });
    });

    pointList.value = arr;
  };

  // 将点位列表的值转化为接口需要的值
  const getPointListStringValue = () => {
    let equipmentDataTypeArr = [];
    let equipmentKeyArr = [];

    pointList.value.forEach(item => {
      if (item.name && item.type) {
        equipmentKeyArr.push(item.name);
        equipmentDataTypeArr.push(item.type);
      }
    });

    return {
      equipmentKey: equipmentKeyArr.join(','),
      equipmentDataType: equipmentDataTypeArr.join(','),
    }
  };

  return {
    requestedPointList,
    requestPointList,
    fillRequestedPointList,
    pointList,
    fillPointList,
    isAddButtonShown,
    selectPointName,
    selectPointType,
    addPoint,
    removePoint,
    getPointListStringValue,
  }
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-16 15:06:54
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-16 15:07:04
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/templateDetail/useTest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useTest = () => {
  const testResult = reactive({
    isPassed: null,
    hint: '',
  });

  const runScript = script => {
    if (!script) return

    try {
      new Function(script);

      testResult.isPassed = true;
      testResult.hint = '测试通过';
    } catch (e) {
      testResult.isPassed = false;
      testResult.hint = e;
    }
  };

  const resetTestResult = () => {
    testResult.isPassed = null;
    testResult.hint = '';
  };

  return {
    testResult,
    runScript,
    resetTestResult,
  }
};

function WorkerWrapper$1() {
          return new Worker("/assets/ts.worker.5e363206.js", {
  "type": "module"
})
        }

function WorkerWrapper() {
          return new Worker("/assets/editor.worker.1654cda0.js", {
  "type": "module"
})
        }

var Editor_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".editor[data-v-7a8c139e]{width:100%;height:1.302083rem}\n")();

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Editor",
  props: {
    script: {
      type: String,
      default: ""
    }
  },
  emits: ["updateScript"],
  setup(__props, { emit: $emit }) {
    const props = __props;
    const editorRef = ref(null);
    let editor$1;
    self.MonacoEnvironment = {
      getWorker(_, label) {
        if (["typescript", "javascript"].includes(label)) {
          return new WorkerWrapper$1();
        }
        return new WorkerWrapper();
      }
    };
    onMounted(() => {
      initEditor();
    });
    const initEditor = () => {
      !editor$1 ? editor$1 = editor.create(editorRef.value, {
        value: "",
        language: "javascript",
        theme: "vs-dark",
        lineNumbers: "off",
        automaticLayout: true,
        folding: false,
        scrollbar: {
          useShadows: false,
          vertical: "auto",
          horizontal: "visible",
          horizontalSliderSize: 2,
          verticalSliderSize: 5,
          horizontalScrollbarSize: 15,
          verticalScrollbarSize: 15
        },
        minimap: {
          enabled: false
        }
      }) : editor$1.setValue("");
      editor$1.onDidChangeModelContent((val) => $emit("updateScript", editor$1.getValue()));
    };
    watch(() => props.script, (newScript) => {
      editor$1.setValue(newScript);
    });
    onBeforeUnmount(() => {
      editor$1.dispose();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "editor",
        ref_key: "editorRef",
        ref: editorRef
      }, null, 512);
    };
  }
});
var Editor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7a8c139e"]]);

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".c-container[data-v-3b324077]{width:100%;padding:.104167rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-container .c-empty-text[data-v-3b324077]{text-align:center;height:.520833rem;line-height:.520833rem;color:#fff9}.c-container .c-breadcrumb[data-v-3b324077]{font-size:.083333rem;font-weight:500;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.166667rem;cursor:pointer}.c-container .c-header[data-v-3b324077]{height:.166667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-content[data-v-3b324077]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:.104167rem 0;max-height:4.791667rem;overflow-y:auto}.c-container .c-action-button-list[data-v-3b324077]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.c-container .c-action-button-list[data-v-3b324077] .el-upload-list{display:none}.c-container .c-form-content[data-v-3b324077]{max-width:3.125rem;height:80%;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-container .c-form-content[data-v-3b324077] .el-input{--el-disabled-text-color: #fff;--el-input-text-color: #fff}.c-container .c-form-content[data-v-3b324077] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content[data-v-3b324077] .el-form{width:100%}.c-container .c-form-content[data-v-3b324077] .el-form .el-form-item__label{color:#fff9;margin-right:.083333rem}.c-container .c-form-content .c-form-table[data-v-3b324077]{max-height:2.083333rem;overflow-y:auto;overflow-x:hidden;width:100%;padding:.083333rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.0625rem;color:#fff9;border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container .c-form-content .c-form-table .c-form-table--row[data-v-3b324077]{margin-bottom:.041667rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-container .c-form-content .c-form-table .c-form-table--row.c-form-table--header-row[data-v-3b324077]{line-height:.0625rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-3b324077]{-webkit-box-flex:15;-ms-flex:15;flex:15;margin:0 .041667rem}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-3b324077]:first-child{margin-left:0}.c-container .c-form-content .c-form-table .c-form-table--row .c-form-table--col[data-v-3b324077]:last-child{margin-right:0}.c-container .c-form-content .c-form-table .c-form-table--row--2 .c-form-table--col[data-v-3b324077]:last-child{min-width:.145833rem;max-width:.145833rem;height:.145833rem;background-color:#363644;border-radius:.020833rem;-webkit-box-flex:1;-ms-flex:auto;flex:auto;text-align:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--header-row.c-form-table--row--2 .c-form-table--col[data-v-3b324077]:last-child{background-color:transparent!important;height:0}.c-container .c-form-content .c-form-table .c-form-table--row-add[data-v-3b324077]{width:100%;padding:.052083rem 0;border-radius:.005208rem;border:1px dashed rgba(255,255,255,.3);font-size:.0625rem;line-height:.0625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;cursor:pointer}.c-container .c-form-content .c-form-table .c-form-table--row-add .icon[data-v-3b324077]{margin-right:.052083rem}.c-container .c-form-content .c-form-table .c-form-table--row-add span[data-v-3b324077]{margin-left:.052083rem}.c-container .c-table-content[data-v-3b324077]{max-width:100%;overflow:hidden}.c-container .c-table-content .c-table-action[data-v-3b324077]{font-size:.0625rem;color:#428fff;cursor:pointer;margin:0 .020833rem}.c-container .c-table-content[data-v-3b324077] .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:transparent}.c-container .c-table-content[data-v-3b324077] .c-table{background:transparent}.c-container .c-table-content[data-v-3b324077] .c-table .el-table__inner-wrapper:before{display:none}.c-container .c-table-content[data-v-3b324077] .c-table .el-checkbox__inner{background:transparent;border-color:#ffffff26}.c-container .c-table-content[data-v-3b324077] .c-table .el-table__row{background:transparent}.c-container .c-table-content[data-v-3b324077] .c-table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff;font-size:.0625rem}.c-container .c-table-content[data-v-3b324077] .c-table .el-table__header-wrapper .el-table__header thead tr{background:rgba(255,255,255,.05)}.c-container .c-table-content[data-v-3b324077] .c-table th{background:rgba(255,255,255,.05);border-bottom:none;font-size:.0625rem;color:#fff9}.c-container .c-footer[data-v-3b324077]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-container .c-footer[data-v-3b324077] .el-pagination .el-pagination__total{font-size:.072917rem;color:#fff9}.c-container .c-footer[data-v-3b324077] .el-pagination .el-pager li{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-footer[data-v-3b324077] .el-pagination .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.c-container .c-footer[data-v-3b324077] .el-pagination .btn-prev,.c-container .c-footer[data-v-3b324077] .el-pagination .btn-next{border:1px solid rgba(255,255,255,.3);background:#2a2e39}.c-container .c-search-form[data-v-3b324077]{--el-form-label-font-size: .0625rem;--el-text-color-regular: rgba(255, 255, 255, .6)}.c-container .c-search-form[data-v-3b324077] .el-select{border-radius:.010417rem;border:1px solid rgba(255,255,255,.14)}.c-container[data-v-3b324077] .el-textarea__inner{--el-input-border-color: rgba(255, 255, 255, .15);color:#fff;background-color:transparent}.c-container .el-button[data-v-3b324077]{margin-left:.083333rem;padding:0 .083333rem;min-width:.427083rem;height:.166667rem;line-height:.166667rem;min-height:auto;border-radius:.020833rem;border:1px solid #428fff}.c-container .el-button.el-button--primary[data-v-3b324077]{color:#428fff;background:none}.c-container .el-button.el-button--success[data-v-3b324077]{background:#428FFF;color:#fff}.c-container .el-button.el-button--warning[data-v-3b324077]{color:#fff9;background:none;border:1px solid rgba(255,255,255,.6)}.c-container .el-input[data-v-3b324077]{font-size:.0625rem;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.c-container .el-input[data-v-3b324077] .el-input__inner::-webkit-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-3b324077] .el-input__inner::-moz-placeholder{color:#ffffff4d}.c-container .el-input[data-v-3b324077] .el-input__inner:-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-3b324077] .el-input__inner::-ms-input-placeholder{color:#ffffff4d}.c-container .el-input[data-v-3b324077] .el-input__inner::placeholder{color:#ffffff4d}.c-equipment-list-select[data-v-3b324077]{width:100%;margin-bottom:.083333rem}.c-form-footer[data-v-3b324077]{display:-webkit-box;display:-ms-flexbox;display:flex}.c-editor-area[data-v-3b324077]{display:grid;grid-template-columns:2.3125rem 2.395833rem;grid-gap:.104167rem}.c-editor-area .c-editor-example[data-v-3b324077]{color:#608b4e}.c-editor-text[data-v-3b324077]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.c-editor-text[data-v-3b324077] .el-button{margin-left:0;margin-right:.104167rem}\n")();

const _withScopeId = n => (pushScopeId("data-v-3b324077"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "c-container" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", null, "物模版定义详情", -1));
const _hoisted_3 = { class: "c-content" };
const _hoisted_4 = { class: "c-form-content" };
const _hoisted_5 = { class: "c-form-table" };
const _hoisted_6 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--row c-form-table--header-row" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, "字段"),
  /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, "值")
], -1));
const _hoisted_7 = { class: "c-form-table--col" };
const _hoisted_8 = { class: "c-form-table--col" };
const _hoisted_9 = { class: "c-form-table" };
const _hoisted_10 = {
  key: 0,
  class: "c-form-table--row c-form-table--header-row c-form-table--row--2"
};
const _hoisted_11 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, "字段名称", -1));
const _hoisted_12 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, "类型", -1));
const _hoisted_13 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "c-form-table--col" }, null, -1));
const _hoisted_14 = [
  _hoisted_11,
  _hoisted_12,
  _hoisted_13
];
const _hoisted_15 = { class: "c-form-table--col" };
const _hoisted_16 = { class: "c-form-table--col" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("span", null, "添加", -1));
const _hoisted_19 = { class: "c-editor-area" };
const _hoisted_20 = ["innerHTML"];
const _hoisted_21 = {
  key: 0,
  class: "c-editor-text"
};
const _hoisted_22 = /*#__PURE__*/createTextVNode(" 测试结果 ");
const _hoisted_23 = { key: 0 };
const _hoisted_24 = { class: "c-form-footer" };
const _hoisted_25 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_26 = /*#__PURE__*/createTextVNode(" 取消 ");


const _sfc_main = {
  __name: 'index',
  setup(__props) {

const router = useRouter();
const route = useRoute();

const initialScript = ref('');

const exampleScript = ref(`示例脚本:<br />
if ("open" == animation && "task1" == task) { <br />&nbsp;&nbsp;return "任务1启动标识"  <br />} 
else if ("open" == animation && "task2" == task) {<br />&nbsp;&nbsp;return "任务2启动标识"<br />} else {
<br />&nbsp;&nbsp;return "默认值"<br />}`);

// 获取物模版列表带过来的信息hooks
const { getTemplateInfo } = useTemplateInfo();
// 物模版枚举区域hooks
const enumFields = useEnumFields();
// 设备名称选择框hooks
const {
  equipmentList,
  getEquipmentList,
  equipmentListSelectLoading,
} = useEquipmentList();
// 点位列表hooks
const {
  requestedPointList,
  fillRequestedPointList,
  pointList,
  isAddButtonShown,
  selectPointName,
  selectPointType,
  addPoint,
  removePoint,
  fillPointList,
  getPointListStringValue,
} = usePointList();
// 测试结果hooks
const { testResult, runScript, resetTestResult } = useTest();

// 类型列表
const typeList = ['Number', 'String', 'Boolean'];

const formRef = ref(null);
const form = reactive({
  pointName: '',
  pointEnglish: '',
  script: '',
  entity: {},
});

onMounted(() => {
  getTemplate();
  getEquipmentList();
});

watch(
  () => equipmentList.value,
  newEquipmentList => {
    const { entityId } = form.entity;

    if (entityId) {
      const currentEntity = newEquipmentList.filter(
        item => item.entityId === entityId
      )[0];

      fillCurrentEquipmentPoints(currentEntity);
    }
  },
  { deep: true }
);

const getTemplate = () => {
  const {
    pointName,
    pointEnglish,
    enumKey,
    enumValue,
    equipmentName,
    equipmentKey,
    equipmentDataType,
    equipmentId,
    script,
  } = getTemplateInfo();

  initialScript.value = script;
  form.pointName = pointName;
  form.pointEnglish = pointEnglish;
  form.entity = {
    entityId: equipmentId,
    entityName: equipmentName,
  };

  if (enumKey && enumValue) {
    enumFields.fill({ enumKey, enumValue });
  }

  if (equipmentDataType && equipmentKey) {
    fillPointList({ equipmentDataType, equipmentKey });
  }
};

// 代码块部分开始
// 点击测试结果按钮
const testScript = () => runScript(form.script);
// 代码块变动更新script字段，重置提示信息
const updateScript = val => {
  form.script = val;
  resetTestResult();
};

//  选择设备后请求该设备的点位信息
const fillCurrentEquipmentPoints = ({ pointList }) => {
  if (Array.isArray(pointList)) {
    fillRequestedPointList(pointList);
  }
};

const submitForm = async () => {
  const { templateId: objectTemplateId, pointId: objectPointId } = route.params;
  const { script, entity } = form;
  const { entityId: equipmentId, entityName: equipmentName } = entity;
  const { equipmentKey, equipmentDataType } = getPointListStringValue();

  const requestObj = {
    equipmentId,
    equipmentKey,
    equipmentName,
    equipmentDataType,
    objectPointId,
    objectTemplateId,
    script,
  };

  // if (requestObj.script.length === 0) {
  //   requestObj.script = null
  // }

  // if (testResult.isPassed !== true) {
  //   return ElMessage.error('请先测试脚本正确性')
  // }

  try {
    const res = await bindDevice(requestObj);

    if (res.code === 1) {
      ElMessageBox.confirm('编辑成功，是否返回点位信息列表', '确认提示', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning',
      })
        .then(() => {
          router.push({
            name: 'dataBindingMappingModelTemplateList',
            params: route.params,
          });
        })
        .catch(e => {
          console.log('取消跳转');
        });
    }
  } catch (e) {
    console.log(e);
  }
};

return (_ctx, _cache) => {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_router_link = resolveComponent("router-link");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_router_link, {
      class: "c-breadcrumb",
      to: {
        name: 'dataBindingMappingModelTemplateList',
        params: unref(route).params,
      }
    }, {
      default: withCtx(() => [
        createVNode(_component_el_icon, { size: 14 }, {
          default: withCtx(() => [
            createVNode(unref(arrow_left_default))
          ]),
          _: 1
        }),
        _hoisted_2
      ]),
      _: 1
    }, 8, ["to"]),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        createVNode(_component_el_form, {
          ref_key: "formRef",
          ref: formRef,
          model: form,
          "status-icon": "",
          "label-width": "140px"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "物模版名称" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: form.pointName,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.pointName) = $event)),
                  disabled: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "物模版英文名称" }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: form.pointEnglish,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.pointEnglish) = $event)),
                  disabled: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "物模版枚举" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  _hoisted_6,
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(enumFields).value, (enumField) => {
                    return (openBlock(), createElementBlock("div", {
                      class: "c-form-table--row c-form-table--body-row",
                      key: enumField.key
                    }, [
                      createBaseVNode("div", _hoisted_7, [
                        createVNode(_component_el_input, {
                          modelValue: enumField.enumKey,
                          "onUpdate:modelValue": $event => ((enumField.enumKey) = $event),
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_8, [
                        createVNode(_component_el_input, {
                          modelValue: enumField.enumValue,
                          "onUpdate:modelValue": $event => ((enumField.enumValue) = $event),
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]))
                  }), 128))
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, {
              label: "设备名称",
              prop: "entity"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  remote: "",
                  filterable: "",
                  class: "c-equipment-list-select",
                  "remote-method": unref(getEquipmentList),
                  loading: unref(equipmentListSelectLoading),
                  modelValue: form.entity,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.entity) = $event)),
                  "popper-class": "c-equipment-list-option-popper",
                  placeholder: "请选择设备",
                  clearable: true,
                  "value-key": "entityId",
                  "suffix-icon": "ArrowUp",
                  onChange: fillCurrentEquipmentPoints
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(equipmentList), (equipment) => {
                      return (openBlock(), createBlock(_component_el_option, {
                        key: equipment.entityId,
                        label: equipment.entityName,
                        value: equipment
                      }, null, 8, ["label", "value"]))
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["remote-method", "loading", "modelValue"]),
                createBaseVNode("div", _hoisted_9, [
                  (unref(pointList).length)
                    ? (openBlock(), createElementBlock("div", _hoisted_10, _hoisted_14))
                    : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(pointList), (point, pointIndex) => {
                    return (openBlock(), createElementBlock("div", {
                      class: "c-form-table--row c-form-table--body-row c-form-table--row--2",
                      key: point.key
                    }, [
                      createBaseVNode("div", _hoisted_15, [
                        createVNode(_component_el_select, {
                          modelValue: point.name,
                          "onUpdate:modelValue": $event => ((point.name) = $event),
                          placeholder: "请选择字段名称",
                          onChange: unref(selectPointName)
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(requestedPointList), (item) => {
                              return (openBlock(), createBlock(_component_el_option, {
                                key: item.key,
                                label: item.name,
                                value: item.name
                              }, null, 8, ["label", "value"]))
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      createBaseVNode("div", _hoisted_16, [
                        createVNode(_component_el_select, {
                          modelValue: point.type,
                          "onUpdate:modelValue": $event => ((point.type) = $event),
                          placeholder: "请选择类型",
                          onChange: unref(selectPointType)
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createElementBlock(Fragment, null, renderList(typeList, (item) => {
                              return createVNode(_component_el_option, {
                                key: item,
                                label: item,
                                value: item
                              }, null, 8, ["label", "value"])
                            }), 64))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])
                      ]),
                      createBaseVNode("div", {
                        class: "c-form-table--col",
                        onClick: $event => (unref(removePoint)(pointIndex))
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(minus_default))
                          ]),
                          _: 1
                        })
                      ], 8, _hoisted_17)
                    ]))
                  }), 128)),
                  (unref(isAddButtonShown))
                    ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: "c-form-table--row-add",
                        onClick: _cache[3] || (_cache[3] = (...args) => (unref(addPoint) && unref(addPoint)(...args)))
                      }, [
                        createVNode(_component_el_icon, {
                          class: "icon",
                          size: 16
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(plus_default))
                          ]),
                          _: 1
                        }),
                        _hoisted_18
                      ]))
                    : createCommentVNode("", true)
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_form_item, { label: "映射脚本" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_19, [
                  createVNode(Editor, {
                    script: initialScript.value,
                    onUpdateScript: updateScript
                  }, null, 8, ["script"]),
                  createBaseVNode("div", {
                    class: "c-editor-example",
                    innerHTML: exampleScript.value
                  }, null, 8, _hoisted_20)
                ]),
                (form.script)
                  ? (openBlock(), createElementBlock("p", _hoisted_21, [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: withModifiers(testScript, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          _hoisted_22
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      (unref(testResult).isPassed !== null)
                        ? (openBlock(), createElementBlock("span", _hoisted_23, toDisplayString(unref(testResult).hint), 1))
                        : createCommentVNode("", true)
                    ]))
                  : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"]),
        createBaseVNode("div", _hoisted_24, [
          createVNode(_component_el_button, {
            type: "success",
            "auto-insert-space": "",
            onClick: _cache[4] || (_cache[4] = $event => (submitForm()))
          }, {
            default: withCtx(() => [
              _hoisted_25
            ]),
            _: 1
          }),
          createVNode(_component_router_link, {
            class: "c-breadcrumb",
            to: {
              name: 'dataBindingMappingModelTemplateList',
              params: unref(route).params,
            }
          }, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "warning",
                "auto-insert-space": ""
              }, {
                default: withCtx(() => [
                  _hoisted_26
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["to"])
        ])
      ])
    ])
  ]))
}
}

};
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3b324077"]]);

export { index as default };
