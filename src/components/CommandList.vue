<script setup lang="ts">
import type {Command} from "@/commands";

interface Props {
  commands: Command[],
}

defineProps<Props>()
defineEmits(['commandSelected'])
</script>

<template>
  <ul class="command-list">
    <!--    <li :key=c.name v-for="c in commands" @click="$emit('commandSelected', c)">-->
    <li :key=c.name v-for="c in commands">
      <input :id="`command${c.name}`" class="w-0 h-0" type="radio" name="commands" value="c" :data-command="c">
      <label v-text="c.name" :for="`command${c.name}`"/>
    </li>
  </ul>
</template>

<style>
.command-list input[type="radio"]:checked + label {
  background-color: #bbb;
}
</style>
