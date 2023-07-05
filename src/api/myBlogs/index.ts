import request from '../../utils/request';

export const getArticleList = (query:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/getArticleList?pageNum=${query.pageNum}&pageSize=${query.pageSize}&search=${query.search}&library=${query.library}`,
        method: 'get'
    });
};

export const deleteArticle = (id:number) => {
    return request({
        url: `http://127.0.0.1:3000/management/deleteArticle/${id}`,
        method: 'delete',
    });
}; 