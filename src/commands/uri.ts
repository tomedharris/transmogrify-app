import type {Command} from "./index"

export const uriDecode = <Command>{
    name: 'URI Decode',
    process: (str: string) => decodeURIComponent(str),
    tags: ['uri', 'url', 'decode']
}

export const uriEncode = <Command>{
    name: 'URI Encode',
    process: (str: string) => encodeURIComponent(str),
    tags: ['uri', 'url', 'encode']
}
