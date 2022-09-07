import { s as service } from './index.acc4a696.js';

// 查询案例列表
const queryCasesList = params => {
  return service({
    url: '/api/case/queryCasesList',
    method: 'get',
    params,
  })
};

// 查询案例列表分页
const queryCasesByPage = params => {
  return service({
    url: '/api/case/queryCasesByPage',
    method: 'get',
    params,
  })
};

// 查询案例明细
const queryCaseDetails = params => {
  return service({
    url: '/api/case/queryCaseDetails',
    method: 'get',
    params,
  })
};

// 查询所有数据源配置
const queryDataSources = () => {
  return service({
    url: '/api/case/queryDataSources',
    method: 'get',
  })
};

// 更新案例发布状态
const updateCasePublishState = data => {
  return service({
    url: '/api/case/updateCasePublishState',
    method: 'post',
    data,
  })
};

// 删除案例
const deleteCase = params => {
  return service({
    url: '/api/case/deleteCase',
    method: 'delete',
    params,
  })
};

// 保存/更新案例
const saveOrUpdate = data => {
  return service({
    url: '/api/case/saveOrUpdate',
    method: 'post',
    data,
  })
};

// 获取所有的领域信息列表
const getAllFieldList = () => {
  return service({
    url: '/api/field/getAllFieldList',
    method: 'get',
  })
};

// 获取标签列表
const getLabelList = params => {
  return service({
    url: '/api/label/getLabelList',
    method: 'get',
    params,
  })
};

// 获取应用场景信息列表（平台）
const getScenesPage = data => {
  return service({
    url: '/api/scenes/getScenesPage',
    method: 'post',
    data,
  })
};

// 获取租户应用场景信息列表（租户管理员）
const getTenantScenesPagePost = data => {
  return service({
    url: '/api/scenes/getTenantScenesPage',
    method: 'post',
    data,
  })
};

// 获取租户应用场景信息列表（租户）
const getTenantScenesPageGet = params => {
  return service({
    url: '/api/scenes/getTenantScenesPage',
    method: 'get',
    params,
  })
};

// 获取模型信息列表（平台）
const getModelPage = data => {
  return service({
    url: '/api/model/getModelPage',
    method: 'post',
    data,
  })
};

// 获取租户模型信息列表（租户管理员）
const getTenantModelPagePost = data => {
  return service({
    url: '/api/model/getTenantModelPage',
    method: 'post',
    data,
  })
};

// 获取通用模型信息列表（租户）
const getCommonModelPage = data => {
  return service({
    url: '/api/model/getCommonModelPage',
    method: 'post',
    data,
  })
};

// 获取租户模型信息列表（租户）
const getTenantModelPageGet = params => {
  return service({
    url: '/api/model/getTenantModelPage',
    method: 'get',
    params,
  })
};

// 获取数据源
const queryDatabaseSource = params => {
  return service({
    url: '/api/dashboard/queryDatabaseSource',
    method: 'get',
    params,
  })
};

// 获取数据面板列表
const getDashBoardList = data => {
  return service({
    url: '/api/dashboard/queryDashboardList',
    method: 'post',
    data,
  })
};

// 获取数据面板列表分页
const getDashBoardPage = data => {
  return service({
    url: '/api/dashboard/queryDashboardListByPage',
    method: 'post',
    data,
  })
};

// 普通文件上传
const uploadCommonFile = file => {
  let data = new FormData();
  data.append('file', file);
  return service({
    url: '/api/file/uploadCommonFile',
    method: 'post',
    data,
  })
};

export { uploadCommonFile as a, getTenantScenesPagePost as b, getTenantScenesPageGet as c, deleteCase as d, getLabelList as e, getModelPage as f, getScenesPage as g, getTenantModelPagePost as h, getCommonModelPage as i, getTenantModelPageGet as j, getAllFieldList as k, queryDatabaseSource as l, getDashBoardPage as m, getDashBoardList as n, queryDataSources as o, queryCasesList as p, queryCasesByPage as q, queryCaseDetails as r, saveOrUpdate as s, updateCasePublishState as u };
