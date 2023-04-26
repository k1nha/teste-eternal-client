import { createApp } from 'vue';
import './css/tailwind.css';
import App from './App.vue';
import router from './routes/router';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

const myApp = createApp(App);

myApp.use(router);
myApp.use(createPinia());

myApp.use(Quasar, {
  plugins: {},
});

myApp.mount('#app');
