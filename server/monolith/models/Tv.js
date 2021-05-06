const { getDatabase } = require("../config")

class Tv {
  static async getAll() {
    return getDatabase("tvseries").find().toArray()
  }

  static async getOne(id) {
    return getDatabase("tvseries").find().toArray()
  }

  static async edit(id, newData) {
    return getDatabase("tvseries").find().toArray()
  }

  static async add(newTv) {
    return getDatabase("tvseries").find().toArray()
  }

  static async delete(id) {
    return getDatabase("tvseries").find().toArray()
  }
}

module.exports = Tv