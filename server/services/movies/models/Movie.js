const { getDatabase } = require("../config")

class Movie {
  static async getAll() {
    try {
      let movies = await getDatabase().find().toArray()
      return movies

    } catch (error) {
      return error
    }
  }
}

module.exports = { Movie } 