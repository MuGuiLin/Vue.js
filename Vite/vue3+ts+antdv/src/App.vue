<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Home from './views/Home.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <Home />
</template>

<style scoped lang="less" >
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
