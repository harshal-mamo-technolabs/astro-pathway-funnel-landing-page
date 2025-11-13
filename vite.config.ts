import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin to handle SPA routing fallback for direct URL access
const spaFallback = () => ({
  name: "spa-fallback",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url || "";
      // Check if it's a route (no file extension) and not a static asset
      if (
        url &&
        !url.includes(".") &&
        url !== "/" &&
        !url.startsWith("/api") &&
        !url.startsWith("/src") &&
        !url.startsWith("/@") &&
        !url.startsWith("/node_modules")
      ) {
        // Rewrite to index.html for SPA routing
        req.url = "/index.html";
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  plugins: [
    react(),
    spaFallback(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
