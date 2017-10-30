const Pool = require('../lib/index.js').Pool;
const Task = require('../lib/index.js').Task;

const range = require('lodash.range');
const pool = new Pool({maxWorkers: 3, debug: true});
range(100)
  .map(i => {
    return new Task(() => {
      console.time('task ' + i)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.timeEnd('task ' + i)
          resolve(i)
        }
        , 200);
      })
    })
  })
  .forEach(task => pool.exec(task));
