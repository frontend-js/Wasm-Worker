const c = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2xldCBzO29ubWVzc2FnZT1mdW5jdGlvbih7ZGF0YTpufSl7Y29uc3R7aWQ6cixldmVudDplLHZhbHVlOm99PW47ZT09PSJXYXNtV29ya2VySW5pdCI/V2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcoZmV0Y2gobmV3IFVSTChvLGxvY2F0aW9uLm9yaWdpbikpKS50aGVuKGk9PntzPWkuaW5zdGFuY2UuZXhwb3J0cyx0KHIsIldhc21Xb3JrZXJDcmVhdGVkIixPYmplY3Qua2V5cyhzKSl9KS5jYXRjaChpPT57dChyLCJXYXNtV29ya2VyRXJyb3IiLGBlcnJvciBpbXBvcnRpbmcgd2FzbSAke299YCl9KTpzPy5bZV0/dChyLGUsc1tlXSguLi5vKSk6dChyLCJXYXNtV29ya2VyRXJyb3IiLGBpbnZhbGlkIGV2ZW50IG9mICR7ZX1gKX07ZnVuY3Rpb24gdChuLHIsZSl7Z2xvYmFsVGhpcy5wb3N0TWVzc2FnZSh7aWQ6bixldmVudDpyLHZhbHVlOmV9KX19KSgpOwo=", d = typeof window < "u" && window.Blob && new Blob([atob(c)], { type: "text/javascript;charset=utf-8" });
function b() {
  let e;
  try {
    if (e = d && (window.URL || window.webkitURL).createObjectURL(d), !e)
      throw "";
    return new Worker(e);
  } catch {
    return new Worker("data:application/javascript;base64," + c);
  } finally {
    e && (window.URL || window.webkitURL).revokeObjectURL(e);
  }
}
class h {
  #t = {};
  #e = {};
  constructor(r) {
    return this.#t = new b(), this.#t.addEventListener("message", ({ data: s }) => {
      const { id: t, event: n, value: o } = s;
      if (!this.#e[t])
        return console.error("event promise does not exist");
      if (n === "WasmWorkerCreated") {
        const i = {};
        o.forEach((a) => {
          i[a] = (...l) => this.#r(Math.random(), a, l);
        }), this.#e[t].resolve(i);
      } else
        n === "WasmWorkerError" ? this.#e[t].reject(o) : this.#e[t].resolve(o);
    }), this.#r(Math.random(), "WasmWorkerInit", r);
  }
  async #r(r, s, t) {
    return this.#t.postMessage({ id: r, event: s, value: t }), new Promise((n, o) => {
      this.#e[r] = { resolve: n, reject: o };
    });
  }
}
export {
  h as WasmWorker
};
