import { _ as _export_sfc, u as useRouter, a as useRoute, b as useStore, U as UE } from './index.acc4a696.js';
import { j as reactive, h as computed, v as onActivated, t as onDeactivated, T as onMounted, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, L as Fragment, M as renderList, c as createBlock, W as pushScopeId, X as popScopeId, $ as getCurrentInstance } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

var _playImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAANlBMVEX///////////////////////////////9HcEz////////////////////////////////////d4/HTAAAAEXRSTlNN1GDjVY2vZwDwxOR/b3gNRxMtLJwAAAD+SURBVHgB7dXbjoQgDAZgKIdaT/C//8suu8k6OBqBXtuEZGaYT6BANVPKxINBOU0mDbM/mkxmMsNBnEsbd8aU0VgH+YUvvO3Zol1EFhu3IRgcjnChG7IFJK7sPa9RAMt9cBdINUooX/ceuAOzr3/wM7C3IQvi9/MjhJvQYr7mYoZtwQDxV+gFoQHd5x/1SgPcM9wgx2e4qkuwPcJYZaZsfrjtuIMWaw0/G7Oe03OBDnyCx3QZyyMU+DP8n66vFt8HpQ8u2qmqk6PeDvUBUB85/SFXXyv9RVaXDn2x0pdHfUH+DeUroBkvfCHpIJlc2nAQZ5OIFUHJTCkPU8pp+gEl3xjh1dxZIAAAAABJRU5ErkJggg==";

var _stopImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4BAMAAABaqCYtAAAAMFBMVEVHcEz///////////////////////////////////////////////////////////9EPuwCAAAAEHRSTlMADU1hZ2+v0ej0f//XVZLI9OC9HgAAAPRJREFUeAHt1bFqg0AYB/DrGxT6BqcWObCl0qWrvbWLa7cuhbp36eZWbswSku2GQB4g5sJJXsBNsgeyZsseiDHIwXfeB+5+iAo/FP3uf3fkzuOOiu/Jg8s4fyF+TB3lJeTVZZS+E+5GPiLA4Pt/+pv2IxO6KSX70KvUz8duIcq4B5fqcL08iZmNTJ9vN3udWvhWdA9kEwurU4fPJUSm6g4jIQGG2+ak24Mec4CfucFwBTD7MvhYAPyTBtkaoEgM+grgvDYYbYYg+lr0g9BfQZuAtg9tPDpk+GAHJiZyWMDwaKKhxqeDVSO2iC7G6DKObgDY1nEBI0I0ybDptwEAAAAASUVORK5CYII=";

