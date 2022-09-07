/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 13:05:47
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 12:48:23
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  });
  return time_str
}

// 数组中根据对象key去重
function uniqObjInArr(objArr, key) {
  let obj = {};
  return objArr.reduce((item, next) => {
    if (!obj[next[key]]) {
      obj[next[key]] = true;
      item = [...item, next];
    }
    return item
  }, [])
}

// 将base64转换为文件
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime })
}

// UE颜色转rgba
function str2Rgba(str) {
  if (!str) return 'rgba(0,0,0,0)'
  let [r, g, b, a] = str.split(',');
  r = Number(r) * 255;
  g = Number(g) * 255;
  b = Number(b) * 255;
  return `rgba(${r},${g},${b},${a})`
}

// rgba转UE颜色
function rgba2Str(rgba) {
  if (!rgba) return '0,0,0,0'
  let reg = /\((.+?)\)/;
  let str = rgba.match(reg)[1];
  let [r, g, b, a] = str.split(',');
  r = (Number(r) / 255).toFixed(2);
  g = (Number(g) / 255).toFixed(2);
  b = (Number(b) / 255).toFixed(2);
  return `${r},${g},${b},${a}`
}

export { dataURLtoFile as d, parseTime as p, rgba2Str as r, str2Rgba as s, uniqObjInArr as u };
