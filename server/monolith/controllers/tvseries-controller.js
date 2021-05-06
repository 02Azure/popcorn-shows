const { getDatabase } = require("../mongodb-config")

class TvseriesController {
  static async getAll(req, res) {
    try {
      let tvseries = await getDatabase("tvseries").find().toArray()
      
      res.json({ tvseries })

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = TvseriesController