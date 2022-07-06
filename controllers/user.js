const axios = require('axios');
const cheerio = require('cheerio');
const URLS = require('./constants');


exports.getUser = async function (nick) {
  let response, last_ten_entry;
  try {
    response = await axios.get(URLS.USER + "/" + nick);

    // https://eksisozluk.com/son-entryleri?nick=ssg&p=1
    last_ten_entry = await axios.get(`${URLS.LAST_ENTRIES}?nick=${nick}&p=1`,
      {
        headers:
        {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );
  } catch (err) {
    return { error: err.message };
  }

  let user = {};
  let $ = cheerio.load(response.data, { decodeEntities: false });

  let user_nick = $("#user-profile-title").attr("data-nick");
  let entry_count_total = $("#entry-count-total").text().trim();

  $ = cheerio.load(last_ten_entry.data, { decodeEntities: false });
  const quote_entry_string=".pinned-icon-container + .topic-item"

  let quote_entry_title = $(`${quote_entry_string} > h1 > a`).text();
  let quote_entry_body = ""
  let quote_entry_date = ""
  let quote_entry_url = ""

  if (quote_entry_title) {
    quote_entry_body = $(`${quote_entry_string} > ul > li > div`).html().trim();
    quote_entry_date = $(`${quote_entry_string} > ul > li > footer > div.info > div.entry-footer-bottom > div.footer-info > div:eq(1) > a`).html();
    quote_entry_url = $(`${quote_entry_string} > ul > li > footer > div.info > div.entry-footer-bottom > div.footer-info > div:eq(1) > a`).attr("href");
  } 

  user = {
    nick: user_nick,
    quote_entry_title,
    quote_entry_body,
    quote_entry_date,
    quote_entry_url,
    entry_count_total,
  }
  
  return user;
}