<script setup lang="ts">
import CommandPalette from '../components/CommandPalette.vue'
import type {Command} from '@/commands';
import {commands} from '@/commands';
import {inject} from 'vue'
import {useCodeStore} from "@/stores/code";
import TheEditor from "@/components/TheEditor.vue";

const showPalette: any = inject('showPalette')

const codeStore = useCodeStore();

function onCommandSelected(c: Command) {
  codeStore.applyCommand(c)
  showPalette.value = false;
}

const favourites = [];
</script>

<template>
    <CommandPalette :commands="commands" @commandSelected="onCommandSelected" />
    <TheEditor />
</template>
