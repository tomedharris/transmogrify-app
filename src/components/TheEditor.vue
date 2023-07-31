<script lang="ts" setup>
import {highlight, languages} from 'prismjs'
import {useCodeStore} from "@/stores/code"
import {storeToRefs} from "pinia"
import {ref} from "vue"

interface Props {
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Enter text here...'
})

const editor = ref<null | { $refs: { textarea: HTMLInputElement } }>(null)
const codeStore = useCodeStore()
const {code} = storeToRefs(codeStore)
const isFocussed = ref(false)

function detectedLanguage(): string {
  return 'plaintext'
  // return 'js'
}

function highlighter(code: string): string {
  return highlight(code, languages[detectedLanguage()], '')
}

function focus() {
  editor.value?.$refs.textarea.focus()
}

function focusWithCursorPosition(start: number, end?: number) {
  focus()
  editor.value?.$refs.textarea.setSelectionRange(start, end || start)
}

function clearEditor() {
  codeStore.clear()
}

defineExpose({
  focus,
  focusWithCursorPosition,
  clearEditor,
})

function onUndo() {
  codeStore.undo()
}

function onRedo() {
  codeStore.redo()
}
</script>

<template>
  <div
      :class="{
        'border-tmog-light-secondary': isFocussed,
        'border-tmog-light-secondary/30': !isFocussed,
        'dark:border-tmog-dark-secondary': isFocussed,
        'dark:border-tmog-dark-secondary/40': !isFocussed,
      }"
      class="
        font-mono
        h-full overflow-auto py-2.5
        border
      "
  >
    <PrismEditor
        ref="editor"
        v-model="code"
        :highlight="highlighter"
        :line-numbers="true"
        class="my-editor"
        @blur="isFocussed = false"
        @focus="isFocussed = true"
        @keydown.meta.z.exact.stop.prevent="onUndo"
        @keydown.ctrl.z.exact.stop.prevent="onUndo"
        @keydown.meta.shift.z.exact.stop.prevent="onRedo"
        @keydown.ctrl.shift.z.exact.stop.prevent="onRedo"
        @keydown.meta.y.exact.stop.prevent="onRedo"
        @keydown.ctrl.y.exact.stop.prevent="onRedo"
    />
  </div>
</template>

<style>
.my-editor textarea:focus-visible {
  outline: none
}

.my-editor {
  line-height: 1.25rem
}
</style>
