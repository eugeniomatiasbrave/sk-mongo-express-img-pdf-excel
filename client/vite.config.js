import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		'process.env': process.env
	  },
	  server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 5173
    }
});

// ok