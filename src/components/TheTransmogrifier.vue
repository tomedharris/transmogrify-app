<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { defineProps } from 'vue'

interface Props {
  code?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  placeholder: 'Please enter the code.'
})

// eslint-disable-next-line vue/no-setup-props-destructure
const codeMut = props.code
</script>

<template>
  <Codemirror
    :style="{ height: '100px' }"
    :placeholder="placeholder"
    :model-value="codeMut"
    @update:model-value="codeMut = $event"
  />
</template>
