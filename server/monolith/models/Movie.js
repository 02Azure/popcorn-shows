const { getDatabase } = require("../config")

class Movie {
  static async getAll() {
    return getDatabase("movies").find().toArray()
  }

  static async getOne(id) {
    return getDatabase("movies").find().toArray()
  }

  static async edit(id, newData) {
    return getDatabase("movies").find().toArray()
  }

  static async add(newMovies) {
    return getDatabase("movies").find().toArray()
  }

  static async delete(id) {
    return getDatabase("movies").find().toArray()
  }
}

module.exports = Movie