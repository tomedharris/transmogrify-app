<script lang="ts" setup>
import {currentDevice} from "@/device"
import type {Command} from '@/commands'
import {onMounted, onUnmounted, ref, watch} from "vue"

const props = defineProps<{ commands: Command[], show: boolean }>()
const selectedCommandIndex = ref(0)

const emit = defineEmits(['commandSelected'])

watch(() => props.commands.length, (length) => {
  selectedCommandIndex.value = Math.min(selectedCommandIndex.value, length - 1)
})

defineExpose({
  selectedCommandIndex,
  selectCommand,
})

onMounted(() => window.addEventListener('keydown', keydownHandler))
onUnmounted(() => window.removeEventListener('keydown', keydownHandler))

function keydownHandler(e: KeyboardEvent) {
  if (e.key == 'ArrowDown') {
    if (selectedCommandIndex.value < props.commands.length - 1) {
      selectedCommandIndex.value += 1
    }
  }

  if (e.key == 'ArrowUp') {
    if (selectedCommandIndex.value > 0) {
      selectedCommandIndex.value -= 1
    }
  }

  if ([...Array(9).keys()].map((n) => String(n + 1)).indexOf(e.key) != -1 && e.metaKey) {
    onSelectCommand(props.commands[e.key as unknown as number - 1])
    e.preventDefault()
  }
}

function selectCommand() {
  return onSelectCommand(props.commands[selectedCommandIndex.value])
}

function onSelectCommand(c: Command) {
  emit('commandSelected', c)
}
</script>

<template>
  <div
      v-if="show"
      class="top-0 w-full bg-tmog-light-primary dark:bg-tmog-dark-primary z-20"
  >
    <ul class="command-list">
      <li
          v-for="(c, i) in commands"
          :key="c.name"
          :class="{'bg-tmog-light-secondary dark:bg-tmog-dark-secondary': selectedCommandIndex == i}"
          class="p-2.5 flex flex-row justify-between items-center"
          @click="onSelectCommand(c)"
          @mouseover="selectedCommandIndex = i"
      >
        <span class="flex flex-col">
          <span v-text="c.name"/>
          <span class="text-xs text-white/60" v-text="c.description"></span>
        </span>
        <span v-if="!currentDevice.isMobile()">
          <span v-if="selectedCommandIndex == i">&#9166;</span>
          <span v-else>{{ (currentDevice.isMac() ? '⌘' : 'C-') + (i + 1) }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>