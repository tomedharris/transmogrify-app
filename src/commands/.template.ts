import type {Command} from "./index"

export const theCommand = <Command>{
    id: 'thecommand',
    name: 'The command',
    process: (str: string) => str,
    tags: []
}
