import { s as service } from './index.acc4a696.js';

/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 09:36:55
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
const createTenantModel = data => {
  return service({
    url: `/api/model/createTenantModel`,
    method: 'post',
    data,
  })
};
const removeTenantModel = params => {
  return service({
    url: `/api/model/deleteTenantModel`,
    method: 'delete',
    params,
  })
};
const updateTenantModel = data => {
  return service({
    url: `/api/model/updateTenantModel`,
    method: 'post',
    data,
  })
};

const getTenantModelInfo = params => {
  return service({
    url: `/api/model/getTenantModelInfo`,
    method: 'get',
    params,
  })
};

//批量导入租户模型
const batchCreateTenantModel = data => {
  return service({
    url: `/api/model/batchCreateTenantModel`,
    method: 'post',
    data,
  })
};
//保存模型构件信息
const saveModelmemberInfo = data => {
  return service({
    url: `/api/model-member-info/saveModelmemberInfo`,
    method: 'post',
    data,
  })
};

//保存模型构件信息
const getModelmemberInfo = params => {
  return service({
    url: `/api/model-member-info/getModelmemberInfo`,
    method: 'get',
    params,
  })
};

export { getModelmemberInfo as a, batchCreateTenantModel as b, createTenantModel as c, getTenantModelInfo as g, removeTenantModel as r, saveModelmemberInfo as s, updateTenantModel as u };
