import { ref, watchEffect } from 'vue';

// 定义主题类型
type Theme = 'light' | 'dark' | 'os';

// 存储主题的key
const STORE_KEY = '__hteme__';

// 获取存储主题
const theme = ref<Theme>(localStorage.getItem(STORE_KEY) as Theme || 'light');

// 获取系统主题
const media = globalThis.matchMedia('(prefers-color-scheme: dark)');

// 监听系统主题变化
const listener = () => {
    document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
}

// 监听theme变量值变化
watchEffect(() => {
    // 更新存储
    localStorage.setItem(STORE_KEY, theme.value);

    if (theme.value === 'os') {
        // 设置系统主题
        listener();
        
        // 监听系统主题变化
        media.addEventListener('change', listener);

    } else {
        // 移除监听
        media.removeEventListener('change', listener);
        document.documentElement.dataset.theme = theme.value;
    }
});

export function useTheme() {
    return {
        theme
    }
};
