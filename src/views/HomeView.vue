<script setup lang="ts">
import CommandPalette from '../components/CommandPalette.vue'
import {Command, commands} from '@/commands';
import {inject} from 'vue'
import {useCodeStore} from "@/stores/code";
import TheEditor from "@/components/TheEditor.vue";

const showPalette = inject('showPalette')

const codeStore = useCodeStore();

function onCommandSelected(c: Command) {
  codeStore.applyCommand(c)
  showPalette.value = false;
}

</script>

<template>
  <main>
    <CommandPalette v-show="showPalette" :commands="commands" @commandSelected="onCommandSelected"/>
    <TheEditor />
  </main>
</template>
