require('dotenv').config();

const config = {
  apiEnpoint: '/api',
  serveDoc: true,
  serveClientEx: true,
  docEndpoint: '/doc',
  clientEndpoint: '/',
  useMongo: process.env.USE_MONGO || false,   // to save debe to mongodb
  cacheAPI: process.env.CACHE_API || false,   // for /debe endpoint
  limitAPI: process.env.LIMIT_API || false,
};

module.exports = config;
