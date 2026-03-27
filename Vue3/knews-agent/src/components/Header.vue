<script setup lang="ts" name="Header">
import { ref, onMounted } from 'vue'

import { getHotWordApi } from '@/apis/agent'

const hotWord = ref([
    { "name": "K24新闻进行时", "isHot": true },
    { "name": "全国两会", "isHot": true },
    { "name": "今日早报" },
    { "name": "十五五" },
    { "name": "政府工作报告" },
    { "name": "十五五规划" },
    { "name": "OpenClaw" },
    { "name": "中日关系" },
    { "name": "人形机器人" },
    { "name": "扩大内需" }
])

onMounted(async () => {
    const { list = [] } = await getHotWordApi()
    if (list?.length) {
        // 将包含“热点”字样或特定关键名称的项排在前面
        const sorted = [...list].sort((a, b) => {
            const isAHot = a.name.includes('新闻') || a.name.includes('两会');
            const isBHot = b.name.includes('新闻') || b.name.includes('两会');
            return Number(isBHot) - Number(isAHot);
        });
        hotWord.value = sorted;
    }
})
</script>

<template>
    <header>
        <div class="header">
            <div class="info">
                <h2>最新热点如下</h2>
                <p>点击了解更多精彩内容：</p>
            </div>
            <div class="hots">
                <div class="tags">
                    <button v-for="(item, index) in hotWord" :key="index" class="tag"
                        :class="{ 'hot': item.name.includes('新闻') || item.name.includes('两会') }">
                        {{ item.name }}
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    height: 342px;
    background: url('@/assets/img/header-bg.webp') no-repeat;
    background-size: cover;
    /* padding: calc(64px + env(safe-area-inset-top)) 0 0 196px; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .header {
        margin: 45px auto;
        width: calc(100vw - 66px);
        user-select: none;

        .info {
            padding-left: 310px;

            h2 {
                line-height: 48px;
                font-weight: 500;
                font-size: 34px;
                color: #3B3C3F;
                margin: 0;
            }

            p {
                line-height: 33px;
                font-weight: 300;
                font-size: 24px;
                color: #797B7F;
                margin: 0;
            }
        }

        .hots {
            padding: 50px 20px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;

            &::-webkit-scrollbar {
                display: none;
            }

            .tags {
                display: grid;
                grid-template-rows: repeat(2, auto);
                grid-auto-flow: column;
                gap: 16px;
                padding-right: 34px;
                width: max-content;

                .tag {
                    background: #FFFFFF;
                    box-shadow: 0 4px 8px 0 rgba(193, 203, 222, 0.44);
                    border-radius: 8px;
                    padding: 10px 24px;
                    font-weight: 400;
                    font-size: 24px;
                    color: #3B3C3F;
                    white-space: nowrap;
                    max-width: 440px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    border: none;
                    outline: none;
                    cursor: pointer;

                    &.hot {
                        color: var(--van-red);
                    }
                }
            }
        }
    }
}
</style>
