const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors()); // Allow Cross-Origin requests
app.use(helmet({ // Set security HTTP headers
    contentSecurityPolicy: false,
}));

module.exports = app;