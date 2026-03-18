<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/agent">Agent</RouterLink>
    </nav>
  </header>
  <main>
    <TheWelcome />
  </main>
</template>
<style scoped lang="less">
header {
  line-height: 1.5;
  max-height: 100vh;

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);

      &:first-of-type {
        border: 0;
      }

      .router-link-exact-active {
        color: var(--color-text);
      }

      .router-link-exact-active:hover {
        background-color: transparent;
      }
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
