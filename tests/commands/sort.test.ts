import {shuffle, sort} from "../../src/commands/sort"

const sorted = `Elephant
Frog
Zebra`

const shuffled = `Zebra
Elephant
Frog`

test('it sorts text', () => {
    expect(sort.process(shuffled)).toBe(sorted)
})

test('it shuffles text', () => {
    const result = shuffle.process(sorted)
    expect(result).toContain('Zebra')
    expect(result).toContain('Elephant')
    expect(result).toContain('Frog')
})
