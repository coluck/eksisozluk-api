// import { Router } from 'express';
const express = require('express');
const entry = require('../controllers/entry');
// import thread from '../controllers/thread';
// import entry from '../controllers/entry';
// import debe from '../controllers/debe';
// import user from '../controllers/user';
// import search from '../controllers/search';

const router = express.Router();

let response;


/* GET threads listing. */
// router.get('/basliklar', async function(req, res, next) {
//   response = await thread.list(req.url);
//   res.json(response);
// });

/* GET single thread */
// router.get('/baslik/:slug', async function(req, res, next) {
//   response = await thread.detail(req.url);
//   res.json(response);
// });

/* GET single entry */
router.get('/entry/:id', async function (req, res, next) {
    // console.log(req.params)
    response = await entry(req.params.id);
    res.json(response);
});

/* GET debe entries listing. */
// router.get('/debe', async function(req, res, next) {
//   response = await debe.getDebe();
//   res.json(response);
// });

/* GET user profile */
// router.get('/biri/:nick', async function(req, res, next) {
//   response = await user.getUser(req.params.nick);
//   res.json(response);
// });

/* GET search result */
// router.get('/ara/:query', async function(req, res, next) {
//   response = await search.getSearch(req.url, req.params.query);
//   res.json(response);
// });

/* GET autocomplete search result */
// router.get('/autocomplete/:query', async function(req, res, next) {
//   response = await search.autoComplete(req.params.query);
//   res.json(response);
// });

module.exports = router;