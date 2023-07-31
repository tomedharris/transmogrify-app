import {fmtXml, minifyXml} from "../../src/commands/xml"

const formattedXml = '<note>\r\n  <to>A</to>\r\n  <from>B</from>\r\n  <body>C</body>\r\n</note>'
const minifiedXml = '<note><to>A</to><from>B</from><body>C</body></note>'

// TODO Test errors in test context due to `TypeError: xml_formatter_1.default is not a function`
test('it formats xml', () => {
    expect(fmtXml.process(minifiedXml)).toBe(formattedXml)
})

test('it minifies xml', () => {
    expect(minifyXml.process(formattedXml)).toBe(minifiedXml)
})
