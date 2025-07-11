const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/request.log');

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
const logEntry = `[${timestamp}] ${req.method} ${req.originalUrl} from ${req.ip}\n`;

  fs.appendFile(logFilePath, logEntry, () => {});
  next();
};

module.exports = logger;