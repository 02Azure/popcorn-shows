const { getDatabase } = require("../config")

class Tv {
  static async getAll() {
    try {
      let tvseries = await getDatabase().find().toArray()
      return tvseries

    } catch (error) {
      return error
    }
  }
}

module.exports = { Tv } 