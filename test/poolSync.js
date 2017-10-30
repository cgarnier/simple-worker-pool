const Pool = require('../lib/index.js').Pool;
const Task = require('../lib/index.js').Task;

const range = require('lodash.range');
const pool = new Pool({maxWorkers: 3, debug: true});
range(100)
  .map(i => {
    return new Task(() => {
      console.time('task ' + i);
      console.log('This is task #' + i);
      console.timeEnd('task ' + i);
    })
  })
  .forEach(task => pool.exec(task));
