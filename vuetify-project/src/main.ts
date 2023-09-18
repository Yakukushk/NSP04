import {createApp} from 'vue';
// @ts-ignore
import App from './App.vue';
// @ts-ignore
import router from '@/router/index';
import 'vuetify/dist/vuetify.css';
// @ts-ignore
import {registerPlugins} from '@/plugins';
import {createVuetify} from 'vuetify';
import {firebaseApp} from './firebase/country';
import {VueFire, VueFireAuth} from 'vuefire';
import {useDropzone} from "vue3-dropzone";

// @ts-ignore
import {swal} from 'sweetalert';
import {createPinia} from "pinia";
import 'bootstrap/dist/css/bootstrap.min.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);
const pinia = createPinia();


const vuetify = createVuetify();
app.use(vuetify);

library.add(faUserSecret)
// Register VueFire with Firebase app
app.use(VueFire, {firebaseApp});
// @ts-ignore
app.use(VueFireAuth);
app.use(pinia)
registerPlugins(app);
app.use(router);
app.use(swal);
app.use(useDropzone)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
