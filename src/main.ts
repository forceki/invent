import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
library.add(fas, far, fab)
dom.watch();
axios.interceptors.response.use(response => {
    // console.log(response.status)
    return response;
});
axios.interceptors.request.use(request => {
    //@ts-ignore
    request.headers.common.Authorization = `Bearer ${Cookies.get('access_token')}`;
    return request;
});

app.use(VueAxios, axios)
app.use(createPinia())

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)

app.use(router)
app.mount('#app')

