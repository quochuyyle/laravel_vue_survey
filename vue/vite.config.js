import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //CORS POLICY
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://apiservice.com",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  devServer: {
    proxy: 'http://127.0.0.1:8000',
  }
})