var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAXVBMVEUhNWGTnrNbaoorP2m1vMq5wM5zf5xHcEy9w8+qs8M2SHCyusmJlq2NmLBGWHyEl6+ss8SGlKyXobXf4uiQm7CgqrvFytXR1d/6+/zo6u+UnbF3g56epbqNmK/////fKdd1AAAAHnRSTlOAgIKBv3+AAIB4gX01QIMNuiRc30dpytT756yeZKl/fChvAAAEW0lEQVR4AbWVW2LqMAxE7bhy5FdMUkIfUPa/zCsH2gKN5ZD46qcflDnIM5JEu6hiH4bRGOMAHP0Zh9DHZd9cAIh+MDhTZvBxOyDuJ3GQUjedtUoIZW3XaClhguzjJoAfSQak7sRMdTpBYPSrASH9eNmoOfVLqUamNsIqQHobp60olNIuvdTTAE/yphGLqkn/658CxNNy+W/EKS4HBIegxVOlAV1YChjIWvucvhCW7B4WAXqD0DwrP70ToOnLgN6h6dbo02AYdH0J4AGlWqdPkZUIngcEQL1WfhoKhMABAm7Sp9KIIQ/w237/lXD/SreAvoL+ROjnAZSfCvrJh9ss3QAMygr6U5bMHGBAo6oAhDI3M/0DCAhdHX2aOPiN0jcgOmxq6dPWQBcfAKdKBlxL4uke4BFsTYAF9HcAUyWhN6W/k3QB7NHU1RfC4P4GYGo6fKnm2sIECIUGdp+rWgg/gEIDu/P5c3ULCeDRFfTPrytacFOQEmBkIzTpr1kiGscLIALa/6AvFEKcAHtuiNfrp3HeTwDO4i36F5tFGxEUp//x8rd2n8cFq1cBRgL4/Asl/Wx9vBSHU1KOBB0avQpAdSi0oenwCLKgYy2Ye6LD2+t7IrzvWEBHJgiygPmXvMn26y0h3tgEkAmi5y8NF6PjRyFjdP57EQqnjA3qIfXAfFliEEPp1LCE9CHjA7ksxuIpYJcd9fCeD0mDo+BCtGRdkw+H7IcUIwKUrz13cI7UX/YN7EIAW5TWFw7gUG0DfNEs5j5TdMoAt+kLSzOdtZGmeDNAvJ7PRwaw+YmSCZ/ME202OY1CbtaqpKgM6P7fE6VBK6+KUjEmp1VRXHal4mKall1pXReLG7S0rvutAG5VpIPDn8xyscsO6WS222KkuHU9Hf12m8vswSGPCeC3mMCfTImeAGTC2m2k+KOvACMByISVo3ak9z+/5n9dQxYkwH7VG9kvyif9fqZ7ifsJECG373YvmTq8vdL8kr877icgxAnQjrkcTSJMHdiAaxzbC8DTWXge8PFSsM5Qhi6ArM3ZJ9p9HovTOVl8BQRa29XLYPgBrE9qsYErYF+/BZMy+gOgFnRdfX1t4BvgEWxNfQtThH4B7Wnr3bkviaf2HhBdTZ8bdPEBQFGFrpZ+B5eI3gHo8BhVR18ZOjR/AZSkSjbI7wQ9AHpXJ6saXT8LaHuoQdAIN/p3gNZXIJC+v9W8A1CUthI0/gZoBtCGjT3Q77/XfwSkV5Kr06rkw/vMAFKWzMqJ68xdfjKAtjcIq7ZGA2j+6M8A0kyjfHq3Wok388sD2uAQnvRaA7owpzULaOMJ0TzxTo1BPMVZqXkApcksRyR54zNCOQDdafqa00UvrHYkv8/K5AFkBSFQNsxYqIasRRMYEQ5ADzUCIkg9OxidlunT0bMSPIDsTi+VGpG66aylbpS1XaNlEkcw+1gQKAESww8XyEOZwcfytxcAJkgfhtEY4wAc/RmH0Mdl3/wH/Z53iDXuk74AAAAASUVORK5CYII=";

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".priview-play[data-v-a7d4eb28]{width:100%;height:100%;position:relative}.priview-play .btn-box[data-v-a7d4eb28]{width:100%;position:absolute;bottom:.21875rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.priview-play .btn-box .btn-box-dom[data-v-a7d4eb28]{width:90%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.priview-play .btn-box .btn-box-dom .process-bar-box[data-v-a7d4eb28]{width:8.333333rem;height:.03125rem;background:rgba(255,255,255,.3);margin:0 .104167rem;position:relative;overflow:hidden}.priview-play .btn-box .btn-box-dom .process-bar-box span[data-v-a7d4eb28]{position:absolute;left:0;top:0;display:inline-block;height:.03125rem;background:#428fff}.priview-play .btn-box .btn-box-dom .img-box[data-v-a7d4eb28]{width:.145833rem;height:.145833rem}.priview-play .btn-box .btn-box-dom .img-box img[data-v-a7d4eb28]{width:100%;height:100%}.priview-play .time-select[data-v-a7d4eb28]{background:#333}.priview-play .time-select .select-trigger[data-v-a7d4eb28]{border:1px solid}.priview-play .time-select .select-trigger input[data-v-a7d4eb28],.priview-play .time-select[data-v-a7d4eb28] .el-input{height:.145833rem}.priview-play .time-select[data-v-a7d4eb28] .el-scrollbar{background:#373b48}.priview-play .time-select .new-build[data-v-a7d4eb28]{color:#fff!important;font-size:.0625rem}.priview-play .back-page[data-v-a7d4eb28]{width:.25rem;height:.25rem;position:absolute;right:.25rem;top:.166667rem}.priview-play .back-page img[data-v-a7d4eb28]{width:100%;height:100%}.select-class[data-v-a7d4eb28]{background:#373b48}.select-class .el-select-dropdown__item.selected[data-v-a7d4eb28]{color:#428fff}\n")();

