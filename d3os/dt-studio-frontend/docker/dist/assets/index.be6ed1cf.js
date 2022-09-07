import { h as computed, l as ref, r as resolveComponent, o as openBlock, B as createElementBlock, I as withDirectives, a0 as vShow, a as createVNode, u as unref, a7 as isRef, a1 as withKeys, C as createBaseVNode, O as toDisplayString, L as Fragment, n as nextTick } from './element-plus.da98f360.js';
import { _ as _export_sfc } from './index.acc4a696.js';

var index_vue_vue_type_style_index_0_scoped_true_lang = /* #__PURE__ */ (() => ".t-slider[data-v-341597a6]{position:relative;width:100%}.t-slider[data-v-341597a6] .el-slider .el-slider__runway{height:100%;background:rgb(34,37,44)}.t-slider[data-v-341597a6] .el-slider .el-slider__runway .el-slider__bar{height:100%;background:#385684}.t-slider[data-v-341597a6] .el-slider .el-slider__runway .el-slider__button-wrapper{display:none}.t-slider__text[data-v-341597a6]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);pointer-events:none}\n")();

const _hoisted_1 = { class: "t-slider__text" };


const _sfc_main = {
  __name: 'index',
  props: {
  modelValue: {
    type: Number,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  unit: String,
},
  emits: ['update:modelValue', 'input', 'change'],
  setup(__props, { emit: $emit }) {

const props = __props;

/**
 * 滑块组件，双击可输入
 * props: modelValue min max unit
 * events: change
 */

// const $attrs = useAttrs()


const sliderValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    $emit('update:modelValue', value);
  },
});

const inputShow = ref(false);
const inputRef = ref();
const dblclick = () => {
  if (props.disabled) return
  inputShow.value = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const input = value => {
  // $attrs.onInput(value)
  $emit('input', value);
};
const change = value => {
  // $attrs.onChange(value)
  $emit('change', value);
};

return (_ctx, _cache) => {
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_slider = resolveComponent("el-slider");

  return (openBlock(), createElementBlock(Fragment, null, [
    withDirectives(createVNode(_component_el_input_number, {
      ref_key: "inputRef",
      ref: inputRef,
      modelValue: unref(sliderValue),
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(sliderValue) ? (sliderValue).value = $event : null)),
      min: __props.min,
      max: __props.max,
      controls: false,
      onBlur: _cache[1] || (_cache[1] = $event => (inputShow.value = false)),
      onKeyup: _cache[2] || (_cache[2] = withKeys($event => (inputShow.value = false), ["enter"])),
      onChange: change
    }, null, 8, ["modelValue", "min", "max"]), [
      [vShow, inputShow.value]
    ]),
    withDirectives(createBaseVNode("div", {
      class: "t-slider",
      onDblclick: dblclick
    }, [
      createVNode(_component_el_slider, {
        modelValue: unref(sliderValue),
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (isRef(sliderValue) ? (sliderValue).value = $event : null)),
        min: __props.min,
        max: __props.max,
        step: __props.step,
        disabled: __props.disabled,
        onInput: input,
        onChange: change
      }, null, 8, ["modelValue", "min", "max", "step", "disabled"]),
      createBaseVNode("span", _hoisted_1, toDisplayString(unref(sliderValue)) + toDisplayString(__props.unit), 1)
    ], 544), [
      [vShow, !inputShow.value]
    ])
  ], 64))
}
}

};
var TSlider = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-341597a6"]]);

export { TSlider as T };
