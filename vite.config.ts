import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('Mo'),
        }
      }
    }), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

//export default defineConfig({
//  plugins: [vue()]
//})