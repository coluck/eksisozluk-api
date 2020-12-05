const path = require('path');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');



const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false,
}));



module.exports = app;
