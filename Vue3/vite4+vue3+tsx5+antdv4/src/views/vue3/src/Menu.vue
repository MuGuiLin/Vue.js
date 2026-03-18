<script setup lang="ts">
import { h, ref, reactive, watch, onMounted } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'
import { vue3Route, useRouter } from '@/router/modules/vue3'
import { useTheme } from '@/hooks/useTheme2'
const { theme } = useTheme()
const { push } = useRouter()

const items = ref([
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: 'Option 1',
    title: 'Option 1'
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: 'Option 2',
    title: 'Option 2'
  },
  {
    key: '3',
    icon: () => h(InboxOutlined),
    label: 'Option 3',
    title: 'Option 3'
  },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      {
        key: '5',
        label: 'Option 5',
        title: 'Option 5'
      },
      {
        key: '6',
        label: 'Option 6',
        title: 'Option 6'
      },
      {
        key: '7',
        label: 'Option 7',
        title: 'Option 7'
      },
      {
        key: '8',
        label: 'Option 8',
        title: 'Option 8'
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [
      {
        key: '9',
        label: 'Option 9',
        title: 'Option 9'
      },
      {
        key: '10',
        label: 'Option 10',
        title: 'Option 10'
      },
      {
        key: 'sub3',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
            title: 'Option 11'
          },
          {
            key: '12',
            label: 'Option 12',
            title: 'Option 12'
          }
        ]
      }
    ]
  }
])

const state = reactive({
  collapsed: false,
  selectedKeys: [1],
  openKeys: ['Vue3语法'],
  preOpenKeys: ['Vue3语法']
})

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}

const onClick = (o) => {
  console.log(o)
  push(o.item.path)
}

onMounted(() => {
  items.value = vue3Route[0].children.map((o, i) => {
    return {
      key: i + 1,
      icon: () => h(DesktopOutlined),
      label: o.meta.title,
      title: o.meta.title,
      path: o.path
    }
  })
})
</script>

<template>
  <div style="width: 200px">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
      :theme="theme"
      :items="items"
      mode="inline"
      :inline-collapsed="state.collapsed"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      @click="onClick"
    ></a-menu>
    <select  class="theme-select" v-model="theme">
      <option value="light">亮色</option>
      <option value="dark">暗色</option>
      <option value="os">跟随系统</option>
    </select>
  </div>
</template>