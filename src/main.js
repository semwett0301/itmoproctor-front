import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router/router";
import PrimeVue from 'primevue/config';


createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .mount('#app')
