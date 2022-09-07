import { l as ref } from './element-plus.da98f360.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-14 11:18:45
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-15 09:01:38
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/mapping/composable/useTemplateData.js
 * @Description: 用于数据绑定 =》 物模板定义 && 物模板详情页面数据沟通(后端不给接口查详情，从列表保存数据带入)
 */

const templateData = ref({});
const useTemplateInfo = () => {
  // 物模板定义列表点击绑定传入
  const saveTemplateInfo = info => (templateData.value = info);
  // 物模版详情读取
  const getTemplateInfo = () => templateData.value;
  return { saveTemplateInfo, getTemplateInfo }
};

export { useTemplateInfo as u };