const _sfc_main = {
  emits: ['complete'],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    // eslint-disable-next-line no-unused-vars
    useStore();

    const { proxy } = getCurrentInstance();

    let state = reactive({
      sceneSequenceId: '',
      speedList: [
        {
          speedName: '倍速0.5倍',
          speed: 0.5,
        },
        {
          speedName: '倍速1倍',
          speed: 1,
        },
        {
          speedName: '倍速1.5倍',
          speed: 1.5,
        },
        {
          speedName: '倍速2倍',
          speed: 2,
        },
      ],
      speedValue: 1,
      spanWidth: 0,
      isPlay: false,
    });
    const playImg = computed(() => {
      return state.isPlay ? _stopImg : _playImg
    });

    const methods = {
      modelPlay() {
        state.isPlay = true;
        let params = {
          sceneSequenceId: state.sceneSequenceId,
          isReplay: true,
        };
        UE.publish('JS2UE_SetSequenceCallBack', {
          isEnable: true,
        });
        UE.publish('JS2UE_SceneSequencePreviewPlayback', params);
      },
      toggleClick() {
        UE.publish('JS2UE_SetSequenceCallBack', {
          isEnable: !state.isPlay,
        });
        if (state.isPlay) {
          UE.publish('JS2UE_SceneSequencePause', {
            sceneSequenceId: state.sceneSequenceId,
          });
        } else {
          let params = {
            sceneSequenceId: state.sceneSequenceId,
            isReplay: false,
          };
          UE.publish('JS2UE_SceneSequencePreviewPlayback', params);
        }
        state.isPlay = !state.isPlay;
      },
      speedChange() {
        let params = {
          sceneSequenceId: state.sceneSequenceId,
          playSpeed: state.speedValue,
        };
        UE.publish('JS2UE_SceneSequencePlaySpeed', params);
      },
      backPage() {
        emit('complete', true);

        router.push({
          name: 'DraftsEditProcess',
        });
      },
    };

    onActivated(() => {
      state.sceneSequenceId = route.query.sceneSequenceId;
      proxy.modelPlay();
    });
    onDeactivated(() => {
      // 通知停止播放
      UE.publish('JS2UE_SceneSequenceStop', {
        sceneSequenceId: state.sceneSequenceId,
      });
      UE.publish('JS2UE_SetSequenceCallBack', {
        isEnable: false,
      });
    });
    onMounted(() => {
      UE.subscribe('UE2JS_GetSceneSequenceProcess', data => {
        let { sequenceStateEntity } = data;
        let sceneSequence = sequenceStateEntity.find(
          item => item.sceneSequenceId == state.sceneSequenceId
        );
        console.log(sequenceStateEntity);
        console.log(sceneSequence);
        // state.spanWidth = sceneSequence * 100
      });
      UE.subscribe('UE2JS_SceneSequenceComplete', data => {
        // let { sceneSequenceId } = data
        console.log('播放完成');
        state.isPlay = false;
        UE.publish('JS2UE_SetSequenceCallBack', {
          isEnable: false,
        });
      });
    });

    return {
      ...toRefs(state),
      playImg,
      ...methods,
    }
  },
};


const _withScopeId = n => (pushScopeId("data-v-a7d4eb28"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "priview-play" };
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("img", { src: _imports_0 }, null, -1));
const _hoisted_3 = [
  _hoisted_2
];
const _hoisted_4 = { class: "btn-box" };
const _hoisted_5 = { class: "btn-box-dom" };
const _hoisted_6 = ["src"];

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: "back-page",
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.backPage && _ctx.backPage(...args)))
    }, _hoisted_3),
    createBaseVNode("div", _hoisted_4, [
      createBaseVNode("div", _hoisted_5, [
        createBaseVNode("div", {
          class: "img-box",
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.toggleClick && _ctx.toggleClick(...args)))
        }, [
          createBaseVNode("img", { src: $setup.playImg }, null, 8, _hoisted_6)
        ]),
        createVNode(_component_el_select, {
          size: "small",
          class: "time-select",
          "popper-class": "select-class time-select",
          modelValue: _ctx.speedValue,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.speedValue) = $event)),
          placeholder: "请选择",
          onChange: _ctx.speedChange
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.speedList, (item, index) => {
              return (openBlock(), createBlock(_component_el_option, {
                label: item.speedName,
                value: item.speed,
                key: index
              }, null, 8, ["label", "value"]))
            }), 128))
          ]),
          _: 1
        }, 8, ["modelValue", "onChange"])
      ])
    ])
  ]))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-a7d4eb28"]]);

export { index as default };
