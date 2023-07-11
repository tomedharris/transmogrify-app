import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Command} from "@/commands";
import Hashes from "jshashes";

export const useCodeStore = defineStore('code', () => {
  const code = ref('')

  function applyCommand(c: Command) {
    try {
      code.value = c.process(code.value);
    } catch (err) {
      // console.error(err)
    }
  }

  function hash(): string {
    return (new Hashes.MD5).hex(code.value);
  }

  return { code, applyCommand, hash }
})
