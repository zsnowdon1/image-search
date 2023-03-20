const addPhoto = async (userName) => {
    const client = new Client(getConnection())
    await client.connect()

    await client.query(`INSERT INTO users (userName) VALUES ('${userName}');`)
    await client.end()
}

module.exports = {
    addPhoto
}