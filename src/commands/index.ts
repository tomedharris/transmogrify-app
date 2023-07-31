import {base64Decode, base64Encode} from "@/commands/base64"
import {uriDecode, uriEncode} from "@/commands/uri"
import {crc32, md5, sha1, sha256, sha512} from "./hash"
import {countChars} from "@/commands/count"
import {shuffle, sort} from "@/commands/sort"
import {fmtJson, minifyJson} from "@/commands/json"
import {fmtXml, minifyXml} from "@/commands/xml"

export interface Command {
    name: string,
    description?: string,
    tags?: string[]

    process(str: string): string
}

export const commands: Command[] = [
    base64Encode,
    base64Decode,
    uriDecode,
    uriEncode,
    md5,
    sha1,
    sha256,
    sha512,
    crc32,
    countChars,
    sort,
    shuffle,
    fmtJson,
    minifyJson,
    fmtXml,
    minifyXml,
]
