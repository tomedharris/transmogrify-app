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

function onBlur() {
  // TODO focus editor.
}
</script>

<template>
  <div>
    <CommandPalette :commands="commands" @commandSelected="onCommandSelected" @blur="onBlur"/>
    <TheEditor/>
  </div>
</template>
