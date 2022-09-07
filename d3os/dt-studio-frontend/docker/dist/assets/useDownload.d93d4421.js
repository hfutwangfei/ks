import { c as store, e as axios } from './index.acc4a696.js';
import { F as FileSaver } from './FileSaver.min.1c09ff21.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-12 13:06:04
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-12 17:29:52
 * @FilePath: /dt-commercialization-front/src/views/modelManage/modelPoint/composable/useDownload.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const useDownload = () => {
  /**
   * @description: model tsl
   * @return {*}
   */
  const downloadModelTsl = async modelCode => {
    const { authorization: Authorization } = store.state.app;

    console.log(modelCode);

    axios({
      method: 'get',
      url: '/api/model-object-template-definition/downloadTsl',
      responseType: 'arraybuffer',
      headers: {
        Authorization,
      },
      params: {
        modelCode,
      },
    })
      .then(data => {
        const blob = new Blob([data.data]);
        FileSaver.saveAs(blob, '模型映射.txt');
      })
      .catch(error => {});
  };

  return { downloadModelTsl }
};

export { useDownload as u };
