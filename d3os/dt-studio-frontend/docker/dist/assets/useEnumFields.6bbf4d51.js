import { n as nanoid } from './index.browser.8e74d592.js';
import { j as reactive } from './element-plus.da98f360.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 13:43:02
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-12 14:17:56
 * @FilePath: /dt-commercialization-front/src/views/modelManage/modelPoint/composable/useEnumFields.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useEnumFields = () => {
  // 用户选择的设备信息字段列表
  const enumFields = reactive({
    value: [{ key: nanoid() }],
  });

  // 添加一行
  enumFields.add = () => {
    enumFields.value.push({ key: nanoid() });
  };

  enumFields.fill = ({ enumValue, enumKey }) => {
    const enumValueArr = enumValue.split(',');
    const enumKeyArr = enumKey.split(',');
    const arr = [];

    enumValueArr.forEach((val, index) => {
      const key = enumKeyArr[index];

      arr.push({
        key: nanoid(),
        enumKey: key,
        enumValue: val,
      });
    });

    enumFields.value = arr;
  };

  // 移除指定行
  enumFields.remove = index => enumFields.value.splice(index, 1);

  // 获取枚举字符串值
  enumFields.toString = () => {
    let enumValue = '';
    let enumKey = '';
    enumFields.value.forEach(item => {
      enumValue += item.enumValue + ',';
      enumKey += item.enumKey + ',';
    });

    enumValue = enumValue.substring(0, enumValue.length - 1);
    enumKey = enumKey.substring(0, enumKey.length - 1);

    return {
      enumValue,
      enumKey,
    }
  };

  return enumFields
};

export { useEnumFields as u };
