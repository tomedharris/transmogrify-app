import {uriDecode, uriEncode} from "../../src/commands/uri"

test('it decodes a string to known value', () => {
    expect(uriDecode.process('https%3A%2F%2Fexample.org')).toBe('https://example.org')
})

test('it encodes a string to known value', () => {
    expect(uriEncode.process('https://example.org')).toBe('https%3A%2F%2Fexample.org')
})
