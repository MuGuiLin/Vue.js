<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocalStorage } from "@vueuse/core";
import { getToken } from '@/apis/agent'
import { sse } from '@/utils/sse'
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
    sse();
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
      <Render />
    </main>

    <Footer />
  </section>
</template>

<style scoped lang="less">
.chat-box {}
</style>
