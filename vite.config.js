import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'orsan-maps-vue': fileURLToPath(new URL('./packages/orsan-maps-vue/src/index.js', import.meta.url)),
    },
  },
})
