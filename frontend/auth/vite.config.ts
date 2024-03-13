import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth-app", // name of the fed group...
      filename: "authRemoteEntry.js", // default file name
      // Modules to expose
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react", "react-dom"], // libs/deps to be shared
    }),
  ],
  build: {
    target: "esnext", // needed to final build
  },
});
