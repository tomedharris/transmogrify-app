import {defineStore} from 'pinia'
import {reactive} from "vue"
import type {Command} from "@/commands"
import {set, watchDeep} from "@vueuse/core";
import {getCommandById} from "@/commands";

const STORAGE_KEY = 'tmog_settings';

const defaultSettings: {favourites: Command[]} = {
    favourites: [],
}

const loadSettings = () => {
    const settings: null|string = localStorage.getItem(STORAGE_KEY)
    return settings ? JSON.parse(settings) : defaultSettings;
}

export const useSettingsStore = defineStore('settings', () => {
    const settings = reactive(loadSettings())

    function getSetting(key: string) {
        return settings[key]
    }

    function setSetting(key: string, val: any) {
        set(settings, key, val)
    }

    function clearFavourites() {
        set(settings, 'favourites', [])
    }

    function addFavourite(command: Command) {
        settings.favourites.push(command.id)
    }

    function removeFavourite(command: Command) {
        settings.favourites.splice(settings.favourites.indexOf(command.id), 1)
    }

    function isFavourite(command: Command): boolean {
        return settings.favourites.indexOf(command.id) !== -1
    }

    function toggleFavourite(command: Command) {
        if (isFavourite(command)) {
            removeFavourite(command)
            return
        }

        addFavourite(command)
    }

    function getFavourites(): Command[] {
        return settings.favourites.map(getCommandById)
    }

    watchDeep(settings, async (newSettings) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
    })

    return {settings, clearFavourites, addFavourite, removeFavourite, toggleFavourite, isFavourite, getFavourites}
})
