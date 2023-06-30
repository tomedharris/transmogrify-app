import Base64Decode from "./base64-decode";
import Base64Encode from "./base64-encode";
import UriDecode from "./uri-decode";
import UriEncode from "./uri-encode";

export interface Command {
    name: string,
    process(str: string): string
    tags?: string[]
}

export const commands: Command[] = [
    Base64Decode,
    Base64Encode,
    UriDecode,
    UriEncode,
]
