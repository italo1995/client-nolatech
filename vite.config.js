import { svelte } from '@sveltejs/vite-plugin-svelte'
import routify from '@roxi/routify/vite-plugin'
import { defineConfig } from 'vite'
import { mdsvex } from 'mdsvex'
// sass to css
// import postcss from 'rollup-plugin-postcss'
import sveltePreprocess from 'svelte-preprocess'
//sass
// import autoPreprocess from 'svelte-preprocess';

import path from 'path'
import * as sass from 'sass'
const production = process.env.NODE_ENV === 'production'

export default defineConfig({
    clearScreen: false,

    plugins: [
      routify({
        ssr: { enable: false },
      }),
      svelte({
        compilerOptions: {
          dev: !production,
          hydratable: !!process.env.ROUTIFY_SSR_ENABLE,
        },
        extensions: ['.md', '.svelte'],
        preprocess: [mdsvex({extension: 'md'}), sveltePreprocess({
          sass: {
            sync: true,
            implementation: sass,
          },
        })],
      }),
      // postcss()
      // {
      //   extract: true,
      //   minimize: true,
      //   use: [
      //     ['scss', {
      //       includePaths: 
      //       ['./src']
      //       }
      //     ]
      //   ]
      // }
    ],
    resolve: {
        alias: {
          '@': path.resolve('./src'),
          // 'image': path.resolve('/public/image')
        },
    },

    server: { port: 1337 },
})
