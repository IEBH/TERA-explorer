// Base Vue/Vite app bootstraping
import {createApp} from 'vue'

import App from './App.vue';
let app = globalThis.app = createApp(App);


// Global vendor includes
import './bootstrap.vue';


// Tooltips via v-tooltip
import {plugin as VueTippy} from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
app.use(VueTippy, {
	theme: 'material',
	directive: 'tooltip',
	component: 'tooltip',
});


// $tera service
import TeraFy from '@iebh/tera-fy';
import TerafyVue from '@iebh/tera-fy/plugins/vue3';
let terafy = new TeraFy();

// Add dev environment config
if (import.meta.env.VITE_TERAFY_DEV) terafy.set('devMode', true);
if (import.meta.env.VITE_TERAFY_URL) terafy.set('siteUrl', import.meta.env.VITE_TERAFY_URL);

// Boot everything
terafy.use(TerafyVue) // Add the Vue plugin
terafy.init(); // Initialize everything

app.use(terafy.vuePlugin({
	globalName: '$tera', // Install as vm.$tera into every component
}));


// Mount + go
app.mount('#app')
