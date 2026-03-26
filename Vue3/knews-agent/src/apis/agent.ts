
export { BASE } from '@/utils/http'
import { http, coze } from '@/utils/http'

export enum AgentApi {
    Token = '/agent/h5/token',
    HotWord = '/content/app/index/hot-word',
    Create = '/v1/conversation/create',
    Variables = '/v1/variables',
}

/* 获取Agent全局配置 */
export const getTokenApi = async () => {
    return await http.get(AgentApi.Token)
}

/* 获取热词列表 */
export const getHotWordApi = async (params?: any) => {
    return await http.get(AgentApi.HotWord, params)
}

/* 获取创建信息*/
export const getCreateApi = async (signal: AbortController | undefined, access_token: string, data: any = {}) => {
    return await coze.post(AgentApi.Create, data,
        {
            // signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + access_token
            }
        }
    )
}

/* 获取创建信息*/
export const getVariablesApi = async (signal: AbortController | undefined, access_token: string, data: any = {}) => {
    return await coze.put(AgentApi.Variables, data,
        {
            // signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + access_token
            }
        }
    )
}
