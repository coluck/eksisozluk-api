const axios = require('axios');
const cheerio = require('cheerio');

const entryJs = require('./entry');
const config = require('../config');
const server = require('../server');

const URLS = require('./constants');


let DebeModel;

if(config.useMongo) {
  const mongoose = require('mongoose');
  const debeSchema = new mongoose.Schema({
    date: {type: String},
    entries: [],
  }, { retainKeyOrder: true });

  DebeModel = mongoose.model('debe', debeSchema);
}

// Get debe from cache; if not exists call list()
exports.getDebe = async function() {
  let response;
  if(config.cacheAPI) {
    let key = "debe-" + getDebeDate();
    // console.log(key);
    response = server.cache.get(key);
    if(response == undefined) {
      response = await list();
      server.cache.set(key, response.toJSON());
    }
  }
  else {
    response = await list();
  }
  return response;
}

// Get debe from mongo; if not exists call fetch()
async function list() {
  let retDebe = null;

  if(config.useMongo) {
    let date = getDebeDate();
    retDebe = await DebeModel.findOne({date: date}, '-_id date entries').exec();

    if(retDebe == null) {
      retDebe = await fetch();
      let newDebe = new DebeModel(retDebe);
      newDebe.save(function(err) {
        if(err) console.log("can't save to db");
        console.log("data saved to db");
      });
    }
  }
  else {
    retDebe = await fetch();
  }
  return retDebe;
}

// Get debe from eksisozluk.com; if it not exists in cache nor mongo
async function fetch() {
  let response;
  try {
    response = await axios.get(URLS.DEBE, 
      {headers: {"X-Requested-With": "XMLHttpRequest"}}
    );
  } catch(err) {
    return { error: err.message };
  }
  
  let $ = cheerio.load(response.data, { decodeEntities: false });

  let href, parseHref, id;
  let entry_ids = [];
  let entries = [];
  let entry = {};

  // #main
  $(".topic-list").find("li > a").each(async function(index, element) {
    href = $(element).attr("href");
    parseHref = href.split("/");
    id = parseHref[parseHref.length - 1];
    entry_ids.push(id)
  });
  for(id of entry_ids) {
    entry = await entryJs.getEntry(id);
    entries.push(entry);
  }
  let date, res = {};
  date = getDebeDate()
  res = {
    date,
    entries
  }
  return res;
}

// get debe date as YYYY-MM-DD and consider debe update time in 4am (UTC)
function getDebeDate() {
  let date = new Date();
  
  if(date.getUTCHours() < 4) {
    date.setDate(date.getDate() - 1);
  }
  return date.toJSON().split("T")[0]
}
