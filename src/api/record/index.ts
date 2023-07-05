import request from '../../utils/request';

export const getRecordList = (query:any) => {
    return request({
        url: `http://127.0.0.1:3000/management/getRecordList?pageNum=${query.pageNum}&pageSize=${query.pageSize}&title=${query.search}`,
        method: 'get'
    });
}