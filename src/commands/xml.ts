import type {Command} from "./index"
import formatXml from 'xml-formatter'

export const fmtXml = <Command>{
    name: 'Format XML',
    process: (str: string) => formatXml(str, {collapseContent: true, indentation: '  '}),
    tags: ['beautify']
}

export const minifyXml = <Command>{
    name: 'Minify XML',
    process: (str: string) => str
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim()
        .replace(/>\s+</g, '><'),
    tags: ['ugly', 'uglify']
}
