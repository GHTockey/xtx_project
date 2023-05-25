import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from "pinia-plugin-persistedstate";

import App from './App.vue'
import router from './router'

import "@/assets/styles/common.less";
import "normalize.css";


const app = createApp(App);

import plugins from "@/components/library";
app.use(plugins);

app.use(createPinia().use(persistedstate));
app.use(router);

// 开启请求拦截器 (mocks)
import type { SetupWorker } from 'msw';
if(process.env.NODE_ENV === "development") {
   const worker: SetupWorker = require('@/mocks/browser').default;
   worker.start({ onUnhandledRequest: 'bypass' });
}


// (async function () {
// const worker = (await import('@/mocks/browser')).default;
//    worker.start({ onUnhandledRequest: 'bypass' })
// })();
app.mount('#app');