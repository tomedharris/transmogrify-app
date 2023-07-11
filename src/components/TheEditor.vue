<script setup lang="ts">
import {highlight, languages} from 'prismjs';
import {useCodeStore} from "@/stores/code";
import {storeToRefs} from "pinia";
import {ref} from "vue";

interface Props {
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Enter text here...'
})

const editor = ref<null | {$refs: {textarea: HTMLInputElement}}>(null);
const codeStore = useCodeStore();
const {code} = storeToRefs(codeStore)
const isFocussed = ref(false);

function detectedLanguage(): string {
  return 'js';
}

function highlighter(code: string): string {
  return highlight(code, languages[detectedLanguage()], '')
}

function focus() {
  editor.value?.$refs.textarea.focus();
}

function focusWithCursorPosition(start: number, end?: number) {
  focus()
  editor.value?.$refs.textarea.setSelectionRange(start, end || start);
}

defineExpose({
  focus,
  focusWithCursorPosition,
})
</script>

<template>
  <div class="h-full overflow-auto py-1 border" :class="{'border-amber-600': isFocussed}">
    <PrismEditor ref="editor" class="my-editor" v-model="code" :highlight="highlighter" :line-numbers="true"
                 @focus="isFocussed = true" @blur="isFocussed = false"/>
  </div>
</template>

<style>
.prism-editor-wrapper textarea:focus-visible {
  outline: none;
}
</style>
