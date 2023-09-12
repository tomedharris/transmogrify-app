<script lang="ts" setup>
import type {Command} from '@/commands'
import {computed, nextTick, onMounted, onUnmounted, ref} from "vue"
import {vOnClickOutside} from "@vueuse/components"
import SearchInput from "@/components/CommandPalette/SearchInput.vue"
import CommandListComponent from "@/components/CommandPalette/CommandList.vue"
import CommandList from "@/CommandList"
import AppOverlay from "@/components/AppOverlay.vue";
import TheTrigger from "@/components/CommandPalette/TheTrigger.vue";
import {useSettingsStore} from "@/stores/settings";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = withDefaults(defineProps<{
  commands: CommandList
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits(['commandSelected', 'focus', 'blur'])

const showCommandPallet = ref(false)
const searchInput = ref<null | typeof SearchInput>(null)
const commandList = ref<null | typeof CommandListComponent>(null)
const search = ref('')

const filteredCommands = computed(() => {
  return props.commands.search(search.value)
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
  blur()
  emit('commandSelected', props.commands.select(c))
}

function blur() {
  search.value = ''
  if (commandList.value !== null) {
    commandList.value.selectedCommandIndex = 0
  }
  showCommandPallet.value = false
  emit('blur')
}

function open() {
  showCommandPallet.value = true
  nextTick(() => searchInput.value?.focus())
}

function onEnterKey() {
  commandList.value?.selectCommand()
}

const {getFavourites, clearFavourites} = useSettingsStore()

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
        <div class="col-span-12 lg:col-span-3">
          <div class="p-2.5" v-if="getFavourites().length > 0">
            <span class="font-bold">Favourites</span> <button @click.stop.prevent="clearFavourites"><font-awesome-icon :icon="['fas', 'broom']"/></button>
            <ul :key="c.name" v-for="c in getFavourites()" @click="onCommandSelected(c)">
              <li class="cursor-pointer hover:underline">
                <span class="flex gap-1 items-center">
                  <span v-text="c.name"/>
                </span>
              </li>
            </ul>
          </div>
          <hr class="lg:hidden">
        </div>
        <CommandListComponent
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
