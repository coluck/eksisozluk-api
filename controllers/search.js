const url = require('url');
const querystring = require('querystring');

const axios = require('axios');
const cheerio = require('cheerio');

const URLS = require('./constants');
const thradJs = require('./thread');


exports.getSearch = async function(query) {
  let response;
  query = parseQuery(query);
  try {
    response = await axios.get(URLS.SEARCH + encodeURIComponent(query),
      // {headers: {"X-Requested-With": "XMLHttpRequest"}}
    );
  } catch (err) { 
    return { error: err.message };
  }

  let $ = cheerio.load(response.data, { decodeEntities: false });
  let search_result = {};
  let threads = [];
  let title, entry_count_total, thread = {};

  $("#content-body > .topic-list").find("li > a").each(function(index, element) {
    title = $(element).contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim();
    entry_count_total = $(element).find("small").text() || '1';
    slug = URLS.BASE + $(element).attr("href");
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
    thread_count: $(".topic-list-description").text().trim(),
    threads
  }
  return search_result;
}

exports.autoComplete = async function(query) {
  let response;
  try {
    response = await axios.get(URLS.AUTO_SEARCH + encodeURIComponent(query),
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


function parseQuery(query) {
  let q = query.split("/ara/")[1];
  return q;
}
