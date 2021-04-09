const axios = require('axios');
const cheerio = require('cheerio');

const URLS = require('./constants');

exports.getEntry = async function(id) {
  let response;
  try {
    response = await axios.get(URLS.ENTRY + "/" +id);
  } catch (err) { 
    return { error: err.message };
  }  
  let $ = cheerio.load(response.data, { decodeEntities: false });
  
  let element = $(`li[data-id=${id}]`)
  //element.find(".content").find("br").replaceWith("\n");

  let entry_id = element.attr("data-id");
  let title = $("#title").attr("data-title");
  let body = element.find(".content").html().trim();
  let author = element.attr("data-author");
  let fav_count = element.attr("data-favorite-count");
  let date = element.find(".entry-date").text();
  let [created_at, updated_at] = parseDate(date); 

  let entry = {
    id: +entry_id,
    title,
    body,
    author,
    fav_count: +fav_count,
    created_at,
    updated_at,
  };
  return entry;
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