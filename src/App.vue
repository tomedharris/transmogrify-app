<script lang="ts" setup>
import GithubLogo from "@/components/GithubLogo.vue"
import TmogLogo from "@/components/TmogLogo.vue"
import CommandPalette from "@/components/CommandPalette/CommandPalette.vue"
import {reactive, ref} from "vue";
import type {Command} from "@/commands"
import {commands} from "@/commands"
import {useCodeStore} from "@/stores/code";
import CommandList from "@/CommandList";
import TheEditor from "@/components/TheEditor.vue";
import type {Cursor} from "@/lib/cursor";

const editor = ref<null | typeof TheEditor>(null)
const codeStore = useCodeStore()
const applyingCommand = ref(false)
const commandList = reactive<CommandList>(new CommandList(commands)) as CommandList

function onCommandPaletteBlur() {
  editor.value?.focus()
}

function onCommandSelected(c: Command) {
  applyingCommand.value = true
  if (editor.value !== null) {
    codeStore.applyCommand(c, editor.value?.getCursor())
        .then((result: {result: string, cursor: Cursor}) => {
          applyingCommand.value = false
          editor.value?.setCursor(result.cursor)
        })
        .catch(() => {
          // TODO Alerts
          applyingCommand.value = false
        })
  } else {
    applyingCommand.value = false
  }
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
        <CommandPalette class="max-w-sm mx-auto" @blur="onCommandPaletteBlur" :commands="commandList" @command-selected="onCommandSelected"/>
      </div>
      <nav class="ml-auto hidden sm:block">
        <a href="https://github.com/tomedharris/transmogrify-app">
          <GithubLogo class="h-12 lg:h-16 p-3" theme="light"/>
        </a>
      </nav>
    </div>
  </header>
  <main class="w-full max-w-screen-2xl mx-auto px-6 pt-6">
    <TheEditor ref="editor" class="" :processing="applyingCommand"/>
  </main>
</template>
