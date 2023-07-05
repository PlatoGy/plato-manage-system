import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import { ElMessage,ElMessageBox } from 'element-plus'

const service:AxiosInstance = axios.create({
    timeout: 60000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        ElMessage({
            // elmessage: error.elmessage,
            message: '网络错误，请刷新重试',
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject();
    }
);

export default service;
