import { T as onMounted, q as onUnmounted, h as computed, l as ref, m as watch, A as ElLoading, o as openBlock, B as createElementBlock, G as createCommentVNode, L as Fragment, M as renderList, C as createBaseVNode, u as unref, I as withDirectives, a0 as vShow, J as normalizeStyle, O as toDisplayString } from './element-plus.da98f360.js';
import { _ as _imports_0$1 } from './icon-goback.f78cab21.js';
import { _ as _export_sfc, a as useRoute, u as useRouter, b as useStore, U as UE } from './index.acc4a696.js';
import { r as queryCaseDetails, n as getDashBoardList } from './drafts.60815a70.js';
import { q as queryCaseAnimations, a as queryCaseModelSubLevels } from './draftsAn.9a0a2b2e.js';
import { u as uniqObjInArr, r as rgba2Str } from './index.36626fcb.js';
import { u as useHotFix } from './useHotFix.6e3a57e1.js';
import './monaco-editor.e9574fd0.js';

var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAABocXPg9fh5g4UDiqlFAAAACnRSTlMAGi08RU0KcO94BHzxGAAAAKZJREFUeAFlkkEKwjAQRUdF127cC6JrETxCXWvtp3RXxCt4iBygkOPazjem4Q+U8h+TmZ+ZmMfiUDWXrf3jBY9T0ktqYE+9uSbw7B28kwZunlBl0Ewpq6yB8wiOc1CPJ+Ya6HPP1Hldgrvtpl/74Qc8WLMNQHRQG23GoQs0a7TVhTjQmv2KRSYACuSIFJW2Ykysy+Xk+jIgHaEMWdagi5JV6rKL5/AFWF6Mpwv0swwAAAAASUVORK5CYII=";

// import UE from '@/utils/ue'

var useListenMessage = cb => {
  const handleUrl = (url, data) => {
    const params = btoa(encodeURIComponent(JSON.stringify(data)));
    return `${url}?attachParams=${params}`
  };

  const fn = event => {
    if (!cb) return

    let { type, params, rootIn } = event.data;
    switch (type) {
      case 'test':
        console.log(type);
        console.log(params);
        console.log(rootIn);
        break
      case 'CGX_ShowGird':
      case 'CGX_ScreenShot':
      case 'CGX_ViewHide':
      case 'CGX_ViewLock':
      case 'CGX_ViewSelect':
      case 'CGX_SwitchView':
      case 'CGX_VRButtonClick':
      case 'Demo_Link':
        cb(event.data);
        // UE.publish(type, params)
        break
    }
  };

  onMounted(() => {
    window.addEventListener('message', fn);
  });

  onUnmounted(() => {
    window.removeEventListener('message', fn);
  });

  return { handleUrl }
};

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".drafts-detail-page[data-v-65c67af2]{position:relative;width:100vw;height:100vh}.drafts-detail-page>iframe[data-v-65c67af2]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1}.drafts-detail-page .dashboard[data-v-65c67af2]{position:fixed;z-index:10;background:linear-gradient(318deg,rgba(36,59,91,.7) 0%,rgba(39,77,130,.69) 100%);border-radius:.020833rem;border:1px solid;-o-border-image:linear-gradient(135deg,rgba(205,235,255,.56),rgba(160,200,255,.6)) 1 1;border-image:linear-gradient(135deg,rgba(205,235,255,.56),rgba(160,200,255,.6)) 1 1}.drafts-detail-page .dashboard iframe[data-v-65c67af2]{display:block;width:2.604167rem;height:1.666667rem}.drafts-detail-page .dashboard img[data-v-65c67af2]{position:absolute;top:.041667rem;right:.041667rem;width:.166667rem;height:.166667rem}.drafts-detail-page .navigations .nav[data-v-65c67af2]{position:fixed;z-index:100;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.drafts-detail-page .navigations .nav .img-wrap[data-v-65c67af2]{position:relative}.drafts-detail-page .navigations .nav .img-wrap img[data-v-65c67af2]{position:absolute;left:0;top:0;width:100%;height:100%}.drafts-detail-page .navigations .nav span[data-v-65c67af2]{margin-top:.052083rem;white-space:nowrap}.drafts-detail-page .icon-goback[data-v-65c67af2]{position:fixed;top:.083333rem;right:.166667rem;z-index:100;width:.25rem;height:.25rem}\n")();

const _hoisted_1 = { class: "drafts-detail-page" };
const _hoisted_2 = ["src"];
const _hoisted_3 = ["src"];
const _hoisted_4 = ["onMousedown"];
const _hoisted_5 = { class: "navigations" };
const _hoisted_6 = ["onMousedown"];
const _hoisted_7 = ["src"];

