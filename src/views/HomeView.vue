<script setup lang="ts">
import CommandPalette from '../components/CommandPalette.vue'
import type {Command} from '@/commands';
import {commands} from '@/commands';
import {useCodeStore} from "@/stores/code";
import TheEditor from "@/components/TheEditor.vue";
import {ref} from "vue";

const editor = ref<null | {focus(): void, focusWithCursorPosition(start: number, end?: number): void}>(null);
const codeStore = useCodeStore();

function onCommandSelected(c: Command) {
  codeStore.applyCommand(c)
}

function onCommandPaletteBlur() {
  editor.value?.focus()
}
</script>

<template>
  <div class="h-full">
    <CommandPalette :commands="commands" @commandSelected="onCommandSelected" @blur="onCommandPaletteBlur" :disabled="codeStore.code == ''"/>
    <TheEditor ref="editor" class="mt-2" />
  </div>
</template>