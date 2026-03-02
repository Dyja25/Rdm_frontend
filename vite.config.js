// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   define: {
//     global: {},
//   },
//   plugins: [react()],
//   esbuild: {
//     jsxFactory: 'React.createElement',
//     jsxFragment: 'React.Fragment',
//   },
//   resolve: {
//     alias: {
//       apexcharts: "apexcharts/dist/apexcharts.esm.js",
//     },
//   },
//   build: {

//     sourcemap: false,
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://erpkorero.tekorero.com', // Replace with your API URL
//         changeOrigin: true,
//         secure: false, // Set to true if your API server uses HTTPS
//         rewrite: (path) => path.replace(/^\/api/, ''),

//       },
//     },
// hmr: {
//   host: 'localhost'
// },
// watch: {
//   disabled: true,
//     },


//   },
// optimizeDeps: {
//   cacheDir: 'node_modules/.vite_cache',
//   },

// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    global: {},
  },
  plugins: [react()],
  resolve: {
    alias: {
      apexcharts: "apexcharts/dist/apexcharts.esm.js",
    },
  },
  build: {
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://erpkorero.tekorero.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: true,
  },
  optimizeDeps: {
    force: true,
  },
})