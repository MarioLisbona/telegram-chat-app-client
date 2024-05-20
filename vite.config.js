import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      "/socket.io": {
        target: env.VITE_SERVER_URL || "http://localhost:4000",
        ws: true,
        changeOrigin: true,
      },
    },
  };
});
