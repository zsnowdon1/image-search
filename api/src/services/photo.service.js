import db from 'index.js';
const addPhoto = async (userName) => {
    db.connect;
    await client.connect()

    await client.query(`INSERT INTO users (userName) VALUES ('${userName}');`)
    await client.end()
}

module.exports = {
    addPhoto
}