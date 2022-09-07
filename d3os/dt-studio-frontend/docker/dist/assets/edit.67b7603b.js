import { _ as _export_sfc, u as useRouter, a as useRoute, b as useStore, U as UE, o as onBeforeRouteLeave } from './index.acc4a696.js';
import { a as uploadCommonFile, s as saveOrUpdate } from './drafts.60815a70.js';
import { q as queryCaseAnimations, a as queryCaseModelSubLevels, b as queryCaseSequences, s as saveCaseAnimations, c as saveCaseModelSubLevels, d as saveCaseSequences } from './draftsAn.9a0a2b2e.js';
import { d as dataURLtoFile } from './index.36626fcb.js';
import { h as computed, l as ref, m as watch, T as onMounted, q as onUnmounted, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, L as Fragment, M as renderList, Y as normalizeClass, O as toDisplayString, a as createVNode, w as withCtx, c as createBlock, b as resolveDynamicComponent, Z as KeepAlive, x as ElMessage, A as ElLoading } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var edit_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".tabs[data-v-2db2fdc7]{position:fixed;top:0;right:1.802083rem;display:-webkit-box;display:-ms-flexbox;display:flex}.tabs .tab__item[data-v-2db2fdc7]{margin-right:.166667rem;line-height:.3125rem}.tabs .tab__item[data-v-2db2fdc7]:last-child{margin-right:0}.tabs .tab__item span[data-v-2db2fdc7]{font-size:.072917rem;color:#fff9}.tabs .tab__item span.active[data-v-2db2fdc7]{color:#fff}\n")();

const _hoisted_1 = { class: "tabs" };
const _hoisted_2 = ["onClick"];


