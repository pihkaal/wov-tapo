import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: "src/main.ts"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
})
