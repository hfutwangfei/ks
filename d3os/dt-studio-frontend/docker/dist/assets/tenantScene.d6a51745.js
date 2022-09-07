import { s as service } from './index.acc4a696.js';
import './sceneList.b22bf172.js';

/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-30 09:08:30
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

const getTenantScenesInfo = params => {
  return service({
    url: `/api/scenes/getTenantScenesInfo`,
    method: 'get',
    params,
  })
};
const createTenantScenes = data => {
  return service({
    url: `/api/scenes/createTenantScenes`,
    method: 'post',
    data,
  })
};
const removeTenantScene = params => {
  return service({
    url: `/api/scenes/deleteTenantScenes`,
    method: 'delete',
    params,
  })
};
const updateTenantScenes = data => {
  return service({
    url: `/api/scenes/updateTenantScenes`,
    method: 'post',
    data,
  })
};

//创建标签
const createLabel = data => {
  return service({
    url: `/api/label/createLabel`,
    method: 'post',
    data,
  })
};

// 批量上传租户应用场景
const batchCreateTenantScenes = data => {
  return service({
    url: `/api/scenes/batchCreateTenantScenes`,
    method: 'post',
    data,
  })
};

export { createLabel as a, batchCreateTenantScenes as b, createTenantScenes as c, getTenantScenesInfo as g, removeTenantScene as r, updateTenantScenes as u };
