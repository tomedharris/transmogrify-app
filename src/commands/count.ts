import type {Command} from "./index"

export const countChars = <Command>{
    id: 'count-char',
    name: 'Count Characters',
    process: async (str: string) => [...str].length + '',
    tags: ['count', 'total']
}
