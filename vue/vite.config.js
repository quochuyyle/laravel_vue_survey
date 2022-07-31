import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //CORS POLICY
  server: {
    host: true,
    port: 8080
  },
  // devServer: {
  //   proxy: 'http://127.0.0.1:8000',
  // },
  // resolve: {
  //   alias: {
  //     path: "path-browserify",
  //   },
  // },
})
