<script lang="ts" setup>
import imgUrl from "@/assets/github/cat.svg"
import imgUrlWhite from "@/assets/github/cat-white.svg"

const props = withDefaults(defineProps<{ theme: string }>(), {
  theme: 'light',
})

function srcAttr() {
  return (props.theme === 'light') ? imgUrlWhite : imgUrl
}
</script>

<template>
  <img class="" :src="srcAttr()" alt="GitHub Logo"/>
</template>