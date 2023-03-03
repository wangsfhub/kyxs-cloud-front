/**
 * 组织机构
 */
import request from '@/utils/request.js';
//组织机构树
export const getOrgTree = async () => {
    return request({
        url: '/org/tree',
        method: 'get',
    });
};
//查询机构列表
export const getOrgList = async (superId) => {
    return request({
        url: '/org/list',
        method: 'get',
        data:{'superId':superId}
    });
};
export const getPostList = async (deptId) => {
    return request({
        url: '/position/list',
        method: 'get',
        data:{'deptId':deptId}
    });
};
//保存部门信息
export const saveOrgInfo = async (data) => {
    return request({
        url: '/org/save',
        method: 'post',
        data:data
    });
};
//保存岗位信息
export const savePostInfo = async (data) => {
    return request({
        url: '/post/save',
        method: 'post',
        data:data
    });
};

