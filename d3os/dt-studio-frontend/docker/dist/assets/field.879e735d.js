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

// 获取登录用户信息
const getFieldPage = data => {
  return service({
    url: `/api/field/getFieldPage`,
    method: 'post',
    data,
  })
};
// 创建领域
const createField = data => {
  return service({
    url: `/api/field/createField`,
    method: 'post',
    data,
  })
};

// 更新领域
const updateField = data => {
  return service({
    url: `/api/field/updateField`,
    method: 'post',
    data,
  })
};
// 获取已使用领域
const getUsedField = params => {
  return service({
    url: `/api/field/getUsedField`,
    method: 'get',
    params,
  })
};

export { getUsedField as a, createField as c, getFieldPage as g, updateField as u };
