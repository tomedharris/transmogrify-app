import {base64Decode, base64Encode} from "../../src/commands/base64"

test('it decodes a known base64 encoded string', () => {
    expect(base64Decode.process('V2UncmUgZ29vZCE=')).toBe("We're good!")
})

test('it encodes a string to a known base64 encoding', () => {
    expect(base64Encode.process("We're good!")).toBe('V2UncmUgZ29vZCE=')
})
