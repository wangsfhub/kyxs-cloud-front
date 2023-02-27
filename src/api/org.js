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



