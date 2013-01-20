module.exports = sample;

var hostname = require("os").hostname();

function sample() {
  return {
    host: hostname,
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  };
};

