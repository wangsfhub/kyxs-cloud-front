import request from '@/utils/request.js';

export const getAllHeader = (moduleCode) => {
    return request({
        url: '/custom-header/all/'+moduleCode,
        method: 'get',
    });
};

export const saveCustomHeader = (data) => {
    return request({
        url: '/custom-header/save',
        method: 'post',
        data: data
    });
};

export const getCurrentHeader = (moduleCode) => {
    return request({
        url: '/custom-header/current/'+moduleCode,
        method: 'get',
    });
};