const _sfc_main = {
  __name: 'edit',
  setup(__props) {

const router = useRouter();
const route = useRoute();
const store = useStore();

const caseId = computed(() => store.state.drafts.caseId);
const caseData = computed(() => store.state.drafts.caseData);
const caseLabels = computed(() => store.state.drafts.caseLabels);
const entities = computed(() => store.state.drafts.entities);
const scene = computed(() => store.state.drafts.scene);
const panel = computed(() => store.state.drafts.panel);
const caseLighting = computed(() => store.state.drafts.caseLighting);
const caseDynamicWeather = computed(() => store.state.drafts.caseDynamicWeather);
const outlineViews = computed(() => store.state.drafts.outlineViews);
const pathList = computed(() => store.state.drafts.pathList);
const pathObj = computed(() => store.state.drafts.pathObj);
const snapshots = computed(() => store.state.drafts.snapshots);
const datasource = computed(() => store.state.drafts.datasource);
const navigations = computed(() => store.state.drafts.navigations);
const animations = computed(() => store.state.draftsAn.animations);
const relations = computed(() => store.state.draftsAn.relations);
const sequences = computed(() => store.state.draftsAn.sequences);

store.commit('drafts/setCaseId', route.query.id || null);

const activeTab = ref('/drafts/edit/scene');
const tabs = ref([
  {
    label: '场景编辑器',
    path: '/drafts/edit/scene',
  },
  {
    label: '任务编辑器',
    path: '/drafts/edit/animation',
  },
  {
    label: '时序编辑器',
    path: '/drafts/edit/process',
  },
]);
const tabChange = tab => {
  let { path } = tab;
  if (caseId.value) path += `?id=${caseId.value}`;
  console.log(caseId, 'caseId');
  router.replace(path);
  UE.publish('JS2UE_DeSelectAll', {});
};
watch(
  route,
  route => {
    let { path } = route;
    activeTab.value = path;
  },
  {
    immediate: true,
  }
);

// 场景、动画、时序统一保存
// 1.保存场景获取caseId
// 2.保存动画、时序
const save = () => {
  // console.log('场景、动画、时序统一保存')
  // 触发保存场景
  UE.publish('CGX_SaveOrPulish', {});
};
// 保存场景
const submit = async sourceData => {
  let { caseName, caseDesc } = caseData.value;
  if (!Object.keys(scene.value).length) {
    return ElMessage.error('请选择场景')
  }
  if (!caseName) {
    return ElMessage.error('请输入案例名称')
  }
  if (!caseDesc) {
    return ElMessage.error('请输入案例描述')
  }
  // 巡检路线未应用就保存
  if (Object.keys(pathObj.value).length && !pathObj.value.pathEntities) {
    return ElMessage.error('请先保存当前路线配置')
  }

  let { pngData, entities: ents } = sourceData;

  // 在UE数据基础上添加本地数据
  const filterEntities = list => {
    list.forEach(item => {
      let model = entities.value.find(e => e.indexCode === item.indexCode);
      if (model) {
        let {
          entityCode,
          entityName,
          deviceCode,
          entityDashboardCode,
          dashboardShowState,
        } = model;
        // item = {
        //   ...item,
        //   entityCode,
        //   entityName,
        //   deviceCode,
        //   entityDashboardCode,
        //   dashboardShowState,
        // }
        item.entityCode = entityCode;
        item.entityName = entityName;
        item.deviceCode = deviceCode;
        item.entityDashboardCode = entityDashboardCode;
        item.dashboardShowState = dashboardShowState;
      } else if (item.children && item.children.length) {
        filterEntities(item.children);
      }
    });
  };
  filterEntities(ents);

  let sIndex = ents.findIndex(item => item.modelType == 1);
  let [caseScene] = ents.splice(sIndex, 1);
  let file = dataURLtoFile(
    `data:image/png;base64,${pngData}`,
    `${Date.now()}.png`
  );
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  let { data } = await uploadCommonFile(file);
  loading.close();
  let obj = {
    ...caseData.value,
    caseLighting: caseLighting.value,
    caseDynamicWeather: caseDynamicWeather.value,
    caseLabels: caseLabels.value,
    caseScene,
    casePanel:
      Object.keys(panel.value).length && panel.value.publicUrl
        ? panel.value
        : null,
    entities: ents,
    outlineViews: outlineViews.value,
    routes: pathList.value,
    snapshots: snapshots.value,
    publishState: 0,
    imageUrl: data.downloadUrl,
    datasourceId: datasource.value.id,
    navigations: navigations.value,
  };
  if (caseId.value) obj.id = caseId.value;
  console.log('saveOrUpdate', obj);
  let { data: _caseId } = await saveOrUpdate(obj);
  store.commit('drafts/setCaseId', _caseId);
  // cancel()
  await Promise.all([saveAnimations(), saveTime()]);
  ElMessage.success('保存成功');
  // router.replace('/drafts')
};
// 获取动画、关联、时序
const getAnimations = async () => {
  const [
    {
      data: { animations },
    },
    {
      data: { relations },
    },
    { data: sequences },
  ] = await Promise.all([
    queryCaseAnimations({ caseId: caseId.value }),
    queryCaseModelSubLevels({ caseId: caseId.value }),
    queryCaseSequences({ caseId: caseId.value }),
  ]);
  store.commit('draftsAn/init', { animations, relations, sequences });
};
// 场景加载完加载动画
const complete = bol => {
  UE.publish('JS2UE_InitMechanismAnimation', { animations: animations.value });
  // console.log(bol)
  bol &&
    UE.publish('JS2UE_InitRelationSubModel', { relations: relations.value });
};
// 保存动画、关联
const saveAnimations = () => {
  // console.log(animations.value)
  // console.log(relations.value)
  animations.value.forEach(model => {
    model.animations.forEach(ani => {
      ani.stateEntities = ani.stateEntities.map((state, index) => ({
        ...state,
        serialNo: index,
      }));
    });
  });
  saveCaseAnimations({
    caseId: caseId.value,
    animations: animations.value,
  });
  saveCaseModelSubLevels({
    caseId: caseId.value,
    relations: relations.value,
  });
};
// 保存时序
const saveTime = () => {
  saveCaseSequences({
    caseId: caseId.value,
    sequences: sequences.value,
  });
};
onMounted(() => {
  console.log('edit onMounted');
  // store.dispatch('tags/addTag', route)

  if (caseId.value) {
    getAnimations();
  }

  // 保存场景
  UE.subscribe('SaveOrPulish', data => {
    submit(data);
  });

  UE.subscribe('UE2JS_InitRelationSubModel', () => {
    UE.publish('JS2UE_InitRelationSubModel', { relations: relations.value });
  });
});

onUnmounted(() => {
  console.log('edit onUnmounted');
  UE.publish('DestroyAll', {});
  UE.publish('JS2UE_SetGlobalState', {
    currentState: 'NULL',
  });
  // 隐藏坐标轴
  UE.publish('CGX_SetAxisPosition', {
    isShow: false,
    axisPostion: '500,1000',
    axisSize: '100,100',
  });
});

onBeforeRouteLeave(() => {
  // 若不清空，会直接unwatch并调用cb，导致不加载
  // 1.子路由间需共享状态
  // 2.子路由间切换会调用父路由onUnmounted，因为外层router-view key
  // 3.子路由间切换不会调用父路由onBeforeRouteLeave
  store.commit('drafts/destroyAll');

  store.commit('draftsAn/destroyAll');
});

return (_ctx, _cache) => {
  const _component_router_view = resolveComponent("router-view");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab, index) => {
        return (openBlock(), createElementBlock("div", {
          class: "tab__item",
          key: index,
          onClick: $event => (tabChange(tab))
        }, [
          createBaseVNode("span", {
            class: normalizeClass({ active: activeTab.value == tab.path })
          }, toDisplayString(tab.label), 3)
        ], 8, _hoisted_2))
      }), 128))
    ]),
    createVNode(_component_router_view, null, {
      default: withCtx(({ Component }) => [
        (openBlock(), createBlock(KeepAlive, null, [
          (openBlock(), createBlock(resolveDynamicComponent(Component), {
            onSave: save,
            onComplete: complete
          }, null, 32))
        ], 1024))
      ]),
      _: 1
    })
  ], 64))
}
}

};
var edit = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2db2fdc7"]]);

export { edit as default };
