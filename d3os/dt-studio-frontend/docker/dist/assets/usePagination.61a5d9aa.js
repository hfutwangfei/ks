import { j as reactive, l as ref, m as watch } from './element-plus.da98f360.js';

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-09 09:20:39
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-12 10:01:12
 * @Description: useSearchForm 自定义hooks
 */

/**
 * @param {*} fields 搜索表单字段列表
 * @return {*}
 */
const useSearchForm = fieldsList => {
  const searchForm = reactive({});
  const searchFormRef = ref(null);

  /**
   * @description:  接口问题，返回给接口 "" != null, 所以需要手动重置一下
   * @return {*}
   */
  fieldsList.forEach(fieldName => {
    watch(
      () => searchForm[fieldName],
      newFieldValue => {
        if (newFieldValue === '') searchForm[fieldName] = null;
      }
    );
  });

  /**
   * @description: 重置头部搜索表单
   * @return {*}
   */
  const resetSearchFrom = () => searchFormRef.value.resetFields();

  return { searchForm, searchFormRef, resetSearchFrom }
};

/*
 * @Author: wangweiqi wangweiqi.cosmo@haier.com
 * @Date: 2022-08-09 11:00:23
 * @LastEditors: wangweiqi wangweiqi.cosmo@haier.com
 * @LastEditTime: 2022-08-13 12:05:14
 * @Description: usePagination 自定义hooks
 */

const usePagination = params => {
  const pagination = reactive({
    size: 10,
    page: 1,
    current: 1,
    total: 1,
    ...params,
  });

  const paginationQueryListCallback = ref(null);

  /**
   * @description: 分页器点击事件，改变分页器当前页参数
   * @param {*} targetPageNum
   * @return {*}
   */
  const paginationChange = targetPageNum => {
    pagination.page = targetPageNum;
    pagination.current = targetPageNum;

    if (typeof paginationQueryListCallback.value === 'function') {
      paginationQueryListCallback.value();
    }
  };

  return {
    pagination,
    paginationChange,
    paginationQueryListCallback,
  }
};

export { usePagination as a, useSearchForm as u };
