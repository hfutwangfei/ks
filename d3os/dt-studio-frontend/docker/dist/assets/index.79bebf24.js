import { s as service } from './index.acc4a696.js';

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

export { uploadCommonFile as u };
