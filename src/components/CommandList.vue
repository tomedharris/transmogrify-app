<script setup lang="ts">
import type {Command} from "@/commands";

interface Props {
  commands: Command[],
}

defineProps<Props>()
defineEmits(['commandSelected'])
</script>

<template>
  <ul>
    <li :key=c.name v-for="c in commands" @click="$emit('commandSelected', c)">
      <span v-text="c.name" />
    </li>
  </ul>
</template>
