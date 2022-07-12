// import express from 'express';

const config = require('./config');
const app = require('./server/app');
const router = require('./server/router');

const port = process.env.PORT || 3000;


app.use(config.apiEndpoint, router); // use the api router for all requests to the api endpoint

// start the server
app.listen(port, () => {
    console.log(`eksisozluk-api running on http://localhost:${port}`);
});