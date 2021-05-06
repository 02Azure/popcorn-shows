const { MongoClient } = require("mongodb")

let latestDatabase 
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function connectdb() {
  try {
    await client.connect()
    console.log("Successfully connected to the mongodb database!")

    const database = client.db("entertainme")
    latestDatabase = database

    return database

  } catch (error) {
    console.log(error)
  }
}

function getDatabase(name) {
  return latestDatabase.collection(name)
}

module.exports = {
  connectdb,
  getDatabase
}