<script lang="ts" setup>
import {RouterLink, RouterView} from 'vue-router'
import GithubLogo from "@/components/GithubLogo.vue"
import TmogLogo from "@/components/TmogLogo.vue"
// import logo from "@/assets/lone-logo.png"
import logo from "@/assets/sl-logo.png"

const nav = {
  'Home': '/',
  'About': '/about',
}
</script>

<template>
  <header class="shadow-md h-12 md:h-16 bg-tmog-light-primary text-white dark:bg-tmog-dark-secondary">
    <div class="items-center grid grid-cols-12 h-full max-w-screen-2xl mx-auto px-6">
      <div class="col-span-3 md:col-span-4">
        <RouterLink :to="nav.Home" class="text-xl font-bold">
          <TmogLogo class="h-12 md:h-16 p-2" theme="light" />
        </RouterLink>
      </div>
      <div class="col-span-6 md:col-span-4">
        <RouterView name="middleNav"/>
      </div>
      <nav class="col-span-3 md:col-span-4 ml-auto">
        <a href="https://github.com/tomedharris/transmogrify-app">
          <GithubLogo class="h-12 md:h-16 p-3" theme="light" />
        </a>
      </nav>
    </div>
  </header>
  <main class="w-full max-w-screen-2xl mx-auto px-6 pt-6">
    <RouterView class=""/>
  </main>
</template>

<style scoped></style>
