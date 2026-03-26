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
    <div>
        <MarkdownRender :content="content" />
    </div>
</template>

<style lang="less" scoped></style>