import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// 让原生CSS支持嵌套语法
import postcssNest from 'postcss-nesting'

// 自动添加浏览器前缀
import autoprefixer from 'autoprefixer'
// 推荐使用维护版插件，原postcss-px-to-viewpor包已不再维护
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

// Vant 官方基于 unplugin-vue-components 提供了自动导入样式的解析器 @vant/auto-import-resolver，两者可以配合使用。
// 相比于常规用法，这种方式可以按需引入组件的 CSS 样式，从而减少一部分代码体积，但使用起来会变得繁琐一些。如果业务对 CSS 的体积要求不是特别极致，我们推荐使用更简便的常规用法。
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// 获取当前版本
import packageJson from "./package.json" with { type: "json" };
const version = packageJson.version ?? "2.0.0";

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
  css: {
    postcss: {
      plugins: [
        // 让原生CSS支持嵌套语法
        postcssNest(),
        // css单位 px转vw
        pxToViewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          // viewportHeight: 1560,
          unitPrecision: 5, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: [], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          // replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false // 是否处理横屏情况
        }),
        // 自动添加浏览器前缀
        autoprefixer({
          // 兼容浏览器版本：最后3个版本，且市场份额大于1%
          overrideBrowserslist: ["last 3 versions", "> 1%"],
        }),
      ],
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    headers: {
      // 允许跨域请求
      'Access-Control-Allow-Origin': '*'
    },
    // 允许访问的域名 列表
    allowedHosts: ["localhost", ".kankanews.com"],
  },
  esbuild: {
    drop: ['console', 'debugger'], // 生产环境移除 console 和 debugger
    legalComments: 'none' // 移除注释，可选：'none' | 'inline' | 'link' | 'external' 分别对应：不保留、保留在文件开头、保留在文件末尾、保留在文件末尾
  },
  build: {
    target: 'esnext', // 目标浏览器版本 esnext 表示支持最新的 ECMAScript 标准
    minify: 'esbuild', // 压缩方式 esbuild 表示使用 esbuild 进行压缩
    // outDir: "dist", // 输出目录
    // assetsDir: "static", // 静态资源目录
    assetsInlineLimit: 360000, // 默认是4096字节（4kb），这里设置成4M
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${version}.[hash].js`,// 主入口js文件
        chunkFileNames: `assets/[name].${version}.[hash].js`,// 其他导入的js模型文件
        assetFileNames: ({ name }) => { // 静态资源文件
          const ext = name?.split(".").pop() ?? "[ext]";
          return `assets/[name].${version}.[hash].${ext}`;
        },
      },
    },
  },
})
