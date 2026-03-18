import { http } from '@/utils/http'

enum AgentApi {
    Token = '/agent/h5/token',
}

// get token
export const getToken = async () => {
    return await http.get(AgentApi.Token)
}
