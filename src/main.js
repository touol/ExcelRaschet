import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
// import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import localeRu from './ru.json';

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'pvtables/dist/pvtables/style.css'

const app = createApp(App);

app.use(PrimeVue, { ripple: true, locale: localeRu.ru });

app.use(ToastService);
// app.component('Toast', Toast);

app.mount('#excelraschet')
