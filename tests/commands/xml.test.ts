import {fmtXml, minifyXml} from "../../src/commands/xml"

const formattedXml = '<note>\r\n  <to>A</to>\r\n  <from>B</from>\r\n  <body>C</body>\r\n</note>'
const minifiedXml = '<note><to>A</to><from>B</from><body>C</body></note>'

test('it formats xml', async () => {
    expect(await fmtXml.process(minifiedXml)).toBe(formattedXml)
})

test('it minifies xml', async () => {
    expect(await minifyXml.process(formattedXml)).toBe(minifiedXml)
})
