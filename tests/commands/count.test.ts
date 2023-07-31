import {countChars} from "../../src/commands/count"

test('it counts chars', () => {
    expect(countChars.process('hello world')).toBe('11')
    expect(countChars.process('hello 🌎')).toBe('7')
})
