<script setup lang="ts">
import { highlight, languages } from 'prismjs';
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
  return highlight(code, languages[detectedLanguage()], '')
}

</script>

<template>
  <div class="h-full overflow-auto">
    <PrismEditor class="my-editor" v-model="code" :highlight="highlighter" :line-numbers="true"/>
  </div>
</template>
