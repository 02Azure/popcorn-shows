const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config")

class Tv {
  static async getAll() {
    return getDatabase().find().toArray()
  }

  static async getOne(id) {
    return getDatabase().findOne({ _id: ObjectId(id) })
  }

  static async edit(id, newData) {
    return getDatabase().updateOne({ _id: ObjectId(id) }, { $set: newData })
  }

  static async add(newTv) {
    return getDatabase().insertOne(newTv)
  }

  static async delete(id) {
    return getDatabase().deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Tv