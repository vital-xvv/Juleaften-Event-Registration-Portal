import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import i18n from './i18n/index.js';

const app = createApp(App);

app.use(i18n);

app.mount('#app');