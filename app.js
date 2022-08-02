require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

// Declare API Routes
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

// Calling apiRoutes
app.use('/api', apiRoutes);

app.listen(process.env.APP_PORT, () => console.log (process.env.APP_NAME + ' start at port ' + process.env.APP_PORT + '(http://localhost:'+process.env.APP_PORT+')'));