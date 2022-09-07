import { c as store, s as service } from './index.acc4a696.js';

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
const { userinfo } = store.state.account;
var userType = userinfo.userType;
var apiList = {
  getScenesPage:
    userType === 0
      ? `/api/scenes/getScenesPage`
      : `/api/scenes/getTenantScenesPage`,
  getScenesInfo:
    userType === 0
      ? `/api/scenes/getScenesInfo`
      : `/api/scenes/getTenantScenesInfo`,
  getLabelList: `/api/label/getLabelList`,
  createLabel:
    userType === 0 ? `/api/label/createLabel` : `/api/label/createLabel`,
  updateScenes:
    userType === 0
      ? `/api/scenes/updateScenes`
      : `/api/scenes/updateTenantScenes`,
  createScenes:
    userType === 0
      ? `/api/scenes/createScenes`
      : `/api/scenes/createTenantScenes`,
  // createScenes: `/api/scenes/createScenes`,
  getCompanyList: `/api/company/getCompanyList`,
  deleteScenes:
    userType === 0
      ? `/api/scenes/deleteScenes`
      : `/api/scenes/deleteTenantScenes`,
  batchCreateScenes:
    userType === 0
      ? `/api/scenes/batchCreateScenes`
      : `/api/scenes/batchCreateScenes`,
};
// tenant
// console.log(apiList, '222')
// 场景列表接口
const getScenesPage = data => {
  return service({
    url: apiList.getScenesPage,
    method: 'post',
    data,
  })
};
// 场景列表接口
const getScenesInfo = params => {
  return service({
    url: apiList.getScenesInfo,
    method: 'get',
    params: params,
  })
};
// 获取tags标签
const getLabelList = params => {
  return service({
    url: apiList.getLabelList,
    method: 'get',
    params: params,
  })
};
// 新建标签
const createLabel = data => {
  return service({
    url: apiList.createLabel,
    method: 'post',
    data,
  })
};
// 编辑详情提交
const updateScenes = data => {
  return service({
    url: apiList.updateScenes,
    method: 'post',
    data,
  })
};

// 新建标签
// export const createTenantScenes = data => {
//   return request({
//     url: apiList.createTenantScenes,
//     method: 'post',
//     data,
//   })
// }

// 上传图片
const uploadCommonFile = data => {
  return service({
    url: `/api/file/uploadCommonFile`,
    method: 'post',
    data,
  })
};
// 获取图片地址
const getDownUrl = params => {
  return service({
    url: `/api/file/getDownUrl`,
    method: 'get',
    params: params,
  })
};
// 创建应用场景
const createScenes = data => {
  return service({
    url: apiList.createScenes,
    method: 'post',
    data,
  })
};
// 获取组织列表
const getCompanyList = params => {
  return service({
    url: apiList.getCompanyList,
    method: 'get',
    params: params,
  })
};
// 删除场景
const deleteScenes = params => {
  return service({
    url: apiList.deleteScenes,
    method: 'delete',
    params: params,
  })
};
// 批量上传文件
const batchCreateScenes = data => {
  return service({
    url: apiList.batchCreateScenes,
    method: 'post',
    data,
  })
};
// 用户管理搜索组织列表
const getCompanyInfoByuserCode = params => {
  return service({
    url: '/api/company/getCompanyInfoByuserCode',
    method: 'get',
    params: params,
  })
};
// 获取ChunkId
const getChunkId = params => {
  return service({
    url: '/api/model/getChunkId',
    method: 'get',
    params: params,
  })
};

export { getChunkId as a, getScenesInfo as b, batchCreateScenes as c, getScenesPage as d, getCompanyList as e, getCompanyInfoByuserCode as f, getLabelList as g, deleteScenes as h, createLabel as i, getDownUrl as j, createScenes as k, updateScenes as l, uploadCommonFile as u };
