<script setup lang="ts">
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
</script>

<template>
  <textarea id="editor" :placeholder="placeholder" v-model="code"></textarea>
</template>
