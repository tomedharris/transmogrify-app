<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const nav = {
  'Home': '/',
  'About': '/about',
}
</script>

<template>
  <header class="flex items-center py-2">
    <RouterLink :to="nav.Home" class="text-xl font-bold">Tmog</RouterLink>
    <nav class="ml-auto">
      <RouterLink v-for="(to, text) in nav" :key="text" :to="to" class="pl-4">{{text}}</RouterLink>
    </nav>
  </header>
  <main class=" w-full pt-4">
    <RouterView class="" />
  </main>
</template>

<style scoped></style>
