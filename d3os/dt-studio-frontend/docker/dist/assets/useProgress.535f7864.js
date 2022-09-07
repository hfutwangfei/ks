import { c as store, U as UE } from './index.acc4a696.js';
import { h as computed, l as ref, m as watch, T as onMounted } from './element-plus.da98f360.js';

var useProgress = (key, list, cb) => {
  const models = computed(() => store.state.app.models);

  const progressRef = ref({});

  const listRef = ref({});
  listRef.value[key] = list;

  watch(
    [listRef, () => models.value, progressRef],
    ([listObj, models, progressObj]) => {
      // console.log('list1', listObj)
      // console.log('models', models)
      // console.log('progressRef', progressObj)

      listObj[key].forEach(item => {
        let progress = 0;
        if (progressObj[item.code]) {
          progress = progressObj[item.code];
        }
        if (models.some(m => m.modelCode === item.code)) {
          progress = 100;
        }
        item.progress = progress;
      });

      // console.log('list2', listObj)
    },
    {
      deep: true,
    }
  );

  onMounted(() => {
    UE.subscribe('UE2JS_DownLoadProgress', obj => {
      let { data } = obj;
      data.forEach(item => {
        let { modelCode, progress } = item;
        progressRef.value[modelCode] = progress * 100;
      });
      // console.log('UE2JS_DownLoadProgress', progressRef.value)
    });
  });

  const handle = model => {
    // console.log(model)
    let { progress, code } = model;
    if (progress === 0) {
      UE.publish('CGX_DownLoadModel', { modelCode: code });
    }
    if (progress === 100) {
      cb(model);
    }
  };

  return handle
};

export { useProgress as u };
