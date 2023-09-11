import { createApp } from 'vue';
// @ts-ignore
import App from './App.vue';
// @ts-ignore
import router from '@/router/index';
import 'vuetify/dist/vuetify.css';
// @ts-ignore
import { registerPlugins } from '@/plugins';
import { createVuetify } from 'vuetify';
import { firebaseConfig } from './firebase/firebase'
// @ts-ignore
import {config} from "@/firebase/storage";
import { VueFire} from 'vuefire'
// @ts-ignore
import {swal} from "sweetalert";
// @ts-ignore
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
