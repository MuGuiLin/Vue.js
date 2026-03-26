import axios from 'axios'
import { showFailToast } from 'vant';
import { getSign, getToken } from './auth'

export const BASE = {
    __HTTP_URL__: import.meta.env.VITE_API_URL_APP,
    __COZE_URL__: 'https://api.coze.cn'
}

export const http = axios.create({
    baseURL: BASE.__HTTP_URL__ || '/api',
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
        if (200 == response.status) {
            if (1000 == response.data.code) {
                return response.data.result
            } else {
                showFailToast(response.data.message);
            }
        } else {
            showFailToast('网络异常，请稍后再试！');
        }
        return response
    },
    (error) => {
        showFailToast('网络异常，请稍后再试！');
        return Promise.reject(error)
    }
)

export const coze = axios.create({
    baseURL: BASE.__COZE_URL__,
    timeout: 10000,
    withCredentials: true,
})

coze.interceptors.request.use(
    (config) => {
        // const headers = getSign(config.method == "post" ? config.data : config.params);
        // for (var key in headers) {
        //     (config.headers as any)[key] = headers[key as keyof typeof headers];
        // }
        // Object.assign(config.headers, headers)
        // const token = getToken("userToken");
        // if (token) {
        //     config.headers["Authorization"] = "Bearer " + token;
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// http响应监听
coze.interceptors.response.use(
    (response) => {
        if (200 == response.status) {
            if (0 == response.data.code) {
                return response.data
            } else {
                showFailToast(response.data.msg);
            }
        } else {
            showFailToast('网络异常，请稍后再试！');
        }
        return response
    },
    (error) => {
        showFailToast('网络异常，请稍后再试！');
        return Promise.reject(error)
    }
)