const _sfc_main = {
  __name: 'index',
  setup(__props) {

const { handleUrl } = useListenMessage();

const route = useRoute();
const router = useRouter();
const store = useStore();

const entities = computed(() => store.state.drafts.entities);
const navigations = computed(() => store.state.drafts.navigations);

let loading;
const caseId = ref('');
const from = ref('');
const caseDetails = ref({});
const panel = ref({});
caseId.value = route.query.id;
from.value = route.query.from;
const getDetail = async () => {
  let { data } = await queryCaseDetails({ caseId: caseId.value });
  caseDetails.value = data;
  store.commit('drafts/init', data);
};
const loadModel = data => {
  if (!Object.keys(data).length) return
  let {
    caseScene,
    entities,
    isLight,
    caseLighting,
    caseDynamicWeather,
    casePanel,
  } = data;
  UE.publish('CGX_Details', {
    entities: [caseScene, ...entities],
  });

  // 初始化灯光或天气
  UE.publish('JS2UE_SwitchLightAndWeather', {
    isLight,
  });
  if (isLight || !caseDynamicWeather) {
    let {
      lightColor,
      globalSaturationIntensity,
      globalContrastIntensity,
      globalGammaValue,
    } = caseLighting;
    let obj = {
      ...caseLighting,
      lightColor: rgba2Str(lightColor),
      globalSaturationIntensity: rgba2Str(globalSaturationIntensity),
      globalContrastIntensity: rgba2Str(globalContrastIntensity),
      globalGammaValue: rgba2Str(globalGammaValue),
    };
    UE.publish('CGX_LightParameterChange', obj);
  } else {
    UE.publish('JS2UE_WeatherControl', caseDynamicWeather);
  }

  // 数据面板
  if (!casePanel) return
  let { modelId } = casePanel;
  if (!modelId) return
  getDashBoard(modelId);
};
const getDashBoard = async modelId => {
  let { data } = await getDashBoardList({ id: modelId });
  if (!data.length) return
  let [dashBoard] = data;
  let { id, ...panelData } = dashBoard;
  dashBoard = {
    ...panelData,
    modelId: id,
    modelType: 2,
  };
  panel.value = dashBoard;
};
const back = () => {
  // entity.value = {}
  // router.replace(from.value)
  router.back();
};

// 模型绑定图表
const dashBoards = ref([]);

// 设置了始终显示图表模型
const originAlwayEnts = computed(() =>
  entities.value.filter(
    item => item.entityDashboardCode && item.dashboardShowState
  )
);
// 当前选中始终显示图表模型
const curAlwayEnts = ref([]);
watch(curAlwayEnts, entities => {
  UE.publish('JS2UE_AlwayShow', { entities });
});
// 当前显示的始终显示图表模型
const showAlwayEnts = ref([]);
// 当前选中非始终显示图表模型
const showEnts = ref({});
const getDashBoards = async modelId => {
  let { data } = await getDashBoardList({ panelUsage: 1 });
  dashBoards.value = data;
};
const closeDashBoard = (indexCode, idx) => {
  let index = curAlwayEnts.value.findIndex(item => item.indexCode == indexCode);
  if (index == -1) {
    showEnts.value = {};
  } else {
    let temp = [...curAlwayEnts.value];
    temp.splice(index, 1);
    curAlwayEnts.value = temp;
  }
  let temp = [...showAlwayEnts.value];
  temp.splice(idx, 1);
  showAlwayEnts.value = temp;

  UE.publish('CGX_ModelInteractionClose', {
    indexCode,
  });
};

const navTo = nav => {
  let { relatedCaseId } = nav;
  if (!relatedCaseId) return
  router.replace(`/preview?id=${relatedCaseId}`);
};

useHotFix(() => {
  loadModel(caseDetails.value);
  loading && loading.close();
});
onMounted(() => {
  getDashBoards();
  getDetail();

  loading = ElLoading.service({
    lock: true,
    text: '加载模型中',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  // 隐藏坐标轴
  // UE.publish('CGX_SetAxisPosition', {
  //   isShow: false,
  //   axisPostion: '500,1000',
  //   axisSize: '100,100',
  // })

  UE.subscribe('UE2JS_CompleteEditor', async () => {
    const [
      {
        data: { animations },
      },
      {
        data: { relations },
      },
    ] = await Promise.all([
      queryCaseAnimations({ caseId: caseId.value }),
      queryCaseModelSubLevels({ caseId: caseId.value }),
    ]);
    UE.publish('JS2UE_InitMechanismAnimation', { animations });
    UE.publish('JS2UE_InitRelationSubModel', { relations });
  });

  UE.subscribe('UE2JS_ModelInteraction', data => {
    // 点空白处
    if (!data) {
      if (showAlwayEnts.value.length && Object.keys(showEnts.value).length) {
        let { indexCode } = showEnts.value;
        let idx = showAlwayEnts.value.findIndex(
          item => item.indexCode == indexCode
        );
        let temp = [...showAlwayEnts.value];
        temp.splice(idx, 1);
        showAlwayEnts.value = temp;
      }
      showEnts.value = {};
      return
    }
    // 点非空白处
    let { indexCode } = data;
    let ent = entities.value.find(item => item.indexCode == indexCode);
    if (originAlwayEnts.value.some(item => item.indexCode == indexCode)) {
      curAlwayEnts.value = uniqObjInArr(
        [...curAlwayEnts.value, ent],
        'indexCode'
      );
    } else {
      showEnts.value = ent;
    }
  });

  UE.subscribe('UE2JS_ModelInteractionUpdate', data => {
    if (!data) return
    let { entities: ents } = data;
    if (!ents.length) return
    showAlwayEnts.value = ents.map(item => {
      let { screenPos, indexCode } = item;
      let [left, top] = screenPos.split(',');
      let pos = {
        left: +left - 250 + 'px',
        top: +top - 320 + 'px',
      };
      let ent = entities.value.find(item => item.indexCode == indexCode);
      let { entityDashboardCode, deviceCode } = ent;
      let dashBoard = {
        ...dashBoards.value.find(item => item.id == entityDashboardCode),
      };
      // 链接添加id
      if (Object.keys(dashBoard).length && deviceCode) {
        let { publicUrl } = dashBoard;
        dashBoard.publicUrl = handleUrl(publicUrl, {
          id: deviceCode,
        });
      }
      return { ...item, ...dashBoard, pos }
    });
  });

  UE.subscribe('CreateModel', data => {
    console.log('CreateModel', data);
  });

  window.addEventListener(
    'message',
    e => {
      if (e.data.type === 'CGX_ViewSelect') {
        UE.publish('CGX_GraphSelect', {
          indexCode: e.data.params.fieldValue.toUpperCase(),
          distanceBias: '700.0',
        });
      }
    },
    false
  );
});
onUnmounted(() => {
  // 若不清空，会直接unwatch并调用cb，导致不加载
  store.commit('drafts/destroyAll');
  UE.publish('DestroyAll', {});
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (Object.keys(panel.value).length && panel.value.publicUrl)
      ? (openBlock(), createElementBlock("iframe", {
          key: 0,
          src: panel.value.publicUrl,
          frameborder: "0"
        }, null, 8, _hoisted_2))
      : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(showAlwayEnts.value, (item, index) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: "dashboard",
        key: item.indexCode,
        style: normalizeStyle(item.pos)
      }, [
        createBaseVNode("iframe", {
          src: item.publicUrl,
          frameborder: "0"
        }, null, 8, _hoisted_3),
        createBaseVNode("img", {
          src: _imports_0,
          onMousedown: $event => (closeDashBoard(item.indexCode, index))
        }, null, 40, _hoisted_4)
      ], 4)), [
        [vShow, item.isShow && item.publicUrl]
      ])
    }), 128)),
    createBaseVNode("div", _hoisted_5, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navigations), (item) => {
        return (openBlock(), createElementBlock("div", {
          class: "nav",
          style: normalizeStyle({
          left: item.navigationToLeft + 'px',
          top: item.navigationToTop + 'px',
        }),
          key: item.navigationCode,
          onMousedown: $event => (navTo(item))
        }, [
          (item.pictureUrl)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "img-wrap",
                style: normalizeStyle({
            width: item.navigationWidth + 'px',
            height: item.navigationHeight + 'px',
          })
              }, [
                createBaseVNode("img", {
                  src: item.pictureUrl
                }, null, 8, _hoisted_7)
              ], 4))
            : createCommentVNode("", true),
          createBaseVNode("span", {
            style: normalizeStyle({ fontSize: item.fontSize + 'px', color: item.textColor })
          }, toDisplayString(item.navigationName), 5)
        ], 44, _hoisted_6))
      }), 128))
    ]),
    createBaseVNode("img", {
      class: "icon-goback",
      src: _imports_0$1,
      onMousedown: back
    }, null, 32)
  ]))
}
}

};
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-65c67af2"]]);

export { index as default };
