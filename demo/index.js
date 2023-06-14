import { WasmWorker } from "../src/main.js"

const module = await new WasmWorker('../demo/release.wasm')

module.add(1, 2)
  .then(console.log)