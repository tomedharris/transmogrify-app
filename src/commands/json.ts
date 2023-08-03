import type {Command} from "./index"

export const fmtJson = <Command>{
    id: 'format-json',
    name: 'Format JSON',
    process: async (str: string) => JSON.stringify(JSON.parse(str), null, 2),
    tags: ['beautify']
}

export const minifyJson = <Command>{
    id: 'min-json',
    name: 'Minify JSON',
    process: async (str: string) => JSON.stringify(JSON.parse(str)),
    tags: ['ugly', 'uglify']
}
