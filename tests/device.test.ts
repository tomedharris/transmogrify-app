import {Device} from "../src/device"
import {expect} from "vitest";

const androidUserAgents = [
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
]

const iosUserAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
]

const macUserAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
]

const winUserAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
]


test('isMobile', () => {
    androidUserAgents.concat(iosUserAgents).forEach((userAgent: string) => {
        expect(new Device(userAgent).isMobile()).toBe(true)
    })

    winUserAgents.forEach((userAgent: string) => {
        expect(new Device(userAgent).isMobile()).toBe(false)
    })

    macUserAgents.forEach((userAgent: string) => {
        expect(new Device(userAgent).isMobile()).toBe(false)
    })
})

test('isMac', () => {
    macUserAgents.forEach((userAgent: string) => {
        expect(new Device(userAgent).isMac()).toBe(true)
    })

    winUserAgents.forEach((userAgent: string) => {
        expect(new Device(userAgent).isMac()).toBe(false)
    })

    androidUserAgents.concat(iosUserAgents).forEach((userAgent: string) => {
        expect(new Device(userAgent).isMac()).toBe(false)
    })
})

test('isWindows', () => {
    winUserAgents.forEach((userAgent: string) => {
        expect(new Device(userAgent).isWindows()).toBe(true)
    })

    macUserAgents.forEach((userAgent: string) => {
        expect(new Device(userAgent).isWindows()).toBe(false)
    })

    androidUserAgents.concat(iosUserAgents).forEach((userAgent: string) => {
        expect(new Device(userAgent).isWindows()).toBe(false)
    })
})


