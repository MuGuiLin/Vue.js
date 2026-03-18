<script setup lang="ts">
import "markstream-vue/index.css";
import { ref, onMounted } from 'vue'
import MarkdownRender from "markstream-vue";
import { useLocalStorage } from "@vueuse/core";
import { getToken } from '@/apis/agent'


// const messages = ref([
//   {
//     role: 'user',
//     content: '你是？',
//   },
//   {
//     role: 'assistant',
//     content: '根据你输入的内容，相关信息主要分为以下几类：  \n1. 前端开发相关包  \n- @muguilin/xf-voice-dictation：用于实现讯飞语音听写功能的依赖库，基于Vue.js 3.x、Vite环境开发，使用前需通过npm安装，还要在iat_xfyun.js文件中配置讯飞的APPID、APIKey和APISecret等API信息。  \n- @muguilin/web-audio-track：可在Web前端通过JS实时获取视音频多媒体声道、音轨、波形数据，还能渲染音频声道峰值电平跳表，支持通过npm或yarn下载，可使用JS Module方式导入或CDN形式引入使用。  \n  \n2. 相关人物相关内容  \n- 克里斯-穆林：NBA名宿，曾在节目中谈及入选梦一队，称自己当时正值巅峰且有过奥运会经历，对此感到荣幸。  \n- 穆祉丞：内娱05后偶像，曾因在音乐节现场喊出专属应援色引发争议，后续回应将“争议”转化为“圈粉现场”。  \n- 穆帅（穆里尼奥）：曾就曼联解雇阿莫林一事发表看法，认为只有当事方清楚具体情况，阿莫林是否公开相关情况由其自己决定。暂时未查询到与“muguilin”相关的公开信息，可能是名称拼写存在误差或相关信息尚未被广泛报道。若您能提供更多背景信息（如行业、地域、相关事件等），我可以帮您进一步核实~'
//   },
// ])

const messages: any = ref([])
const inputValue = ref('')

const saveMessagesToLocalStorage = () => {
  try {
    localStorage.setItem('messages', JSON.stringify(messages.value))
  } catch (error) {
    console.error('Error saving messages to localStorage:', error)
  }
}

const sendMessage = () => {
  if (inputValue.value.trim()) {
    messages.value.push({
      type: 'user',
      content: inputValue.value
    })
    inputValue.value = ''
    saveMessagesToLocalStorage()
  }
}

onMounted(async () => {
  try {
    const token = await getToken()
    console.log(token)
  } catch (error) {
    // messages.value = JSON.parse(localStorage.getItem('messages') || '[]')
    const msg = useLocalStorage<Array<any>>("messages", []);
    console.log(typeof msg.value)
    messages.value = msg.value

  }
})



</script>
<template>
  <header>

  </header>
  <main>
    <article class="chat-box">
      <template v-for="(message, index) in messages" :key="index">
        <section class="chat user" v-if="message.type === 'user'">
          <p>{{ message.content }}</p>
        </section>
        <section class="chat answer" v-else-if="message.type === 'answer'">
          <MarkdownRender :content="message.content" :max-live-nodes="0" :render-batch-size="16" :render-batch-delay="8"
            :is-dark="true" />
        </section>
      </template>
    </article>
  </main>
  <footer>
    <input type="text" v-model="inputValue" placeholder="Type a message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </footer>
</template>

<style scoped lang="less">
header {
  height: 50px;
}

.chat-box {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  background-color: #F5F5F5;
  overflow-y: auto;

  .chat {
    margin: 1rem 0;
    padding: 0.5rem;
    max-width: 95%;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }

  .chat.user {
    padding: 1rem;
    align-self: flex-end;
    background-color: #28b561;
    color: #FFF;
  }

  .chat.answer {
    align-self: flex-start;
    background-color: #FFF;
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  input {
    flex: 1;
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
  }
}
</style>
