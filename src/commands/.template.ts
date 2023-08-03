import type {Command} from "./index"

export const theCommand = <Command>{
    id: 'thecommand',
    name: 'The command',
    process: async (str: string) => str,
    tags: []
}
