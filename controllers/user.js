const axios = require('axios');
const cheerio = require('cheerio');
const URLS = require('./constants');


exports.getUser = async function (nick) {
  let response;
  try {
    response = await axios.get(URLS.USER + "/" + nick);
  } catch (err) {
    return { error: err.message };
  }



  let user = {};
  let $ = cheerio.load(response.data, { decodeEntities: false });

  let quote_entry_title = $("#quote-entry > h2 > a").text();
  let quote_entry_body = $("#quote-entry > div > p").html();
  let quote_entry_date = $("#quote-entry > footer > a").text();
  let quote_entry_url = $("#quote-entry > footer > a").attr("href");
  let user_nick = $("#user-profile-title").attr("data-nick");
  let entry_count_total = $("#entry-count-total").text().trim();
  let entry_count_lastmonth = $("#entry-count-lastmonth").text().trim();
  let entry_count_lastweek = $("#entry-count-lastweek").text().trim();
  let entry_count_today = $("#entry-count-today").text().trim();
  let last_entry_time = $("#last-entry-time").text().trim();

  user = {
    nick: user_nick,
    quote_entry_title,
    quote_entry_body,
    quote_entry_date,
    quote_entry_url,
    entry_count_total,
    entry_count_lastmonth,
    entry_count_lastweek,
    entry_count_today,
    last_entry_time,
  }
  return user;
}

exports.getUserEntry = async (nick, page) => {

  let response;
  let items = [];

  try {
    response = await axios.get(URLS.USER_ENTRY + nick + "&p=" + parseInt(page), {
      "headers": {
        "x-requested-with": "XMLHttpRequest",
      },
    });
  } catch (err) {
    return { error: err.message };
  }

  let $ = cheerio.load(response.data, { decodeEntities: false });

  $('.topic-item').each(function (i, elem) {

    let itemName = $('.topic-item>h1>a').eq(i).text();
    let itemUrl = $('.topic-item>h1>a').eq(i).attr("href");
    let itemDate = $('.topic-item>ul>li>footer .permalink').eq(i).text();
    let itemSummary = $('.topic-item>ul>li .content').eq(i).text();

    items.push({
      name: itemName,
      date: itemDate,
      summary: itemSummary,
      url: URLS.BASE + itemUrl
    })

  });




  return { items }
}