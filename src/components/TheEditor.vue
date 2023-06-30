<script setup lang="ts">
import { highlight, languages } from 'prismjs/components/prism-core';
import {defineProps} from 'vue'
import {useCodeStore} from "@/stores/code";
import {storeToRefs} from "pinia";

interface Props {
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Enter text here...'
})

const codeStore = useCodeStore();
const {code} = storeToRefs(codeStore)

function detectedLanguage(): string {
  return 'js';
}

function highlighter(code: string): string {
  return highlight(code, languages[detectedLanguage()])
}

</script>

<template>
  <PrismEditor class="my-editor" v-model="code" :highlight="highlighter" :line-numbers="true"/>
</template>