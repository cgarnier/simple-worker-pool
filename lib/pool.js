const range = require('lodash.range');
const Task = require('./task.js');
const Worker = require('./worker.js');
class Pool {
  constructor (options = {}) {
    this.maxWorkers = options.maxWorkers || 5
    this.debug = options.debug || false
    this.tasks = []
    this.workers = range(this.maxWorkers)
      .map(i => new Worker())
  }
  exec (task) {
    const worker = this.getWorker()
    // Check if worker is available
    if (worker) {
      worker.exec(task)
        .then(() => {
          // when task is done check for another one
          let t = this.tasks.shift()
          if (t) {
            this.exec(t);
          }
        })
    } else {
      this.tasks.push(task)
    }
    if (this.debug) {
      console.log(`${this.tasks.length} Queued tasks, Busy workers [${this.workers.filter(w => w.busy).length}/${this.maxWorkers}]`)      
    }
    return task.promise
  }
  getWorker () {
    return this.workers.find(w => !w.busy)
  }
}

module.exports = Pool
