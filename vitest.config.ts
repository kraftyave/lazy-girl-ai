import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    pool: 'vmThreads',
    isolate: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
