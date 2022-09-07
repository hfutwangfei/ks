import { s as service } from './index.acc4a696.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-11 09:21:32
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-19 16:55:49
 * @FilePath: /dt-commercialization-front/src/api/dataBinding/model-object-template-definition.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const prefix = `/api/model-object-template-definition`;

const getDefinitionBindPage = data => {
  return service({
    url: `${prefix}/getDefinitionBindPage`,
    method: 'post',
    data,
  })
};

const getDefinitionPage = data => {
  return service({
    url: `${prefix}/getDefinitionPage`,
    method: 'post',
    data,
  })
};

const addOrEditDefinition = data => {
  return service({
    url: `${prefix}/addOrEditDefinition`,
    method: 'post',
    data,
  })
};

const batchDelectDefinition = data => {
  return service({
    url: `${prefix}/batchDelectDefinition`,
    method: 'delete',
    data,
  })
};

const getDefinitionInfo = params => {
  return service({
    url: `${prefix}/getDefinitionInfo`,
    method: 'get',
    params,
  })
};

const getTenantDeviceInfos = data => {
  return service({
    url: `${prefix}/getTenantDeviceInfos`,
    method: 'post',
    data,
  })
};

const getTimeseriesKeys = data => {
  return service({
    url: `${prefix}/getTimeseriesKeys`,
    method: 'post',
    data,
  })
};

const bindDevice = data => {
  return service({
    url: `${prefix}/bindDevice`,
    method: 'post',
    data,
  })
};

export { getDefinitionInfo as a, batchDelectDefinition as b, addOrEditDefinition as c, getDefinitionBindPage as d, getTenantDeviceInfos as e, getTimeseriesKeys as f, getDefinitionPage as g, bindDevice as h };
