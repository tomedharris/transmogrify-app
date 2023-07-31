import type {Command} from "./index"

export const base64Decode = <Command>{
    name: 'Base64 Decode',
    process: (str: string) => atob(str),
    tags: ['base64', 'decode']
}

export const base64Encode = <Command>{
    name: 'Base64 Encode',
    process: (str: string) => btoa(str),
    tags: ['base64', 'encode']
}
