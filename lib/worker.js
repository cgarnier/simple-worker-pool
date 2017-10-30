class Worker {
  constructor () {
    this.busy = false
  }
  async exec (task) {
    this.busy = true;
    await task.run()
    this.busy = false;
  }
}

module.exports = Worker
