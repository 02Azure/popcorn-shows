const Movie = require("../models/Movie")

class Controller {
  static async getAll(req, res, next) {
    try {
      let movies = await Movie.getAll()
      res.status(200).json({ movies })

    } catch (err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
}

module.exports = Controller