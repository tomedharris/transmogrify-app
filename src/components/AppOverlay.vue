<script lang="ts" setup>
import {currentDevice} from "@/device"
const props = withDefaults(defineProps<{
  show: boolean
}>(), {
  show: false,
})
</script>

<template>
  <div
      :class="{
          fixed: show,
          hidden: !show
      }"
      class="
          h-full top-0 right-0 bottom-0 left-0
          text-tmog-light-text dark:text-tmog-dark-text
          bg-white dark:bg-tmog-dark-primary
          z-30
      "
  >
    <div class="shadow-md h-12 lg:h-16 bg-tmog-light-primary text-white dark:bg-tmog-dark-secondary">
      <div class="items-center flex h-full max-w-screen-2xl mx-auto px-6">
        <slot name="header"/>
        <span class="absolute top-3 right-4 lg:top-4 lg:right-5 text-2xl pl-5 flex flex-col" @click="$emit('close')">
          <font-awesome-icon :icon="['fas', 'times']" />
          <span class="text-xs text-white/50 hidden lg:inline" v-if="!currentDevice.isMobile()">[ESC]</span>
        </span>
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-6 pt-6 bg-white">
      <slot/>
    </div>
  </div>
</template>