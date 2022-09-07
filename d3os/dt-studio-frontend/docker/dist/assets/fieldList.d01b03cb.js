import { _ as _export_sfc, u as useRouter } from './index.acc4a696.js';
import { g as getFieldPage } from './field.879e735d.js';
import { j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, L as Fragment, M as renderList, O as toDisplayString, $ as getCurrentInstance } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var fieldList_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".field-list{width:100%;height:calc(100vh - .34375rem);background:#2a2e39;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:hidden}.field-list .field-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:.104167rem 0;width:98%}.field-list .field-header .search-box{width:80%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.field-list .field-header .search-box .scene-search-item{width:23%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.field-list .field-header .search-box .scene-search-item label{display:inline-block;width:25%;color:#fff9;font-size:.0625rem}.field-list .field-header .search-box .scene-search-item .scene-select{width:70%;height:.166667rem}.field-list .field-header .search-box .scene-search-item .scene-select .el-select__tags .el-tag{background:#333}.field-list .field-header .search-box .scene-search-item .search-input{margin-right:.083333rem;width:70%;border:1px solid rgba(255,255,255,.14);border-radius:.010417rem}.field-list .field-table{width:98%}.field-list .field-table .table{width:100%;background:#2a2e39}.field-list .field-table .table .table-text{width:100%;color:#fff}.field-list .field-table .table .table-text .label-name{margin-right:.026042rem}.field-list .field-table .table .table-text p{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.field-list .field-table .table .table-row-delete{width:.520833rem;height:.15625rem;color:#428fff}.field-list .field-table .table .el-table__row{background:#2a2e39}.field-list .field-table .table .el-table__row td{border-bottom-color:#ffffff0a;color:#fff}.field-list .field-table .table .hover-row{background:#000}.field-list .field-table .table .el-table__header-wrapper .el-table__header thead tr{background:#2a2e39}.field-list .field-table .table th{background:#2a2e39;border-bottom-color:#ffffff0a}.field-list .field-btn{width:.427083rem;height:.166667rem;border-radius:.020833rem;border:1px solid #428fff;color:#428fff;font-size:.072917rem;text-align:center;line-height:.166667rem}.field-list .field-btn.add-btn{background:#428fff;color:#fff}.field-list .pagination{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;bottom:.125rem;right:.104167rem}.field-list .pagination span{color:#fff9;font-size:.072917rem;margin-right:.098958rem}.field-list .pagination .pagination-detail{margin-right:.09375rem}.field-list .pagination .pagination-detail .el-pager li,.field-list .pagination .pagination-detail .btn-next,.field-list .pagination .pagination-detail .btn-prev{background:#2a2e39;border:1px solid rgba(255,255,255,.3)}.field-list .pagination .pagination-detail .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.search-select{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#428fff}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected,.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{background:#428fff}input:focus{outline:none}textarea:focus{outline:none}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important;background:#2a2e39}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#212e3e!important}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#000}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{background:#000}.el-table__inner-wrapper:before{height:0}\n")();

// import senceList from '@/components/scene/senceList.vue'
// import checkDetail from '@/components/scene/checkDetail.vue'
const _sfc_main = {
  setup() {
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance();
    let router = useRouter();
    let state = reactive({
      fieldName: '',
      tableData: [],
      form: {
        page: 1,
        size: 10,
      },
      total: 0,
    });
    onMounted(() => {
      proxy.getFieldPage();
    });
    const methods = {
      async getFieldPage() {
        let data = await getFieldPage(state.form);
        if (data.code === 1) {
          state.tableData = data.data.list;
          state.total = data.data.total;
        }
      },
      searchClick() {
        // if (state.fieldName === '') {
        //   ElMessage.warning('请输入领域名称')
        //   return
        // }
        state.form.fieldName = state.fieldName;
        proxy.getFieldPage();
      },
      deleteScene(scope) {},
      changeCurrent(value) {
        state.form.page = value;
        proxy.getFieldPage();
      },
      addFieldClick() {
        router.push({
          name: 'addField',
          query: {
            source: 'add',
          },
        });
      },
      toEdit(scope) {
        router.push({
          name: 'addField',
          query: {
            source: 'edit',
          },
        });
        localStorage.setItem('field', JSON.stringify(scope.row));
      },
    };
    return {
      ...toRefs(state),
      ...methods,
    }
  },
  unmounted() {},
  components: {},
};

const _hoisted_1 = { class: "field-list" };
const _hoisted_2 = { class: "field-header" };
const _hoisted_3 = { class: "search-box" };
const _hoisted_4 = { class: "scene-search-item" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("label", { for: "22" }, "领域名称", -1);
const _hoisted_6 = { class: "field-table" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = ["onClick"];
const _hoisted_9 = {
  class: "pagination",
  id: "pagination-scene"
};

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_pagination = resolveComponent("el-pagination");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          createVNode(_component_el_input, {
            class: "search-input",
            placeholder: "请输入领域名称",
            modelValue: _ctx.fieldName,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.fieldName) = $event))
          }, null, 8, ["modelValue"])
        ]),
        createBaseVNode("div", {
          class: "search-btn field-btn",
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.searchClick && _ctx.searchClick(...args)))
        }, "查询")
      ]),
      createBaseVNode("div", {
        class: "add-btn field-btn",
        onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.addFieldClick && _ctx.addFieldClick(...args)))
      }, "添加")
    ]),
    createBaseVNode("div", _hoisted_6, [
      createVNode(_component_el_table, {
        data: _ctx.tableData,
        height: "600px",
        class: "table"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_table_column, {
            type: "index",
            label: "序号",
            width: "80"
          }),
          createVNode(_component_el_table_column, {
            prop: "fieldName",
            label: "领域名称"
          }),
          createVNode(_component_el_table_column, { label: "属性" }, {
            default: withCtx((scope) => [
              createBaseVNode("div", {
                onClick: $event => (_ctx.deleteScene(scope)),
                style: {},
                class: "table-text"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(scope.row.attributes, (item, index) => {
                  return (openBlock(), createElementBlock("span", { key: index }, toDisplayString(item.attributesName) + " " + toDisplayString(index + 1 != scope.row.attributes.length ? '、' : ''), 1))
                }), 128))
              ], 8, _hoisted_7)
            ]),
            _: 1
          }),
          createVNode(_component_el_table_column, {
            label: "操作",
            width: "60"
          }, {
            default: withCtx((scope) => [
              createBaseVNode("div", {
                onClick: $event => (_ctx.toEdit(scope)),
                class: "table-text table-row-delete"
              }, " 编辑 ", 8, _hoisted_8)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["data"])
    ]),
    createBaseVNode("div", _hoisted_9, [
      createBaseVNode("span", null, "总共" + toDisplayString(_ctx.total) + "条", 1),
      createVNode(_component_el_pagination, {
        class: "pagination-detail",
        background: "",
        layout: "prev, pager, next",
        total: _ctx.total,
        onCurrentChange: _ctx.changeCurrent
      }, null, 8, ["total", "onCurrentChange"])
    ])
  ]))
}
var fieldList = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { fieldList as default };
