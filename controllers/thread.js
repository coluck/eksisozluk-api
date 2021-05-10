const url = require('url');
const querystring = require('querystring');

const axios = require('axios');
const cheerio = require('cheerio');
const URLS = require('./constants');

exports.list = async function(reqUrl) {
  let type = parseUrl(reqUrl);
  let response;
  try {
    response = await axios.get(URLS.THREAD + "/" + type,
      {headers: {"X-Requested-With": "XMLHttpRequest"}}
    );
  } catch(err) {
    return { error: err.message };
  }
  
  let $ = cheerio.load(response.data, { decodeEntities: false });

  let title, slug, entry_count, id, disambiguations;
  let threads = [];
  let thread = {};

  $(".topic-list").find("li > a").each(function(index, element) {
    title = $(element).contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim();

    // slug = EKSI_URL + $(element).attr("href");
    slug = $(element).attr("href");
    entry_count = $(element).find("small").text() || 1;
    id = exports.idFromSlug(slug);
    thread = {
      id: parseInt(id),
      title,
      slug,
      entry_count
    };
    threads.push(thread);
  });
  return threads;
}


exports.detail = async function(reqUrl) {
  reqUrl = parseDetailUrl(reqUrl);
  let response;
  try {
    response = await axios.get(URLS.BASE + "/" + reqUrl);
  } catch(err) {
    return { error: err.message };
  }
  let entries = [];
  let entry = {};
  let thread = {};
  let title, id, body, date, author, author_id, fav_count, created_at, updated_at, total_page, tags, disambiguations;
  let current_page;
  let disambiguation_links = [];
  let disambiguation_titles = [];
  let $ = cheerio.load(response.data, { decodeEntities: false });

  title = $("#title").attr("data-title");
  threadID =  $("#title").attr("data-id");
  slug = $("#title").attr("data-slug") + "--" + threadID;
  total_page = parseInt($(".pager").attr("data-pagecount")) || 1;
  current_page = parseInt($(".pager").attr("data-currentpage")) || 1;
  tags = $("#hidden-channels").text().trim().split(",") || null;
  tags = tags[0] == "" ? null: tags; 

  disambiguations = $("#disambiguations").find("ul > li").each(function(index, element) {
    disambiguation_links.push($(element).find("a").attr("href"));
    disambiguation_titles.push($(element).text());
  });

  $("#entry-item-list").find("li").each(function(index, element) {
    id = $(element).attr("data-id");
    // $(element).find(".content").find("br").replaceWith("\n");
    fav_count = $(element).attr("data-favorite-count");
    author_id = $(element).attr("data-author-id");
    body = $(element).find(".content").html().trim();
    date = $(element).find(".entry-date").text();
    author = $(element).find(".entry-author").text();
    date = $(element).find(".entry-date").text();
    [created_at, updated_at] = parseDate(date);
    entry = {
      id,
      body,
      author,
      author_id,
      fav_count,
      created_at,
      updated_at
    };
    entries.push(entry);
  });

  thread = {
    id:threadID,
    disambiguation_titles,
    disambiguation_links,
    title,
    slug,
    total_page,
    current_page,
    tags,
    entries
  }
  
  return thread;
}

/*
  parse endpoint url: basliklar/  
*/
function parseUrl(reqUrl) {
  let parsedUrl = url.parse(reqUrl); //    /api/basliklar?kanal=spor?p=2
  let parsedQs = querystring.parse(parsedUrl.query);
  
  let retUrl = "gundem";

  if(parsedQs.kanal)
    retUrl = "kanal/" + encodeURIComponent(parsedQs.kanal); // /kanal/spor

  if(parsedQs.p)
    retUrl += "?p=" + parsedQs.p; //      /kanal/spor?p=2

  return retUrl;
}

function parseDetailUrl(reqUrl) {
  // return reqUrl.substring(8);
  return reqUrl.split("/baslik/")[1];
}

exports.idFromSlug = function(slug) {   //slug = "https://eksisozluk.com/pena--31782"
  let pathname = url.parse(slug).pathname; // pathname = "/pena--31782"
  let splar = pathname.split("--"); // ["/pena", "31782"]
  return splar[splar.length - 1];   // id = "31782"
}

function parseDate(date) {
  let created_at = date;
  let updated_at = created_at.includes("~") ? created_at.split("~")[1].trim() : null;
  if(updated_at) {
    created_at = created_at.slice(0, -1 * (updated_at.length + 2)).trim();
    if(created_at.length > updated_at.length) {
      updated_at = created_at.slice(0, -1 * (updated_at.length)) + updated_at;
    }
  }
  return [created_at, updated_at]
}