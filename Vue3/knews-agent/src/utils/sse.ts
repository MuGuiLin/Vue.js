

export const sse = () => {

    // 创建EventSource对象，连接服务器SSE端点
    const eventSource = new EventSource('https://api.coze.cn/v3/chat');

    // 监听默认消息事件（服务器发送无event字段的数据）
    eventSource.onmessage = (event) => {
        console.log('收到消息:', event.data);
        // 处理数据，例如更新页面
    };

    // 监听自定义事件（服务器发送event字段指定的事件类型）
    eventSource.addEventListener('customEvent', (event) => {
        console.log('自定义事件:', event.data);
    });

    // 监听连接打开事件
    eventSource.onopen = () => {
        console.log('SSE连接已建立');
    };

    // 监听错误事件
    eventSource.onerror = (error) => {
        console.error('SSE连接错误:', error);
        // 可手动关闭连接
        eventSource.close();
    };
}