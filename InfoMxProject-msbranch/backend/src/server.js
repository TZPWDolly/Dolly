
// Register module/require aliases
require('module-alias/register');
const custErr = require('@controllers/custErr.js');
// Patches
const {inject, errorHandler} = require('express-custom-error');
inject(); // Patch express in order to use async / await syntax

// Require Dependencies

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');


const logger = require('@util/logger');

// Load .env Enviroment Variables to process.env

require('mandatoryenv').load([
    'PORT',
    'NOD_ENV'
]);

const { PORT } = process.env;
const { NOD_ENV } = process.env;


// Instantiate an Express Application
const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cookieParser());
if(NOD_ENV === 'production') {
    app.use(cors({ origin: 'https://helathinfo.ehiswgcpi.org',
    optionsSuccessStatus: 200 }));
} else {
    app.use(cors({ origin: '*' }));
}
app.use(helmet());
//app.use(express.static("build"));
// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes

app.use('/', require('@routes/router.js'));


// Handle errors
//app.use(errorHandler());

// Handle not valid route
app.use('*', (req, res, next) => {
    next(new custErr(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
     res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
  })



// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);

