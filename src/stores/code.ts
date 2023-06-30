import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Command} from "@/commands";

export const useCodeStore = defineStore('code', () => {
  const code = ref('let abc = 123')

  function applyCommand(c: Command) {
    code.value = c.process(code.value);
  }

  return { code, applyCommand }
})
