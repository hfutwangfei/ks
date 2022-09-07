import { l as ref, j as reactive, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, L as Fragment, M as renderList, c as createBlock, I as withDirectives, an as vModelText, a0 as vShow, O as toDisplayString, A as ElLoading, x as ElMessage, N as createTextVNode, $ as getCurrentInstance } from './element-plus.da98f360.js';
import { d as getScenesPage, e as getCompanyList, f as getCompanyInfoByuserCode, h as deleteScenes } from './sceneList.b22bf172.js';
import { _ as _export_sfc, c as store, u as useRouter, U as UE } from './index.acc4a696.js';
import { m as modelItem } from './modelItem.4c44462f.js';
import { _ as _imports_0 } from './warning-icon.ecaebaa1.js';
import './monaco-editor.e9574fd0.js';
import './location-icon.2a626473.js';
import './delete-icon.a33587a6.js';

var sceneList_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => ".scene-list{background:#2a2e39;width:100%;height:100vh;overflow:hidden}.scene-list .scene-search{width:100%;padding-top:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-item-align:center;align-self:center}.scene-list .scene-search .scene-search-left{width:75%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-item-align:center;align-self:center;margin-left:.104167rem}.scene-list .scene-search .scene-search-left .scene-search-item{width:23%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.scene-list .scene-search .scene-search-left .scene-search-item label{display:inline-block;width:25%;color:#fff9;font-size:.0625rem}.scene-list .scene-search .scene-search-left .scene-search-item .scene-select{width:70%;height:.166667rem;border:1px solid rgba(255,255,255,.14);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:.020833rem}.scene-list .scene-search .scene-search-left .scene-search-item .scene-select .select-trigger{width:100%}.scene-list .scene-search .scene-search-left .scene-search-item .scene-select input{width:80%;height:.119792rem;border:none;-webkit-box-shadow:none;box-shadow:none}.scene-list .scene-search .scene-search-left .scene-search-item .scene-select .el-select__tags .el-tag{background:#333}.scene-list .scene-search .scene-search-left .scene-search-item input{background:#2a2e39;border:1px solid rgba(255,255,255,.14);color:#fff9}.scene-list .scene-search .scene-search-left .scene-search-item input.search-input{margin-right:.083333rem;width:70%;height:.166667rem;border-radius:.020833rem;text-indent:.0625rem}.scene-list .scene-search .scene-search-left .search-button{width:.427083rem;height:.166667rem;line-height:.166667rem;text-align:center;border:1px solid #428fff;color:#428fff;border-radius:.020833rem;cursor:pointer}.scene-list .scene-search .scene-search-right{width:20%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-right:.104167rem}.scene-list .scene-search .scene-search-right span{display:inline-block;width:.541667rem;height:.166667rem;text-align:center;line-height:.166667rem;border-radius:.020833rem;cursor:pointer}.scene-list .scene-search .scene-search-right span.add-scene{background:#428fff;color:#fff;border:1px solid #428fff;margin-right:.083333rem}.scene-list .scene-search .scene-search-right span.export-scene{border:1px solid #428fff;color:#fff9;margin-right:.104167rem}.scene-list .model-list{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:.104167rem}.scene-list .model-list .model-list-box{width:98%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.scene-list .model-list .model-list-box .model-ul{width:19%}.scene-list .pagination{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;bottom:.125rem;right:.104167rem}.scene-list .pagination span{color:#fff9;font-size:.072917rem;margin-right:.098958rem}.scene-list .pagination .pagination-detail{margin-right:.09375rem}.scene-list .pagination .pagination-detail .el-pager li,.scene-list .pagination .pagination-detail .btn-next,.scene-list .pagination .pagination-detail .btn-prev{background:#2a2e39;border:1px solid rgba(255,255,255,.3)}.scene-list .pagination .pagination-detail .el-pager li.active{border:1px solid #428fff;background:#2a2e39}.scene-list .delete-confirm-dialog{background:#373b48}.scene-list .delete-confirm-dialog .el-dialog__header{border-bottom:.005208rem solid #181a21}.scene-list .delete-confirm-dialog .el-dialog__header .el-dialog__title{color:#fff;font-size:.09375rem}.scene-list .delete-confirm-dialog .dialog-content .confirm-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.scene-list .delete-confirm-dialog .dialog-content .confirm-box span{font-size:.09375rem;color:#fff}.scene-list .delete-confirm-dialog .dialog-content .confirm-box img{width:.166667rem;height:.166667rem;margin-right:.125rem}.scene-list .delete-confirm-dialog .dialog-content .confirm-tag span{display:inline-block;width:.166667rem;height:.166667rem;margin-right:.125rem}.scene-list .delete-confirm-dialog .dialog-content .confirm-tag a{color:#fff9;font-size:.0625rem}.scene-list .delete-confirm-dialog .dialog-footer .dialog-footer-confirm{height:.166667rem}.scene-list .delete-confirm-dialog .dialog-footer .dialog-footer-cancel{height:.166667rem;border:1px solid rgba(255,255,255,.6);background:#373b48}.search-select{background:#2a2e39;border:1px solid rgba(255,255,255,.14)!important}.search-select .el-input{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}div.el-select__popper.el-popper[role=tooltip]{border:1px solid rgba(255,255,255,.14)!important}div.el-select__popper.el-popper[role=tooltip] .el-select-dropdown__item span{color:#fff}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{color:#fff9;background:#428fff}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected,.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{background:#428fff}input:focus{outline:none}textarea:focus{outline:none}\n")();

