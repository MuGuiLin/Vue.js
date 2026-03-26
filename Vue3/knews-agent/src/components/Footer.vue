<script setup lang="ts" name="Footer">
import { ref, onMounted } from 'vue'

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

})
</script>

<template>
    <footer>
        <div class=""></div>
        <div class="input">
            <input type="text" v-model="content" @keyup.enter="send" placeholder="请输入您的问题！" />
            <button v-if="!isOver" class="send" :class="{ 'un': !content }" @click="send"></button>
            <button v-else class="stop" @click="stop"></button>
        </div>
        <button class="clear" :class="{ 'un': isOver }" @click="clear"></button>
    </footer>
</template>

<style lang="less" scoped>
footer {
    &::after {
        content: "内容由AI生成，仅供参考！";
        display: block;
        line-height: 41px;
        font-weight: 400;
        font-size: 24px;
        color: #3465B1;
        text-align: center;
    }

    .input {
        .send {
            width: 52px;
            height: 52px;
            background: url(@/assets/img/send-btn.webp) no-repeat;
            background-size: cover !important;

            &.un {
                background: url(@/assets/img/send-btn-un.webp) no-repeat;
            }
        }

        .stop {
            width: 52px;
            height: 52px;
            background: url(@/assets/img/stop-btn.webp) no-repeat;
            background-size: cover !important;
        }
    }

    .clear {
        width: 56px;
        height: 56px;
        background: url(@/assets/img/clear-btn.webp) no-repeat;
        background-size: cover !important;

        &.un {
            background: url(@/assets/img/clear-btn-un.webp) no-repeat;
        }
    }
}
</style>