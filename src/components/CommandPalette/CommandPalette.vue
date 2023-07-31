<script lang="ts" setup>
import type {Command} from '@/commands'
import type {Emitter} from "mitt"
import {computed, onMounted, onUnmounted, ref} from "vue"
import {vOnClickOutside} from "@vueuse/components"
import SearchInput from "@/components/CommandPalette/SearchInput.vue"
import CommandList from "@/components/CommandPalette/CommandList.vue"
import {useCodeStore} from "@/stores/code"

const props = withDefaults(defineProps<{
  commands: Command[]
  disabled?: boolean
  commandPaletteBus: Emitter<any>
}>(), {
  disabled: false,
})

const emit = defineEmits(['commandSelected', 'focus', 'blur'])

const searchInput = ref<null | typeof SearchInput>(null)
const commandList = ref<null | typeof CommandList>(null)
const search = ref('')
const showCommands = ref(false)
const codeStore = useCodeStore()

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
    if (showCommands.value) {
      searchInput.value?.blur()
      blur()
      return
    }

    searchInput.value?.focus()
  }

  if (showCommands.value) {
    if (e.key == 'Tab') {
      blur()
    }

    if (e.key == 'Escape') {
      blur()
    }
  }
}

function onClickOutside() {
  if (showCommands.value) {
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
  codeStore.applyCommand(c)
}

function blur() {
  search.value = ''
  if (commandList.value !== null) {
    commandList.value.selectedCommandIndex = 0
  }
  showCommands.value = false
  emit('blur')
  props.commandPaletteBus.emit('blur')
}

function onEnterKey() {
  commandList.value?.selectCommand()
}

</script>

<template>
  <div
      v-on-click-outside="onClickOutside"
      @keydown.enter.stop.prevent="onEnterKey"
      class="text-sm md:text-base"
  >
    <SearchInput ref="searchInput" v-model="search" @focus="showCommands = true"/>
    <div class="relative">
      <CommandList ref="commandList" :commands="filteredCommands" :show="showCommands" class="absolute"
                   @commandSelected="onCommandSelected"/>
    </div>
  </div>
</template>
