import { createApp } from 'vue'

import router from './router'
import App from './App.vue'
import { getRequest, postRequest, post } from './utils/request'
// createApp(App).use(Element3).mount('#app')

import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'
const app = createApp(App)
app.use(router).use(Element3).mount('#app')


app.config.globalProperties.getRequest = getRequest
app.config.globalProperties.postRequest = postRequest
app.config.globalProperties.post = post