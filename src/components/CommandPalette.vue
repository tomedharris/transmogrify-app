<script setup lang="ts">
import type {Command} from '@/commands';
import {computed, onMounted, ref} from "vue";
import CommandList from "./CommandList.vue";
import {vOnClickOutside} from "@vueuse/components";

interface Props {
  commands: Command[],
}

const props = defineProps<Props>()
const emit = defineEmits(['commandSelected', 'focus', 'blur'])

const search = ref('');
const showCommands = ref(false);
const input = ref(null);
const inputFocussed = ref(false)

const filteredCommands = computed(() => {
  return props.commands.filter((c: Command) => {
    if (search.value === '' || c.name.toLowerCase().includes(search.value.toLowerCase())) {
      return true;
    }

    const filteredTags = c.tags?.filter((t) => t.toLowerCase().includes(search.value.toLowerCase()));

    return filteredTags !== undefined && filteredTags.length > 0;
  })
})

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key == 'k' && e.metaKey) {
      if (input.value) {
        const v = input.value as HTMLInputElement;
        if (showCommands.value) {
          v.blur();
          blur();
          return;
        }

        v.focus();
      }
    }

    if (e.key == 'ArrowDown') {
      if (showCommands.value) {
        console.log('down')
      }
    }

    if (e.key == 'ArrowUp') {
      if (showCommands.value) {
        console.log('up')
      }
    }
  })
})

function onClickOutside() {
  blur();
}

function onCommandSelected(e: Event) {
  blur()
  emit('commandSelected', e)
}

function blur() {
  showCommands.value = false;
  emit('blur');
}

function onFocus() {
  showCommands.value = true;
  inputFocussed.value = true;
  emit('focus');
}
</script>

<template>
  <div v-on-click-outside="onClickOutside" class="w-1/2 mx-auto">
    <input
        type="text"
        ref="input"
        v-model="search"
        placeholder="Search Transformations"
        class="border text-sm block w-full p-2.5 border-gray-600 placeholder-gray-400 text-white"
        @focus="onFocus"
    >
    <div class="relative">
      <div
          v-if="showCommands"
          class="absolute top-0 w-full border border-t-0 border-gray-600 bg-white text-gray-600 z-20"
      >
        <CommandList :commands="filteredCommands" @commandSelected="onCommandSelected"/>
      </div>
    </div>
  </div>
</template>
