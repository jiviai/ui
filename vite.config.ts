import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["lib"],
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "jivi-ui",
      fileName: (format) => `jivi-ui.${format}.js`,
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
