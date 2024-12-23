import { ref, watchEffect, getCurrentInstance } from 'vue';
type Theme = 'light' | 'dark' | 'os';
const STORE_KEY = '__hteme__';

// 获取本地主题
const theme = ref<Theme>(localStorage.getItem(STORE_KEY) as Theme || 'dark');

// 获取系统主题
const match = window.matchMedia('(prefers-color-scheme: dark)')

const setOsTheme = () => {
    theme.value = match.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
};

// 监听theme变量值变化
watchEffect(() => {
    localStorage.setItem(STORE_KEY, theme.value);
    if ('os' === theme.value) {
        setOsTheme();
        // 注册监听系统主题变化
        match.addEventListener('change', setOsTheme);
    } else {
        match.removeEventListener('change', setOsTheme);
        // document.documentElement.dataset.theme = theme.value;
        document.documentElement.setAttribute('data-theme', theme.value);
    }
});

export function useTheme() {
    return {
        theme
    }
};