import type {Command} from "./index"

export const theCommand = <Command>{
    name: 'The command',
    process: (str: string) => str,
    tags: []
}
