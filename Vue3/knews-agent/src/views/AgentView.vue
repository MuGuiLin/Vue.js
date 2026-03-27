<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useLocalStorage } from "@vueuse/core";

import { Agent } from '@/utils/agent'
const messages: any = ref([])
const agent = new Agent();

interface stateTyping {
  is_over: boolean;
  conversation_id: string;
  chat_id: string;
}
const state = <stateTyping>reactive({
  is_over: false,// 是否回答完毕
  conversation_id: '',
  chat_id: ''
})

const contents = ref('')


const saveMessagesToLocalStorage = () => {
  try {
    localStorage.setItem('messages', JSON.stringify(messages.value))
  } catch (error) {
    console.error('Error saving messages to localStorage:', error)
  }
}

const sendMessage = async (content: string) => {
  if (content.trim()) {
    try {
      agent.sendMessage(
        {
          user_id: Agent.connector_uid,
          stream: true, // 流式反回
          additional_messages: [
            {
              role: "user",
              type: "question",
              content,
              content_type: "text", // 根据类型设置内容类型
            },
          ],
        },
        { conversation_id: Agent.conversation_id },
        (event) => {
          if (event.event === "error") {
            const error = JSON.parse(event.data);
            console.error("error:", error);
            throw new Error(error);
          }
          if (event.event === "conversation.chat.created") {
            const data = JSON.parse(event.data);
            state.chat_id = data.id;
          }
          if (event.event === "conversation.message.delta") {
            // onmessage回调 - 直接追加增量数据
            if (event.data) {
              try {
                const chunk = JSON.parse(event.data);
                if (chunk.content && chunk.content != "") {
                  // 正常流式：delta 内携带增量内容，进入打字机队列。
                  console.log(chunk.content);
                  contents.value += chunk.content

                }
              } catch (e) {
                console.error("解析错误:", e);
              }
            }
          } else if (event.event === "conversation.message.completed") {
            if (event.data) {
              try {
                const chunk = JSON.parse(event.data);
                console.log(chunk)

              } catch (e) {
                console.error("解析错误:", e);
              }
            }
          } else if (event.event === "conversation.chat.failed") {

          }
        },
        (err) => {
          console.log("~~~~~~~~~~错误:", err);
          state.is_over = true;
        },
        () => {
          state.is_over = true;
          state.chat_id = "";
          console.log("回答完毕");
        },
      );
    } finally {
      messages.value.push({
        type: 'user',
        content
      })
      saveMessagesToLocalStorage()
    }
  }
}

const onSend = (content: string) => {
  sendMessage(content)
}

onMounted(async () => {
  try {

  } catch (error) {
    const msg = useLocalStorage<Array<any>>("messages", []);
    messages.value = msg.value
  }
})

</script>
<template>
  <section class="chat-box">
    <Header />

    <main>
      <!-- 聊天消息区域 -->
      <Render :content="contents" />
    </main>

    <Footer :is_over="state.is_over" @on-send="onSend" />
  </section>
</template>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  overscroll-behavior-y: none;
}

main {
  flex: 1;
  padding-bottom: 320px; /* 为固定的 Footer 留出空间 */
}
</style>
