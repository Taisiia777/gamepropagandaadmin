// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Чтобы приложение слушало на всех интерфейсах
    port: 3000,      // Убедитесь, что порт совпадает с тем, что используете
  },
});
