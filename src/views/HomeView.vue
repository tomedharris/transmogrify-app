<script setup lang="ts">
import TheTransmogrifier from '../components/TheTransmogrifier.vue'
import CommandPalette from '../components/CommandPalette.vue'
import { inject } from 'vue'

const showPalette = inject('showPalette')
</script>

<template>
  <main>
    <CommandPalette v-show="showPalette" />
    <TheTransmogrifier />
  </main>
</template>
