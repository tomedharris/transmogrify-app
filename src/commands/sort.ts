import type {Command} from "./index"

export const sort = <Command>{
    name: 'Sort',
    description: 'Sort lines alphabetically',
    process: (str: string) => str.split('\n').sort().join('\n'),
    tags: []
}

export const shuffle = <Command>{
    name: 'Shuffle',
    description: 'Randomize lines',
    process: (str: string) => {
        const lines = str.split('\n')

        for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]]
        }

        return lines.join('\n')
    },
    tags: ['sort']
}
