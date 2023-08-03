import type {Command} from "./index"

export const uriDecode = <Command>{
    id: 'uri-decode',
    name: 'URI Decode',
    process: async (str: string) => decodeURIComponent(str),
    tags: ['uri', 'url', 'decode']
}

export const uriEncode = <Command>{
    id: 'uri-encode',
    name: 'URI Encode',
    process: async (str: string) => encodeURIComponent(str),
    tags: ['uri', 'url', 'encode']
}
