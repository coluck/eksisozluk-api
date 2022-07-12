module.exports = (date) => {
    // parse the date from given string
    // format: "2019-01-01 ~ 2019-01-02"
    let createdAt = date;
    let updatedAt = createdAt.includes("~") ? createdAt.split("~")[1].trim() : null;
    if(updatedAt) {
      createdAt = createdAt.slice(0, -1 * (updatedAt.length + 2)).trim();
      if(createdAt.length > updatedAt.length) {
        updatedAt = createdAt.slice(0, -1 * (updatedAt.length)) + updatedAt;
      }
    }
    return [createdAt, updatedAt]
}