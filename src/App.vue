<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Suspense } from 'vue'
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/calendar">Calendario de Eventos</RouterLink>
    </nav>
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vh;
  height: 100vh;
  margin: 0 0;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>

