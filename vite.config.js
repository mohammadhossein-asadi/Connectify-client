import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      scenes: path.resolve(__dirname, "src/scenes"),
      components: path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://connectify-server-six.vercel.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
