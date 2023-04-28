import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';
import { createApp } from 'vue';
import App from './App.vue';
import './css/tailwind.css';
import router from './routes/router';

// Import icon libraries
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/roboto-font/roboto-font.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

const myApp = createApp(App);
const pinia = createPinia();

myApp.use(pinia);
myApp.use(router);

myApp.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {},
  },
});

myApp.mount('#app');
