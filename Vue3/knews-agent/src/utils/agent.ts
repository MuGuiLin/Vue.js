import {
    type EventSourceMessage,
    fetchEventSource,
} from '@microsoft/fetch-event-source';
import { getToken } from './auth'
import { BASE, getTokenApi, getCreateApi, getVariablesApi } from '@/apis/agent'

export class Agent {
    api: string;
    abort?: AbortController;


    // 类的静态变量，让所有实例能共享使用
    static access_token?: string;
    static bootid?: string;
    static access_token_expires?: string;
    static is_refreshing: boolean = false;
    static connector_uid: string = getToken('userToken');
    static conversation_id: string;

    constructor(api: string = BASE.__COZE_URL__ + '/v3/chat') {
        this.api = api;
        this.abort = new AbortController();
        this.getToken(async () => {
            // 请求获取1次logid
            await this.variables();
            // 执行创建1次新对话
            await this.create();
        });
    }

    // 获取Agent基础配置
    async getToken(cb?: Function) {
        // 如果全局正在刷新，等待完成
        if (Agent.is_refreshing) {
            return;
        }
        try {
            // 每次请求都获取新的token
            Agent.is_refreshing = true;
            const res = await getTokenApi();
            Agent.access_token = (res as any).access_token;
            Agent.bootid = (res as any).bootid;
            Agent.access_token_expires = (res as any).access_token_expires;
            cb && cb?.();
        } finally {
            Agent.is_refreshing = false;
        }
    }

    sse(ev: any) {
        // 创建EventSource对象，连接服务器SSE端点
        const eventSource = new EventSource(this.api);

        // 监听默认消息事件（服务器发送无event字段的数据）
        eventSource.onmessage = (event) => {
            console.log('收到消息:', event.data);
            ev?.onmessage(event.data)
        };

        // 监听自定义事件（服务器发送event字段指定的事件类型）
        eventSource.addEventListener('customEvent', (event) => {
            console.log('自定义事件:', event.data);
        });

        // 监听连接打开事件
        eventSource.onopen = () => {
            console.log('SSE连接已建立');
            ev?.onopen()
        };

        // 监听错误事件
        eventSource.onerror = (error) => {
            console.error('SSE连接错误:', error);
            ev?.onerror(error)
            // 可手动关闭连接
            eventSource.close();
        };
    }

    async sendMessage(
        param: any,
        query: Record<string, any> = {},
        onmessage: ((ev: any) => void) | undefined,
        onerror: ((err: any) => number | null | undefined | void) | undefined,
        onclose: (() => void) | undefined,
        create: boolean = false
    ) {
        if (!this.api) throw new Error("API endpoint is required");
        if (!this.abort || this.abort.signal.aborted) {
            this.abort = new AbortController();
        }
        await this.getToken();
        create && await this.create();

        // 将this.api转为URL对象，便方在this.api中追加参数
        const url = new URL(this.api);
        if (Object.keys(query).length > 0) {
            url.search = new URLSearchParams(query).toString();
        }

        // this.sse({onmessage, onerror});
        // 由于原生EventSource不支特POST(只能是GET)，并不能自定义headers, 所以用第三方的@microsoft/fetch-event-source
        fetchEventSource(url.toString(), {
            method: "POST",
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
                Authorization: "Bearer " + Agent.access_token,
            },
            body: JSON.stringify({ ...param, bot_id: Agent.bootid }),
            signal: this.abort.signal,
            openWhenHidden: true, // 允许在后台运行时保持连接
            onmessage: (event) => {
                onmessage?.(event)
            },
            onerror: (error) => {
                const retry = onerror?.(error);
                if (typeof retry === "number") {
                    return retry;
                }
                throw error;
            },
            onclose
        });
    }

    stop() {
        this.abort && this.abort.abort();
        // 由于AbortController在abort()是不能恢复的，所以要重新实例化
        this.abort = new AbortController();
    }

    async create() {
        const res = await getCreateApi(this.abort, Agent.access_token, { bot_id: Agent.bootid });
        console.log('create', res)
        if (0 == res.code) {
            Agent.conversation_id = res.data?.id
            return res.data?.id;
        }
        return '';
    }

    async variables() {
        const res = await getVariablesApi(this.abort, Agent.access_token, {
            bot_id: Agent.bootid,
            connector_uid: Agent.connector_uid,
            data: [{ keyword: "user_login_token", value: Agent.connector_uid }],
        });
        console.log('variables', res)
        if (0 == res.code) {
            return res.data?.id;
        }
        return '';
    }

}
