import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast, { POSITION } from 'vue-toastification'

import 'animate.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/font.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Toast, { position: POSITION.TOP_RIGHT })
app.mount('#app')
