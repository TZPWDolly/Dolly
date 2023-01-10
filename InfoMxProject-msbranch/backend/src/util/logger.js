const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const fs = require('fs');

// log directory path
const logDirectory = path.resolve(__dirname, '../../log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1M',
    path: logDirectory
})


const errorLogStream = rfs('error.log', {
    interval: '1M',
    path: logDirectory
})

module.exports = {
    dev: morgan('dev'),
    combined: morgan('combined', { stream: accessLogStream }),
}