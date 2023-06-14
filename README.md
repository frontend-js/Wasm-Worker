# WasmWorker
An effortless approach to executing webassembly within a web worker thread and communicating with it via the main thread

<br>

## How to use WasmWorker


```
npm install wasmworker
```
 
```js
import { WasmWorker } from '@frontend.js/wasm-worker'

const module = await new WasmWorker('/release.wasm')
  
module.add(1, 2)
  .then(console.log) // outputs 3
```

When you initialize WasmWorker with a string specifying the path to the wasm package, the wasm file is downloaded and a promise is returned. This promise, once resolved, will return an object containing functions representing all the exported values from the wasm file