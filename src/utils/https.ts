import axios from 'axios';

let service: any = {};
service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/m' : 'http://meet.com/m',
    timeout: 50000
});

service.interceptors.request.use(
    (config: any) => {
        if (config.method === 'post') {
            config.data = {
                ...config.data,
                sid: window.USER_SID
            };
        } else if (config.method === 'get') {
            config.params = {
                ...config.params,
                sid: window.USER_SID
            };
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: any) => {
        return response.data;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default service;
