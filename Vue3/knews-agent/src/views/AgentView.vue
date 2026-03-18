<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocalStorage } from "@vueuse/core";
import { getToken } from '@/apis/agent'

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
    const msg = useLocalStorage<Array<any>>("messages", []);
    messages.value = msg.value
  }
})

</script>
<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <button class="back-btn">
          <span class="back-icon">‹</span>
        </button>
        <h1 class="app-title">AI问答助手</h1>
        <button class="settings-btn">
          <span class="settings-icon">⚙</span>
        </button>
      </div>
    </header>

    <main class="app-main">
      <section class="hot-topics">
        <div class="hot-topics-content">
          <div class="cartoon-characters">
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20red%20bird%20and%20blue%20robot%20chatting%2C%20cartoon%20style%2C%20white%20background&image_size=square"
              alt="卡通形象" class="cartoon-img">
          </div>
          <div class="hot-topics-text">
            <h2 class="hot-topics-title">最新热点如下</h2>
            <p class="hot-topics-subtitle">点击了解更多精彩内容：</p>
            <div class="hot-topics-tags">
              <button class="tag">K24新闻进行时</button>
              <button class="tag">今日早报</button>
              <button class="tag">全球首个，即将于</button>
              <button class="tag">全国两会</button>
              <button class="tag">在上海320米高空全新地标俯瞰，是什</button>
              <button class="tag">最新科技突破</button>
              <button class="tag">体育赛事直播</button>
              <button class="tag">娱乐明星动态</button>
              <button class="tag">财经市场分析</button>
              <button class="tag">教育政策解读</button>
              <button class="tag">健康生活指南</button>
            </div>
          </div>
        </div>
      </section>

      <section class="chat-area">
        <!-- 聊天消息区域 -->
      </section>
    </main>

    <footer class="app-footer">
      <div class="footer-buttons">
        <button class="footer-btn">我要报料</button>
        <button class="footer-btn">热门活动</button>
        <button class="footer-btn">我要看电视</button>
      </div>

      <div class="input-area">
        <input type="text" v-model="inputValue" placeholder="请输入您的问题" @keyup.enter="sendMessage" class="message-input">
        <button class="send-btn" @click="sendMessage">
          <span class="send-icon">➤</span>
        </button>
        <button class="attach-btn">
          <span class="attach-icon">📎</span>
        </button>
      </div>

      <div class="disclaimer">
        <p>内容由AI生成，仅供参考</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="less">
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F5F5F5;
}

.app-header {
  height: 50px;
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 16px;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .back-btn,
  .settings-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
  }

  .app-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
}

.app-main {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.hot-topics {
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .hot-topics-content {
    display: flex;
    align-items: flex-start;
  }

  .cartoon-characters {
    margin-right: 16px;
  }

  .cartoon-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .hot-topics-text {
    flex: 1;
  }

  .hot-topics-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #333;
  }

  .hot-topics-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0 0 12px 0;
  }

  .hot-topics-tags {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 8px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
  }

  .tag {
    background-color: #FFF;
    border: 1px solid #E0E0E0;
    border-radius: 16px;
    padding: 6px 12px;
    font-size: 12px;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background-color: #F0F0F0;
    }
  }
}

.chat-area {
  min-height: 300px;
}

.app-footer {
  background-color: #FFF;
  border-top: 1px solid #E0E0E0;
  padding: 12px 16px;

  .footer-buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
  }

  .footer-btn {
    background-color: #FF3B30;
    color: #FFF;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #FF2D1F;
    }
  }

  .input-area {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .message-input {
    flex: 1;
    border: 1px solid #E0E0E0;
    border-radius: 20px;
    padding: 10px 16px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #2196F3;
    }
  }

  .send-btn,
  .attach-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 8px;
    margin-left: 8px;
  }

  .disclaimer {
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
