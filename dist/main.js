class c {
  #s = {};
  #e = {};
  constructor(r) {
    return this.#s = new Worker(new URL("/assets/wasm-worker-6bb6d5cd.js", self.location)), this.#s.addEventListener("message", ({ data: o }) => {
      const { id: e, event: t, value: s } = o;
      if (!this.#e[e])
        return console.error("event promise does not exist");
      if (t === "WasmWorkerCreated") {
        const n = {};
        s.forEach((a) => {
          n[a] = (...i) => this.#r(Math.random(), a, i);
        }), this.#e[e].resolve(n);
      } else
        t === "WasmWorkerError" ? this.#e[e].reject(s) : this.#e[e].resolve(s);
    }), this.#r(Math.random(), "WasmWorkerInit", r);
  }
  async #r(r, o, e) {
    return this.#s.postMessage({ id: r, event: o, value: e }), new Promise((t, s) => {
      this.#e[r] = { resolve: t, reject: s };
    });
  }
}
export {
  c as WasmWorker
};
