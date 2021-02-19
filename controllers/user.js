const cheerio = require('cheerio');
const entryJs = require('./entry');
const puppeteer = require('puppeteer');

const EKSI_URL = "https://eksisozluk.com";
const USER_URL = EKSI_URL + "/biri/";

exports.getUser = async function(nick) {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto(USER_URL+nick, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);

    let user = {};
    let $ = cheerio.load(data, { decodeEntities: false });
    
    let user_nick = $("#user-profile-title").attr("data-nick");
    let entry_count_total = $("#entry-count-total").text().trim();
    let entry_count_lastmonth = $("#entry-count-lastmonth").text().trim();
    let entry_count_lastweek = $("#entry-count-lastweek").text().trim();
    let entry_count_today = $("#entry-count-today").text().trim();
    let last_entry_time = $("#last-entry-time").text().trim();
    let last_entries_ids = [];
    let last_entries = [];

    $("#topic").find(".topic-item").each((index,element) => {
      $(element).find("ul > li").each((index2,element2) => {
        ($(element2).attr("data-id")) != undefined ? last_entries_ids.push($(element2).attr("data-id")) : (null) 
      });
    });
    for(id of last_entries_ids)
    {
      var entry = await entryJs.getEntry(id);
      last_entries.push(entry);
    }

    user = {
      nick: user_nick,
      entry_count_total,
      entry_count_lastmonth,
      entry_count_lastweek,
      entry_count_today,
      last_entry_time,
      last_entries,
    }
    return user;
  }
  catch(err)
  {
    console.log(err)
  }
}