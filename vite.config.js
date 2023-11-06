import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

import { equals } from 'ramda'

const { process } = globalThis

const isProduction = equals(process.env.NODE_ENV, 'production')

export default defineConfig({
  base: isProduction ? '/toomar/' : '/',

  plugins: [
    ...(!isProduction ? [(await import('solid-devtools/vite')).default()] : []),

    solidPlugin(),
  ],

  server: { port: 3000 },

  build: { target: 'esnext', outDir: 'docs' }
})
