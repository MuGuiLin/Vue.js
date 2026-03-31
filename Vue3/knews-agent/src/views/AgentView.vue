<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useLocalStorage } from "@vueuse/core";
import { showFailToast } from '@/hooks'
import { AgentAnswer } from '@/enums'
import { Agent, nanoid } from '@/utils'


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

const agent = new Agent();
const messages = useLocalStorage<Array<AgentAnswer>>("__MESSAGES__", []);


const sendMessage = async (content: string) => {
  if (content && content.trim()) {
    try {
      const user_message = {
        id: nanoid(),
        role: "user",
        type: "question",
        content,
        content_type: "text", // 根据类型设置内容类型
      }
      messages.value = [...messages.value, user_message]
      agent.sendMessage(
        {
          user_id: Agent.connector_uid,
          stream: true, // 流式反回
          additional_messages: [user_message],
        },
        { conversation_id: Agent.conversation_id },
        (event) => {
          console.log('666', event)
          if (event.event === "error") {
            try {
              const error = JSON.parse(event.data);
              throw new Error(error);
            } catch (err) {
              console.error("error 解析错误:", err);
            }
          }
          if (event.event === "conversation.chat.created") {
            console.log('------------------conversation.chat.created', event)
            try {
              const data = JSON.parse(event.data);
              state.chat_id = data.id;
            } catch (err) {
              console.error("conversation.chat.created 解析错误:", err);
            }
          }
          if (event.event === "conversation.message.delta") {
            console.log('------------------conversation.message.delta', event)
            if (event.data) {
              // onmessage回调 - 直接追加增量数据
              try {
                const chunk = JSON.parse(event.data);
                if (chunk.content && chunk.content != "") {
                  // 正常流式：delta 内携带增量内容，进入打字机队列。
                  console.log(chunk.content);
                  // contents.value += chunk.content

                }
              } catch (err) {
                console.error("conversation.message.delta 解析错误:", err);
              }
            }
          } else if (event.event === "conversation.message.completed") {
            console.log('------------------conversation.message.completed', event)

            try {
              if (event.data) {
                const chunk = JSON.parse(event.data);
                console.log(chunk)
                if ('answer' == chunk.type) {
                  messages.value = [...messages.value, chunk]
                }
              }

            } catch (e) {
              console.error("conversation.message.completed 解析错误:", e);
            }

          } else if (event.event === "conversation.chat.failed") {
            console.log('------------------conversation.chat.failed', event)
          }
        },
        (err) => {
          console.log("~~~~~~~~~~错误:", err);
          state.is_over = true;
        },
        () => {
          console.log("回答完毕");
          state.is_over = true;
          state.chat_id = "";
        },
      );
    } finally {


    }
  } else {
    showFailToast('对不起：不能发送空消息！')
  }
}

const onSend = (content: string) => {
  sendMessage(content)
}

onMounted(async () => {
  try {

  } catch (error) {
  }
})

</script>
<template>
  <section class="chat-box">
    <Header />

    <main>
      <!-- 聊天消息区域 -->
      <div class="chats">
        <template v-for="msg in messages">
          <div class="user" v-if="'user' == msg.role">
            {{ msg.content }}
          </div>
          <div class="agent" v-else-if="'assistant' == msg.role">
            <Render :content="msg.content" />
          </div>
        </template>
      </div>
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

  main {
    flex: 1;
    padding: 30px 30px 300px;


    /* 为固定的 Footer 留出空间 */
    .chats {
      display: flex;
      flex-direction: column;
      line-height: 48px;
      color: var(--kk-black);
      font-size: 30px;
      font-weight: 400;

      .user {
        display: flex;
        justify-content: end;
      }

      .agent {
        display: flex;
      }
    }
  }
}
</style>
