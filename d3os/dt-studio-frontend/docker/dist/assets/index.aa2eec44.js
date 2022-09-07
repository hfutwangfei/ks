import { u as useRouter, a as useRoute } from './index.acc4a696.js';
import { k as h } from './element-plus.da98f360.js';
import './monaco-editor.e9574fd0.js';

const _sfc_main = {
  setup() {
    const router = useRouter();
    const route = useRoute();
    router.replace(route.fullPath.replace(/^\/redirect/, ''));
  },
  render() {
    return h('div')
  },
};

export { _sfc_main as default };
