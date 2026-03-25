import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'


// Vant 官方基于 unplugin-vue-components 提供了自动导入样式的解析器 @vant/auto-import-resolver，两者可以配合使用。
// 相比于常规用法，这种方式可以按需引入组件的 CSS 样式，从而减少一部分代码体积，但使用起来会变得繁琐一些。如果业务对 CSS 的体积要求不是特别极致，我们推荐使用更简便的常规用法。
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // 自动生成 auto-imports.d.ts
    AutoImport({
      resolvers: [VantResolver()],
    }),
    // 自动生成 components.d.ts
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["localhost", ".kankanews.com"],
  },
})
