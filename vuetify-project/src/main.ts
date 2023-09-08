import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import 'vuetify/dist/vuetify.css';
import { registerPlugins } from '@/plugins';
import { createVuetify } from 'vuetify';
import { firebaseConfig } from './firebase/firebase'
import {config} from "@/firebase/storage";
import { VueFire} from 'vuefire'
import {swal} from "sweetalert";
import bootstap from'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);

// Create and configure the Vuetify instance
const vuetify = createVuetify();
app.use(vuetify);

registerPlugins(app);
app.use(router);
app.use(swal)
app.use(bootstap)
// @ts-ignore
app.use(VueFire, { firebaseConfig })
app.use(VueFire, { config })
app.mount('#app');
