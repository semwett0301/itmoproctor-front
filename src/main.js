import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router/router";
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'



createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .component("Button", Button)
    .component("InputText", InputText)
    .mount('#app')
