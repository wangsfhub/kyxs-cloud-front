/**
 * 组织机构
 */
import request from '@/utils/request.js';
export const getPostList = (data) => {
    return request({
        url: '/post/list',
        method: 'post',
        data: data
    });
};

//保存岗位信息
export const savePostInfo = (data) => {
    return request({
        url: '/post/save',
        method: 'post',
        data:data
    });
};
//更新岗位状态
export const updatePostStatus = (data) => {
    return request({
        url: '/post/update/status',
        method: 'post',
        data:data
    });
};
//删除岗位信息
export const deleteById = (id) => {
    return request({
        url: '/post/delete/'+id,
        method: 'delete',
    });
};
//查询所有岗位
export const getPostAllList = () => {
    return request({
        url: '/post/list/all',
        method: 'get',
    });
};