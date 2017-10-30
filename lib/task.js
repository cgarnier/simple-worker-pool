class Task {
  constructor (fn) {
    this.resolver = null
    this.promise = new Promise((resolve, reject) => this.resolver = {resolve, reject})
    this.fn = fn;
  }
  async run () {
    try {
      const result = await this.fn();
      this.resolver.resolve(result);
    } catch (err) {
      this.resolver.reject(err);
    }
  }
}

module.exports = Task
