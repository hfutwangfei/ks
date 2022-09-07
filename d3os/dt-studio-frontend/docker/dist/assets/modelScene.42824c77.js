import { c as store, s as service } from './index.acc4a696.js';

const { userinfo } = store.state.account;
var userType = userinfo.userType;
var apiList = {
  getModelPage:
    userType === 0
      ? `/api/model/getModelPage`
      : `/api/model/getTenantModelPage`,
  getAllFieldList: `/api/field/getAllFieldList`,
  createModel:
    userType === 0 ? `/api/model/createModel` : `/api/model/createTenantModel`,
  deleteModel:
    userType === 0 ? `/api/model/deleteModel` : `/api/model/deleteTenantModel`,
  getModelInfo:
    userType === 0
      ? `/api/model/getModelInfo`
      : `/api/model/getTenantModelInfo`,
  updateModel:
    userType === 0 ? `/api/model/updateModel` : `/api/model/updateTenantModel`,
  getBrandList: `/api/brand/getBrandList`,
};
// 模型列表接口
const getModelPage = data => {
  return service({
    url: apiList.getModelPage,
    method: 'post',
    data,
  })
};
// 场景列表接口
const getAllFieldList = params => {
  return service({
    url: apiList.getAllFieldList,
    method: 'get',
    params: params,
  })
};
// 创建模型
const createModel = data => {
  return service({
    url: apiList.createModel,
    method: 'post',
    data,
  })
};
// 场景列表接口
const deleteModel = params => {
  return service({
    url: apiList.deleteModel,
    method: 'DELETE',
    params: params,
  })
};

// 模型详情信息
const getModelInfo = params => {
  return service({
    url: apiList.getModelInfo,
    method: 'get',
    params: params,
  })
};

// 编辑模型信息
const updateModel = data => {
  return service({
    url: apiList.updateModel,
    method: 'post',
    data,
  })
};
// 获取品牌厂家列表
const getBrandList = params => {
  return service({
    url: apiList.getBrandList,
    method: 'get',
    params: params,
  })
};
// 编辑模型信息
const batchCreateModel = data => {
  return service({
    url: '/api/model/batchCreateModel',
    method: 'post',
    data,
  })
};

// 获取待处理模型列表
const getModelPendingPage = data => {
  return service({
    url: '/api/model/getModelPendingPage',
    method: 'post',
    data,
  })
};

// 获取待处理模型列表对比数据
const getModelComparedInfo = data => {
  return service({
    url: '/api/model/getModelComparedInfo',
    method: 'post',
    data,
  })
};
// 获取待处理模型提交
const batchDealWithModel = data => {
  return service({
    url: '/api/model/batchDealWithModel',
    method: 'post',
    data,
  })
};
// 获取待处理模型提交 单个
const dealWithModel = data => {
  return service({
    url: '/api/model/dealWithModel',
    method: 'post',
    data,
  })
};

export { getAllFieldList as a, getBrandList as b, createModel as c, getModelPage as d, deleteModel as e, batchCreateModel as f, getModelInfo as g, getModelPendingPage as h, getModelComparedInfo as i, dealWithModel as j, batchDealWithModel as k, updateModel as u };
