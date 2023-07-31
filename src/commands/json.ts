import type {Command} from "./index"

export const fmtJson = <Command>{
    name: 'Format JSON',
    process: (str: string) => JSON.stringify(JSON.parse(str), null, 2),
    tags: ['beautify']
}

export const minifyJson = <Command>{
    name: 'Minify JSON',
    process: (str: string) => JSON.stringify(JSON.parse(str)),
    tags: ['ugly', 'uglify']
}
