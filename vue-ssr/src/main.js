import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import store from './store'

Vue.config.productionTip = false

// 工厂函数，每次调用都返回一个新的实例
export function createApp(context) {
  const router = createRouter();
  const app = new Vue({
    router,
    context,
    store,
    render: h => h(App)
  })
  return { app, router }
};

