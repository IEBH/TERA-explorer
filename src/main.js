// Base Vue/Vite app bootstraping
import {createApp} from 'vue'

import App from './App.vue';
let app = globalThis.app = createApp(App);


// Global vendor includes
import './bootstrap.vue';


// $tera
import TeraFy from '@iebh/tera-fy';
import TerafyVue from '@iebh/tera-fy/plugins/vue';
let terafy = await new TeraFy()
	.set('devMode', import.meta.env.DEV)
	.set('siteUrl', 'http://localhost:5173/embed') // Uncomment the next line if running TERA locally
	.use(TerafyVue) // Add the Vue plugin
	.init(); // Initialize everything

app.use(terafy.vuePlugin({
	globalName: '$tera', // Install as vm.$tera into every component
}));


// Mount + go
app.mount('#app')
