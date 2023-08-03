<script lang="ts" setup>
import GithubLogo from "@/components/GithubLogo.vue"
import TmogLogo from "@/components/TmogLogo.vue"
import CommandPalette from "@/components/CommandPalette/CommandPalette.vue"
import HomeView from '@/views/HomeView.vue'
import {ref} from "vue";
import type {Command} from "@/commands"
import {commands} from "@/commands"
import mitt from "mitt";
import {useCodeStore} from "@/stores/code";
const commandPaletteBus = mitt()

const codeStore = useCodeStore()
const applyingCommand = ref(false)

function onCommandSelected(c: Command) {
  applyingCommand.value = true
  codeStore.applyCommand(c).then(() => applyingCommand.value = false)
}
</script>

<template>
  <header class="shadow-md h-12 lg:h-16 bg-tmog-light-primary text-white dark:bg-tmog-dark-secondary">
    <div class="items-center flex lg:grid lg:grid-cols-3 lg:gap-2 h-full max-w-screen-2xl mx-auto px-6">
      <div class="flex-grow">
        <a href="/" class="text-xl font-bold">
          <TmogLogo class="h-12 lg:h-16 p-2" theme="light"/>
        </a>
      </div>
      <div class="">
        <CommandPalette class="max-w-sm mx-auto" :command-palette-bus="commandPaletteBus" :commands="commands" @command-selected="onCommandSelected"/>
      </div>
      <nav class="ml-auto hidden sm:block">
        <a href="https://github.com/tomedharris/transmogrify-app">
          <GithubLogo class="h-12 lg:h-16 p-3" theme="light"/>
        </a>
      </nav>
    </div>
  </header>
  <main class="w-full max-w-screen-2xl mx-auto px-6 pt-6">
    <HomeView :command-palette-bus="commandPaletteBus" :applying-command="applyingCommand"/>
  </main>
</template>
