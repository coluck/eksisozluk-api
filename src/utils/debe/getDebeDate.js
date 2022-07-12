module.exports = () => {
    // get debe date as YYYY-MM-DD and consider debe update time in 4am (UTC)

    const date = new Date();

    if (date.getUTCHours() < 4) {
        date.setDate(date.getDate() - 1);
    }
    return date.toJSON().split("T")[0]
}