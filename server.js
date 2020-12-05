const express = require('express');

const config = require('./config');
const app = require('./app/app');
const apiRouter = require('./app/api');


require('dotenv').config()

if(config.cacheAPI) {
  const NodeCache = require('node-cache');
  const cache = new NodeCache();
  exports.cache = cache;
}

if(config.useMongo) {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  // exports.db = db

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

if(config.limitAPI) {
  const rateLimit = require("express-rate-limit");
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
   
  //  apply to all requests
  app.use(limiter);
}

if(config.serveDoc) {
  app.use(config.docEndpoint, express.static('public/doc'));
}

if(config.serveClientEx) {
  app.use(config.clientEndpoint, express.static('public/client'));
}

app.use(config.apiEnpoint, apiRouter);

const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
  console.log(`eksisozluk-api running on http://localhost:${port}`);
});
