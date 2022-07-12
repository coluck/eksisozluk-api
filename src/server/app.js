const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));

module.exports = app;