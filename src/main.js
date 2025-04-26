import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MathJaxView from './views/MathJaxView.vue'
import PdfSyncView from './views/PdfSyncView.vue'
import RichTextView from './views/RichTextView.vue'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/rich-text'
    },
    {
      path: '/math-jax',
      name: 'MathJax',
      component: MathJaxView
    },
    {
      path: '/pdf-sync',
      name: 'PdfSync',
      component: PdfSyncView
    },
    {
      path: '/rich-text',
      name: 'RichText',
      component: RichTextView
    }
  ]
})

// 创建Vue应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
