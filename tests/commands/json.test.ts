import {fmtJson, minifyJson} from "../../src/commands/json"

const formattedJson = `{
  "A": {
    "B": [
      "C"
    ]
  }
}`

const minifiedJson = '{"A":{"B":["C"]}}'

test('it formats json', async () => {
    expect(await fmtJson.process(minifiedJson)).toBe(formattedJson)
})

test('it minifies json', async () => {
    expect(await minifyJson.process(formattedJson)).toBe(minifiedJson)
})
