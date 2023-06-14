export class WasmWorker {
  #worker = {}
  #events = {}

  constructor(url) {
    this.#worker = new Worker(new URL('./wasm-worker.js', import.meta.url))
    this.#worker.addEventListener('message', ({data}) => {
      const { id, event, value } = data

      if (!this.#events[id]) return console.error('event promise does not exist')

      if (event === 'WasmWorkerCreated') {
        const module = {}

        value.forEach(item => {
          module[item] = (...values) => {
            return this.#send(Math.random(), item, values)
          }
        })

        this.#events[id].resolve(module)
      } else if (event === 'WasmWorkerError') {
        this.#events[id].reject(value)
      } else {
        this.#events[id].resolve(value)
      }
    })

    return this.#send(Math.random(), 'WasmWorkerInit', url)
  }

  async #send(id, event, value) {
    this.#worker.postMessage({ id, event, value })
    return new Promise((resolve, reject) => {
      this.#events[id] = { resolve, reject }
    })
  }
}
