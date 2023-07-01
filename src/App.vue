<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const nav = {
  'Home': '/',
  'About': '/about',
}
</script>

<template>
  <header class="py-4">

    <div class="flex items-center">
      <a href="/" class="text-xl font-bold">Transmogrify</a>

      <nav class="ml-auto">
        <RouterLink v-for="(to, text) in nav" :key="text" :to="to" class="pl-4">{{text}}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="" />
</template>

<style scoped></style>
