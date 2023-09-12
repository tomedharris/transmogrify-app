<script lang="ts" setup>
import {currentDevice} from "@/device"
import type {Command} from '@/commands'
import {onMounted, onUnmounted, ref, watch} from "vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useSettingsStore} from "@/stores/settings";

const props = defineProps<{ commands: Command[] }>()
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
  if (selectedCommandIndex.value in props.commands) {
    return onSelectCommand(props.commands[selectedCommandIndex.value])
  }
}

function onSelectCommand(c: Command) {
  emit('commandSelected', c)
}

const {toggleFavourite, isFavourite} = useSettingsStore()
</script>

<template>
  <ul class="command-list">
    <li
        v-for="(c, i) in commands"
        :key="c.name"
        :class="{'text-white bg-tmog-light-secondary dark:bg-tmog-dark-secondary': selectedCommandIndex == i}"
        class="p-2.5 flex flex-row justify-between items-center cursor-pointer"
        @click="onSelectCommand(c)"
        @mouseover="selectedCommandIndex = i"
    >
      <span class="flex flex-col">
        <span class="flex gap-1 items-center">
          <span v-text="c.name"/>
          <span
              class="hidden text-xs cursor-default"
              :class="{'!inline': selectedCommandIndex == i}"
          >
            <font-awesome-icon @click.stop.prevent="toggleFavourite(c)" :icon="[isFavourite(c) ? 'fas' : 'far', 'star']"/>
          </span>
        </span>
        <span
            class="text-xs"
            :class="{
             'text-white/60': selectedCommandIndex == i,
             'text-tmog-light-text/60': selectedCommandIndex != i
            }"
            v-text="c.description"
        />
      </span>
      <span v-if="!currentDevice.isMobile()">
        <span v-if="selectedCommandIndex == i">&#9166;</span>
        <span v-else>{{ (currentDevice.isMac() ? '⌘' : 'C-') + (i + 1) }}</span>
      </span>
    </li>
  </ul>
</template>