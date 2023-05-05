import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from "pinia-plugin-persistedstate";

import App from './App.vue'
import router from './router'

import "@/assets/styles/common.less";
import "normalize.css";


const app = createApp(App)

import plugins from "@/components/library";
app.use(plugins)

app.use(createPinia().use(persistedstate))
app.use(router)

app.mount('#app')