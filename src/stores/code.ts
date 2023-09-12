import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {Command} from "@/commands"
import Hashes from "jshashes"
import {useRefHistory} from "@vueuse/core"
import type {Cursor} from "@/lib/cursor";

export const useCodeStore = defineStore('code', () => {
    const code = ref('')
    const {undo, redo} = useRefHistory(code)

    // TODO this is a bit of a mess.
    function applyCommand(command: Command, cursor: Cursor): Promise<{result: string, cursor: Cursor}> {
        return new Promise<{result: string, cursor: Cursor}>((resolve, error) => {
            if (cursor.selectionLength === 0) {
                return command.process(code.value)
                    .then((update: any) => {
                        code.value = update
                        resolve({
                            result: code.value,
                            cursor
                        })
                    })
                    .catch(error)
            }

            command.process(code.value.substring(cursor.position, cursor.position + cursor.selectionLength))
                .then((update: any): void => {
                    code.value = code.value.substring(0, cursor.position) + update + code.value.substring(cursor.position + cursor.selectionLength)
                    cursor.selectionLength = update.length
                    resolve({
                        result: code.value,
                        cursor
                    })
                })
                .catch(error)
        })
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
