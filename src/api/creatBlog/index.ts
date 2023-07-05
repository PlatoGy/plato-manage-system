import request from '../../utils/request';

export const getLibraryList = (search:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/getLibraryList2?search=${search}`,
        method: 'get'
    });
}; 

export const getLabelList = (search:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/getLabelList2?search=${search}`,
        method: 'get'
    });
}; 

export const createArticle = (data:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/createArticle`,
        method: 'post',
        data
    });
}; 

export const getPic = () =>{
    return request({
        url: `https://api.btstu.cn/sjbz/api.php?lx=suiji&format=json&method=zsy`,
        method: 'get',
    });
}