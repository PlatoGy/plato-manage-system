import request from '../../utils/request';

export const getLabelList = (search:any,pageNum:number,pageSize:number=5) => {
    return request({
        url: `http://127.0.0.1:3000/management/getLabelList?search=${search}&pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'get'
    });
}; 

export const createLabel = (data:any = {}) => {
    return request({
        url: `http://127.0.0.1:3000/management/createLabel`,
        method: 'post',
        data
    });
}; 

export const changeLabel = (data:any = {}) => {
    return request({
        url: `http://127.0.0.1:3000/management/changeLabel`,
        method: 'post',
        data
    });
}; 

export const deleteLabel = (id:number) => {
    return request({
        url: `http://127.0.0.1:3000/management/deleteLabel/${id}`,
        method: 'delete',
    });
}; 