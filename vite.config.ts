import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'node:path'

import vueDevtools from 'vite-plugin-vue-devtools';

import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueJsx(),
    vueDevtools(),
    requireTransform({ fileRegex: /.ts$|.tsx$|.vue$/ }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 配置端口
  server: {
    port: 8080,
    // proxy: {
    //   '*': {
    //     target: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    //     changeOrigin: true,
    //   }
    // }
  },

  // 配置 css 预处理器
  css: {
    preprocessorOptions: {
      // less: {
      //   javascriptEnabled: true,
      // }
      less: {
        modifyVars: {
          hack: `
            true; 
            @import "${join(__dirname, "./src/assets/styles/variables.less")}"; 
            @import "${join(__dirname, "./src/assets/styles/mixin.less")}";
          `,
        },
      },
    }
  },
  // 构建
  build: {
    assetsInlineLimit: 10000
  }
})
