export class Device {
    userAgent: string

    constructor(userAgent: string) {
        this.userAgent = userAgent
    }

    isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(this.userAgent)
    }

    isMac(): boolean {
        return /Mac/i.test(this.userAgent) && !/iPhone/i.test(this.userAgent)
    }

    isWindows(): boolean {
        return /Win/i.test(this.userAgent)
    }

    isLinux(): boolean {
        return /Linux/i.test(this.userAgent)
    }
}

export const currentDevice = new Device(window.navigator.userAgent)