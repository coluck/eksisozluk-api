const axios = require('axios');
const cheerio = require('cheerio');



const EKSI_URL = "https://eksisozluk.com";
const USER_URL = EKSI_URL + "/biri/";

exports.getUser = async function(nick) {
  let response;
  try {
    response = await axios.get(USER_URL + nick);
  } catch (err) { 
    return { error: err.message };
  }  
  let user = {};
  let $ = cheerio.load(response.data, { decodeEntities: false });
  
  let user_nick = $("#user-profile-title").attr("data-nick");
  let entry_count_total = $("#entry-count-total").text().trim();
  let entry_count_lastmonth = $("#entry-count-lastmonth").text().trim();
  let entry_count_lastweek = $("#entry-count-lastweek").text().trim();
  let entry_count_today = $("#entry-count-today").text().trim();
  let last_entry_time = $("#last-entry-time").text().trim();
  
  user = {
    nick: user_nick,
    entry_count_total,
    entry_count_lastmonth,
    entry_count_lastweek,
    entry_count_today,
    last_entry_time,
  }
  return user;
}