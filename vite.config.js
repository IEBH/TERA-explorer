import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import pluginCloudflareHeaders from 'unplugin-cloudflare-headers/vite'
import pluginTeraFy from '@iebh/tera-fy/plugins/vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	let env = loadEnv(mode, process.cwd(), '');
	// Tidy up SITE_CSP into one horrible long line
	env.SITE_CSP = env.SITE_CSP.replace(/\s+/g, ' ').trim();

	return {
		plugins: [
			vue(),

			pluginCloudflareHeaders({
				'/*': [{'Content-Security-Policy': env.SITE_CSP}],
			}),

			pluginTeraFy(),
		],
		server: {
			headers: {
				'Content-Security-Policy': env.SITE_CSP,
			},
			port: 8080,
		},
	};
});
