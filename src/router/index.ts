import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommandPalette from "@/components/CommandPalette/CommandPalette.vue"
import {commands} from "@/commands"
import mitt from 'mitt'

const commandPaletteBus = mitt()

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: HomeView,
                middleNav: CommandPalette,
            },
            props: {
                default: {commandPaletteBus},
                middleNav: {commands, commandPaletteBus}
            }
        }
    ]
})

export default router
