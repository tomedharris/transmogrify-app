import type {Command} from "@/commands";

export default class CommandList {
    commands: Command[]
    recent: string[]

    constructor(commands: Command[]) {
        this.commands = commands
        this.recent = []
    }

    select(c: Command): Command {
        const idx = this.recent.indexOf(c.id)
        if (idx > -1) {
            this.recent.splice(idx, 1)
        } else if (this.recent.length >= 3) {
            this.recent.pop()
        }

        this.recent.unshift(c.id)

        return c
    }

    search(search: string): Command[] {
        return this.sorted().filter((c: Command) => this.filterCommand(search.toLowerCase(), c)).slice(0, 9)
    }

    private sorted(): Command[] {
        return [...this.commands].sort((a, b) => this.sortCommand(a, b, this.recent))
    }

    private filterCommand(search: string, c: Command): boolean {
        if (search === '' || c.name.toLowerCase().includes(search)) {
            return true
        }

        const filteredTags = c.tags?.filter((t) => t.toLowerCase().includes(search))

        return filteredTags !== undefined && filteredTags.length > 0
    }

    private sortCommand(a: Command, b: Command, recent: string[]): number {
        const aIdx = recent.indexOf(a.id)
        const bIdx = recent.indexOf(b.id)

        // If neither `a` nor `b` are recent, no change.
        if (aIdx === -1 && bIdx === -1) {
            return 0
        }

        // If `a` is not recent, promote `b`.
        if (aIdx === -1) {
            return 1
        }

        // If `b` is not recent, promote `a`.
        if (bIdx === -1) {
            return -1
        }

        // They are both recent. Promote the command with the lower index.
        return bIdx > aIdx ? -1 : 1
    }
}