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


// $tera
import TeraFy from '@iebh/tera-fy';
import TerafyVue from '@iebh/tera-fy/plugins/vue';
let terafy = new TeraFy()
	.set('devMode', import.meta.env.DEV)
	.set('siteUrl', 'http://localhost:8000/embed') // Uncomment this line if running TERA locally
	.use(TerafyVue) // Add the Vue plugin

terafy.init(); // Initialize everything

app.use(terafy.vuePlugin({
	globalName: '$tera', // Install as vm.$tera into every component
}));


// Mount + go
app.mount('#app')
