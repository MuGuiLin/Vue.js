<template>
  <section class="virtual-box">
    <!-- <div class="virtual">
      原生DOM
      <NativeList :listData="data" :itemSize="100" />
    </div> -->
    <div class="virtual">
      <!-- 虚拟DOM -->
      <VirtualList :listData="data" :itemSize="100" />
    </div>
  </section>
</template>

<script>
import VirtualList from "../components/VirtualList";
// import NativeList from "../components/NativeList";

let d = [];
for (let i = 0; i < 300001; i++) {
  d.push({ id: i, value: i });
}

// setTimeout(() => {
//   for (let i = 100000; i < 200000; i++) {
//     d.push({ id: i, value: i });
//   }
// }, 10000);

export default {
  name: "VirtualDom",
  data() {
    return {
      data: d
    };
  },
  components: {
    // NativeList,
    VirtualList
  }
};
</script>

<style scoped lang="scss">
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
.virtual-box {
  display: flex;
  justify-content: center;
}
.virtual {
  width: 400px;
  height: 600px;
  border: 1px solid gray;
}
</style>