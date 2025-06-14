import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	build: {
		target: ['es2015'],
	},
	plugins: [react(), VitePWA({
		manifest: {
			icons: [
				{
					"src": "/android-chrome-192x192.png",
					"sizes": "192x192",
					"type": "image/png"
				},
				{
					"src": "/android-chrome-512x512.png",
					"sizes": "512x512",
					"type": "image/png"
				}
			],
		}
	})],
})
