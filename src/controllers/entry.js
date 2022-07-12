// calling the service, taking the request and sending the response

const axios = require('axios');
const cheerio = require('cheerio');
const urls = require('../constant/urls');
const entryDate = require('../parsers/entryDate');


module.exports = async (id) => {
    // request the entry page
    // format of the url: https://eksisozluk.com/entry/<id>
    // return the entry object
    let response;
    try {
        response = await axios.get(`${urls.ENTRY}/${id}`);
    } catch (err) {
        return { error: err.message };
    }

    const $ = cheerio.load(response.data, { decodeEntities: false });

    const element = $(`li[data-id=${id}]`)
    // const id = element.attr("data-id");
    const title = $("#title").attr("data-title");
    const body = element.find(".content").html().trim();
    const author = element.attr("data-author");
    const favCount = element.attr("data-favorite-count");
    const date = element.find(".entry-date").text();
    const [createdAt, updatedAt] = entryDate(date);

    return {
        id,
        title,
        body,
        author,
        favCount,
        createdAt,
        updatedAt,
    };
}