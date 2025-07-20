// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Use React plugin for React projects
  server: {
    port: 5000, // Development server port
    open: true, // Automatically open browser on start
  },
  build: {
    outDir: "dist", // Output directory for production build
  },
});
