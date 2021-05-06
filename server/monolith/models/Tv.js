const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config")

class Tv {
  static async getAll() {
    return getDatabase("tvseries").find().toArray()
  }

  static async getOne(id) {
    return getDatabase("tvseries").findOne({ _id: ObjectId(id) })
  }

  static async edit(id, newData) {
    return getDatabase("tvseries").updateOne({ _id: ObjectId(id) }, { $set: newData })
  }

  static async add(newTv) {
    return getDatabase("tvseries").insertOne(newTv)
  }

  static async delete(id) {
    return getDatabase("tvseries").deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Tv