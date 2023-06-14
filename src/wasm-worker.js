let wasmModule

onmessage = function ({ data }) {
  const { id, event, value } = data

  if (event === 'WasmWorkerInit') {
    WebAssembly.instantiateStreaming(fetch(value))
      .then(module => {
        wasmModule = module.instance.exports
        send(id, 'WasmWorkerCreated', Object.keys(wasmModule))
      })
      .catch(error => {
        send(id, 'WasmWorkerError', `error importing wasm ${value}`)
      })
  } else if (wasmModule?.[event]) {
    send(id, event, wasmModule[event](...value))
  } else {
    send(id, 'WasmWorkerError', `invalid event of ${event}`)
  }
}

function send(id, event, value) {
  this.postMessage({ id, event, value })
}