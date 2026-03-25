import { http } from '@/utils/http'

enum AgentApi {
    Token = '/agent/h5/token',
    HotWord = '/content/app/index/hot-word',
}


export const getToken = async () => {
    return await http.get(AgentApi.Token)
}


export const getHotWord = async () => {
    return await http.get(AgentApi.HotWord)
}
