import request from '../../utils/request';

export const getHotLine = () => {
    return request({
        url: `http://127.0.0.1:3000/management/dashboard/getHotLine`,
        method: 'get'
    });
};

export const getDistribution = () => {
    return request({
        url: `http://127.0.0.1:3000/management/dashboard/getDistribution`,
        method: 'get'
    });
};

export const getLibrary = () => {
    return request({
        url: `http://127.0.0.1:3000/management/dashboard/getLibrary`,
        method: 'get'
    });
};

export const getLatest = () => {
    return request({
        url: `http://127.0.0.1:3000/management/dashboard/getLatest`,
        method: 'get'
    });
};

