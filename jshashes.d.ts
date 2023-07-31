declare module "jshashes" {
    declare class MD5 {
        hex(s: string): string
    }
    declare class SHA1 {
        hex(s: string): string
    }
    declare class SHA256 {
        hex(s: string): string
    }
    declare class SHA512 {
        hex(s: string): string
    }
    declare function CRC32(str: string): number
}