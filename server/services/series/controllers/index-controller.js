const { Tv } = require("../models/Tv")

class Controller {
  static async getAll(req, res, next) {
    try {
      let tvseries = await Tv.getAll()

      res.status(200).json({ tvseries })

    } catch (err) {
      console.log(error)
    }
  }
}

module.exports = Controller