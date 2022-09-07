import { U as UE, c as store } from './index.acc4a696.js';
import { h as computed, l as ref, m as watch, T as onMounted } from './element-plus.da98f360.js';

var useHotFix = (cb, fn) => {
  const models = computed(() => store.state.app.models);
  const entities = computed(() => store.state.drafts.entities);
  const scene = computed(() => store.state.drafts.scene);

  const progressRef = ref(0);

  const unwatch = watch(
    [() => models.value, () => entities.value, () => scene.value],
    ([models, entities, scene]) => {
      // console.log('models', models)
      // console.log('entities', entities)
      // console.log('scene', scene)

      // 必有场景
      if (!Object.keys(scene).length) return

      let list = [scene, ...entities]
        .filter(item => item.modelId && item.modelId != -1)
        .map(item => item.modelId);
      let nset = [...new Set(list)];
      let batch = nset.filter(item => !models.some(m => m.modelCode == item));

      console.log('batch', batch);

      if (batch.length) {
        UE.publish('CGX_BatchDownLoad', { data: batch });
      } else {
        // 模型下载完成后加载模型并注销监听，否则继续编辑还会调用
        unwatch();
        progressRef.value = 100;
        cb();
      }
    }
  );

  onMounted(() => {
    UE.subscribe('UE2JS_HotFixMessage', obj => {
      // console.log('UE2JS_HotFixMessage', obj)
      let { data } = obj;
      store.commit('app/setModels', data);
    });

    UE.subscribe('UE2JS_BatchDownLoadProgress', obj => {
      console.log('UE2JS_BatchDownLoadProgress', obj);
      let { progress } = obj;
      progressRef.value = progress * 100;

      console.log(fn);
      if (fn) fn(progressRef.value);
    });

    UE.publish('CGX_HotFixMessage', {});
  });
};

export { useHotFix as u };
