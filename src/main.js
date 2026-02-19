import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

// Create a basic router (required for Analytics component)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: App }
  ]
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
