import { defineComponent, ref } from "vue";
import less from "./style.module.less";
import MuButton from "@/components/tsxcoms/MuButton";

export default defineComponent({
    name: "TSX",
    props: {},
    setup(this, props, ctx) {
        const count = ref(0);
        function push(num: number = 1) {
            count.value++;
        }
        return {
            count,
            push,
        };
    },
    render() {
        console.log(111, this, less);
        const { count } = this;
        return (
            <div
                class={less.color}
                onClick={() => {
                    this.push(66);
                }}
            >
                数据值：<b class={less.big}>{count}</b>
                <MuButton>默认按钮{count}</MuButton>
                <MuButton type="primary">主要按钮{count}</MuButton>
                <MuButton type="success">成功按扭{count}</MuButton>
                <MuButton type="warning">警告按钮{count}</MuButton>
                <MuButton type="error">危险按扭{count}</MuButton>
            </div>
        );
    },
});