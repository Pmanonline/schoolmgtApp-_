// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 10000, // Change the port to 3000 or any other desired port
  },
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import React from 'react'`,
  },
});
