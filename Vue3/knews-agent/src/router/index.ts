import {
  createRouter, createWebHistory, type RouteRecordRaw
} from "vue-router";

import AgentView from '@/views/AgentView.vue'
// 定义路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Agent',
    component: AgentView,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue'),
  // },
  {
    path: '/:pathMatch(.*)',
    name: 'Not Found Page',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
