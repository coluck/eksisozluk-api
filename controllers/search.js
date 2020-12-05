const url = require('url');
const querystring = require('querystring');

const axios = require('axios');
const cheerio = require('cheerio');

const thradJs = require('./thread');

const EKSI_URL = "https://eksisozluk.com";
const SEARCH_URL = EKSI_URL + "/basliklar/ara?SearchForm.SortOrder=Count&SearchForm.Keywords=";
const AUTO_URL = EKSI_URL + "/autocomplete/query?q=";



exports.getSearch = async function(query) {
  let response;
  try {
    response = await axios.get(SEARCH_URL + encodeURIComponent(query),
      // {headers: {"X-Requested-With": "XMLHttpRequest"}}
    );
  } catch (err) { 
    return { error: err.message };
  }

  let $ = cheerio.load(response.data, { decodeEntities: false });
  let search_result = {};
  let threads = [];
  let title, entry_count_total, thread = {};

  $(".topic-list").find("li > a").each(function(index, element) {
    title = $(element).contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim();
    entry_count_total = $(element).find("small").text() || '1';
    slug = EKSI_URL + $(element).attr("href");
    id = thradJs.idFromSlug(slug);
    thread = {
      id: parseInt(id),
      title,
      slug,
      entry_count_total,
    }
    threads.push(thread)
  });

  search_result = {
    thread_count: $("h2").attr("title"),
    threads
  }
  return search_result;
}

exports.autoComplete = async function(query) {
  let response;
  try {
    response = await axios.get(AUTO_URL + encodeURIComponent(query),
      {headers: {"X-Requested-With": "XMLHttpRequest"}});
  } catch (err) { 
    return { error: err.message };
  }
  return response.data;
}

// NOT implemented yet
function parseSearchUrl(reqUrl) {
  let parsedUrl = url.parse(reqUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  // console.log(parsedQs);
}