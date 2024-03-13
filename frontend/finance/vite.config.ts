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
        remoteApp: "http://localhost:5170/assets/remoteEntry.js", // Remove the trailing comma here
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
