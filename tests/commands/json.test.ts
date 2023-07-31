import {fmtJson, minifyJson} from "../../src/commands/json"

const formattedJson = `{
  "A": {
    "B": [
      "C"
    ]
  }
}`

const minifiedJson = '{"A":{"B":["C"]}}'

test('it formats json', () => {
    expect(fmtJson.process(minifiedJson)).toBe(formattedJson)
})

test('it minifies json', () => {
    expect(minifyJson.process(formattedJson)).toBe(minifiedJson)
})
