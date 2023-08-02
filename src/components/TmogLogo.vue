<script lang="ts" setup>
import imgUrl from "@/assets/black-logo.svg"
import imgUrlWhite from "@/assets/white-logo.svg"

const props = withDefaults(defineProps<{ theme: string }>(), {
  theme: 'light',
})

function srcAttr() {
  return (props.theme === 'light') ? imgUrlWhite : imgUrl
}
</script>

<template>
  <div class="flex justify-start items-end">
    <img class="h-full" :src="srcAttr()" alt="Tmog Logo"/>
    <div class="pl-0.5 text-xs uppercase font-mono [word-spacing:-4px]">Universal <br>Text&nbsp;Transformer</div>
  </div>
</template>
