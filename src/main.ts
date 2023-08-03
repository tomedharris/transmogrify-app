import './assets/index.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'

import {PrismEditor} from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/themes/prism-tomorrow.min.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faTimes, faStar as faStar, faSpinner} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

library.add(faMagnifyingGlass)
library.add(faTimes)
library.add(faStar)
library.add(farStar)
library.add(faSpinner)

const app = createApp(App)

app.use(createPinia())
app.component('PrismEditor', PrismEditor)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
