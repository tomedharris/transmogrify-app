import type {Command} from "./index"

export const base64Decode = <Command>{
    id: 'b-64-encode',
    name: 'Base64 Decode',
    process: (str: string) => atob(str),
    tags: ['base64', 'decode']
}

export const base64Encode = <Command>{
    id: 'b-64-decode',
    name: 'Base64 Encode',
    process: (str: string) => btoa(str),
    tags: ['base64', 'encode']
}
