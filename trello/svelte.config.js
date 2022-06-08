import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import path from 'path';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss:{
			prependData: `@import './src/scss/main.scss';`
		},

		postcss:{
			plugins:[
				autoprefixer
			]
		}
	}),
	kit: {
		adapter: adapter(),

		vite:{
			resolve:{
				alias:{
					'@components': path.resolve('./src/lib/components'),
					'@store': path.resolve('./src/lib/store'),
					'@actions': path.resolve('./src/actions'),
				}
			}
		}
	},
	experimental: {
		useVitePreprocess: true
	},
	
};

export default config;
