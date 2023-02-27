/**
 * 插件接口
 */
import request from '@/utils/request.js';

export const getRoles = async () => {
    return request({
        url: '/plugin/roles',
        method: 'get',
        data:{}
    });
};
export const getDepartments = async () => {
    return request({
        url: '/plugin/departments',
        method: 'get',
        data:{}
    });
};
export const getEmployees = async () => {
    return request({
        url: '/plugin/employees',
        method: 'get',
        data:{}
    });
};