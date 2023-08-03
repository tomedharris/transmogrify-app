import {countChars} from "../../src/commands/count"

test('it counts chars', async () => {
    expect(await countChars.process('hello world')).toBe('11')
    expect(await countChars.process('hello 🌎')).toBe('7')
})
