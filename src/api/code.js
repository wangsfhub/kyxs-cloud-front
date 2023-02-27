/**
 * 代码查询
 */
import request from '@/utils/request.js';
export const getAllCodes = async () => {
    return request({
        url: '/code/all',
        method: 'get',
    });
};
export const getCodesBySetId = async (setId) => {
    return request({
        url: '/code/getCodesBySetId/'+setId,
        method: 'get',
    });
};