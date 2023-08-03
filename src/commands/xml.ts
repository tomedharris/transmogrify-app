import type {Command} from "./index"
import formatXml from 'xml-formatter'

export const fmtXml = <Command>{
    id: 'format-xml',
    name: 'Format XML',
    process: async (str: string) => formatXml(str, {collapseContent: true, indentation: '  '}),
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
