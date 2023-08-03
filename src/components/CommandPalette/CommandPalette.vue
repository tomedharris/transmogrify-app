<script lang="ts" setup>
import type {Command} from '@/commands'
import type {Emitter} from "mitt"
import {computed, nextTick, onMounted, onUnmounted, ref} from "vue"
import {vOnClickOutside} from "@vueuse/components"
import SearchInput from "@/components/CommandPalette/SearchInput.vue"
import CommandList from "@/components/CommandPalette/CommandList.vue"
import {useCodeStore} from "@/stores/code"
import AppOverlay from "@/components/AppOverlay.vue";
import TheTrigger from "@/components/CommandPalette/TheTrigger.vue";

const props = withDefaults(defineProps<{
  commands: Command[]
  disabled?: boolean
  commandPaletteBus: Emitter<any>
}>(), {
  disabled: false,
})

const emit = defineEmits(['commandSelected', 'focus', 'blur'])

const showCommandPallet = ref(false)
const searchInput = ref<null | typeof SearchInput>(null)
const commandList = ref<null | typeof CommandList>(null)
const search = ref('')

const recentCommands = ref<Command[]>([])

const filteredCommands = computed(() => {
  return props.commands.filter((c: Command) => {
    if (search.value === '' || c.name.toLowerCase().includes(search.value.toLowerCase())) {
      return true
    }

    const filteredTags = c.tags?.filter((t) => t.toLowerCase().includes(search.value.toLowerCase()))

    return filteredTags !== undefined && filteredTags.length > 0
  }).slice(0, 9)
})

onMounted(() => window.addEventListener('keydown', keydownHandler))
onUnmounted(() => window.removeEventListener('keydown', keydownHandler))

function keydownHandler(e: KeyboardEvent) {
  if (e.key == 'k' && e.metaKey) {
    if (showCommandPallet.value) {
      blur()
      return
    }

    open()
  }

  if (showCommandPallet.value) {
    if (e.key == 'Tab') {
      blur()
    }

    if (e.key == 'Escape') {
      blur()
    }
  }
}

function onClickOutside() {
  if (showCommandPallet.value) {
    blur()
  }
}

function onCommandSelected(c: Command) {
  search.value = ''

  const idx = recentCommands.value.indexOf(c)
  if (idx > -1) {
    recentCommands.value.splice(idx, 1)
  } else if (recentCommands.value.length >= 3) {
    recentCommands.value.pop()
  }

  recentCommands.value.unshift(c)

  blur()
  emit('commandSelected', c)
}

function blur() {
  search.value = ''
  if (commandList.value !== null) {
    commandList.value.selectedCommandIndex = 0
  }
  showCommandPallet.value = false
  emit('blur')
  props.commandPaletteBus.emit('blur')
}

function open() {
  showCommandPallet.value = true
  nextTick(() => searchInput.value?.focus())
}

function onEnterKey() {
  commandList.value?.selectCommand()
}

</script>

<template>
  <div
      v-on-click-outside="onClickOutside"
      @keydown.enter.stop.prevent="onEnterKey"
  >
    <TheTrigger @click="open()"/>
    <AppOverlay :show="showCommandPallet" @close="blur">
      <template #header>
        <div class="w-full grid grid-cols-12 lg:gap-2">
          <SearchInput ref="searchInput" v-model="search" class="
              col-span-11
              col-start-1
              lg:col-span-6
              lg:col-start-4
          "/>
        </div>
      </template>
      <div class="grid grid-cols-12 lg:gap-2">
        <CommandList
            class="
              col-span-12
              col-start-1
              lg:col-span-6
              lg:col-start-4
            "
            ref="commandList"
            :commands="filteredCommands"
            @commandSelected="onCommandSelected"
        />
      </div>
    </AppOverlay>
  </div>
</template>
