/**
 * 插件接口
 */
import request from '@/utils/request.js';

export const getRoles = async (data) => {
    return request({
        url: '/plugin/roles',
        method: 'get',
        data: data
    });
};
export const getDepartments = async (data) => {
    return request({
        url: '/plugin/departments',
        method: 'get',
        data: data
    });
};
export const getEmployees = async (data) => {
    return request({
        url: '/plugin/employees',
        method: 'get',
        data: data
    });
};