<script setup lang="ts">
import type {Command} from '@/commands';
import {computed, onMounted, ref} from "vue";
import {vOnClickOutside} from "@vueuse/components";

interface Props {
  commands: Command[],
  disabled?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits(['commandSelected', 'focus', 'blur'])

const search = ref('');
const showCommands = ref(false);
const input = ref(null);
const inputFocussed = ref(false);
const selectedCommandIndex = ref(0);

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
      const v = input.value as unknown as HTMLInputElement;
      if (showCommands.value) {
        blur();
        return;
      }

      v.focus();
    }

    if (showCommands.value) {
      if (e.key == 'Tab') {
        blur()
      }

      if (e.key == 'ArrowDown' && inputFocussed.value) {
        if (selectedCommandIndex.value < filteredCommands.value.length - 1) {
          selectedCommandIndex.value += 1;
        }
      }

      if (e.key == 'ArrowUp' && inputFocussed.value) {
        if (selectedCommandIndex.value > 0) {
          selectedCommandIndex.value -= 1;
        }
      }

      if ([...Array(10).keys()].map((n) => String(n)).indexOf(e.key) != -1 && e.metaKey) {
        onCommandExecute(filteredCommands.value[e.key as unknown as number]);
        e.preventDefault();
      }
    }
  })
})

function onClickOutside() {
  if (showCommands.value) {
    blur();
  }
}

function onCommandExecute(c: Command) {
  search.value = '';
  blur()
  emit('commandSelected', c)
}

function onFocus() {
  showCommands.value = true;
  inputFocussed.value = true;
  emit('focus');
}

function blur() {
  const v = input.value as unknown as HTMLInputElement;
  v.blur();
  selectedCommandIndex.value = 0;
  showCommands.value = false;
  emit('blur');
}

function selectedCommand(): Command {
  return filteredCommands.value[selectedCommandIndex.value];
}
</script>

<template>
  <div v-on-click-outside="onClickOutside" @keydown.enter="onCommandExecute(selectedCommand())" class="w-1/2 mx-auto">
    <input
        type="text"
        ref="input"
        v-model="search"
        placeholder="[⌘K] Search"
        class="border text-sm block w-full p-2.5 border-gray-600 placeholder-gray-400"
        @focus="onFocus"
        :disabled="disabled"
    >
    <div class="relative">
      <div
          v-if="showCommands"
          class="absolute top-0 w-full border border-t-0 border-gray-600 bg-white text-gray-600 z-20"
      >
        <ul class="command-list">
          <li
              class="p-2.5 flex flex-row justify-between"
              :class="{'bg-amber-600': selectedCommandIndex == i}"
              :key="c.name" v-for="(c, i) in filteredCommands"
              @mouseover="selectedCommandIndex = i"
              @click="onCommandExecute(c)"
          >
            <span v-text="c.name"/>
            <span v-if="selectedCommandIndex == i">&#9166;</span>
            <span v-else>⌘{{i}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
