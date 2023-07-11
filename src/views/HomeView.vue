<script setup lang="ts">
import CommandPalette from '../components/CommandPalette.vue'
import type {Command} from '@/commands';
import {commands} from '@/commands';
import {useCodeStore} from "@/stores/code";
import TheEditor from "@/components/TheEditor.vue";

const codeStore = useCodeStore();

function onCommandSelected(c: Command) {
  codeStore.applyCommand(c)
}

function onCommandPaletteBlur() {
  // TODO focus editor.
}
</script>

<template>
  <div class="h-full">
    <CommandPalette :commands="commands" @commandSelected="onCommandSelected" @blur="onCommandPaletteBlur" :disabled="codeStore.code == ''"/>
    <TheEditor class="mt-2" />
  </div>
</template>