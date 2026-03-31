<script setup lang="ts" name="Render">
import "markstream-vue/index.css";
import MarkdownRender from "markstream-vue";
interface Props {
    content: string;
    isOver?: boolean;
    isLast?: boolean;
}
const props = defineProps<Props>();
</script>

<template>
    <div class="render">
        <MarkdownRender :content="content" />
    </div>
</template>

<style scoped>
.render:deep(.markdown-render) {
    font-weight: 400;
    font-size: 28px;
    color: var(--kk-black);
    line-height: 48px;
}
</style>