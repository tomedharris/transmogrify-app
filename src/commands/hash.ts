import type {Command} from "./index"
import Hashes from "jshashes"

const md5Hasher = new Hashes.MD5
const sha1Hasher = new Hashes.SHA1
const sha256Hasher = new Hashes.SHA256
const sha512Hasher = new Hashes.SHA512

export const md5 = <Command>{
    name: 'MD5',
    process: (str: string) => md5Hasher.hex(str),
    tags: ['hash']
}

export const sha1 = <Command>{
    name: 'SHA1',
    process: (str: string) => sha1Hasher.hex(str),
    tags: ['hash']
}

export const sha256 = <Command>{
    name: 'SHA256',
    process: (str: string) => sha256Hasher.hex(str),
    tags: ['hash']
}

export const sha512 = <Command>{
    name: 'SHA512',
    process: (str: string) => sha512Hasher.hex(str),
    tags: ['hash']
}

export const crc32 = <Command>{
    name: 'CRC32',
    process: (str: string) => Hashes.CRC32(str).toString(16),
    tags: ['hash']
}
