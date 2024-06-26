import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/scss/style.scss";
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import messages from '@/lang';

const app = createApp(App);
const pinia = createPinia()
const i18n = createI18n({
    locale: localStorage.getItem('lang') ?? 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
    legacy: false
})
app.use(VueApexCharts)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(Vue3Toastify, {
    autoClose: 3000,
    theme: 'colored',
  } as ToastContainerOptions)
    .use(vuetify).mount("#app");
