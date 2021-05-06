const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config")

class Movie {
  static async getAll() {
    return getDatabase().find().toArray()
  }

  static async getOne(id) {
    return getDatabase().findOne({ _id: ObjectId(id) })
  }

  static async edit(id, newData) {
    return getDatabase().updateOne({ _id: ObjectId(id) }, { $set: newData })
  }

  static async add(newMovie) {
    return getDatabase().insertOne(newMovie)
  }

  static async delete(id) {
    return getDatabase().deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Movie