import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

const { process, JSON } = globalThis

const isProduction = process.env.NODE_ENV == 'production'

export default defineConfig({
  base: isProduction ? '/toomar/' : '/',

  plugins: [
    ...(!isProduction ? [(await import('solid-devtools/vite')).default()] : []),
    solidPlugin(),
  ],

  server: {
    port: 3000,
  },

  build: {
    target: 'esnext',
    outDir: 'docs'
  }
})
