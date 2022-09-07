import { s as service } from './index.acc4a696.js';

// 用户管理
const GetUserPage = params => {
  return service({
    url: `/api/user/getUserPage`,
    method: 'get',
    params,
  })
};

const CreateUser = data => {
  return service({
    url: `/api/user/createUser`,
    method: 'post',
    data,
  })
};

const UpdateUser = data => {
  return service({
    url: `/api/user/updateUser`,
    method: 'post',
    data,
  })
};

const BatchDeleteUser = data => {
  return service({
    url: `/api/user/batchDeleteUser`,
    method: 'delete',
    data,
  })
};

const DeleteUser = params => {
  return service({
    url: `/api/user/deleteUser`,
    method: 'delete',
    params,
  })
};

const GetUserInfo = params => {
  return service({
    url: `/api/user/getUserInfo`,
    method: 'get',
    params,
  })
};

const UpdateState = params => {
  return service({
    url: `/api/user/updateState`,
    method: 'put',
    params,
  })
};

// 组织管理
const GetCompanyInfoList = params => {
  return service({
    url: `/api/company/getCompanyInfoList`,
    method: 'get',
    params,
  })
};

const CreateCompany = data => {
  return service({
    url: `/api/company/createCompany`,
    method: 'post',
    data,
  })
};

const GetCompanyInfo = params => {
  return service({
    url: `/api/company/getCompanyInfo`,
    method: 'get',
    params,
  })
};

const UpdateCompany = data => {
  return service({
    url: `/api/company/updateCompany`,
    method: 'post',
    data,
  })
};

const DeleteCompany = params => {
  return service({
    url: `/api/company/deleteCompany`,
    method: 'delete',
    params,
  })
};

// 角色管理
const GetRolePage = data => {
  return service({
    url: `/api/role/getRolePage`,
    method: 'post',
    data,
  })
};

const GetRoleList = data => {
  return service({
    url: `/api/role/getRoleList`,
    method: 'post',
    data,
  })
};

const CreateRole = data => {
  return service({
    url: `/api/role/createRole`,
    method: 'post',
    data,
  })
};

const GetRoleInfo = params => {
  return service({
    url: `/api/role/getRoleInfo`,
    method: 'get',
    params,
  })
};

const UpdateRole = data => {
  return service({
    url: `/api/role/updateRole`,
    method: 'post',
    data,
  })
};

const BatchDeleteRole = data => {
  return service({
    url: `/api/role/batchDeleteRole`,
    method: 'delete',
    data,
  })
};

const DeleteRole = params => {
  return service({
    url: `/api/role/deleteRole`,
    method: 'delete',
    params,
  })
};

// 获取菜单授权列表
const GetMenuAuthorization = params => {
  return service({
    url: `/api/permission/getMenuAuthorization`,
    method: 'get',
    params,
  })
};

export { BatchDeleteUser as B, CreateUser as C, DeleteUser as D, GetCompanyInfoList as G, UpdateState as U, GetUserPage as a, DeleteCompany as b, GetRolePage as c, DeleteRole as d, BatchDeleteRole as e, GetRoleList as f, GetUserInfo as g, UpdateUser as h, GetCompanyInfo as i, CreateCompany as j, UpdateCompany as k, GetMenuAuthorization as l, GetRoleInfo as m, CreateRole as n, UpdateRole as o };
