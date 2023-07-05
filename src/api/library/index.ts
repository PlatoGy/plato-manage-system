import request from '../../utils/request';

export const getLibraryList = (search:any,pageNum:number,pageSize:number=5) => {
    return request({
        url: `http://127.0.0.1:3000/management/getLibraryList?search=${search}&pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'get'
    });
}; 

export const createLibrary = (data:any = {}) => {
    return request({
        url: `http://127.0.0.1:3000/management/createLibrary`,
        method: 'post',
        data
    });
}; 