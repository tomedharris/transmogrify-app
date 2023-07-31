<script lang="ts" setup>
import {ref} from "vue"
import {currentDevice} from "@/device"

withDefaults(defineProps<{ modelValue: string, disabled?: boolean }>(), {
  disabled: false,
})

const input = ref<null | HTMLInputElement>(null)
const isFocussed = ref(false)

defineExpose({
  focus,
  blur,
})

const emit = defineEmits(['update:modelValue'])

function focus() {
  input.value?.focus()
}

function blur() {
  input.value?.blur()
}

function onFocus() {
  isFocussed.value = true
}

function onBlur() {
  isFocussed.value = false
}

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function formatPlaceholder(): string {
  if (currentDevice.isMac()) {
    return "[⌘K] Search"
  }

  if (currentDevice.isMobile()) {
    return "Search"
  }

  return "[C-K] Search"
}
</script>

<template>
  <input
      ref="input"
      :class="{
          // 'border-4 border-tmog-light-accent': isFocussed,
          // 'border-tmog-light-accent/40': !isFocussed,
          // 'dark:border-tmog-dark-accent': isFocussed,
          // 'dark:border-tmog-dark-accent/40': !isFocussed,
        }"
      :placeholder="formatPlaceholder()"
      :value="modelValue"
      class="
          border
          block w-full p-2 text-center
          outline-none
          text-tmog-light-text
          dark:text-tmog-dark-text
          dark:bg-tmog-dark-primary
          placeholder-tmog-light-secondary/80
          dark:placeholder-tmog-dark-text/40
        "
      type="text"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
  >
</template>