/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-14 11:13:14
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-14 11:15:34
 * @FilePath: /dt-commercialization-front/src/views/modelManage/modelPoint/composable/utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description: 将当前行的枚举键值对拼接为需要的文本
 * @param {*} row 当前行的参数
 * @return {*} table枚举列内容拼接
 */
const getEnumList = row => {
  const { enumKey, enumValue } = row;

  if (!enumValue) return ''

  const enumValueArr = enumValue.split(',');
  const enumKeyArr = enumKey.split(',');

  let text = '';

  enumValueArr.forEach((val, index) => {
    const key = enumKeyArr[index];

    text += `${key}=${val} <br />`;
  });
  return text
};

export { getEnumList as g };
