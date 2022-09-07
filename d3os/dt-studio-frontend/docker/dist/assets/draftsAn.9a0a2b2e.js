import { s as service } from './index.acc4a696.js';

// 获取模型构件详情
const getModelmemberInfo = params => {
  return service({
    url: '/api/model-member-info/getModelmemberInfo',
    method: 'get',
    params,
  })
};

// 查询案例动画编辑器数据列表
const queryCaseAnimations = params => {
  return service({
    url: '/api/case/queryCaseAnimations',
    method: 'get',
    params,
  })
};

// 查询案例动画关联子模型列表
const queryCaseModelSubLevels = params => {
  return service({
    url: '/api/case/queryCaseModelSubLevels',
    method: 'get',
    params,
  })
};

// 保存案例动画编辑器数据列表
const saveCaseAnimations = data => {
  return service({
    url: '/api/case/saveCaseAnimations',
    method: 'post',
    data,
  })
};

// 保存案例动画关联子模型列表
const saveCaseModelSubLevels = data => {
  return service({
    url: '/api/case/saveCaseModelSubLevels',
    method: 'post',
    data,
  })
};

// 查询时序
const queryCaseSequences = params => {
  return service({
    url: `/api/case/queryCaseSequences`,
    method: 'get',
    params,
  })
};

// 保存时序
const saveCaseSequences = data => {
  return service({
    url: `/api/case/saveCaseSequences`,
    method: 'post',
    data,
  })
};

// 获取模板点位信息
const getDefinitionInfoList = params => {
  return service({
    url: `/api/model-object-template-definition/getDefinitionInfoList`,
    method: 'get',
    params,
  })
};

export { queryCaseModelSubLevels as a, queryCaseSequences as b, saveCaseModelSubLevels as c, saveCaseSequences as d, getDefinitionInfoList as e, getModelmemberInfo as g, queryCaseAnimations as q, saveCaseAnimations as s };
