const { getDatabase } = require("../config")

class Movie {
  static async getAll() {
    return getDatabase().find().toArray()
  }
}

module.exports = Movie