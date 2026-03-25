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
        const headers = getSign(config.method == "post" ? config.data : config.params);
        // for (var key in headers) {
        //     (config.headers as any)[key] = headers[key as keyof typeof headers];
        // }
        Object.assign(config.headers, headers)
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
        if (response.status == 200) {
            return response.data
        }
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)
