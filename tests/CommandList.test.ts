import CommandList from "@/CommandList"
import {Command} from "../src/commands";
import {expect} from "vitest";

function commandFactory({name, tags=[]}: Command) {
    return {
        id: name.toLowerCase().replace(' ', '-'),
        name,
        tags,
        process: () => Promise.resolve(''),
    } as Command
}

const firstCommand = commandFactory({name: 'First Command', tags: ['tag_a']})
const secondCommand = commandFactory({name: 'Second Command'})
const thirdCommand = commandFactory({name: 'Third Command'})
const fourthCommand = commandFactory({name: 'Fourth Command'})
const fifthCommand = commandFactory({name: 'Fifth Command'})
const sixthCommand = commandFactory({name: 'Sixth Command'})
const commands = [firstCommand, secondCommand, thirdCommand, fourthCommand, fifthCommand, sixthCommand]

const commandList = new CommandList(commands)

test('it can be searched', async () => {
    expect(commandList.search('')).toContain(firstCommand)
    expect(commandList.search('')).toContain(secondCommand)
    expect(commandList.search('First')).toContain(firstCommand)
    expect(commandList.search('First')).not.toContain(secondCommand)
    expect(commandList.search('Second')).toContain(secondCommand)
    expect(commandList.search('Second')).not.toContain(firstCommand)
    expect(commandList.search('Command')).toContain(firstCommand)
    expect(commandList.search('Command')).toContain(secondCommand)
    expect(commandList.search('tag_a')).toContain(firstCommand)
    expect(commandList.search('tag_a')).not.toContain(secondCommand)
    expect(commandList.search('ABC123')).toStrictEqual([])
})

test('recently selected commands are promoted', () => {
    expect(commandList.select(secondCommand)).toBe(secondCommand)
    expect(commandList.search('')[0]).toBe(secondCommand)
    expect(commandList.search('')[1]).toBe(firstCommand)
    expect(commandList.search('Second')[0]).toBe(secondCommand)
    expect(commandList.search('First')[0]).toBe(firstCommand)
    expect(commandList.select(fifthCommand)).toBe(fifthCommand)
    expect(commandList.search('')[0]).toBe(fifthCommand)
    expect(commandList.search('')[1]).toBe(secondCommand)
    expect(commandList.search('')[2]).toBe(firstCommand)
})

test('only the 3 most recently selected commands are promoted', () => {
    expect(commandList.select(secondCommand)).toBe(secondCommand)
    expect(commandList.select(fourthCommand)).toBe(fourthCommand)
    expect(commandList.select(sixthCommand)).toBe(sixthCommand)
    expect(commandList.search('')[0]).toBe(sixthCommand)
    expect(commandList.search('')[1]).toBe(fourthCommand)
    expect(commandList.search('')[2]).toBe(secondCommand)
    expect(commandList.search('')[3]).toBe(firstCommand) // The first non-recent command.
    expect(commandList.select(thirdCommand)).toBe(thirdCommand)
    expect(commandList.search('')[0]).toBe(thirdCommand)
    expect(commandList.search('')[1]).toBe(sixthCommand)
    expect(commandList.search('')[2]).toBe(fourthCommand)
    expect(commandList.search('')[3]).toBe(firstCommand) // Second command should be knocked out of 3 most recent.
    expect(commandList.search('')[4]).toBe(secondCommand)
})
