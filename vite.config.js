export default {
  root: 'demo',
  build: {
    outDir: '../dist',
    target: 'esnext',
    emptyOutDir: true,
    lib: {
      entry: '../src/main.js',
      formats: ['es'],
      fileName: 'main'
    }
  },
  server: {
    port: 5000
  }
}