const { userinfo } = store.state.account;
const { menusData } = store.state.menu;
const _sfc_main = {
  setup() {
    const { proxy } = getCurrentInstance();
    const listItem = ref(null);
    // const listItem = ref(null);
    let router = useRouter();
    let state = reactive({
      form: {
        companyId: [],
        state: '',
        name: '',
        labelName: '',
        size: 10,
        page: 1,
      },
      companyId: '',
      tenantCompany: [{}],
      total: 0,

      listData: [],
      dialogVisible: false,
      deleteData: {},
      sceneState: [
        {
          value: '',
          label: '全部',
        },
        {
          value: '0',
          label: '待处理',
        },
        {
          value: '1',
          label: '已处理',
        },
      ],
      searchObj: {},
      sceneSourceOption: [],
      userType: userinfo.userType,
      companyIds: [],
      menus: menusData,
      doData: {
        isCheck: false,
        isAdd: false,
        isDelete: false,
        isBatchExport: false,
        isEdit: false,
      },
      downLoadData: [],
    });
    // console.log(userinfo, 'userinfo')
    onMounted(() => {
      var pathName = '/applicationScenario';
      var doData = [];
      state.menus.map(item => {
        if (item.routing === pathName) {
          doData = item.children;
        }
      });
      doData.map(item => {
        switch (item.name) {
          case '查看':
            state.doData.isCheck = true;
            break
          case '新增':
            state.doData.isAdd = true;
            break
          case '删除':
            state.doData.isDelete = true;
            break
          case '批量导入':
            state.doData.isBatchExport = true;
            break
          case '编辑':
            state.doData.isEdit = true;
            break
        }
      });
    });
    const methods = {
      async getScenesPage() {
        if (state.companyId == '') {
          state.form.companyId = state.companyIds;
        } else {
          if (state.form.companyId != '') {
            state.form.companyId = [state.companyId];
          } else {
            state.form.companyId = [];
          }
        }
        let { data, code } = await getScenesPage(state.form);
        if (code === 1) {
          data.list.map(item => {
            item.isEdit = false;
            item.isDelete = false;
            if (item.uploadState === 1 && item.state === 1) {
              item.isEdit = true;
              item.isDelete = true;
            }
          });
          state.listData = data.list;
          state.total = data.total;
          // console.log(data.list, 222222)
        }
      },
      async getCompanyList() {
        let data = await getCompanyList();
        if (data.code === 1) {
          data.data.map(item => {
            state.sceneSourceOption.push(item);
          });
          state.sceneSourceOption.map(item => {
            state.companyIds.push(item.id);
          });
        }
      },
      async getCompanyInfoByuserCode() {
        let data = await getCompanyInfoByuserCode({
          userCode: userinfo.userCode,
        });
        if (data.code === 1) {
          state.sceneSourceOption.push(
            {
              companyName: '平台',
              id: 1,
            },
            {
              companyName: data.data.companyName,
              id: data.data.id,
            }
          );
        }
        state.sceneSourceOption.map(item => {
          state.companyIds.push(item.id);
        });
      },
      checkScene(item) {
        // 测试
        // router.push({
        //       name: 'sceneCheck',
        //       query: {
        //         code: item.code,
        //         source: 'edit',
        //       }
        //     })
        //     var a = 1
        //     if (a === 1) return
        const loadingInstance = ElLoading.service({
          lock: true,
          text: '下载中，请稍后~',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        var downloadData = [];
        UE.subscribe('UE2JS_HotFixMessage', obj => {
          console.log('UE2JS_HotFixMessage121', obj);
          let { data } = obj;
          if (data.length > 0) {
            data.map(val => {
              downloadData.push(val.modelCode);
            });
          }
          if (downloadData.includes(item.code)) {
            loadingInstance.close();
            router.push({
              name: 'sceneCheck',
              query: {
                code: item.code,
                source: 'edit',
              },
            });
          } else {
            UE.subscribe('UE2JS_DownLoadProgress', obj => {
            });
            UE.publish('CGX_DownLoadModel', { modelCode: item.code });
          }
        });
        UE.publish('CGX_HotFixMessage', {});
      },
      editScene(item) {
        var params = {};
        params.code = item.code;
        params.source = 'edit';
        if (state.userType === 0) {
          router.push({
            name: 'editScene',
            query: params,
          });
        } else {
          router.push({
            name: 'tenantEdit',
            params: {
              id: item.id,
              code: item.code,
            },
          });
          localStorage.setItem('tenantEditSceneItem', JSON.stringify(item));
        }
      },
      deleteClick(item) {
        state.dialogVisible = true;
        // ctx.deleteScene(item)
        state.deleteData = item;
      },
      async deleteScene() {
        // console.log(item, 222)
        var item = state.deleteData;
        let data = await deleteScenes({ code: item.code });
        if (data.code === 1) {
          ElMessage.success('删除成功');
          state.dialogVisible = false;
          proxy.getScenesPage();
        } else {
          ElMessage.error(data.msg);
        }
      },
      changeCurrent(size) {
        // console.log(size, ctx)
        state.form.page = size;
        proxy.getScenesPage();
      },
      addScene() {
        router.push({
          name: 'editScene',
          query: {
            source: 'add',
          },
        });
      },
      exportClick() {
        router.push({
          name: 'batchExport',
          query: {},
        });
      },
      searchClick() {
        proxy.getScenesPage();
        // console.log(state.form, scene)
        // scene.value.form = state.form
        // scene.value.getScenesPage()
      },
      toTb() {
        // window.location.href = 'http://172.16.13.194:4200/home?source=dt'
        window.open(
          'http://172.16.13.194:4200/home?token=Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0amdxIiwiY29tcGFueUlkIjoxOSwibW9iaWxlIjoiMTgzMTIzNDIyMjIiLCJ0ZW5hbnRJZCI6Ijc1MTFhMmIwLWVkZTAtMTFlYy1iNTBjLThiM2I5ZWNmMGRkZiIsInVzZXJUeXBlIjoxLCJleHAiOjE2NTU1MTg1NzMsInVzZXJJZCI6MjUsImVtYWlsIjoiMTgzMTIzQDE2My5jb20iLCJ1c2VyQ29kZSI6Ijg3NDU5ODA3LWZjZTktNGE1NC1iMzJhLWQ1MDQ1YTQ1MzlmMiIsInJlYWxuYW1lIjoi5ZCJ5p-c5p2DIn0.519GfwyPp3Rum5zC4HpuAYUH3BmugO_mD-RFm4YiWW8'
        );

        // http://172.16.13.194:3000/home?token=Bearer eyJhbGciOiJIUzI1NiJ9*eyJzdWIiOiJhZG1pbiIsImNvbXBhbnlJZCI6MSwibW9iaWxlIjoiMTgzMTIzNDEyMzQiLCJ0ZW5hbnRJZCI6bnVsbCwidXNlclR5cGUiOjAsImV4cCI6MTY1NzAxNDIwMywidXNlcklkIjoxLCJlbWFpbCI6IjE4MzEyMzQxMjM0QDE2My5jb20iLCJ1c2VyQ29kZSI6IjA1N2MxZDU4LTQxYTAtNGM4YS04NTBhLWRlMWQzZDc1NTEzNiIsInJlYWxuYW1lIjoiYWRtaW7lubPlj7DnrqHnkIblkZjnlKjmiLcifQ*q6ljLK-tNHzL5Y6_DWCkYQFqaVAP1g3NUkQl61xkyqQ
      },
    };
    return {
      ...toRefs(state),
      ...methods,
      listItem,
      // scene,
    }
  },
  methods: {},
  mounted() {
    this.getScenesPage();
    // console.log(userinfo, 33333)
    if (userinfo.userType === 0) {
      this.getCompanyList();
    } else {
      this.getCompanyInfoByuserCode();
    }
  },
  components: {
    // senceList,
    modelItem,
  },
  unmounted() {},
};


const _hoisted_1 = { class: "scene-list" };
const _hoisted_2 = {
  class: "scene-search",
  id: "search-id",
  ref: "search"
};
const _hoisted_3 = { class: "scene-search-left" };
const _hoisted_4 = { class: "scene-search-item" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("label", null, "场景来源", -1);
const _hoisted_6 = { class: "scene-search-item" };
const _hoisted_7 = /*#__PURE__*/createBaseVNode("label", null, "状态", -1);
const _hoisted_8 = { class: "scene-search-item" };
const _hoisted_9 = /*#__PURE__*/createBaseVNode("label", null, "场景名称", -1);
const _hoisted_10 = { class: "scene-search-item" };
const _hoisted_11 = /*#__PURE__*/createBaseVNode("label", null, "标签", -1);
const _hoisted_12 = { class: "scene-search-right" };
const _hoisted_13 = { class: "model-list" };
const _hoisted_14 = { class: "model-list-box" };
const _hoisted_15 = {
  class: "pagination",
  id: "pagination-scene"
};
const _hoisted_16 = /*#__PURE__*/createBaseVNode("div", { class: "dialog-content" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-box" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0,
      alt: ""
    }),
    /*#__PURE__*/createBaseVNode("span", null, "确认删除该场景？")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "confirm-tag" }, [
    /*#__PURE__*/createBaseVNode("span"),
    /*#__PURE__*/createBaseVNode("a", {
      href: "void(0)",
      class: "confirm-tag-detail"
    }, " 删除后平台租户不可再下载使用。 ")
  ])
], -1);
const _hoisted_17 = { class: "dialog-footer" };
const _hoisted_18 = /*#__PURE__*/createTextVNode(" 确认 ");
const _hoisted_19 = /*#__PURE__*/createTextVNode(" 取消 ");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_modelItem = resolveComponent("modelItem");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          createVNode(_component_el_select, {
            size: "small",
            class: "scene-select",
            "popper-class": "search-select",
            modelValue: _ctx.companyId,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.companyId) = $event)),
            placeholder: "请选择"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_option, {
                value: "",
                label: "全部"
              }),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sceneSourceOption, (item) => {
                return (openBlock(), createBlock(_component_el_option, {
                  key: item.id,
                  label: item.companyName,
                  value: item.id
                }, null, 8, ["label", "value"]))
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_6, [
          _hoisted_7,
          createVNode(_component_el_select, {
            size: "small",
            class: "scene-select",
            modelValue: _ctx.form.state,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.form.state) = $event)),
            clearable: "",
            "popper-class": "search-select",
            placeholder: "请选择"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sceneState, (item) => {
                return (openBlock(), createBlock(_component_el_option, {
                  key: item.value,
                  label: item.label,
                  value: item.value
                }, null, 8, ["label", "value"]))
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_8, [
          _hoisted_9,
          withDirectives(createBaseVNode("input", {
            class: "search-input",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.form.name) = $event)),
            placeholder: ""
          }, null, 512), [
            [vModelText, _ctx.form.name]
          ])
        ]),
        createBaseVNode("div", _hoisted_10, [
          _hoisted_11,
          withDirectives(createBaseVNode("input", {
            class: "search-input",
            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.form.labelName) = $event)),
            placeholder: ""
          }, null, 512), [
            [vModelText, _ctx.form.labelName]
          ])
        ]),
        createBaseVNode("div", {
          class: "search-button",
          onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.searchClick && _ctx.searchClick(...args)))
        }, "查询")
      ]),
      createBaseVNode("div", _hoisted_12, [
        withDirectives(createBaseVNode("span", {
          class: "add-scene",
          onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.addScene && _ctx.addScene(...args)))
        }, " 添加场景 ", 512), [
          [vShow, _ctx.doData.isAdd]
        ]),
        withDirectives(createBaseVNode("span", {
          class: "export-scene",
          onClick: _cache[6] || (_cache[6] = (...args) => (_ctx.exportClick && _ctx.exportClick(...args)))
        }, " 批量导入 ", 512), [
          [vShow, _ctx.doData.isBatchExport]
        ])
      ])
    ], 512),
    createBaseVNode("div", _hoisted_13, [
      createBaseVNode("div", _hoisted_14, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.listData, (item) => {
          return (openBlock(), createBlock(_component_modelItem, {
            listItem: item,
            source: "scene",
            class: "model-ul",
            key: item.id,
            onCheckScene: _ctx.checkScene,
            onEditScene: _ctx.editScene,
            onDeleteClick: _ctx.deleteClick,
            doData: _ctx.doData,
            ref_for: true,
            ref: "listItem"
          }, null, 8, ["listItem", "onCheckScene", "onEditScene", "onDeleteClick", "doData"]))
        }), 128))
      ])
    ]),
    createBaseVNode("div", _hoisted_15, [
      createBaseVNode("span", null, "总共" + toDisplayString(_ctx.total) + "条", 1),
      createVNode(_component_el_pagination, {
        class: "pagination-detail",
        background: "",
        layout: "prev, pager, next",
        total: _ctx.total,
        onCurrentChange: _ctx.changeCurrent
      }, null, 8, ["total", "onCurrentChange"])
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((_ctx.dialogVisible) = $event)),
      title: "删除确认",
      width: "640px",
      "custom-class": "delete-confirm-dialog",
      "before-close": _ctx.handleClose
    }, {
      footer: withCtx(() => [
        createBaseVNode("span", _hoisted_17, [
          createVNode(_component_el_button, {
            type: "primary",
            class: "dialog-footer-confirm",
            onClick: _ctx.deleteScene
          }, {
            default: withCtx(() => [
              _hoisted_18
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode(_component_el_button, {
            class: "dialog-footer-cancel",
            onClick: _cache[7] || (_cache[7] = $event => (_ctx.dialogVisible = false))
          }, {
            default: withCtx(() => [
              _hoisted_19
            ]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        _hoisted_16
      ]),
      _: 1
    }, 8, ["modelValue", "before-close"])
  ]))
}
var sceneList = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { sceneList as default };
