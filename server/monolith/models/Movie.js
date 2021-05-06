const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config")

class Movie {
  static async getAll() {
    return getDatabase("movies").find().toArray()
  }

  static async getOne(id) {
    return getDatabase("movies").findOne({ _id: ObjectId(id) })
  }

  static async edit(id, newData) {
    return getDatabase("movies").updateOne({ _id: ObjectId(id) }, { $set: newData })
  }

  static async add(newMovie) {
    return getDatabase("movies").insertOne(newMovie)
  }

  static async delete(id) {
    return getDatabase("movies").deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Movie