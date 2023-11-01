// Base Vue/Vite app bootstraping
import {createApp} from 'vue'

import App from './App.vue';
let app = globalThis.app = createApp(App);

// Global vendor includes
import './bootstrap.vue';

// Mount + go
app.mount('#app')
