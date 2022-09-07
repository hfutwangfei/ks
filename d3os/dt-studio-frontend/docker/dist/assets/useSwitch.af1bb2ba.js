import { l as ref, a3 as ElMessageBox, x as ElMessage } from './element-plus.da98f360.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-13 11:35:41
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-15 13:16:47
 * @FilePath: /dt-commercialization-front/src/views/dataBinding/binding/composable/useSwitch.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useSwitch = ({ updateSwitchEvent, switchField }) => {
  const switchLoading = ref(false);
  const switchQueryListCallback = ref(null);

  const changeSwitch = async row => {
    switchLoading.value = true;

    await confirmChange(row);

    switchLoading.value = false;
  };

  const confirmChange = row => {
    return new Promise(resolve => {
      ElMessageBox.confirm('是否确定修改记录？', '确认提示', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'info',
      })
        .then(async () => {
          const requestSwitchField = row[switchField] === 1 ? 0 : 1;
          const updateSwitchRes = await updateSwitchEvent({
            ...row,
            [`${switchField}`]: requestSwitchField,
          });
          if (updateSwitchRes.code === 1) {
            if (typeof switchQueryListCallback.value === 'function') {
              switchQueryListCallback.value();
            }
            ElMessage({
              type: 'success',
              message: '修改成功',
            });
          } else {
            ElMessage({
              type: 'error',
              message: updateSwitchRes.msg,
            });
          }

          resolve(true);
        })
        .catch(() => resolve(false));
    })
  };

  return { changeSwitch, switchLoading, switchQueryListCallback }
};

export { useSwitch as u };
