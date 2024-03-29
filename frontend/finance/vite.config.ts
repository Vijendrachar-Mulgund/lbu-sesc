import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "finance-app",
      remotes: {
        AuthApp: "http://localhost:5170/assets/authRemoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
