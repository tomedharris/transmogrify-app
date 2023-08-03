import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {Command} from "@/commands"
import Hashes from "jshashes"
import {useRefHistory} from "@vueuse/core"

export const useCodeStore = defineStore('code', () => {
    const code = ref('')
    const {undo, redo} = useRefHistory(code)

    function applyCommand(command: Command) {
        try {
            command.process(code.value).then((update: any) => code.value = update)
        } catch (err) {
            // console.error(err)
        }
    }

    function hash(): string {
        return hashString(code.value)
    }

    function clear(): void {
        code.value = ''
    }

    function hashString(str: string): string {
        return Hashes.CRC32(str).toString(16)
    }

    return {code, applyCommand, undo, redo, hash, clear}
})
