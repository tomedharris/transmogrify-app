import type {Command} from "./index"
import axios from "axios"
import type {AxiosResponse} from "axios"
import type {ResponsePayload} from "@/lib/functions/response";
import {getResponseContent} from "@/lib/functions/response";
import type {RequestPayload} from "@/lib/functions/request";
import {makeRequestPayload} from "@/lib/functions/request";

export const fmtXml = <Command>{
    id: 'format-xml',
    name: 'Format XML',
    process: async (str: string) => {
        const result: AxiosResponse = await axios
            .post<ResponsePayload, AxiosResponse<ResponsePayload>, RequestPayload>('/.netlify/functions/xmlfmt', makeRequestPayload(str))

        return getResponseContent(result.data)
    },
    tags: ['beautify']
}

export const minifyXml = <Command>{
    id: 'minify-xml',
    name: 'Minify XML',
    process: async (str: string) => str
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim()
        .replace(/>\s+</g, '><'),
    tags: ['ugly', 'uglify']
}
