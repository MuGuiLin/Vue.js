
export type AgentAnswer = {
    id?: string; // 唯一标识，用于稳定渲染和动画控制
    type: string;
    content: string;
    url?: string;
    messageType?: string;
    role?: string;  // 角色
    content_type?: string;
    follow_up?: Array<{
        type: string;
        content: string;
        content_type?: string;
    }>;
};