const axios = require('axios');
const cheerio = require('cheerio');
const urls = require('../constant/urls');
const config = require('../config');
const getDebeDate = require('../utils/debe/getDebeDate');

module.exports = async () => {
    let response;
    try {
        response = await axios.get(urls.DEBE,
            { headers: config.asyncRequestHeaders }
        );
    } catch (err) {
        return { error: err.message };
    }

    const $ = cheerio.load(response.data, { decodeEntities: false });

    const entries = [];

    $(".topic-list").find("li > a").each(async function (index, element) {
        const singleEntry = $(element)

        const id = singleEntry.attr("href").split('/')[2];
        const title = singleEntry.text().trim();

        entries.push({
            id,
            title
        });

    });

    return {
        info: {
            date: getDebeDate(),
            entryCount: entries.length
        },
        entries
    };
};