import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    "/socket.io": {
      target: import.meta.env.VITE_SERVER_URL || "http://localhost:4000",
      ws: true,
      changeOrigin: true,
    },
  },
});
