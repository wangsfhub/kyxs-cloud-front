/**
 * 组织机构
 */
import request from '@/utils/request.js';
//组织机构树
export const getOrgTree = async () => {
    return request({
        url: '/dept/tree',
        method: 'get',
    });
};
//查询机构列表
export const getOrgList = async (data={superId:-1}) => {
    return request({
        url: '/dept/list',
        method: 'post',
        data: data
    });
};

//保存部门信息
export const saveOrgInfo = async (data) => {
    return request({
        url: '/dept/save',
        method: 'post',
        data:data
    });
};


