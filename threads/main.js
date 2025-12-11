const { Worker } = require('worker_threads');
const path = require('path');

console.time('Multi Thread');
let completed = 0;

const worker1 = new Worker(path.join(__dirname, 'worker1.js'));
const worker2 = new Worker(path.join(__dirname, 'worker2.js'));
const worker3 = new Worker(path.join(__dirname, 'worker3.js'));

worker1.on('message', () => {
    completed++;
    if (completed === 3) console.timeEnd('Multi Thread');
});

worker2.on('message', () => {
    completed++;
    if (completed === 3) console.timeEnd('Multi Thread');
});

worker3.on('message', () => {
    completed++;
    if (completed === 3) console.timeEnd('Multi Thread');
});