<script setup lang="ts" name="Header">
import { ref, onMounted } from 'vue'

import { getHotWordApi } from '@/apis/agent'

const hotWord = ref([
    {
        "name": "十五五"
    },
    {
        "name": "政府工作报告"
    },
    {
        "name": "十五五规划"
    },
    {
        "name": "OpenClaw"
    },
    {
        "name": "中日关系"
    },
    {
        "name": "人形机器人"
    },
    {
        "name": "扩大内需"
    }
])

onMounted(async () => {
    const { list = [] } = await getHotWordApi()
    console.log('hot', list)
    hotWord.value = list;

})
</script>

<template>
    <header></header>
</template>

<style lang="less" scoped>
header {
    height: 342px;
    background: url('@/assets/img/header-bg.webp') no-repeat;
    background-size: cover;
}
</style>