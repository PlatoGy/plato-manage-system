import request from '../../utils/request';

export const getCommentList = (query:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/getCommentList?pageNum=${query.pageNum}&pageSize=${query.pageSize}&title=${query.search}`,
        method: 'get'
    });
};


export const deleteComment = (id:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/deleteComment/${id}`,
        method: 'delete'
    });
};