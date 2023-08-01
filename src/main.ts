import './assets/index.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'

import {PrismEditor} from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/themes/prism-tomorrow.min.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript.js'

const app = createApp(App)

app.use(createPinia())
app.component('PrismEditor', PrismEditor)
app.mount('#app')
