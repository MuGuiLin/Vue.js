<script setup lang="ts" name="Footer">
import { ref, onMounted } from 'vue'
import { getHotWordApi } from '@/apis/agent'

const props = defineProps({
    isOver: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits<{
    (e: "on-send", value: string): void;
    (e: "on-stop"): void;
    (e: "on-clear"): void;
    (e: "new-dialog", value: string): void; // 新对话事件
    (e: "to-deep-search", value: boolean): void;
}>();

const content = ref();
const hotWord = ref([
    {
        name: "我要报料",
        isHot: true,
        rank: 1,
        isNew: true,
    },
    {
        name: "我要看电视",
        isHot: false,
        rank: 2,
    },
])

const send = () => {
    emit("on-send", content.value);
    content.value = "";
}

const stop = () => {
    emit("on-stop");
    content.value = "";
}

const clear = () => {
    emit("on-clear");
    content.value = "";
}

onMounted(async () => {
    const { list = [] } = await getHotWordApi()
    if (list?.length) {
        hotWord.value = [...hotWord.value, ...list];
    }
})
</script>

<template>
    <footer>
        <div class="tags-box">
            <button v-for="(item, index) in hotWord" :key="index" :class="{ 'hot': item.isHot }"
                @click="emit('on-send', item.name)">
                {{ item.name }}
            </button>
        </div>
        <div class="input-box">
            <div class="input">
                <input type="text" v-model="content" @keyup.enter="send" placeholder="请输入您的问题" />
                <button v-if="!isOver" class="send" :class="{ 'un': !content }" @click="send"></button>
                <button v-else class="stop" @click="stop"></button>
            </div>
            <button class="clear" :class="{ 'un': isOver }" @click="clear"></button>
        </div>
    </footer>
</template>

<style scoped>
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
    background: #FFFFFF;
    /* box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); */
    z-index: 666;


    &::after {
        content: "内容由AI生成，仅供参考！";
        display: block;
        font-weight: 400;
        line-height: 40px;
        font-size: 24px;
        color: var(--van-blue);
        text-align: center;
    }
}

.tags-box {
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    display: flex;
    gap: 20px;
    user-select: none;
    overflow-x: auto;
    padding: 20px 32px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }

    button {
        padding: 6px 24px;
        line-height: 48px;
        font-size: 26px;
        font-weight: 400;
        border-radius: 12px;
        color: #666666;
        background: #FFFFFF;
        white-space: nowrap;
        border: none;
        outline: none;
        cursor: pointer;

        &.hot {
            background: var(--van-red);
            color: #FFFFFF;
        }
    }
}

.input-box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px 0;

    .input {
        width: 608px;
        height: 70px;
        background: #F6F6F6;
        border-radius: 36px;
        padding: 0 20px 0 30px;
        display: flex;
        align-items: center;

        input {
            flex: 1;
            font-size: 28px;
            color: var(--van-black);
            border: none;
            background: none;
            outline: none;

            &::placeholder {
                color: #999999;
            }
        }

        .send {
            width: 52px;
            height: 52px;
            background: url(@/assets/img/send-btn.webp) no-repeat;
            background-size: cover !important;
            border: none;
            margin-left: 16px;

            &.un {
                background: url(@/assets/img/send-btn-un.webp) no-repeat;
            }
        }

        .stop {
            width: 52px;
            height: 52px;
            background: url(@/assets/img/stop-btn.webp) no-repeat;
            background-size: cover !important;
            border: none;
            margin-left: 16px;
        }
    }

    .clear {
        width: 56px;
        height: 56px;
        background: url(@/assets/img/clear-btn.webp) no-repeat;
        background-size: cover !important;
        border: none;

        &.un {
            background: url(@/assets/img/clear-btn-un.webp) no-repeat;
        }
    }
}
</style>