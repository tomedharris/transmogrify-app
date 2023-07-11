import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Command} from "@/commands";

export const useCodeStore = defineStore('code', () => {
  const code = ref('')

  function applyCommand(c: Command) {
    try {
      code.value = c.process(code.value);
    } catch (err) {
      // console.error(err)
    }
  }

  return { code, applyCommand }
})
