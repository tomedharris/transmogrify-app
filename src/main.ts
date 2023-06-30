import './assets/index.css'

import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Control Palette behaviour.
const showPalette = ref(false)
window.addEventListener('keydown', (e) => {
  if (e.key == 'k' && e.metaKey) {
    showPalette.value = !showPalette.value
  }
})
app.provide('showPalette', showPalette)

app.mount('#app')
