<script setup lang="ts" name="Footer">
import { ref } from 'vue'

const input = ref();

const send = () => {

    console.log(input.value)

}
</script>

<template>
    <footer>
        <div class=""></div>
        <div class="input">

            <input type="text" v-model="input" placeholder="请输入您的问题！" />
            <button class="send" @click="send"></button>
        </div>
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

    }
}
</style>