# simple-worker-pool

> A worker pool for node.

Add task to the pool, they will be processed when a worker will be available.

## Install

```
npm install --save simple-worker-pool
```

## Usage

```javascript
const Pool = require('simple-worker-pool').Pool;
const Task = require('simple-worker-pool').Task;
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

```

Example with an async task:
```javascript
const Pool = require('simple-worker-pool').Pool;
const Task = require('simple-worker-pool').Task;
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
```
