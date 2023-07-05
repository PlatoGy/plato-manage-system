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

export const saveArticle = (data:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/saveArticle`,
        method: 'post',
        data
    });
}; 


export const getArticleDetail = (id:number) => {
    return request({
        url: `http://127.0.0.1:3000/management/getArticleDetail/${id}`,
        method: 'get',
    });
}; 
