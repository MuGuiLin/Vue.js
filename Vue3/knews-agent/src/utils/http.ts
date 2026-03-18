import axios from 'axios'
import { getSign, getToken } from './auth'

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL_APP || '/api',
    timeout: 10000,
    withCredentials: true,
})

// http请求监听
http.interceptors.request.use(
    (config) => {
        let params = {};
        if (config.method === "post") {
            params = config.data || {};
        } else {
            params = config.params || {};
        }
        const headerObj = getSign(params);

        for (var key in headerObj) {
            (config.headers as any)[key] = headerObj[key as keyof typeof headerObj];
        }
        const token = getToken("Token");
        if (token) {
            config.headers["Access-Token"] = token;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// http响应监听
http.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
