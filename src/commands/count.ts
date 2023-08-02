import type {Command} from "./index"

export const countChars = <Command>{
    id: 'count-char',
    name: 'Count Characters',
    process: (str: string) => [...str].length + '',
    tags: ['count', 'total']
}
