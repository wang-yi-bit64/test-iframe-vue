import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import print from "vue3-print-nb"

createApp(App).use(print).mount('#app')
