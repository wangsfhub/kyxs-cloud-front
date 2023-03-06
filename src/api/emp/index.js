import request from '@/utils/request.js';
//保存岗位信息
export const saveEmpInfo = (data) => {
    return request({
        url: '/emp/save',
        method: 'post',
        data: data
    });
};
