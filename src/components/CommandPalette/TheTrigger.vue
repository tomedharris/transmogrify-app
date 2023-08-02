<script lang="ts" setup>
import {currentDevice} from "@/device";
</script>

<template>
  <div
      class="
        lg:border lg:border-tmog-light-secondary lg:text-tmog-light-text/60 lg:bg-white
        lg:text-base
        text-xl
        py-2 px-2 lg:px-4 flex justify-center space-x-3
      "
  >
    <span>
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </span>

    <span class="hidden lg:block">
      Search Commands
    </span>

    <span class="hidden lg:block" v-if="currentDevice.isMac()">
      [⌘K]
    </span>

    <span class="hidden lg:block" v-if="currentDevice.isWindows()">
      [C-K]
    </span>

  </div>
</template>