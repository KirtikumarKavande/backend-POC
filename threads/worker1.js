const { parentPort } = require('worker_threads');

for (let index = 0; index < 1000000000; index++) {}

parentPort.postMessage('done');
