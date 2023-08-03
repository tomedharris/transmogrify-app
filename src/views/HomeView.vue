<script lang="ts" setup>
import TheEditor from "@/components/TheEditor.vue"
import {onMounted, ref} from "vue"
import type {Emitter} from "mitt"

const editor = ref<null | typeof TheEditor>(null)

const props = defineProps<{ commandPaletteBus: Emitter<any>, applyingCommand: boolean }>()

onMounted(() => {
  props.commandPaletteBus.on('blur', () => {
    editor.value?.focus()
  })
})
</script>

<template>
  <div class="h-full">
    <div class="flex flex-row max-w-2xl mx-auto space-x-4">
    </div>
    <TheEditor ref="editor" class="" :processing="applyingCommand"/>
  </div>
</template>